import { createPlatePlugin } from 'platejs/react'
import { FloatingToolbar } from './view/floating-toolbar'

export const FloatingToolbarKit = [
  createPlatePlugin({
    key: 'floating-toolbar',
    render: {
      afterEditable: () => (
        <FloatingToolbar>
          <div>adsf</div>
        </FloatingToolbar>
      ),
    },
  }),
]
