import { type IconifyIcon } from "@iconify/react";
import type { PlateEditor } from "platejs/react";

export type Group = {
	group: string;
	items: {
		icon: IconifyIcon | string;
		value: string;
		onSelect: (editor: PlateEditor, value: string) => void;
		className?: string;
		focusEditor?: boolean;
		keywords?: string[];
		label?: string;
	}[];
};
