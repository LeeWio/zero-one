import { useEditorReadOnly } from "platejs/react";

export const TextMenu = () => {
	const readOnly = useEditorReadOnly();
	return (
		<>
			{!readOnly && <div>adsf</div>}

			<div>this is a comment component</div>
		</>
	);
};
