"use client";

import { useAppDispatch } from "@/lib/store";
import { completeTodo, deleteTodo, editTodo, ITodo } from "@/lib/todoSlice";
import { cn } from "@/lib/utils";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Check, Edit, Trash2 } from "lucide-react";
import { KeyboardEvent, useState } from "react";
import { Input } from "./ui/input";

const Todo = ({ id, text, isCompleted }: ITodo) => {
  const [showEditInput, setShowEditInput] = useState(false);
  const [editValue, setEditValue] = useState(text);
  const dispatch = useAppDispatch();

  const handleDelete = () => dispatch(deleteTodo({ id }));

  const handleCheckbox = (check: CheckedState) => {
    if (check) {
      dispatch(completeTodo({ id }));
    }
  };

  const handleEdit = () => {
    if (showEditInput) {
      if (editValue.length > 0) {
        dispatch(editTodo({ id, isCompleted, text: editValue }));
        setShowEditInput(false);
      }
      setShowEditInput(false);
    } else {
      setShowEditInput(true);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleEdit();
      e.preventDefault();
    }
  };

  return (
    <div
      className={cn(
        "p-3 border-b flex items-center gap-4 justify-between",
        isCompleted && "bg-green-500/20"
      )}
    >
      <Checkbox
        id={id}
        checked={isCompleted}
        name={id}
        onCheckedChange={handleCheckbox}
      />{" "}
      {showEditInput ? (
        <Input
          placeholder="Update todo"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <p className={cn("flex-1", isCompleted && "line-through")}>{text}</p>
      )}
      <div className="flex items-center gap-4">
        {isCompleted ? null : (
          <Button
            className="size-8"
            size={"icon"}
            variant={"secondary"}
            onClick={handleEdit}
          >
            {showEditInput ? <Check size={16} /> : <Edit size={16} />}
          </Button>
        )}
        <Button
          size={"icon"}
          variant={"destructive"}
          className=" size-8 "
          onClick={handleDelete}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Todo;
