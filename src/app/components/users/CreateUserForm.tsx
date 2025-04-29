import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { roles, getRole } from "@/app/lib/getRole";
import { useMutation } from "@tanstack/react-query";
import { UseUsers } from "@/hooks/UseUsers";
import { UserPayload } from "@/hooks/interfaces/UseUsers.interface";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import queryClient from "@/lib/queryClient";
import { CustomAlert } from "../CustomAlert";
import { UseAuth } from "@/hooks/UseAuth";

export const CreateUserForm = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  const { createUser } = UseUsers();
  const [message, setMessage] = useState<string | null>(null);
  const { user } = UseAuth();

  const { mutate: createUserMutation, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      if (!data.ok && data.message) {
        setMessage(data.message);
      } else {
        onClose();
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
    onError: (error) => {
      console.log(error);
      setMessage(error.message);
    },
  });

  const createUserSchema = z.object({
    name: z.string().min(1, {
      message: "El nombre es obligatorio",
    }),
    email: z
      .string()
      .min(1, {
        message: "El correo electrónico es obligatorio",
      })
      .email({
        message: "El correo electrónico no es válido",
      }),
    password: z.string().min(10, {
      message: "La contraseña debe tener al menos 10 caracteres",
    }),
    role: z.enum(roles as [string, ...string[]], {
      message: "El rol es obligatorio",
    }),
  });

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
  });

  const onSubmit = form.handleSubmit((user) => {
    createUserMutation(user as UserPayload);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre completo</FormLabel>
              <FormControl>
                <Input placeholder="Juan Pérez" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
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
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Asigna un rol" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles.map((role) => {
                      if (role === 'SUPER_ADMIN' && user?.role !== 'SUPER_ADMIN') {
                        return null;
                      }
                      return (
                        <SelectItem key={role} value={role}>
                          {getRole(role)}
                        </SelectItem>
                      );
                      })}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {message && !isPending && (
          <CustomAlert
            title="¡Ha ocurrido un error!"
            description={message}
            variant="destructive"
            className="animate-zoom-in"
          />
        )}
        <div className="flex justify-end gap-2">
          {children}
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader className="w-4 h-4 animate-spin-clockwise repeat-infinite" />
                <span>creando...</span>
              </>
            ) : (
              'Crear'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
