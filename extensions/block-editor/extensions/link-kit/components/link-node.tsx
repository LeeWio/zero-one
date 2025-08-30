import { TLinkElement } from "platejs";
import { PlateElementProps } from "platejs/react";
import { PlateElement } from "platejs/react";
import { getLinkAttributes } from "@platejs/link";
import { Link } from "@heroui/link";

export function LinkElement(props: PlateElementProps<TLinkElement>) {
	return (
		<PlateElement
			{...props}
			as="span"
			attributes={{
				...props.attributes,
				...getLinkAttributes(props.editor, props.element),
				onMouseOver: (e) => {
					e.stopPropagation();
				},
			}}
		>
			<Link underline="hover" showAnchorIcon>
				{props.children}
			</Link>
		</PlateElement>
	);
}
