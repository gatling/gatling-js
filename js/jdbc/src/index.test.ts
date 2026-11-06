import { Simulation, atOnceUsers, exec, scenario } from "@gatling.io/core";

import {
  column,
  generatedKey,
  inOutParam,
  jdbc,
  jdbcFeeder,
  outParam,
  outValue,
  param,
  rowCount,
  rows,
  updateCount
} from "./index";

const runSimulationMock = (_: Simulation): void => {};

// protocol
const jdbcProtocol = jdbc
  .url("jdbc:postgresql://localhost:5432/shop")
  .credentials("gatling", "gatling")
  .property("ssl", "true")
  .maxConnections(50)
  .loginTimeout(5)
  .loginTimeout({ amount: 500, unit: "milliseconds" })
  .queryTimeout(10)
  .fetchSize(1000);

const dataSourceProtocol = jdbc.dataSource({}).credentials("gatling", "gatling");

// feeder
const customers = jdbcFeeder(
  "jdbc:postgresql://localhost:5432/shop",
  "gatling",
  "gatling",
  'SELECT id AS "customerId" FROM customers'
).random();

// statements
const statements = exec(
  jdbc("statement").statement("SELECT * FROM users"),
  jdbc("statement with EL").statement("SELECT * FROM #{table}"),
  jdbc((session) => "request name function").statement((session) => `SELECT * FROM ${session.get("table")}`),
  jdbc("generated keys").statement("INSERT INTO users (name) VALUES ('John')").returnGeneratedKeys(),
  jdbc("generated key columns")
    .statement("INSERT INTO users (name) VALUES ('John')")
    .returnGeneratedKeys("id", "created_at")
);

// prepared statements
const preparedStatements = exec(
  jdbc("prepared")
    .preparedStatement("SELECT * FROM users WHERE id = ? AND status = ? AND age > ? AND active = ?")
    .params("#{userId}", "ACTIVE", 18, true),
  jdbc("prepared with function")
    .preparedStatement((session) => "SELECT * FROM users WHERE id = ?")
    .params((session) => session.get<number>("userId") + 1),
  jdbc("typed params")
    .preparedStatement("INSERT INTO orders (label, amount, placed_on, paid, note) VALUES (?, ?, ?, ?, ?)")
    .params(
      "#{label}",
      param("#{amount}", "DECIMAL"),
      param((session) => session.get("date"), "DATE"),
      param("true", "BOOLEAN"),
      param(null, "VARCHAR")
    ),
  jdbc("batch").preparedStatement("INSERT INTO users (name, age) VALUES (?, ?)").batch("#{rows}"),
  jdbc("batch with function")
    .preparedStatement("INSERT INTO users (name, age) VALUES (?, ?)")
    .batch((session) => [
      ["John", 18],
      ["Jane", 20]
    ])
    .returnGeneratedKeys("id")
);

// callable statements
const callableStatements = exec(
  jdbc("callable")
    .callableStatement("{call transfer(?, ?, ?)}")
    .params("#{from}", "#{to}", outParam("INTEGER"))
    .check(outValue(3).is(0)),
  jdbc("inout")
    .callableStatement((session) => "{call increment(?)}")
    .params(
      inOutParam("#{counter}", "INTEGER"),
      inOutParam((session) => 41, "BIGINT")
    )
    .check(outValue(1).saveAs("counter"))
);

// checks
const checks = exec(
  jdbc("checks")
    .preparedStatement("SELECT id, email FROM users WHERE status = ?")
    .params("ACTIVE")
    .check(
      rowCount().gt(0),
      column("id").find().saveAs("userId"),
      column("#{columnName}").findAll().saveAs("values"),
      column((session) => "email")
        .findRandom()
        .saveAs("email"),
      column(2).count().is(10),
      column("email").isNull(),
      rows().saveAs("users")
    )
    .checkIf("#{enabled}")
    .then(rowCount().is(1))
    .checkIf((session) => session.get("enabled"))
    .then(column("id").is(1)),
  jdbc("update count")
    .statement("DELETE FROM users")
    .check(updateCount().is(10), updateCount().findAll().saveAs("counts")),
  jdbc("generated key")
    .preparedStatement("INSERT INTO users (name) VALUES (?)")
    .params("John")
    .returnGeneratedKeys()
    .check(generatedKey().saveAs("id"), generatedKey("id").exists(), generatedKey(1).count().is(1))
);

// transactions
const transactions = exec(
  jdbc("begin").begin(),
  jdbc("in transaction").statement("UPDATE users SET status = 'ACTIVE'"),
  jdbc("commit").commit(),
  jdbc("serializable").begin().transactionIsolation("SERIALIZABLE").readOnly(),
  jdbc("rollback").rollback()
);

runSimulationMock((setUp) => {
  setUp(
    scenario("scenario")
      .feed(customers)
      .exec(statements, preparedStatements, callableStatements, checks, transactions)
      .injectOpen(atOnceUsers(1))
  ).protocols(jdbcProtocol, dataSourceProtocol);
});
