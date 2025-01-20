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
shouldNotBeAvailable();

console.log("\\n// moment");
const moment = require('moment');
const jsonResponse = pm.response.json();
console.log("formatted date =", moment(jsonResponse.args.randomDate).format("MMM Do YYYY"));

console.log("\\n// lodash");
const _ = require('lodash');
const array = _.chunk(['a', 'b', 'c', 'd'], 3);
console.log(array);
_.forEach(array, value => console.log(value));
console.log("now =", _.now());

console.log("\\n// salutations");
const salutations = require('./src/salutations.js');
console.log("salutations", salutations);
console.log("salutations", salutations());

console.log("\\n// crypto");
const crypto = require("crypto");
console.log(crypto.randomBytes(32));
console.log(crypto.getRandomValues(new Uint32Array(1)));

console.log("\\n// crypto-js");
const cryptoJs = require("crypto-js");
console.log(cryptoJs.SHA256("salutations maximales").toString());
console.log(cryptoJs.HmacSHA1("salutations maximales", "key").toString());
const r = cryptoJs.lib.WordArray.random(32);
console.log(r.words);
console.log(r.toString());

console.log("\\n// ajv");
const Ajv = require("ajv");
const ajv = new Ajv();

//{"message":"salutations maximales","args":{"randomDate":1728487778769}
const schema = {
  type: "object",
  properties: {
    message: { type: "string" },
    args: {
      type: "object",
      properties: {
        randomDate: { type: "number" }
      },
      required: ["randomDate"]
    },
    additionalProperties: false
  },
  required: ["message", "args"],
  additionalProperties: false
};

const validate = ajv.compile(schema);
let valid = validate(pm.response.json());
if (valid) {
  console.log("validation: ok");
} else {
  for (const error of validate.errors) {
      console.log("error: " + JSON.stringify(error));
  }
}

console.log("\\n// buffer");
const { Buffer } = require("buffer");
console.log("Buffer", Buffer);

console.log("\\n// atob");
const atob = require("atob");
const encoded = "c2FsdXRhdGlvbnMgbWF4aW1hbGVzLg==";
const decoded = atob(encoded);
console.log("decoded", decoded);

console.log("\\n// btoa");
const btoa = require("btoa");
const reencoded = btoa(decoded);
console.log("reencoded", reencoded, reencoded === encoded);

console.log("\\n// navigator");
console.log("navigator", JSON.stringify(navigator));

console.log("\\n// util");
const util = require("util");
console.log("util", util);
console.log("util.inherits", util.inherits);
//const encoder = new TextEncoder();
//const view = encoder.encode("€");
//console.log("encoded", view); // Uint8Array(3) [226, 130, 172]
//const decoder = new TextDecoder();
//console.log("decoded", decoder.decode(view));

console.log("\\n// csv-parse/lib/sync");
const parse = require("csv-parse/lib/sync");

const input = \`
header1,header2
value1,value2
\`;
const records = parse(input, {
  columns: true,
  skip_empty_lines: true
});
console.log(JSON.stringify(records));

console.log("\\n// tv4");
const tv4 = require("tv4");

valid = tv4.validate(pm.response.json(), schema);
if (valid) {
  console.log("validation: ok");
} else {
  console.log(tv4.error);
}

console.log("\\n// uuid");
const uuid = require("uuid");
console.log("uuid", uuid);
console.log("uuid()", uuid());
console.log("uuid.v4()", uuid.v4());

console.log("\\n");
throw Error("lol");
`;

  const scn = scenario("Require")
    .exec(http("Before").get("/"))
    .execScript(script)
    .exitHereIfFailed()
    .exec(http("After").get("/"))
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
