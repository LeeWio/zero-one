import React from "react";
import { type IconifyIcon, Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";

export type TextMenuItemProps = {
	icon: IconifyIcon | string;
	fontSize?: number;
	onPress?: () => void;
	isSelected?: boolean;
	value: string;
	startContent?: React.ReactNode;
	endContent?: React.ReactNode;
	tooltip?: string;
	className?: string;
	size?: "sm" | "md" | "lg";
};

export const TextMenuItem = React.forwardRef<
	HTMLButtonElement,
	TextMenuItemProps
>(
	(
		{
			icon,
			tooltip,
			fontSize = 18,
			size = "sm",
			isSelected = false,
			onPress,
			value,
			startContent,
			endContent,
			...props
		},
		ref,
	) => {
		const content = icon ? <Icon fontSize={fontSize} icon={icon} /> : value;

		const button = (
			<Button
				ref={ref}
				disableRipple
				endContent={endContent}
				isIconOnly={!!icon}
				radius="md"
				size={size}
				startContent={startContent}
				variant="light"
				onPress={onPress}
				{...props}
			>
				{content}
			</Button>
		);

		return tooltip ? <Tooltip content={tooltip}>{button}</Tooltip> : button;
	},
);
