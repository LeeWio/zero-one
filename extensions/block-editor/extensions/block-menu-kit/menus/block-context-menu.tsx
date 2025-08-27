import { useState, useCallback } from 'react'

import { AIChatPlugin } from '@platejs/ai/react'
import {
  BLOCK_CONTEXT_MENU_ID,
  BlockMenuPlugin,
  BlockSelectionPlugin,
} from '@platejs/selection/react'
import { KEYS } from 'platejs'
import { useEditorPlugin, usePlateState } from 'platejs/react'
import { useIsTouchDevice } from '@/hooks/use-is-touch-device'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/dropdown'
import { Button } from '@heroui/button'

type Value = 'askAI' | null
export const BlockContextMenu = ({ children }: { children: React.ReactNode }) => {
  const { api, editor } = useEditorPlugin(BlockMenuPlugin)

  const [value, setValue] = useState<Value>(null)
  const isTouch = useIsTouchDevice()
  const [readOnly] = usePlateState('readOnly')

  const handleTurnInto = useCallback(
    (type: string) => {
      editor
        .getApi(BlockSelectionPlugin)
        .blockSelection.getNodes()
        .forEach(([node, path]) => {
          if (node[KEYS.listType]) {
            editor.tf.unsetNodes([KEYS.listType, 'indent'], {
              at: path,
            })
          }

          editor.tf.toggleBlock(type, { at: path })
        })
    },
    [editor]
  )

  const handleAlign = useCallback(
    (align: 'center' | 'left' | 'right') => {
      editor.getTransforms(BlockSelectionPlugin).blockSelection.setNodes({ align })
    },
    [editor]
  )

  if (isTouch) {
    return children
  }
  return (
    <Dropdown
      onOpenChange={(open) => {
        if (!open) {
          setTimeout(() => {
            api.blockMenu.hide()
          }, 0)
        }
      }}
    >
      <DropdownTrigger>
        <div className="w-full">{children}</div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        onClose={() => {
          editor.getApi(BlockSelectionPlugin).blockSelection.focus()

          if (value === 'askAI') {
            editor.getApi(AIChatPlugin).aiChat.show()
          }

          setValue(null)
        }}
      ></DropdownMenu>
    </Dropdown>
  )
}
