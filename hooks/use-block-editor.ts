import { usePlateEditor } from 'platejs/react'
import { ExtensionKit } from '@/extensions/block-editor/extensions/extension-kit'

export const useBlockEditor = () => {
  const editor = usePlateEditor({
    /**
     * Array of plugins to be loaded into the editor. Plugins extend the editor's
     * functionality and define custom behavior.
     */
    plugins: ExtensionKit,
  })

  return { editor }
}
