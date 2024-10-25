/*
 * Project: java2typescript - https://github.com/bsorrentino/java2typescript
 *
 * Author: bsorrentino
 *
 * TYPESCRIPT EXPORTED DECLARATIONS
 *
 */
/// <reference path="gatling.d.ts" preserve="true" />

interface ActionBuilderStatic {
  readonly class: any;
}

export const ActionBuilder: ActionBuilderStatic = Java.type("io.gatling.javaapi.core.ActionBuilder");

interface AddCookieStatic {
  readonly class: any;
}

export const AddCookie: AddCookieStatic = Java.type("io.gatling.javaapi.http.AddCookie");

interface AsLongAs$OnStatic {
  readonly class: any;
}

export const AsLongAs$On: AsLongAs$OnStatic = Java.type("io.gatling.javaapi.core.loop.AsLongAs$On");

interface AsLongAsDuring$OnStatic {
  readonly class: any;
}

export const AsLongAsDuring$On: AsLongAsDuring$OnStatic = Java.type("io.gatling.javaapi.core.loop.AsLongAsDuring$On");

interface AsLongAsDuringStatic {
  readonly class: any;
}

export const AsLongAsDuring: AsLongAsDuringStatic = Java.type("io.gatling.javaapi.core.loop.AsLongAsDuring");

interface AsLongAsStatic {
  readonly class: any;
}

export const AsLongAs: AsLongAsStatic = Java.type("io.gatling.javaapi.core.loop.AsLongAs");

interface Assertion$WithPathAndCountMetricStatic {
  readonly class: any;
}

export const Assertion$WithPathAndCountMetric: Assertion$WithPathAndCountMetricStatic = Java.type(
  "io.gatling.javaapi.core.Assertion$WithPathAndCountMetric"
);

interface Assertion$WithPathAndTargetStatic {
  readonly class: any;
}

export const Assertion$WithPathAndTarget: Assertion$WithPathAndTargetStatic = Java.type(
  "io.gatling.javaapi.core.Assertion$WithPathAndTarget"
);

interface Assertion$WithPathAndTimeMetricStatic {
  readonly class: any;
}

export const Assertion$WithPathAndTimeMetric: Assertion$WithPathAndTimeMetricStatic = Java.type(
  "io.gatling.javaapi.core.Assertion$WithPathAndTimeMetric"
);

interface Assertion$WithPathStatic {
  readonly class: any;
}

export const Assertion$WithPath: Assertion$WithPathStatic = Java.type("io.gatling.javaapi.core.Assertion$WithPath");

interface AssertionStatic {
  readonly class: any;
}

export const Assertion: AssertionStatic = Java.type("io.gatling.javaapi.core.Assertion");

interface Body$WithBytesStatic {
  readonly class: any;
  new (arg0: any /*io.gatling.core.body.BodyWithBytesExpression*/): io.gatling.javaapi.core.Body$WithBytes;
}

export const Body$WithBytes: Body$WithBytesStatic = Java.type("io.gatling.javaapi.core.Body$WithBytes");

interface Body$WithStringStatic {
  readonly class: any;
  new (arg0: any /*io.gatling.core.body.BodyWithStringExpression*/): io.gatling.javaapi.core.Body$WithString;
}

export const Body$WithString: Body$WithStringStatic = Java.type("io.gatling.javaapi.core.Body$WithString");

interface BodyPartStatic {
  readonly class: any;
}

export const BodyPart: BodyPartStatic = Java.type("io.gatling.javaapi.http.BodyPart");

interface BodyStatic {
  readonly class: any;
}

export const Body: BodyStatic = Java.type("io.gatling.javaapi.core.Body");

interface ChainBuilderStatic {
  readonly class: any;
}

export const ChainBuilder: ChainBuilderStatic = Java.type("io.gatling.javaapi.core.ChainBuilder");

interface CheckBuilder$CaptureGroupCheckBuilderStatic {
  readonly class: any;
}

export const CheckBuilder$CaptureGroupCheckBuilder: CheckBuilder$CaptureGroupCheckBuilderStatic = Java.type(
  "io.gatling.javaapi.core.CheckBuilder$CaptureGroupCheckBuilder"
);

interface CheckBuilder$FinalStatic {
  readonly class: any;
}

export const CheckBuilder$Final: CheckBuilder$FinalStatic = Java.type("io.gatling.javaapi.core.CheckBuilder$Final");

interface CheckBuilder$FindStatic {
  readonly class: any;
}

export const CheckBuilder$Find: CheckBuilder$FindStatic = Java.type("io.gatling.javaapi.core.CheckBuilder$Find");

interface CheckBuilder$JsonOfTypeFindStatic {
  readonly class: any;
}

export const CheckBuilder$JsonOfTypeFind: CheckBuilder$JsonOfTypeFindStatic = Java.type(
  "io.gatling.javaapi.core.CheckBuilder$JsonOfTypeFind"
);

interface CheckBuilder$JsonOfTypeMultipleFindStatic {
  readonly class: any;
}

export const CheckBuilder$JsonOfTypeMultipleFind: CheckBuilder$JsonOfTypeMultipleFindStatic = Java.type(
  "io.gatling.javaapi.core.CheckBuilder$JsonOfTypeMultipleFind"
);

interface CheckBuilder$MultipleFindStatic {
  readonly class: any;
}

export const CheckBuilder$MultipleFind: CheckBuilder$MultipleFindStatic = Java.type(
  "io.gatling.javaapi.core.CheckBuilder$MultipleFind"
);

interface CheckBuilder$ValidateStatic {
  readonly class: any;
}

export const CheckBuilder$Validate: CheckBuilder$ValidateStatic = Java.type(
  "io.gatling.javaapi.core.CheckBuilder$Validate"
);

interface CheckBuilderStatic {
  readonly class: any;
}

export const CheckBuilder: CheckBuilderStatic = Java.type("io.gatling.javaapi.core.CheckBuilder");

interface Choice$WithKeyStatic {
  readonly class: any;
}

export const Choice$WithKey: Choice$WithKeyStatic = Java.type("io.gatling.javaapi.core.Choice$WithKey");

interface Choice$WithWeightStatic {
  readonly class: any;
  new (arg0: double, arg1: io.gatling.javaapi.core.ChainBuilder): io.gatling.javaapi.core.Choice$WithWeight;
}

export const Choice$WithWeight: Choice$WithWeightStatic = Java.type("io.gatling.javaapi.core.Choice$WithWeight");

interface ChoiceStatic {
  readonly class: any;
}

export const Choice: ChoiceStatic = Java.type("io.gatling.javaapi.core.Choice");

interface ChronoUnitStatic {
  NANOS: java.time.temporal.ChronoUnit;
  MICROS: java.time.temporal.ChronoUnit;
  MILLIS: java.time.temporal.ChronoUnit;
  SECONDS: java.time.temporal.ChronoUnit;
  MINUTES: java.time.temporal.ChronoUnit;
  HOURS: java.time.temporal.ChronoUnit;
  HALF_DAYS: java.time.temporal.ChronoUnit;
  DAYS: java.time.temporal.ChronoUnit;
  WEEKS: java.time.temporal.ChronoUnit;
  MONTHS: java.time.temporal.ChronoUnit;
  YEARS: java.time.temporal.ChronoUnit;
  DECADES: java.time.temporal.ChronoUnit;
  CENTURIES: java.time.temporal.ChronoUnit;
  MILLENNIA: java.time.temporal.ChronoUnit;
  ERAS: java.time.temporal.ChronoUnit;
  FOREVER: java.time.temporal.ChronoUnit;

  readonly class: any;
  valueOf<T>(arg0: java.lang.Class<T>, arg1: string): T;
  valueOf(arg0: string): java.time.temporal.ChronoUnit;
  values(): [java.time.temporal.ChronoUnit];
}

export const ChronoUnit: ChronoUnitStatic = Java.type("java.time.temporal.ChronoUnit");

interface ClosedInjectionStep$CompositeStatic {
  readonly class: any;
}

export const ClosedInjectionStep$Composite: ClosedInjectionStep$CompositeStatic = Java.type(
  "io.gatling.javaapi.core.ClosedInjectionStep$Composite"
);

interface ClosedInjectionStep$ConstantStatic {
  readonly class: any;
}

export const ClosedInjectionStep$Constant: ClosedInjectionStep$ConstantStatic = Java.type(
  "io.gatling.javaapi.core.ClosedInjectionStep$Constant"
);

interface ClosedInjectionStep$RampStatic {
  readonly class: any;
  new (arg0: int): io.gatling.javaapi.core.ClosedInjectionStep$Ramp;
}

export const ClosedInjectionStep$Ramp: ClosedInjectionStep$RampStatic = Java.type(
  "io.gatling.javaapi.core.ClosedInjectionStep$Ramp"
);

interface ClosedInjectionStep$RampToStatic {
  readonly class: any;
  new (arg0: int, arg1: int): io.gatling.javaapi.core.ClosedInjectionStep$RampTo;
}

export const ClosedInjectionStep$RampTo: ClosedInjectionStep$RampToStatic = Java.type(
  "io.gatling.javaapi.core.ClosedInjectionStep$RampTo"
);

interface ClosedInjectionStep$StairsStatic {
  readonly class: any;
}

export const ClosedInjectionStep$Stairs: ClosedInjectionStep$StairsStatic = Java.type(
  "io.gatling.javaapi.core.ClosedInjectionStep$Stairs"
);

interface ClosedInjectionStep$StairsWithTimeStatic {
  readonly class: any;
  new (arg0: int, arg1: int): io.gatling.javaapi.core.ClosedInjectionStep$StairsWithTime;
}

export const ClosedInjectionStep$StairsWithTime: ClosedInjectionStep$StairsWithTimeStatic = Java.type(
  "io.gatling.javaapi.core.ClosedInjectionStep$StairsWithTime"
);

interface ClosedInjectionStepStatic {
  readonly class: any;
}

export const ClosedInjectionStep: ClosedInjectionStepStatic = Java.type("io.gatling.javaapi.core.ClosedInjectionStep");

interface CollectorsStatic {
  readonly class: any;
  collectingAndThen<RR, R>(
    arg0: any /*java.util.stream.Collector*/,
    arg1: Func<R, RR>
  ): any /*java.util.stream.Collector*/;
  filtering<T>(arg0: Predicate<T>, arg1: any /*java.util.stream.Collector*/): any /*java.util.stream.Collector*/;
  toCollection<C>(arg0: Supplier<C>): any /*java.util.stream.Collector*/;
  partitioningBy<T>(arg0: Predicate<T>, arg1: any /*java.util.stream.Collector*/): any /*java.util.stream.Collector*/;
  groupingByConcurrent<K, T, M>(
    arg0: Func<T, K>,
    arg1: Supplier<M>,
    arg2: any /*java.util.stream.Collector*/
  ): any /*java.util.stream.Collector*/;
  groupingBy<K, T>(arg0: Func<T, K>, arg1: any /*java.util.stream.Collector*/): any /*java.util.stream.Collector*/;
  groupingByConcurrent<K, T>(
    arg0: Func<T, K>,
    arg1: any /*java.util.stream.Collector*/
  ): any /*java.util.stream.Collector*/;
  groupingBy<K, T, M>(
    arg0: Func<T, K>,
    arg1: Supplier<M>,
    arg2: any /*java.util.stream.Collector*/
  ): any /*java.util.stream.Collector*/;
  toMap<K, T, U, M>(
    arg0: Func<T, K>,
    arg1: Func<T, U>,
    arg2: BinaryOperator<U>,
    arg3: Supplier<M>
  ): any /*java.util.stream.Collector*/;
  toConcurrentMap<K, T, U, M>(
    arg0: Func<T, K>,
    arg1: Func<T, U>,
    arg2: BinaryOperator<U>,
    arg3: Supplier<M>
  ): any /*java.util.stream.Collector*/;
  toMap<K, T, U>(arg0: Func<T, K>, arg1: Func<T, U>): any /*java.util.stream.Collector*/;
  toMap<K, T, U>(arg0: Func<T, K>, arg1: Func<T, U>, arg2: BinaryOperator<U>): any /*java.util.stream.Collector*/;
  toUnmodifiableMap<K, T, U>(arg0: Func<T, K>, arg1: Func<T, U>): any /*java.util.stream.Collector*/;
  toUnmodifiableMap<K, T, U>(
    arg0: Func<T, K>,
    arg1: Func<T, U>,
    arg2: BinaryOperator<U>
  ): any /*java.util.stream.Collector*/;
  toConcurrentMap<K, T, U>(arg0: Func<T, K>, arg1: Func<T, U>): any /*java.util.stream.Collector*/;
  toConcurrentMap<K, T, U>(
    arg0: Func<T, K>,
    arg1: Func<T, U>,
    arg2: BinaryOperator<U>
  ): any /*java.util.stream.Collector*/;
  groupingBy<K, T>(arg0: Func<T, K>): any /*java.util.stream.Collector*/;
  groupingByConcurrent<K, T>(arg0: Func<T, K>): any /*java.util.stream.Collector*/;
  teeing<R2, R, R1>(
    arg0: any /*java.util.stream.Collector*/,
    arg1: any /*java.util.stream.Collector*/,
    arg2: BiFunction<R1, R2, R>
  ): any /*java.util.stream.Collector*/;
  flatMapping<T, U>(
    arg0: Func<T, java.util.stream.Stream<U>>,
    arg1: any /*java.util.stream.Collector*/
  ): any /*java.util.stream.Collector*/;
  mapping<T, U>(arg0: Func<T, U>, arg1: any /*java.util.stream.Collector*/): any /*java.util.stream.Collector*/;
  reducing<T, U>(arg0: U, arg1: Func<T, U>, arg2: BinaryOperator<U>): any /*java.util.stream.Collector*/;
  reducing<T>(arg0: T, arg1: BinaryOperator<T>): any /*java.util.stream.Collector*/;
  averagingDouble(arg0: any /*java.util.function.ToDoubleFunction*/): any /*java.util.stream.Collector*/;
  averagingInt(arg0: any /*java.util.function.ToIntFunction*/): any /*java.util.stream.Collector*/;
  averagingLong(arg0: any /*java.util.function.ToLongFunction*/): any /*java.util.stream.Collector*/;
  summingDouble(arg0: any /*java.util.function.ToDoubleFunction*/): any /*java.util.stream.Collector*/;
  summingInt(arg0: any /*java.util.function.ToIntFunction*/): any /*java.util.stream.Collector*/;
  counting(): any /*java.util.stream.Collector*/;
  summingLong(arg0: any /*java.util.function.ToLongFunction*/): any /*java.util.stream.Collector*/;
  summarizingDouble(arg0: any /*java.util.function.ToDoubleFunction*/): any /*java.util.stream.Collector*/;
  summarizingInt(arg0: any /*java.util.function.ToIntFunction*/): any /*java.util.stream.Collector*/;
  toList(): any /*java.util.stream.Collector*/;
  toUnmodifiableList(): any /*java.util.stream.Collector*/;
  summarizingLong(arg0: any /*java.util.function.ToLongFunction*/): any /*java.util.stream.Collector*/;
  partitioningBy<T>(arg0: Predicate<T>): any /*java.util.stream.Collector*/;
  maxBy(arg0: any /*java.util.Comparator*/): any /*java.util.stream.Collector*/;
  minBy(arg0: any /*java.util.Comparator*/): any /*java.util.stream.Collector*/;
  reducing<T>(arg0: BinaryOperator<T>): any /*java.util.stream.Collector*/;
  toSet(): any /*java.util.stream.Collector*/;
  toUnmodifiableSet(): any /*java.util.stream.Collector*/;
  joining(): any /*java.util.stream.Collector*/;
  joining(arg0: any /*java.lang.CharSequence*/): any /*java.util.stream.Collector*/;
  joining(
    arg0: any /*java.lang.CharSequence*/,
    arg1: any /*java.lang.CharSequence*/,
    arg2: any /*java.lang.CharSequence*/
  ): any /*java.util.stream.Collector*/;
}

export const Collectors: CollectorsStatic = Java.type("java.util.stream.Collectors");

interface ConstantRate$ConstantRateOpenInjectionStepStatic {
  readonly class: any;
  atOnceUsers(arg0: int): io.gatling.javaapi.core.OpenInjectionStep;
  nothingFor(arg0: java.time.Duration): io.gatling.javaapi.core.OpenInjectionStep;
}

export const ConstantRate$ConstantRateOpenInjectionStep: ConstantRate$ConstantRateOpenInjectionStepStatic = Java.type(
  "io.gatling.javaapi.core.OpenInjectionStep$ConstantRate$ConstantRateOpenInjectionStep"
);

interface CoreDslStatic {
  readonly class: any;
  details(...arg0: string[]): io.gatling.javaapi.core.Assertion$WithPath;
  forAll(): io.gatling.javaapi.core.Assertion$WithPath;
  global(): io.gatling.javaapi.core.Assertion$WithPath;
  InputStreamBody(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.io.InputStream*/>
  ): io.gatling.javaapi.core.Body;
  ByteArrayBody(arg0: bytearray): io.gatling.javaapi.core.Body$WithBytes;
  ByteArrayBody(arg0: string): io.gatling.javaapi.core.Body$WithBytes;
  ByteArrayBody(arg0: Func<io.gatling.javaapi.core.Session, bytearray>): io.gatling.javaapi.core.Body$WithBytes;
  RawFileBody(arg0: string): io.gatling.javaapi.core.Body$WithBytes;
  RawFileBody(arg0: Func<io.gatling.javaapi.core.Session, string>): io.gatling.javaapi.core.Body$WithBytes;
  ElFileBody(arg0: string): io.gatling.javaapi.core.Body$WithString;
  ElFileBody(arg0: Func<io.gatling.javaapi.core.Session, string>): io.gatling.javaapi.core.Body$WithString;
  PebbleFileBody(arg0: string): io.gatling.javaapi.core.Body$WithString;
  PebbleFileBody(arg0: Func<io.gatling.javaapi.core.Session, string>): io.gatling.javaapi.core.Body$WithString;
  PebbleStringBody(arg0: string): io.gatling.javaapi.core.Body$WithString;
  StringBody(arg0: string): io.gatling.javaapi.core.Body$WithString;
  StringBody(arg0: Func<io.gatling.javaapi.core.Session, string>): io.gatling.javaapi.core.Body$WithString;
  crashLoadGenerator(arg0: string): io.gatling.javaapi.core.ChainBuilder;
  crashLoadGenerator(arg0: Func<io.gatling.javaapi.core.Session, string>): io.gatling.javaapi.core.ChainBuilder;
  crashLoadGeneratorIf(arg0: string, arg1: string): io.gatling.javaapi.core.ChainBuilder;
  crashLoadGeneratorIf(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, boolean | null>
  ): io.gatling.javaapi.core.ChainBuilder;
  crashLoadGeneratorIf(
    arg0: Func<io.gatling.javaapi.core.Session, string>,
    arg1: string
  ): io.gatling.javaapi.core.ChainBuilder;
  crashLoadGeneratorIf(
    arg0: Func<io.gatling.javaapi.core.Session, string>,
    arg1: Func<io.gatling.javaapi.core.Session, boolean | null>
  ): io.gatling.javaapi.core.ChainBuilder;
  exec(
    arg0: io.gatling.javaapi.core.exec.Executable,
    ...arg1: io.gatling.javaapi.core.exec.Executable[]
  ): io.gatling.javaapi.core.ChainBuilder;
  exec(arg0: java.util.List<io.gatling.javaapi.core.ChainBuilder>): io.gatling.javaapi.core.ChainBuilder;
  exec(
    arg0: Func<io.gatling.javaapi.core.Session, io.gatling.javaapi.core.Session>
  ): io.gatling.javaapi.core.ChainBuilder;
  exitHere(): io.gatling.javaapi.core.ChainBuilder;
  exitHereIf(arg0: string): io.gatling.javaapi.core.ChainBuilder;
  exitHereIf(arg0: Func<io.gatling.javaapi.core.Session, boolean | null>): io.gatling.javaapi.core.ChainBuilder;
  exitHereIfFailed(): io.gatling.javaapi.core.ChainBuilder;
  feed(arg0: io.gatling.javaapi.core.FeederBuilder<any /*java.lang.Object*/>): io.gatling.javaapi.core.ChainBuilder;
  feed(
    arg0: io.gatling.javaapi.core.FeederBuilder<any /*java.lang.Object*/>,
    arg1: int
  ): io.gatling.javaapi.core.ChainBuilder;
  feed(
    arg0: io.gatling.javaapi.core.FeederBuilder<any /*java.lang.Object*/>,
    arg1: string
  ): io.gatling.javaapi.core.ChainBuilder;
  feed(
    arg0: io.gatling.javaapi.core.FeederBuilder<any /*java.lang.Object*/>,
    arg1: Func<io.gatling.javaapi.core.Session, int | null>
  ): io.gatling.javaapi.core.ChainBuilder;
  feed(arg0: java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>): io.gatling.javaapi.core.ChainBuilder;
  feed(
    arg0: java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>,
    arg1: int
  ): io.gatling.javaapi.core.ChainBuilder;
  feed(
    arg0: java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>,
    arg1: string
  ): io.gatling.javaapi.core.ChainBuilder;
  feed(
    arg0: java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>,
    arg1: Func<io.gatling.javaapi.core.Session, int | null>
  ): io.gatling.javaapi.core.ChainBuilder;
  feed(
    arg0: Supplier<java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>>
  ): io.gatling.javaapi.core.ChainBuilder;
  feed(
    arg0: Supplier<java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>>,
    arg1: int
  ): io.gatling.javaapi.core.ChainBuilder;
  feed(
    arg0: Supplier<java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>>,
    arg1: string
  ): io.gatling.javaapi.core.ChainBuilder;
  feed(
    arg0: Supplier<java.util.Iterator<java.util.Map<string, any /*java.lang.Object*/>>>,
    arg1: Func<io.gatling.javaapi.core.Session, int | null>
  ): io.gatling.javaapi.core.ChainBuilder;
  pace(arg0: string): io.gatling.javaapi.core.ChainBuilder;
  pace(arg0: string, arg1: string): io.gatling.javaapi.core.ChainBuilder;
  pace(arg0: string, arg1: string, arg2: string): io.gatling.javaapi.core.ChainBuilder;
  pace(arg0: java.time.Duration): io.gatling.javaapi.core.ChainBuilder;
  pace(arg0: java.time.Duration, arg1: string): io.gatling.javaapi.core.ChainBuilder;
  pace(arg0: java.time.Duration, arg1: java.time.Duration): io.gatling.javaapi.core.ChainBuilder;
  pace(arg0: java.time.Duration, arg1: java.time.Duration, arg2: string): io.gatling.javaapi.core.ChainBuilder;
  pace(arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>): io.gatling.javaapi.core.ChainBuilder;
  pace(
    arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
    arg1: string
  ): io.gatling.javaapi.core.ChainBuilder;
  pace(
    arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
    arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>
  ): io.gatling.javaapi.core.ChainBuilder;
  pace(
    arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
    arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
    arg2: string
  ): io.gatling.javaapi.core.ChainBuilder;
  pace(arg0: long): io.gatling.javaapi.core.ChainBuilder;
  pace(arg0: long, arg1: string): io.gatling.javaapi.core.ChainBuilder;
  pace(arg0: long, arg1: long): io.gatling.javaapi.core.ChainBuilder;
  pace(arg0: long, arg1: long, arg2: string): io.gatling.javaapi.core.ChainBuilder;
  pause(arg0: string): io.gatling.javaapi.core.ChainBuilder;
  pause(arg0: string, arg1: io.gatling.javaapi.core.PauseType): io.gatling.javaapi.core.ChainBuilder;
  pause(arg0: string, arg1: string): io.gatling.javaapi.core.ChainBuilder;
  pause(arg0: string, arg1: string, arg2: io.gatling.javaapi.core.PauseType): io.gatling.javaapi.core.ChainBuilder;
  pause(arg0: java.time.Duration): io.gatling.javaapi.core.ChainBuilder;
  pause(arg0: java.time.Duration, arg1: io.gatling.javaapi.core.PauseType): io.gatling.javaapi.core.ChainBuilder;
  pause(arg0: java.time.Duration, arg1: java.time.Duration): io.gatling.javaapi.core.ChainBuilder;
  pause(
    arg0: java.time.Duration,
    arg1: java.time.Duration,
    arg2: io.gatling.javaapi.core.PauseType
  ): io.gatling.javaapi.core.ChainBuilder;
  pause(arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>): io.gatling.javaapi.core.ChainBuilder;
  pause(
    arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
    arg1: io.gatling.javaapi.core.PauseType
  ): io.gatling.javaapi.core.ChainBuilder;
  pause(
    arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
    arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>
  ): io.gatling.javaapi.core.ChainBuilder;
  pause(
    arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
    arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
    arg2: io.gatling.javaapi.core.PauseType
  ): io.gatling.javaapi.core.ChainBuilder;
  pause(arg0: long): io.gatling.javaapi.core.ChainBuilder;
  pause(arg0: long, arg1: io.gatling.javaapi.core.PauseType): io.gatling.javaapi.core.ChainBuilder;
  pause(arg0: long, arg1: long): io.gatling.javaapi.core.ChainBuilder;
  pause(arg0: long, arg1: long, arg2: io.gatling.javaapi.core.PauseType): io.gatling.javaapi.core.ChainBuilder;
  rendezVous(arg0: int): io.gatling.javaapi.core.ChainBuilder;
  stopLoadGenerator(arg0: string): io.gatling.javaapi.core.ChainBuilder;
  stopLoadGenerator(arg0: Func<io.gatling.javaapi.core.Session, string>): io.gatling.javaapi.core.ChainBuilder;
  stopLoadGeneratorIf(arg0: string, arg1: string): io.gatling.javaapi.core.ChainBuilder;
  stopLoadGeneratorIf(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, boolean | null>
  ): io.gatling.javaapi.core.ChainBuilder;
  stopLoadGeneratorIf(
    arg0: Func<io.gatling.javaapi.core.Session, string>,
    arg1: string
  ): io.gatling.javaapi.core.ChainBuilder;
  stopLoadGeneratorIf(
    arg0: Func<io.gatling.javaapi.core.Session, string>,
    arg1: Func<io.gatling.javaapi.core.Session, boolean | null>
  ): io.gatling.javaapi.core.ChainBuilder;
  regex(arg0: string): io.gatling.javaapi.core.CheckBuilder$CaptureGroupCheckBuilder;
  regex(
    arg0: Func<io.gatling.javaapi.core.Session, string>
  ): io.gatling.javaapi.core.CheckBuilder$CaptureGroupCheckBuilder;
  css(arg0: string, arg1: string): any /*io.gatling.javaapi.core.CheckBuilder$CssOfTypeMultipleFind*/;
  css(
    arg0: Func<io.gatling.javaapi.core.Session, string>,
    arg1: string
  ): any /*io.gatling.javaapi.core.CheckBuilder$CssOfTypeMultipleFind*/;
  bodyBytes(): io.gatling.javaapi.core.CheckBuilder$Find<bytearray>;
  bodyStream(): io.gatling.javaapi.core.CheckBuilder$Find<any /*java.io.InputStream*/>;
  bodyLength(): io.gatling.javaapi.core.CheckBuilder$Find<int | null>;
  responseTimeInMillis(): io.gatling.javaapi.core.CheckBuilder$Find<int | null>;
  bodyString(): io.gatling.javaapi.core.CheckBuilder$Find<string>;
  md5(): io.gatling.javaapi.core.CheckBuilder$Find<string>;
  sha1(): io.gatling.javaapi.core.CheckBuilder$Find<string>;
  jmesPath(arg0: string): io.gatling.javaapi.core.CheckBuilder$JsonOfTypeFind;
  jmesPath(arg0: Func<io.gatling.javaapi.core.Session, string>): io.gatling.javaapi.core.CheckBuilder$JsonOfTypeFind;
  jsonpJmesPath(arg0: string): io.gatling.javaapi.core.CheckBuilder$JsonOfTypeFind;
  jsonpJmesPath(
    arg0: Func<io.gatling.javaapi.core.Session, string>
  ): io.gatling.javaapi.core.CheckBuilder$JsonOfTypeFind;
  jsonPath(arg0: string): io.gatling.javaapi.core.CheckBuilder$JsonOfTypeMultipleFind;
  jsonPath(
    arg0: Func<io.gatling.javaapi.core.Session, string>
  ): io.gatling.javaapi.core.CheckBuilder$JsonOfTypeMultipleFind;
  jsonpJsonPath(arg0: string): io.gatling.javaapi.core.CheckBuilder$JsonOfTypeMultipleFind;
  jsonpJsonPath(
    arg0: Func<io.gatling.javaapi.core.Session, string>
  ): io.gatling.javaapi.core.CheckBuilder$JsonOfTypeMultipleFind;
  substring(arg0: string): io.gatling.javaapi.core.CheckBuilder$MultipleFind<int | null>;
  substring(
    arg0: Func<io.gatling.javaapi.core.Session, string>
  ): io.gatling.javaapi.core.CheckBuilder$MultipleFind<int | null>;
  css(arg0: string): io.gatling.javaapi.core.CheckBuilder$MultipleFind<string>;
  css(arg0: Func<io.gatling.javaapi.core.Session, string>): io.gatling.javaapi.core.CheckBuilder$MultipleFind<string>;
  xpath(arg0: string): io.gatling.javaapi.core.CheckBuilder$MultipleFind<string>;
  xpath(arg0: string, arg1: java.util.Map<string, string>): io.gatling.javaapi.core.CheckBuilder$MultipleFind<string>;
  xpath(arg0: Func<io.gatling.javaapi.core.Session, string>): io.gatling.javaapi.core.CheckBuilder$MultipleFind<string>;
  xpath(
    arg0: Func<io.gatling.javaapi.core.Session, string>,
    arg1: java.util.Map<string, string>
  ): io.gatling.javaapi.core.CheckBuilder$MultipleFind<string>;
  form(
    arg0: string
  ): io.gatling.javaapi.core.CheckBuilder$MultipleFind<java.util.Map<string, any /*java.lang.Object*/>>;
  form(
    arg0: Func<io.gatling.javaapi.core.Session, string>
  ): io.gatling.javaapi.core.CheckBuilder$MultipleFind<java.util.Map<string, any /*java.lang.Object*/>>;
  onCase(arg0: any /*java.lang.Object*/): io.gatling.javaapi.core.WithKey$Then;
  percent(arg0: double): io.gatling.javaapi.core.WithWeight$Then;
  constantConcurrentUsers(arg0: int): io.gatling.javaapi.core.ClosedInjectionStep$Constant;
  rampConcurrentUsers(arg0: int): io.gatling.javaapi.core.ClosedInjectionStep$Ramp;
  incrementConcurrentUsers(arg0: int): io.gatling.javaapi.core.ClosedInjectionStep$Stairs;
  csv(arg0: string): io.gatling.javaapi.core.FeederBuilder$Batchable<string>;
  csv(arg0: string, arg1: any /*char*/): io.gatling.javaapi.core.FeederBuilder$Batchable<string>;
  separatedValues(arg0: string, arg1: any /*char*/): io.gatling.javaapi.core.FeederBuilder$Batchable<string>;
  separatedValues(
    arg0: string,
    arg1: any /*char*/,
    arg2: any /*char*/
  ): io.gatling.javaapi.core.FeederBuilder$Batchable<string>;
  ssv(arg0: string): io.gatling.javaapi.core.FeederBuilder$Batchable<string>;
  ssv(arg0: string, arg1: any /*char*/): io.gatling.javaapi.core.FeederBuilder$Batchable<string>;
  tsv(arg0: string): io.gatling.javaapi.core.FeederBuilder$Batchable<string>;
  tsv(arg0: string, arg1: any /*char*/): io.gatling.javaapi.core.FeederBuilder$Batchable<string>;
  jsonFile(arg0: string): io.gatling.javaapi.core.FeederBuilder$FileBased<any /*java.lang.Object*/>;
  arrayFeeder(
    arg0: java.util.Map<string, any /*java.lang.Object*/>[]
  ): io.gatling.javaapi.core.FeederBuilder<any /*java.lang.Object*/>;
  jsonUrl(arg0: string): io.gatling.javaapi.core.FeederBuilder<any /*java.lang.Object*/>;
  listFeeder(
    arg0: java.util.List<java.util.Map<string, any /*java.lang.Object*/>>
  ): io.gatling.javaapi.core.FeederBuilder<any /*java.lang.Object*/>;
  AllowList(...arg0: string[]): io.gatling.javaapi.core.Filter$AllowList;
  AllowList(arg0: java.util.List<string>): io.gatling.javaapi.core.Filter$AllowList;
  DenyList(...arg0: string[]): io.gatling.javaapi.core.Filter$DenyList;
  DenyList(arg0: java.util.List<string>): io.gatling.javaapi.core.Filter$DenyList;
  atOnceUsers(arg0: int): io.gatling.javaapi.core.OpenInjectionStep;
  nothingFor(arg0: java.time.Duration): io.gatling.javaapi.core.OpenInjectionStep;
  nothingFor(arg0: long): io.gatling.javaapi.core.OpenInjectionStep;
  constantUsersPerSec(arg0: double): io.gatling.javaapi.core.OpenInjectionStep$ConstantRate;
  rampUsers(arg0: int): io.gatling.javaapi.core.OpenInjectionStep$Ramp;
  rampUsersPerSec(arg0: double): io.gatling.javaapi.core.OpenInjectionStep$RampRate;
  incrementUsersPerSec(arg0: double): io.gatling.javaapi.core.OpenInjectionStep$Stairs;
  stressPeakUsers(arg0: int): io.gatling.javaapi.core.OpenInjectionStep$StressPeak;
  customPauses(arg0: Func<io.gatling.javaapi.core.Session, long | null>): io.gatling.javaapi.core.PauseType;
  normalPausesWithPercentageDuration(arg0: double): io.gatling.javaapi.core.PauseType;
  normalPausesWithStdDevDuration(arg0: java.time.Duration): io.gatling.javaapi.core.PauseType;
  uniformPausesPlusOrMinusDuration(arg0: java.time.Duration): io.gatling.javaapi.core.PauseType;
  uniformPausesPlusOrMinusPercentage(arg0: double): io.gatling.javaapi.core.PauseType;
  scenario(arg0: string): io.gatling.javaapi.core.ScenarioBuilder;
  holdFor(arg0: java.time.Duration): io.gatling.javaapi.core.ThrottleStep;
  holdFor(arg0: long): io.gatling.javaapi.core.ThrottleStep;
  jumpToRps(arg0: int): io.gatling.javaapi.core.ThrottleStep;
  reachRps(arg0: int): io.gatling.javaapi.core.ThrottleStep$ReachIntermediate;
  doIf(arg0: string): io.gatling.javaapi.core.condition.DoIf$Then<io.gatling.javaapi.core.ChainBuilder>;
  doIf(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>
  ): io.gatling.javaapi.core.condition.DoIf$Then<io.gatling.javaapi.core.ChainBuilder>;
  doIfEquals(
    arg0: string,
    arg1: any /*java.lang.Object*/
  ): io.gatling.javaapi.core.condition.DoIfEquals$Then<io.gatling.javaapi.core.ChainBuilder>;
  doIfEquals(
    arg0: string,
    arg1: string
  ): io.gatling.javaapi.core.condition.DoIfEquals$Then<io.gatling.javaapi.core.ChainBuilder>;
  doIfEquals(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>
  ): io.gatling.javaapi.core.condition.DoIfEquals$Then<io.gatling.javaapi.core.ChainBuilder>;
  doIfEquals(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>,
    arg1: any /*java.lang.Object*/
  ): io.gatling.javaapi.core.condition.DoIfEquals$Then<io.gatling.javaapi.core.ChainBuilder>;
  doIfEquals(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>,
    arg1: string
  ): io.gatling.javaapi.core.condition.DoIfEquals$Then<io.gatling.javaapi.core.ChainBuilder>;
  doIfEquals(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>
  ): io.gatling.javaapi.core.condition.DoIfEquals$Then<io.gatling.javaapi.core.ChainBuilder>;
  doIfEqualsOrElse(
    arg0: string,
    arg1: any /*java.lang.Object*/
  ): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<io.gatling.javaapi.core.ChainBuilder>;
  doIfEqualsOrElse(
    arg0: string,
    arg1: string
  ): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<io.gatling.javaapi.core.ChainBuilder>;
  doIfEqualsOrElse(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>
  ): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<io.gatling.javaapi.core.ChainBuilder>;
  doIfEqualsOrElse(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>,
    arg1: any /*java.lang.Object*/
  ): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<io.gatling.javaapi.core.ChainBuilder>;
  doIfEqualsOrElse(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>,
    arg1: string
  ): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<io.gatling.javaapi.core.ChainBuilder>;
  doIfEqualsOrElse(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>
  ): io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then<io.gatling.javaapi.core.ChainBuilder>;
  doIfOrElse(arg0: string): io.gatling.javaapi.core.condition.DoIfOrElse$Then<io.gatling.javaapi.core.ChainBuilder>;
  doIfOrElse(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>
  ): io.gatling.javaapi.core.condition.DoIfOrElse$Then<io.gatling.javaapi.core.ChainBuilder>;
  doSwitch(arg0: string): io.gatling.javaapi.core.condition.DoSwitch$On<io.gatling.javaapi.core.ChainBuilder>;
  doSwitch(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>
  ): io.gatling.javaapi.core.condition.DoSwitch$On<io.gatling.javaapi.core.ChainBuilder>;
  doSwitchOrElse(
    arg0: string
  ): io.gatling.javaapi.core.condition.DoSwitchOrElse$On<io.gatling.javaapi.core.ChainBuilder>;
  doSwitchOrElse(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.lang.Object*/>
  ): io.gatling.javaapi.core.condition.DoSwitchOrElse$On<io.gatling.javaapi.core.ChainBuilder>;
  randomSwitch(): io.gatling.javaapi.core.condition.RandomSwitch$On<io.gatling.javaapi.core.ChainBuilder>;
  randomSwitchOrElse(): io.gatling.javaapi.core.condition.RandomSwitchOrElse$On<io.gatling.javaapi.core.ChainBuilder>;
  roundRobinSwitch(): io.gatling.javaapi.core.condition.RoundRobinSwitch$On<io.gatling.javaapi.core.ChainBuilder>;
  uniformRandomSwitch(): io.gatling.javaapi.core.condition.UniformRandomSwitch$On<io.gatling.javaapi.core.ChainBuilder>;
  exitBlockOnFail(): io.gatling.javaapi.core.error.Errors$ExitBlockOnFail<io.gatling.javaapi.core.ChainBuilder>;
  tryMax(arg0: int): io.gatling.javaapi.core.error.Errors$TryMax<io.gatling.javaapi.core.ChainBuilder>;
  tryMax(arg0: int, arg1: string): io.gatling.javaapi.core.error.Errors$TryMax<io.gatling.javaapi.core.ChainBuilder>;
  tryMax(arg0: string): io.gatling.javaapi.core.error.Errors$TryMax<io.gatling.javaapi.core.ChainBuilder>;
  tryMax(arg0: string, arg1: string): io.gatling.javaapi.core.error.Errors$TryMax<io.gatling.javaapi.core.ChainBuilder>;
  tryMax(
    arg0: Func<io.gatling.javaapi.core.Session, int | null>
  ): io.gatling.javaapi.core.error.Errors$TryMax<io.gatling.javaapi.core.ChainBuilder>;
  tryMax(
    arg0: Func<io.gatling.javaapi.core.Session, int | null>,
    arg1: string
  ): io.gatling.javaapi.core.error.Errors$TryMax<io.gatling.javaapi.core.ChainBuilder>;
  group(arg0: string): io.gatling.javaapi.core.group.Groups$On<io.gatling.javaapi.core.ChainBuilder>;
  group(
    arg0: Func<io.gatling.javaapi.core.Session, string>
  ): io.gatling.javaapi.core.group.Groups$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAs(arg0: string): io.gatling.javaapi.core.loop.AsLongAs$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAs(arg0: string, arg1: boolean): io.gatling.javaapi.core.loop.AsLongAs$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAs(arg0: string, arg1: string): io.gatling.javaapi.core.loop.AsLongAs$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAs(
    arg0: string,
    arg1: string,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.AsLongAs$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAs(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>
  ): io.gatling.javaapi.core.loop.AsLongAs$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAs(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: boolean
  ): io.gatling.javaapi.core.loop.AsLongAs$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAs(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: string
  ): io.gatling.javaapi.core.loop.AsLongAs$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAs(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: string,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.AsLongAs$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: string,
    arg1: string
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: string,
    arg1: string,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: string,
    arg1: string,
    arg2: string
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: string,
    arg1: string,
    arg2: string,
    arg3: boolean
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: string,
    arg1: java.time.Duration
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: string,
    arg1: java.time.Duration,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: string,
    arg1: java.time.Duration,
    arg2: string
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: string,
    arg1: java.time.Duration,
    arg2: string,
    arg3: boolean
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
    arg2: string
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
    arg2: string,
    arg3: boolean
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: string,
    arg1: long
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: string,
    arg1: long,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: string,
    arg1: long,
    arg2: string
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: string,
    arg1: long,
    arg2: string,
    arg3: boolean
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: java.time.Duration
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: java.time.Duration,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: java.time.Duration,
    arg2: string
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: java.time.Duration,
    arg2: string,
    arg3: boolean
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
    arg2: string
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
    arg2: string,
    arg3: boolean
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: long
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: long,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: long,
    arg2: string
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: long,
    arg2: string,
    arg3: boolean
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhile(arg0: string): io.gatling.javaapi.core.loop.DoWhile$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhile(arg0: string, arg1: string): io.gatling.javaapi.core.loop.DoWhile$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhile(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>
  ): io.gatling.javaapi.core.loop.DoWhile$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhile(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: string
  ): io.gatling.javaapi.core.loop.DoWhile$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: string,
    arg1: string
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: string,
    arg1: string,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: string,
    arg1: string,
    arg2: string
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: string,
    arg1: string,
    arg2: string,
    arg3: boolean
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: string,
    arg1: java.time.Duration
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: string,
    arg1: java.time.Duration,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: string,
    arg1: java.time.Duration,
    arg2: string
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: string,
    arg1: java.time.Duration,
    arg2: string,
    arg3: boolean
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
    arg2: string
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
    arg2: string,
    arg3: boolean
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: string,
    arg1: long
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: string,
    arg1: long,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: string,
    arg1: long,
    arg2: string
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: string,
    arg1: long,
    arg2: string,
    arg3: boolean
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: java.time.Duration
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: java.time.Duration,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: java.time.Duration,
    arg2: string
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: java.time.Duration,
    arg2: string,
    arg3: boolean
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
    arg2: string
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
    arg2: string,
    arg3: boolean
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: long
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: long,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: long,
    arg2: string
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: long,
    arg2: string,
    arg3: boolean
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  during(arg0: string): io.gatling.javaapi.core.loop.During$On<io.gatling.javaapi.core.ChainBuilder>;
  during(arg0: string, arg1: boolean): io.gatling.javaapi.core.loop.During$On<io.gatling.javaapi.core.ChainBuilder>;
  during(arg0: string, arg1: string): io.gatling.javaapi.core.loop.During$On<io.gatling.javaapi.core.ChainBuilder>;
  during(
    arg0: string,
    arg1: string,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.During$On<io.gatling.javaapi.core.ChainBuilder>;
  during(arg0: java.time.Duration): io.gatling.javaapi.core.loop.During$On<io.gatling.javaapi.core.ChainBuilder>;
  during(
    arg0: java.time.Duration,
    arg1: boolean
  ): io.gatling.javaapi.core.loop.During$On<io.gatling.javaapi.core.ChainBuilder>;
  during(
    arg0: java.time.Duration,
    arg1: string
  ): io.gatling.javaapi.core.loop.During$On<io.gatling.javaapi.core.ChainBuilder>;
  during(
    arg0: java.time.Duration,
    arg1: string,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.During$On<io.gatling.javaapi.core.ChainBuilder>;
  during(
    arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>
  ): io.gatling.javaapi.core.loop.During$On<io.gatling.javaapi.core.ChainBuilder>;
  during(
    arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
    arg1: boolean
  ): io.gatling.javaapi.core.loop.During$On<io.gatling.javaapi.core.ChainBuilder>;
  during(
    arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
    arg1: string
  ): io.gatling.javaapi.core.loop.During$On<io.gatling.javaapi.core.ChainBuilder>;
  during(
    arg0: Func<io.gatling.javaapi.core.Session, java.time.Duration>,
    arg1: string,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.During$On<io.gatling.javaapi.core.ChainBuilder>;
  during(arg0: long): io.gatling.javaapi.core.loop.During$On<io.gatling.javaapi.core.ChainBuilder>;
  during(arg0: long, arg1: boolean): io.gatling.javaapi.core.loop.During$On<io.gatling.javaapi.core.ChainBuilder>;
  during(arg0: long, arg1: string): io.gatling.javaapi.core.loop.During$On<io.gatling.javaapi.core.ChainBuilder>;
  during(
    arg0: long,
    arg1: string,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.During$On<io.gatling.javaapi.core.ChainBuilder>;
  foreach(arg0: string, arg1: string): io.gatling.javaapi.core.loop.ForEach$On<io.gatling.javaapi.core.ChainBuilder>;
  foreach(
    arg0: string,
    arg1: string,
    arg2: string
  ): io.gatling.javaapi.core.loop.ForEach$On<io.gatling.javaapi.core.ChainBuilder>;
  foreach(
    arg0: java.util.List<any /*java.lang.Object*/>,
    arg1: string
  ): io.gatling.javaapi.core.loop.ForEach$On<io.gatling.javaapi.core.ChainBuilder>;
  foreach(
    arg0: java.util.List<any /*java.lang.Object*/>,
    arg1: string,
    arg2: string
  ): io.gatling.javaapi.core.loop.ForEach$On<io.gatling.javaapi.core.ChainBuilder>;
  foreach(
    arg0: Func<io.gatling.javaapi.core.Session, java.util.List<any /*java.lang.Object*/>>,
    arg1: string
  ): io.gatling.javaapi.core.loop.ForEach$On<io.gatling.javaapi.core.ChainBuilder>;
  foreach(
    arg0: Func<io.gatling.javaapi.core.Session, java.util.List<any /*java.lang.Object*/>>,
    arg1: string,
    arg2: string
  ): io.gatling.javaapi.core.loop.ForEach$On<io.gatling.javaapi.core.ChainBuilder>;
  forever(): io.gatling.javaapi.core.loop.Forever$On<io.gatling.javaapi.core.ChainBuilder>;
  forever(arg0: string): io.gatling.javaapi.core.loop.Forever$On<io.gatling.javaapi.core.ChainBuilder>;
  repeat(arg0: int): io.gatling.javaapi.core.loop.Repeat$On<io.gatling.javaapi.core.ChainBuilder>;
  repeat(arg0: int, arg1: string): io.gatling.javaapi.core.loop.Repeat$On<io.gatling.javaapi.core.ChainBuilder>;
  repeat(arg0: string): io.gatling.javaapi.core.loop.Repeat$On<io.gatling.javaapi.core.ChainBuilder>;
  repeat(arg0: string, arg1: string): io.gatling.javaapi.core.loop.Repeat$On<io.gatling.javaapi.core.ChainBuilder>;
  repeat(
    arg0: Func<io.gatling.javaapi.core.Session, int | null>
  ): io.gatling.javaapi.core.loop.Repeat$On<io.gatling.javaapi.core.ChainBuilder>;
  repeat(
    arg0: Func<io.gatling.javaapi.core.Session, int | null>,
    arg1: string
  ): io.gatling.javaapi.core.loop.Repeat$On<io.gatling.javaapi.core.ChainBuilder>;
  registerJmesPathFunctions(...arg0: any /*io.burt.jmespath.function.Function*/[]): void;
  registerPebbleExtensions(...arg0: any /*io.pebbletemplates.pebble.extension.Extension*/[]): void;
}

export const CoreDsl: CoreDslStatic = Java.type("io.gatling.javaapi.core.CoreDsl");

interface DoIf$ThenStatic {
  readonly class: any;
}

export const DoIf$Then: DoIf$ThenStatic = Java.type("io.gatling.javaapi.core.condition.DoIf$Then");

interface DoIfEquals$ThenStatic {
  readonly class: any;
}

export const DoIfEquals$Then: DoIfEquals$ThenStatic = Java.type("io.gatling.javaapi.core.condition.DoIfEquals$Then");

interface DoIfEqualsOrElse$ThenStatic {
  readonly class: any;
}

export const DoIfEqualsOrElse$Then: DoIfEqualsOrElse$ThenStatic = Java.type(
  "io.gatling.javaapi.core.condition.DoIfEqualsOrElse$Then"
);

interface DoIfEqualsOrElseStatic {
  readonly class: any;
}

export const DoIfEqualsOrElse: DoIfEqualsOrElseStatic = Java.type("io.gatling.javaapi.core.condition.DoIfEqualsOrElse");

interface DoIfEqualsStatic {
  readonly class: any;
}

export const DoIfEquals: DoIfEqualsStatic = Java.type("io.gatling.javaapi.core.condition.DoIfEquals");

interface DoIfOrElse$OrElseStatic {
  readonly class: any;
}

export const DoIfOrElse$OrElse: DoIfOrElse$OrElseStatic = Java.type(
  "io.gatling.javaapi.core.condition.DoIfOrElse$OrElse"
);

interface DoIfOrElse$ThenStatic {
  readonly class: any;
}

export const DoIfOrElse$Then: DoIfOrElse$ThenStatic = Java.type("io.gatling.javaapi.core.condition.DoIfOrElse$Then");

interface DoIfOrElseStatic {
  readonly class: any;
}

export const DoIfOrElse: DoIfOrElseStatic = Java.type("io.gatling.javaapi.core.condition.DoIfOrElse");

interface DoIfStatic {
  readonly class: any;
}

export const DoIf: DoIfStatic = Java.type("io.gatling.javaapi.core.condition.DoIf");

interface DoSwitch$OnStatic {
  readonly class: any;
}

export const DoSwitch$On: DoSwitch$OnStatic = Java.type("io.gatling.javaapi.core.condition.DoSwitch$On");

interface DoSwitchOrElse$OnStatic {
  readonly class: any;
}

export const DoSwitchOrElse$On: DoSwitchOrElse$OnStatic = Java.type(
  "io.gatling.javaapi.core.condition.DoSwitchOrElse$On"
);

interface DoSwitchOrElse$OrElseStatic {
  readonly class: any;
}

export const DoSwitchOrElse$OrElse: DoSwitchOrElse$OrElseStatic = Java.type(
  "io.gatling.javaapi.core.condition.DoSwitchOrElse$OrElse"
);

interface DoSwitchOrElseStatic {
  readonly class: any;
}

export const DoSwitchOrElse: DoSwitchOrElseStatic = Java.type("io.gatling.javaapi.core.condition.DoSwitchOrElse");

interface DoSwitchStatic {
  readonly class: any;
}

export const DoSwitch: DoSwitchStatic = Java.type("io.gatling.javaapi.core.condition.DoSwitch");

interface DoWhile$OnStatic {
  readonly class: any;
}

export const DoWhile$On: DoWhile$OnStatic = Java.type("io.gatling.javaapi.core.loop.DoWhile$On");

interface DoWhileDuring$OnStatic {
  readonly class: any;
}

export const DoWhileDuring$On: DoWhileDuring$OnStatic = Java.type("io.gatling.javaapi.core.loop.DoWhileDuring$On");

interface DoWhileDuringStatic {
  readonly class: any;
}

export const DoWhileDuring: DoWhileDuringStatic = Java.type("io.gatling.javaapi.core.loop.DoWhileDuring");

interface DoWhileStatic {
  readonly class: any;
}

export const DoWhile: DoWhileStatic = Java.type("io.gatling.javaapi.core.loop.DoWhile");

interface DurationStatic {
  readonly class: any;
  between(arg0: any /*java.time.temporal.Temporal*/, arg1: any /*java.time.temporal.Temporal*/): java.time.Duration;
  from(arg0: any /*java.time.temporal.TemporalAmount*/): java.time.Duration;
  of(arg0: long, arg1: java.time.temporal.TemporalUnit): java.time.Duration;
  ofDays(arg0: long): java.time.Duration;
  ofHours(arg0: long): java.time.Duration;
  ofMillis(arg0: long): java.time.Duration;
  ofMinutes(arg0: long): java.time.Duration;
  ofNanos(arg0: long): java.time.Duration;
  ofSeconds(arg0: long): java.time.Duration;
  ofSeconds(arg0: long, arg1: long): java.time.Duration;
  parse(arg0: any /*java.lang.CharSequence*/): java.time.Duration;
}

export const Duration: DurationStatic = Java.type("java.time.Duration");

interface During$OnStatic {
  readonly class: any;
}

export const During$On: During$OnStatic = Java.type("io.gatling.javaapi.core.loop.During$On");

interface DuringStatic {
  readonly class: any;
}

export const During: DuringStatic = Java.type("io.gatling.javaapi.core.loop.During");

interface Errors$ExitBlockOnFailStatic {
  readonly class: any;
}

export const Errors$ExitBlockOnFail: Errors$ExitBlockOnFailStatic = Java.type(
  "io.gatling.javaapi.core.error.Errors$ExitBlockOnFail"
);

interface Errors$TryMaxStatic {
  readonly class: any;
}

export const Errors$TryMax: Errors$TryMaxStatic = Java.type("io.gatling.javaapi.core.error.Errors$TryMax");

interface ErrorsStatic {
  readonly class: any;
}

export const Errors: ErrorsStatic = Java.type("io.gatling.javaapi.core.error.Errors");

interface ExecsStatic {
  readonly class: any;
}

export const Execs: ExecsStatic = Java.type("io.gatling.javaapi.core.exec.Execs");

interface ExecutableStatic {
  readonly class: any;
}

export const Executable: ExecutableStatic = Java.type("io.gatling.javaapi.core.exec.Executable");

interface FeederBuilder$BatchableStatic {
  readonly class: any;
}

export const FeederBuilder$Batchable: FeederBuilder$BatchableStatic = Java.type(
  "io.gatling.javaapi.core.FeederBuilder$Batchable"
);

interface FeederBuilder$FileBasedStatic {
  readonly class: any;
}

export const FeederBuilder$FileBased: FeederBuilder$FileBasedStatic = Java.type(
  "io.gatling.javaapi.core.FeederBuilder$FileBased"
);

interface FeederBuilderStatic {
  readonly class: any;
}

export const FeederBuilder: FeederBuilderStatic = Java.type("io.gatling.javaapi.core.FeederBuilder");

interface FeedsStatic {
  readonly class: any;
}

export const Feeds: FeedsStatic = Java.type("io.gatling.javaapi.core.feed.Feeds");

interface Filter$AllowListStatic {
  readonly class: any;
  new (arg0: java.util.List<string>): io.gatling.javaapi.core.Filter$AllowList;
}

export const Filter$AllowList: Filter$AllowListStatic = Java.type("io.gatling.javaapi.core.Filter$AllowList");

interface Filter$DenyListStatic {
  readonly class: any;
  new (arg0: java.util.List<string>): io.gatling.javaapi.core.Filter$DenyList;
}

export const Filter$DenyList: Filter$DenyListStatic = Java.type("io.gatling.javaapi.core.Filter$DenyList");

interface FilterStatic {
  readonly class: any;
}

export const Filter: FilterStatic = Java.type("io.gatling.javaapi.core.Filter");

interface ForEach$OnStatic {
  readonly class: any;
}

export const ForEach$On: ForEach$OnStatic = Java.type("io.gatling.javaapi.core.loop.ForEach$On");

interface ForEachStatic {
  readonly class: any;
}

export const ForEach: ForEachStatic = Java.type("io.gatling.javaapi.core.loop.ForEach");

interface Forever$OnStatic {
  readonly class: any;
}

export const Forever$On: Forever$OnStatic = Java.type("io.gatling.javaapi.core.loop.Forever$On");

interface ForeverStatic {
  readonly class: any;
}

export const Forever: ForeverStatic = Java.type("io.gatling.javaapi.core.loop.Forever");

interface GetCookieStatic {
  readonly class: any;
}

export const GetCookie: GetCookieStatic = Java.type("io.gatling.javaapi.http.GetCookie");

interface Groups$OnStatic {
  readonly class: any;
}

export const Groups$On: Groups$OnStatic = Java.type("io.gatling.javaapi.core.group.Groups$On");

interface GroupsStatic {
  readonly class: any;
}

export const Groups: GroupsStatic = Java.type("io.gatling.javaapi.core.group.Groups");

interface HttpDslStatic {
  readonly class: any;
  addCookie(arg0: io.gatling.javaapi.http.AddCookie): io.gatling.javaapi.core.ActionBuilder;
  flushCookieJar(): io.gatling.javaapi.core.ActionBuilder;
  flushHttpCache(): io.gatling.javaapi.core.ActionBuilder;
  flushSessionCookies(): io.gatling.javaapi.core.ActionBuilder;
  getCookieValue(arg0: io.gatling.javaapi.http.GetCookie): io.gatling.javaapi.core.ActionBuilder;
  currentLocationRegex(arg0: string): io.gatling.javaapi.core.CheckBuilder$CaptureGroupCheckBuilder;
  headerRegex(
    arg0: any /*java.lang.CharSequence*/,
    arg1: string
  ): io.gatling.javaapi.core.CheckBuilder$CaptureGroupCheckBuilder;
  headerRegex(
    arg0: any /*java.lang.CharSequence*/,
    arg1: Func<io.gatling.javaapi.core.Session, string>
  ): io.gatling.javaapi.core.CheckBuilder$CaptureGroupCheckBuilder;
  headerRegex(arg0: string, arg1: string): io.gatling.javaapi.core.CheckBuilder$CaptureGroupCheckBuilder;
  headerRegex(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, string>
  ): io.gatling.javaapi.core.CheckBuilder$CaptureGroupCheckBuilder;
  headerRegex(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.lang.CharSequence*/>,
    arg1: string
  ): io.gatling.javaapi.core.CheckBuilder$CaptureGroupCheckBuilder;
  headerRegex(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.lang.CharSequence*/>,
    arg1: Func<io.gatling.javaapi.core.Session, string>
  ): io.gatling.javaapi.core.CheckBuilder$CaptureGroupCheckBuilder;
  status(): io.gatling.javaapi.core.CheckBuilder$Find<int | null>;
  currentLocation(): io.gatling.javaapi.core.CheckBuilder$Find<string>;
  header(arg0: any /*java.lang.CharSequence*/): io.gatling.javaapi.core.CheckBuilder$MultipleFind<string>;
  header(arg0: string): io.gatling.javaapi.core.CheckBuilder$MultipleFind<string>;
  header(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.lang.CharSequence*/>
  ): io.gatling.javaapi.core.CheckBuilder$MultipleFind<string>;
  sitemap(arg0: string): io.gatling.javaapi.core.FeederBuilder$FileBased<string>;
  Cookie(arg0: string, arg1: string): io.gatling.javaapi.http.AddCookie;
  Cookie(arg0: string, arg1: Func<io.gatling.javaapi.core.Session, string>): io.gatling.javaapi.http.AddCookie;
  Cookie(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: string): io.gatling.javaapi.http.AddCookie;
  Cookie(
    arg0: Func<io.gatling.javaapi.core.Session, string>,
    arg1: Func<io.gatling.javaapi.core.Session, string>
  ): io.gatling.javaapi.http.AddCookie;
  ByteArrayBodyPart(arg0: string, arg1: bytearray): io.gatling.javaapi.http.BodyPart;
  ByteArrayBodyPart(arg0: string, arg1: string): io.gatling.javaapi.http.BodyPart;
  ByteArrayBodyPart(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, bytearray>
  ): io.gatling.javaapi.http.BodyPart;
  ByteArrayBodyPart(
    arg0: Func<io.gatling.javaapi.core.Session, string>,
    arg1: bytearray
  ): io.gatling.javaapi.http.BodyPart;
  ByteArrayBodyPart(
    arg0: Func<io.gatling.javaapi.core.Session, string>,
    arg1: string
  ): io.gatling.javaapi.http.BodyPart;
  ByteArrayBodyPart(
    arg0: Func<io.gatling.javaapi.core.Session, string>,
    arg1: Func<io.gatling.javaapi.core.Session, bytearray>
  ): io.gatling.javaapi.http.BodyPart;
  ElFileBodyPart(arg0: string): io.gatling.javaapi.http.BodyPart;
  ElFileBodyPart(arg0: string, arg1: string): io.gatling.javaapi.http.BodyPart;
  ElFileBodyPart(arg0: string, arg1: Func<io.gatling.javaapi.core.Session, string>): io.gatling.javaapi.http.BodyPart;
  ElFileBodyPart(arg0: Func<io.gatling.javaapi.core.Session, string>): io.gatling.javaapi.http.BodyPart;
  ElFileBodyPart(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: string): io.gatling.javaapi.http.BodyPart;
  ElFileBodyPart(
    arg0: Func<io.gatling.javaapi.core.Session, string>,
    arg1: Func<io.gatling.javaapi.core.Session, string>
  ): io.gatling.javaapi.http.BodyPart;
  PebbleFileBodyPart(arg0: string): io.gatling.javaapi.http.BodyPart;
  PebbleFileBodyPart(arg0: string, arg1: string): io.gatling.javaapi.http.BodyPart;
  PebbleFileBodyPart(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, string>
  ): io.gatling.javaapi.http.BodyPart;
  PebbleFileBodyPart(arg0: Func<io.gatling.javaapi.core.Session, string>): io.gatling.javaapi.http.BodyPart;
  PebbleFileBodyPart(
    arg0: Func<io.gatling.javaapi.core.Session, string>,
    arg1: string
  ): io.gatling.javaapi.http.BodyPart;
  PebbleFileBodyPart(
    arg0: Func<io.gatling.javaapi.core.Session, string>,
    arg1: Func<io.gatling.javaapi.core.Session, string>
  ): io.gatling.javaapi.http.BodyPart;
  PebbleStringBodyPart(arg0: string): io.gatling.javaapi.http.BodyPart;
  PebbleStringBodyPart(arg0: string, arg1: string): io.gatling.javaapi.http.BodyPart;
  PebbleStringBodyPart(
    arg0: Func<io.gatling.javaapi.core.Session, string>,
    arg1: string
  ): io.gatling.javaapi.http.BodyPart;
  RawFileBodyPart(arg0: string): io.gatling.javaapi.http.BodyPart;
  RawFileBodyPart(arg0: string, arg1: string): io.gatling.javaapi.http.BodyPart;
  RawFileBodyPart(arg0: string, arg1: Func<io.gatling.javaapi.core.Session, string>): io.gatling.javaapi.http.BodyPart;
  RawFileBodyPart(arg0: Func<io.gatling.javaapi.core.Session, string>): io.gatling.javaapi.http.BodyPart;
  RawFileBodyPart(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: string): io.gatling.javaapi.http.BodyPart;
  RawFileBodyPart(
    arg0: Func<io.gatling.javaapi.core.Session, string>,
    arg1: Func<io.gatling.javaapi.core.Session, string>
  ): io.gatling.javaapi.http.BodyPart;
  StringBodyPart(arg0: string): io.gatling.javaapi.http.BodyPart;
  StringBodyPart(arg0: string, arg1: string): io.gatling.javaapi.http.BodyPart;
  StringBodyPart(arg0: string, arg1: Func<io.gatling.javaapi.core.Session, string>): io.gatling.javaapi.http.BodyPart;
  StringBodyPart(arg0: Func<io.gatling.javaapi.core.Session, string>): io.gatling.javaapi.http.BodyPart;
  StringBodyPart(arg0: Func<io.gatling.javaapi.core.Session, string>, arg1: string): io.gatling.javaapi.http.BodyPart;
  StringBodyPart(
    arg0: Func<io.gatling.javaapi.core.Session, string>,
    arg1: Func<io.gatling.javaapi.core.Session, string>
  ): io.gatling.javaapi.http.BodyPart;
  CookieKey(arg0: string): io.gatling.javaapi.http.GetCookie;
  CookieKey(arg0: Func<io.gatling.javaapi.core.Session, string>): io.gatling.javaapi.http.GetCookie;
  http(arg0: string): io.gatling.javaapi.http.Http;
  http(arg0: Func<io.gatling.javaapi.core.Session, string>): io.gatling.javaapi.http.Http;
  poll(): io.gatling.javaapi.http.Polling;
  Proxy(arg0: string, arg1: int): io.gatling.javaapi.http.Proxy;
  sse(arg0: string): io.gatling.javaapi.http.Sse;
  sse(arg0: string, arg1: string): io.gatling.javaapi.http.Sse;
  ws(arg0: string): io.gatling.javaapi.http.Ws;
  ws(arg0: string, arg1: string): io.gatling.javaapi.http.Ws;
  currentLocationRegex(
    arg0: Func<io.gatling.javaapi.core.Session, string>
  ): any /*io.gatling.javaapi.http.internal.HttpCheckBuilder$CurrentLocationRegex*/;
}

export const HttpDsl: HttpDslStatic = Java.type("io.gatling.javaapi.http.HttpDsl");

interface HttpHeadersStatic {
  readonly class: any;
  equalsIgnoreCase(arg0: any /*java.lang.CharSequence*/, arg1: any /*java.lang.CharSequence*/): boolean;
  is100ContinueExpected(arg0: any /*io.netty.handler.codec.http.HttpMessage*/): boolean;
  isContentLengthSet(arg0: any /*io.netty.handler.codec.http.HttpMessage*/): boolean;
  isKeepAlive(arg0: any /*io.netty.handler.codec.http.HttpMessage*/): boolean;
  isTransferEncodingChunked(arg0: any /*io.netty.handler.codec.http.HttpMessage*/): boolean;
  getIntHeader(arg0: any /*io.netty.handler.codec.http.HttpMessage*/, arg1: any /*java.lang.CharSequence*/): int;
  getIntHeader(
    arg0: any /*io.netty.handler.codec.http.HttpMessage*/,
    arg1: any /*java.lang.CharSequence*/,
    arg2: int
  ): int;
  getIntHeader(arg0: any /*io.netty.handler.codec.http.HttpMessage*/, arg1: string): int;
  getIntHeader(arg0: any /*io.netty.handler.codec.http.HttpMessage*/, arg1: string, arg2: int): int;
  newEntity(arg0: string): any /*java.lang.CharSequence*/;
  getHeader(arg0: any /*io.netty.handler.codec.http.HttpMessage*/, arg1: any /*java.lang.CharSequence*/): string;
  getHeader(
    arg0: any /*io.netty.handler.codec.http.HttpMessage*/,
    arg1: any /*java.lang.CharSequence*/,
    arg2: string
  ): string;
  getHeader(arg0: any /*io.netty.handler.codec.http.HttpMessage*/, arg1: string): string;
  getHeader(arg0: any /*io.netty.handler.codec.http.HttpMessage*/, arg1: string, arg2: string): string;
  getHost(arg0: any /*io.netty.handler.codec.http.HttpMessage*/): string;
  getHost(arg0: any /*io.netty.handler.codec.http.HttpMessage*/, arg1: string): string;
  getDate(arg0: any /*io.netty.handler.codec.http.HttpMessage*/): any /*java.util.Date*/;
  getDate(arg0: any /*io.netty.handler.codec.http.HttpMessage*/, arg1: any /*java.util.Date*/): any /*java.util.Date*/;
  getDateHeader(
    arg0: any /*io.netty.handler.codec.http.HttpMessage*/,
    arg1: any /*java.lang.CharSequence*/
  ): any /*java.util.Date*/;
  getDateHeader(
    arg0: any /*io.netty.handler.codec.http.HttpMessage*/,
    arg1: any /*java.lang.CharSequence*/,
    arg2: any /*java.util.Date*/
  ): any /*java.util.Date*/;
  getDateHeader(arg0: any /*io.netty.handler.codec.http.HttpMessage*/, arg1: string): any /*java.util.Date*/;
  getDateHeader(
    arg0: any /*io.netty.handler.codec.http.HttpMessage*/,
    arg1: string,
    arg2: any /*java.util.Date*/
  ): any /*java.util.Date*/;
  getContentLength(arg0: any /*io.netty.handler.codec.http.HttpMessage*/): long;
  getContentLength(arg0: any /*io.netty.handler.codec.http.HttpMessage*/, arg1: long): long;
  addDateHeader(
    arg0: any /*io.netty.handler.codec.http.HttpMessage*/,
    arg1: any /*java.lang.CharSequence*/,
    arg2: any /*java.util.Date*/
  ): void;
  addDateHeader(
    arg0: any /*io.netty.handler.codec.http.HttpMessage*/,
    arg1: string,
    arg2: any /*java.util.Date*/
  ): void;
  addHeader(
    arg0: any /*io.netty.handler.codec.http.HttpMessage*/,
    arg1: any /*java.lang.CharSequence*/,
    arg2: any /*java.lang.Object*/
  ): void;
  addHeader(arg0: any /*io.netty.handler.codec.http.HttpMessage*/, arg1: string, arg2: any /*java.lang.Object*/): void;
  addIntHeader(
    arg0: any /*io.netty.handler.codec.http.HttpMessage*/,
    arg1: any /*java.lang.CharSequence*/,
    arg2: int
  ): void;
  addIntHeader(arg0: any /*io.netty.handler.codec.http.HttpMessage*/, arg1: string, arg2: int): void;
  clearHeaders(arg0: any /*io.netty.handler.codec.http.HttpMessage*/): void;
  encodeAscii(arg0: any /*java.lang.CharSequence*/, arg1: any /*io.netty.buffer.ByteBuf*/): void;
  removeHeader(arg0: any /*io.netty.handler.codec.http.HttpMessage*/, arg1: any /*java.lang.CharSequence*/): void;
  removeHeader(arg0: any /*io.netty.handler.codec.http.HttpMessage*/, arg1: string): void;
  removeTransferEncodingChunked(arg0: any /*io.netty.handler.codec.http.HttpMessage*/): void;
  set100ContinueExpected(arg0: any /*io.netty.handler.codec.http.HttpMessage*/): void;
  set100ContinueExpected(arg0: any /*io.netty.handler.codec.http.HttpMessage*/, arg1: boolean): void;
  setContentLength(arg0: any /*io.netty.handler.codec.http.HttpMessage*/, arg1: long): void;
  setDate(arg0: any /*io.netty.handler.codec.http.HttpMessage*/, arg1: any /*java.util.Date*/): void;
  setDateHeader(
    arg0: any /*io.netty.handler.codec.http.HttpMessage*/,
    arg1: any /*java.lang.CharSequence*/,
    arg2: java.lang.Iterable<any /*java.util.Date*/>
  ): void;
  setDateHeader(
    arg0: any /*io.netty.handler.codec.http.HttpMessage*/,
    arg1: any /*java.lang.CharSequence*/,
    arg2: any /*java.util.Date*/
  ): void;
  setDateHeader(
    arg0: any /*io.netty.handler.codec.http.HttpMessage*/,
    arg1: string,
    arg2: java.lang.Iterable<any /*java.util.Date*/>
  ): void;
  setDateHeader(
    arg0: any /*io.netty.handler.codec.http.HttpMessage*/,
    arg1: string,
    arg2: any /*java.util.Date*/
  ): void;
  setHeader(
    arg0: any /*io.netty.handler.codec.http.HttpMessage*/,
    arg1: any /*java.lang.CharSequence*/,
    arg2: java.lang.Iterable<any /*java.lang.Object*/>
  ): void;
  setHeader(
    arg0: any /*io.netty.handler.codec.http.HttpMessage*/,
    arg1: any /*java.lang.CharSequence*/,
    arg2: any /*java.lang.Object*/
  ): void;
  setHeader(
    arg0: any /*io.netty.handler.codec.http.HttpMessage*/,
    arg1: string,
    arg2: java.lang.Iterable<any /*java.lang.Object*/>
  ): void;
  setHeader(arg0: any /*io.netty.handler.codec.http.HttpMessage*/, arg1: string, arg2: any /*java.lang.Object*/): void;
  setHost(arg0: any /*io.netty.handler.codec.http.HttpMessage*/, arg1: any /*java.lang.CharSequence*/): void;
  setHost(arg0: any /*io.netty.handler.codec.http.HttpMessage*/, arg1: string): void;
  setIntHeader(
    arg0: any /*io.netty.handler.codec.http.HttpMessage*/,
    arg1: any /*java.lang.CharSequence*/,
    arg2: int
  ): void;
  setIntHeader(
    arg0: any /*io.netty.handler.codec.http.HttpMessage*/,
    arg1: any /*java.lang.CharSequence*/,
    arg2: java.lang.Iterable<int | null>
  ): void;
  setIntHeader(arg0: any /*io.netty.handler.codec.http.HttpMessage*/, arg1: string, arg2: int): void;
  setIntHeader(
    arg0: any /*io.netty.handler.codec.http.HttpMessage*/,
    arg1: string,
    arg2: java.lang.Iterable<int | null>
  ): void;
  setKeepAlive(arg0: any /*io.netty.handler.codec.http.HttpMessage*/, arg1: boolean): void;
  setTransferEncodingChunked(arg0: any /*io.netty.handler.codec.http.HttpMessage*/): void;
}

export const HttpHeaders: HttpHeadersStatic = Java.type("io.netty.handler.codec.http.HttpHeaders");

interface HttpProtocolBuilder$TypedConditionStatic {
  readonly class: any;
  new (
    arg0: any /*io.gatling.javaapi.http.internal.ScalaHttpProtocolBuilderConditions$Typed*/
  ): io.gatling.javaapi.http.HttpProtocolBuilder$TypedCondition;
}

export const HttpProtocolBuilder$TypedCondition: HttpProtocolBuilder$TypedConditionStatic = Java.type(
  "io.gatling.javaapi.http.HttpProtocolBuilder$TypedCondition"
);

interface HttpProtocolBuilder$UntypedConditionStatic {
  readonly class: any;
  new (
    arg0: any /*io.gatling.javaapi.http.internal.ScalaHttpProtocolBuilderConditions$Untyped*/
  ): io.gatling.javaapi.http.HttpProtocolBuilder$UntypedCondition;
}

export const HttpProtocolBuilder$UntypedCondition: HttpProtocolBuilder$UntypedConditionStatic = Java.type(
  "io.gatling.javaapi.http.HttpProtocolBuilder$UntypedCondition"
);

interface HttpProtocolBuilderStatic {
  readonly class: any;
  new (arg0: any /*io.gatling.http.protocol.HttpProtocolBuilder*/): io.gatling.javaapi.http.HttpProtocolBuilder;
}

export const HttpProtocolBuilder: HttpProtocolBuilderStatic = Java.type("io.gatling.javaapi.http.HttpProtocolBuilder");

interface HttpRequestActionBuilderStatic {
  readonly class: any;
  new (
    arg0: any /*io.gatling.http.request.builder.HttpRequestBuilder*/
  ): io.gatling.javaapi.http.HttpRequestActionBuilder;
}

export const HttpRequestActionBuilder: HttpRequestActionBuilderStatic = Java.type(
  "io.gatling.javaapi.http.HttpRequestActionBuilder"
);

interface HttpResponseStatusStatic {
  readonly class: any;
  new (arg0: int, arg1: string): io.netty.handler.codec.http.HttpResponseStatus;
  parseLine(arg0: any /*io.netty.util.AsciiString*/): io.netty.handler.codec.http.HttpResponseStatus;
  parseLine(arg0: any /*java.lang.CharSequence*/): io.netty.handler.codec.http.HttpResponseStatus;
  parseLine(arg0: string): io.netty.handler.codec.http.HttpResponseStatus;
  valueOf(arg0: int): io.netty.handler.codec.http.HttpResponseStatus;
  valueOf(arg0: int, arg1: string): io.netty.handler.codec.http.HttpResponseStatus;
}

export const HttpResponseStatus: HttpResponseStatusStatic = Java.type("io.netty.handler.codec.http.HttpResponseStatus");

interface HttpStatic {
  readonly class: any;
}

export const Http: HttpStatic = Java.type("io.gatling.javaapi.http.Http");

interface IterableStatic {
  readonly class: any;
  new <T>(arg0: java.lang.Iterable<T>): java.lang.Iterable<T>;
}

export const Iterable: IterableStatic = Java.type("java.lang.Iterable");

interface OpenInjectionStep$ConstantRateStatic {
  readonly class: any;
}

export const OpenInjectionStep$ConstantRate: OpenInjectionStep$ConstantRateStatic = Java.type(
  "io.gatling.javaapi.core.OpenInjectionStep$ConstantRate"
);

interface OpenInjectionStep$RampRateStatic {
  readonly class: any;
}

export const OpenInjectionStep$RampRate: OpenInjectionStep$RampRateStatic = Java.type(
  "io.gatling.javaapi.core.OpenInjectionStep$RampRate"
);

interface OpenInjectionStep$RampStatic {
  readonly class: any;
}

export const OpenInjectionStep$Ramp: OpenInjectionStep$RampStatic = Java.type(
  "io.gatling.javaapi.core.OpenInjectionStep$Ramp"
);

interface OpenInjectionStep$StairsStatic {
  readonly class: any;
}

export const OpenInjectionStep$Stairs: OpenInjectionStep$StairsStatic = Java.type(
  "io.gatling.javaapi.core.OpenInjectionStep$Stairs"
);

interface OpenInjectionStep$StressPeakStatic {
  readonly class: any;
}

export const OpenInjectionStep$StressPeak: OpenInjectionStep$StressPeakStatic = Java.type(
  "io.gatling.javaapi.core.OpenInjectionStep$StressPeak"
);

interface OpenInjectionStepStatic {
  readonly class: any;
  atOnceUsers(arg0: int): io.gatling.javaapi.core.OpenInjectionStep;
  nothingFor(arg0: java.time.Duration): io.gatling.javaapi.core.OpenInjectionStep;
}

export const OpenInjectionStep: OpenInjectionStepStatic = Java.type("io.gatling.javaapi.core.OpenInjectionStep");

interface OptionalStatic {
  readonly class: any;
  empty<T>(): java.util.Optional<T>;
  of<T>(arg0: T): java.util.Optional<T>;
  ofNullable<T>(arg0: T): java.util.Optional<T>;
}

export const Optional: OptionalStatic = Java.type("java.util.Optional");

interface PacesStatic {
  readonly class: any;
}

export const Paces: PacesStatic = Java.type("io.gatling.javaapi.core.pause.Paces");

interface PauseType$CustomStatic {
  readonly class: any;
}

export const PauseType$Custom: PauseType$CustomStatic = Java.type("io.gatling.javaapi.core.PauseType$Custom");

interface PauseType$NormalWithPercentageDurationStatic {
  readonly class: any;
}

export const PauseType$NormalWithPercentageDuration: PauseType$NormalWithPercentageDurationStatic = Java.type(
  "io.gatling.javaapi.core.PauseType$NormalWithPercentageDuration"
);

interface PauseType$NormalWithStdDevDurationStatic {
  readonly class: any;
}

export const PauseType$NormalWithStdDevDuration: PauseType$NormalWithStdDevDurationStatic = Java.type(
  "io.gatling.javaapi.core.PauseType$NormalWithStdDevDuration"
);

interface PauseType$UniformDurationStatic {
  readonly class: any;
  new (arg0: java.time.Duration): io.gatling.javaapi.core.PauseType$UniformDuration;
}

export const PauseType$UniformDuration: PauseType$UniformDurationStatic = Java.type(
  "io.gatling.javaapi.core.PauseType$UniformDuration"
);

interface PauseType$UniformPercentageStatic {
  readonly class: any;
}

export const PauseType$UniformPercentage: PauseType$UniformPercentageStatic = Java.type(
  "io.gatling.javaapi.core.PauseType$UniformPercentage"
);

interface PauseTypeStatic {
  readonly class: any;
}

export const PauseType: PauseTypeStatic = Java.type("io.gatling.javaapi.core.PauseType");

interface PausesStatic {
  readonly class: any;
}

export const Pauses: PausesStatic = Java.type("io.gatling.javaapi.core.pause.Pauses");

interface Polling$EveryStatic {
  readonly class: any;
  new (arg0: any /*io.gatling.http.request.builder.polling.PollingEveryStep*/): io.gatling.javaapi.http.Polling$Every;
}

export const Polling$Every: Polling$EveryStatic = Java.type("io.gatling.javaapi.http.Polling$Every");

interface PollingStatic {
  readonly class: any;
}

export const Polling: PollingStatic = Java.type("io.gatling.javaapi.http.Polling");

interface PopulationBuilderStatic {
  readonly class: any;
  new (arg0: any /*io.gatling.core.structure.PopulationBuilder*/): io.gatling.javaapi.core.PopulationBuilder;
}

export const PopulationBuilder: PopulationBuilderStatic = Java.type("io.gatling.javaapi.core.PopulationBuilder");

interface ProtocolBuilderStatic {
  readonly class: any;
}

export const ProtocolBuilder: ProtocolBuilderStatic = Java.type("io.gatling.javaapi.core.ProtocolBuilder");

interface ProxyStatic {
  readonly class: any;
}

export const Proxy: ProxyStatic = Java.type("io.gatling.javaapi.http.Proxy");

interface RampRate$DuringStatic {
  readonly class: any;
}

export const RampRate$During: RampRate$DuringStatic = Java.type(
  "io.gatling.javaapi.core.OpenInjectionStep$RampRate$During"
);

interface RampRate$RampRateOpenInjectionStepStatic {
  readonly class: any;
  atOnceUsers(arg0: int): io.gatling.javaapi.core.OpenInjectionStep;
  nothingFor(arg0: java.time.Duration): io.gatling.javaapi.core.OpenInjectionStep;
}

export const RampRate$RampRateOpenInjectionStep: RampRate$RampRateOpenInjectionStepStatic = Java.type(
  "io.gatling.javaapi.core.OpenInjectionStep$RampRate$RampRateOpenInjectionStep"
);

interface RandomSwitch$OnStatic {
  readonly class: any;
}

export const RandomSwitch$On: RandomSwitch$OnStatic = Java.type("io.gatling.javaapi.core.condition.RandomSwitch$On");

interface RandomSwitchOrElse$OnStatic {
  readonly class: any;
}

export const RandomSwitchOrElse$On: RandomSwitchOrElse$OnStatic = Java.type(
  "io.gatling.javaapi.core.condition.RandomSwitchOrElse$On"
);

interface RandomSwitchOrElse$OrElseStatic {
  readonly class: any;
}

export const RandomSwitchOrElse$OrElse: RandomSwitchOrElse$OrElseStatic = Java.type(
  "io.gatling.javaapi.core.condition.RandomSwitchOrElse$OrElse"
);

interface RandomSwitchOrElseStatic {
  readonly class: any;
}

export const RandomSwitchOrElse: RandomSwitchOrElseStatic = Java.type(
  "io.gatling.javaapi.core.condition.RandomSwitchOrElse"
);

interface RandomSwitchStatic {
  readonly class: any;
}

export const RandomSwitch: RandomSwitchStatic = Java.type("io.gatling.javaapi.core.condition.RandomSwitch");

interface RendezVousStatic {
  readonly class: any;
}

export const RendezVous: RendezVousStatic = Java.type("io.gatling.javaapi.core.pause.RendezVous");

interface Repeat$OnStatic {
  readonly class: any;
}

export const Repeat$On: Repeat$OnStatic = Java.type("io.gatling.javaapi.core.loop.Repeat$On");

interface RepeatStatic {
  readonly class: any;
}

export const Repeat: RepeatStatic = Java.type("io.gatling.javaapi.core.loop.Repeat");

interface RequestBodyStatic {
  readonly class: any;
}

export const RequestBody: RequestBodyStatic = Java.type("io.gatling.http.client.body.RequestBody");

interface RequestStatic {
  readonly class: any;
  new (
    arg0: string,
    arg1: any /*io.netty.handler.codec.http.HttpMethod*/,
    arg2: any /*io.gatling.http.client.uri.Uri*/,
    arg3: io.netty.handler.codec.http.HttpHeaders,
    arg4: java.util.List<any /*io.netty.handler.codec.http.cookie.Cookie*/>,
    arg5: io.gatling.http.client.body.RequestBody,
    arg6: long,
    arg7: boolean,
    arg8: any /*io.gatling.http.client.LocalAddresses*/,
    arg9: any /*io.gatling.http.client.realm.Realm*/,
    arg10: any /*io.gatling.http.client.proxy.ProxyServer*/,
    arg11: string,
    arg12: string,
    arg13: Func<io.gatling.http.client.Request, io.gatling.http.client.Request>,
    arg14: any /*io.gatling.http.client.resolver.InetAddressNameResolver*/,
    arg15: boolean,
    arg16: any /*io.gatling.http.client.Http2PriorKnowledge*/,
    arg17: string
  ): io.gatling.http.client.Request;
}

export const Request: RequestStatic = Java.type("io.gatling.http.client.Request");

interface ResponseBodyStatic {
  readonly class: any;
  apply(
    bodyLength: int,
    chunks: any /*scala.collection.immutable.List*/,
    charset: any /*java.nio.charset.Charset*/
  ): io.gatling.http.response.ResponseBody;
}

export const ResponseBody: ResponseBodyStatic = Java.type("io.gatling.http.response.ResponseBody");

interface ResponseStatic {
  readonly class: any;
  new (
    request: io.gatling.http.client.Request,
    startTimestamp: long,
    endTimestamp: long,
    status: io.netty.handler.codec.http.HttpResponseStatus,
    headers: io.netty.handler.codec.http.HttpHeaders,
    body: io.gatling.http.response.ResponseBody,
    checksums: any /*scala.collection.immutable.Map*/,
    isHttp2: boolean
  ): io.gatling.http.response.Response;
  apply(
    request: io.gatling.http.client.Request,
    startTimestamp: long,
    endTimestamp: long,
    status: io.netty.handler.codec.http.HttpResponseStatus,
    headers: io.netty.handler.codec.http.HttpHeaders,
    body: io.gatling.http.response.ResponseBody,
    checksums: any /*scala.collection.immutable.Map*/,
    isHttp2: boolean
  ): io.gatling.http.response.Response;
  curried(): any /*scala.Function1*/;
  tupled(): any /*scala.Function1*/;
  unapply(x$0: io.gatling.http.response.Response): any /*scala.Option*/;
}

export const Response: ResponseStatic = Java.type("io.gatling.http.response.Response");

interface RoundRobinSwitch$OnStatic {
  readonly class: any;
}

export const RoundRobinSwitch$On: RoundRobinSwitch$OnStatic = Java.type(
  "io.gatling.javaapi.core.condition.RoundRobinSwitch$On"
);

interface RoundRobinSwitchStatic {
  readonly class: any;
}

export const RoundRobinSwitch: RoundRobinSwitchStatic = Java.type("io.gatling.javaapi.core.condition.RoundRobinSwitch");

interface ScenarioBuilderStatic {
  readonly class: any;
}

export const ScenarioBuilder: ScenarioBuilderStatic = Java.type("io.gatling.javaapi.core.ScenarioBuilder");

interface SessionStatic {
  readonly class: any;
  new (arg0: any /*io.gatling.core.session.Session*/): io.gatling.javaapi.core.Session;
}

export const Session: SessionStatic = Java.type("io.gatling.javaapi.core.Session");

interface Simulation$SetUpStatic {
  readonly class: any;
}

export const Simulation$SetUp: Simulation$SetUpStatic = Java.type("io.gatling.javaapi.core.Simulation$SetUp");

interface SimulationStatic {
  readonly class: any;
  new (): io.gatling.javaapi.core.Simulation;
}

export const Simulation: SimulationStatic = Java.type("io.gatling.javaapi.core.Simulation");

interface SseAwaitActionBuilderStatic {
  readonly class: any;
}

export const SseAwaitActionBuilder: SseAwaitActionBuilderStatic = Java.type(
  "io.gatling.javaapi.http.SseAwaitActionBuilder"
);

interface SseConnectActionBuilderStatic {
  readonly class: any;
}

export const SseConnectActionBuilder: SseConnectActionBuilderStatic = Java.type(
  "io.gatling.javaapi.http.SseConnectActionBuilder"
);

interface SseMessageCheckStatic {
  readonly class: any;
  new (arg0: any /*io.gatling.http.check.sse.SseMessageCheck*/): io.gatling.javaapi.http.SseMessageCheck;
}

export const SseMessageCheck: SseMessageCheckStatic = Java.type("io.gatling.javaapi.http.SseMessageCheck");

interface SseSetCheckActionBuilderStatic {
  readonly class: any;
}

export const SseSetCheckActionBuilder: SseSetCheckActionBuilderStatic = Java.type(
  "io.gatling.javaapi.http.SseSetCheckActionBuilder"
);

interface SseStatic {
  readonly class: any;
}

export const Sse: SseStatic = Java.type("io.gatling.javaapi.http.Sse");

interface Stairs$CompositeStatic {
  readonly class: any;
  atOnceUsers(arg0: int): io.gatling.javaapi.core.OpenInjectionStep;
  nothingFor(arg0: java.time.Duration): io.gatling.javaapi.core.OpenInjectionStep;
}

export const Stairs$Composite: Stairs$CompositeStatic = Java.type(
  "io.gatling.javaapi.core.OpenInjectionStep$Stairs$Composite"
);

interface Stairs$TimesStatic {
  readonly class: any;
}

export const Stairs$Times: Stairs$TimesStatic = Java.type("io.gatling.javaapi.core.OpenInjectionStep$Stairs$Times");

interface StreamStatic {
  readonly class: any;
  builder(): any /*java.util.stream.Stream$Builder*/;
  concat<T>(arg0: java.util.stream.Stream<T>, arg1: java.util.stream.Stream<T>): java.util.stream.Stream<T>;
  empty<T>(): java.util.stream.Stream<T>;
  generate<T>(arg0: Supplier<T>): java.util.stream.Stream<T>;
  iterate<T>(arg0: T, arg1: Predicate<T>, arg2: UnaryOperator<T>): java.util.stream.Stream<T>;
  iterate<T>(arg0: T, arg1: UnaryOperator<T>): java.util.stream.Stream<T>;
  of<T>(arg0: T): java.util.stream.Stream<T>;
  of<T>(...arg0: T[]): java.util.stream.Stream<T>;
  ofNullable<T>(arg0: T): java.util.stream.Stream<T>;
}

export const Stream: StreamStatic = Java.type("java.util.stream.Stream");

interface StringStatic {
  readonly class: any;
  new (arg0: any /*java.lang.StringBuilder*/): string;
  new (arg0: bytearray, arg1: int, arg2: int, arg3: any /*java.nio.charset.Charset*/): string;
  new (arg0: bytearray, arg1: string): string;
  new (arg0: bytearray, arg1: any /*java.nio.charset.Charset*/): string;
  new (arg0: bytearray, arg1: int, arg2: int): string;
  new (arg0: bytearray): string;
  new (arg0: any /*java.lang.StringBuffer*/): string;
  new (arg0: chararray, arg1: int, arg2: int): string;
  new (arg0: chararray): string;
  new (arg0: string): string;
  new (): string;
  new (arg0: bytearray, arg1: int, arg2: int, arg3: string): string;
  new (arg0: bytearray, arg1: int): string;
  new (arg0: bytearray, arg1: int, arg2: int, arg3: int): string;
  new (arg0: [int], arg1: int, arg2: int): string;
  copyValueOf(arg0: chararray): string;
  copyValueOf(arg0: chararray, arg1: int, arg2: int): string;
  format(arg0: string, ...arg1: any /*java.lang.Object*/[]): string;
  format(arg0: any /*java.util.Locale*/, arg1: string, ...arg2: any /*java.lang.Object*/[]): string;
  join(arg0: any /*java.lang.CharSequence*/, ...arg1: any /*java.lang.CharSequence*/[]): string;
  join(arg0: any /*java.lang.CharSequence*/, arg1: java.lang.Iterable<any /*java.lang.CharSequence*/>): string;
  valueOf(arg0: boolean): string;
  valueOf(arg0: any /*char*/): string;
  valueOf(arg0: chararray): string;
  valueOf(arg0: chararray, arg1: int, arg2: int): string;
  valueOf(arg0: double): string;
  valueOf(arg0: float): string;
  valueOf(arg0: int): string;
  valueOf(arg0: any /*java.lang.Object*/): string;
  valueOf(arg0: long): string;
}

export const String: StringStatic = Java.type("java.lang.String");

interface StructureBuilderStatic {
  readonly class: any;
}

export const StructureBuilder: StructureBuilderStatic = Java.type("io.gatling.javaapi.core.StructureBuilder");

interface SystemStatic {
  readonly class: any;
  console(): any /*java.io.Console*/;
  getSecurityManager(): any /*java.lang.SecurityManager*/;
  clearProperty(arg0: string): string;
  getProperty(arg0: string): string;
  getProperty(arg0: string, arg1: string): string;
  getenv(arg0: string): string;
  lineSeparator(): string;
  setProperty(arg0: string, arg1: string): string;
  getLogger(arg0: string): any /*java.lang.System$Logger*/;
  getLogger(arg0: string, arg1: any /*java.util.ResourceBundle*/): any /*java.lang.System$Logger*/;
  inheritedChannel(): any /*java.nio.channels.Channel*/;
  getenv(): java.util.Map<string, string>;
  getProperties(): any /*java.util.Properties*/;
  identityHashCode(arg0: any /*java.lang.Object*/): int;
  mapLibraryName(arg0: string): string;
  currentTimeMillis(): long;
  nanoTime(): long;
  arraycopy(arg0: any /*java.lang.Object*/, arg1: int, arg2: any /*java.lang.Object*/, arg3: int, arg4: int): void;
  exit(arg0: int): void;
  gc(): void;
  load(arg0: string): void;
  loadLibrary(arg0: string): void;
  runFinalization(): void;
  setErr(arg0: any /*java.io.PrintStream*/): void;
  setIn(arg0: any /*java.io.InputStream*/): void;
  setOut(arg0: any /*java.io.PrintStream*/): void;
  setProperties(arg0: any /*java.util.Properties*/): void;
  setSecurityManager(arg0: any /*java.lang.SecurityManager*/): void;
}

export const System: SystemStatic = Java.type("java.lang.System");

interface TemporalUnitStatic {
  readonly class: any;
}

export const TemporalUnit: TemporalUnitStatic = Java.type("java.time.temporal.TemporalUnit");

interface ThrottleStep$ReachIntermediateStatic {
  readonly class: any;
}

export const ThrottleStep$ReachIntermediate: ThrottleStep$ReachIntermediateStatic = Java.type(
  "io.gatling.javaapi.core.ThrottleStep$ReachIntermediate"
);

interface ThrottleStepStatic {
  readonly class: any;
}

export const ThrottleStep: ThrottleStepStatic = Java.type("io.gatling.javaapi.core.ThrottleStep");

interface UniformRandomSwitch$OnStatic {
  readonly class: any;
}

export const UniformRandomSwitch$On: UniformRandomSwitch$OnStatic = Java.type(
  "io.gatling.javaapi.core.condition.UniformRandomSwitch$On"
);

interface UniformRandomSwitchStatic {
  readonly class: any;
}

export const UniformRandomSwitch: UniformRandomSwitchStatic = Java.type(
  "io.gatling.javaapi.core.condition.UniformRandomSwitch"
);

interface WithKey$ThenStatic {
  readonly class: any;
  new (arg0: any /*java.lang.Object*/): io.gatling.javaapi.core.WithKey$Then;
}

export const WithKey$Then: WithKey$ThenStatic = Java.type("io.gatling.javaapi.core.Choice$WithKey$Then");

interface WithWeight$ThenStatic {
  readonly class: any;
  new (arg0: double): io.gatling.javaapi.core.WithWeight$Then;
}

export const WithWeight$Then: WithWeight$ThenStatic = Java.type("io.gatling.javaapi.core.Choice$WithWeight$Then");

interface WsAwaitActionBuilderStatic {
  readonly class: any;
}

export const WsAwaitActionBuilder: WsAwaitActionBuilderStatic = Java.type(
  "io.gatling.javaapi.http.WsAwaitActionBuilder"
);

interface WsFrameCheckStatic {
  readonly class: any;
}

export const WsFrameCheck: WsFrameCheckStatic = Java.type("io.gatling.javaapi.http.WsFrameCheck");

interface WsSendBinaryActionBuilderStatic {
  readonly class: any;
}

export const WsSendBinaryActionBuilder: WsSendBinaryActionBuilderStatic = Java.type(
  "io.gatling.javaapi.http.WsSendBinaryActionBuilder"
);

interface WsSendTextActionBuilderStatic {
  readonly class: any;
}

export const WsSendTextActionBuilder: WsSendTextActionBuilderStatic = Java.type(
  "io.gatling.javaapi.http.WsSendTextActionBuilder"
);

interface WsStatic {
  readonly class: any;
}

export const Ws: WsStatic = Java.type("io.gatling.javaapi.http.Ws");
