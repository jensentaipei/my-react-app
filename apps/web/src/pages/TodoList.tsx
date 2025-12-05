import Title from "@/components/Title";
import CreateTodoModal, {
  ChildMethod as CreateMethod,
  State as CreateTodoState,
} from "@/components/CreateTodoModal";
import { useRef } from "react";
import TodoSetting, {
  ChildMethod as SettingMethod,
} from "@/components/TodoSetting";
import useTodoItemsStore from "@/stores/useTodoItemsStore";
import TodoCard from "@/components/TodoCard";

export default function TodoList() {
  const createTodoRef = useRef<CreateMethod>(null);
  const settingRef = useRef<SettingMethod>(null);
  const todoItems = useTodoItemsStore((v) => v.todoItems);
  const addTodoItem = useTodoItemsStore((v) => v.addTodoItem);
  const updateTodoItem = useTodoItemsStore((v) => v.updateTodoItem);
  const removeTodoItem = useTodoItemsStore((v) => v.removeTodoItem);

  function createTodo(data: CreateTodoState) {
    addTodoItem({
      id: crypto.randomUUID(),
      title: data.title,
      content: data.content,
      tag: data.tag,
      completed: false,
    });
  }

  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex justify-between items-center w-full">
        <div className="flex-1" />
        <div className="flex-1 flex justify-center">
          <Title title="待辦事項" />
        </div>
        <div className="flex-1 flex justify-end gap-2">
          <button
            className="btn"
            onClick={() => {
              createTodoRef.current?.open();
            }}
          >
            建立
          </button>
          <button
            className="btn"
            onClick={() => {
              settingRef.current?.open();
            }}
          >
            設定
          </button>
        </div>
      </div>
      <CreateTodoModal ref={createTodoRef} onSubmit={createTodo} />
      <TodoSetting ref={settingRef} />
      <div className="flex flex-wrap gap-4 mt-10 w-full">
        {todoItems.map((todoItem) => (
          <TodoCard
            key={todoItem.id}
            {...todoItem}
            onUpdate={(item) => updateTodoItem(todoItem.id, item)}
            onDelete={(id) => removeTodoItem(id)}
          />
        ))}
      </div>
    </div>
  );
}
