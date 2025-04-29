import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { UseAuth } from "@/hooks/UseAuth";
import { useMemo } from "react";

export const LoginForm = () => {
  const { startLogin, isSubmitting, message } = UseAuth();

  const loading = useMemo(() => isSubmitting === "submitting", [isSubmitting]);

  const loginSchema = z.object({
    email: z
      .string()
      .min(1, {
        message: "El correo electrónico es requerido",
      })
      .email({
        message: "El correo electrónico no es válido",
      }),
    password: z.string().min(1, {
      message: "La contraseña es requerida",
    }),
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    startLogin(data.email, data.password);
  });

  return (
    <form className="w-96 flex flex-col gap-4">
      <Form {...form}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  placeholder="Correo electrónico"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Contraseña</FormLabel>
              <FormControl>
                <Input type="password" {...field} placeholder="Contraseña" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="cursor-pointer"
          disabled={loading}
          onClick={onSubmit}
        >
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Button>

        {message && !loading && (
          <p className="text-red-500 text-center text-sm animate-zoom-in duration-200">
            {message}
          </p>
        )}
      </Form>
    </form>
  );
};
