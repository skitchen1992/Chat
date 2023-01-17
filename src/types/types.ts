import Block from "../utils/Block";

export interface ComponentConstructable<P extends Record<string, any>> {
  new(props: P): Block<P>;
}
