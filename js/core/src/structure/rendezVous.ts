import { Duration, toJvmDuration } from "../utils/duration";

import JvmRendezVous = io.gatling.javaapi.core.pause.RendezVous;

export interface RendezVousFunction<T extends RendezVous<T>> {
  /**
   * Make virtual users wait until enough of them reach this point. The rendezVous re-arms after
   * releasing a batch, so the next virtual users wait for the next complete batch.
   *
   * @param users - the number of virtual users that must reach this point
   * @returns a new StructureBuilder
   */
  (users: number): T;

  /**
   * Make virtual users wait until enough of them reach this point, or until the timeout expires.
   * The timeout starts when the first virtual user of a batch arrives. On expiry, the waiting
   * virtual users are released even if the batch is incomplete. The rendezVous re-arms after
   * releasing a batch.
   *
   * @param users - the number of virtual users that must reach this point
   * @param timeout - the maximum time to wait for the batch to complete, a number of seconds or a
   *   Duration
   * @returns a new StructureBuilder
   */
  (users: number, timeout: Duration): T;
}

export interface RendezVous<T extends RendezVous<T>> {
  rendezVous: RendezVousFunction<T>;
}

export const rendezVousImpl =
  <J2, J1 extends JvmRendezVous<J2, any>, T extends RendezVous<T>>(
    jvmRendezVous: J1,
    wrap: (wrapped: J2) => T
  ): RendezVousFunction<T> =>
  (users: number, timeout?: Duration) =>
    wrap(
      timeout === undefined ? jvmRendezVous.rendezVous(users) : jvmRendezVous.rendezVous(users, toJvmDuration(timeout))
    );
