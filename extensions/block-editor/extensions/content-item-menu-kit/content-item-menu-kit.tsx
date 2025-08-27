import { BlockMenuPlugin } from "@platejs/selection/react";

import { BlockSelectionKit } from "./components/block-selection-kit";

import { ContentItemMenu } from "../../menus/content-item-menu/content-item-menu";

export const ContentItemMenuKit = [
  ...BlockSelectionKit,
  BlockMenuPlugin.configure({
    render: { aboveEditable: ContentItemMenu },
  }),
];
