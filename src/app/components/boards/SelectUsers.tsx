import { Check } from "lucide-react"
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { CommandInput } from "@/components/ui/command"
import { ChevronsUpDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Command } from "@/components/ui/command";
import { Dispatch, SetStateAction, useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { UseBoards } from "@/hooks/UseBoards"
import { UserToAdd } from "@/hooks/interfaces/UseBoards.interface"

interface SelectUsersProps {
  boardSlug: string;
  value: UserToAdd[];
  setValue: Dispatch<SetStateAction<UserToAdd[]>>;
}

export const SelectUsers = ({ boardSlug, value, setValue }: SelectUsersProps) => {
  const { getUsersToAdd } = UseBoards();
  const [message, setMessage] = useState<string>("");
  
  const { data: usersToAdd } = useQuery({
    queryKey: ["usersToAdd"],
    queryFn: async () => {
      const { ok, message: messageResponse, users } = await getUsersToAdd(boardSlug);

      if (!ok && messageResponse) {
        setMessage(messageResponse || 'No se obtuvieron usuarios');
        return [];
      }

      return users;
    },
  });

  const aviableUsers = useMemo(() => usersToAdd, [usersToAdd]);

  const handleSelectUser = (user: UserToAdd) => {
    setValue(prev => {
      if (prev.some(u => u.id === user.id)) {
        return prev.filter(u => u.id !== user.id);
      }
      return [...prev, user];
    });
  }
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "max-w-full justify-between overflow-hidden",
            !value && "text-muted-foreground"
          )}
        >
          {value.length > 0
            ? value.map((user) => user.name).join(", ")
            : "Seleccionar usuarios"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Selecciona usuarios"
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>
              {message ? message : 'No se encontraron usuarios'}
            </CommandEmpty>
            <CommandGroup>
              {aviableUsers?.map((user) => (
                <CommandItem
                  value={user.name}
                  key={user.id}
                  onSelect={() => {
                    handleSelectUser(user);
                  }}
                >
                  {user.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value.some(u => u.id === user.id)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
