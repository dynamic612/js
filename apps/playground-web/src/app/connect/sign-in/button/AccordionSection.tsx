import { CustomAccordion } from "@/components/ui/CustomAccordion";
import { cn } from "../../../../lib/utils";

export function AccordionSection(props: {
  children: React.ReactNode;
  defaultOpen?: boolean;
  title: string;
  icon: React.FC<{ className?: string }>;
  triggerContainerClassName?: string;
}) {
  return (
    <CustomAccordion
      chevronPosition="right"
      chevronClassName="size-5"
      trigger={
        <span className="flex gap-3 items-center tracking-tight font-bold text-lg">
          <props.icon className="size-5" />
          {props.title}
        </span>
      }
      triggerContainerClassName={cn(
        "!px-5 !py-3 text-muted-foreground hover:text-foreground bg-muted  border rounded-lg hover:bg-accent rounded-full transition-colors focus:ring-2 ring-ring ring-offset-background ring-offset-2 focus:outline-none",
        props.triggerContainerClassName,
      )}
      activeTriggerClassName="bg-secondary text-foreground "
      defaultOpen={props.defaultOpen}
      containerClassName="border-none"
    >
      <div className="flex flex-col gap-4 pb-4 pt-3">{props.children}</div>
    </CustomAccordion>
  );
}
