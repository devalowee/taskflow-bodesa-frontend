import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

interface CustomAlertProps {
  title: string
  description: string
  variant?: "default" | "destructive"
  className?: string
}

export const CustomAlert = ({ title, description, variant = "default", className }: CustomAlertProps) => {
  return (
    <Alert variant={variant} className={className}>
    <Terminal className="h-4 w-4" />
      <AlertTitle>{ title }</AlertTitle>
      <AlertDescription>
        { description }
      </AlertDescription>
    </Alert>
  )
}