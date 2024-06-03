var gatling = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // ../tmp/jvm-types/package/index.js
  var require_package = __commonJS({
    "../tmp/jvm-types/package/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DoSwitchOrElse$OrElse = exports.DoSwitchOrElse$On = exports.DoSwitch$On = exports.DoIf = exports.DoIfOrElse = exports.DoIfOrElse$Then = exports.DoIfOrElse$OrElse = exports.DoIfEquals = exports.DoIfEqualsOrElse = exports.DoIfEqualsOrElse$Then = exports.DoIfEquals$Then = exports.DoIf$Then = exports.CoreDsl = exports.ConstantRate$ConstantRateOpenInjectionStep = exports.Collectors = exports.ClosedInjectionStep = exports.ClosedInjectionStep$StairsWithTime = exports.ClosedInjectionStep$Stairs = exports.ClosedInjectionStep$RampTo = exports.ClosedInjectionStep$Ramp = exports.ClosedInjectionStep$Constant = exports.ClosedInjectionStep$Composite = exports.ChronoUnit = exports.Choice = exports.Choice$WithWeight = exports.Choice$WithKey = exports.CheckBuilder = exports.CheckBuilder$Validate = exports.CheckBuilder$MultipleFind = exports.CheckBuilder$JsonOfTypeMultipleFind = exports.CheckBuilder$JsonOfTypeFind = exports.CheckBuilder$Find = exports.CheckBuilder$Final = exports.CheckBuilder$CaptureGroupCheckBuilder = exports.ChainBuilder = exports.Body = exports.BodyPart = exports.Body$WithString = exports.Body$WithBytes = exports.Assertion = exports.Assertion$WithPath = exports.Assertion$WithPathAndTimeMetric = exports.Assertion$WithPathAndTarget = exports.Assertion$WithPathAndCountMetric = exports.AsLongAs = exports.AsLongAsDuring = exports.AsLongAsDuring$On = exports.AsLongAs$On = exports.AddCookie = exports.ActionBuilder = void 0;
      exports.PauseType$UniformPercentage = exports.PauseType$UniformDuration = exports.PauseType$NormalWithStdDevDuration = exports.PauseType$NormalWithPercentageDuration = exports.PauseType$Custom = exports.Paces = exports.Optional = exports.OpenInjectionStep = exports.OpenInjectionStep$StressPeak = exports.OpenInjectionStep$Stairs = exports.OpenInjectionStep$Ramp = exports.OpenInjectionStep$RampRate = exports.OpenInjectionStep$ConstantRate = exports.Iterable = exports.Http = exports.HttpResponseStatus = exports.HttpRequestActionBuilder = exports.HttpProtocolBuilder = exports.HttpProtocolBuilder$UntypedCondition = exports.HttpProtocolBuilder$TypedCondition = exports.HttpHeaders = exports.HttpDsl = exports.Groups = exports.Groups$On = exports.GetCookie = exports.Forever = exports.Forever$On = exports.ForEach = exports.ForEach$On = exports.Filter = exports.Filter$DenyList = exports.Filter$AllowList = exports.Feeds = exports.FeederBuilder = exports.FeederBuilder$FileBased = exports.FeederBuilder$Batchable = exports.Executable = exports.Execs = exports.Errors = exports.Errors$TryMax = exports.Errors$ExitBlockOnFail = exports.During = exports.During$On = exports.Duration = exports.DoWhile = exports.DoWhileDuring = exports.DoWhileDuring$On = exports.DoWhile$On = exports.DoSwitch = exports.DoSwitchOrElse = void 0;
      exports.Ws = exports.WsSendTextActionBuilder = exports.WsSendBinaryActionBuilder = exports.WsFrameCheck = exports.WsAwaitActionBuilder = exports.WithWeight$Then = exports.WithKey$Then = exports.UniformRandomSwitch = exports.UniformRandomSwitch$On = exports.ThrottleStep = exports.ThrottleStep$ReachIntermediate = exports.TemporalUnit = exports.StructureBuilder = exports.String = exports.Stream = exports.Stairs$Times = exports.Stairs$Composite = exports.Sse = exports.SseSetCheckActionBuilder = exports.SseMessageCheck = exports.SseConnectActionBuilder = exports.SseAwaitActionBuilder = exports.Simulation = exports.Simulation$SetUp = exports.Session = exports.ScenarioBuilder = exports.RoundRobinSwitch = exports.RoundRobinSwitch$On = exports.Response = exports.ResponseBody = exports.Request = exports.RequestBody = exports.Repeat = exports.Repeat$On = exports.RendezVous = exports.RandomSwitch = exports.RandomSwitchOrElse = exports.RandomSwitchOrElse$OrElse = exports.RandomSwitchOrElse$On = exports.RandomSwitch$On = exports.RampRate$RampRateOpenInjectionStep = exports.RampRate$During = exports.Proxy = exports.ProtocolBuilder = exports.PopulationBuilder = exports.Polling = exports.Polling$Every = exports.Pauses = exports.PauseType = void 0;
      exports.ActionBuilder = Java.type("io.gatling.javaapi.core.ActionBuilder");
      exports.AddCookie = Java.type("io.gatling.javaapi.http.AddCookie");
      exports.AsLongAs$On = Java.type("io.gatling.javaapi.core.loop.AsLongAs$On");
      exports.AsLongAsDuring$On = Java.type("io.gatling.javaapi.core.loop.AsLongAsDuring$On");
      exports.AsLongAsDuring = Java.type("io.gatling.javaapi.core.loop.AsLongAsDuring");
      exports.AsLongAs = Java.type("io.gatling.javaapi.core.loop.AsLongAs");
      exports.Assertion$WithPathAndCountMetric = Java.type("io.gatling.javaapi.core.Assertion$WithPathAndCountMetric");
      exports.Assertion$WithPathAndTarget = Java.type("io.gatling.javaapi.core.Assertion$WithPathAndTarget");
      exports.Assertion$WithPathAndTimeMetric = Java.type("io.gatling.javaapi.core.Assertion$WithPathAndTimeMetric");
      exports.Assertion$WithPath = Java.type("io.gatling.javaapi.core.Assertion$WithPath");
      exports.Assertion = Java.type("io.gatling.javaapi.core.Assertion");
      exports.Body$WithBytes = Java.type("io.gatling.javaapi.core.Body$WithBytes");
      exports.Body$WithString = Java.type("io.gatling.javaapi.core.Body$WithString");
      exports.BodyPart = Java.type("io.gatling.javaapi.http.BodyPart");
      exports.Body = Java.type("io.gatling.javaapi.core.Body");
      exports.ChainBuilder = Java.type("io.gatling.javaapi.core.ChainBuilder");
      exports.CheckBuilder$CaptureGroupCheckBuilder = Java.type("io.gatling.javaapi.core.CheckBuilder$CaptureGroupCheckBuilder");
      exports.CheckBuilder$Final = Java.type("io.gatling.javaapi.core.CheckBuilder$Final");
      exports.CheckBuilder$Find = Java.type("io.gatling.javaapi.core.CheckBuilder$Find");
      exports.CheckBuilder$JsonOfTypeFind = Java.type("io.gatling.javaapi.core.CheckBuilder$JsonOfTypeFind");
      exports.CheckBuilder$JsonOfTypeMultipleFind = Java.type("io.gatling.javaapi.core.CheckBuilder$JsonOfTypeMultipleFind");
      exports.CheckBuilder$MultipleFind = Java.type("io.gatling.javaapi.core.CheckBuilder$MultipleFind");
      exports.CheckBuilder$Validate = Java.type("io.gatling.javaapi.core.CheckBuilder$Validate");
      exports.CheckBuilder = Java.type("io.gatling.javaapi.core.CheckBuilder");
      exports.Choice$WithKey = Java.type("io.gatling.javaapi.core.Choice$WithKey");
      exports.Choice$WithWeight = Java.type("io.gatling.javaapi.core.Choice$WithWeight");
      exports.Choice = Java.type("io.gatling.javaapi.core.Choice");
      exports.ChronoUnit = Java.type("java.time.temporal.ChronoUnit");
      exports.ClosedInjectionStep$Composite = Java.type("io.gatling.javaapi.core.ClosedInjectionStep$Composite");
      exports.ClosedInjectionStep$Constant = Java.type("io.gatling.javaapi.core.ClosedInjectionStep$Constant");
      exports.ClosedInjectionStep$Ramp = Java.type("io.gatling.javaapi.core.ClosedInjectionStep$Ramp");
      exports.ClosedInjectionStep$RampTo = Java.type("io.gatling.javaapi.core.ClosedInjectionStep$RampTo");
      exports.ClosedInjectionStep$Stairs = Java.type("io.gatling.javaapi.core.ClosedInjectionStep$Stairs");
      exports.ClosedInjectionStep$StairsWithTime = Java.type("io.gatling.javaapi.core.ClosedInjectionStep$StairsWithTime");
      exports.ClosedInjectionStep = Java.type("io.gatling.javaapi.core.ClosedInjectionStep");
      exports.Collectors = Java.type("java.util.stream.Collectors");
      exports.ConstantRate$ConstantRateOpenInjectionStep = Java.type("io.gatling.javaapi.core.OpenInjectionStep$ConstantRate$ConstantRateOpenInjectionStep");
      exports.CoreDsl = Java.type("io.gatling.javaapi.core.CoreDsl");
      exports.DoIf$Then = Java.type("io.gatling.javaapi.core.condition.DoIf$Then");
      exports.DoIfEquals$Then = Java.type("io.gatling.javaapi.core.condition.DoIfEquals$Then");
      exports.DoIfEqualsOrElse$Then = Java.type("io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then");
      exports.DoIfEqualsOrElse = Java.type("io.gatling.javaapi.core.condition.DoIfEqualsOrElse");
      exports.DoIfEquals = Java.type("io.gatling.javaapi.core.condition.DoIfEquals");
      exports.DoIfOrElse$OrElse = Java.type("io.gatling.javaapi.core.condition.DoIfOrElse$OrElse");
      exports.DoIfOrElse$Then = Java.type("io.gatling.javaapi.core.condition.DoIfOrElse$Then");
      exports.DoIfOrElse = Java.type("io.gatling.javaapi.core.condition.DoIfOrElse");
      exports.DoIf = Java.type("io.gatling.javaapi.core.condition.DoIf");
      exports.DoSwitch$On = Java.type("io.gatling.javaapi.core.condition.DoSwitch$On");
      exports.DoSwitchOrElse$On = Java.type("io.gatling.javaapi.core.condition.DoSwitchOrElse$On");
      exports.DoSwitchOrElse$OrElse = Java.type("io.gatling.javaapi.core.condition.DoSwitchOrElse$OrElse");
      exports.DoSwitchOrElse = Java.type("io.gatling.javaapi.core.condition.DoSwitchOrElse");
      exports.DoSwitch = Java.type("io.gatling.javaapi.core.condition.DoSwitch");
      exports.DoWhile$On = Java.type("io.gatling.javaapi.core.loop.DoWhile$On");
      exports.DoWhileDuring$On = Java.type("io.gatling.javaapi.core.loop.DoWhileDuring$On");
      exports.DoWhileDuring = Java.type("io.gatling.javaapi.core.loop.DoWhileDuring");
      exports.DoWhile = Java.type("io.gatling.javaapi.core.loop.DoWhile");
      exports.Duration = Java.type("java.time.Duration");
      exports.During$On = Java.type("io.gatling.javaapi.core.loop.During$On");
      exports.During = Java.type("io.gatling.javaapi.core.loop.During");
      exports.Errors$ExitBlockOnFail = Java.type("io.gatling.javaapi.core.error.Errors$ExitBlockOnFail");
      exports.Errors$TryMax = Java.type("io.gatling.javaapi.core.error.Errors$TryMax");
      exports.Errors = Java.type("io.gatling.javaapi.core.error.Errors");
      exports.Execs = Java.type("io.gatling.javaapi.core.exec.Execs");
      exports.Executable = Java.type("io.gatling.javaapi.core.exec.Executable");
      exports.FeederBuilder$Batchable = Java.type("io.gatling.javaapi.core.FeederBuilder$Batchable");
      exports.FeederBuilder$FileBased = Java.type("io.gatling.javaapi.core.FeederBuilder$FileBased");
      exports.FeederBuilder = Java.type("io.gatling.javaapi.core.FeederBuilder");
      exports.Feeds = Java.type("io.gatling.javaapi.core.feed.Feeds");
      exports.Filter$AllowList = Java.type("io.gatling.javaapi.core.Filter$AllowList");
      exports.Filter$DenyList = Java.type("io.gatling.javaapi.core.Filter$DenyList");
      exports.Filter = Java.type("io.gatling.javaapi.core.Filter");
      exports.ForEach$On = Java.type("io.gatling.javaapi.core.loop.ForEach$On");
      exports.ForEach = Java.type("io.gatling.javaapi.core.loop.ForEach");
      exports.Forever$On = Java.type("io.gatling.javaapi.core.loop.Forever$On");
      exports.Forever = Java.type("io.gatling.javaapi.core.loop.Forever");
      exports.GetCookie = Java.type("io.gatling.javaapi.http.GetCookie");
      exports.Groups$On = Java.type("io.gatling.javaapi.core.group.Groups$On");
      exports.Groups = Java.type("io.gatling.javaapi.core.group.Groups");
      exports.HttpDsl = Java.type("io.gatling.javaapi.http.HttpDsl");
      exports.HttpHeaders = Java.type("io.netty.handler.codec.http.HttpHeaders");
      exports.HttpProtocolBuilder$TypedCondition = Java.type("io.gatling.javaapi.http.HttpProtocolBuilder$TypedCondition");
      exports.HttpProtocolBuilder$UntypedCondition = Java.type("io.gatling.javaapi.http.HttpProtocolBuilder$UntypedCondition");
      exports.HttpProtocolBuilder = Java.type("io.gatling.javaapi.http.HttpProtocolBuilder");
      exports.HttpRequestActionBuilder = Java.type("io.gatling.javaapi.http.HttpRequestActionBuilder");
      exports.HttpResponseStatus = Java.type("io.netty.handler.codec.http.HttpResponseStatus");
      exports.Http = Java.type("io.gatling.javaapi.http.Http");
      exports.Iterable = Java.type("java.lang.Iterable");
      exports.OpenInjectionStep$ConstantRate = Java.type("io.gatling.javaapi.core.OpenInjectionStep$ConstantRate");
      exports.OpenInjectionStep$RampRate = Java.type("io.gatling.javaapi.core.OpenInjectionStep$RampRate");
      exports.OpenInjectionStep$Ramp = Java.type("io.gatling.javaapi.core.OpenInjectionStep$Ramp");
      exports.OpenInjectionStep$Stairs = Java.type("io.gatling.javaapi.core.OpenInjectionStep$Stairs");
      exports.OpenInjectionStep$StressPeak = Java.type("io.gatling.javaapi.core.OpenInjectionStep$StressPeak");
      exports.OpenInjectionStep = Java.type("io.gatling.javaapi.core.OpenInjectionStep");
      exports.Optional = Java.type("java.util.Optional");
      exports.Paces = Java.type("io.gatling.javaapi.core.pause.Paces");
      exports.PauseType$Custom = Java.type("io.gatling.javaapi.core.PauseType$Custom");
      exports.PauseType$NormalWithPercentageDuration = Java.type("io.gatling.javaapi.core.PauseType$NormalWithPercentageDuration");
      exports.PauseType$NormalWithStdDevDuration = Java.type("io.gatling.javaapi.core.PauseType$NormalWithStdDevDuration");
      exports.PauseType$UniformDuration = Java.type("io.gatling.javaapi.core.PauseType$UniformDuration");
      exports.PauseType$UniformPercentage = Java.type("io.gatling.javaapi.core.PauseType$UniformPercentage");
      exports.PauseType = Java.type("io.gatling.javaapi.core.PauseType");
      exports.Pauses = Java.type("io.gatling.javaapi.core.pause.Pauses");
      exports.Polling$Every = Java.type("io.gatling.javaapi.http.Polling$Every");
      exports.Polling = Java.type("io.gatling.javaapi.http.Polling");
      exports.PopulationBuilder = Java.type("io.gatling.javaapi.core.PopulationBuilder");
      exports.ProtocolBuilder = Java.type("io.gatling.javaapi.core.ProtocolBuilder");
      exports.Proxy = Java.type("io.gatling.javaapi.http.Proxy");
      exports.RampRate$During = Java.type("io.gatling.javaapi.core.OpenInjectionStep$RampRate$During");
      exports.RampRate$RampRateOpenInjectionStep = Java.type("io.gatling.javaapi.core.OpenInjectionStep$RampRate$RampRateOpenInjectionStep");
      exports.RandomSwitch$On = Java.type("io.gatling.javaapi.core.condition.RandomSwitch$On");
      exports.RandomSwitchOrElse$On = Java.type("io.gatling.javaapi.core.condition.RandomSwitchOrElse$On");
      exports.RandomSwitchOrElse$OrElse = Java.type("io.gatling.javaapi.core.condition.RandomSwitchOrElse$OrElse");
      exports.RandomSwitchOrElse = Java.type("io.gatling.javaapi.core.condition.RandomSwitchOrElse");
      exports.RandomSwitch = Java.type("io.gatling.javaapi.core.condition.RandomSwitch");
      exports.RendezVous = Java.type("io.gatling.javaapi.core.pause.RendezVous");
      exports.Repeat$On = Java.type("io.gatling.javaapi.core.loop.Repeat$On");
      exports.Repeat = Java.type("io.gatling.javaapi.core.loop.Repeat");
      exports.RequestBody = Java.type("io.gatling.http.client.body.RequestBody");
      exports.Request = Java.type("io.gatling.http.client.Request");
      exports.ResponseBody = Java.type("io.gatling.http.response.ResponseBody");
      exports.Response = Java.type("io.gatling.http.response.Response");
      exports.RoundRobinSwitch$On = Java.type("io.gatling.javaapi.core.condition.RoundRobinSwitch$On");
      exports.RoundRobinSwitch = Java.type("io.gatling.javaapi.core.condition.RoundRobinSwitch");
      exports.ScenarioBuilder = Java.type("io.gatling.javaapi.core.ScenarioBuilder");
      exports.Session = Java.type("io.gatling.javaapi.core.Session");
      exports.Simulation$SetUp = Java.type("io.gatling.javaapi.core.Simulation$SetUp");
      exports.Simulation = Java.type("io.gatling.javaapi.core.Simulation");
      exports.SseAwaitActionBuilder = Java.type("io.gatling.javaapi.http.SseAwaitActionBuilder");
      exports.SseConnectActionBuilder = Java.type("io.gatling.javaapi.http.SseConnectActionBuilder");
      exports.SseMessageCheck = Java.type("io.gatling.javaapi.http.SseMessageCheck");
      exports.SseSetCheckActionBuilder = Java.type("io.gatling.javaapi.http.SseSetCheckActionBuilder");
      exports.Sse = Java.type("io.gatling.javaapi.http.Sse");
      exports.Stairs$Composite = Java.type("io.gatling.javaapi.core.OpenInjectionStep$Stairs$Composite");
      exports.Stairs$Times = Java.type("io.gatling.javaapi.core.OpenInjectionStep$Stairs$Times");
      exports.Stream = Java.type("java.util.stream.Stream");
      exports.String = Java.type("java.lang.String");
      exports.StructureBuilder = Java.type("io.gatling.javaapi.core.StructureBuilder");
      exports.TemporalUnit = Java.type("java.time.temporal.TemporalUnit");
      exports.ThrottleStep$ReachIntermediate = Java.type("io.gatling.javaapi.core.ThrottleStep$ReachIntermediate");
      exports.ThrottleStep = Java.type("io.gatling.javaapi.core.ThrottleStep");
      exports.UniformRandomSwitch$On = Java.type("io.gatling.javaapi.core.condition.UniformRandomSwitch$On");
      exports.UniformRandomSwitch = Java.type("io.gatling.javaapi.core.condition.UniformRandomSwitch");
      exports.WithKey$Then = Java.type("io.gatling.javaapi.core.Choice$WithKey$Then");
      exports.WithWeight$Then = Java.type("io.gatling.javaapi.core.Choice$WithWeight$Then");
      exports.WsAwaitActionBuilder = Java.type("io.gatling.javaapi.http.WsAwaitActionBuilder");
      exports.WsFrameCheck = Java.type("io.gatling.javaapi.http.WsFrameCheck");
      exports.WsSendBinaryActionBuilder = Java.type("io.gatling.javaapi.http.WsSendBinaryActionBuilder");
      exports.WsSendTextActionBuilder = Java.type("io.gatling.javaapi.http.WsSendTextActionBuilder");
      exports.Ws = Java.type("io.gatling.javaapi.http.Ws");
    }
  });

  // ../tmp/core/package/target/gatlingJvm/callbacks.js
  var require_callbacks = __commonJS({
    "../tmp/core/package/target/gatlingJvm/callbacks.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapBiCallback = exports.wrapCallback = exports.wrapByteArrayCallback = exports.wrapByteArray = void 0;
      var wrapByteArray = (v) => v;
      exports.wrapByteArray = wrapByteArray;
      var wrapByteArrayCallback = (f) => f;
      exports.wrapByteArrayCallback = wrapByteArrayCallback;
      var wrapCallback = (f) => f;
      exports.wrapCallback = wrapCallback;
      var wrapBiCallback = (f) => f;
      exports.wrapBiCallback = wrapBiCallback;
    }
  });

  // ../tmp/core/package/target/utils/duration.js
  var require_duration = __commonJS({
    "../tmp/core/package/target/utils/duration.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.toJvmDuration = exports.isDuration = void 0;
      var jvm_types_1 = require_package();
      var isDuration = (x) => typeof x === "number" || typeof x === "object" && typeof x.amount === "number" && typeof x.unit === "string";
      exports.isDuration = isDuration;
      var toJvmDuration = (duration) => {
        const { amount, unit } = typeof duration === "number" ? { amount: duration, unit: "seconds" } : duration;
        switch (unit) {
          case "milliseconds":
            return jvm_types_1.Duration.ofMillis(amount);
          case "seconds":
            return jvm_types_1.Duration.ofSeconds(amount);
          case "minutes":
            return jvm_types_1.Duration.ofMinutes(amount);
          default:
            return jvm_types_1.Duration.ofSeconds(amount);
        }
      };
      exports.toJvmDuration = toJvmDuration;
    }
  });

  // ../tmp/core/package/target/gatlingJvm/collections.js
  var require_collections = __commonJS({
    "../tmp/core/package/target/gatlingJvm/collections.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.asJava = void 0;
      var ArrayList = Java.type("java.util.ArrayList");
      var HashMap = Java.type("java.util.HashMap");
      var asJavaList = (elements) => {
        const javaList = new ArrayList();
        for (let i = 0; i < elements.length; i++) {
          javaList.add((0, exports.asJava)(elements[i]));
        }
        return javaList;
      };
      var asJavaMap = (records) => {
        const javaMap = new HashMap();
        Object.entries(records).forEach(([key, value]) => {
          javaMap.put(key, (0, exports.asJava)(value));
        });
        return javaMap;
      };
      var asJava = (value) => {
        if (Array.isArray(value)) {
          return asJavaList(value);
        } else if (typeof value === "object" && value !== null) {
          return asJavaMap(value);
        } else {
          return value;
        }
      };
      exports.asJava = asJava;
    }
  });

  // ../tmp/core/package/target/session.js
  var require_session = __commonJS({
    "../tmp/core/package/target/session.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.underlyingXWithSessionTo = exports.underlyingSessionToDuration = exports.underlyingSessionToJava = exports.underlyingSessionTo = exports.underlyingSessionTransform = exports.wrapSession = void 0;
      var callbacks_1 = require_callbacks();
      var collections_1 = require_collections();
      var duration_1 = require_duration();
      var wrapSession = (_underlying) => ({
        _underlying,
        get: (key) => _underlying.get(key),
        set: (key, value) => {
          return (0, exports.wrapSession)(_underlying.set(key, (0, collections_1.asJava)(value)));
        },
        setByteArray: (key, value) => (0, exports.wrapSession)(_underlying.set(key, (0, callbacks_1.wrapByteArray)(value))),
        setAll: (newAttributes) => {
          let session = _underlying;
          for (const key in newAttributes) {
            session = session.set(key, (0, collections_1.asJava)(newAttributes[key]));
          }
          return (0, exports.wrapSession)(session);
        },
        remove: (key) => (0, exports.wrapSession)(_underlying.remove(key)),
        reset: () => (0, exports.wrapSession)(_underlying.reset()),
        removeAll: (...keys) => (0, exports.wrapSession)(_underlying.removeAll(...keys)),
        contains: (key) => _underlying.contains(key),
        isFailed: () => _underlying.isFailed(),
        markAsSucceeded: () => (0, exports.wrapSession)(_underlying.markAsSucceeded()),
        markAsFailed: () => (0, exports.wrapSession)(_underlying.markAsFailed()),
        scenario: () => _underlying.scenario(),
        groups: () => _underlying.groups(),
        userId: () => _underlying.userId(),
        toString: () => _underlying.toString()
      });
      exports.wrapSession = wrapSession;
      var underlyingSessionTransform = (f) => (jvmSession) => f((0, exports.wrapSession)(jvmSession))._underlying;
      exports.underlyingSessionTransform = underlyingSessionTransform;
      var underlyingSessionTo = (f) => (jvmSession) => f((0, exports.wrapSession)(jvmSession));
      exports.underlyingSessionTo = underlyingSessionTo;
      var underlyingSessionToJava = (f) => (jvmSession) => (0, collections_1.asJava)(f((0, exports.wrapSession)(jvmSession)));
      exports.underlyingSessionToJava = underlyingSessionToJava;
      var underlyingSessionToDuration = (f) => (jvmSession) => (0, duration_1.toJvmDuration)(f((0, exports.wrapSession)(jvmSession)));
      exports.underlyingSessionToDuration = underlyingSessionToDuration;
      var underlyingXWithSessionTo = (f) => (x, jvmSession) => f(x, (0, exports.wrapSession)(jvmSession));
      exports.underlyingXWithSessionTo = underlyingXWithSessionTo;
    }
  });

  // ../tmp/core/package/target/structure/pauses.js
  var require_pauses = __commonJS({
    "../tmp/core/package/target/structure/pauses.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.pauseImpl = exports.toJvmPauseType = void 0;
      var jvm_types_1 = require_package();
      var duration_1 = require_duration();
      var session_1 = require_session();
      var callbacks_1 = require_callbacks();
      var isPauseType = (x) => x === "Disabled" || x === "Constant" || x === "Exponential" || typeof x.type === "string";
      var toJvmPauseType = (pauseType) => {
        if (pauseType === "Disabled") {
          return jvm_types_1.CoreDsl.disabledPauses;
        } else if (pauseType === "Constant") {
          return jvm_types_1.CoreDsl.constantPauses;
        } else if (pauseType === "Exponential") {
          return jvm_types_1.CoreDsl.exponentialPauses;
        } else if (pauseType.type === "NormalWithPercentageDuration") {
          return jvm_types_1.CoreDsl.normalPausesWithPercentageDuration(pauseType.stdDev);
        } else if (pauseType.type === "NormalWithStdDevDuration") {
          return jvm_types_1.CoreDsl.normalPausesWithStdDevDuration((0, duration_1.toJvmDuration)(pauseType.stdDev));
        } else if (pauseType.type === "Custom") {
          return jvm_types_1.CoreDsl.customPauses((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(pauseType.f)));
        } else if (pauseType.type === "UniformPercentage") {
          return jvm_types_1.CoreDsl.uniformPausesPlusOrMinusPercentage(pauseType.plusOrMinus);
        } else if (pauseType.type === "UniformDuration") {
          return jvm_types_1.CoreDsl.uniformPausesPlusOrMinusDuration((0, duration_1.toJvmDuration)(pauseType.plusOrMinus));
        }
        throw Error(`Unhandled pause type ${pauseType}`);
      };
      exports.toJvmPauseType = toJvmPauseType;
      var pauseImpl = (jvmGroups, wrap) => (arg0, arg1, arg2) => {
        if (arg2 !== void 0) {
          if (typeof arg0 === "string" && typeof arg1 === "string") {
            return wrap(jvmGroups.pause(arg0, arg1, (0, exports.toJvmPauseType)(arg2)));
          } else if (typeof arg0 === "function" && typeof arg1 === "function") {
            return wrap(jvmGroups.pause((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(arg0)), (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(arg1)), (0, exports.toJvmPauseType)(arg2)));
          } else if ((0, duration_1.isDuration)(arg0) && (0, duration_1.isDuration)(arg1)) {
            return wrap(jvmGroups.pause((0, duration_1.toJvmDuration)(arg0), (0, duration_1.toJvmDuration)(arg1), (0, exports.toJvmPauseType)(arg2)));
          }
        } else if (arg1 !== void 0) {
          if (isPauseType(arg1)) {
            if (typeof arg0 === "string") {
              return wrap(jvmGroups.pause(arg0, (0, exports.toJvmPauseType)(arg1)));
            } else if (typeof arg0 === "function") {
              return wrap(jvmGroups.pause((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(arg0)), (0, exports.toJvmPauseType)(arg1)));
            } else if ((0, duration_1.isDuration)(arg0)) {
              return wrap(jvmGroups.pause((0, duration_1.toJvmDuration)(arg0), (0, exports.toJvmPauseType)(arg1)));
            }
          } else {
            if (typeof arg0 === "string" && typeof arg1 === "string") {
              return wrap(jvmGroups.pause(arg0, arg1));
            } else if (typeof arg0 === "function" && typeof arg1 === "function") {
              return wrap(jvmGroups.pause((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(arg0)), (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(arg1))));
            } else if ((0, duration_1.isDuration)(arg0) && (0, duration_1.isDuration)(arg1)) {
              return wrap(jvmGroups.pause((0, duration_1.toJvmDuration)(arg0), (0, duration_1.toJvmDuration)(arg1)));
            }
          }
        } else {
          if (typeof arg0 === "string") {
            return wrap(jvmGroups.pause(arg0));
          } else if (typeof arg0 === "function") {
            return wrap(jvmGroups.pause((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(arg0))));
          } else if ((0, duration_1.isDuration)(arg0)) {
            return wrap(jvmGroups.pause((0, duration_1.toJvmDuration)(arg0)));
          }
        }
        throw Error(`pause() called with invalid arguments ${arg0}, ${arg1}, ${arg2}`);
      };
      exports.pauseImpl = pauseImpl;
    }
  });

  // ../tmp/core/package/target/assertions.js
  var require_assertions = __commonJS({
    "../tmp/core/package/target/assertions.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.details = exports.forAll = exports.global = void 0;
      var jvm_types_1 = require_package();
      var global2 = () => wrapAssertionWithPath(jvm_types_1.CoreDsl.global());
      exports.global = global2;
      var forAll = () => wrapAssertionWithPath(jvm_types_1.CoreDsl.forAll());
      exports.forAll = forAll;
      var details = (...parts) => wrapAssertionWithPath(jvm_types_1.CoreDsl.details(...parts));
      exports.details = details;
      var wrapAssertionWithPath = (_underlying) => ({
        responseTime: () => wrapAssertionWithPathAndTimeMetric(_underlying.responseTime()),
        allRequests: () => wrapAssertionWithPathAndCountMetric(_underlying.allRequests()),
        failedRequests: () => wrapAssertionWithPathAndCountMetric(_underlying.failedRequests()),
        successfulRequests: () => wrapAssertionWithPathAndCountMetric(_underlying.successfulRequests()),
        requestsPerSec: () => wrapAssertionWithPathAndTarget(_underlying.requestsPerSec())
      });
      var wrapAssertionWithPathAndTimeMetric = (_underlying) => ({
        min: () => wrapAssertionWithPathAndTarget(_underlying.min()),
        max: () => wrapAssertionWithPathAndTarget(_underlying.max()),
        mean: () => wrapAssertionWithPathAndTarget(_underlying.mean()),
        stdDev: () => wrapAssertionWithPathAndTarget(_underlying.stdDev()),
        percentile1: () => wrapAssertionWithPathAndTarget(_underlying.percentile1()),
        percentile2: () => wrapAssertionWithPathAndTarget(_underlying.percentile2()),
        percentile3: () => wrapAssertionWithPathAndTarget(_underlying.percentile3()),
        percentile4: () => wrapAssertionWithPathAndTarget(_underlying.percentile4()),
        percentile: (value) => wrapAssertionWithPathAndTarget(_underlying.percentile(value))
      });
      var wrapAssertionWithPathAndCountMetric = (_underlying) => ({
        count: () => wrapAssertionWithPathAndTarget(_underlying.count()),
        percent: () => wrapAssertionWithPathAndTarget(_underlying.percent())
      });
      var wrapAssertionWithPathAndTarget = (_underlying) => ({
        lt: (value) => wrapAssertion(_underlying.lt(value)),
        lte: (value) => wrapAssertion(_underlying.lte(value)),
        gt: (value) => wrapAssertion(_underlying.gt(value)),
        gte: (value) => wrapAssertion(_underlying.gte(value)),
        between: (min, max, inclusive) => wrapAssertion(inclusive !== void 0 ? _underlying.between(min, max, inclusive) : _underlying.between(min, max)),
        around: (mean, plusOrMinus, inclusive) => wrapAssertion(inclusive !== void 0 ? _underlying.around(mean, plusOrMinus, inclusive) : _underlying.around(mean, plusOrMinus)),
        deviatesAround: (mean, percentDeviation, inclusive) => wrapAssertion(inclusive !== void 0 ? _underlying.deviatesAround(mean, percentDeviation, inclusive) : _underlying.deviatesAround(mean, percentDeviation)),
        is: (value) => wrapAssertion(_underlying.is(value)),
        in: (...values) => wrapAssertion(_underlying.in(values))
      });
      var wrapAssertion = (_underlying) => ({
        _underlying
      });
    }
  });

  // ../tmp/core/package/target/body.js
  var require_body = __commonJS({
    "../tmp/core/package/target/body.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ByteArrayBody = exports.PebbleFileBody = exports.PebbleStringBody = exports.ElFileBody = exports.RawFileBody = exports.StringBody = void 0;
      var jvm_types_1 = require_package();
      var callbacks_1 = require_callbacks();
      var session_1 = require_session();
      var wrapBodyWithBytes = (_underlying) => Object.assign((session) => _underlying.apply(session._underlying), { _underlying });
      var wrapBodyWithString = (_underlying) => Object.assign((session) => _underlying.apply(session._underlying), { _underlying });
      var StringBody = (string) => wrapBodyWithString(typeof string === "function" ? jvm_types_1.CoreDsl.StringBody((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(string))) : jvm_types_1.CoreDsl.StringBody(string));
      exports.StringBody = StringBody;
      var RawFileBody = (filePath) => wrapBodyWithBytes(typeof filePath === "function" ? jvm_types_1.CoreDsl.RawFileBody((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(filePath))) : jvm_types_1.CoreDsl.RawFileBody(filePath));
      exports.RawFileBody = RawFileBody;
      var ElFileBody = (filePath) => wrapBodyWithString(typeof filePath === "function" ? jvm_types_1.CoreDsl.ElFileBody((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(filePath))) : jvm_types_1.CoreDsl.ElFileBody(filePath));
      exports.ElFileBody = ElFileBody;
      var PebbleStringBody = (string) => wrapBodyWithString(jvm_types_1.CoreDsl.PebbleStringBody(string));
      exports.PebbleStringBody = PebbleStringBody;
      var PebbleFileBody = (filePath) => wrapBodyWithString(typeof filePath === "function" ? jvm_types_1.CoreDsl.PebbleFileBody((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(filePath))) : jvm_types_1.CoreDsl.PebbleFileBody(filePath));
      exports.PebbleFileBody = PebbleFileBody;
      var ByteArrayBody = (bytes) => wrapBodyWithBytes(typeof bytes === "function" ? jvm_types_1.CoreDsl.ByteArrayBody((0, callbacks_1.wrapByteArrayCallback)((0, session_1.underlyingSessionTo)(bytes))) : typeof bytes === "string" ? jvm_types_1.CoreDsl.ByteArrayBody(bytes) : jvm_types_1.CoreDsl.ByteArrayBody(bytes));
      exports.ByteArrayBody = ByteArrayBody;
    }
  });

  // ../tmp/core/package/target/checks/builder.js
  var require_builder = __commonJS({
    "../tmp/core/package/target/checks/builder.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapCheckBuilder = void 0;
      var wrapCheckBuilder = (_underlying) => ({
        _underlying
      });
      exports.wrapCheckBuilder = wrapCheckBuilder;
    }
  });

  // ../tmp/core/package/target/checks/final.js
  var require_final = __commonJS({
    "../tmp/core/package/target/checks/final.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapCheckBuilderFinal = void 0;
      var builder_1 = require_builder();
      var wrapCheckBuilderFinal = (_underlying) => ({
        ...(0, builder_1.wrapCheckBuilder)(_underlying),
        name: (n) => (0, exports.wrapCheckBuilderFinal)(_underlying.name(n)),
        saveAs: (key) => (0, exports.wrapCheckBuilderFinal)(_underlying.saveAs(key))
      });
      exports.wrapCheckBuilderFinal = wrapCheckBuilderFinal;
    }
  });

  // ../tmp/core/package/target/checks/validate.js
  var require_validate = __commonJS({
    "../tmp/core/package/target/checks/validate.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapCheckBuilderValidate = void 0;
      var callbacks_1 = require_callbacks();
      var session_1 = require_session();
      var final_1 = require_final();
      var wrapCheckBuilderValidate = (_underlying) => ({
        ...(0, final_1.wrapCheckBuilderFinal)(_underlying),
        transform: (f) => (0, exports.wrapCheckBuilderValidate)(_underlying.transform((0, callbacks_1.wrapCallback)(f))),
        transformWithSession: (f) => (0, exports.wrapCheckBuilderValidate)(_underlying.transformWithSession((0, callbacks_1.wrapBiCallback)((0, session_1.underlyingXWithSessionTo)(f)))),
        withDefault: (value) => (0, exports.wrapCheckBuilderValidate)(typeof value === "function" ? _underlying.withDefault((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(value))) : _underlying.withDefault(value)),
        withDefaultEL: (value) => (0, exports.wrapCheckBuilderValidate)(_underlying.withDefaultEl(value)),
        validate: (name, f) => (0, final_1.wrapCheckBuilderFinal)(_underlying.validate(name, (0, callbacks_1.wrapBiCallback)((0, session_1.underlyingXWithSessionTo)(f)))),
        is: (expected) => (0, final_1.wrapCheckBuilderFinal)(typeof expected === "function" ? _underlying.is((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(expected))) : _underlying.is(expected)),
        isEL: (expected) => (0, final_1.wrapCheckBuilderFinal)(_underlying.isEL(expected)),
        isNull: () => (0, final_1.wrapCheckBuilderFinal)(_underlying.isNull()),
        not: (expected) => (0, final_1.wrapCheckBuilderFinal)(typeof expected === "function" ? _underlying.not((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(expected))) : _underlying.not(expected)),
        notEL: (expected) => (0, final_1.wrapCheckBuilderFinal)(_underlying.notEL(expected)),
        notNull: () => (0, final_1.wrapCheckBuilderFinal)(_underlying.notNull()),
        in: (expected, ...rest) => (0, final_1.wrapCheckBuilderFinal)(typeof expected === "function" ? _underlying.in((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(expected))) : _underlying.in([expected, ...rest])),
        inEL: (expected) => (0, final_1.wrapCheckBuilderFinal)(_underlying.inEL(expected)),
        exists: () => (0, final_1.wrapCheckBuilderFinal)(_underlying.exists()),
        notExists: () => (0, final_1.wrapCheckBuilderFinal)(_underlying.notExists()),
        optional: () => (0, final_1.wrapCheckBuilderFinal)(_underlying.optional()),
        lt: (value) => (0, final_1.wrapCheckBuilderFinal)(typeof value === "function" ? _underlying.lt((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(value))) : _underlying.lt(value)),
        ltEL: (value) => (0, final_1.wrapCheckBuilderFinal)(_underlying.ltEL(value)),
        lte: (value) => (0, final_1.wrapCheckBuilderFinal)(typeof value === "function" ? _underlying.lte((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(value))) : _underlying.lte(value)),
        lteEL: (value) => (0, final_1.wrapCheckBuilderFinal)(_underlying.lteEL(value)),
        gt: (value) => (0, final_1.wrapCheckBuilderFinal)(typeof value === "function" ? _underlying.gt((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(value))) : _underlying.gt(value)),
        gtEL: (value) => (0, final_1.wrapCheckBuilderFinal)(_underlying.gtEL(value)),
        gte: (value) => (0, final_1.wrapCheckBuilderFinal)(typeof value === "function" ? _underlying.gte((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(value))) : _underlying.gte(value)),
        gteEL: (value) => (0, final_1.wrapCheckBuilderFinal)(_underlying.gteEL(value))
      });
      exports.wrapCheckBuilderValidate = wrapCheckBuilderValidate;
    }
  });

  // ../tmp/core/package/target/checks/multipleFind.js
  var require_multipleFind = __commonJS({
    "../tmp/core/package/target/checks/multipleFind.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapCheckBuilderMultipleFind = void 0;
      var validate_1 = require_validate();
      var wrapCheckBuilderMultipleFind = (_underlying) => ({
        ...(0, validate_1.wrapCheckBuilderValidate)(_underlying),
        find: (occurrence) => (0, validate_1.wrapCheckBuilderValidate)(occurrence !== void 0 ? _underlying.find(occurrence) : _underlying.find()),
        findAll: () => (0, validate_1.wrapCheckBuilderValidate)(_underlying.findAll()),
        findRandom: (num, failIfLess) => {
          if (num !== void 0) {
            if (failIfLess !== void 0) {
              return (0, validate_1.wrapCheckBuilderValidate)(_underlying.findRandom(num, failIfLess));
            } else {
              return (0, validate_1.wrapCheckBuilderValidate)(_underlying.findRandom(num));
            }
          } else {
            return (0, validate_1.wrapCheckBuilderValidate)(_underlying.findRandom());
          }
        },
        count: function() {
          throw new Error("Function not implemented.");
        }
      });
      exports.wrapCheckBuilderMultipleFind = wrapCheckBuilderMultipleFind;
    }
  });

  // ../tmp/core/package/target/checks/captureGroup.js
  var require_captureGroup = __commonJS({
    "../tmp/core/package/target/checks/captureGroup.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapCheckBuilderCaptureGroup = void 0;
      var multipleFind_1 = require_multipleFind();
      var wrapCheckBuilderCaptureGroup = (_underlying) => ({
        ...(0, multipleFind_1.wrapCheckBuilderMultipleFind)(_underlying),
        captureGroups: (count) => (0, multipleFind_1.wrapCheckBuilderMultipleFind)(_underlying.captureGroups(count))
      });
      exports.wrapCheckBuilderCaptureGroup = wrapCheckBuilderCaptureGroup;
    }
  });

  // ../tmp/core/package/target/checks/find.js
  var require_find = __commonJS({
    "../tmp/core/package/target/checks/find.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapCheckBuilderFind = void 0;
      var validate_1 = require_validate();
      var wrapCheckBuilderFind = (_underlying) => ({
        ...(0, validate_1.wrapCheckBuilderValidate)(_underlying),
        find: () => (0, validate_1.wrapCheckBuilderValidate)(_underlying.find())
      });
      exports.wrapCheckBuilderFind = wrapCheckBuilderFind;
    }
  });

  // ../tmp/core/package/target/checks/jsonOfTypeFind.js
  var require_jsonOfTypeFind = __commonJS({
    "../tmp/core/package/target/checks/jsonOfTypeFind.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapCheckBuilderJsonOfTypeFind = void 0;
      var find_1 = require_find();
      var wrapCheckBuilderJsonOfTypeFind = (_underlying) => ({
        ...(0, find_1.wrapCheckBuilderFind)(_underlying),
        ofString: () => (0, find_1.wrapCheckBuilderFind)(_underlying.ofString()),
        ofBoolean: () => (0, find_1.wrapCheckBuilderFind)(_underlying.ofBoolean()),
        ofInt: () => (0, find_1.wrapCheckBuilderFind)(_underlying.ofInt()),
        ofLong: () => (0, find_1.wrapCheckBuilderFind)(_underlying.ofLong()),
        ofDouble: () => (0, find_1.wrapCheckBuilderFind)(_underlying.ofDouble()),
        ofList: () => (0, find_1.wrapCheckBuilderFind)(_underlying.ofList()),
        ofMap: () => (0, find_1.wrapCheckBuilderFind)(_underlying.ofMap()),
        ofObject: () => (0, find_1.wrapCheckBuilderFind)(_underlying.ofObject())
      });
      exports.wrapCheckBuilderJsonOfTypeFind = wrapCheckBuilderJsonOfTypeFind;
    }
  });

  // ../tmp/core/package/target/checks/jsonOfTypeMultipleFind.js
  var require_jsonOfTypeMultipleFind = __commonJS({
    "../tmp/core/package/target/checks/jsonOfTypeMultipleFind.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapCheckBuilderJsonOfTypeMultipleFind = void 0;
      var multipleFind_1 = require_multipleFind();
      var wrapCheckBuilderJsonOfTypeMultipleFind = (_underlying) => ({
        ...(0, multipleFind_1.wrapCheckBuilderMultipleFind)(_underlying),
        ofString: () => (0, multipleFind_1.wrapCheckBuilderMultipleFind)(_underlying.ofString()),
        ofBoolean: () => (0, multipleFind_1.wrapCheckBuilderMultipleFind)(_underlying.ofBoolean()),
        ofInt: () => (0, multipleFind_1.wrapCheckBuilderMultipleFind)(_underlying.ofInt()),
        ofLong: () => (0, multipleFind_1.wrapCheckBuilderMultipleFind)(_underlying.ofLong()),
        ofDouble: () => (0, multipleFind_1.wrapCheckBuilderMultipleFind)(_underlying.ofDouble()),
        ofList: () => (0, multipleFind_1.wrapCheckBuilderMultipleFind)(_underlying.ofList()),
        ofMap: () => (0, multipleFind_1.wrapCheckBuilderMultipleFind)(_underlying.ofMap()),
        ofObject: () => (0, multipleFind_1.wrapCheckBuilderMultipleFind)(_underlying.ofObject())
      });
      exports.wrapCheckBuilderJsonOfTypeMultipleFind = wrapCheckBuilderJsonOfTypeMultipleFind;
    }
  });

  // ../tmp/core/package/target/checks/condition.js
  var require_condition = __commonJS({
    "../tmp/core/package/target/checks/condition.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapCondition = void 0;
      var wrapCondition = (jvmCondition, wrap) => ({
        then: (...thenChecks) => wrap(jvmCondition.then(thenChecks.map((c) => c._underlying)))
      });
      exports.wrapCondition = wrapCondition;
    }
  });

  // ../tmp/core/package/target/checks/index.js
  var require_checks = __commonJS({
    "../tmp/core/package/target/checks/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.responseTimeInMillis = exports.sha1 = exports.md5 = exports.regex = exports.jsonpJmesPath = exports.jsonpJsonPath = exports.jmesPath = exports.jsonPath = exports.form = exports.css = exports.xpath = exports.substring = exports.bodyLength = exports.bodyBytes = exports.bodyString = void 0;
      var jvm_types_1 = require_package();
      var callbacks_1 = require_callbacks();
      var session_1 = require_session();
      var captureGroup_1 = require_captureGroup();
      var final_1 = require_final();
      var find_1 = require_find();
      var jsonOfTypeFind_1 = require_jsonOfTypeFind();
      var jsonOfTypeMultipleFind_1 = require_jsonOfTypeMultipleFind();
      var multipleFind_1 = require_multipleFind();
      __exportStar(require_builder(), exports);
      __exportStar(require_captureGroup(), exports);
      __exportStar(require_condition(), exports);
      __exportStar(require_final(), exports);
      __exportStar(require_find(), exports);
      __exportStar(require_jsonOfTypeFind(), exports);
      __exportStar(require_jsonOfTypeMultipleFind(), exports);
      __exportStar(require_multipleFind(), exports);
      __exportStar(require_validate(), exports);
      var bodyString = () => (0, find_1.wrapCheckBuilderFind)(jvm_types_1.CoreDsl.bodyString());
      exports.bodyString = bodyString;
      var bodyBytes = () => ({
        ...(0, find_1.wrapCheckBuilderFind)(jvm_types_1.CoreDsl.bodyBytes()),
        is: (expected) => (0, final_1.wrapCheckBuilderFinal)(typeof expected === "function" ? jvm_types_1.CoreDsl.bodyBytes().is((0, callbacks_1.wrapByteArrayCallback)((0, session_1.underlyingSessionTo)(expected))) : jvm_types_1.CoreDsl.bodyBytes().is((0, callbacks_1.wrapByteArray)(expected))),
        not: (expected) => (0, final_1.wrapCheckBuilderFinal)(typeof expected === "function" ? jvm_types_1.CoreDsl.bodyBytes().not((0, callbacks_1.wrapByteArrayCallback)((0, session_1.underlyingSessionTo)(expected))) : jvm_types_1.CoreDsl.bodyBytes().not((0, callbacks_1.wrapByteArray)(expected)))
      });
      exports.bodyBytes = bodyBytes;
      var bodyLength = () => (0, find_1.wrapCheckBuilderFind)(jvm_types_1.CoreDsl.bodyLength());
      exports.bodyLength = bodyLength;
      var substring = (pattern) => (0, multipleFind_1.wrapCheckBuilderMultipleFind)(typeof pattern === "function" ? jvm_types_1.CoreDsl.substring((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(pattern))) : jvm_types_1.CoreDsl.substring(pattern));
      exports.substring = substring;
      var xpath = (path, namespaces) => {
        if (typeof path === "function") {
          if (namespaces !== void 0) {
            return (0, multipleFind_1.wrapCheckBuilderMultipleFind)(jvm_types_1.CoreDsl.xpath((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(path)), namespaces));
          } else {
            return (0, multipleFind_1.wrapCheckBuilderMultipleFind)(jvm_types_1.CoreDsl.xpath((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(path))));
          }
        } else {
          if (namespaces !== void 0) {
            return (0, multipleFind_1.wrapCheckBuilderMultipleFind)(jvm_types_1.CoreDsl.xpath(path, namespaces));
          } else {
            return (0, multipleFind_1.wrapCheckBuilderMultipleFind)(jvm_types_1.CoreDsl.xpath(path));
          }
        }
      };
      exports.xpath = xpath;
      var css2 = (selector, nodeAttribute) => {
        if (typeof selector === "function") {
          if (nodeAttribute !== void 0) {
            return (0, multipleFind_1.wrapCheckBuilderMultipleFind)(jvm_types_1.CoreDsl.css((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(selector)), nodeAttribute));
          } else {
            return (0, multipleFind_1.wrapCheckBuilderMultipleFind)(jvm_types_1.CoreDsl.css((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(selector))));
          }
        } else {
          if (nodeAttribute !== void 0) {
            return (0, multipleFind_1.wrapCheckBuilderMultipleFind)(jvm_types_1.CoreDsl.css(selector, nodeAttribute));
          } else {
            return (0, multipleFind_1.wrapCheckBuilderMultipleFind)(jvm_types_1.CoreDsl.css(selector));
          }
        }
      };
      exports.css = css2;
      var form = (selector) => (0, multipleFind_1.wrapCheckBuilderMultipleFind)(
        typeof selector === "function" ? jvm_types_1.CoreDsl.form((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(selector))) : jvm_types_1.CoreDsl.form(selector)
        // TODO change type of java.util.Map in java2typescript
      );
      exports.form = form;
      var jsonPath = (path) => (0, jsonOfTypeMultipleFind_1.wrapCheckBuilderJsonOfTypeMultipleFind)(typeof path === "function" ? jvm_types_1.CoreDsl.jsonPath((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(path))) : jvm_types_1.CoreDsl.jsonPath(path));
      exports.jsonPath = jsonPath;
      var jmesPath = (path) => (0, jsonOfTypeFind_1.wrapCheckBuilderJsonOfTypeFind)(typeof path === "function" ? jvm_types_1.CoreDsl.jmesPath((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(path))) : jvm_types_1.CoreDsl.jmesPath(path));
      exports.jmesPath = jmesPath;
      var jsonpJsonPath = (path) => (0, jsonOfTypeMultipleFind_1.wrapCheckBuilderJsonOfTypeMultipleFind)(typeof path === "function" ? jvm_types_1.CoreDsl.jsonpJsonPath((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(path))) : jvm_types_1.CoreDsl.jsonpJsonPath(path));
      exports.jsonpJsonPath = jsonpJsonPath;
      var jsonpJmesPath = (path) => (0, jsonOfTypeFind_1.wrapCheckBuilderJsonOfTypeFind)(typeof path === "function" ? jvm_types_1.CoreDsl.jsonpJmesPath((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(path))) : jvm_types_1.CoreDsl.jsonpJmesPath(path));
      exports.jsonpJmesPath = jsonpJmesPath;
      var regex = (pattern) => (0, captureGroup_1.wrapCheckBuilderCaptureGroup)(typeof pattern === "function" ? jvm_types_1.CoreDsl.regex((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(pattern))) : jvm_types_1.CoreDsl.regex(pattern));
      exports.regex = regex;
      var md5 = () => (0, find_1.wrapCheckBuilderFind)(jvm_types_1.CoreDsl.md5());
      exports.md5 = md5;
      var sha1 = () => (0, find_1.wrapCheckBuilderFind)(jvm_types_1.CoreDsl.sha1());
      exports.sha1 = sha1;
      var responseTimeInMillis = () => (0, find_1.wrapCheckBuilderFind)(jvm_types_1.CoreDsl.responseTimeInMillis());
      exports.responseTimeInMillis = responseTimeInMillis;
    }
  });

  // ../tmp/core/package/target/closedInjection.js
  var require_closedInjection = __commonJS({
    "../tmp/core/package/target/closedInjection.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.incrementConcurrentUsers = exports.rampConcurrentUsers = exports.constantConcurrentUsers = void 0;
      var jvm_types_1 = require_package();
      var duration_1 = require_duration();
      var wrapClosedInjectionStep = (_underlying) => ({ _underlying });
      var wrapClosedInjectionStepConstant = (_underlying) => ({
        _underlying,
        during: (duration) => wrapClosedInjectionStep(_underlying.during((0, duration_1.toJvmDuration)(duration)))
      });
      var wrapClosedInjectionStepRamp = (_underlying) => ({
        _underlying,
        to: (t) => wrapClosedInjectionStepRampTo(_underlying.to(t))
      });
      var wrapClosedInjectionStepRampTo = (_underlying) => ({
        _underlying,
        during: (duration) => wrapClosedInjectionStep(_underlying.during((0, duration_1.toJvmDuration)(duration)))
      });
      var wrapClosedInjectionStepStairs = (_underlying) => ({
        _underlying,
        times: (levels) => wrapClosedInjectionStepStairsWithTime(_underlying.times(levels))
      });
      var wrapClosedInjectionStepStairsWithTime = (_underlying) => ({
        _underlying,
        eachLevelLasting: (duration) => wrapClosedInjectionStepComposite(_underlying.eachLevelLasting((0, duration_1.toJvmDuration)(duration)))
      });
      var wrapClosedInjectionStepComposite = (_underlying) => ({
        _underlying,
        startingFrom: (startingUsers) => wrapClosedInjectionStepComposite(_underlying.startingFrom(startingUsers)),
        separatedByRampsLasting: (duration) => wrapClosedInjectionStepComposite(_underlying.separatedByRampsLasting((0, duration_1.toJvmDuration)(duration)))
      });
      var constantConcurrentUsers = (users) => wrapClosedInjectionStepConstant(jvm_types_1.CoreDsl.constantConcurrentUsers(users));
      exports.constantConcurrentUsers = constantConcurrentUsers;
      var rampConcurrentUsers = (from) => wrapClosedInjectionStepRamp(jvm_types_1.CoreDsl.rampConcurrentUsers(from));
      exports.rampConcurrentUsers = rampConcurrentUsers;
      var incrementConcurrentUsers = (usersIncrement) => wrapClosedInjectionStepStairs(jvm_types_1.CoreDsl.incrementConcurrentUsers(usersIncrement));
      exports.incrementConcurrentUsers = incrementConcurrentUsers;
    }
  });

  // ../tmp/core/package/target/common.js
  var require_common = __commonJS({
    "../tmp/core/package/target/common.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../tmp/core/package/target/feeders.js
  var require_feeders = __commonJS({
    "../tmp/core/package/target/feeders.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.arrayFeeder = exports.jsonUrl = exports.jsonFile = exports.separatedValues = exports.tsv = exports.ssv = exports.csv = exports.wrapFileBasedFeederBuilder = void 0;
      var jvm_types_1 = require_package();
      var callbacks_1 = require_callbacks();
      var wrapFeederBuilder = (_underlying) => ({
        _underlying,
        queue: () => wrapFeederBuilder(_underlying.queue()),
        random: () => wrapFeederBuilder(_underlying.random()),
        shuffle: () => wrapFeederBuilder(_underlying.shuffle()),
        circular: () => wrapFeederBuilder(_underlying.circular()),
        transform: (f) => wrapFeederBuilder(_underlying.transform((0, callbacks_1.wrapBiCallback)(f))),
        recordsCount: () => _underlying.recordsCount(),
        shard: () => wrapFeederBuilder(_underlying.shard())
      });
      var wrapFileBasedFeederBuilder = (_underlying) => ({
        _underlying,
        queue: () => (0, exports.wrapFileBasedFeederBuilder)(_underlying.queue()),
        random: () => (0, exports.wrapFileBasedFeederBuilder)(_underlying.random()),
        shuffle: () => (0, exports.wrapFileBasedFeederBuilder)(_underlying.shuffle()),
        circular: () => (0, exports.wrapFileBasedFeederBuilder)(_underlying.circular()),
        transform: (f) => wrapFeederBuilder(_underlying.transform((0, callbacks_1.wrapBiCallback)(f))),
        recordsCount: () => _underlying.recordsCount(),
        shard: () => (0, exports.wrapFileBasedFeederBuilder)(_underlying.shard()),
        unzip: () => (0, exports.wrapFileBasedFeederBuilder)(_underlying.unzip())
      });
      exports.wrapFileBasedFeederBuilder = wrapFileBasedFeederBuilder;
      var wrapBatchableFeederBuilder = (_underlying) => ({
        _underlying,
        queue: () => wrapBatchableFeederBuilder(_underlying.queue()),
        random: () => wrapBatchableFeederBuilder(_underlying.random()),
        shuffle: () => wrapBatchableFeederBuilder(_underlying.shuffle()),
        circular: () => wrapBatchableFeederBuilder(_underlying.circular()),
        transform: (f) => wrapFeederBuilder(_underlying.transform((0, callbacks_1.wrapBiCallback)(f))),
        recordsCount: () => _underlying.recordsCount(),
        shard: () => wrapBatchableFeederBuilder(_underlying.shard()),
        unzip: () => wrapBatchableFeederBuilder(_underlying.unzip()),
        eager: () => wrapBatchableFeederBuilder(_underlying.eager()),
        batch: (lines) => wrapBatchableFeederBuilder(lines !== void 0 ? _underlying.batch(lines) : _underlying.batch())
      });
      var csv2 = (filePath, quoteChar) => wrapBatchableFeederBuilder(quoteChar !== void 0 ? jvm_types_1.CoreDsl.csv(filePath, quoteChar) : jvm_types_1.CoreDsl.csv(filePath));
      exports.csv = csv2;
      var ssv = (filePath, quoteChar) => wrapBatchableFeederBuilder(quoteChar !== void 0 ? jvm_types_1.CoreDsl.ssv(filePath, quoteChar) : jvm_types_1.CoreDsl.ssv(filePath));
      exports.ssv = ssv;
      var tsv = (filePath, quoteChar) => wrapBatchableFeederBuilder(quoteChar !== void 0 ? jvm_types_1.CoreDsl.tsv(filePath, quoteChar) : jvm_types_1.CoreDsl.tsv(filePath));
      exports.tsv = tsv;
      var separatedValues = (filePath, separator, quoteChar) => wrapBatchableFeederBuilder(quoteChar !== void 0 ? jvm_types_1.CoreDsl.separatedValues(filePath, separator, quoteChar) : jvm_types_1.CoreDsl.separatedValues(filePath, separator));
      exports.separatedValues = separatedValues;
      var jsonFile2 = (filePath) => (0, exports.wrapFileBasedFeederBuilder)(jvm_types_1.CoreDsl.jsonFile(filePath));
      exports.jsonFile = jsonFile2;
      var jsonUrl = (url) => wrapFeederBuilder(jvm_types_1.CoreDsl.jsonUrl(url));
      exports.jsonUrl = jsonUrl;
      var arrayFeeder2 = (data) => wrapFeederBuilder(jvm_types_1.CoreDsl.arrayFeeder(data));
      exports.arrayFeeder = arrayFeeder2;
    }
  });

  // ../tmp/core/package/target/filters.js
  var require_filters = __commonJS({
    "../tmp/core/package/target/filters.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DenyList = exports.AllowList = void 0;
      var jvm_types_1 = require_package();
      var wrapAllowListFilter = (_underlying) => ({
        _underlying,
        type: "allow"
      });
      var wrapDenyListFilter = (_underlying) => ({
        _underlying,
        type: "deny"
      });
      var AllowList = (...patterns) => wrapAllowListFilter(jvm_types_1.CoreDsl.AllowList(patterns));
      exports.AllowList = AllowList;
      var DenyList = (...patterns) => wrapDenyListFilter(jvm_types_1.CoreDsl.DenyList(patterns));
      exports.DenyList = DenyList;
    }
  });

  // ../tmp/core/package/target/openInjection.js
  var require_openInjection = __commonJS({
    "../tmp/core/package/target/openInjection.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.incrementUsersPerSec = exports.nothingFor = exports.rampUsersPerSec = exports.constantUsersPerSec = exports.atOnceUsers = exports.stressPeakUsers = exports.rampUsers = void 0;
      var jvm_types_1 = require_package();
      var duration_1 = require_duration();
      var wrapOpenInjectionStep = (_underlying) => ({ _underlying });
      var wrapConstantRateOpenInjectionStep = (_underlying) => ({
        _underlying,
        randomized: () => wrapOpenInjectionStep(_underlying.randomized())
      });
      var wrapOpenInjectionStepRamp = (_underlying) => ({
        _underlying,
        during: (duration) => wrapOpenInjectionStep(_underlying.during((0, duration_1.toJvmDuration)(duration)))
      });
      var wrapOpenInjectionStepStressPeak = (_underlying) => ({
        _underlying,
        during: (duration) => wrapOpenInjectionStep(_underlying.during((0, duration_1.toJvmDuration)(duration)))
      });
      var wrapOpenInjectionStepConstantRate = (_underlying) => ({
        _underlying,
        during: (duration) => wrapConstantRateOpenInjectionStep(_underlying.during((0, duration_1.toJvmDuration)(duration)))
      });
      var wrapOpenInjectionStepRampRate = (_underlying) => ({
        _underlying,
        to: (to) => wrapOpenInjectionStepRampRateDuring(_underlying.to(to))
      });
      var wrapOpenInjectionStepRampRateDuring = (_underlying) => ({
        _underlying,
        during: (duration) => wrapRampRateOpenInjectionStep(_underlying.during((0, duration_1.toJvmDuration)(duration)))
      });
      var wrapRampRateOpenInjectionStep = (_underlying) => ({
        _underlying,
        randomized: () => wrapOpenInjectionStep(_underlying.randomized())
      });
      var wrapOpenInjectionStepStairs = (_underlying) => ({
        _underlying,
        times: (levels) => wrapOpenInjectionStepStairsTimes(_underlying.times(levels))
      });
      var wrapOpenInjectionStepStairsTimes = (_underlying) => ({
        _underlying,
        eachLevelLasting: (duration) => wrapOpenInjectionStepStairsComposite(_underlying.eachLevelLasting((0, duration_1.toJvmDuration)(duration)))
      });
      var wrapOpenInjectionStepStairsComposite = (_underlying) => ({
        _underlying,
        startingFrom: (startingRate) => wrapOpenInjectionStepStairsComposite(_underlying.startingFrom(startingRate)),
        separatedByRampsLasting: (duration) => wrapOpenInjectionStepStairsComposite(_underlying.separatedByRampsLasting((0, duration_1.toJvmDuration)(duration)))
      });
      var rampUsers = (users) => wrapOpenInjectionStepRamp(jvm_types_1.CoreDsl.rampUsers(users));
      exports.rampUsers = rampUsers;
      var stressPeakUsers = (users) => wrapOpenInjectionStepStressPeak(jvm_types_1.CoreDsl.stressPeakUsers(users));
      exports.stressPeakUsers = stressPeakUsers;
      var atOnceUsers6 = (users) => wrapOpenInjectionStep(jvm_types_1.CoreDsl.atOnceUsers(users));
      exports.atOnceUsers = atOnceUsers6;
      var constantUsersPerSec2 = (rate) => wrapOpenInjectionStepConstantRate(jvm_types_1.CoreDsl.constantUsersPerSec(rate));
      exports.constantUsersPerSec = constantUsersPerSec2;
      var rampUsersPerSec = (rate) => wrapOpenInjectionStepRampRate(jvm_types_1.CoreDsl.rampUsersPerSec(rate));
      exports.rampUsersPerSec = rampUsersPerSec;
      var nothingFor2 = (duration) => wrapOpenInjectionStep(jvm_types_1.CoreDsl.nothingFor((0, duration_1.toJvmDuration)(duration)));
      exports.nothingFor = nothingFor2;
      var incrementUsersPerSec = (rateIncrement) => wrapOpenInjectionStepStairs(jvm_types_1.CoreDsl.incrementUsersPerSec(rateIncrement));
      exports.incrementUsersPerSec = incrementUsersPerSec;
    }
  });

  // ../tmp/core/package/target/population.js
  var require_population = __commonJS({
    "../tmp/core/package/target/population.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapPopulationBuilder = void 0;
      var callbacks_1 = require_callbacks();
      var duration_1 = require_duration();
      var pauses_1 = require_pauses();
      var session_1 = require_session();
      var wrapPopulationBuilder = (_underlying) => ({
        _underlying,
        protocols: (...protocols) => (0, exports.wrapPopulationBuilder)(_underlying.protocols(protocols.map((p) => p._underlying))),
        andThen: (...children) => (0, exports.wrapPopulationBuilder)(_underlying.andThen(children.map((c) => c._underlying))),
        disablePauses: () => (0, exports.wrapPopulationBuilder)(_underlying.disablePauses()),
        constantPauses: () => (0, exports.wrapPopulationBuilder)(_underlying.constantPauses()),
        exponentialPauses: () => (0, exports.wrapPopulationBuilder)(_underlying.exponentialPauses()),
        customPauses: (f) => (0, exports.wrapPopulationBuilder)(_underlying.customPauses((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(f)))),
        uniformPauses: (plusOrMinus) => (0, exports.wrapPopulationBuilder)(_underlying.uniformPauses((0, duration_1.toJvmDuration)(plusOrMinus))),
        pauses: (pauseType) => (0, exports.wrapPopulationBuilder)(_underlying.pauses((0, pauses_1.toJvmPauseType)(pauseType))),
        throttle: (...throttleSteps) => (0, exports.wrapPopulationBuilder)(_underlying.throttle(throttleSteps.map((t) => t._underlying))),
        noShard: () => (0, exports.wrapPopulationBuilder)(_underlying.noShard())
      });
      exports.wrapPopulationBuilder = wrapPopulationBuilder;
    }
  });

  // ../tmp/core/package/target/protocol.js
  var require_protocol = __commonJS({
    "../tmp/core/package/target/protocol.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../tmp/core/package/target/structure/execs.js
  var require_execs = __commonJS({
    "../tmp/core/package/target/structure/execs.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.execImpl = exports.wrapActionBuilder = void 0;
      var session_1 = require_session();
      var callbacks_1 = require_callbacks();
      var wrapActionBuilder = (_underlying) => ({
        _underlying
      });
      exports.wrapActionBuilder = wrapActionBuilder;
      var execImpl = (jvmExecs, wrap) => (arg0, ...arg1) => wrap(
        typeof arg0 === "function" ? jvmExecs.exec((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTransform)(arg0))) : jvmExecs.exec(arg0._underlying, ...arg1.map((e) => e._underlying))
        // arg0: Executable, ...arg1: Executable[]
      );
      exports.execImpl = execImpl;
    }
  });

  // ../tmp/core/package/target/structure/on.js
  var require_on = __commonJS({
    "../tmp/core/package/target/structure/on.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapOn = void 0;
      var wrapOn = (jvmOn, wrap) => ({
        on: (executable, ...executables) => wrap(jvmOn.on(executable._underlying, ...executables.map((e) => e._underlying)))
      });
      exports.wrapOn = wrapOn;
    }
  });

  // ../tmp/core/package/target/structure/groups.js
  var require_groups = __commonJS({
    "../tmp/core/package/target/structure/groups.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.groupImpl = void 0;
      var callbacks_1 = require_callbacks();
      var session_1 = require_session();
      var on_1 = require_on();
      var groupImpl = (jvmGroups, wrap) => (group2) => (0, on_1.wrapOn)(typeof group2 === "function" ? jvmGroups.group((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(group2))) : jvmGroups.group(group2), wrap);
      exports.groupImpl = groupImpl;
    }
  });

  // ../tmp/core/package/target/structure/feeds.js
  var require_feeds = __commonJS({
    "../tmp/core/package/target/structure/feeds.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.feedImpl = void 0;
      var callbacks_1 = require_callbacks();
      var session_1 = require_session();
      var feedImpl = (jvmFeeds, wrap) => (feederBuilder, numberOfRecords) => {
        if (typeof numberOfRecords === "number") {
          return wrap(jvmFeeds.feed(feederBuilder._underlying, numberOfRecords));
        } else if (typeof numberOfRecords === "string") {
          return wrap(jvmFeeds.feed(feederBuilder._underlying, numberOfRecords));
        } else if (typeof numberOfRecords === "function") {
          return wrap(jvmFeeds.feed(feederBuilder._underlying, (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(numberOfRecords))));
        } else {
          return wrap(jvmFeeds.feed(feederBuilder._underlying));
        }
      };
      exports.feedImpl = feedImpl;
    }
  });

  // ../tmp/core/package/target/structure/paces.js
  var require_paces = __commonJS({
    "../tmp/core/package/target/structure/paces.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.paceImpl = void 0;
      var callbacks_1 = require_callbacks();
      var duration_1 = require_duration();
      var session_1 = require_session();
      var paceImpl = (jvmGroups, wrap) => (arg0, arg1, arg2) => {
        if (arg2 !== void 0) {
          if (typeof arg0 === "string" && typeof arg1 === "string") {
            return wrap(jvmGroups.pace(arg0, arg1, arg2));
          } else if (typeof arg0 === "function" && typeof arg1 === "function") {
            return wrap(jvmGroups.pace((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(arg0)), (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(arg1)), arg2));
          } else if ((0, duration_1.isDuration)(arg0) && (0, duration_1.isDuration)(arg1)) {
            return wrap(jvmGroups.pace((0, duration_1.toJvmDuration)(arg0), (0, duration_1.toJvmDuration)(arg1), arg2));
          }
        } else if (arg1 !== void 0) {
          if (typeof arg1 === "string") {
            if (typeof arg0 === "string") {
              return wrap(jvmGroups.pace(arg0, arg1));
            } else if (typeof arg0 === "function") {
              return wrap(jvmGroups.pace((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(arg0)), arg1));
            } else if ((0, duration_1.isDuration)(arg0)) {
              return wrap(jvmGroups.pace((0, duration_1.toJvmDuration)(arg0), arg1));
            }
          } else {
            if (typeof arg0 === "function" && typeof arg1 === "function") {
              return wrap(jvmGroups.pace((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(arg0)), (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(arg1))));
            } else if ((0, duration_1.isDuration)(arg0) && (0, duration_1.isDuration)(arg1)) {
              return wrap(jvmGroups.pace((0, duration_1.toJvmDuration)(arg0), (0, duration_1.toJvmDuration)(arg1)));
            }
          }
        } else {
          if (typeof arg0 === "string") {
            return wrap(jvmGroups.pace(arg0));
          } else if (typeof arg0 === "function") {
            return wrap(jvmGroups.pace((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(arg0))));
          } else if ((0, duration_1.isDuration)(arg0)) {
            return wrap(jvmGroups.pace((0, duration_1.toJvmDuration)(arg0)));
          }
        }
        throw Error(`pace() called with invalid arguments ${arg0}, ${arg1}, ${arg2}`);
      };
      exports.paceImpl = paceImpl;
    }
  });

  // ../tmp/core/package/target/structure/rendezVous.js
  var require_rendezVous = __commonJS({
    "../tmp/core/package/target/structure/rendezVous.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.rendezVousImpl = void 0;
      var rendezVousImpl = (jvmRendezVous, wrap) => (users) => wrap(jvmRendezVous.rendezVous(users));
      exports.rendezVousImpl = rendezVousImpl;
    }
  });

  // ../tmp/core/package/target/structure/repeat.js
  var require_repeat = __commonJS({
    "../tmp/core/package/target/structure/repeat.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.repeatImpl = void 0;
      var callbacks_1 = require_callbacks();
      var session_1 = require_session();
      var on_1 = require_on();
      var repeatImpl = (jvmRepeat, wrap) => (times, counterName) => {
        if (counterName !== void 0) {
          if (typeof times === "number") {
            return (0, on_1.wrapOn)(jvmRepeat.repeat(times, counterName), wrap);
          } else if (typeof times === "string") {
            return (0, on_1.wrapOn)(jvmRepeat.repeat(times, counterName), wrap);
          } else {
            return (0, on_1.wrapOn)(jvmRepeat.repeat((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(times)), counterName), wrap);
          }
        } else {
          if (typeof times === "number") {
            return (0, on_1.wrapOn)(jvmRepeat.repeat(times), wrap);
          } else if (typeof times === "string") {
            return (0, on_1.wrapOn)(jvmRepeat.repeat(times), wrap);
          } else {
            return (0, on_1.wrapOn)(jvmRepeat.repeat((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(times))), wrap);
          }
        }
      };
      exports.repeatImpl = repeatImpl;
    }
  });

  // ../tmp/core/package/target/structure/forEach.js
  var require_forEach = __commonJS({
    "../tmp/core/package/target/structure/forEach.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.foreachImpl = void 0;
      var callbacks_1 = require_callbacks();
      var session_1 = require_session();
      var on_1 = require_on();
      var foreachImpl = (jvmForEach, wrap) => (seq, attributeName, counterName) => {
        if (typeof seq === "function") {
          if (counterName !== void 0) {
            return (0, on_1.wrapOn)(jvmForEach.foreach((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(seq)), attributeName, counterName), wrap);
          } else {
            return (0, on_1.wrapOn)(jvmForEach.foreach((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(seq)), attributeName), wrap);
          }
        } else if (typeof seq === "string") {
          if (counterName !== void 0) {
            return (0, on_1.wrapOn)(jvmForEach.foreach(seq, attributeName, counterName), wrap);
          } else {
            return (0, on_1.wrapOn)(jvmForEach.foreach(seq, attributeName), wrap);
          }
        } else {
          if (counterName !== void 0) {
            return (0, on_1.wrapOn)(jvmForEach.foreach(seq, attributeName, counterName), wrap);
          } else {
            return (0, on_1.wrapOn)(jvmForEach.foreach(seq, attributeName), wrap);
          }
        }
      };
      exports.foreachImpl = foreachImpl;
    }
  });

  // ../tmp/core/package/target/structure/during.js
  var require_during = __commonJS({
    "../tmp/core/package/target/structure/during.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.duringImpl = void 0;
      var callbacks_1 = require_callbacks();
      var duration_1 = require_duration();
      var session_1 = require_session();
      var on_1 = require_on();
      var duringImpl = (jvmDuring, wrap) => (duration, arg1, arg2) => {
        if (arg2 !== void 0 && typeof arg1 === "string") {
          if ((0, duration_1.isDuration)(duration)) {
            return (0, on_1.wrapOn)(jvmDuring.during((0, duration_1.toJvmDuration)(duration), arg1, arg2), wrap);
          } else if (typeof duration === "function") {
            return (0, on_1.wrapOn)(jvmDuring.during((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(duration)), arg1, arg2), wrap);
          } else {
            return (0, on_1.wrapOn)(jvmDuring.during(duration, arg1, arg2), wrap);
          }
        } else if (typeof arg1 === "string") {
          if ((0, duration_1.isDuration)(duration)) {
            return (0, on_1.wrapOn)(jvmDuring.during((0, duration_1.toJvmDuration)(duration), arg1), wrap);
          } else if (typeof duration === "function") {
            return (0, on_1.wrapOn)(jvmDuring.during((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(duration)), arg1), wrap);
          } else {
            return (0, on_1.wrapOn)(jvmDuring.during(duration, arg1), wrap);
          }
        } else if (typeof arg1 === "boolean") {
          if ((0, duration_1.isDuration)(duration)) {
            return (0, on_1.wrapOn)(jvmDuring.during((0, duration_1.toJvmDuration)(duration), arg1), wrap);
          } else if (typeof duration === "function") {
            return (0, on_1.wrapOn)(jvmDuring.during((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(duration)), arg1), wrap);
          } else {
            return (0, on_1.wrapOn)(jvmDuring.during(duration, arg1), wrap);
          }
        } else if (arg1 === void 0) {
          if ((0, duration_1.isDuration)(duration)) {
            return (0, on_1.wrapOn)(jvmDuring.during((0, duration_1.toJvmDuration)(duration)), wrap);
          } else if (typeof duration === "function") {
            return (0, on_1.wrapOn)(jvmDuring.during((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(duration))), wrap);
          } else {
            return (0, on_1.wrapOn)(jvmDuring.during(duration), wrap);
          }
        }
        throw Error(`during() called with invalid arguments ${duration}, ${arg1}, ${arg2}`);
      };
      exports.duringImpl = duringImpl;
    }
  });

  // ../tmp/core/package/target/structure/forever.js
  var require_forever = __commonJS({
    "../tmp/core/package/target/structure/forever.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.foreverImpl = void 0;
      var on_1 = require_on();
      var foreverImpl = (jvmForever, wrap) => (counterName) => (0, on_1.wrapOn)(counterName !== void 0 ? jvmForever.forever(counterName) : jvmForever.forever(), wrap);
      exports.foreverImpl = foreverImpl;
    }
  });

  // ../tmp/core/package/target/structure/asLongAs.js
  var require_asLongAs = __commonJS({
    "../tmp/core/package/target/structure/asLongAs.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.asLongAsImpl = void 0;
      var callbacks_1 = require_callbacks();
      var session_1 = require_session();
      var on_1 = require_on();
      var asLongAsImpl = (jvmAsLongAs, wrap) => (condition, arg1, arg2) => {
        if (arg2 !== void 0 && typeof arg1 === "string") {
          if (typeof condition === "function") {
            return (0, on_1.wrapOn)(jvmAsLongAs.asLongAs((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(condition)), arg1, arg2), wrap);
          } else {
            return (0, on_1.wrapOn)(jvmAsLongAs.asLongAs(condition, arg1, arg2), wrap);
          }
        } else if (typeof arg1 === "string") {
          if (typeof condition === "function") {
            return (0, on_1.wrapOn)(jvmAsLongAs.asLongAs((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(condition)), arg1), wrap);
          } else {
            return (0, on_1.wrapOn)(jvmAsLongAs.asLongAs(condition, arg1), wrap);
          }
        } else if (typeof arg1 === "boolean") {
          if (typeof condition === "function") {
            return (0, on_1.wrapOn)(jvmAsLongAs.asLongAs((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(condition)), arg1), wrap);
          } else {
            return (0, on_1.wrapOn)(jvmAsLongAs.asLongAs(condition, arg1), wrap);
          }
        } else if (arg1 === void 0) {
          if (typeof condition === "function") {
            return (0, on_1.wrapOn)(jvmAsLongAs.asLongAs((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(condition))), wrap);
          } else {
            return (0, on_1.wrapOn)(jvmAsLongAs.asLongAs(condition), wrap);
          }
        }
        throw Error(`asLongAs() called with invalid arguments ${condition}, ${arg1}, ${arg2}`);
      };
      exports.asLongAsImpl = asLongAsImpl;
    }
  });

  // ../tmp/core/package/target/structure/doWhile.js
  var require_doWhile = __commonJS({
    "../tmp/core/package/target/structure/doWhile.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.doWhileImpl = void 0;
      var callbacks_1 = require_callbacks();
      var session_1 = require_session();
      var on_1 = require_on();
      var doWhileImpl = (jvmDoWhile, wrap) => (condition, counterName) => {
        if (counterName !== void 0) {
          if (typeof condition === "function") {
            return (0, on_1.wrapOn)(jvmDoWhile.doWhile((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(condition)), counterName), wrap);
          } else {
            return (0, on_1.wrapOn)(jvmDoWhile.doWhile(condition, counterName), wrap);
          }
        } else {
          if (typeof condition === "function") {
            return (0, on_1.wrapOn)(jvmDoWhile.doWhile((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(condition))), wrap);
          } else {
            return (0, on_1.wrapOn)(jvmDoWhile.doWhile(condition), wrap);
          }
        }
      };
      exports.doWhileImpl = doWhileImpl;
    }
  });

  // ../tmp/core/package/target/structure/asLongAsDuring.js
  var require_asLongAsDuring = __commonJS({
    "../tmp/core/package/target/structure/asLongAsDuring.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.asLongAsDuringImpl = void 0;
      var callbacks_1 = require_callbacks();
      var duration_1 = require_duration();
      var session_1 = require_session();
      var on_1 = require_on();
      var asLongAsDuringImpl = (jvmAsLongAsDuring, wrap) => (condition, duration, arg2, arg3) => {
        if (arg3 !== void 0 && typeof arg2 === "string") {
          if (typeof condition === "function") {
            const wrappedCondition = (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(condition));
            if ((0, duration_1.isDuration)(duration)) {
              return (0, on_1.wrapOn)(jvmAsLongAsDuring.asLongAsDuring(wrappedCondition, (0, duration_1.toJvmDuration)(duration), arg2, arg3), wrap);
            } else if (typeof duration === "function") {
              return (0, on_1.wrapOn)(jvmAsLongAsDuring.asLongAsDuring(wrappedCondition, (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(duration)), arg2, arg3), wrap);
            }
          } else {
            if ((0, duration_1.isDuration)(duration)) {
              return (0, on_1.wrapOn)(jvmAsLongAsDuring.asLongAsDuring(condition, (0, duration_1.toJvmDuration)(duration), arg2, arg3), wrap);
            } else if (typeof duration === "function") {
              return (0, on_1.wrapOn)(jvmAsLongAsDuring.asLongAsDuring(condition, (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(duration)), arg2, arg3), wrap);
            }
          }
        } else if (typeof arg2 === "string") {
          if (typeof condition === "function") {
            const wrappedCondition = (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(condition));
            if ((0, duration_1.isDuration)(duration)) {
              return (0, on_1.wrapOn)(jvmAsLongAsDuring.asLongAsDuring(wrappedCondition, (0, duration_1.toJvmDuration)(duration), arg2), wrap);
            } else if (typeof duration === "function") {
              return (0, on_1.wrapOn)(jvmAsLongAsDuring.asLongAsDuring(wrappedCondition, (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(duration)), arg2), wrap);
            }
          } else {
            if ((0, duration_1.isDuration)(duration)) {
              return (0, on_1.wrapOn)(jvmAsLongAsDuring.asLongAsDuring(condition, (0, duration_1.toJvmDuration)(duration), arg2), wrap);
            } else if (typeof duration === "function") {
              return (0, on_1.wrapOn)(jvmAsLongAsDuring.asLongAsDuring(condition, (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(duration)), arg2), wrap);
            }
          }
        } else if (typeof arg2 === "boolean") {
          if (typeof condition === "function") {
            const wrappedCondition = (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(condition));
            if ((0, duration_1.isDuration)(duration)) {
              return (0, on_1.wrapOn)(jvmAsLongAsDuring.asLongAsDuring(wrappedCondition, (0, duration_1.toJvmDuration)(duration), arg2), wrap);
            } else if (typeof duration === "function") {
              return (0, on_1.wrapOn)(jvmAsLongAsDuring.asLongAsDuring(wrappedCondition, (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(duration)), arg2), wrap);
            }
          } else {
            if ((0, duration_1.isDuration)(duration)) {
              return (0, on_1.wrapOn)(jvmAsLongAsDuring.asLongAsDuring(condition, (0, duration_1.toJvmDuration)(duration), arg2), wrap);
            } else if (typeof duration === "function") {
              return (0, on_1.wrapOn)(jvmAsLongAsDuring.asLongAsDuring(condition, (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(duration)), arg2), wrap);
            }
          }
        } else if (arg2 === void 0) {
          if (typeof condition === "function") {
            const wrappedCondition = (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(condition));
            if ((0, duration_1.isDuration)(duration)) {
              return (0, on_1.wrapOn)(jvmAsLongAsDuring.asLongAsDuring(wrappedCondition, (0, duration_1.toJvmDuration)(duration)), wrap);
            } else if (typeof duration === "function") {
              return (0, on_1.wrapOn)(jvmAsLongAsDuring.asLongAsDuring(wrappedCondition, (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(duration))), wrap);
            }
          } else {
            if ((0, duration_1.isDuration)(duration)) {
              return (0, on_1.wrapOn)(jvmAsLongAsDuring.asLongAsDuring(condition, (0, duration_1.toJvmDuration)(duration)), wrap);
            } else if (typeof duration === "function") {
              return (0, on_1.wrapOn)(jvmAsLongAsDuring.asLongAsDuring(condition, (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(duration))), wrap);
            }
          }
        }
        throw Error(`asLongAsDuring() called with invalid arguments ${condition}, ${duration}, ${arg2}, ${arg3}`);
      };
      exports.asLongAsDuringImpl = asLongAsDuringImpl;
    }
  });

  // ../tmp/core/package/target/structure/doWhileDuring.js
  var require_doWhileDuring = __commonJS({
    "../tmp/core/package/target/structure/doWhileDuring.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.doWhileDuringImpl = void 0;
      var callbacks_1 = require_callbacks();
      var duration_1 = require_duration();
      var session_1 = require_session();
      var on_1 = require_on();
      var doWhileDuringImpl = (jvmDoWhileDuring, wrap) => (condition, duration, arg2, arg3) => {
        if (arg3 !== void 0 && typeof arg2 === "string") {
          if (typeof condition === "function") {
            const wrappedCondition = (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(condition));
            if ((0, duration_1.isDuration)(duration)) {
              return (0, on_1.wrapOn)(jvmDoWhileDuring.doWhileDuring(wrappedCondition, (0, duration_1.toJvmDuration)(duration), arg2, arg3), wrap);
            } else if (typeof duration === "function") {
              return (0, on_1.wrapOn)(jvmDoWhileDuring.doWhileDuring(wrappedCondition, (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(duration)), arg2, arg3), wrap);
            }
          } else {
            if ((0, duration_1.isDuration)(duration)) {
              return (0, on_1.wrapOn)(jvmDoWhileDuring.doWhileDuring(condition, (0, duration_1.toJvmDuration)(duration), arg2, arg3), wrap);
            } else if (typeof duration === "function") {
              return (0, on_1.wrapOn)(jvmDoWhileDuring.doWhileDuring(condition, (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(duration)), arg2, arg3), wrap);
            }
          }
        } else if (typeof arg2 === "string") {
          if (typeof condition === "function") {
            const wrappedCondition = (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(condition));
            if ((0, duration_1.isDuration)(duration)) {
              return (0, on_1.wrapOn)(jvmDoWhileDuring.doWhileDuring(wrappedCondition, (0, duration_1.toJvmDuration)(duration), arg2), wrap);
            } else if (typeof duration === "function") {
              return (0, on_1.wrapOn)(jvmDoWhileDuring.doWhileDuring(wrappedCondition, (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(duration)), arg2), wrap);
            }
          } else {
            if ((0, duration_1.isDuration)(duration)) {
              return (0, on_1.wrapOn)(jvmDoWhileDuring.doWhileDuring(condition, (0, duration_1.toJvmDuration)(duration), arg2), wrap);
            } else if (typeof duration === "function") {
              return (0, on_1.wrapOn)(jvmDoWhileDuring.doWhileDuring(condition, (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(duration)), arg2), wrap);
            }
          }
        } else if (typeof arg2 === "boolean") {
          if (typeof condition === "function") {
            const wrappedCondition = (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(condition));
            if ((0, duration_1.isDuration)(duration)) {
              return (0, on_1.wrapOn)(jvmDoWhileDuring.doWhileDuring(wrappedCondition, (0, duration_1.toJvmDuration)(duration), arg2), wrap);
            } else if (typeof duration === "function") {
              return (0, on_1.wrapOn)(jvmDoWhileDuring.doWhileDuring(wrappedCondition, (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(duration)), arg2), wrap);
            }
          } else {
            if ((0, duration_1.isDuration)(duration)) {
              return (0, on_1.wrapOn)(jvmDoWhileDuring.doWhileDuring(condition, (0, duration_1.toJvmDuration)(duration), arg2), wrap);
            } else if (typeof duration === "function") {
              return (0, on_1.wrapOn)(jvmDoWhileDuring.doWhileDuring(condition, (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(duration)), arg2), wrap);
            }
          }
        } else if (arg2 === void 0) {
          if (typeof condition === "function") {
            const wrappedCondition = (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(condition));
            if ((0, duration_1.isDuration)(duration)) {
              return (0, on_1.wrapOn)(jvmDoWhileDuring.doWhileDuring(wrappedCondition, (0, duration_1.toJvmDuration)(duration)), wrap);
            } else if (typeof duration === "function") {
              return (0, on_1.wrapOn)(jvmDoWhileDuring.doWhileDuring(wrappedCondition, (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(duration))), wrap);
            }
          } else {
            if ((0, duration_1.isDuration)(duration)) {
              return (0, on_1.wrapOn)(jvmDoWhileDuring.doWhileDuring(condition, (0, duration_1.toJvmDuration)(duration)), wrap);
            } else if (typeof duration === "function") {
              return (0, on_1.wrapOn)(jvmDoWhileDuring.doWhileDuring(condition, (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionToDuration)(duration))), wrap);
            }
          }
        }
        throw Error(`doWhileDuring() called with invalid arguments ${condition}, ${duration}, ${arg2}, ${arg3}`);
      };
      exports.doWhileDuringImpl = doWhileDuringImpl;
    }
  });

  // ../tmp/core/package/target/structure/doIf.js
  var require_doIf = __commonJS({
    "../tmp/core/package/target/structure/doIf.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.doIfEqualsImpl = exports.doIfImpl = void 0;
      var callbacks_1 = require_callbacks();
      var session_1 = require_session();
      var wrapThen = (jvmThen, wrap) => ({
        then: (executable, ...executables) => wrap(jvmThen.then(executable._underlying, ...executables.map((e) => e._underlying)))
      });
      var doIfImpl = (jvmDoIf, wrap) => (condition) => wrapThen(typeof condition === "function" ? jvmDoIf.doIf((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(condition))) : jvmDoIf.doIf(condition), wrap);
      exports.doIfImpl = doIfImpl;
      var doIfEqualsImpl = (jvmDoIfEquals, wrap) => (actual, expected) => {
        if (typeof actual === "function") {
          const wrappedActual = (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(actual));
          if (typeof expected === "function") {
            return wrapThen(jvmDoIfEquals.doIfEquals(wrappedActual, (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(expected))), wrap);
          } else if (typeof expected === "string") {
            return wrapThen(jvmDoIfEquals.doIfEquals(wrappedActual, expected), wrap);
          } else {
            return wrapThen(jvmDoIfEquals.doIfEquals(wrappedActual, expected), wrap);
          }
        } else {
          if (typeof expected === "function") {
            return wrapThen(jvmDoIfEquals.doIfEquals(actual, (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(expected))), wrap);
          } else if (typeof expected === "string") {
            return wrapThen(jvmDoIfEquals.doIfEquals(actual, expected), wrap);
          } else {
            return wrapThen(jvmDoIfEquals.doIfEquals(actual, expected), wrap);
          }
        }
      };
      exports.doIfEqualsImpl = doIfEqualsImpl;
    }
  });

  // ../tmp/core/package/target/structure/doIfOrElse.js
  var require_doIfOrElse = __commonJS({
    "../tmp/core/package/target/structure/doIfOrElse.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.doIfEqualsOrElseImpl = exports.doIfOrElseImpl = void 0;
      var callbacks_1 = require_callbacks();
      var session_1 = require_session();
      var wrapThen = (jvmThen, wrap) => ({
        then: (executable, ...executables) => wrapOrElse(jvmThen.then(executable._underlying, ...executables.map((e) => e._underlying)), wrap)
      });
      var wrapOrElse = (jvmOrElse, wrap) => ({
        orElse: (executable, ...executables) => wrap(jvmOrElse.orElse(executable._underlying, ...executables.map((e) => e._underlying)))
      });
      var doIfOrElseImpl = (jvmDoIfOrElse, wrap) => (condition) => wrapThen(typeof condition === "function" ? jvmDoIfOrElse.doIfOrElse((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(condition))) : jvmDoIfOrElse.doIfOrElse(condition), wrap);
      exports.doIfOrElseImpl = doIfOrElseImpl;
      var doIfEqualsOrElseImpl = (jvmDoIfEqualsOrElse, wrap) => (actual, expected) => {
        if (typeof actual === "function") {
          const wrappedActual = (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(actual));
          if (typeof expected === "function") {
            return wrapThen(jvmDoIfEqualsOrElse.doIfEqualsOrElse(wrappedActual, (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(expected))), wrap);
          } else if (typeof expected === "string") {
            return wrapThen(jvmDoIfEqualsOrElse.doIfEqualsOrElse(wrappedActual, expected), wrap);
          } else {
            return wrapThen(jvmDoIfEqualsOrElse.doIfEqualsOrElse(wrappedActual, expected), wrap);
          }
        } else {
          if (typeof expected === "function") {
            return wrapThen(jvmDoIfEqualsOrElse.doIfEqualsOrElse(actual, (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(expected))), wrap);
          } else if (typeof expected === "string") {
            return wrapThen(jvmDoIfEqualsOrElse.doIfEqualsOrElse(actual, expected), wrap);
          } else {
            return wrapThen(jvmDoIfEqualsOrElse.doIfEqualsOrElse(actual, expected), wrap);
          }
        }
      };
      exports.doIfEqualsOrElseImpl = doIfEqualsOrElseImpl;
    }
  });

  // ../tmp/core/package/target/structure/doSwitch.js
  var require_doSwitch = __commonJS({
    "../tmp/core/package/target/structure/doSwitch.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.doSwitchImpl = void 0;
      var callbacks_1 = require_callbacks();
      var session_1 = require_session();
      var wrapOn = (jvmOn, wrap) => ({
        on: (...choices) => wrap(jvmOn.on(choices.map((c) => c._underlying)))
      });
      var doSwitchImpl = (jvmDoSwitch, wrap) => (actual) => wrapOn(typeof actual === "function" ? jvmDoSwitch.doSwitch((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(actual))) : jvmDoSwitch.doSwitch(actual), wrap);
      exports.doSwitchImpl = doSwitchImpl;
    }
  });

  // ../tmp/core/package/target/structure/doSwitchOrElse.js
  var require_doSwitchOrElse = __commonJS({
    "../tmp/core/package/target/structure/doSwitchOrElse.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.doSwitchOrElseImpl = void 0;
      var callbacks_1 = require_callbacks();
      var session_1 = require_session();
      var wrapOn = (jvmOn, wrap) => ({
        on: (...choices) => wrapOrElse(jvmOn.on(choices.map((c) => c._underlying)), wrap)
      });
      var wrapOrElse = (jvmOrElse, wrap) => ({
        orElse: (executable, ...executables) => wrap(jvmOrElse.orElse(executable._underlying, ...executables.map((e) => e._underlying)))
      });
      var doSwitchOrElseImpl = (jvmDoSwitchOrElse, wrap) => (actual) => wrapOn(typeof actual === "function" ? jvmDoSwitchOrElse.doSwitchOrElse((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(actual))) : jvmDoSwitchOrElse.doSwitchOrElse(actual), wrap);
      exports.doSwitchOrElseImpl = doSwitchOrElseImpl;
    }
  });

  // ../tmp/core/package/target/structure/randomSwitch.js
  var require_randomSwitch = __commonJS({
    "../tmp/core/package/target/structure/randomSwitch.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.randomSwitchImpl = void 0;
      var wrapOn = (jvmOn, wrap) => ({
        on: (...choices) => wrap(jvmOn.on(choices.map((c) => c._underlying)))
      });
      var randomSwitchImpl = (jvmRandomSwitch, wrap) => () => wrapOn(jvmRandomSwitch.randomSwitch(), wrap);
      exports.randomSwitchImpl = randomSwitchImpl;
    }
  });

  // ../tmp/core/package/target/structure/randomSwitchOrElse.js
  var require_randomSwitchOrElse = __commonJS({
    "../tmp/core/package/target/structure/randomSwitchOrElse.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.randomSwitchOrElseImpl = void 0;
      var wrapOn = (jvmOn, wrap) => ({
        on: (...choices) => wrapOrElse(jvmOn.on(choices.map((c) => c._underlying)), wrap)
      });
      var wrapOrElse = (jvmOrElse, wrap) => ({
        orElse: (executable, ...executables) => wrap(jvmOrElse.orElse(executable._underlying, ...executables.map((e) => e._underlying)))
      });
      var randomSwitchOrElseImpl = (jvmRandomSwitch, wrap) => () => wrapOn(jvmRandomSwitch.randomSwitchOrElse(), wrap);
      exports.randomSwitchOrElseImpl = randomSwitchOrElseImpl;
    }
  });

  // ../tmp/core/package/target/structure/uniformRandomSwitch.js
  var require_uniformRandomSwitch = __commonJS({
    "../tmp/core/package/target/structure/uniformRandomSwitch.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.uniformRandomSwitchImpl = void 0;
      var wrapOn = (jvmOn, wrap) => ({
        on: (executable, ...executables) => wrap(jvmOn.on(executable._underlying, ...executables.map((e) => e._underlying)))
      });
      var uniformRandomSwitchImpl = (jvmUniformRandomSwitch, wrap) => () => wrapOn(jvmUniformRandomSwitch.uniformRandomSwitch(), wrap);
      exports.uniformRandomSwitchImpl = uniformRandomSwitchImpl;
    }
  });

  // ../tmp/core/package/target/structure/roundRobinSwitch.js
  var require_roundRobinSwitch = __commonJS({
    "../tmp/core/package/target/structure/roundRobinSwitch.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.roundRobinSwitchImpl = void 0;
      var wrapOn = (jvmOn, wrap) => ({
        on: (executable, ...executables) => wrap(jvmOn.on(executable._underlying, ...executables.map((e) => e._underlying)))
      });
      var roundRobinSwitchImpl = (jvmRoundRobinSwitch, wrap) => () => wrapOn(jvmRoundRobinSwitch.roundRobinSwitch(), wrap);
      exports.roundRobinSwitchImpl = roundRobinSwitchImpl;
    }
  });

  // ../tmp/core/package/target/structure/errors.js
  var require_errors = __commonJS({
    "../tmp/core/package/target/structure/errors.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.errorsImpl = void 0;
      var callbacks_1 = require_callbacks();
      var session_1 = require_session();
      var on_1 = require_on();
      var errorsImpl = (jvmErrors, wrap) => ({
        exitBlockOnFail: () => (0, on_1.wrapOn)(jvmErrors.exitBlockOnFail(), wrap),
        tryMax: (times) => (0, on_1.wrapOn)(typeof times === "function" ? jvmErrors.tryMax((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(times))) : typeof times === "string" ? jvmErrors.tryMax(times) : jvmErrors.tryMax(times), wrap),
        exitHereIf: (condition) => wrap(typeof condition === "function" ? jvmErrors.exitHereIf((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(condition))) : jvmErrors.exitHereIf(condition)),
        exitHere: () => wrap(jvmErrors.exitHere()),
        exitHereIfFailed: () => wrap(jvmErrors.exitHereIfFailed()),
        stopInjector: (message) => wrap(typeof message === "function" ? jvmErrors.stopInjector((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(message))) : jvmErrors.stopInjector(message)),
        stopInjectorIf: (message, condition) => {
          if (typeof message === "function") {
            if (typeof condition === "function") {
              return wrap(jvmErrors.stopInjectorIf((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(message)), (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(condition))));
            } else {
              return wrap(jvmErrors.stopInjectorIf((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(message)), condition));
            }
          } else {
            if (typeof condition === "function") {
              return wrap(jvmErrors.stopInjectorIf(message, (0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(condition))));
            } else {
              return wrap(jvmErrors.stopInjectorIf(message, condition));
            }
          }
        }
      });
      exports.errorsImpl = errorsImpl;
    }
  });

  // ../tmp/core/package/target/structure/choices.js
  var require_choices = __commonJS({
    "../tmp/core/package/target/structure/choices.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.percent = exports.onCase = void 0;
      var jvm_types_1 = require_package();
      var wrapChoiceWithKey = (_underlying) => ({
        _underlying
      });
      var wrapChoiceWithKeyThen = (jvmChoiceWithKeyThen) => ({
        then: (executable, ...executables) => wrapChoiceWithKey(jvmChoiceWithKeyThen.then(executable._underlying, ...executables.map((e) => e._underlying)))
      });
      var onCase = (key) => wrapChoiceWithKeyThen(jvm_types_1.CoreDsl.onCase(key));
      exports.onCase = onCase;
      var wrapChoiceWithWeight = (_underlying) => ({
        _underlying
      });
      var wrapChoiceWithWeightThen = (jvmChoiceWithWeightThen) => ({
        then: (executable, ...executables) => wrapChoiceWithWeight(jvmChoiceWithWeightThen.then(executable._underlying, ...executables.map((e) => e._underlying)))
      });
      var percent = (percent2) => wrapChoiceWithWeightThen(jvm_types_1.CoreDsl.percent(percent2));
      exports.percent = percent;
    }
  });

  // ../tmp/core/package/target/structure/index.js
  var require_structure = __commonJS({
    "../tmp/core/package/target/structure/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.stopInjectorIf = exports.stopInjector = exports.exitHereIfFailed = exports.exitHere = exports.exitHereIf = exports.tryMax = exports.exitBlockOnFail = exports.roundRobinSwitch = exports.uniformRandomSwitch = exports.randomSwitchOrElse = exports.randomSwitch = exports.doSwitchOrElse = exports.doSwitch = exports.doIfEqualsOrElse = exports.doIfEquals = exports.doIfOrElse = exports.doIf = exports.doWhileDuring = exports.asLongAsDuring = exports.doWhile = exports.asLongAs = exports.forever = exports.during = exports.foreach = exports.repeat = exports.rendezVous = exports.pace = exports.pause = exports.feed = exports.group = exports.exec = exports.percent = exports.onCase = exports.wrapActionBuilder = exports.structureBuilderImpl = void 0;
      var jvm_types_1 = require_package();
      var execs_1 = require_execs();
      var groups_1 = require_groups();
      var feeds_1 = require_feeds();
      var pauses_1 = require_pauses();
      var paces_1 = require_paces();
      var rendezVous_1 = require_rendezVous();
      var repeat_1 = require_repeat();
      var forEach_1 = require_forEach();
      var during_1 = require_during();
      var forever_1 = require_forever();
      var asLongAs_1 = require_asLongAs();
      var doWhile_1 = require_doWhile();
      var asLongAsDuring_1 = require_asLongAsDuring();
      var doWhileDuring_1 = require_doWhileDuring();
      var doIf_1 = require_doIf();
      var doIfOrElse_1 = require_doIfOrElse();
      var doSwitch_1 = require_doSwitch();
      var doSwitchOrElse_1 = require_doSwitchOrElse();
      var randomSwitch_1 = require_randomSwitch();
      var randomSwitchOrElse_1 = require_randomSwitchOrElse();
      var uniformRandomSwitch_1 = require_uniformRandomSwitch();
      var roundRobinSwitch_1 = require_roundRobinSwitch();
      var errors_1 = require_errors();
      var structureBuilderImpl = (jvm, wrap) => ({
        exec: (0, execs_1.execImpl)(jvm, wrap),
        group: (0, groups_1.groupImpl)(jvm, wrap),
        feed: (0, feeds_1.feedImpl)(jvm, wrap),
        pause: (0, pauses_1.pauseImpl)(jvm, wrap),
        pace: (0, paces_1.paceImpl)(jvm, wrap),
        rendezVous: (0, rendezVous_1.rendezVousImpl)(jvm, wrap),
        repeat: (0, repeat_1.repeatImpl)(jvm, wrap),
        foreach: (0, forEach_1.foreachImpl)(jvm, wrap),
        during: (0, during_1.duringImpl)(jvm, wrap),
        forever: (0, forever_1.foreverImpl)(jvm, wrap),
        asLongAs: (0, asLongAs_1.asLongAsImpl)(jvm, wrap),
        doWhile: (0, doWhile_1.doWhileImpl)(jvm, wrap),
        asLongAsDuring: (0, asLongAsDuring_1.asLongAsDuringImpl)(jvm, wrap),
        doWhileDuring: (0, doWhileDuring_1.doWhileDuringImpl)(jvm, wrap),
        doIf: (0, doIf_1.doIfImpl)(jvm, wrap),
        doIfOrElse: (0, doIfOrElse_1.doIfOrElseImpl)(jvm, wrap),
        doIfEquals: (0, doIf_1.doIfEqualsImpl)(jvm, wrap),
        doIfEqualsOrElse: (0, doIfOrElse_1.doIfEqualsOrElseImpl)(jvm, wrap),
        doSwitch: (0, doSwitch_1.doSwitchImpl)(jvm, wrap),
        doSwitchOrElse: (0, doSwitchOrElse_1.doSwitchOrElseImpl)(jvm, wrap),
        randomSwitch: (0, randomSwitch_1.randomSwitchImpl)(jvm, wrap),
        randomSwitchOrElse: (0, randomSwitchOrElse_1.randomSwitchOrElseImpl)(jvm, wrap),
        uniformRandomSwitch: (0, uniformRandomSwitch_1.uniformRandomSwitchImpl)(jvm, wrap),
        roundRobinSwitch: (0, roundRobinSwitch_1.roundRobinSwitchImpl)(jvm, wrap),
        ...(0, errors_1.errorsImpl)(jvm, wrap)
      });
      exports.structureBuilderImpl = structureBuilderImpl;
      var wrapChainBuilder = (_underlying) => ({
        _underlying,
        ...(0, exports.structureBuilderImpl)(_underlying, wrapChainBuilder)
      });
      var execs_2 = require_execs();
      Object.defineProperty(exports, "wrapActionBuilder", { enumerable: true, get: function() {
        return execs_2.wrapActionBuilder;
      } });
      var choices_1 = require_choices();
      Object.defineProperty(exports, "onCase", { enumerable: true, get: function() {
        return choices_1.onCase;
      } });
      Object.defineProperty(exports, "percent", { enumerable: true, get: function() {
        return choices_1.percent;
      } });
      exports.exec = (0, execs_1.execImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.group = (0, groups_1.groupImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.feed = (0, feeds_1.feedImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.pause = (0, pauses_1.pauseImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.pace = (0, paces_1.paceImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.rendezVous = (0, rendezVous_1.rendezVousImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.repeat = (0, repeat_1.repeatImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.foreach = (0, forEach_1.foreachImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.during = (0, during_1.duringImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.forever = (0, forever_1.foreverImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.asLongAs = (0, asLongAs_1.asLongAsImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.doWhile = (0, doWhile_1.doWhileImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.asLongAsDuring = (0, asLongAsDuring_1.asLongAsDuringImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.doWhileDuring = (0, doWhileDuring_1.doWhileDuringImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.doIf = (0, doIf_1.doIfImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.doIfOrElse = (0, doIfOrElse_1.doIfOrElseImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.doIfEquals = (0, doIf_1.doIfEqualsImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.doIfEqualsOrElse = (0, doIfOrElse_1.doIfEqualsOrElseImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.doSwitch = (0, doSwitch_1.doSwitchImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.doSwitchOrElse = (0, doSwitchOrElse_1.doSwitchOrElseImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.randomSwitch = (0, randomSwitch_1.randomSwitchImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.randomSwitchOrElse = (0, randomSwitchOrElse_1.randomSwitchOrElseImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.uniformRandomSwitch = (0, uniformRandomSwitch_1.uniformRandomSwitchImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.roundRobinSwitch = (0, roundRobinSwitch_1.roundRobinSwitchImpl)(jvm_types_1.CoreDsl, wrapChainBuilder);
      exports.exitBlockOnFail = (0, errors_1.errorsImpl)(jvm_types_1.CoreDsl, wrapChainBuilder).exitBlockOnFail;
      exports.tryMax = (0, errors_1.errorsImpl)(jvm_types_1.CoreDsl, wrapChainBuilder).tryMax;
      exports.exitHereIf = (0, errors_1.errorsImpl)(jvm_types_1.CoreDsl, wrapChainBuilder).exitHereIf;
      exports.exitHere = (0, errors_1.errorsImpl)(jvm_types_1.CoreDsl, wrapChainBuilder).exitHere;
      exports.exitHereIfFailed = (0, errors_1.errorsImpl)(jvm_types_1.CoreDsl, wrapChainBuilder).exitHereIfFailed;
      exports.stopInjector = (0, errors_1.errorsImpl)(jvm_types_1.CoreDsl, wrapChainBuilder).stopInjector;
      exports.stopInjectorIf = (0, errors_1.errorsImpl)(jvm_types_1.CoreDsl, wrapChainBuilder).stopInjectorIf;
    }
  });

  // ../tmp/core/package/target/scenario.js
  var require_scenario = __commonJS({
    "../tmp/core/package/target/scenario.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.scenario = void 0;
      var jvm_types_1 = require_package();
      var population_1 = require_population();
      var structure_1 = require_structure();
      var wrapScenarioBuilder = (jvmScenarioBuilder) => ({
        injectOpen: (...steps) => (0, population_1.wrapPopulationBuilder)(jvmScenarioBuilder.injectOpen(steps.map((s) => s._underlying))),
        injectClosed: (...steps) => (0, population_1.wrapPopulationBuilder)(jvmScenarioBuilder.injectClosed(steps.map((s) => s._underlying))),
        ...(0, structure_1.structureBuilderImpl)(jvmScenarioBuilder, wrapScenarioBuilder)
      });
      var scenario6 = (name) => {
        const jvmScenarioBuilder = jvm_types_1.CoreDsl.scenario(name);
        return wrapScenarioBuilder(jvmScenarioBuilder);
      };
      exports.scenario = scenario6;
    }
  });

  // ../tmp/core/package/target/throttling.js
  var require_throttling = __commonJS({
    "../tmp/core/package/target/throttling.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.jumpToRps = exports.holdFor = exports.reachRps = void 0;
      var jvm_types_1 = require_package();
      var duration_1 = require_duration();
      var reachRps = (target) => wrapThrottleStepReachIntermediate(jvm_types_1.CoreDsl.reachRps(target));
      exports.reachRps = reachRps;
      var holdFor = (duration) => wrapThrottleStep(jvm_types_1.CoreDsl.holdFor((0, duration_1.toJvmDuration)(duration)));
      exports.holdFor = holdFor;
      var jumpToRps = (target) => wrapThrottleStep(jvm_types_1.CoreDsl.jumpToRps(target));
      exports.jumpToRps = jumpToRps;
      var wrapThrottleStep = (_underlying) => ({
        _underlying
      });
      var wrapThrottleStepReachIntermediate = (_underlying) => ({
        in: (duration) => wrapThrottleStep(_underlying.in((0, duration_1.toJvmDuration)(duration))),
        during: (duration) => wrapThrottleStep(_underlying.during((0, duration_1.toJvmDuration)(duration)))
      });
    }
  });

  // ../tmp/core/package/target/index.js
  var require_target = __commonJS({
    "../tmp/core/package/target/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.simulation = void 0;
      require_package();
      var callbacks_1 = require_callbacks();
      var pauses_1 = require_pauses();
      var duration_1 = require_duration();
      var session_1 = require_session();
      __exportStar(require_callbacks(), exports);
      __exportStar(require_duration(), exports);
      __exportStar(require_assertions(), exports);
      __exportStar(require_body(), exports);
      __exportStar(require_checks(), exports);
      __exportStar(require_closedInjection(), exports);
      __exportStar(require_common(), exports);
      __exportStar(require_feeders(), exports);
      __exportStar(require_filters(), exports);
      __exportStar(require_openInjection(), exports);
      __exportStar(require_population(), exports);
      __exportStar(require_protocol(), exports);
      __exportStar(require_scenario(), exports);
      __exportStar(require_session(), exports);
      __exportStar(require_structure(), exports);
      __exportStar(require_throttling(), exports);
      var wrapSetUp = (jvmSetUp) => ({
        protocols: (...protocols) => wrapSetUp(jvmSetUp.protocols(protocols.map((p) => p._underlying))),
        assertions: (...assertions) => wrapSetUp(jvmSetUp.assertions(assertions.map((p) => p._underlying))),
        maxDuration: (duration) => wrapSetUp(jvmSetUp.maxDuration((0, duration_1.toJvmDuration)(duration))),
        throttle: (...throttleSteps) => wrapSetUp(jvmSetUp.throttle(throttleSteps.map((t) => t._underlying))),
        disablePauses: () => wrapSetUp(jvmSetUp.disablePauses()),
        constantPauses: () => wrapSetUp(jvmSetUp.constantPauses()),
        exponentialPauses: () => wrapSetUp(jvmSetUp.exponentialPauses()),
        customPauses: (f) => wrapSetUp(jvmSetUp.customPauses((0, callbacks_1.wrapCallback)((0, session_1.underlyingSessionTo)(f)))),
        uniformPauses: (plusOrMinus) => wrapSetUp(jvmSetUp.uniformPauses((0, duration_1.toJvmDuration)(plusOrMinus))),
        normalPausesWithStdDevDuration: (stdDevDuration) => wrapSetUp(jvmSetUp.normalPausesWithStdDevDuration((0, duration_1.toJvmDuration)(stdDevDuration))),
        normalPausesWithPercentageDuration: (stdDevPercent) => wrapSetUp(jvmSetUp.normalPausesWithPercentageDuration(stdDevPercent)),
        pauses: (pauseType) => wrapSetUp(jvmSetUp.pauses((0, pauses_1.toJvmPauseType)(pauseType)))
      });
      var simulation6 = (simulation7) => (jvmSetUp) => {
        simulation7((...populationBuilders) => wrapSetUp(jvmSetUp(populationBuilders.map((p) => p._underlying))));
      };
      exports.simulation = simulation6;
    }
  });

  // ../tmp/http/package/target/protocol.js
  var require_protocol2 = __commonJS({
    "../tmp/http/package/target/protocol.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapHttpProtocolBuilder = void 0;
      var core_1 = require_target();
      var wrapHttpProtocolBuilder = (_underlying) => ({
        _underlying,
        baseUrl: (url) => (0, exports.wrapHttpProtocolBuilder)(_underlying.baseUrl(url)),
        baseUrls: (...urls) => (0, exports.wrapHttpProtocolBuilder)(_underlying.baseUrls(...urls)),
        warmUp: (url) => (0, exports.wrapHttpProtocolBuilder)(_underlying.warmUp(url)),
        disableWarmUp: () => (0, exports.wrapHttpProtocolBuilder)(_underlying.disableWarmUp()),
        // Engine part
        shareConnections: () => (0, exports.wrapHttpProtocolBuilder)(_underlying.shareConnections()),
        localAddress: (address) => (0, exports.wrapHttpProtocolBuilder)(_underlying.localAddress(address)),
        localAddresses: (...addresses) => (0, exports.wrapHttpProtocolBuilder)(_underlying.localAddresses(...addresses)),
        useAllLocalAddresses: () => (0, exports.wrapHttpProtocolBuilder)(_underlying.useAllLocalAddresses()),
        useAllLocalAddressesMatching: (...patterns) => (0, exports.wrapHttpProtocolBuilder)(_underlying.useAllLocalAddressesMatching(...patterns)),
        maxConnectionsPerHost: (max) => (0, exports.wrapHttpProtocolBuilder)(_underlying.maxConnectionsPerHost(max)),
        // TODO perUserKeyManagerFactory
        // Request part
        disableAutoOrigin: () => (0, exports.wrapHttpProtocolBuilder)(_underlying.disableAutoOrigin()),
        disableAutoReferer: () => (0, exports.wrapHttpProtocolBuilder)(_underlying.disableAutoReferer()),
        disableCaching: () => (0, exports.wrapHttpProtocolBuilder)(_underlying.disableCaching()),
        header: (name, value) => (0, exports.wrapHttpProtocolBuilder)(typeof value === "function" ? _underlying.header(name, (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(value))) : _underlying.header(name, value)),
        headers: (headers) => (0, exports.wrapHttpProtocolBuilder)(_underlying.headers(headers)),
        acceptHeader: (value) => (0, exports.wrapHttpProtocolBuilder)(typeof value === "function" ? _underlying.acceptHeader((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(value))) : _underlying.acceptHeader(value)),
        acceptCharsetHeader: (value) => (0, exports.wrapHttpProtocolBuilder)(typeof value === "function" ? _underlying.acceptCharsetHeader((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(value))) : _underlying.acceptCharsetHeader(value)),
        acceptEncodingHeader: (value) => (0, exports.wrapHttpProtocolBuilder)(typeof value === "function" ? _underlying.acceptEncodingHeader((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(value))) : _underlying.acceptEncodingHeader(value)),
        acceptLanguageHeader: (value) => (0, exports.wrapHttpProtocolBuilder)(typeof value === "function" ? _underlying.acceptLanguageHeader((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(value))) : _underlying.acceptLanguageHeader(value)),
        authorizationHeader: (value) => (0, exports.wrapHttpProtocolBuilder)(typeof value === "function" ? _underlying.authorizationHeader((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(value))) : _underlying.authorizationHeader(value)),
        connectionHeader: (value) => (0, exports.wrapHttpProtocolBuilder)(typeof value === "function" ? _underlying.connectionHeader((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(value))) : _underlying.connectionHeader(value)),
        contentTypeHeader: (value) => (0, exports.wrapHttpProtocolBuilder)(typeof value === "function" ? _underlying.contentTypeHeader((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(value))) : _underlying.contentTypeHeader(value)),
        doNotTrackHeader: (value) => (0, exports.wrapHttpProtocolBuilder)(typeof value === "function" ? _underlying.doNotTrackHeader((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(value))) : _underlying.doNotTrackHeader(value)),
        originHeader: (value) => (0, exports.wrapHttpProtocolBuilder)(typeof value === "function" ? _underlying.originHeader((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(value))) : _underlying.originHeader(value)),
        userAgentHeader: (value) => (0, exports.wrapHttpProtocolBuilder)(typeof value === "function" ? _underlying.userAgentHeader((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(value))) : _underlying.userAgentHeader(value)),
        upgradeInsecureRequestsHeader: (value) => (0, exports.wrapHttpProtocolBuilder)(typeof value === "function" ? _underlying.upgradeInsecureRequestsHeader((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(value))) : _underlying.upgradeInsecureRequestsHeader(value)),
        basicAuth: (username, password) => (0, exports.wrapHttpProtocolBuilder)(typeof username === "function" ? typeof password === "function" ? _underlying.basicAuth((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(username)), (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(password))) : _underlying.basicAuth((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(username)), password) : typeof password === "function" ? _underlying.basicAuth(username, (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(password))) : _underlying.basicAuth(username, password)),
        digestAuth: (username, password) => (0, exports.wrapHttpProtocolBuilder)(typeof username === "function" ? typeof password === "function" ? _underlying.digestAuth((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(username)), (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(password))) : _underlying.digestAuth((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(username)), password) : typeof password === "function" ? _underlying.digestAuth(username, (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(password))) : _underlying.digestAuth(username, password)),
        silentResources: () => (0, exports.wrapHttpProtocolBuilder)(_underlying.silentResources()),
        silentUri: (pattern) => (0, exports.wrapHttpProtocolBuilder)(_underlying.silentUri(pattern)),
        disableUrlEncoding: () => (0, exports.wrapHttpProtocolBuilder)(_underlying.disableUrlEncoding()),
        //sign: (calculator: (request: Request, session: Session) => Request): HttpProtocolBuilder =>
        //  wrapHttpProtocolBuilder(_underlying.sign(wrapBiCallback(underlyingRequestTransform(calculator)))),
        signWithOAuth1: (consumerKey, clientSharedSecret, token, tokenSecret, useAuthorizationHeader) => (0, exports.wrapHttpProtocolBuilder)(typeof consumerKey === "function" && typeof clientSharedSecret === "function" && typeof token === "function" && typeof tokenSecret === "function" ? typeof useAuthorizationHeader !== "undefined" ? _underlying.signWithOAuth1((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(consumerKey)), (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(clientSharedSecret)), (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(token)), (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(tokenSecret)), useAuthorizationHeader) : _underlying.signWithOAuth1((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(consumerKey)), (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(clientSharedSecret)), (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(token)), (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(tokenSecret))) : typeof useAuthorizationHeader !== "undefined" ? _underlying.signWithOAuth1(consumerKey, clientSharedSecret, token, tokenSecret, useAuthorizationHeader) : _underlying.signWithOAuth1(consumerKey, clientSharedSecret, token, tokenSecret)),
        enableHttp2: () => (0, exports.wrapHttpProtocolBuilder)(_underlying.enableHttp2()),
        http2PriorKnowledge: (remotes) => (0, exports.wrapHttpProtocolBuilder)(_underlying.http2PriorKnowledge(remotes)),
        // Response part
        disableFollowRedirect: () => (0, exports.wrapHttpProtocolBuilder)(_underlying.disableFollowRedirect()),
        maxRedirects: (max) => (0, exports.wrapHttpProtocolBuilder)(_underlying.maxRedirects(max)),
        strict302Handling: () => (0, exports.wrapHttpProtocolBuilder)(_underlying.strict302Handling()),
        //transformResponse: (f: (response: Response, session: Session) => Response): HttpProtocolBuilder =>
        //  wrapHttpProtocolBuilder(_underlying.transformResponse(wrapBiCallback(underlyingResponseTransform(f)))),
        check: (...checks) => (0, exports.wrapHttpProtocolBuilder)(_underlying.check(checks.map((c) => c._underlying))),
        checkIf: (condition) => (0, core_1.wrapCondition)(typeof condition === "string" ? _underlying.checkIf(condition) : _underlying.checkIf((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(condition))), exports.wrapHttpProtocolBuilder),
        inferHtmlResources: (arg0, arg1) => (0, exports.wrapHttpProtocolBuilder)(arg0 !== void 0 ? arg1 !== void 0 ? _underlying.inferHtmlResources(arg0._underlying, arg1._underlying) : _underlying.inferHtmlResources(arg0._underlying) : _underlying.inferHtmlResources()),
        nameInferredHtmlResourcesAfterUrlTail: () => (0, exports.wrapHttpProtocolBuilder)(_underlying.nameInferredHtmlResourcesAfterUrlTail()),
        nameInferredHtmlResourcesAfterAbsoluteUrl: () => (0, exports.wrapHttpProtocolBuilder)(_underlying.nameInferredHtmlResourcesAfterAbsoluteUrl()),
        nameInferredHtmlResourcesAfterRelativeUrl: () => (0, exports.wrapHttpProtocolBuilder)(_underlying.nameInferredHtmlResourcesAfterRelativeUrl()),
        nameInferredHtmlResourcesAfterPath: () => (0, exports.wrapHttpProtocolBuilder)(_underlying.nameInferredHtmlResourcesAfterPath()),
        nameInferredHtmlResourcesAfterLastPathElement: () => (0, exports.wrapHttpProtocolBuilder)(_underlying.nameInferredHtmlResourcesAfterLastPathElement()),
        // Proxy part
        noProxyFor: (...hosts) => (0, exports.wrapHttpProtocolBuilder)(_underlying.noProxyFor(...hosts)),
        proxy: (proxy) => (0, exports.wrapHttpProtocolBuilder)(_underlying.proxy(proxy._underlying)),
        // DNS part
        asyncNameResolution: (...dnsServers) => (0, exports.wrapHttpProtocolBuilder)(_underlying.asyncNameResolution(...dnsServers)),
        hostNameAliases: (aliases) => (0, exports.wrapHttpProtocolBuilder)(_underlying.hostNameAliases(aliases)),
        perUserNameResolution: () => (0, exports.wrapHttpProtocolBuilder)(_underlying.perUserNameResolution())
      });
      exports.wrapHttpProtocolBuilder = wrapHttpProtocolBuilder;
    }
  });

  // ../tmp/http/package/target/request/body.js
  var require_body2 = __commonJS({
    "../tmp/http/package/target/request/body.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapRequestBody = void 0;
      var wrapRequestBody = (_underlying) => ({
        _underlying,
        bytes: () => _underlying.getBytes()
      });
      exports.wrapRequestBody = wrapRequestBody;
    }
  });

  // ../tmp/http/package/target/headers.js
  var require_headers = __commonJS({
    "../tmp/http/package/target/headers.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapHttpHeaders = void 0;
      var wrapHttpHeaders = (_underlying) => ({
        _underlying,
        add: (name, value) => (0, exports.wrapHttpHeaders)(_underlying.add(name, value))
      });
      exports.wrapHttpHeaders = wrapHttpHeaders;
    }
  });

  // ../tmp/http/package/target/request/request.js
  var require_request = __commonJS({
    "../tmp/http/package/target/request/request.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapRequest = void 0;
      var headers_1 = require_headers();
      var body_1 = require_body2();
      var wrapRequest = (_underlying) => ({
        _underlying,
        body: () => (0, body_1.wrapRequestBody)(_underlying.getBody()),
        headers: () => (0, headers_1.wrapHttpHeaders)(_underlying.getHeaders())
      });
      exports.wrapRequest = wrapRequest;
    }
  });

  // ../tmp/http/package/target/request/index.js
  var require_request2 = __commonJS({
    "../tmp/http/package/target/request/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapHttpRequestActionBuilder = void 0;
      var core_1 = require_target();
      __exportStar(require_body2(), exports);
      __exportStar(require_request(), exports);
      var requestWithParamsActionBuilderImpl = (jvmBuilder, wrap) => ({
        queryParam: (name, value) => {
          if (typeof name === "function") {
            if (typeof value === "function") {
              return wrap(jvmBuilder.queryParam((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(name)), (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(value))));
            } else if (typeof value === "string") {
              return wrap(jvmBuilder.queryParam((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(name)), value));
            } else {
              return wrap(jvmBuilder.queryParam((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(name)), value));
            }
          } else {
            if (typeof value === "function") {
              return wrap(jvmBuilder.queryParam(name, (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(value))));
            } else if (typeof value === "string") {
              return wrap(jvmBuilder.queryParam(name, value));
            } else {
              return wrap(jvmBuilder.queryParam(name, value));
            }
          }
        },
        multivaluedQueryParam: (name, values) => {
          if (typeof name === "function") {
            if (typeof values === "function") {
              return wrap(jvmBuilder.multivaluedQueryParam((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(name)), (0, core_1.wrapCallback)((0, core_1.underlyingSessionToJava)(values))));
            } else if (typeof values === "string") {
              return wrap(jvmBuilder.multivaluedQueryParam((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(name)), values));
            } else {
              return wrap(jvmBuilder.multivaluedQueryParam((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(name)), values));
            }
          } else {
            if (typeof values === "function") {
              return wrap(jvmBuilder.multivaluedQueryParam(name, (0, core_1.wrapCallback)((0, core_1.underlyingSessionToJava)(values))));
            } else if (typeof values === "string") {
              return wrap(jvmBuilder.multivaluedQueryParam(name, values));
            } else {
              return wrap(jvmBuilder.multivaluedQueryParam(name, values));
            }
          }
        },
        queryParamMap: (map) => {
          if (typeof map === "function") {
            return wrap(jvmBuilder.queryParamMap((0, core_1.wrapCallback)((0, core_1.underlyingSessionToJava)(map))));
          } else if (typeof map === "object") {
            return wrap(jvmBuilder.queryParamMap(map));
          } else {
            return wrap(jvmBuilder.queryParamMap(map));
          }
        },
        header: (name, value) => wrap(typeof value === "function" ? jvmBuilder.header(name, (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(value))) : jvmBuilder.header(name, value)),
        headers: (headers) => wrap(jvmBuilder.headers(headers)),
        ignoreProtocolHeaders: () => wrap(jvmBuilder.ignoreProtocolHeaders()),
        basicAuth: (username, password) => wrap(typeof username === "function" ? typeof password === "function" ? jvmBuilder.basicAuth((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(username)), (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(password))) : jvmBuilder.basicAuth((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(username)), password) : typeof password === "function" ? jvmBuilder.basicAuth(username, (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(password))) : jvmBuilder.basicAuth(username, password)),
        digestAuth: (username, password) => wrap(typeof username === "function" ? typeof password === "function" ? jvmBuilder.digestAuth((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(username)), (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(password))) : jvmBuilder.digestAuth((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(username)), password) : typeof password === "function" ? jvmBuilder.digestAuth(username, (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(password))) : jvmBuilder.digestAuth(username, password)),
        disableUrlEncoding: () => wrap(jvmBuilder.disableUrlEncoding()),
        proxy: (proxy) => wrap(jvmBuilder.proxy(proxy._underlying)),
        signWithOAuth1: (consumerKey, clientSharedSecret, token, tokenSecret) => wrap(typeof consumerKey === "function" && typeof clientSharedSecret === "function" && typeof token === "function" && typeof tokenSecret === "function" ? jvmBuilder.signWithOAuth1((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(consumerKey)), (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(clientSharedSecret)), (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(token)), (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(tokenSecret))) : jvmBuilder.signWithOAuth1(consumerKey, clientSharedSecret, token, tokenSecret))
      });
      var requestWithBodyActionBuilderImpl = (jvmBuilder, wrap) => ({
        body: (body) => wrap(jvmBuilder.body(body._underlying)),
        bodyPart: (part) => wrap(jvmBuilder.bodyPart(part._underlying)),
        bodyParts: (...parts) => wrap(jvmBuilder.bodyParts(parts.map((part) => part._underlying))),
        asMultipartForm: () => wrap(jvmBuilder.asMultipartForm()),
        asFormUrlEncoded: () => wrap(jvmBuilder.asFormUrlEncoded()),
        formParam: (key, value) => {
          if (typeof key === "function") {
            if (typeof value === "function") {
              return wrap(jvmBuilder.formParam((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(key)), (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(value))));
            } else if (typeof value === "string") {
              return wrap(jvmBuilder.formParam((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(key)), value));
            } else {
              return wrap(jvmBuilder.formParam((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(key)), value));
            }
          } else {
            if (typeof value === "function") {
              return wrap(jvmBuilder.formParam(key, (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(value))));
            } else if (typeof value === "string") {
              return wrap(jvmBuilder.formParam(key, value));
            } else {
              return wrap(jvmBuilder.formParam(key, value));
            }
          }
        },
        multivaluedFormParam: (key, values) => {
          if (typeof key === "function") {
            if (typeof values === "function") {
              return wrap(jvmBuilder.multivaluedFormParam((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(key)), (0, core_1.wrapCallback)((0, core_1.underlyingSessionToJava)(values))));
            } else if (typeof values === "string") {
              throw Error(`multivaluedFormParam() called with invalid arguments ${key}, ${values}`);
            } else {
              return wrap(jvmBuilder.multivaluedFormParam((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(key)), values));
            }
          } else {
            if (typeof values === "function") {
              return wrap(jvmBuilder.multivaluedFormParam(key, (0, core_1.wrapCallback)((0, core_1.underlyingSessionToJava)(values))));
            } else if (typeof values === "string") {
              return wrap(jvmBuilder.multivaluedFormParam(key, values));
            } else {
              return wrap(jvmBuilder.multivaluedFormParam(key, values));
            }
          }
        },
        formParamMap: (map) => wrap(typeof map === "function" ? jvmBuilder["formParamMap(java.util.function.Function)"]((0, core_1.wrapCallback)((0, core_1.underlyingSessionToJava)(map))) : jvmBuilder.formParamMap(map)),
        form: (form) => wrap(typeof form === "function" ? jvmBuilder.form((0, core_1.wrapCallback)((0, core_1.underlyingSessionToJava)(form))) : jvmBuilder.form(form)),
        formUpload: (name, filePath) => wrap(typeof name === "function" ? typeof filePath === "function" ? jvmBuilder.formUpload((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(name)), (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(filePath))) : jvmBuilder.formUpload((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(name)), filePath) : typeof filePath === "function" ? jvmBuilder.formUpload(name, (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(filePath))) : jvmBuilder.formUpload(name, filePath)),
        asJson: () => wrap(jvmBuilder.asJson()),
        asXml: () => wrap(jvmBuilder.asXml())
      });
      var requestActionBuilderImpl = (jvmBuilder, wrap) => ({
        check: (...checks) => wrap(jvmBuilder.check(checks.map((c) => c._underlying))),
        checkIf: (condition) => (0, core_1.wrapCondition)(typeof condition === "string" ? jvmBuilder.checkIf(condition) : jvmBuilder.checkIf((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(condition))), wrap),
        ignoreProtocolChecks: () => wrap(jvmBuilder.ignoreProtocolChecks()),
        silent: () => wrap(jvmBuilder.silent()),
        notSilent: () => wrap(jvmBuilder.notSilent()),
        disableFollowRedirect: () => wrap(jvmBuilder.disableFollowRedirect()),
        // TODO transformResponse: (f: (response: Response, session: Session) => Response): T =>
        //  wrap(jvmBuilder.transformResponse(wrapBiCallback(underlyingResponseTransform(f))))
        resources: (...res) => wrap(jvmBuilder.resources(res.map((r) => r._underlying))),
        requestTimeout: (duration) => wrap(jvmBuilder.requestTimeout((0, core_1.toJvmDuration)(duration)))
      });
      var wrapHttpRequestActionBuilder = (_underlying) => ({
        _underlying,
        ...requestWithParamsActionBuilderImpl(_underlying, exports.wrapHttpRequestActionBuilder),
        ...requestWithBodyActionBuilderImpl(_underlying, exports.wrapHttpRequestActionBuilder),
        ...requestActionBuilderImpl(_underlying, exports.wrapHttpRequestActionBuilder)
      });
      exports.wrapHttpRequestActionBuilder = wrapHttpRequestActionBuilder;
    }
  });

  // ../tmp/http/package/target/response/body.js
  var require_body3 = __commonJS({
    "../tmp/http/package/target/response/body.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapResponseBody = void 0;
      var wrapResponseBody = (_underlying) => ({
        _underlying,
        bytes: () => _underlying.bytes(),
        chars: () => _underlying.chars(),
        length: () => _underlying.length(),
        string: () => _underlying.string()
      });
      exports.wrapResponseBody = wrapResponseBody;
    }
  });

  // ../tmp/http/package/target/response/status.js
  var require_status = __commonJS({
    "../tmp/http/package/target/response/status.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.fromJvmHttpResponseStatus = exports.HttpResponseStatus = void 0;
      var HttpResponseStatus = class {
        constructor(code, reasonPhrase) {
          this.code = code;
          this.reasonPhrase = reasonPhrase;
        }
      };
      exports.HttpResponseStatus = HttpResponseStatus;
      HttpResponseStatus.CONTINUE = new HttpResponseStatus(100, "Continue");
      HttpResponseStatus.SWITCHING_PROTOCOLS = new HttpResponseStatus(101, "Switching Protocols");
      HttpResponseStatus.PROCESSING = new HttpResponseStatus(102, "Processing");
      HttpResponseStatus.EARLY_HINTS = new HttpResponseStatus(103, "Early Hints");
      HttpResponseStatus.OK = new HttpResponseStatus(200, "OK");
      HttpResponseStatus.CREATED = new HttpResponseStatus(201, "Created");
      HttpResponseStatus.ACCEPTED = new HttpResponseStatus(202, "Accepted");
      HttpResponseStatus.NON_AUTHORITATIVE_INFORMATION = new HttpResponseStatus(203, "Non-Authoritative Information");
      HttpResponseStatus.NO_CONTENT = new HttpResponseStatus(204, "No Content");
      HttpResponseStatus.RESET_CONTENT = new HttpResponseStatus(205, "Reset Content");
      HttpResponseStatus.PARTIAL_CONTENT = new HttpResponseStatus(206, "Partial Content");
      HttpResponseStatus.MULTI_STATUS = new HttpResponseStatus(207, "Multi-Status");
      HttpResponseStatus.MULTIPLE_CHOICES = new HttpResponseStatus(300, "Multiple Choices");
      HttpResponseStatus.MOVED_PERMANENTLY = new HttpResponseStatus(301, "Moved Permanently");
      HttpResponseStatus.FOUND = new HttpResponseStatus(302, "Found");
      HttpResponseStatus.SEE_OTHER = new HttpResponseStatus(303, "See Other");
      HttpResponseStatus.NOT_MODIFIED = new HttpResponseStatus(304, "Not Modified");
      HttpResponseStatus.USE_PROXY = new HttpResponseStatus(305, "Use Proxy");
      HttpResponseStatus.TEMPORARY_REDIRECT = new HttpResponseStatus(307, "Temporary Redirect");
      HttpResponseStatus.PERMANENT_REDIRECT = new HttpResponseStatus(308, "Permanent Redirect");
      HttpResponseStatus.BAD_REQUEST = new HttpResponseStatus(400, "Bad Request");
      HttpResponseStatus.UNAUTHORIZED = new HttpResponseStatus(401, "Unauthorized");
      HttpResponseStatus.PAYMENT_REQUIRED = new HttpResponseStatus(402, "Payment Required");
      HttpResponseStatus.FORBIDDEN = new HttpResponseStatus(403, "Forbidden");
      HttpResponseStatus.NOT_FOUND = new HttpResponseStatus(404, "Not Found");
      HttpResponseStatus.METHOD_NOT_ALLOWED = new HttpResponseStatus(405, "Method Not Allowed");
      HttpResponseStatus.NOT_ACCEPTABLE = new HttpResponseStatus(406, "Not Acceptable");
      HttpResponseStatus.PROXY_AUTHENTICATION_REQUIRED = new HttpResponseStatus(407, "Proxy Authentication Required");
      HttpResponseStatus.REQUEST_TIMEOUT = new HttpResponseStatus(408, "Request Timeout");
      HttpResponseStatus.CONFLICT = new HttpResponseStatus(409, "Conflict");
      HttpResponseStatus.GONE = new HttpResponseStatus(410, "Gone");
      HttpResponseStatus.LENGTH_REQUIRED = new HttpResponseStatus(411, "Length Required");
      HttpResponseStatus.PRECONDITION_FAILED = new HttpResponseStatus(412, "Precondition Failed");
      HttpResponseStatus.REQUEST_ENTITY_TOO_LARGE = new HttpResponseStatus(413, "Request Entity Too Large");
      HttpResponseStatus.REQUEST_URI_TOO_LONG = new HttpResponseStatus(414, "Request-URI Too Long");
      HttpResponseStatus.UNSUPPORTED_MEDIA_TYPE = new HttpResponseStatus(415, "Unsupported Media Type");
      HttpResponseStatus.REQUESTED_RANGE_NOT_SATISFIABLE = new HttpResponseStatus(416, "Requested Range Not Satisfiable");
      HttpResponseStatus.EXPECTATION_FAILED = new HttpResponseStatus(417, "Expectation Failed");
      HttpResponseStatus.MISDIRECTED_REQUEST = new HttpResponseStatus(421, "Misdirected Request");
      HttpResponseStatus.UNPROCESSABLE_ENTITY = new HttpResponseStatus(422, "Unprocessable Entity");
      HttpResponseStatus.LOCKED = new HttpResponseStatus(423, "Locked");
      HttpResponseStatus.FAILED_DEPENDENCY = new HttpResponseStatus(424, "Failed Dependency");
      HttpResponseStatus.UNORDERED_COLLECTION = new HttpResponseStatus(425, "Unordered Collection");
      HttpResponseStatus.UPGRADE_REQUIRED = new HttpResponseStatus(426, "Upgrade Required");
      HttpResponseStatus.PRECONDITION_REQUIRED = new HttpResponseStatus(428, "Precondition Required");
      HttpResponseStatus.TOO_MANY_REQUESTS = new HttpResponseStatus(429, "Too Many Requests");
      HttpResponseStatus.REQUEST_HEADER_FIELDS_TOO_LARGE = new HttpResponseStatus(431, "Request Header Fields Too Large");
      HttpResponseStatus.INTERNAL_SERVER_ERROR = new HttpResponseStatus(500, "Internal Server Error");
      HttpResponseStatus.NOT_IMPLEMENTED = new HttpResponseStatus(501, "Not Implemented");
      HttpResponseStatus.BAD_GATEWAY = new HttpResponseStatus(502, "Bad Gateway");
      HttpResponseStatus.SERVICE_UNAVAILABLE = new HttpResponseStatus(503, "Service Unavailable");
      HttpResponseStatus.GATEWAY_TIMEOUT = new HttpResponseStatus(504, "Gateway Timeout");
      HttpResponseStatus.HTTP_VERSION_NOT_SUPPORTED = new HttpResponseStatus(505, "HTTP Version Not Supported");
      HttpResponseStatus.VARIANT_ALSO_NEGOTIATES = new HttpResponseStatus(506, "Variant Also Negotiates");
      HttpResponseStatus.INSUFFICIENT_STORAGE = new HttpResponseStatus(507, "Insufficient Storage");
      HttpResponseStatus.NOT_EXTENDED = new HttpResponseStatus(510, "Not Extended");
      HttpResponseStatus.NETWORK_AUTHENTICATION_REQUIRED = new HttpResponseStatus(511, "Network Authentication Required");
      var fromJvmHttpResponseStatus = (jvmStatus) => {
        switch (jvmStatus.code()) {
          case 100:
            return HttpResponseStatus.CONTINUE;
          case 101:
            return HttpResponseStatus.SWITCHING_PROTOCOLS;
          case 102:
            return HttpResponseStatus.PROCESSING;
          case 103:
            return HttpResponseStatus.EARLY_HINTS;
          case 200:
            return HttpResponseStatus.OK;
          case 201:
            return HttpResponseStatus.CREATED;
          case 202:
            return HttpResponseStatus.ACCEPTED;
          case 203:
            return HttpResponseStatus.NON_AUTHORITATIVE_INFORMATION;
          case 204:
            return HttpResponseStatus.NO_CONTENT;
          case 205:
            return HttpResponseStatus.RESET_CONTENT;
          case 206:
            return HttpResponseStatus.PARTIAL_CONTENT;
          case 207:
            return HttpResponseStatus.MULTI_STATUS;
          case 300:
            return HttpResponseStatus.MULTIPLE_CHOICES;
          case 301:
            return HttpResponseStatus.MOVED_PERMANENTLY;
          case 302:
            return HttpResponseStatus.FOUND;
          case 303:
            return HttpResponseStatus.SEE_OTHER;
          case 304:
            return HttpResponseStatus.NOT_MODIFIED;
          case 305:
            return HttpResponseStatus.USE_PROXY;
          case 307:
            return HttpResponseStatus.TEMPORARY_REDIRECT;
          case 308:
            return HttpResponseStatus.PERMANENT_REDIRECT;
          case 400:
            return HttpResponseStatus.BAD_REQUEST;
          case 401:
            return HttpResponseStatus.UNAUTHORIZED;
          case 402:
            return HttpResponseStatus.PAYMENT_REQUIRED;
          case 403:
            return HttpResponseStatus.FORBIDDEN;
          case 404:
            return HttpResponseStatus.NOT_FOUND;
          case 405:
            return HttpResponseStatus.METHOD_NOT_ALLOWED;
          case 406:
            return HttpResponseStatus.NOT_ACCEPTABLE;
          case 407:
            return HttpResponseStatus.PROXY_AUTHENTICATION_REQUIRED;
          case 408:
            return HttpResponseStatus.REQUEST_TIMEOUT;
          case 409:
            return HttpResponseStatus.CONFLICT;
          case 410:
            return HttpResponseStatus.GONE;
          case 411:
            return HttpResponseStatus.LENGTH_REQUIRED;
          case 412:
            return HttpResponseStatus.PRECONDITION_FAILED;
          case 413:
            return HttpResponseStatus.REQUEST_ENTITY_TOO_LARGE;
          case 414:
            return HttpResponseStatus.REQUEST_URI_TOO_LONG;
          case 415:
            return HttpResponseStatus.UNSUPPORTED_MEDIA_TYPE;
          case 416:
            return HttpResponseStatus.REQUESTED_RANGE_NOT_SATISFIABLE;
          case 417:
            return HttpResponseStatus.EXPECTATION_FAILED;
          case 421:
            return HttpResponseStatus.MISDIRECTED_REQUEST;
          case 422:
            return HttpResponseStatus.UNPROCESSABLE_ENTITY;
          case 423:
            return HttpResponseStatus.LOCKED;
          case 424:
            return HttpResponseStatus.FAILED_DEPENDENCY;
          case 425:
            return HttpResponseStatus.UNORDERED_COLLECTION;
          case 426:
            return HttpResponseStatus.UPGRADE_REQUIRED;
          case 428:
            return HttpResponseStatus.PRECONDITION_REQUIRED;
          case 429:
            return HttpResponseStatus.TOO_MANY_REQUESTS;
          case 431:
            return HttpResponseStatus.REQUEST_HEADER_FIELDS_TOO_LARGE;
          case 500:
            return HttpResponseStatus.INTERNAL_SERVER_ERROR;
          case 501:
            return HttpResponseStatus.NOT_IMPLEMENTED;
          case 502:
            return HttpResponseStatus.BAD_GATEWAY;
          case 503:
            return HttpResponseStatus.SERVICE_UNAVAILABLE;
          case 504:
            return HttpResponseStatus.GATEWAY_TIMEOUT;
          case 505:
            return HttpResponseStatus.HTTP_VERSION_NOT_SUPPORTED;
          case 506:
            return HttpResponseStatus.VARIANT_ALSO_NEGOTIATES;
          case 507:
            return HttpResponseStatus.INSUFFICIENT_STORAGE;
          case 510:
            return HttpResponseStatus.NOT_EXTENDED;
          case 511:
            return HttpResponseStatus.NETWORK_AUTHENTICATION_REQUIRED;
        }
        throw Error("This shouldn't happen unless we lag behind the original implementation, call support if this ever happens.");
      };
      exports.fromJvmHttpResponseStatus = fromJvmHttpResponseStatus;
    }
  });

  // ../tmp/http/package/target/response/index.js
  var require_response = __commonJS({
    "../tmp/http/package/target/response/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapResponse = void 0;
      var headers_1 = require_headers();
      var body_1 = require_body3();
      var status_1 = require_status();
      __exportStar(require_body3(), exports);
      __exportStar(require_status(), exports);
      var wrapResponse = (_underlying) => ({
        _underlying,
        body: () => (0, body_1.wrapResponseBody)(_underlying.body()),
        //copy: (
        //  request: Request = wrapRequest(_underlying.request()),
        //  startTimestamp: number = _underlying.startTimestamp(),
        //  endTimestamp: number = _underlying.endTimestamp(),
        //  //status: any /*io.netty.handler.codec.http.HttpResponseStatus*/,
        //  //headers: HttpHeaders,
        //  //body: any /*io.gatling.http.response.ResponseBody*/,
        //  //checksums: any /*scala.collection.immutable.Map*/,
        //  isHttp2: boolean = _underlying.isHttp2()
        //): Response => wrapResponse(_underlying.copy(
        //  request = request._underlying,
        //  startTimestamp = startTimestamp,
        //  endTimestamp = endTimestamp,
        //  isHttp2
        //)),
        headers: () => (0, headers_1.wrapHttpHeaders)(_underlying.headers()),
        isHttp2: () => _underlying.isHttp2(),
        isRedirect: () => _underlying.isRedirect(),
        status: () => (0, status_1.fromJvmHttpResponseStatus)(_underlying.status())
      });
      exports.wrapResponse = wrapResponse;
    }
  });

  // ../tmp/http/package/target/bodyPart.js
  var require_bodyPart = __commonJS({
    "../tmp/http/package/target/bodyPart.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ByteArrayBodyPart = exports.PebbleStringBodyPart = exports.PebbleFileBodyPart = exports.RawFileBodyPart = exports.StringBodyPart = exports.ElFileBodyPart = exports.wrapBodyPart = void 0;
      var core_1 = require_target();
      var jvm_types_1 = require_package();
      var wrapBodyPart = (_underlying) => ({
        _underlying,
        contentType: (contentType) => (0, exports.wrapBodyPart)(typeof contentType === "function" ? _underlying.contentType((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(contentType))) : _underlying.contentType(contentType)),
        charset: (charset) => (0, exports.wrapBodyPart)(_underlying.charset(charset)),
        dispositionType: (dispositionType) => (0, exports.wrapBodyPart)(typeof dispositionType === "function" ? _underlying.dispositionType((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(dispositionType))) : _underlying.dispositionType(dispositionType)),
        fileName: (fileName) => (0, exports.wrapBodyPart)(typeof fileName === "function" ? _underlying.fileName((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(fileName))) : _underlying.fileName(fileName)),
        contentId: (contentId) => (0, exports.wrapBodyPart)(typeof contentId == "function" ? _underlying.contentId((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(contentId))) : _underlying.contentId(contentId)),
        transferEncoding: (transferEncoding) => (0, exports.wrapBodyPart)(_underlying.transferEncoding(transferEncoding)),
        header: (name, value) => (0, exports.wrapBodyPart)(typeof name === "function" ? typeof value === "function" ? _underlying.header((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(name)), (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(value))) : _underlying.header((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(name)), value) : typeof value === "function" ? _underlying.header(name, (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(value))) : _underlying.header(name, value))
      });
      exports.wrapBodyPart = wrapBodyPart;
      var bodyPartImpl = (jvmBodyPart) => (arg0, arg1) => {
        if (arg1 === void 0) {
          if (typeof arg0 === "function") {
            return (0, exports.wrapBodyPart)(jvmBodyPart((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(arg0))));
          } else {
            return (0, exports.wrapBodyPart)(jvmBodyPart(arg0));
          }
        } else {
          if (typeof arg0 === "function") {
            if (typeof arg1 === "function") {
              return (0, exports.wrapBodyPart)(jvmBodyPart((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(arg0)), (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(arg1))));
            } else {
              return (0, exports.wrapBodyPart)(jvmBodyPart((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(arg0)), arg1));
            }
          } else {
            if (typeof arg1 === "function") {
              return (0, exports.wrapBodyPart)(jvmBodyPart(arg0, (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(arg1))));
            } else {
              return (0, exports.wrapBodyPart)(jvmBodyPart(arg0, arg1));
            }
          }
        }
      };
      var ElFileBodyPart = (arg0, arg1) => bodyPartImpl(jvm_types_1.HttpDsl.ElFileBodyPart)(arg0, arg1);
      exports.ElFileBodyPart = ElFileBodyPart;
      var StringBodyPart = (arg0, arg1) => bodyPartImpl(jvm_types_1.HttpDsl.StringBodyPart)(arg0, arg1);
      exports.StringBodyPart = StringBodyPart;
      var RawFileBodyPart = (arg0, arg1) => bodyPartImpl(jvm_types_1.HttpDsl.RawFileBodyPart)(arg0, arg1);
      exports.RawFileBodyPart = RawFileBodyPart;
      var PebbleFileBodyPart = (arg0, arg1) => bodyPartImpl(jvm_types_1.HttpDsl.PebbleFileBodyPart)(arg0, arg1);
      exports.PebbleFileBodyPart = PebbleFileBodyPart;
      var PebbleStringBodyPart = (arg0, arg1) => {
        if (arg1 === void 0) {
          if (typeof arg0 === "function") {
            throw Error(`PebbleStringBodyPart() called with invalid arguments ${arg0}, ${arg1}`);
          } else {
            return (0, exports.wrapBodyPart)(jvm_types_1.HttpDsl.PebbleStringBodyPart(arg0));
          }
        } else {
          if (typeof arg0 === "function") {
            return (0, exports.wrapBodyPart)(jvm_types_1.HttpDsl.PebbleStringBodyPart((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(arg0)), arg1));
          } else {
            return (0, exports.wrapBodyPart)(jvm_types_1.HttpDsl.PebbleStringBodyPart(arg0, arg1));
          }
        }
      };
      exports.PebbleStringBodyPart = PebbleStringBodyPart;
      var ByteArrayBodyPart = (arg0, arg1) => {
        if (typeof arg0 === "function") {
          if (typeof arg1 === "function") {
            return (0, exports.wrapBodyPart)(jvm_types_1.HttpDsl.ByteArrayBodyPart((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(arg0)), (0, core_1.wrapByteArrayCallback)((0, core_1.underlyingSessionTo)(arg1))));
          } else if (typeof arg1 === "string") {
            return (0, exports.wrapBodyPart)(jvm_types_1.HttpDsl.ByteArrayBodyPart((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(arg0)), arg1));
          } else {
            return (0, exports.wrapBodyPart)(jvm_types_1.HttpDsl.ByteArrayBodyPart((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(arg0)), (0, core_1.wrapByteArray)(arg1)));
          }
        } else {
          if (typeof arg1 === "function") {
            return (0, exports.wrapBodyPart)(jvm_types_1.HttpDsl.ByteArrayBodyPart(arg0, (0, core_1.wrapByteArrayCallback)((0, core_1.underlyingSessionTo)(arg1))));
          } else if (typeof arg1 === "string") {
            return (0, exports.wrapBodyPart)(jvm_types_1.HttpDsl.ByteArrayBodyPart(arg0, arg1));
          } else {
            return (0, exports.wrapBodyPart)(jvm_types_1.HttpDsl.ByteArrayBodyPart(arg0, (0, core_1.wrapByteArray)(arg1)));
          }
        }
      };
      exports.ByteArrayBodyPart = ByteArrayBodyPart;
    }
  });

  // ../tmp/http/package/target/checks.js
  var require_checks2 = __commonJS({
    "../tmp/http/package/target/checks.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.status = exports.headerRegex = exports.header = exports.currentLocationRegex = exports.currentLocation = void 0;
      var jvm_types_1 = require_package();
      var core_1 = require_target();
      var currentLocation = () => (0, core_1.wrapCheckBuilderFind)(jvm_types_1.HttpDsl.currentLocation());
      exports.currentLocation = currentLocation;
      var currentLocationRegex = (pattern) => (0, core_1.wrapCheckBuilderCaptureGroup)(typeof pattern === "function" ? jvm_types_1.HttpDsl.currentLocationRegex((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(pattern))) : jvm_types_1.HttpDsl.currentLocationRegex(pattern));
      exports.currentLocationRegex = currentLocationRegex;
      var header = (name) => (0, core_1.wrapCheckBuilderMultipleFind)(typeof name === "function" ? jvm_types_1.HttpDsl.header((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(name))) : jvm_types_1.HttpDsl.header(name));
      exports.header = header;
      var headerRegex = (name, pattern) => (0, core_1.wrapCheckBuilderCaptureGroup)(typeof name === "function" ? typeof pattern === "function" ? jvm_types_1.HttpDsl.headerRegex((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(name)), (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(pattern))) : jvm_types_1.HttpDsl.headerRegex((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(name)), pattern) : typeof pattern === "function" ? jvm_types_1.HttpDsl.headerRegex(name, (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(pattern))) : (
        // FIXME forced to use the charsequence version
        jvm_types_1.HttpDsl.headerRegex(name, pattern)
      ));
      exports.headerRegex = headerRegex;
      var status = () => (0, core_1.wrapCheckBuilderFind)(jvm_types_1.HttpDsl.status());
      exports.status = status;
    }
  });

  // ../tmp/http/package/target/cookies.js
  var require_cookies = __commonJS({
    "../tmp/http/package/target/cookies.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CookieKey = exports.Cookie = exports.flushHttpCache = exports.flushCookieJar = exports.flushSessionCookies = exports.getCookieValue = exports.addCookie = void 0;
      var core_1 = require_target();
      var jvm_types_1 = require_package();
      var wrapAddCookie = (_underlying) => ({
        _underlying,
        withDomain: (domain) => wrapAddCookie(_underlying.withDomain(domain)),
        withPath: (path) => wrapAddCookie(_underlying.withPath(path)),
        withMaxAge: (maxAge) => wrapAddCookie(_underlying.withMaxAge(maxAge)),
        withSecure: (secure) => wrapAddCookie(_underlying.withSecure(secure))
      });
      var wrapGetCookie = (_underlying) => ({
        _underlying,
        withDomain: (domain) => wrapGetCookie(typeof domain === "function" ? _underlying.withDomain((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(domain))) : _underlying.withPath(domain)),
        withPath: (path) => wrapGetCookie(_underlying.withPath(path)),
        withSecure: (secure) => wrapGetCookie(_underlying.withSecure(secure)),
        saveAs: (saveAs) => wrapGetCookie(_underlying.saveAs(saveAs))
      });
      var addCookie = (cookie) => (0, core_1.wrapActionBuilder)(jvm_types_1.HttpDsl.addCookie(cookie._underlying));
      exports.addCookie = addCookie;
      var getCookieValue = (cookie) => (0, core_1.wrapActionBuilder)(jvm_types_1.HttpDsl.getCookieValue(cookie._underlying));
      exports.getCookieValue = getCookieValue;
      var flushSessionCookies = () => (0, core_1.wrapActionBuilder)(jvm_types_1.HttpDsl.flushSessionCookies());
      exports.flushSessionCookies = flushSessionCookies;
      var flushCookieJar = () => (0, core_1.wrapActionBuilder)(jvm_types_1.HttpDsl.flushCookieJar());
      exports.flushCookieJar = flushCookieJar;
      var flushHttpCache = () => (0, core_1.wrapActionBuilder)(jvm_types_1.HttpDsl.flushHttpCache());
      exports.flushHttpCache = flushHttpCache;
      var Cookie = (name, value) => wrapAddCookie(typeof name === "function" ? typeof value === "function" ? jvm_types_1.HttpDsl.Cookie((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(name)), (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(value))) : jvm_types_1.HttpDsl.Cookie((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(name)), value) : typeof value === "function" ? jvm_types_1.HttpDsl.Cookie(name, (0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(value))) : jvm_types_1.HttpDsl.Cookie(name, value));
      exports.Cookie = Cookie;
      var CookieKey = (name) => wrapGetCookie(typeof name === "function" ? jvm_types_1.HttpDsl.CookieKey((0, core_1.wrapCallback)((0, core_1.underlyingSessionTo)(name))) : jvm_types_1.HttpDsl.CookieKey(name));
      exports.CookieKey = CookieKey;
    }
  });

  // ../tmp/http/package/target/feeders.js
  var require_feeders2 = __commonJS({
    "../tmp/http/package/target/feeders.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.sitemap = void 0;
      var jvm_types_1 = require_package();
      var core_1 = require_target();
      var sitemap = (filePath) => (0, core_1.wrapFileBasedFeederBuilder)(jvm_types_1.HttpDsl.sitemap(filePath));
      exports.sitemap = sitemap;
    }
  });

  // ../tmp/http/package/target/method.js
  var require_method = __commonJS({
    "../tmp/http/package/target/method.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../tmp/http/package/target/polling.js
  var require_polling = __commonJS({
    "../tmp/http/package/target/polling.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.poll = void 0;
      var jvm_types_1 = require_package();
      var core_1 = require_target();
      var poll = () => wrapPolling(jvm_types_1.HttpDsl.poll());
      exports.poll = poll;
      var wrapPolling = (_underlying) => ({
        pollerName: (pollerName) => wrapPolling(_underlying.pollerName(pollerName)),
        every: (period) => wrapPollingEvery(_underlying.every((0, core_1.toJvmDuration)(period))),
        stop: () => (0, core_1.wrapActionBuilder)(_underlying.stop())
      });
      var wrapPollingEvery = (_underlying) => ({
        exec: (requestBuilder) => (0, core_1.wrapActionBuilder)(_underlying.exec(requestBuilder._underlying))
      });
    }
  });

  // ../tmp/http/package/target/proxy.js
  var require_proxy = __commonJS({
    "../tmp/http/package/target/proxy.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Proxy = void 0;
      var jvm_types_1 = require_package();
      var wrapProxy = (_underlying) => ({
        _underlying,
        http: () => wrapProxy(_underlying.http()),
        https: () => wrapProxy(_underlying.https()),
        socks4: () => wrapProxy(_underlying.socks4()),
        socks5: () => wrapProxy(_underlying.socks5()),
        credentials: (username, password) => wrapProxy(_underlying.credentials(username, password))
      });
      var Proxy2 = (host, port) => wrapProxy(jvm_types_1.HttpDsl.Proxy(host, port));
      exports.Proxy = Proxy2;
    }
  });

  // ../tmp/http/package/target/index.js
  var require_target2 = __commonJS({
    "../tmp/http/package/target/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.http = exports.underlyingResponseTransform = exports.underlyingRequestTransform = void 0;
      var core_1 = require_target();
      var core_2 = require_target();
      var jvm_types_1 = require_package();
      var protocol_1 = require_protocol2();
      var request_1 = require_request2();
      var response_1 = require_response();
      __exportStar(require_bodyPart(), exports);
      __exportStar(require_checks2(), exports);
      __exportStar(require_cookies(), exports);
      __exportStar(require_feeders2(), exports);
      __exportStar(require_headers(), exports);
      __exportStar(require_method(), exports);
      __exportStar(require_polling(), exports);
      __exportStar(require_protocol2(), exports);
      __exportStar(require_proxy(), exports);
      __exportStar(require_request2(), exports);
      __exportStar(require_response(), exports);
      var underlyingRequestTransform = (f) => (jvmRequest, jvmSession) => f((0, request_1.wrapRequest)(jvmRequest), (0, core_1.wrapSession)(jvmSession))._underlying;
      exports.underlyingRequestTransform = underlyingRequestTransform;
      var underlyingResponseTransform = (f) => (jvmResponse, jvmSession) => f((0, response_1.wrapResponse)(jvmResponse), (0, core_1.wrapSession)(jvmSession))._underlying;
      exports.underlyingResponseTransform = underlyingResponseTransform;
      var httpProtocolBuilder = (0, protocol_1.wrapHttpProtocolBuilder)(
        // HttpDsl.http doesn't get properly generated by java2ts because of conflicts with methods of the same name
        Java.type("io.gatling.javaapi.http.HttpDsl").http
      );
      var wrapHttp = (jvmHttp) => ({
        get: (url) => (0, request_1.wrapHttpRequestActionBuilder)(typeof url === "function" ? jvmHttp.get((0, core_1.wrapCallback)((0, core_2.underlyingSessionTo)(url))) : jvmHttp.get(url)),
        put: (url) => (0, request_1.wrapHttpRequestActionBuilder)(typeof url === "function" ? jvmHttp.put((0, core_1.wrapCallback)((0, core_2.underlyingSessionTo)(url))) : jvmHttp.put(url)),
        post: (url) => (0, request_1.wrapHttpRequestActionBuilder)(typeof url === "function" ? jvmHttp.post((0, core_1.wrapCallback)((0, core_2.underlyingSessionTo)(url))) : jvmHttp.post(url)),
        patch: (url) => (0, request_1.wrapHttpRequestActionBuilder)(typeof url === "function" ? jvmHttp.patch((0, core_1.wrapCallback)((0, core_2.underlyingSessionTo)(url))) : jvmHttp.patch(url)),
        head: (url) => (0, request_1.wrapHttpRequestActionBuilder)(typeof url === "function" ? jvmHttp.head((0, core_1.wrapCallback)((0, core_2.underlyingSessionTo)(url))) : jvmHttp.head(url)),
        delete: (url) => (0, request_1.wrapHttpRequestActionBuilder)(typeof url === "function" ? jvmHttp.delete((0, core_1.wrapCallback)((0, core_2.underlyingSessionTo)(url))) : jvmHttp.delete(url)),
        options: (url) => (0, request_1.wrapHttpRequestActionBuilder)(typeof url === "function" ? jvmHttp.options((0, core_1.wrapCallback)((0, core_2.underlyingSessionTo)(url))) : jvmHttp.options(url)),
        httpRequest: (method, url) => (0, request_1.wrapHttpRequestActionBuilder)(typeof url === "function" ? jvmHttp.httpRequest(method, (0, core_1.wrapCallback)((0, core_2.underlyingSessionTo)(url))) : jvmHttp.httpRequest(method, url))
      });
      var httpApply = (name) => {
        const jvmHttp = typeof name === "string" ? jvm_types_1.HttpDsl.http(name) : jvm_types_1.HttpDsl.http((0, core_1.wrapCallback)((0, core_2.underlyingSessionTo)(name)));
        return wrapHttp(jvmHttp);
      };
      exports.http = Object.assign(httpApply, httpProtocolBuilder);
    }
  });

  // <stdin>
  var stdin_exports = {};
  __export(stdin_exports, {
    "basic-simulation-gzip": () => basic_simulation_gzip_gatling_default,
    "basic-simulation-uncompressed": () => basic_simulation_uncompressed_gatling_default,
    "callbacks-simulation-gzip": () => callbacks_simulation_gzip_gatling_default,
    "callbacks-simulation-uncompressed": () => callbacks_simulation_uncompressed_gatling_default,
    "test-simulation": () => test_simulation_gatling_default
  });

  // src/basic-simulation-gzip.gatling.ts
  var import_core = __toESM(require_target(), 1);
  var import_http = __toESM(require_target2(), 1);
  var basic_simulation_gzip_gatling_default = (0, import_core.simulation)((setUp) => {
    const baseUrl = "http://172.31.15.11:8000";
    const usersCount = 1e3;
    const requestsCount = 2e4;
    const httpProtocol = import_http.http.baseUrl(baseUrl).acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8").acceptLanguageHeader("en-US,en;q=0.5").acceptEncodingHeader("gzip, deflate").userAgentHeader(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0"
    );
    const users = (0, import_core.scenario)("Users").repeat(requestsCount).on(
      (0, import_http.http)("root").get("/json/1k.json")
    );
    setUp(
      users.injectOpen((0, import_core.atOnceUsers)(usersCount))
    ).protocols(httpProtocol);
  });

  // src/basic-simulation-uncompressed.gatling.ts
  var import_core2 = __toESM(require_target(), 1);
  var import_http2 = __toESM(require_target2(), 1);
  var basic_simulation_uncompressed_gatling_default = (0, import_core2.simulation)((setUp) => {
    const baseUrl = "http://172.31.15.11:8000";
    const usersCount = 1e3;
    const requestsCount = 2e4;
    const httpProtocol = import_http2.http.baseUrl(baseUrl).acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8").acceptLanguageHeader("en-US,en;q=0.5").userAgentHeader(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0"
    );
    const users = (0, import_core2.scenario)("Users").repeat(requestsCount).on(
      (0, import_http2.http)("root").get("/json/1k.json")
    );
    setUp(
      users.injectOpen((0, import_core2.atOnceUsers)(usersCount))
    ).protocols(httpProtocol);
  });

  // src/callbacks-simulation-gzip.gatling.ts
  var import_core3 = __toESM(require_target(), 1);
  var import_http3 = __toESM(require_target2(), 1);
  var callbacks_simulation_gzip_gatling_default = (0, import_core3.simulation)((setUp) => {
    const baseUrl = "http://172.31.15.11:8000";
    const usersCount = 1e3;
    const requestsCount = 2e4;
    const httpProtocol = import_http3.http.baseUrl(baseUrl).acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8").acceptLanguageHeader("en-US,en;q=0.5").acceptEncodingHeader("gzip, deflate").userAgentHeader(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0"
    );
    const users = (0, import_core3.scenario)("Users").repeat(requestsCount).on(
      (0, import_core3.exec)((session) => session.set("url", "/json/1k.json")),
      (0, import_http3.http)("root").get("#{url}")
    );
    setUp(
      users.injectOpen((0, import_core3.atOnceUsers)(usersCount))
    ).protocols(httpProtocol);
  });

  // src/callbacks-simulation-uncompressed.gatling.ts
  var import_core4 = __toESM(require_target(), 1);
  var import_http4 = __toESM(require_target2(), 1);
  var callbacks_simulation_uncompressed_gatling_default = (0, import_core4.simulation)((setUp) => {
    const baseUrl = "http://172.31.15.11:8000";
    const usersCount = 1e3;
    const requestsCount = 2e4;
    const httpProtocol = import_http4.http.baseUrl(baseUrl).acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8").acceptLanguageHeader("en-US,en;q=0.5").userAgentHeader(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/119.0"
    );
    const users = (0, import_core4.scenario)("Users").repeat(requestsCount).on(
      (0, import_core4.exec)((session) => session.set("url", "/json/1k.json")),
      (0, import_http4.http)("root").get("#{url}")
    );
    setUp(
      users.injectOpen((0, import_core4.atOnceUsers)(usersCount))
    ).protocols(httpProtocol);
  });

  // src/test-simulation.gatling.ts
  var import_core5 = __toESM(require_target(), 1);
  var import_http5 = __toESM(require_target2(), 1);
  var test_simulation_gatling_default = (0, import_core5.simulation)((setUp) => {
    const baseHttpProtocol = import_http5.http.baseUrl("https://computer-database.gatling.io");
    const searchFeeder = (0, import_core5.arrayFeeder)([
      { searchCriterion: "Macbook", searchComputerName: "MacBook Pro" },
      { searchCriterion: "eee", searchComputerName: "ASUS Eee PC 1005PE" }
    ]).random();
    const createFeeder = (0, import_core5.jsonFile)("computers/create.json").circular();
    const scn = (0, import_core5.scenario)("My scenario").feed(searchFeeder).feed(createFeeder).exec(
      (0, import_core5.group)("Browse").on(
        (0, import_core5.exec)((session) => session.set("page", 1)),
        (0, import_core5.doWhile)((session) => session.get("page") < 3).on(
          (0, import_http5.http)("Browse page #{page}").get("/computers?p=#{page}"),
          (0, import_core5.exec)((session) => session.set("page", session.get("page") + 1)),
          (0, import_core5.pause)({ amount: 500, unit: "milliseconds" })
        )
      ),
      (0, import_core5.group)("Search").on(
        (0, import_http5.http)("Search").get("/computers?f=#{searchCriterion}").check(
          (0, import_core5.css)("a:contains('#{searchComputerName}')", "href").saveAs("computerUrl")
        ),
        (0, import_http5.http)("Select").get("#{computerUrl}")
      ),
      (0, import_core5.group)("Create").on(
        (0, import_http5.http)("Get form").get("/computers/new"),
        (0, import_core5.pause)(1),
        (0, import_core5.exec)((session) => {
          const name = session.get("name");
          const introduced = session.get("introduced");
          const discontinued = session.get("discontinued");
          const company = session.get("company");
          console.log(
            `Create computer (name='${name}', introduced='${introduced}', discontinued='${discontinued}', company='${company}')`
          );
          return session;
        }),
        (0, import_http5.http)("Post form").post("/computers").formParam("name", "Beautiful Computer").formParam("introduced", "2012-05-30").formParam("discontinued", "").formParam("company", "37")
      )
    );
    setUp(
      scn.injectOpen(
        (0, import_core5.atOnceUsers)(10),
        (0, import_core5.nothingFor)({ amount: 5, unit: "seconds" }),
        (0, import_core5.constantUsersPerSec)(2).during(30)
      )
    ).protocols(baseHttpProtocol).assertions(
      (0, import_core5.global)().responseTime().percentile(95).lte(500)
    );
  });
  return __toCommonJS(stdin_exports);
})();
//# sourceMappingURL=bundle.js.map
