import { BlockMenuPlugin } from '@platejs/selection/react'

import { BlockSelectionKit } from './components/block-selection-kit'
import { BlockContextMenu } from './menus/block-context-menu'

export const BlockMenuKit = [
  ...BlockSelectionKit,
  BlockMenuPlugin.configure({
    render: { aboveEditable: BlockContextMenu },
  }),
]
