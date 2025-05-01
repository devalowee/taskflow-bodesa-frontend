import { Monitor, Printer, ShoppingCart, Sparkles } from "lucide-react";
import { TooltipComponent } from "../TooltipComponent";
import { RequestType } from "./interfaces/board.interfaces";

type TypeIconProps = {
  icon: React.ReactNode;
  text: string;
}

export const TypeIcon = ({ type }: { type: RequestType }) => {
  
  const Icon : TypeIconProps =
    type === "PRINTED"
      ? { icon: <Printer className="size-5 bg-[#F3F3F3] p-0.5 rounded" />, text: "Impreso" }
      : type === "DIGITAL"
      ? { icon: <Monitor className="size-5 bg-[#F3F3F3] p-0.5 rounded" />, text: "Digital" }
      : type === "ECOMMERCE"
      ? { icon: <ShoppingCart className="size-5 bg-[#F3F3F3] p-0.5 rounded" />, text: "Ecommerce" }
      : { icon: <Sparkles className="size-5 bg-[#F3F3F3] p-0.5 rounded" />, text: "Especial" };

  return (
    <TooltipComponent text={Icon.text}>
      {Icon.icon}
    </TooltipComponent>
  );
};
