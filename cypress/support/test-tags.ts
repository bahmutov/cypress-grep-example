type TupleUnion<U extends string, R extends any[] = []> = {
  [S in U]: Exclude<U, S> extends never
    ? [...R, S]
    : TupleUnion<Exclude<U, S>, [...R, S]>
}[U]

type EnsureAllKeys<T extends string> = TupleUnion<`${T}`>

export const ValidTestTags: EnsureAllKeys<keyof typeof AllowedTag> = [
  '@smoke',
  '@misc',
  '@new-todo',
]
