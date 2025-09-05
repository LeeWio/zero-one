import { ComponentPropsWithoutRef, ReactNode } from "react";

type TooltipProps<T extends React.ElementType> = {
	tooltip?: ReactNode;
};
