import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";

interface TooltipComponentProps {
  children: React.ReactNode;
  text: string | undefined;
}

export const TooltipComponent = ({ children, text }: TooltipComponentProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="flex">{children}</TooltipTrigger>
      <TooltipContent>{text ? text : ''}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
