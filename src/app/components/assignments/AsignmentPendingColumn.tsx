import { Clock } from "lucide-react";

export const AsignmentPendingColumn = () => {
  return (
    <div className="flex gap-4 h-full">
      <div
        role="column"
        className="w-[285px] h-[80vh] bg-black/5 rounded-xl flex flex-col"
      >
        <div
          role="columnheader"
          className="px-4 h-10 flex items-center gap-3 bg-[#4B3678] text-white rounded-t-xl"
        >
          <Clock size={20} />
          <h1 className="text-sm font-medium">
            Por Asignar <span className="text-xs font-normal">(30)</span>
          </h1>
        </div>
      </div>
    </div>
  );
};
