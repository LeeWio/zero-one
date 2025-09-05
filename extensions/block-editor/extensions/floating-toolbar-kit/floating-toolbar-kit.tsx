import { createPlatePlugin } from "platejs/react";
import { FloatingToolbar } from "./view/floating-toolbar";
import { LinkMenu } from "../../menus/link-menu";
import { TextMenu } from "../../menus/text-menu/text-menu";

export const FloatingToolbarKit = [
	createPlatePlugin({
		key: "floating-toolbar",
		render: {
			afterEditable: () => (
				<FloatingToolbar>
					<TextMenu />
				</FloatingToolbar>
			),
		},
	}),
];
