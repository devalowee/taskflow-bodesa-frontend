import { Popover, PopoverContent, PopoverTrigger   } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList   } from "@/components/ui/command"
import { useEffect, useMemo, useState } from "react"
import queryClient from "@/lib/queryClient";
import { Category, useFormats } from "@/hooks/useFormats";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import debounce from 'debounce';

export const SelectFormatsCategories = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
  const [cacheCategories, setCacheCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [open, setOpen] = useState(false);
  const { searchCategories } = useFormats();

  const debouncedSearch = useMemo(
    () => debounce((value: string) => {
      setDebouncedValue(value);
    }, 700),
    []
  );

  // Inicializar selectedCategory cuando cambia el valor externo
  useEffect(() => {
    const categories = queryClient.getQueryData<Category[]>(['categories', 1]);
    if (categories && value) {
      const category = categories.find(cat => cat.slug === value);
      if (category) {
        setSelectedCategory(category);
      }
    }
  }, [value]);

  // Query para búsqueda de categorías
  const { data: searchedCategories = [] } = useQuery({
    queryKey: ['searched-categories', debouncedValue],
    queryFn: async () => {
      if (!debouncedValue) return [];
      const { categories = [], ok, message } = await searchCategories(debouncedValue);
      
      if (!ok) {
        toast.error(message);
        return [];
      }

      return categories;
    },
    enabled: !!debouncedValue,
  });

  const getCacheCategories = () => {
    const categories = queryClient.getQueryData<Category[]>(['categories', 1]);
    if (categories) {
      setCacheCategories(categories);
    }
  }

  const handleSearch = (newSearchValue: string) => {
    setSearchValue(newSearchValue);
    debouncedSearch(newSearchValue);
  }
  
  const handleSelect = (category: Category) => {
    setSelectedCategory(category);
    onChange(category.slug);
    setSearchValue("");
    setDebouncedValue("");
    setOpen(false);
  }

  useEffect(() => {
    if (!searchValue) {
      getCacheCategories();
    }
  }, [searchValue]);

  const displayCategories = debouncedValue ? searchedCategories : cacheCategories;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-start">
          {selectedCategory ? (
            <span>{selectedCategory.name}</span>
          ): (
            <span className="text-gray-500">Selecciona una categoría</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" side="bottom" align="center">
        <Command>
          <CommandInput placeholder="Buscar..." value={searchValue} onValueChange={handleSearch} />
          <CommandList>
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            <CommandGroup>
              {displayCategories.map((category) => (
                <CommandItem
                  key={category.slug}
                  value={category.name}
                  onSelect={() => handleSelect(category)}
                >
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
