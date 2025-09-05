import { type Value } from "platejs";
import { type TPlateEditor, useEditorRef } from "platejs/react";

import {
	BasicBlocksKit,
	BasicMarksKit,
	ListKit,
	AlignKit,
	LineHeightKit,
	LinkKit,
	TocKit,
	ContentItemMenuKit,
	DndKit,
	ColumnKit,
	CodeBlockKit,
	DateKit,
	FloatingToolbarKit,
	AutoformatKit,
	BlockMenuKit,
	MathKit,
	SlashKit,
	TrailingBlockPlugin,
	BlockPlaceholderKit,
} from ".";

/**
 * EditorKit
 *
 * A collection of all plugins that define the editor's behavior.
 * Currently it only spreads `BasicBlocksKit`, which includes
 * headings, paragraphs, blockquotes, and horizontal rules.
 *
 * You can extend this array with additional plugins such as:
 * - TrailingBlockPlugin: to ensure the editor always ends with a paragraph
 * - List plugins, Table plugins, etc.
 */
export const ExtensionKit = [
	// ...ContentItemMenuKit,
	...FloatingToolbarKit,
	...SlashKit,
	...BlockPlaceholderKit,

	// Elements
	...BasicBlocksKit,
	...CodeBlockKit,
	...LinkKit,
	...ColumnKit,
	...DateKit,
	...TocKit,

	// Marks
	...BasicMarksKit,
	...MathKit,

	// Block Style
	...ListKit,
	...AlignKit,
	...LineHeightKit,

	// Collaboration

	// Editing
	// ...DndKit,
	...AutoformatKit,
	TrailingBlockPlugin,
	// ...BlockMenuKit,
];

/**
 * AppEditor
 *
 * Strongly-typed editor instance based on:
 *   - `Value`: the editor's document data model
 *   - `(typeof EditorKit)[number]`: the union type of all plugins
 *
 * This type ensures that when you work with the editor,
 * TypeScript knows which plugins and nodes are available.
 */
export type AppEditor = TPlateEditor<Value, (typeof ExtensionKit)[number]>;

/**
 * useEditor
 *
 * A typed React hook to access the current Plate editor instance.
 * By providing `AppEditor`, you get full TypeScript support,
 * including autocompletion and type safety for editor methods.
 */
export const useEditor = () => useEditorRef<AppEditor>();
