import {
  atOnceUsers,
  scenario,
  simulation
} from "@gatling.io/core";
import { http } from "@gatling.io/http";

export default simulation((setUp) => {
  const baseHttpProtocol =
    http.baseUrl("http://localhost:9999");

  const script = `
// moment
const moment = require('moment');
const jsonResponse = pm.response.json();
console.log("formatted date =", moment(jsonResponse.args.randomDate).format("MMM Do YYYY"));

// lodash
const _ = require('lodash');
const array = _.chunk(['a', 'b', 'c', 'd'], 3);
console.log(array);
_.forEach(array, value => console.log(value));
console.log("now =", _.now());

const salutations = require('./src/salutations.js');
console.log("salutations", salutations);
console.log("salutations", salutations());

// crypto
//const crypto = require("crypto");
//console.log(crypto.randomBytes(32));
//console.log(crypto.getRandomValues(new Uint32Array(1)));

// crypto-js
const cryptoJs = require("crypto-js");
console.log(cryptoJs.SHA256("salutations maximales").toString());
console.log(cryptoJs.HmacSHA1("salutations maximales", "key").toString());
const r = cryptoJs.lib.WordArray.random(32);
console.log(r.words);
console.log(r.toString());

// ajv
const Ajv = require("ajv");
console.log("ajv loaded");
const ajv = new Ajv();
console.log("ajv created");
throw Error("lol");

//{"message":"salutations maximales","args":{"randomDate":1728487778769}
const schema = {
  type: "object",
  properties: {
    message: {type: "integer"},
    args: {type: "string"}
  },
  required: ["message"],
  additionalProperties: false
};

const validate = ajv.compile(schema);
const valid = validate(pm.response.json());
if (!valid) {
  console.log(validate.errors);
}

throw Error("lol");
`;

  const scn = scenario("Require")
    .execScript(script)
    //.exitHereIfFailed()
    .exec(http("Home").get("/"))
    /*.exec(
      http("Page #{page}")
        .get("/computers?page=#{page}")
    )*/;

  setUp(
    scn.injectOpen(
      atOnceUsers(1)
    )
  ).protocols(baseHttpProtocol)
});
