import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { getLinkAttributes } from "@platejs/link";
import { KEYS, TLinkElement } from "platejs";
import { useEditorRef, useEditorSelection } from "platejs/react";
import { useMemo } from "react";
import { MemoButton } from "../../menus/link-menu";
import { Divider } from "@heroui/divider";

type LinkPreviewPanelProps = {
	onClear: () => void;
	onEdit: () => void;
};

export const LinkPreviewPanel = ({
	onClear,
	onEdit,
}: LinkPreviewPanelProps) => {
	const editor = useEditorRef();
	const selection = useEditorSelection();

	const attributes = useMemo(() => {
		const entry = editor.api.node<TLinkElement>({
			match: { type: editor.getType(KEYS.link) },
		});

		if (!entry) {
			return;
		}

		const [element] = entry;

		return getLinkAttributes(editor, element);
	}, [editor, selection]);

	return (
		<div
			className="z-10 inline-flex w-full items-center justify-center gap-1 rounded-md px-1.5 py-1 shadow-medium"
			aria-label="Link preview panel"
		>
			<Button
				{...attributes}
				as={Link}
				color="primary"
				size="sm"
				underline="always"
				href={attributes?.href}
				variant="light"
				target="_blank"
				aria-label="Open link in a new tab"
			>
				{attributes?.href}
			</Button>

			<MemoButton icon="lucide:pencil" value="Pencil" onPress={onEdit} />

			<Divider orientation="vertical" className="mx-1 h-5" />

			<MemoButton icon={"lucide:trash-2"} value="Trash" onPress={onClear} />
		</div>
	);
};
