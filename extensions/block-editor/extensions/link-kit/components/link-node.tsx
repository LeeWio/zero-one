import type { TLinkElement } from "platejs";
import type { PlateElementProps } from "platejs/react";
import { getLinkAttributes } from "@platejs/link";
import { PlateElement, useReadOnly } from "platejs/react";
import { Link } from "@heroui/link";

export function LinkElement(props: PlateElementProps<TLinkElement>) {
	const { editor, element, attributes, children } = props;
	const linkAttrs = getLinkAttributes(editor, element);
	const readOnly = useReadOnly();

	return (
		<PlateElement
			{...props}
			as="span"
			className="font-medium text-primary underline decoration-primary underline-offset-4"
			attributes={{
				...attributes,
				onMouseOver: (e) => e.stopPropagation(),
			}}
		>
			<Link
				underline="hover"
				showAnchorIcon
				href={readOnly ? linkAttrs.href : undefined}
				target={readOnly ? linkAttrs.target : undefined}
			>
				{children}
			</Link>
		</PlateElement>
	);
}
