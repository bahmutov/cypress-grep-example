type TupleUnion<U extends string, R extends any[] = []> = {
  [S in U]: Exclude<U, S> extends never
    ? [...R, S]
    : TupleUnion<Exclude<U, S>, [...R, S]>
}[U]

type EnsureAllKeys<T extends string> = TupleUnion<`${T}`>

// generate the full list of allowed test tags from the enum "AllowedTag"
// Tip: see https://stackoverflow.com/questions/77321714/ensuring-all-enum-keys-are-present-in-an-array-in-typescript
// for the explanation of the EnsureAllKeys type and how to apply it to the ambient (global) const enum AllowedTag
// Check yourself: TS should complain if the array has more values then the enum
// or if the array has less values then the enum
export const ValidTestTags: EnsureAllKeys<keyof typeof AllowedTag> = [
  '@smoke',
  '@misc',
  '@new-todo',
]
