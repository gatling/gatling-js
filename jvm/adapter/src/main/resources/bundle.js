"use strict";
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

  // ../tmp/js-dsl/package/target/gatlingJvm/coreDsl.js
  var require_coreDsl = __commonJS({
    "../tmp/js-dsl/package/target/gatlingJvm/coreDsl.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.CoreDsl = void 0;
      exports.CoreDsl = Java.type("io.gatling.javaapi.core.CoreDsl");
    }
  });

  // ../tmp/js-dsl/package/target/gatlingJvm/callbacks.js
  var require_callbacks = __commonJS({
    "../tmp/js-dsl/package/target/gatlingJvm/callbacks.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.wrapCallback = void 0;
      var CallbackWrapper = Java.type("io.gatling.js.callbacks.CallbackWrapper");
      var wrapCallback = (f) => {
        return CallbackWrapper.wrap(f);
      };
      exports.wrapCallback = wrapCallback;
    }
  });

  // ../tmp/js-dsl/package/target/core/index.js
  var require_core = __commonJS({
    "../tmp/js-dsl/package/target/core/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.exec = exports.scenario = exports.underlyingExec = exports.underlyingSessionToString = exports.underlyingSessionTransform = exports.constantUsersPerSec = exports.atOnceUsers = void 0;
      var jvm = __importStar(require_coreDsl());
      var callbacks_1 = require_callbacks();
      var wrapOpenInjectionStep = (jvmOpenInjectionStep) => ({
        _underlying: jvmOpenInjectionStep
      });
      var wrapConstantRateOpenInjectionStep = (jvmOpenInjectionStep) => ({
        _underlying: jvmOpenInjectionStep,
        randomized: () => wrapOpenInjectionStep(jvmOpenInjectionStep.randomized())
      });
      var atOnceUsers = (users) => wrapOpenInjectionStep(jvm.CoreDsl.atOnceUsers(users));
      exports.atOnceUsers = atOnceUsers;
      var constantUsersPerSec = (rate) => {
        const jvmOpenInjectionStepConstantRate = jvm.CoreDsl.constantUsersPerSec(rate);
        return {
          during: (durationSeconds) => wrapConstantRateOpenInjectionStep(jvmOpenInjectionStepConstantRate.during(durationSeconds))
        };
      };
      exports.constantUsersPerSec = constantUsersPerSec;
      var wrapSession = (_underlying) => ({
        _underlying,
        get: (key) => _underlying.get(key),
        set: (key, value) => wrapSession(_underlying.set(key, value))
      });
      var underlyingSessionTransform = (f) => (jvmSession) => f(wrapSession(jvmSession))._underlying;
      exports.underlyingSessionTransform = underlyingSessionTransform;
      var underlyingSessionToString = (f) => (jvmSession) => f(wrapSession(jvmSession));
      exports.underlyingSessionToString = underlyingSessionToString;
      var underlyingExec = (exec2) => typeof exec2 === "function" ? (0, callbacks_1.wrapCallback)((0, exports.underlyingSessionTransform)(exec2)) : Array.isArray(exec2) ? exec2.map((e) => e._underlying) : exec2._underlying;
      exports.underlyingExec = underlyingExec;
      var wrapChainBuilder = (_underlying) => ({
        _underlying,
        exec: (exec2) => {
          return wrapChainBuilder(_underlying.exec((0, exports.underlyingExec)(exec2)));
        }
      });
      var wrapPopulationBuilder = (_underlying) => ({
        _underlying,
        andThen: (children) => wrapPopulationBuilder(_underlying.andThen(children.map((c) => c._underlying)))
      });
      var wrapOn = (jvmOn, wrap) => ({
        on: (chain) => wrap(jvmOn.on(chain._underlying))
      });
      var wrapScenarioBuilder = (jvmScenarioBuilder) => ({
        injectOpen: (steps) => wrapPopulationBuilder(jvmScenarioBuilder.injectOpen(steps.map((s) => s._underlying))),
        during: (duration) => wrapOn(jvmScenarioBuilder.during(duration), wrapScenarioBuilder),
        exec: (exec2) => wrapScenarioBuilder(jvmScenarioBuilder.exec((0, exports.underlyingExec)(exec2))),
        repeat: (times) => wrapOn(jvmScenarioBuilder.repeat(times), wrapScenarioBuilder)
      });
      var scenario = (name) => {
        const jvmScenarioBuilder = jvm.CoreDsl.scenario(name);
        return wrapScenarioBuilder(jvmScenarioBuilder);
      };
      exports.scenario = scenario;
      var exec = (exec2) => wrapChainBuilder(jvm.CoreDsl.exec((0, exports.underlyingExec)(exec2)));
      exports.exec = exec;
    }
  });

  // ../tmp/js-dsl/package/target/gatlingJvm/httpDsl.js
  var require_httpDsl = __commonJS({
    "../tmp/js-dsl/package/target/gatlingJvm/httpDsl.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.HttpDsl = exports.HttpDslProtocolBuilder = void 0;
      var HttpDslProtocolBuilder = () => Java.type("io.gatling.javaapi.http.HttpDsl").http;
      exports.HttpDslProtocolBuilder = HttpDslProtocolBuilder;
      exports.HttpDsl = Java.type("io.gatling.javaapi.http.HttpDsl");
    }
  });

  // ../tmp/js-dsl/package/target/http/index.js
  var require_http = __commonJS({
    "../tmp/js-dsl/package/target/http/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.http = exports.httpProtocol = void 0;
      var jvm = __importStar(require_httpDsl());
      var core2 = __importStar(require_core());
      var wrapHttpProtocolBuilder = (_underlying) => ({
        _underlying,
        baseUrl: (url) => wrapHttpProtocolBuilder(_underlying.baseUrl(url))
      });
      var httpProtocol = () => wrapHttpProtocolBuilder(jvm.HttpDslProtocolBuilder());
      exports.httpProtocol = httpProtocol;
      var wrapHttpRequestActionBuilder = (_underlying) => ({
        _underlying
      });
      var wrapHttp = (jvmHttp) => ({
        get: (url) => {
          const jvmHttpRequestActionBuilder = typeof url === "string" ? jvmHttp.get(url) : jvmHttp.get(core2.underlyingSessionToString(url));
          return wrapHttpRequestActionBuilder(jvmHttpRequestActionBuilder);
        }
      });
      var http2 = (name) => {
        const jvmHttp = typeof name === "string" ? jvm.HttpDsl.http(name) : jvm.HttpDsl.http(core2.underlyingSessionToString(name));
        return wrapHttp(jvmHttp);
      };
      exports.http = http2;
    }
  });

  // ../tmp/js-dsl/package/target/index.js
  var require_target = __commonJS({
    "../tmp/js-dsl/package/target/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.runSimulation = exports.http = exports.core = void 0;
      exports.core = __importStar(require_core());
      exports.http = __importStar(require_http());
      var wrapSetUp = (jvmSetUp) => ({
        protocols: (protocols) => wrapSetUp(jvmSetUp.protocols(protocols.map((p) => p._underlying)))
      });
      var runSimulation2 = (simulation) => (jvmSetUp) => {
        simulation((populationBuilders) => wrapSetUp(jvmSetUp(populationBuilders.map((p) => p._underlying))));
      };
      exports.runSimulation = runSimulation2;
    }
  });

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    mySimulation: () => mySimulation
  });
  var import_gatling_js = __toESM(require_target(), 1);
  var mySimulation = (0, import_gatling_js.runSimulation)((setUp) => {
    const baseHttpProtocol = import_gatling_js.http.httpProtocol().baseUrl("https://172.31.15.11:8001");
    const warmUp = import_gatling_js.core.scenario("benchmark-app-netty: warm up").during(60).on(import_gatling_js.core.exec(import_gatling_js.http.http("json 1K").get("/json/1k.json")));
    const scn = import_gatling_js.core.scenario("benchmark-app-netty").repeat(5e4).on(
      import_gatling_js.core.exec((session) => session).exec(import_gatling_js.http.http("json 1K").get("/json/1k.json"))
    );
    setUp([warmUp.injectOpen([import_gatling_js.core.atOnceUsers(1e3)]).andThen([scn.injectOpen([import_gatling_js.core.atOnceUsers(1e3)])])]).protocols([
      baseHttpProtocol
    ]);
  });
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=bundle.js.map
