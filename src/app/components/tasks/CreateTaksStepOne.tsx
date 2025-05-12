import { Step } from "@/app/pages/tasks/CreateTask";
import { Button } from "@/components/ui/button";
import { useTaskSlice } from "@/hooks/useTaskSlice";
import { TaskStep } from "@/store/tasks/taskSlice";
import { Check, MonitorSmartphone, Printer, Sparkles, Store } from "lucide-react";
import { useMemo, useState } from "react";

const tasks = [
  {
    type: "Digital",
    slug: "digital",
    description: "Redes Sociales y CRM",
    icon: <MonitorSmartphone size={80} strokeWidth={1.75} />,
  },
  {
    type: "Impresa",
    slug: "impresa",
    description: "Espectaculares, pendones, etc.",
    icon: <Printer size={80} strokeWidth={1.75} />,
  },
  {
    type: "Ecommerce",
    slug: "ecommerce",
    description: "Tienda online, catálogos, etc.",
    icon: <Store size={80} strokeWidth={1.75} />,
  },
  {
    type: "Especial",
    slug: "especial",
    description: "Material Distinto",
    icon: <Sparkles size={80} strokeWidth={1.75} />,
  },
];

interface TaskCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  slug: string;
  selected: string;
  setSelected: (selected: string) => void;
}

const TaskCard = ({
  title,
  description,
  icon,
  slug,
  selected,
  setSelected,
}: TaskCardProps) => {
  return (
    <div
      className={`rounded-lg p-5 flex flex-col items-center justify-center gap-2 w-60 border-2 cursor-pointer transition-colors relative ${
        selected === slug ? "border-violet-700 bg-violet-50" : "bg-white"
      }`}
      onClick={() => {
        if (selected === slug) {
          setSelected('');
        } else {
          setSelected(slug);
        }
      }}
    >
      {selected === slug && (
        <Check size={15} className="absolute top-2 right-2 bg-violet-700 rounded-full p-0.5 text-white" />
      )}
      <div className="flex items-center justify-center">{icon}</div>
      <h3 className="font-bold text-3xl">{title}</h3>
      <p className="text-primary text-center">{description}</p>
    </div>
  );
};

interface CreateTaksStepOneProps {
  currentStep: number;
  steps: Step[];
  setStep: (step: Step) => void;
}

export const CreateTaksStepOne = ({ steps, setStep, currentStep }: CreateTaksStepOneProps) => {
  const { setCurrentStep } = useTaskSlice();
  const [selectedTask, setSelectedTask] = useState<string>('');

  const selected = useMemo(() => {
    return selectedTask !== '';
  }, [selectedTask]);

  const handleStep = (step: TaskStep) => {
    setStep(steps[step]);
    setCurrentStep(step);
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.type}
            title={task.type}
            description={task.description}
            icon={task.icon}
            slug={task.slug}
            selected={selectedTask}
            setSelected={setSelectedTask}
          />
        ))}
      </div>
      <Button 
        onClick={() => handleStep(currentStep + 1)}
        size="lg"
        className="mt-6 bg-violet-700 hover:bg-violet-600 text-xl font-bold py-7 w-5/14"
        disabled={!selected}
      >
        {currentStep === 1 ? "Comenzar" : "Siguiente"}
      </Button>
    </>
  );
};
