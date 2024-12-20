// we define a constant array with the only valid test tags for this project
export const TestTags = ['@smoke', '@misc', '@new-todo'] as const
// and form the type from this test tags array
export type TestTag = (typeof TestTags)[number]
