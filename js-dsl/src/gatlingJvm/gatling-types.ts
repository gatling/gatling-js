/*
 * Project: java2typescript - https://github.com/bsorrentino/java2typescript
 *
 * Author: bsorrentino
 *
 * TYPESCRIPT EXPORTED DECLARATIONS
 *
 */
/// <reference path="gatling.d.ts"/>

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

interface AssertionStatic {
  readonly class: any;
}

export const Assertion: AssertionStatic = Java.type("io.gatling.javaapi.core.Assertion");

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

interface CheckBuilderStatic {
  readonly class: any;
}

export const CheckBuilder: CheckBuilderStatic = Java.type("io.gatling.javaapi.core.CheckBuilder");

interface ChoiceStatic {
  readonly class: any;
  withKey(
    arg0: any /*java.lang.Object*/,
    arg1: io.gatling.javaapi.core.ChainBuilder
  ): any /*io.gatling.javaapi.core.Choice$WithKey*/;
  withWeight(
    arg0: double,
    arg1: io.gatling.javaapi.core.ChainBuilder
  ): any /*io.gatling.javaapi.core.Choice$WithWeight*/;
}

export const Choice: ChoiceStatic = Java.type("io.gatling.javaapi.core.Choice");

interface ClosedInjectionStepStatic {
  readonly class: any;
}

export const ClosedInjectionStep: ClosedInjectionStepStatic = Java.type("io.gatling.javaapi.core.ClosedInjectionStep");

interface CollectionsStatic {
  readonly class: any;
  checkedCollection<E>(arg0: java.util.Collection<E>, arg1: java.lang.Class<E>): java.util.Collection<E>;
  checkedList<E>(arg0: java.util.List<E>, arg1: java.lang.Class<E>): java.util.List<E>;
  checkedNavigableSet<E>(
    arg0: any /*java.util.NavigableSet*/,
    arg1: java.lang.Class<E>
  ): any /*java.util.NavigableSet*/;
  emptyNavigableSet(): any /*java.util.NavigableSet*/;
  checkedQueue<E>(arg0: any /*java.util.Queue*/, arg1: java.lang.Class<E>): any /*java.util.Queue*/;
  checkedSet<E>(arg0: java.util.Set<E>, arg1: java.lang.Class<E>): java.util.Set<E>;
  newSetFromMap<E>(arg0: java.util.Map<E, boolean | null>): java.util.Set<E>;
  checkedSortedSet<E>(arg0: any /*java.util.SortedSet*/, arg1: java.lang.Class<E>): any /*java.util.SortedSet*/;
  emptySortedSet(): any /*java.util.SortedSet*/;
  checkedMap<K, V>(arg0: java.util.Map<K, V>, arg1: java.lang.Class<K>, arg2: java.lang.Class<V>): java.util.Map<K, V>;
  singletonMap<K, V>(arg0: K, arg1: V): java.util.Map<K, V>;
  synchronizedMap<K, V>(arg0: java.util.Map<K, V>): java.util.Map<K, V>;
  unmodifiableMap<K, V>(arg0: java.util.Map<K, V>): java.util.Map<K, V>;
  checkedNavigableMap<K, V>(
    arg0: any /*java.util.NavigableMap*/,
    arg1: java.lang.Class<K>,
    arg2: java.lang.Class<V>
  ): any /*java.util.NavigableMap*/;
  synchronizedNavigableMap(arg0: any /*java.util.NavigableMap*/): any /*java.util.NavigableMap*/;
  unmodifiableNavigableMap(arg0: any /*java.util.NavigableMap*/): any /*java.util.NavigableMap*/;
  checkedSortedMap<K, V>(
    arg0: any /*java.util.SortedMap*/,
    arg1: java.lang.Class<K>,
    arg2: java.lang.Class<V>
  ): any /*java.util.SortedMap*/;
  synchronizedSortedMap(arg0: any /*java.util.SortedMap*/): any /*java.util.SortedMap*/;
  unmodifiableSortedMap(arg0: any /*java.util.SortedMap*/): any /*java.util.SortedMap*/;
  sort<T>(arg0: java.util.List<T>): void;
  max<T>(arg0: java.util.Collection<T>): T;
  min<T>(arg0: java.util.Collection<T>): T;
  max<T>(arg0: java.util.Collection<T>, arg1: any /*java.util.Comparator*/): T;
  min<T>(arg0: java.util.Collection<T>, arg1: any /*java.util.Comparator*/): T;
  addAll<T>(arg0: java.util.Collection<T>, ...arg1: T[]): boolean;
  replaceAll<T>(arg0: java.util.List<T>, arg1: T, arg2: T): boolean;
  binarySearch<T>(arg0: java.util.List<T>, arg1: T, arg2: any /*java.util.Comparator*/): int;
  binarySearch<T>(arg0: java.util.List<java.lang.Comparable<T>>, arg1: T): int;
  list(arg0: any /*java.util.Enumeration*/): any /*java.util.ArrayList*/;
  synchronizedCollection<T>(arg0: java.util.Collection<T>): java.util.Collection<T>;
  unmodifiableCollection<T>(arg0: java.util.Collection<T>): java.util.Collection<T>;
  reverseOrder(): any /*java.util.Comparator*/;
  reverseOrder(arg0: any /*java.util.Comparator*/): any /*java.util.Comparator*/;
  emptyEnumeration(): any /*java.util.Enumeration*/;
  enumeration<T>(arg0: java.util.Collection<T>): any /*java.util.Enumeration*/;
  emptyIterator<T>(): java.util.Iterator<T>;
  nCopies<T>(arg0: int, arg1: T): java.util.List<T>;
  singletonList<T>(arg0: T): java.util.List<T>;
  synchronizedList<T>(arg0: java.util.List<T>): java.util.List<T>;
  unmodifiableList<T>(arg0: java.util.List<T>): java.util.List<T>;
  emptyListIterator(): any /*java.util.ListIterator*/;
  synchronizedNavigableSet(arg0: any /*java.util.NavigableSet*/): any /*java.util.NavigableSet*/;
  unmodifiableNavigableSet(arg0: any /*java.util.NavigableSet*/): any /*java.util.NavigableSet*/;
  asLifoQueue(arg0: any /*java.util.Deque*/): any /*java.util.Queue*/;
  singleton<T>(arg0: T): java.util.Set<T>;
  synchronizedSet<T>(arg0: java.util.Set<T>): java.util.Set<T>;
  unmodifiableSet<T>(arg0: java.util.Set<T>): java.util.Set<T>;
  synchronizedSortedSet(arg0: any /*java.util.SortedSet*/): any /*java.util.SortedSet*/;
  unmodifiableSortedSet(arg0: any /*java.util.SortedSet*/): any /*java.util.SortedSet*/;
  copy<T>(arg0: java.util.List<T>, arg1: java.util.List<T>): void;
  fill<T>(arg0: java.util.List<T>, arg1: T): void;
  sort<T>(arg0: java.util.List<T>, arg1: any /*java.util.Comparator*/): void;
  disjoint(
    arg0: java.util.Collection<any /*java.lang.Object*/>,
    arg1: java.util.Collection<any /*java.lang.Object*/>
  ): boolean;
  emptyMap<K, V>(): java.util.Map<K, V>;
  emptyNavigableMap(): any /*java.util.NavigableMap*/;
  emptySortedMap(): any /*java.util.SortedMap*/;
  emptyList<T>(): java.util.List<T>;
  emptySet<T>(): java.util.Set<T>;
  frequency(arg0: java.util.Collection<any /*java.lang.Object*/>, arg1: any /*java.lang.Object*/): int;
  indexOfSubList(arg0: java.util.List<any /*java.lang.Object*/>, arg1: java.util.List<any /*java.lang.Object*/>): int;
  lastIndexOfSubList(
    arg0: java.util.List<any /*java.lang.Object*/>,
    arg1: java.util.List<any /*java.lang.Object*/>
  ): int;
  reverse(arg0: java.util.List<any /*java.lang.Object*/>): void;
  rotate(arg0: java.util.List<any /*java.lang.Object*/>, arg1: int): void;
  shuffle(arg0: java.util.List<any /*java.lang.Object*/>): void;
  shuffle(arg0: java.util.List<any /*java.lang.Object*/>, arg1: any /*java.util.Random*/): void;
  swap(arg0: java.util.List<any /*java.lang.Object*/>, arg1: int, arg2: int): void;
}

export const Collections: CollectionsStatic = Java.type("java.util.Collections");

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
  nothingFor(arg0: any /*java.time.Duration*/): io.gatling.javaapi.core.OpenInjectionStep;
}

export const ConstantRate$ConstantRateOpenInjectionStep: ConstantRate$ConstantRateOpenInjectionStepStatic = Java.type(
  "io.gatling.javaapi.core.OpenInjectionStep$ConstantRate$ConstantRateOpenInjectionStep"
);

interface CoreDslStatic {
  readonly class: any;
  details(...arg0: string[]): any /*io.gatling.javaapi.core.Assertion$WithPath*/;
  forAll(): any /*io.gatling.javaapi.core.Assertion$WithPath*/;
  global(): any /*io.gatling.javaapi.core.Assertion$WithPath*/;
  InputStreamBody(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.io.InputStream*/>
  ): io.gatling.javaapi.core.Body;
  ByteArrayBody(arg0: bytearray): any /*io.gatling.javaapi.core.Body$WithBytes*/;
  ByteArrayBody(arg0: string): any /*io.gatling.javaapi.core.Body$WithBytes*/;
  ByteArrayBody(arg0: Func<io.gatling.javaapi.core.Session, bytearray>): any /*io.gatling.javaapi.core.Body$WithBytes*/;
  RawFileBody(arg0: string): any /*io.gatling.javaapi.core.Body$WithBytes*/;
  RawFileBody(arg0: Func<io.gatling.javaapi.core.Session, string>): any /*io.gatling.javaapi.core.Body$WithBytes*/;
  ElFileBody(arg0: string): any /*io.gatling.javaapi.core.Body$WithString*/;
  ElFileBody(arg0: Func<io.gatling.javaapi.core.Session, string>): any /*io.gatling.javaapi.core.Body$WithString*/;
  PebbleFileBody(arg0: string): any /*io.gatling.javaapi.core.Body$WithString*/;
  PebbleFileBody(arg0: Func<io.gatling.javaapi.core.Session, string>): any /*io.gatling.javaapi.core.Body$WithString*/;
  PebbleStringBody(arg0: string): any /*io.gatling.javaapi.core.Body$WithString*/;
  StringBody(arg0: string): any /*io.gatling.javaapi.core.Body$WithString*/;
  StringBody(arg0: Func<io.gatling.javaapi.core.Session, string>): any /*io.gatling.javaapi.core.Body$WithString*/;
  exec(arg0: io.gatling.javaapi.core.ActionBuilder): io.gatling.javaapi.core.ChainBuilder;
  exec(...arg0: io.gatling.javaapi.core.ChainBuilder[]): io.gatling.javaapi.core.ChainBuilder;
  exec(arg0: java.util.List<io.gatling.javaapi.core.ChainBuilder>): io.gatling.javaapi.core.ChainBuilder;
  exec(
    arg0: Func<io.gatling.javaapi.core.Session, io.gatling.javaapi.core.Session>
  ): io.gatling.javaapi.core.ChainBuilder;
  exitBlockOnFail(arg0: io.gatling.javaapi.core.ChainBuilder): io.gatling.javaapi.core.ChainBuilder;
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
  pace(arg0: any /*java.time.Duration*/): io.gatling.javaapi.core.ChainBuilder;
  pace(arg0: any /*java.time.Duration*/, arg1: string): io.gatling.javaapi.core.ChainBuilder;
  pace(arg0: any /*java.time.Duration*/, arg1: any /*java.time.Duration*/): io.gatling.javaapi.core.ChainBuilder;
  pace(
    arg0: any /*java.time.Duration*/,
    arg1: any /*java.time.Duration*/,
    arg2: string
  ): io.gatling.javaapi.core.ChainBuilder;
  pace(arg0: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>): io.gatling.javaapi.core.ChainBuilder;
  pace(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>,
    arg1: string
  ): io.gatling.javaapi.core.ChainBuilder;
  pace(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>
  ): io.gatling.javaapi.core.ChainBuilder;
  pace(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>,
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
  pause(arg0: any /*java.time.Duration*/): io.gatling.javaapi.core.ChainBuilder;
  pause(
    arg0: any /*java.time.Duration*/,
    arg1: io.gatling.javaapi.core.PauseType
  ): io.gatling.javaapi.core.ChainBuilder;
  pause(arg0: any /*java.time.Duration*/, arg1: any /*java.time.Duration*/): io.gatling.javaapi.core.ChainBuilder;
  pause(
    arg0: any /*java.time.Duration*/,
    arg1: any /*java.time.Duration*/,
    arg2: io.gatling.javaapi.core.PauseType
  ): io.gatling.javaapi.core.ChainBuilder;
  pause(arg0: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>): io.gatling.javaapi.core.ChainBuilder;
  pause(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>,
    arg1: io.gatling.javaapi.core.PauseType
  ): io.gatling.javaapi.core.ChainBuilder;
  pause(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>
  ): io.gatling.javaapi.core.ChainBuilder;
  pause(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>,
    arg2: io.gatling.javaapi.core.PauseType
  ): io.gatling.javaapi.core.ChainBuilder;
  pause(arg0: long): io.gatling.javaapi.core.ChainBuilder;
  pause(arg0: long, arg1: io.gatling.javaapi.core.PauseType): io.gatling.javaapi.core.ChainBuilder;
  pause(arg0: long, arg1: long): io.gatling.javaapi.core.ChainBuilder;
  pause(arg0: long, arg1: long, arg2: io.gatling.javaapi.core.PauseType): io.gatling.javaapi.core.ChainBuilder;
  rendezVous(arg0: int): io.gatling.javaapi.core.ChainBuilder;
  stopInjector(arg0: string): io.gatling.javaapi.core.ChainBuilder;
  stopInjector(arg0: Func<io.gatling.javaapi.core.Session, string>): io.gatling.javaapi.core.ChainBuilder;
  stopInjectorIf(arg0: string, arg1: string): io.gatling.javaapi.core.ChainBuilder;
  stopInjectorIf(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, boolean | null>
  ): io.gatling.javaapi.core.ChainBuilder;
  stopInjectorIf(
    arg0: Func<io.gatling.javaapi.core.Session, string>,
    arg1: string
  ): io.gatling.javaapi.core.ChainBuilder;
  stopInjectorIf(
    arg0: Func<io.gatling.javaapi.core.Session, string>,
    arg1: Func<io.gatling.javaapi.core.Session, boolean | null>
  ): io.gatling.javaapi.core.ChainBuilder;
  regex(arg0: string): any /*io.gatling.javaapi.core.CheckBuilder$CaptureGroupCheckBuilder*/;
  regex(
    arg0: Func<io.gatling.javaapi.core.Session, string>
  ): any /*io.gatling.javaapi.core.CheckBuilder$CaptureGroupCheckBuilder*/;
  css(arg0: string, arg1: string): any /*io.gatling.javaapi.core.CheckBuilder$CssOfTypeMultipleFind*/;
  css(
    arg0: Func<io.gatling.javaapi.core.Session, string>,
    arg1: string
  ): any /*io.gatling.javaapi.core.CheckBuilder$CssOfTypeMultipleFind*/;
  bodyBytes(): any /*io.gatling.javaapi.core.CheckBuilder$Find*/;
  bodyStream(): any /*io.gatling.javaapi.core.CheckBuilder$Find*/;
  bodyLength(): any /*io.gatling.javaapi.core.CheckBuilder$Find*/;
  responseTimeInMillis(): any /*io.gatling.javaapi.core.CheckBuilder$Find*/;
  bodyString(): any /*io.gatling.javaapi.core.CheckBuilder$Find*/;
  md5(): any /*io.gatling.javaapi.core.CheckBuilder$Find*/;
  sha1(): any /*io.gatling.javaapi.core.CheckBuilder$Find*/;
  jmesPath(arg0: string): any /*io.gatling.javaapi.core.CheckBuilder$JsonOfTypeFind*/;
  jmesPath(
    arg0: Func<io.gatling.javaapi.core.Session, string>
  ): any /*io.gatling.javaapi.core.CheckBuilder$JsonOfTypeFind*/;
  jsonpJmesPath(arg0: string): any /*io.gatling.javaapi.core.CheckBuilder$JsonOfTypeFind*/;
  jsonpJmesPath(
    arg0: Func<io.gatling.javaapi.core.Session, string>
  ): any /*io.gatling.javaapi.core.CheckBuilder$JsonOfTypeFind*/;
  jsonPath(arg0: string): any /*io.gatling.javaapi.core.CheckBuilder$JsonOfTypeMultipleFind*/;
  jsonPath(
    arg0: Func<io.gatling.javaapi.core.Session, string>
  ): any /*io.gatling.javaapi.core.CheckBuilder$JsonOfTypeMultipleFind*/;
  jsonpJsonPath(arg0: string): any /*io.gatling.javaapi.core.CheckBuilder$JsonOfTypeMultipleFind*/;
  jsonpJsonPath(
    arg0: Func<io.gatling.javaapi.core.Session, string>
  ): any /*io.gatling.javaapi.core.CheckBuilder$JsonOfTypeMultipleFind*/;
  substring(arg0: string): any /*io.gatling.javaapi.core.CheckBuilder$MultipleFind*/;
  substring(
    arg0: Func<io.gatling.javaapi.core.Session, string>
  ): any /*io.gatling.javaapi.core.CheckBuilder$MultipleFind*/;
  css(arg0: string): any /*io.gatling.javaapi.core.CheckBuilder$MultipleFind*/;
  css(arg0: Func<io.gatling.javaapi.core.Session, string>): any /*io.gatling.javaapi.core.CheckBuilder$MultipleFind*/;
  xpath(arg0: string): any /*io.gatling.javaapi.core.CheckBuilder$MultipleFind*/;
  xpath(arg0: string, arg1: java.util.Map<string, string>): any /*io.gatling.javaapi.core.CheckBuilder$MultipleFind*/;
  xpath(arg0: Func<io.gatling.javaapi.core.Session, string>): any /*io.gatling.javaapi.core.CheckBuilder$MultipleFind*/;
  xpath(
    arg0: Func<io.gatling.javaapi.core.Session, string>,
    arg1: java.util.Map<string, string>
  ): any /*io.gatling.javaapi.core.CheckBuilder$MultipleFind*/;
  form(arg0: string): any /*io.gatling.javaapi.core.CheckBuilder$MultipleFind*/;
  form(arg0: Func<io.gatling.javaapi.core.Session, string>): any /*io.gatling.javaapi.core.CheckBuilder$MultipleFind*/;
  constantConcurrentUsers(arg0: int): any /*io.gatling.javaapi.core.ClosedInjectionStep$Constant*/;
  rampConcurrentUsers(arg0: int): any /*io.gatling.javaapi.core.ClosedInjectionStep$Ramp*/;
  incrementConcurrentUsers(arg0: int): any /*io.gatling.javaapi.core.ClosedInjectionStep$Stairs*/;
  csv(arg0: string): any /*io.gatling.javaapi.core.FeederBuilder$Batchable*/;
  csv(arg0: string, arg1: any /*char*/): any /*io.gatling.javaapi.core.FeederBuilder$Batchable*/;
  separatedValues(arg0: string, arg1: any /*char*/): any /*io.gatling.javaapi.core.FeederBuilder$Batchable*/;
  separatedValues(
    arg0: string,
    arg1: any /*char*/,
    arg2: any /*char*/
  ): any /*io.gatling.javaapi.core.FeederBuilder$Batchable*/;
  ssv(arg0: string): any /*io.gatling.javaapi.core.FeederBuilder$Batchable*/;
  ssv(arg0: string, arg1: any /*char*/): any /*io.gatling.javaapi.core.FeederBuilder$Batchable*/;
  tsv(arg0: string): any /*io.gatling.javaapi.core.FeederBuilder$Batchable*/;
  tsv(arg0: string, arg1: any /*char*/): any /*io.gatling.javaapi.core.FeederBuilder$Batchable*/;
  jsonFile(arg0: string): any /*io.gatling.javaapi.core.FeederBuilder$FileBased*/;
  arrayFeeder(
    arg0: [java.util.Map<string, any /*java.lang.Object*/>]
  ): io.gatling.javaapi.core.FeederBuilder<any /*java.lang.Object*/>;
  jsonUrl(arg0: string): io.gatling.javaapi.core.FeederBuilder<any /*java.lang.Object*/>;
  listFeeder(
    arg0: java.util.List<java.util.Map<string, any /*java.lang.Object*/>>
  ): io.gatling.javaapi.core.FeederBuilder<any /*java.lang.Object*/>;
  AllowList(...arg0: string[]): any /*io.gatling.javaapi.core.Filter$AllowList*/;
  AllowList(arg0: java.util.List<string>): any /*io.gatling.javaapi.core.Filter$AllowList*/;
  DenyList(...arg0: string[]): any /*io.gatling.javaapi.core.Filter$DenyList*/;
  DenyList(arg0: java.util.List<string>): any /*io.gatling.javaapi.core.Filter$DenyList*/;
  atOnceUsers(arg0: int): io.gatling.javaapi.core.OpenInjectionStep;
  nothingFor(arg0: any /*java.time.Duration*/): io.gatling.javaapi.core.OpenInjectionStep;
  nothingFor(arg0: long): io.gatling.javaapi.core.OpenInjectionStep;
  constantUsersPerSec(arg0: double): io.gatling.javaapi.core.OpenInjectionStep$ConstantRate;
  rampUsers(arg0: int): any /*io.gatling.javaapi.core.OpenInjectionStep$Ramp*/;
  rampUsersPerSec(arg0: double): any /*io.gatling.javaapi.core.OpenInjectionStep$RampRate*/;
  incrementUsersPerSec(arg0: double): any /*io.gatling.javaapi.core.OpenInjectionStep$Stairs*/;
  stressPeakUsers(arg0: int): any /*io.gatling.javaapi.core.OpenInjectionStep$StressPeak*/;
  customPauses(arg0: Func<io.gatling.javaapi.core.Session, long | null>): io.gatling.javaapi.core.PauseType;
  normalPausesWithPercentageDuration(arg0: double): io.gatling.javaapi.core.PauseType;
  normalPausesWithStdDevDuration(arg0: any /*java.time.Duration*/): io.gatling.javaapi.core.PauseType;
  uniformPausesPlusOrMinusDuration(arg0: any /*java.time.Duration*/): io.gatling.javaapi.core.PauseType;
  uniformPausesPlusOrMinusPercentage(arg0: double): io.gatling.javaapi.core.PauseType;
  scenario(arg0: string): io.gatling.javaapi.core.ScenarioBuilder;
  holdFor(arg0: any /*java.time.Duration*/): io.gatling.javaapi.core.ThrottleStep;
  holdFor(arg0: long): io.gatling.javaapi.core.ThrottleStep;
  jumpToRps(arg0: int): io.gatling.javaapi.core.ThrottleStep;
  reachRps(arg0: int): any /*io.gatling.javaapi.core.ThrottleStep$ReachIntermediate*/;
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
  tryMax(arg0: int): any /*io.gatling.javaapi.core.error.Errors$TryMax*/;
  tryMax(arg0: int, arg1: string): any /*io.gatling.javaapi.core.error.Errors$TryMax*/;
  tryMax(arg0: string): any /*io.gatling.javaapi.core.error.Errors$TryMax*/;
  tryMax(arg0: string, arg1: string): any /*io.gatling.javaapi.core.error.Errors$TryMax*/;
  tryMax(arg0: Func<io.gatling.javaapi.core.Session, int | null>): any /*io.gatling.javaapi.core.error.Errors$TryMax*/;
  tryMax(
    arg0: Func<io.gatling.javaapi.core.Session, int | null>,
    arg1: string
  ): any /*io.gatling.javaapi.core.error.Errors$TryMax*/;
  group(arg0: string): any /*io.gatling.javaapi.core.group.Groups$On*/;
  group(arg0: Func<io.gatling.javaapi.core.Session, string>): any /*io.gatling.javaapi.core.group.Groups$On*/;
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
    arg1: any /*java.time.Duration*/
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: string,
    arg1: any /*java.time.Duration*/,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: string,
    arg1: any /*java.time.Duration*/,
    arg2: string
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: string,
    arg1: any /*java.time.Duration*/,
    arg2: string,
    arg3: boolean
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>,
    arg2: string
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>,
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
    arg1: any /*java.time.Duration*/
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: any /*java.time.Duration*/,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: any /*java.time.Duration*/,
    arg2: string
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: any /*java.time.Duration*/,
    arg2: string,
    arg3: boolean
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>,
    arg2: string
  ): io.gatling.javaapi.core.loop.AsLongAsDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  asLongAsDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>,
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
    arg1: any /*java.time.Duration*/
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: string,
    arg1: any /*java.time.Duration*/,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: string,
    arg1: any /*java.time.Duration*/,
    arg2: string
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: string,
    arg1: any /*java.time.Duration*/,
    arg2: string,
    arg3: boolean
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>,
    arg2: string
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>,
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
    arg1: any /*java.time.Duration*/
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: any /*java.time.Duration*/,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: any /*java.time.Duration*/,
    arg2: string
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: any /*java.time.Duration*/,
    arg2: string,
    arg3: boolean
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>,
    arg2: string
  ): io.gatling.javaapi.core.loop.DoWhileDuring$On<io.gatling.javaapi.core.ChainBuilder>;
  doWhileDuring(
    arg0: Func<io.gatling.javaapi.core.Session, boolean | null>,
    arg1: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>,
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
  during(
    arg0: any /*java.time.Duration*/
  ): io.gatling.javaapi.core.loop.During$On<io.gatling.javaapi.core.ChainBuilder>;
  during(
    arg0: any /*java.time.Duration*/,
    arg1: boolean
  ): io.gatling.javaapi.core.loop.During$On<io.gatling.javaapi.core.ChainBuilder>;
  during(
    arg0: any /*java.time.Duration*/,
    arg1: string
  ): io.gatling.javaapi.core.loop.During$On<io.gatling.javaapi.core.ChainBuilder>;
  during(
    arg0: any /*java.time.Duration*/,
    arg1: string,
    arg2: boolean
  ): io.gatling.javaapi.core.loop.During$On<io.gatling.javaapi.core.ChainBuilder>;
  during(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>
  ): io.gatling.javaapi.core.loop.During$On<io.gatling.javaapi.core.ChainBuilder>;
  during(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>,
    arg1: boolean
  ): io.gatling.javaapi.core.loop.During$On<io.gatling.javaapi.core.ChainBuilder>;
  during(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>,
    arg1: string
  ): io.gatling.javaapi.core.loop.During$On<io.gatling.javaapi.core.ChainBuilder>;
  during(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.time.Duration*/>,
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

interface During$OnStatic {
  readonly class: any;
}

export const During$On: During$OnStatic = Java.type("io.gatling.javaapi.core.loop.During$On");

interface DuringStatic {
  readonly class: any;
}

export const During: DuringStatic = Java.type("io.gatling.javaapi.core.loop.During");

interface ErrorsStatic {
  readonly class: any;
}

export const Errors: ErrorsStatic = Java.type("io.gatling.javaapi.core.error.Errors");

interface ExecsStatic {
  readonly class: any;
}

export const Execs: ExecsStatic = Java.type("io.gatling.javaapi.core.exec.Execs");

interface FeederBuilderStatic {
  readonly class: any;
}

export const FeederBuilder: FeederBuilderStatic = Java.type("io.gatling.javaapi.core.FeederBuilder");

interface FeedsStatic {
  readonly class: any;
}

export const Feeds: FeedsStatic = Java.type("io.gatling.javaapi.core.feed.Feeds");

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
  currentLocationRegex(arg0: string): any /*io.gatling.javaapi.core.CheckBuilder$CaptureGroupCheckBuilder*/;
  headerRegex(
    arg0: any /*java.lang.CharSequence*/,
    arg1: string
  ): any /*io.gatling.javaapi.core.CheckBuilder$CaptureGroupCheckBuilder*/;
  headerRegex(
    arg0: any /*java.lang.CharSequence*/,
    arg1: Func<io.gatling.javaapi.core.Session, string>
  ): any /*io.gatling.javaapi.core.CheckBuilder$CaptureGroupCheckBuilder*/;
  headerRegex(arg0: string, arg1: string): any /*io.gatling.javaapi.core.CheckBuilder$CaptureGroupCheckBuilder*/;
  headerRegex(
    arg0: string,
    arg1: Func<io.gatling.javaapi.core.Session, string>
  ): any /*io.gatling.javaapi.core.CheckBuilder$CaptureGroupCheckBuilder*/;
  headerRegex(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.lang.CharSequence*/>,
    arg1: string
  ): any /*io.gatling.javaapi.core.CheckBuilder$CaptureGroupCheckBuilder*/;
  headerRegex(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.lang.CharSequence*/>,
    arg1: Func<io.gatling.javaapi.core.Session, string>
  ): any /*io.gatling.javaapi.core.CheckBuilder$CaptureGroupCheckBuilder*/;
  status(): any /*io.gatling.javaapi.core.CheckBuilder$Find*/;
  currentLocation(): any /*io.gatling.javaapi.core.CheckBuilder$Find*/;
  header(arg0: any /*java.lang.CharSequence*/): any /*io.gatling.javaapi.core.CheckBuilder$MultipleFind*/;
  header(arg0: string): any /*io.gatling.javaapi.core.CheckBuilder$MultipleFind*/;
  header(
    arg0: Func<io.gatling.javaapi.core.Session, any /*java.lang.CharSequence*/>
  ): any /*io.gatling.javaapi.core.CheckBuilder$MultipleFind*/;
  sitemap(arg0: string): any /*io.gatling.javaapi.core.FeederBuilder$FileBased*/;
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

interface OpenInjectionStepStatic {
  readonly class: any;
  atOnceUsers(arg0: int): io.gatling.javaapi.core.OpenInjectionStep;
  nothingFor(arg0: any /*java.time.Duration*/): io.gatling.javaapi.core.OpenInjectionStep;
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

interface PauseTypeStatic {
  readonly class: any;
}

export const PauseType: PauseTypeStatic = Java.type("io.gatling.javaapi.core.PauseType");

interface PausesStatic {
  readonly class: any;
}

export const Pauses: PausesStatic = Java.type("io.gatling.javaapi.core.pause.Pauses");

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

interface RequestActionBuilderStatic {
  readonly class: any;
}

export const RequestActionBuilder: RequestActionBuilderStatic = Java.type(
  "io.gatling.javaapi.http.RequestActionBuilder"
);

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
  new (arg0: any /*java.lang.StringBuffer*/): string;
  new (arg0: any /*java.lang.StringBuilder*/): string;
  new (arg0: bytearray, arg1: int, arg2: int, arg3: any /*java.nio.charset.Charset*/): string;
  new (arg0: bytearray, arg1: string): string;
  new (arg0: bytearray, arg1: any /*java.nio.charset.Charset*/): string;
  new (arg0: bytearray, arg1: int, arg2: int): string;
  new (arg0: bytearray): string;
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
