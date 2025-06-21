export abstract class Collection<T> {
  // biome-ignore lint/style/noParameterProperties: <explanation>
  constructor(readonly value: T[]) {}
}
