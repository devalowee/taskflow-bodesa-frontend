import { BoardsTable } from "../components/boards/BoardsTable";

export const Boards = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tableros</h1>
      </div>
      <BoardsTable />
    </>
  );
};