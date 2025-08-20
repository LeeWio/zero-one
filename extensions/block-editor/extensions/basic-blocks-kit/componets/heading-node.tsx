import * as React from 'react'

import type { PlateElementProps } from 'platejs/react'

import { PlateElement } from 'platejs/react'
import { type VariantProps, tv } from 'tailwind-variants'

const headingVariants = tv({
  base: 'relative mb-1',
  variants: {
    variant: {
      h1: 'mt-[1.6em] mb-6 pb-1 font-heading text-4xl font-bold',
      h2: 'mt-[1.4em] mb-4 pb-px font-heading text-2xl font-semibold tracking-tight',
      h3: 'mt-[1em] mb-3 pb-px font-heading text-xl font-semibold tracking-tight',
      h4: 'mt-[0.75em] mb-2 font-heading text-lg font-semibold tracking-tight',
      h5: 'mt-[0.75em] mb-2 text-lg font-semibold',
      h6: 'mt-[0.75em] mb-1 text-base font-semibold',
    },
  },
})

export function HeadingElement({
  variant = 'h1',
  ...props
}: PlateElementProps & VariantProps<typeof headingVariants>) {
  return (
    <PlateElement as={variant!} className={headingVariants({ variant })} {...props}>
      {props.children}
    </PlateElement>
  )
}

export function H1Element(props: PlateElementProps) {
  return <HeadingElement variant="h1" {...props} />
}

export function H2Element(props: PlateElementProps) {
  return <HeadingElement variant="h2" {...props} />
}

export function H3Element(props: PlateElementProps) {
  return <HeadingElement variant="h3" {...props} />
}

export function H4Element(props: PlateElementProps) {
  return <HeadingElement variant="h4" {...props} />
}

export function H5Element(props: PlateElementProps) {
  return <HeadingElement variant="h5" {...props} />
}

export function H6Element(props: PlateElementProps) {
  return <HeadingElement variant="h6" {...props} />
}
