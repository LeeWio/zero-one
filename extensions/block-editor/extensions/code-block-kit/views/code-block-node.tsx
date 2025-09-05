import { type TCodeBlockElement, type TCodeSyntaxLeaf, NodeApi } from "platejs";
import { Select, SelectItem } from "@heroui/select";
import { useState, useMemo } from "react";
import { addToast } from "@heroui/toast";
import {
	type PlateElementProps,
	type PlateLeafProps,
	PlateEditor,
	PlateElement,
	PlateLeaf,
	useEditorRef,
	useEditorSelector,
	useElement,
	useFocusedLast,
	useReadOnly,
	useSelected,
} from "platejs/react";
import { formatCodeBlock, isLangSupported } from "@platejs/code-block";
import { Button } from "@heroui/button";
import { BracesIcon } from "lucide-react";
import { Snippet } from "@heroui/snippet";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Tooltip } from "@heroui/tooltip";
import { Input } from "@heroui/input";

const CodeBlockCombobox = () => {
	const [open, setOpen] = useState(false);
	const readOnly = useReadOnly();
	const editor = useEditorRef();
	const element = useElement<TCodeBlockElement>();
	const value = element.lang || "plaintext";

	console.log(value);

	const [searchValue, setSearchValue] = useState("");

	const items = useMemo(
		() =>
			languages.filter(
				(language) =>
					!searchValue ||
					language.label.toLowerCase().includes(searchValue.toLowerCase()),
			),
		[searchValue],
	);

	if (readOnly) return null;

	return (
		<Select
			items={items}
			className="w-full"
			fullWidth
			defaultSelectedKeys={[
				languages.find((language) => language.value === value)?.label ??
					"Plain Text",
			]}
		>
			{(language) => (
				<SelectItem
					key={language.label}
					onPress={() => {
						editor.tf.setNodes<TCodeBlockElement>(
							{ lang: language.value },
							{ at: element },
						);
					}}
				>
					{language.label}
				</SelectItem>
			)}
		</Select>
	);
};

interface CodeBlockToolbarProps {
	editor: PlateEditor;
	element: TCodeBlockElement;
	children: React.ReactNode;
}

const CodeBlockToolbar = ({
	editor,
	element,
	children,
}: CodeBlockToolbarProps) => {
	const readOnly = useReadOnly();
	const selected = useSelected();
	const isCollapsed = useEditorSelector(
		(editor) => editor.api.isCollapsed(),
		[],
	);
	const isFocusedLast = useFocusedLast();

	const open = isFocusedLast && !readOnly && selected && isCollapsed;

	return (
		<Tooltip
			isOpen={open}
			content={<CodeBlockCombobox />}
			className="!p-0 min-w-40"
		>
			<div className="relative">
				<Snippet
					hideSymbol
					fullWidth
					classNames={{
						base: "py-3 w-full max-w-full",
						pre: "overflow-x-auto pr-4 whitespace-pre font-mono leading-[normal] [tab-size:2] print:break-inside-avoid",
						copyButton: "absolute top-1 right-1",
					}}
					onCopy={() => {
						void navigator.clipboard.writeText(NodeApi.string(element));

						addToast({
							title: "Copied",
							description: "The content has been copied to your clipboard.",
							color: "success", // "success" | "error" | "warning" | "info"
							variant: "solid", // "solid" | "soft" | "outline"
							radius: "md", // border radius
							timeout: 2000, // auto dismiss time (ms)
						});
					}}
				>
					{children}
				</Snippet>

				<div
					className="absolute top-1 right-7 z-10 flex gap-0.5 select-none"
					contentEditable={false}
				>
					{isLangSupported(element.lang) && (
						<Button
							isIconOnly
							variant="ghost"
							className="size-6 text-xs"
							onPress={() => formatCodeBlock(editor, { element })}
							title="Format code"
						>
							<BracesIcon className="!size-3.5 text-muted-foreground" />
						</Button>
					)}
				</div>
			</div>
		</Tooltip>
	);
};
export function CodeBlockElement(props: PlateElementProps<TCodeBlockElement>) {
	const { editor, element, children } = props;

	return (
		<PlateElement
			{...props}
			className="py-1 **:[.hljs-addition]:bg-[#f0fff4] **:[.hljs-addition]:text-[#22863a] dark:**:[.hljs-addition]:bg-[#3c5743] dark:**:[.hljs-addition]:text-[#ceead5] **:[.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable]:text-[#005cc5] dark:**:[.hljs-attr,.hljs-attribute,.hljs-literal,.hljs-meta,.hljs-number,.hljs-operator,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-variable]:text-[#6596cf] **:[.hljs-built\\\\_in,.hljs-symbol]:text-[#e36209] dark:**:[.hljs-built\\\\_in,.hljs-symbol]:text-[#c3854e] **:[.hljs-bullet]:text-[#735c0f] **:[.hljs-comment,.hljs-code,.hljs-formula]:text-[#6a737d] dark:**:[.hljs-comment,.hljs-code,.hljs-formula]:text-[#6a737d] **:[.hljs-deletion]:bg-[#ffeef0] **:[.hljs-deletion]:text-[#b31d28] dark:**:[.hljs-deletion]:bg-[#473235] dark:**:[.hljs-deletion]:text-[#e7c7cb] **:[.hljs-emphasis]:italic **:[.hljs-keyword,.hljs-doctag,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language\\\\_]:text-[#d73a49] dark:**:[.hljs-keyword,.hljs-doctag,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable.language\\\\_]:text-[#ee6960] **:[.hljs-name,.hljs-quote,.hljs-selector-tag,.hljs-selector-pseudo]:text-[#22863a] dark:**:[.hljs-name,.hljs-quote,.hljs-selector-tag,.hljs-selector-pseudo]:text-[#36a84f] **:[.hljs-regexp,.hljs-string,.hljs-meta_.hljs-string]:text-[#032f62] dark:**:[.hljs-regexp,.hljs-string,.hljs-meta_.hljs-string]:text-[#3593ff] **:[.hljs-section]:font-bold **:[.hljs-section]:text-[#005cc5] dark:**:[.hljs-section]:text-[#61a5f2] **:[.hljs-strong]:font-bold **:[.hljs-title,.hljs-title.class\\\\_,.hljs-title.class\\\\_.inherited\\\\_\\\\_,.hljs-title.function\\\\_]:text-[#6f42c1] dark:**:[.hljs-title,.hljs-title.class\\\\_,.hljs-title.class\\\\_.inherited\\\\_\\\\_,.hljs-title.function\\\\_]:text-[#a77bfa]"
		>
			<CodeBlockToolbar editor={editor} element={element}>
				{children}
			</CodeBlockToolbar>
		</PlateElement>
	);
}

export function CodeLineElement(props: PlateElementProps) {
	return <PlateElement {...props} />;
}

export function CodeSyntaxLeaf(props: PlateLeafProps<TCodeSyntaxLeaf>) {
	const tokenClassName = props.leaf.className as string;

	return <PlateLeaf className={tokenClassName} {...props} />;
}

const languages: { label: string; value: string }[] = [
	{ label: "Auto", value: "auto" },
	{ label: "Plain Text", value: "plaintext" },
	{ label: "ABAP", value: "abap" },
	{ label: "Agda", value: "agda" },
	{ label: "Arduino", value: "arduino" },
	{ label: "ASCII Art", value: "ascii" },
	{ label: "Assembly", value: "x86asm" },
	{ label: "Bash", value: "bash" },
	{ label: "BASIC", value: "basic" },
	{ label: "BNF", value: "bnf" },
	{ label: "C", value: "c" },
	{ label: "C#", value: "csharp" },
	{ label: "C++", value: "cpp" },
	{ label: "Clojure", value: "clojure" },
	{ label: "CoffeeScript", value: "coffeescript" },
	{ label: "Coq", value: "coq" },
	{ label: "CSS", value: "css" },
	{ label: "Dart", value: "dart" },
	{ label: "Dhall", value: "dhall" },
	{ label: "Diff", value: "diff" },
	{ label: "Docker", value: "dockerfile" },
	{ label: "EBNF", value: "ebnf" },
	{ label: "Elixir", value: "elixir" },
	{ label: "Elm", value: "elm" },
	{ label: "Erlang", value: "erlang" },
	{ label: "F#", value: "fsharp" },
	{ label: "Flow", value: "flow" },
	{ label: "Fortran", value: "fortran" },
	{ label: "Gherkin", value: "gherkin" },
	{ label: "GLSL", value: "glsl" },
	{ label: "Go", value: "go" },
	{ label: "GraphQL", value: "graphql" },
	{ label: "Groovy", value: "groovy" },
	{ label: "Haskell", value: "haskell" },
	{ label: "HCL", value: "hcl" },
	{ label: "HTML", value: "html" },
	{ label: "Idris", value: "idris" },
	{ label: "Java", value: "java" },
	{ label: "JavaScript", value: "javascript" },
	{ label: "JSON", value: "json" },
	{ label: "Julia", value: "julia" },
	{ label: "Kotlin", value: "kotlin" },
	{ label: "LaTeX", value: "latex" },
	{ label: "Less", value: "less" },
	{ label: "Lisp", value: "lisp" },
	{ label: "LiveScript", value: "livescript" },
	{ label: "LLVM IR", value: "llvm" },
	{ label: "Lua", value: "lua" },
	{ label: "Makefile", value: "makefile" },
	{ label: "Markdown", value: "markdown" },
	{ label: "Markup", value: "markup" },
	{ label: "MATLAB", value: "matlab" },
	{ label: "Mathematica", value: "mathematica" },
	{ label: "Mermaid", value: "mermaid" },
	{ label: "Nix", value: "nix" },
	{ label: "Notion Formula", value: "notion" },
	{ label: "Objective-C", value: "objectivec" },
	{ label: "OCaml", value: "ocaml" },
	{ label: "Pascal", value: "pascal" },
	{ label: "Perl", value: "perl" },
	{ label: "PHP", value: "php" },
	{ label: "PowerShell", value: "powershell" },
	{ label: "Prolog", value: "prolog" },
	{ label: "Protocol Buffers", value: "protobuf" },
	{ label: "PureScript", value: "purescript" },
	{ label: "Python", value: "python" },
	{ label: "R", value: "r" },
	{ label: "Racket", value: "racket" },
	{ label: "Reason", value: "reasonml" },
	{ label: "Ruby", value: "ruby" },
	{ label: "Rust", value: "rust" },
	{ label: "Sass", value: "scss" },
	{ label: "Scala", value: "scala" },
	{ label: "Scheme", value: "scheme" },
	{ label: "SCSS", value: "scss" },
	{ label: "Shell", value: "shell" },
	{ label: "Smalltalk", value: "smalltalk" },
	{ label: "Solidity", value: "solidity" },
	{ label: "SQL", value: "sql" },
	{ label: "Swift", value: "swift" },
	{ label: "TOML", value: "toml" },
	{ label: "TypeScript", value: "typescript" },
	{ label: "VB.Net", value: "vbnet" },
	{ label: "Verilog", value: "verilog" },
	{ label: "VHDL", value: "vhdl" },
	{ label: "Visual Basic", value: "vbnet" },
	{ label: "WebAssembly", value: "wasm" },
	{ label: "XML", value: "xml" },
	{ label: "YAML", value: "yaml" },
];
