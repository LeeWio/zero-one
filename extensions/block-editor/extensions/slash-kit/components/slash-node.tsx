import type { PlateEditor, PlateElementProps } from "platejs/react";

import { PlateElement } from "platejs/react";
import { Listbox, ListboxSection, ListboxItem } from "@heroui/listbox";
import { groups } from "../group";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Kbd } from "@heroui/kbd";

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="w-2xl h-20 border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
		{children}
	</div>
);

export const SlashInputElement = (props: PlateElementProps) => {
	const { editor, element } = props;

	const iconClasses = "text-xl text-default-500 pointer-events-none shrink-0";

	return (
		<PlateElement {...props} as="span">
			<ListboxWrapper>
				<Listbox
					aria-label="Listbox menu with sections"
					variant="flat"
					virtualization={{
						maxListboxHeight: 400,
						itemHeight: 40,
					}}
				>
					{groups.map(({ group, items }, index) => (
						<ListboxSection
							showDivider={index !== groups.length - 1}
							title={group}
						>
							{items.map(
								({ focusEditor, icon, keywords, label, value, onSelect }) => (
									<ListboxItem
										startContent={<Icon icon={icon} className={iconClasses} />}
										key={value}
										textValue={value}
										onPress={() => onSelect(editor, value)}
									>
										{label ?? value}
									</ListboxItem>
								),
							)}
						</ListboxSection>
					))}
				</Listbox>
			</ListboxWrapper>
			{props.children}
		</PlateElement>
	);
};
