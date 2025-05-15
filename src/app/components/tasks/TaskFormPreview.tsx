import { Label } from "@/components/ui/label";

export const TaskFormPreview = ({
  title = "",
  description = "",
}: {
  title?: string;
  description?: string;
}) => {
  return (
    <div className="flex flex-col gap-0.5">
      <Label className="font-medium" hidden={!title}>{title}</Label>
      <p className="text-sm" hidden={!description}>{description}</p>
    </div>
  );
};
