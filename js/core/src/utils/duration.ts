import { Duration as JvmDuration } from "@gatling.io/jvm-types";

export type TimeUnit = "milliseconds" | "seconds" | "minutes";

export type Duration =
  | number
  | {
      amount: number;
      unit: TimeUnit;
    };

export const isDuration = (x: unknown): x is Duration =>
  typeof x === "number" ||
  (typeof x === "object" && typeof (x as any).amount === "number" && typeof (x as any).unit === "string");

export const toJvmDuration = (duration: Duration): java.time.Duration => {
  const { amount, unit } = typeof duration === "number" ? { amount: duration, unit: "seconds" } : duration;
  switch (unit) {
    case "milliseconds":
      return JvmDuration.ofMillis(amount);
    case "seconds":
      return JvmDuration.ofSeconds(amount);
    case "minutes":
      return JvmDuration.ofMinutes(amount);
    default:
      return JvmDuration.ofSeconds(amount);
  }
};
