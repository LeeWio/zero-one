import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";

export default function AboutPage() {
	return (
		<div>
			<Popover placement="right">
				<PopoverTrigger>
					<Button>Open Popover</Button>
				</PopoverTrigger>
				<PopoverContent className="bg-content2">
					<Button variant="light" size="sm" radius="sm" isIconOnly>
						adf
					</Button>
				</PopoverContent>
			</Popover>
			<Card>
				<CardBody>dfasdfa</CardBody>
				<CardFooter>adsfdaf</CardFooter>
			</Card>
		</div>
	);
}
