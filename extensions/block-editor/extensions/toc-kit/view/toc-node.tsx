import { useTocElement, useTocElementState } from '@platejs/toc/react'
import { PlateElement, PlateElementProps } from 'platejs/react'
import { Button } from '@heroui/button'
import { tv } from '@heroui/theme'

export const headingItemVariants = tv({
  base: 'block h-auto w-full cursor-pointer truncate rounded-none px-0.5 py-1.5 text-left font-medium text-muted-foreground underline decoration-[0.5px] underline-offset-4 hover:bg-accent hover:text-muted-foreground',
  variants: {
    depth: {
      1: 'pl-0.5',
      2: 'pl-[26px]',
      3: 'pl-[50px]',
    },
  },
  defaultVariants: {
    depth: 1,
  },
})

export const TocElement = (props: PlateElementProps) => {
  const state = useTocElementState()
  const { props: btnProps } = useTocElement(state)
  const { headingList } = state

  return (
    <PlateElement {...props} className="mb-1 p-0">
      <div contentEditable={false}>
        {headingList.length > 0 ? (
          headingList.map((item) => (
            <Button
              key={item.id}
              radius="md"
              variant="light"
              className={headingItemVariants({
                depth: item.depth as 1 | 2 | 3,
              })}
              onMouseEnter={(e) => btnProps.onClick(e, item, 'smooth')}
              aria-current
            >
              {item.title}
            </Button>
          ))
        ) : (
          <div className="text-sm text-gray-500">
            Create a heading to display the table of contents.
          </div>
        )}
      </div>
      {props.children}
    </PlateElement>
  )
}
