"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import React, { useEffect, useRef, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { SelectContent } from "@radix-ui/react-select";
import Todo from "./todo";
import { filterTodos, searchTodos } from "@/lib/todoSlice";

const TodoList = () => {
  const [client, setClient] = useState(false);

  const { filterTodo, todoList } = useAppSelector((state) => state.todo);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) {
    return (
      <div className="flex items-center justify-center pt-20 gap-4">
        <Loader2 className="animate-spin" /> Loading...
      </div>
    );
  }

  return (
    <div className="mt-8">
      {(todoList.length > 0 || filterTodo.length > 0) && <FilterTodoList />}
      <ScrollArea className="border rounded-md h-[calc(100dvh_-_14rem)]">
        {filterTodo.length > 0 ? (
          filterTodo.map((todo) => <Todo key={todo.id} {...todo} />)
        ) : (
          <p className="flex items-center justify-center pt-20">
            <span>Your todo list is empty!</span>
          </p>
        )}
      </ScrollArea>
    </div>
  );
};

export default TodoList;

const FilterTodoList = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();
  const debounceValueRef = useRef(searchValue);

  const handleFilterChange = (value: string) => {
    dispatch(filterTodos(value));
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(searchTodos({ text: debounceValueRef.current }));
    }, 300); // Default delay of 300ms

    return () => clearTimeout(timer);
  }, [debounceValueRef.current, dispatch]);

  return (
    <div className="pb-4 flex items-center justify-between z-10">
      <Select defaultValue="all" onValueChange={handleFilterChange}>
        <SelectTrigger className="w-28">
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          position="popper"
          className="bg-background border rounded-md z-10"
        >
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectContent>
      </Select>
      <Input
        placeholder="Search todo..."
        className="w-40"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          debounceValueRef.current = e.target.value;
        }}
      />
    </div>
  );
};
