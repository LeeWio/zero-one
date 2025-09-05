import {
	useEditorRef,
	useFocusedLast,
	type PlateElementProps,
	type RenderNodeWrapper,
} from "platejs/react";

import { CommentPlugin } from "@platejs/comment/react";
import { SuggestionPlugin } from "@platejs/suggestion/react";
import {
	type AnyPluginConfig,
	type NodeEntry,
	type Path,
	type TCommentText,
	type TElement,
	type TSuggestionText,
	PathApi,
	TextApi,
} from "platejs";

export const BlockDiscussion: RenderNodeWrapper<AnyPluginConfig> = (props) => {
	const { editor, element } = props;

	const commentsApi = editor.getApi(CommentPlugin).comment;
	const blockPath = editor.api.findPath(element);

	// avoid duplicate in table or column
	if (!blockPath || blockPath.length > 1) return;

	const draftCommentNode = commentsApi.node({ at: blockPath, isDraft: true });

	const commentNodes = [...commentsApi.nodes({ at: blockPath })];

	const suggestionNodes = [
		...editor.getApi(SuggestionPlugin).suggestion.nodes({ at: blockPath }),
	];

	if (
		commentNodes.length === 0 &&
		suggestionNodes.length === 0 &&
		!draftCommentNode
	) {
		return;
	}

	return (props) => (
		<BlockCommentContent
			blockPath={blockPath}
			commentNodes={commentNodes}
			draftCommentNode={draftCommentNode}
			suggestionNodes={suggestionNodes}
			{...props}
		/>
	);
};

const BlockCommentContent = ({
	blockPath,
	children,
	commentNodes,
	draftCommentNode,
	suggestionNodes,
}: PlateElementProps & {
	blockPath: Path;
	commentNodes: NodeEntry<TCommentText>[];
	draftCommentNode: NodeEntry<TCommentText> | undefined;
	suggestionNodes: NodeEntry<TElement | TSuggestionText>[];
}) => {
	const editor = useEditorRef();
	const isFocusedLast = useFocusedLast();
	return <></>;
};
