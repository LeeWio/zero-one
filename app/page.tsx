import {Button} from "@heroui/react";
import {Icon} from "@iconify/react";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Button>
        <Icon icon="gravity-ui:globe" />
        Search
      </Button>
      <Button variant="secondary">
        <Icon icon="gravity-ui:plus" />
        Add Member
      </Button>
      <Button variant="tertiary">
        <Icon icon="gravity-ui:envelope" />
        Email
      </Button>
      <Button variant="danger">
        <Icon icon="gravity-ui:trash-bin" />
        Delete
      </Button>
    </section>
  );
}
