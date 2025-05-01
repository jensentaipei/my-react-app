import { TodoItem } from "@/stores/useTodoItemsStore";
import CreateTodoModal, {
  ChildMethod as CreateMethod,
  State as CreateTodoState,
} from "@/components/CreateTodoModal";
import { useRef } from "react";
type TodoCardProps = TodoItem & {
  onUpdate: (todoItem: TodoItem) => void;
  onDelete: (id: string) => void;
};

const TodoCard = ({
  title,
  content,
  id,
  completed,
  tag,
  onUpdate,
  onDelete,
}: TodoCardProps) => {
  const todoItem = {
    title,
    content,
    id,
    completed,
    tag,
  };
  const createTodoRef = useRef<CreateMethod>(null);

  function updateTodo(data: CreateTodoState) {
    onUpdate({
      ...todoItem,
      title: data.title,
      content: data.content,
      tag: data.tag,
    });
  }
  return (
    <div className="card bg-gray-500  shadow-sm w-50 relative" key={id}>
      <div className="card-body">
        <div className="flex items-center gap-2">
          <h2 className="card-title">{title}</h2>
          <div className="badge badge-outline">{tag}</div>
        </div>
        <p>{content}</p>
      </div>
      <div className="absolute bottom-5 right-3">
        <input
          type="checkbox"
          checked={completed}
          className="checkbox"
          onChange={(e) => {
            onUpdate({
              ...todoItem,
              completed: e.target.checked,
            });
          }}
        />
      </div>
      <div className="dropdown absolute top-2 right-3">
        <div tabIndex={0} role="button" className="size-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>{" "}
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li>
            <a
              onClick={() => {
                createTodoRef.current?.open(todoItem);
              }}
            >
              編輯
            </a>
          </li>
          <li className="bg-red-400">
            <a
              onClick={() => {
                onDelete(id);
              }}
            >
              刪除
            </a>
          </li>
        </ul>
      </div>
      <CreateTodoModal ref={createTodoRef} onSubmit={updateTodo} />
    </div>
  );
};

export default TodoCard;
