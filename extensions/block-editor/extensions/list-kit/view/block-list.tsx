import React from 'react'

import type { TListElement } from 'platejs'

import { isOrderedList } from '@platejs/list'
import { useTodoListElement, useTodoListElementState } from '@platejs/list/react'
import { type PlateElementProps, type RenderNodeWrapper, useReadOnly } from 'platejs/react'

import { cn } from '@heroui/theme'
import { Checkbox } from '@heroui/checkbox'

const config: Record<
  string,
  {
    Li: React.FC<PlateElementProps>
    Marker: React.FC<PlateElementProps>
  }
> = {
  todo: {
    Li: TodoLi,
    Marker: TodoMarker,
  },
}

export const BlockList: RenderNodeWrapper = (props) => {
  if (!props.element.listStyleType) return

  return (props) => <List {...props} />
}

function List(props: PlateElementProps) {
  const { listStart, listStyleType } = props.element as TListElement
  const { Li, Marker } = config[listStyleType] ?? {}
  const List = isOrderedList(props.element) ? 'ol' : 'ul'

  return (
    <List className="relative ml-2 p-0" style={{ listStyleType }} start={listStart}>
      {Marker && <Marker {...props} />}
      {Li ? <Li {...props} /> : <li>{props.children}</li>}
    </List>
  )
}

function TodoMarker(props: PlateElementProps) {
  const state = useTodoListElementState({ element: props.element })
  const { checkboxProps } = useTodoListElement(state)
  const readOnly = useReadOnly()

  return (
    <div contentEditable={false}>
      <Checkbox
        isSelected={checkboxProps.checked}
        onValueChange={checkboxProps.onCheckedChange}
        onMouseDown={checkboxProps.onMouseDown}
        lineThrough
        color="danger"
        className={cn('absolute  top-1 -left-7', readOnly && 'pointer-events-none')}
      />
    </div>
  )
}

function TodoLi(props: PlateElementProps) {
  return (
    <li
      className={cn(
        'list-none',
        (props.element.checked as boolean) && 'text-muted-foreground line-through'
      )}
    >
      {props.children}
    </li>
  )
}
