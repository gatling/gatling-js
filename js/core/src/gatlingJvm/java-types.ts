import { Duration as JvmDuration } from "@gatling.io/jvm-types";

export type TimeUnit = "milliseconds" | "seconds" | "minutes";

export const toJvmDuration = (duration: number, timeUnit?: TimeUnit): java.time.Duration => {
  switch (timeUnit) {
    case "milliseconds":
      return JvmDuration.ofMillis(duration);
    case "seconds":
      return JvmDuration.ofSeconds(duration);
    case "minutes":
      return JvmDuration.ofMinutes(duration);
    default:
      return JvmDuration.ofSeconds(duration);
  }
};
