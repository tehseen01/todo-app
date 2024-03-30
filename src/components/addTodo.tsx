"use client";

import React, { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CircleAlert, Plus } from "lucide-react";
import { useAppDispatch } from "@/lib/store";
import { createTodo } from "@/lib/todoSlice";
import { v4 as uuid } from "uuid";
import { cn } from "@/lib/utils";

const AddTodo = () => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();

  const id: string = uuid();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.length > 0) {
      setError(false);
      dispatch(createTodo({ id, text: inputValue, isCompleted: false }));
      setInputValue("");
    } else {
      setError(true);
    }
  };

  return (
    <form
      className="flex items-center justify-center gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex-1">
        <Input
          placeholder="Enter to todo"
          type="text"
          className={cn(error && "border-red-500")}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {error && (
          <p className="text-sm text-red-500 pt-2 flex items-center gap-2">
            <CircleAlert size={16} />
            Empty todo can&apos;t be added
          </p>
        )}
      </div>
      <Button
        size={"icon"}
        variant={"secondary"}
        type="submit"
        className="rounded-full"
      >
        <Plus />
      </Button>
    </form>
  );
};

export default AddTodo;
