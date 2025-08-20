'use client'

import React from 'react'

import { Plate, PlateContent } from 'platejs/react'
import { useBlockEditor } from '@/hooks/use-block-editor'

import { EditorContainer, Editor, EditorView } from '@/components/block-editor/block-editor'
import { Button } from '@heroui/button'

export default function Home() {
  const { editor } = useBlockEditor()

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Button onPress={() => editor.tf.h1.toggle()}>H1</Button>
      <Plate editor={editor}>
        <EditorContainer>
          <Editor variant="demo" />
        </EditorContainer>
      </Plate>
    </section>
  )
}
