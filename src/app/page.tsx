import AddTodo from "@/components/addTodo";
import TodoList from "@/components/todoList";

export default function Home() {
  return (
    <main className="grid place-items-center h-dvh">
      <div className="md:max-w-xl md:w-2/5 w-11/12">
        <AddTodo />
        <TodoList />
      </div>
    </main>
  );
}
