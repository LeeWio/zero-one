import {
  BoldPlugin,
  CodePlugin,
  HighlightPlugin,
  ItalicPlugin,
  KbdPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from '@platejs/basic-nodes/react'

import { CodeLeaf } from './components/code-node'
import { HighlightLeaf } from './components/highight-node'
import { KbdLeaf } from './components/kbd-node'

/**
 * BasicMarksKit
 *
 * A collection of inline formatting plugins (marks) for Plate editor.
 * Marks are text-level styles (like bold, italic, underline),
 * applied to specific ranges of text instead of whole blocks.
 *
 * This kit includes common text decorations such as:
 *   - bold, italic, underline
 *   - code, strikethrough
 *   - subscript, superscript
 *   - highlight, keyboard input (kbd)
 */
export const BasicMarksKit = [
  // Bold text (⌘/Ctrl + B by default)
  BoldPlugin,

  // Italic text (⌘/Ctrl + I by default)
  ItalicPlugin,

  // Underlined text (⌘/Ctrl + U by default)
  UnderlinePlugin,

  // Inline code mark with custom renderer <CodeLeaf />
  CodePlugin.configure({
    node: { component: CodeLeaf },
    shortcuts: { toggle: { keys: 'mod+e' } }, // toggle inline code with ⌘/Ctrl + E
  }),

  // Strikethrough text (⌘/Ctrl + ⇧ + X)
  StrikethroughPlugin.configure({
    shortcuts: { toggle: { keys: 'mod+shift+x' } },
  }),

  // Subscript text (⌘/Ctrl + ,)
  SubscriptPlugin.configure({
    shortcuts: { toggle: { keys: 'mod+comma' } },
  }),

  // Superscript text (⌘/Ctrl + .)
  SuperscriptPlugin.configure({
    shortcuts: { toggle: { keys: 'mod+period' } },
  }),

  // Highlighted text with custom renderer <HighlightLeaf />
  HighlightPlugin.configure({
    node: { component: HighlightLeaf },
    shortcuts: { toggle: { keys: 'mod+shift+h' } }, // ⌘/Ctrl + ⇧ + H
  }),

  // Keyboard input mark (e.g., <kbd>⌘C</kbd>) with custom renderer <KbdLeaf />
  KbdPlugin.withComponent(KbdLeaf),
]
