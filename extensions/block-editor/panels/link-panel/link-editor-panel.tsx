import { Input } from "@heroui/input";
import {
	FloatingLinkUrlInput,
	useFloatingLinkUrlInput,
	useFloatingLinkUrlInputState,
} from "@platejs/link/react";
import { Icon } from "@iconify/react";

type LinkEditorPanelProps = {
	textDefaultValue: string;
	textRef: React.Ref<HTMLInputElement>;
	onTextChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const LinkEditorPanel = ({
	textDefaultValue,
	textRef,
	onTextChange,
}: LinkEditorPanelProps) => {
	const urlState = useFloatingLinkUrlInputState();

	const { props: urlProps, ref: urlRef } = useFloatingLinkUrlInput(urlState);

	return (
		<div
			className="z-10 inline-flex flex-col w-full items-center justify-center gap-1 rounded-md px-1.5 py-1 shadow-medium"
			aria-label="Link editor panel"
		>
			<Input
				startContent={
					<Icon
						icon="lucide:link"
						fontSize={18}
						className="text-muted-foreground"
					/>
				}
				size="sm"
				{...urlProps}
				ref={urlRef}
				placeholder="Paste link"
				data-plate-focus
			/>

			<Input
				startContent={
					<Icon
						icon="lucide:text"
						fontSize={18}
						className="text-muted-foreground"
					/>
				}
				size="sm"
				ref={textRef}
				placeholder="Text to display"
				data-plate-focus
				defaultValue={textDefaultValue}
				onChange={onTextChange}
			/>
		</div>
	);
};
