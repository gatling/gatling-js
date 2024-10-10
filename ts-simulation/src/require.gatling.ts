import {
  atOnceUsers,
  scenario,
  simulation
} from "@gatling.io/core";
import { http } from "@gatling.io/http";

//import moment from "moment";
//console.log("formatted date =", moment().format("MMM Do YYYY"));

export default simulation((setUp) => {
  const baseHttpProtocol =
    http.baseUrl("http://localhost:9999")

  const script = `
// moment
let moment = require('moment');
let jsonResponse = pm.response.json();
console.log("formatted date =", moment(jsonResponse.args.randomDate).format("MMM Do YYYY"));

// lodash
let _ = require('lodash');
let array = _.chunk(['a', 'b', 'c', 'd'], 3);
console.log(array);
_.forEach(array, value => console.log(value));
console.log("now =", _.now());

let salutations = require('./salutations');
console.log("salutations", salutations);
console.log("salutations", salutations());

// crypto-js
let cryptoJs = require("crypto-js");
console.log(cryptoJs.SHA256("salutations maximales").toString());
console.log(cryptoJs.HmacSHA1("salutations maximales", "key").toString());
console.log(cryptoJs.cryptoSecureRandomInt());

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
