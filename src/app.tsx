import { CheckCircle } from "lucide-react";
import { useState } from "react";

export function App() {
  return (
    <div className="w-full p-2 md:p-0 md:w-2/3 xl:w-1/3 flex flex-col items-center justify-center mx-auto my-20 space-y-4">
      <div className="flex space-x-2 items-center">
        <CheckCircle className="size-8 text-sky-500" />
        <h1 className="text-2xl font-bold">ToDo List</h1>
      </div>
      <form className="flex-col flex space-y-2 w-full items-center justify-center">
        <input type="text" className="border rounded-full p-2 text-center w-full" placeholder="Insira o título da sua tarefa aqui"/>
        <span className="text-sm text-zinc-400">
          Pressione <b>ENTER</b> para adicionar uma nova tarefa.
        </span>
      </form>
    </div>
  );
}
