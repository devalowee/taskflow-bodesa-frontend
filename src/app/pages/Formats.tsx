import { FormatsTable } from "../components/formats/FormatsTable"
import { CreateFormat } from "../components/formats/CreateFormat"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CategoriesTable } from "../components/formats/CategoriesTable"
import { useSearchParams } from "react-router"

enum Filter {
  FORMATOS = 'FORMATOS',
  CATEGORIAS = 'CATEGORIAS',
}

export const Formats = () => {
  const [, setSearchParams] = useSearchParams();
  
  const [selectedFilter, setSelectedFilter] = useState<Filter>(Filter.CATEGORIAS)

  const onValueChange = (value: string) => {
    setSelectedFilter(value as Filter)
  }

  useEffect(() => {
    setSearchParams({ page: '1' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter])
  
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold mr-4">{selectedFilter === Filter.FORMATOS ? 'Formatos' : 'Categorías'}</h1>
        </div>
        <CreateFormat type={selectedFilter === Filter.FORMATOS ? 'format' : 'category'} />
      </div>
      <Tabs defaultValue={selectedFilter} onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value={Filter.CATEGORIAS}>Categorías</TabsTrigger>
          <TabsTrigger value={Filter.FORMATOS}>Formatos</TabsTrigger>
        </TabsList>
        <TabsContent value={Filter.FORMATOS}>
          <FormatsTable />
        </TabsContent>
        <TabsContent value={Filter.CATEGORIAS}>
          <CategoriesTable />
        </TabsContent>
      </Tabs>
    </>
  )
}
