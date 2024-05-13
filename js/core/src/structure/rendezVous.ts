import JvmRendezVous = io.gatling.javaapi.core.pause.RendezVous;

export interface RendezVousFunction<T extends RendezVous<T>> {
  /**
   * Make virtual users wait until enough of them reach this point
   *
   * @param users - the number of virtual users that must reach this point
   * @returns a new StructureBuilder
   */
  (users: number): T;
}

export interface RendezVous<T extends RendezVous<T>> {
  rendezVous: RendezVousFunction<T>;
}

export const rendezVousImpl =
  <J2, J1 extends JvmRendezVous<J2, any>, T extends RendezVous<T>>(
    jvmRendezVous: J1,
    wrap: (wrapped: J2) => T
  ): RendezVousFunction<T> =>
  (users: number) =>
    wrap(jvmRendezVous.rendezVous(users));
