type TupleUnion<U extends string, R extends any[] = []> = {
  [S in U]: Exclude<U, S> extends never
    ? [...R, S]
    : TupleUnion<Exclude<U, S>, [...R, S]>
}[U]

// a utility type that ensures that all keys of the enum are present in the array
// to use:
//  `EnsureAllKeys<keyof typeof AllowedTag>`
//  this returns a type that is an array with _exactly_ the same values as the enum
type EnsureAllKeys<T extends string> = TupleUnion<`${T}`>

// generate and export the full list of allowed test tags from the enum "AllowedTag"
// call this export "ValidTestTags"
// Tip: see https://stackoverflow.com/questions/77321714/ensuring-all-enum-keys-are-present-in-an-array-in-typescript
// for the explanation of the EnsureAllKeys type and how to apply it to the ambient (global) const enum AllowedTag
// Check yourself: TS should complain if the array has more values then the enum
// or if the array has less values then the enum
export const ValidTestTags: EnsureAllKeys<keyof typeof AllowedTag> = [
  '@smoke',
  '@misc',
  '@new-todo',
]
