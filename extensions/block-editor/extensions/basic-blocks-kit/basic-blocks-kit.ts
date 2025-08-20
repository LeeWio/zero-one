import {
  BlockquotePlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
  H4Plugin,
  H5Plugin,
  H6Plugin,
  HorizontalRulePlugin,
} from '@platejs/basic-nodes/react'
import { ParagraphPlugin } from 'platejs/react'

import {
  H1Element,
  H2Element,
  H3Element,
  H4Element,
  H5Element,
  H6Element,
} from './componets/heading-node'
import { HrElement } from './componets/hr-node'
import { ParagraphElement } from './componets/paragraph-node'
import { BlockquoteElement } from './componets/blockquote-node'

/**
 * BasicBlocksKit
 *
 * A collection of basic block-level plugins for Plate editor.
 * Each plugin defines:
 *   - A custom React component for rendering
 *   - Behavior rules (e.g. reset on break)
 *   - Keyboard shortcuts for toggling block types
 *
 * This kit can be imported into your editor configuration
 * to enable headings, paragraphs, blockquotes, and horizontal rules.
 */
export const BasicBlocksKit = [
  // Paragraph plugin with custom <ParagraphElement />
  ParagraphPlugin.withComponent(ParagraphElement),

  // Heading level 1 plugin
  H1Plugin.configure({
    node: { component: H1Element },
    rules: { break: { empty: 'reset' } }, // reset to paragraph when pressing Enter in empty H1
    shortcuts: { toggle: { keys: 'mod+alt+1' } }, // keyboard shortcut: ⌘/Ctrl + Alt + 1
  }),

  // Heading level 2 plugin
  H2Plugin.configure({
    node: { component: H2Element },
    rules: { break: { empty: 'reset' } },
    shortcuts: { toggle: { keys: 'mod+alt+2' } },
  }),

  // Heading level 3 plugin
  H3Plugin.configure({
    node: { component: H3Element },
    rules: { break: { empty: 'reset' } },
    shortcuts: { toggle: { keys: 'mod+alt+3' } },
  }),

  // Heading level 4 plugin
  H4Plugin.configure({
    node: { component: H4Element },
    rules: { break: { empty: 'reset' } },
    shortcuts: { toggle: { keys: 'mod+alt+4' } },
  }),

  // Heading level 5 plugin
  H5Plugin.configure({
    node: { component: H5Element },
    rules: { break: { empty: 'reset' } },
    shortcuts: { toggle: { keys: 'mod+alt+5' } },
  }),

  // Heading level 6 plugin
  H6Plugin.configure({
    node: { component: H6Element },
    rules: { break: { empty: 'reset' } },
    shortcuts: { toggle: { keys: 'mod+alt+6' } },
  }),

  // Blockquote plugin
  BlockquotePlugin.configure({
    node: { component: BlockquoteElement },
    shortcuts: { toggle: { keys: 'mod+shift+period' } }, // shortcut: ⌘/Ctrl + ⇧ + .
  }),

  // Horizontal rule plugin with custom <HrElement />
  HorizontalRulePlugin.withComponent(HrElement),
]
