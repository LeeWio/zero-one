import { LinkPlugin } from "@platejs/link/react";
import { LinkElement } from "./components/link-node";
import { LinkMenu } from "../../menus/link-menu/link-menu";

export const LinkKit = [
  LinkPlugin.configure({
    render: {
      node: LinkElement,
      afterEditable: () => <LinkMenu />,
    },
  }),
];
