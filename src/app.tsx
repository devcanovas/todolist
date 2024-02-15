import { Check, CheckCircle, CheckSquare, Clock, Square } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  closed: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const tasksOnStorage = localStorage.getItem("tasks");

    if (tasksOnStorage) {
      return JSON.parse(tasksOnStorage);
    }
    return [];
  });
  const [tasksOpen, setTasksOpen] = useState<Task[]>([]);
  const [tasksClosed, setTasksClosed] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTasksOpen(tasks.filter(task => task.closed === false));
    setTasksClosed(tasks.filter(task => task.closed === true));
  },[]) // Criando loop

  function handleOnChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleOnSubmit(event: FormEvent) {
    event.preventDefault();
    saveTask();
    toast.success("Tarefa criada com sucesso!");
  }

  function saveTask() {
    const newTask = {
      id: crypto.randomUUID(),
      title: title,
      closed: false,
    };

    const tasksArrays = [...tasks, newTask];

    setTasks(tasksArrays);

    localStorage.setItem("tasks", JSON.stringify(tasksArrays));

    setTitle("");
  }

  function cleanTasks() {
    setTasks([]);
    localStorage.clear();
    toast.success("Todas as tarefas foram excluídas com sucesso!")
  }

  function handleOnCloseTask(task: Task) {
    task.closed = !task.closed;
    const index = tasks.findIndex((obj) => obj.id === task.id);
    const tasksArray = tasks;
    tasksArray.splice(index, 1, task);
    setTasks(tasksArray);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }

  return (
    <div className="w-full p-2 md:p-0 md:w-2/3 xl:w-1/3 flex flex-col items-center justify-center mx-auto my-20 space-y-4">
      <section className="flex space-x-2 items-center">
        <CheckCircle className="size-8 text-sky-500" />
        <h1 className="text-2xl font-bold">ToDo List</h1>
      </section>
      <form
        className="flex-col flex space-y-2 w-full items-center justify-center"
        onSubmit={handleOnSubmit}
      >
        <input
          type="text"
          className="border rounded-full p-2 text-center w-full outline-none"
          placeholder="Insira o título da sua tarefa aqui"
          onChange={handleOnChangeTitle}
          value={title}
        />
        <span className="text-sm text-zinc-400">
          Pressione <b>ENTER</b> para adicionar uma nova tarefa.
        </span>
      </form>

      {tasksOpen.length > 0 && (
        <section className="flex flex-col space-y-2 w-full">
          <div className="flex items-center space-x-2 text-zinc-500">
            <Clock className="size-4" />
            <h2 className="text-lg ">Tarefas pendentes:</h2>
          </div>
          {tasks
            .filter((task) => task.closed === false)
            .map((task) => {
              return (
                <button
                  key={task.id}
                  onClick={() => handleOnCloseTask(task)}
                  className="flex space-x-2 border w-full text-zinc-600 rounded-full px-4 py-2 items-center"
                >
                  <Square className="size-4 text-zinc-400" />
                  <h2>{task.title}</h2>
                </button>
              );
            })}
        </section>
      )}

      {tasksClosed.length > 0 && (
        <section className="flex flex-col w-full space-y-2">
          <div className="flex space-x-2 text-zinc-400 items-center">
            <Check className="size-4 text-sky-400" />
            <h2 className="text-lg">Tarefas concluídas:</h2>
          </div>
          {tasksClosed.map((task) => {
            return (
              <button
              key={task.id}
                onClick={() => handleOnCloseTask(task)}
                className="flex space-x-2 border w-full text-zinc-600 rounded-full px-4 py-2 items-center"
              >
                <CheckSquare className="size-4 text-sky-400" />
                <h2 className="line-through text-zinc-300">{task.title}</h2>
              </button>
            );
          })}
        </section>
      )}
      {tasks.length > 0 && (
        <div className="flex justify-end w-full">
          <button
            className="px-4 py-2 text-sm hover:bg-zinc-100 rounded-lg"
            onClick={cleanTasks}
          >
            Limpar todas as tarefas
          </button>
        </div>
      )}
    </div>
  );
}
