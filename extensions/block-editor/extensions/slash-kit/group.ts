import { KEYS } from "platejs";
import { AIChatPlugin } from "@platejs/ai/react";

import {
	insertBlock,
	insertInlineElement,
} from "@/extensions/block-editor/transforms";

import { Group } from "./type";

export const groups: Group[] = [
	{
		group: "AI",
		items: [
			{
				focusEditor: false,
				icon: "lucide:sparkles",
				value: "AI",
				onSelect: (editor) => {
					editor.getApi(AIChatPlugin).aiChat.show();
				},
			},
		],
	},
	{
		group: "Basic blocks",
		items: [
			{
				icon: "lucide:pilcrow",
				keywords: ["paragraph"],
				label: "Text",
				value: KEYS.p,
			},
			{
				icon: "lucide:heading-1",
				keywords: ["title", "h1"],
				label: "Heading 1",
				value: KEYS.h1,
			},
			{
				icon: "lucide:heading-2",
				keywords: ["subtitle", "h2"],
				label: "Heading 2",
				value: KEYS.h2,
			},
			{
				icon: "lucide:heading-3",
				keywords: ["subtitle", "h3"],
				label: "Heading 3",
				value: KEYS.h3,
			},
			{
				icon: "lucide:list",
				keywords: ["unordered", "ul", "-"],
				label: "Bulleted list",
				value: KEYS.ul,
			},
			{
				icon: "lucide:list-ordered",
				keywords: ["ordered", "ol", "1"],
				label: "Numbered list",
				value: KEYS.ol,
			},
			{
				icon: "lucide:list-todo",
				keywords: ["checklist", "task", "checkbox", "[]"],
				label: "To-do list",
				value: KEYS.listTodo,
			},
			{
				icon: "lucide:square-chevron-right",
				keywords: ["collapsible", "expandable"],
				label: "Toggle",
				value: KEYS.toggle,
			},
			{
				icon: "lucide:code-xml",
				keywords: ["```"],
				label: "Code Block",
				value: KEYS.codeBlock,
			},
			{
				icon: "lucide:table",
				label: "Table",
				value: KEYS.table,
			},
			{
				icon: "lucide:quote",
				keywords: ["citation", "blockquote", "quote", ">"],
				label: "Blockquote",
				value: KEYS.blockquote,
			},
			{
				description: "Insert a highlighted block.",
				icon: "lucide:lightbulb",
				keywords: ["note"],
				label: "Callout",
				value: KEYS.callout,
			},
		].map((item) => ({
			...item,
			onSelect: (editor, value) => {
				insertBlock(editor, value);
			},
		})),
	},
	{
		group: "Advanced blocks",
		items: [
			{
				icon: "lucide:table-of-contents",
				keywords: ["toc"],
				label: "Table of contents",
				value: KEYS.toc,
			},
			{
				icon: "lucide:columns-3",
				label: "3 columns",
				value: "action_three_columns",
			},
			{
				focusEditor: false,
				icon: "lucide:radical",
				label: "Equation",
				value: KEYS.equation,
			},
		].map((item) => ({
			...item,
			onSelect: (editor, value) => {
				insertBlock(editor, value);
			},
		})),
	},
	{
		group: "Inline",
		items: [
			{
				focusEditor: true,
				icon: "lucide:calendar",
				keywords: ["time"],
				label: "Date",
				value: KEYS.date,
			},
			{
				focusEditor: false,
				icon: "lucide:radical",
				label: "Inline Equation",
				value: KEYS.inlineEquation,
			},
		].map((item) => ({
			...item,
			onSelect: (editor, value) => {
				insertInlineElement(editor, value);
			},
		})),
	},
];
