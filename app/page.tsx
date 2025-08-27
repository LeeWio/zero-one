"use client";

import React from "react";

import { Plate, PlateContent } from "platejs/react";
import { useBlockEditor } from "@/hooks/use-block-editor";
import { insertColumnGroup, toggleColumnGroup } from "@platejs/layout";
import {
  EditorContainer,
  Editor,
} from "@/components/block-editor/block-editor";
import { Button } from "@heroui/button";
import { insertDate } from "@platejs/date";

export default function Home() {
  const { editor } = useBlockEditor();
  console.log(editor.children);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
      <Button
        onPress={() => insertColumnGroup(editor, { columns: 3, select: true })}
      >
        H1
      </Button>
      <Button onPress={() => console.log(editor.children)}>a</Button>
      <Button onPress={() => insertDate(editor, { select: true })}>date</Button>

      <Plate editor={editor}>
        <EditorContainer>
          <Editor variant="demo" />
        </EditorContainer>
      </Plate>
    </section>
  );
}
