import { atOnceUsers, exec, global, scenario, simulation } from "@gatling.io/core";
import { column, generatedKey, jdbc, jdbcFeeder, param, rowCount, updateCount } from "@gatling.io/jdbc";

export default simulation((setUp) => {
  // Runs against the shop database of https://github.com/gatling/gatling-jdbc-demo, start it with: docker compose up -d
  // The PostgreSQL driver is declared in the "gatling.jvmDependencies" section of package.json
  const url = "jdbc:postgresql://localhost:5432/shop";

  const jdbcProtocol = jdbc.url(url).credentials("gatling", "gatling").maxConnections(5);

  // loaded from the database when the simulation starts
  const customers = jdbcFeeder(url, "gatling", "gatling", 'SELECT id AS "customerId" FROM customers').random();

  const browse = exec(
    jdbc("Browse category")
      .preparedStatement("SELECT id, name, price FROM products WHERE category = ? ORDER BY name LIMIT 10")
      .params((session) => ["books", "games", "music", "movies", "toys"][Math.floor(Math.random() * 5)])
      .check(rowCount().gt(0), column("id").findRandom().saveAs("productId")),
    jdbc("Product details")
      .preparedStatement("SELECT price, stock FROM products WHERE id = ?")
      .params("#{productId}")
      .check(column("price").saveAs("price"))
  );

  // all or nothing: the order, its line, and the stock
  const order = exec(
    jdbc("Begin").begin(),
    jdbc("Create order")
      .preparedStatement("INSERT INTO orders (customer_id, total) VALUES (?, ?)")
      .params("#{customerId}", "#{price}")
      .returnGeneratedKeys("id")
      .check(generatedKey("id").saveAs("orderId")),
    jdbc("Add order line")
      .preparedStatement("INSERT INTO order_lines (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)")
      // a String converted to the given JDBC type
      .params("#{orderId}", "#{productId}", param("1", "INTEGER"), "#{price}")
      .check(updateCount().is(1)),
    jdbc("Update stock")
      .preparedStatement("UPDATE products SET stock = stock - 1 WHERE id = ? AND stock > 0")
      .params("#{productId}")
      .check(updateCount().is(1)),
    jdbc("Commit").commit()
  );

  const history = exec(
    jdbc("Order history")
      .preparedStatement("SELECT id, placed_at, total FROM orders WHERE customer_id = ? ORDER BY placed_at DESC LIMIT 5")
      .params("#{customerId}")
      .check(rowCount().gt(0))
  );

  const scn = scenario("Shop").feed(customers).repeat(5).on(browse, order, history);

  setUp(scn.injectOpen(atOnceUsers(5)))
    .assertions(global().failedRequests().count().is(0))
    .protocols(jdbcProtocol);
});
