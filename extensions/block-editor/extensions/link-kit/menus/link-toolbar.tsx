"use client";

import {
	LinkFloatingToolbarState,
	useFloatingLinkEdit,
	useFloatingLinkInsertState,
} from "@platejs/link/react";
import {
	useEditorRef,
	useEditorSelection,
	useFormInputProps,
	usePluginOption,
} from "platejs/react";
import { KEYS, TLinkElement } from "platejs";
import { useMemo } from "react";
import { flip, offset } from "@platejs/floating";
import { type UseVirtualFloatingOptions } from "@platejs/floating";
import {
	useFloatingLinkEditState,
	useFloatingLinkInsert,
} from "@platejs/link/react";
import { Divider } from "@heroui/divider";
import { popoverVariants } from "@heroui/react";
import { ExternalLink, SeparatorVertical, Trash2, Unlink } from "lucide-react";
import { getLinkAttributes } from "@platejs/link";
import { Link } from "@heroui/link";
import { CardBody, Card } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
export const LinkFloatingToolbar = ({
	state,
}: {
	state?: LinkFloatingToolbarState;
}) => {
	const activeCommandId = usePluginOption({ key: KEYS.comment }, "activeId");
	const activeSuggestionId = usePluginOption(
		{ key: KEYS.suggestion },
		"activeId",
	);

	const floatingOptions: UseVirtualFloatingOptions = useMemo(() => {
		return {
			middleware: [
				offset(8),
				flip({
					fallbackPlacements: ["bottom-end", "top-start", "top-end"],
					padding: 12,
				}),
			],

			placement:
				activeSuggestionId || activeCommandId ? "top-start" : "bottom-start",
		};
	}, [activeCommandId, activeSuggestionId]);

	const insertState = useFloatingLinkInsertState({
		...state,
		floatingOptions: {
			...floatingOptions,
			...state?.floatingOptions,
		},
	});

	const {
		hidden,
		props: insertProps,
		ref: insertRef,
		textInputProps,
	} = useFloatingLinkInsert(insertState);

	const editState = useFloatingLinkEditState({
		...state,
		floatingOptions: {
			...floatingOptions,
			...state?.floatingOptions,
		},
	});

	const {
		editButtonProps,
		props: editProps,
		ref: editRef,
		unlinkButtonProps,
	} = useFloatingLinkEdit(editState);

	const inputProps = useFormInputProps({
		preventDefaultOnEnterKeydown: true,
	});

	if (hidden) return null;

	const input = <div>adsfa</div>;

	const editContent = editState.isEditing ? (
		input
	) : (
		<div
			aria-label="link preview panel"
			className="z-10 inline-flex w-full flex-row items-center justify-center gap-1 rounded-md bg-content1 px-1.5 py-1 shadow-medium"
		>
			<LinkOpenButton />
			<Divider className="mx-1 h-5" orientation="vertical" />
		</div>
		// <div className="flex flex-row">
		// 	<Button onPress={editButtonProps.onClick}>Edit link</Button>
		// 	<SeparatorVertical />
		// 	<LinkOpenButton />
		// 	<SeparatorVertical />
		// 	<Button onPress={unlinkButtonProps.onClick}>
		// 		<Unlink width={18} />
		// 	</Button>
		// </div>
	);
	return (
		<>
			<div ref={insertRef} {...insertProps}>
				{input}
			</div>
			<div ref={editRef} {...editProps}>
				{editContent}
			</div>
		</>
	);
};

const LinkOpenButton = () => {
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
		<Button
			{...attributes}
			as={Link}
			color="primary"
			size="sm"
			underline="always"
			href={attributes?.href}
			variant="light"
			aria-label="Open link in a new tab"
		>
			{attributes?.href}
		</Button>
	);
};
