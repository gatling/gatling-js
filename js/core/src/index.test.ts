import {
  ByteArrayBody,
  ElFileBody,
  PebbleFileBody,
  PebbleStringBody,
  RawFileBody,
  Session,
  Simulation,
  StringBody,
  arrayFeeder,
  atOnceUsers,
  constantConcurrentUsers,
  constantUsersPerSec,
  csv,
  details,
  exec,
  forAll,
  global,
  group,
  holdFor,
  incrementConcurrentUsers,
  incrementUsersPerSec,
  jsonFile,
  jsonUrl,
  jumpToRps,
  nothingFor,
  onCase,
  pause,
  percent,
  rampConcurrentUsers,
  rampUsers,
  rampUsersPerSec,
  reachRps,
  repeat,
  scenario,
  separatedValues,
  ssv,
  stressPeakUsers,
  tsv,
  ProtocolBuilder,
  GlobalStore
} from "./index";

const runSimulationMock = (_: Simulation): void => {};

// execs
const chain1 = exec((session: Session) => session);
const chain2 = exec(chain1, chain1).exec(chain1);
// pauses
const pause1 = pause(1);
// loops
const loop1 = repeat(1).on(chain1);
// groups
const group1 = group("group").on(chain1);
const group2 = group((session) => "group").on(chain1);

// bodies
const stringBody1 = StringBody("static #{dynamic} static");
const stringBody2 = StringBody((session) => "body");
const rawFileBody1 = RawFileBody("path");
const rawFileBody2 = RawFileBody((session) => "path");
const elFileBody1 = ElFileBody("path");
const elFileBody2 = ElFileBody((session) => "path");
const pebbleStringBody = PebbleStringBody("template string");
const pebbleFileBody1 = PebbleFileBody("path");
const pebbleFileBody2 = PebbleFileBody((session) => "path");
const byteArrayBody1 = ByteArrayBody([1]);
const byteArrayBody2 = ByteArrayBody((session) => [1]);

//const records = csv("foo").readRecords();
const recordsCount = csv("foo").recordsCount();

// global store
GlobalStore.getOrDefault<number>("key", 0);
GlobalStore.put<number>("key", 0);
GlobalStore.get<number>("key");
GlobalStore.containsKey("key");
GlobalStore.update<number>("key", (oldValue) => (oldValue === null ? 0 : oldValue + 1));
GlobalStore.remove<number>("key");
GlobalStore.clear();

// scenario
const scn = scenario("scenario")
  // execs
  .exec((session) => session)
  .exec(chain1, chain2)
  // groups
  .group("group")
  .on(chain1, chain2)
  .group((session) => "group")
  .on(chain1, chain2)
  // feeds
  .feed(csv("foo"))
  .feed(csv("foo", '"'))
  .feed(ssv("foo"))
  .feed(ssv("foo", '"'))
  .feed(tsv("foo"))
  .feed(tsv("foo", '"'))
  .feed(separatedValues("foo", "|"))
  .feed(separatedValues("foo", "|", '"'))
  .feed(jsonFile("foo"))
  .feed(jsonUrl("foo"))
  //.feed(
  //  Stream.iterate(0, i -> i + 1)
  //    .limit(10)
  //    .map(
  //      i -> {
  //        Map<String, Object> map = new HashMap<>();
  //        map.put("key", i);
  //        return map;
  //      })
  //    .iterator())
  //.feed(
  //  () ->
  //    Stream.iterate(0, i -> i + 1)
  //      .limit(10)
  //      .map(
  //        i -> {
  //          Map<String, Object> map = new HashMap<>();
  //          map.put("key", i);
  //          return map;
  //        })
  //      .iterator())
  .feed(arrayFeeder([{ foo: "foo1" }, { foo: "foo2" }]))
  // pauses
  .pause(1)
  .pause({ amount: 100, unit: "milliseconds" })
  .pause("#{pause}")
  .pause((session) => 1)
  .pause((session) => ({ amount: 100, unit: "milliseconds" }))
  .pause(1, 2)
  .pause({ amount: 100, unit: "milliseconds" }, { amount: 200, unit: "milliseconds" })
  .pause("#{min}", "#{max}")
  .pause(
    (session) => 1,
    (session) => 2
  )
  .pause(
    (session) => ({ amount: 100, unit: "milliseconds" }),
    (session) => ({ amount: 200, unit: "milliseconds" })
  )
  .pause(1, "Constant")
  .pause({ amount: 100, unit: "milliseconds" }, "Constant")
  .pause("#{pause}", "Constant")
  .pause((session) => ({ amount: 100, unit: "milliseconds" }), "Constant")
  .pause(1, 2, "Constant")
  .pause({ amount: 100, unit: "milliseconds" }, { amount: 200, unit: "milliseconds" }, "Constant")
  .pause("#{min}", "#{max}", "Constant")
  .pause(
    (session) => ({ amount: 100, unit: "milliseconds" }),
    (session) => ({ amount: 200, unit: "milliseconds" }),
    "Constant"
  )
  .pause(1, "Disabled")
  .pause(1, "Exponential")
  .pause(1, { type: "Custom", f: (session) => 1000 })
  .pause(1, { type: "UniformPercentage", plusOrMinus: 30 })
  .pause(1, { type: "UniformDuration", plusOrMinus: { amount: 50, unit: "milliseconds" } })
  .pause(1, { type: "NormalWithPercentageDuration", stdDev: 30 })
  .pause(1, { type: "NormalWithStdDevDuration", stdDev: { amount: 50, unit: "milliseconds" } })
  // pace
  .pace(1)
  .pace(1, "counter")
  .pace({ amount: 100, unit: "milliseconds" })
  .pace({ amount: 100, unit: "milliseconds" }, "counter")
  .pace("#{pace}")
  .pace("#{pace}", "counter")
  .pace((session) => ({ amount: 100, unit: "milliseconds" }))
  .pace((session) => ({ amount: 100, unit: "milliseconds" }), "counter")
  .pace(1, 2)
  .pace(1, 2, "counter")
  .pace({ amount: 100, unit: "milliseconds" }, { amount: 200, unit: "milliseconds" })
  .pace({ amount: 100, unit: "milliseconds" }, { amount: 200, unit: "milliseconds" }, "counter")
  .pace("#{min}", "#{max}", "counter")
  .pace(
    (session) => ({ amount: 100, unit: "milliseconds" }),
    (session) => ({ amount: 200, unit: "milliseconds" })
  )
  .pace(
    (session) => ({ amount: 100, unit: "milliseconds" }),
    (session) => ({ amount: 200, unit: "milliseconds" }),
    "counter"
  )
  // rendezVous
  .rendezVous(5)
  // repeat
  .repeat(1)
  .on(chain1, chain2)
  .repeat(1, "counterName")
  .on(chain1, chain2)
  .repeat((session) => 1)
  .on(chain1, chain2)
  .repeat((session) => 1, "counterName")
  .on(chain1, chain2)
  // during
  .during(1)
  .on(chain1, chain2)
  .during(1, "counterName")
  .on(chain1, chain2)
  .during(1, true)
  .on(chain1, chain2)
  .during(1, "counterName", true)
  .on(chain1, chain2)
  .during({ amount: 100, unit: "milliseconds" })
  .on(chain1, chain2)
  .during({ amount: 100, unit: "milliseconds" }, "counterName")
  .on(chain1, chain2)
  .during({ amount: 100, unit: "milliseconds" }, true)
  .on(chain1, chain2)
  .during({ amount: 100, unit: "milliseconds" }, "counterName", true)
  .on(chain1, chain2)
  .during("#{duration}")
  .on(chain1, chain2)
  .during("#{duration}", "counterName")
  .on(chain1, chain2)
  .during("#{duration}", true)
  .on(chain1, chain2)
  .during("#{duration}", "counterName", true)
  .on(chain1, chain2)
  .during((session) => ({ amount: 100, unit: "milliseconds" }))
  .on(chain1, chain2)
  .during((session) => ({ amount: 100, unit: "milliseconds" }), "counterName")
  .on(chain1, chain2)
  .during((session) => ({ amount: 100, unit: "milliseconds" }), true)
  .on(chain1, chain2)
  .during((session) => ({ amount: 100, unit: "milliseconds" }), "counterName", true)
  .on(chain1, chain2)
  // foreach
  .foreach([1], "attributeName")
  .on(chain1, chain2)
  .foreach([1], "attributeName", "counterName")
  .on(chain1, chain2)
  .foreach("#{array}", "attributeName")
  .on(chain1, chain2)
  .foreach("#{array}", "attributeName", "counterName")
  .on(chain1, chain2)
  .foreach((session) => [1], "attributeName")
  .on(chain1, chain2)
  .foreach((session) => [1], "attributeName", "counterName")
  .on(chain1, chain2)
  // forever
  .forever()
  .on(chain1, chain2)
  .forever("counterName")
  .on(chain1, chain2)
  // asLongAs
  .asLongAs("#{condition}")
  .on(chain1, chain2)
  .asLongAs("#{condition}", "counterName")
  .on(chain1, chain2)
  .asLongAs("#{condition}", true)
  .on(chain1, chain2)
  .asLongAs("#{condition}", "counterName", true)
  .on(chain1, chain2)
  .asLongAs((session) => true)
  .on(chain1, chain2)
  .asLongAs((session) => true, "counterName")
  .on(chain1, chain2)
  .asLongAs((session) => true, true)
  .on(chain1, chain2)
  .asLongAs((session) => true, "counterName", true)
  .on(chain1, chain2)
  // doWhile
  .doWhile("#{condition}")
  .on(chain1, chain2)
  .doWhile("#{condition}", "counterName")
  .on(chain1, chain2)
  .doWhile((session) => true)
  .on(chain1, chain2)
  .doWhile((session) => true, "counterName")
  .on(chain1, chain2)
  // asLongAsDuring
  .asLongAsDuring("#{condition}", "#{duration}")
  .on(chain1, chain2)
  .asLongAsDuring("#{condition}", "#{duration}", "counterName")
  .on(chain1, chain2)
  .asLongAsDuring("#{condition}", "#{duration}", true)
  .on(chain1, chain2)
  .asLongAsDuring("#{condition}", "#{duration}", "counterName", true)
  .on(chain1, chain2)
  .asLongAsDuring(
    (session) => true,
    (session) => ({ amount: 100, unit: "milliseconds" })
  )
  .on(chain1, chain2)
  .asLongAsDuring(
    (session) => true,
    (session) => ({ amount: 100, unit: "milliseconds" }),
    "counterName"
  )
  .on(chain1, chain2)
  .asLongAsDuring(
    (session) => true,
    (session) => ({ amount: 100, unit: "milliseconds" }),
    true
  )
  .on(chain1, chain2)
  .asLongAsDuring(
    (session) => true,
    (session) => ({ amount: 100, unit: "milliseconds" }),
    "counterName",
    true
  )
  .on(chain1, chain2)
  .doWhileDuring("#{condition}", "#{duration}")
  .on(chain1, chain2)
  .doWhileDuring("#{condition}", "#{duration}", "counterName")
  .on(chain1, chain2)
  .doWhileDuring("#{condition}", "#{duration}", true)
  .on(chain1, chain2)
  .doWhileDuring("#{condition}", "#{duration}", "counterName", true)
  .on(chain1, chain2)
  .doWhileDuring(
    (session) => true,
    (session) => ({ amount: 100, unit: "milliseconds" })
  )
  .on(chain1, chain2)
  .doWhileDuring(
    (session) => true,
    (session) => ({ amount: 100, unit: "milliseconds" }),
    "counterName"
  )
  .on(chain1, chain2)
  .doWhileDuring(
    (session) => true,
    (session) => ({ amount: 100, unit: "milliseconds" }),
    true
  )
  .on(chain1, chain2)
  .doWhileDuring(
    (session) => true,
    (session) => ({ amount: 100, unit: "milliseconds" }),
    "counterName",
    true
  )
  .on(chain1, chain2)
  // doIf
  .doIf("#{condition}")
  .then(chain1, chain2)
  .doIf((session) => true)
  .then(chain1, chain2)
  // doIfOrElse
  .doIfOrElse("#{condition}")
  .then(chain1, chain2)
  .orElse(chain2, chain2)
  .doIfOrElse((session) => true)
  .then(chain1, chain2)
  .orElse(chain2, chain2)
  // doIfEquals
  .doIfEquals("#{actual}", 1)
  .then(chain1, chain2)
  .doIfEquals("#{actual}", "#{expected}")
  .then(chain1, chain2)
  .doIfEquals("#{actual}", (session) => 1)
  .then(chain1, chain2)
  .doIfEquals((session) => "actual", 1)
  .then(chain1, chain2)
  .doIfEquals((session) => "actual", "#{expected}")
  .then(chain1, chain2)
  .doIfEquals(
    (session) => "actual",
    (session) => 1
  )
  .then(chain1, chain2)
  // doIfEqualsOrElse
  .doIfEqualsOrElse("#{actual}", 1)
  .then(chain1, chain2)
  .orElse(chain2, chain2)
  .doIfEqualsOrElse("#{actual}", "#{expected}")
  .then(chain1, chain2)
  .orElse(chain2, chain2)
  .doIfEqualsOrElse("#{actual}", (session) => 1)
  .then(chain1, chain2)
  .orElse(chain2, chain2)
  .doIfEqualsOrElse((session) => "actual", 1)
  .then(chain1, chain2)
  .orElse(chain2, chain2)
  .doIfEqualsOrElse((session) => "actual", "#{expected}")
  .then(chain1, chain2)
  .orElse(chain2, chain2)
  .doIfEqualsOrElse(
    (session) => "actual",
    (session) => 1
  )
  .then(chain1, chain2)
  .orElse(chain2, chain2)
  // doSwitch
  .doSwitch("#{value}")
  .on(onCase("value1").then(chain1), onCase("value2").then(chain2))
  .doSwitch((session) => "value")
  .on(onCase("value1").then(chain1), onCase("value2").then(chain2))
  // doSwitchOrElse
  .doSwitchOrElse("#{value}")
  .on(onCase("value1").then(chain1), onCase("value2").then(chain2))
  .orElse(chain2)
  .doSwitchOrElse((session) => "value")
  .on(onCase("value1").then(chain1), onCase("value2").then(chain2))
  .orElse(chain2)
  // randomSwitch
  .randomSwitch()
  .on(percent(50.0).then(chain1), percent(50.0).then(chain2))
  // randomSwitchOrElse
  .randomSwitchOrElse()
  .on(percent(50.0).then(chain1), percent(50.0).then(chain2))
  .orElse(chain2)
  // uniformRandomSwitch
  .uniformRandomSwitch()
  .on(chain1, chain2)
  // roundRobinSwitch
  .roundRobinSwitch()
  .on(chain1, chain2)
  // exitBlockOnFail
  .exitBlockOnFail()
  .on(chain1)
  // tryMax
  .tryMax(1)
  .on(chain1)
  .tryMax(1, "counterName")
  .on(chain1)
  .tryMax("#{times}")
  .on(chain1)
  .tryMax("#{times}", "counterName")
  .on(chain1)
  .tryMax((session) => 1)
  .on(chain1)
  .tryMax((session) => 1, "counterName")
  .on(chain1)
  // exitHereIf
  .exitHereIf("#{condition}")
  .exitHereIf((session) => true)
  // exitHere
  .exitHere()
  // exitHereIfFailed
  .exitHereIfFailed()
  // stopLoadGenerator
  .stopLoadGenerator("#{message}")
  .stopLoadGenerator((session) => "message")
  // stopLoadGeneratorIf
  .stopLoadGeneratorIf("#{message}", "#{condition}")
  .stopLoadGeneratorIf(
    (session) => "message",
    (session) => true
  )
  .stopLoadGeneratorIf("#{message}", (session) => true)
  .stopLoadGeneratorIf((session) => "message", "#{condition}")
  // crashLoadGenerator
  .crashLoadGenerator("#{message}")
  .crashLoadGenerator((session) => "message")
  // crashLoadGeneratorIf
  .crashLoadGeneratorIf("#{message}", "#{condition}")
  .crashLoadGeneratorIf(
    (session) => "message",
    (session) => true
  )
  .crashLoadGeneratorIf("#{message}", (session) => true)
  .crashLoadGeneratorIf((session) => "message", "#{condition}");

//registerPebbleExtensions((io.pebbletemplates.pebble.extension.Extension) null);

const injectOpen = scn.injectOpen(
  rampUsers(5).during(1),
  rampUsers(5).during({ amount: 1, unit: "seconds" }),
  stressPeakUsers(5).during(1),
  stressPeakUsers(5).during({ amount: 1, unit: "seconds" }),
  atOnceUsers(1000),
  constantUsersPerSec(10).during(1),
  constantUsersPerSec(10).during({ amount: 1, unit: "seconds" }),
  rampUsersPerSec(100).to(200).during(1),
  rampUsersPerSec(100).to(200).during({ amount: 1, unit: "seconds" }),
  nothingFor(1),
  nothingFor({ amount: 1, unit: "seconds" }),
  incrementUsersPerSec(1.0).times(5).eachLevelLasting(1),
  incrementUsersPerSec(1.0).times(5).eachLevelLasting(1).startingFrom(1.0),
  incrementUsersPerSec(1.0).times(5).eachLevelLasting(1).separatedByRampsLasting(1),
  incrementUsersPerSec(1.0).times(5).eachLevelLasting(1).startingFrom(1.0).separatedByRampsLasting(1),
  incrementUsersPerSec(1.0)
    .times(5)
    .eachLevelLasting({ amount: 1, unit: "seconds" })
    .startingFrom(1.0)
    .separatedByRampsLasting({ amount: 1, unit: "seconds" })
);

const injectClosed = scn.injectClosed(
  constantConcurrentUsers(100).during(1),
  constantConcurrentUsers(100).during({ amount: 1, unit: "seconds" }),
  rampConcurrentUsers(1).to(5).during(1),
  rampConcurrentUsers(1).to(5).during({ amount: 1, unit: "seconds" }),
  incrementConcurrentUsers(1).times(5).eachLevelLasting(1),
  incrementConcurrentUsers(1).times(5).eachLevelLasting(1),
  incrementConcurrentUsers(1).times(5).eachLevelLasting(1).startingFrom(1),
  incrementConcurrentUsers(1).times(5).eachLevelLasting(1).separatedByRampsLasting(1),
  incrementConcurrentUsers(1).times(5).eachLevelLasting(1).startingFrom(1).separatedByRampsLasting(1),
  incrementConcurrentUsers(1)
    .times(5)
    .eachLevelLasting({ amount: 1, unit: "seconds" })
    .startingFrom(1)
    .separatedByRampsLasting({ amount: 1, unit: "seconds" })
);

const protocol: ProtocolBuilder = null;

runSimulationMock((setUp) => {
  setUp(
    injectOpen,
    injectClosed
      .protocols(protocol)
      .andThen(scn.injectOpen(atOnceUsers(1)))
      .throttle(reachRps(100).in(1))
      .disablePauses()
      .constantPauses()
      .exponentialPauses()
      .customPauses((session) => 1)
      .uniformPauses(1)
      .uniformPauses({ amount: 1, unit: "seconds" })
      .pauses("Constant")
      .noShard()
  )
    .protocols(protocol)
    .assertions(
      global().allRequests().count().is(5),
      global().allRequests().percent().is(5.5),
      forAll().allRequests().count().is(5),
      details("group", "request").allRequests().count().is(5)
    )
    .maxDuration(1)
    .maxDuration({ amount: 1, unit: "seconds" })
    .throttle(
      reachRps(100).in(1),
      reachRps(100).in({ amount: 1, unit: "seconds" }),
      jumpToRps(100),
      holdFor(1),
      holdFor({ amount: 1, unit: "seconds" })
    )
    .disablePauses()
    .constantPauses()
    .exponentialPauses()
    .customPauses((session) => 1)
    .uniformPauses(1)
    .uniformPauses({ amount: 1, unit: "seconds" })
    .normalPausesWithStdDevDuration({ amount: 50, unit: "milliseconds" })
    .normalPausesWithPercentageDuration(30)
    .pauses("Constant");
});
