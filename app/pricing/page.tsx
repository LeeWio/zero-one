"use client";

import { title } from "@/components/primitives";
import { Select, SelectItem } from "@heroui/select";
import { Tooltip } from "@heroui/tooltip";

const animals = [
	{ key: "cat", label: "Cat" },
	{ key: "dog", label: "Dog" },
	{ key: "elephant", label: "Elephant" },
	{ key: "lion", label: "Lion" },
	{ key: "tiger", label: "Tiger" },
	{ key: "giraffe", label: "Giraffe" },
	{ key: "dolphin", label: "Dolphin" },
	{ key: "penguin", label: "Penguin" },
	{ key: "zebra", label: "Zebra" },
	{ key: "shark", label: "Shark" },
	{ key: "whale", label: "Whale" },
	{ key: "otter", label: "Otter" },
	{ key: "crocodile", label: "Crocodile" },
];

export default function PricingPage() {
	return (
		<Tooltip
			classNames={{
				base: "min-w-sm",
			}}
			content={
				<Select className="max-w-40" defaultSelectedKeys={["cat"]}>
					{animals.map((animal) => (
						<SelectItem key={animal.key}>{animal.label}</SelectItem>
					))}
				</Select>
			}
		>
			adf
		</Tooltip>
	);
}
