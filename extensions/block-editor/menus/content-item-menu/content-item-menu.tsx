import { useIsTouchDevice } from "@/hooks/use-is-touch-device";
import {
  BlockMenuPlugin,
  BlockSelectionPlugin,
} from "@platejs/selection/react";
import { useEditorPlugin, usePlateState } from "platejs/react";
import { ReactNode, useCallback, useState } from "react";
import { KEYS } from "platejs";
import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";

type Value = "askAI" | null;

export function ContentItemMenu({ children }: { children: ReactNode }) {
  const { api, editor } = useEditorPlugin(BlockMenuPlugin);
  const [value, setValue] = useState<Value>(null);
  const isTouch = useIsTouchDevice();
  const [readOnly] = usePlateState("readOnly");

  const handleTurnInto = useCallback(
    (type: string) => {
      editor
        .getApi(BlockSelectionPlugin)
        .blockSelection.getNodes()
        .forEach(([node, path]) => {
          if (node[KEYS.listType]) {
            editor.tf.unsetNodes([KEYS.listType, "indent"], {
              at: path,
            });
          }
          editor.tf.toggleBlock(type, { at: path });
        });
    },
    [editor],
  );

  const handleAlign = useCallback(
    (align: "center" | "left" | "right") => {
      editor
        .getTransforms(BlockSelectionPlugin)
        .blockSelection.setNodes({ align });
    },
    [editor],
  );

  if (isTouch) {
    return children;
  }

  // return (
  //   <Dropdown>
  //     <DropdownTrigger>
  //       <Button variant="light">Open Menu</Button>
  //     </DropdownTrigger>
  //     <DropdownMenu arial-label="Static Actions">
  //       <DropdownItem key="new">New file</DropdownItem>
  //     </DropdownMenu>
  //   </Dropdown>
  // );
  return <>adf</>;
}
