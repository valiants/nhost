import { GetLabelForTypeOptions, getLabelForType } from '../helpers'
import { UnionOrIntersectionType } from '../types'

export type UnionOrIntersectionTypeFragmentOptions = {
  /**
   * Determines whether or not to wrap the fragment in a markdown code block.
   *
   * @default true
   */
  wrap?: boolean
  /**
   * Original name of the type. This is going to be prepended to the code block
   * if wrap is `true`.
   *
   * @default undefined
   */
  originalName?: string
}

/**
 * Creates a union or intersection type documentation fragment.
 *
 * @param unionOrIntersection - Union or intersection type for which to create
 * the documentation
 * @param options - Options to customize the fragment
 * @param labelOptions - Options to customize the label
 * @returns Union or intersection type documentation fragment
 */
export const UnionOrIntersectionTypeFragment = (
  unionOrIntersection: UnionOrIntersectionType,
  { wrap = true, originalName }: UnionOrIntersectionTypeFragmentOptions = {},
  labelOptions: GetLabelForTypeOptions = {}
): string => {
  if (!unionOrIntersection.types || unionOrIntersection.types.length === 0) {
    return ''
  }

  const content = unionOrIntersection.types
    // note: we would not able to provide references for types that are wrapped
    // in a code block because of markdown limitations
    .map((type) => getLabelForType(type, { reference: false, ...labelOptions }))
    .join(unionOrIntersection.type === 'union' ? ` | ` : ' & ')

  if (wrap) {
    return `\`\`\`ts
${originalName ? `type ${originalName} = ` : ``}${content.replace(/`/gi, '')}
\`\`\``.trim()
  }

  return `${content.replace(/\|/gi, '|')}`
}

export default UnionOrIntersectionTypeFragment
