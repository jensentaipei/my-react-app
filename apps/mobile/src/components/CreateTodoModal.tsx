import {
  useReducer,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import useTagStore from "@/stores/useTagStore";
import { TodoItem } from "@/stores/useTodoItemsStore";
export type State = {
  title: string;
  content: string;
  tag: string;
};

type Action = {
  type: "UPDATE" | "CLEAR";
  payload?: Partial<State>;
};

export type ChildMethod = {
  open: (todoItem?: TodoItem) => void;
};

type Props = {
  onSubmit: (data: State) => void;
};

const CreateTodoModal = forwardRef<ChildMethod, Props>(({ onSubmit }, ref) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const tags = useTagStore((state) => state.tags);
  const [editMode, setEditMode] = useState(false);

  const [errorStatus, setErrorStatus] = useState({
    title: false,
    content: false,
  });

  useEffect(() => {
    dispatch({ type: "UPDATE", payload: { tag: tags[0] } });
  }, [tags]);

  const [state, dispatch] = useReducer(reducer, {
    title: "",
    content: "",
    tag: tags[0],
  });

  useImperativeHandle(ref, () => ({
    open: (todoItem?: TodoItem) => {
      setEditMode(!!todoItem);
      if (todoItem) {
        dispatch({
          type: "UPDATE",
          payload: {
            ...todoItem,
            tag: tags.includes(todoItem.tag) ? todoItem.tag : tags[0],
          },
        });
      }
      modalRef.current?.showModal();
    },
  }));

  function reducer(state: State, action: Action) {
    switch (action.type) {
      case "UPDATE":
        if (action.payload) {
          const key = Object.keys(action.payload)[0];
          setErrorStatus({ ...errorStatus, [key]: false });
        }
        return { ...state, ...action.payload };
      case "CLEAR":
        setErrorStatus({ title: false, content: false });
        return { title: "", content: "", tag: tags[0] };
    }
  }

  function closeModal() {
    modalRef.current?.close();
    dispatch({ type: "CLEAR" });
  }

  function createTodo() {
    const newErrorStatus = Object.keys(errorStatus).reduce((acc, key) => {
      const isEmpty = state[key as keyof State] === "";
      return { ...acc, [key]: isEmpty };
    }, {} as typeof errorStatus);

    setErrorStatus(newErrorStatus);

    if (Object.values(newErrorStatus).some(Boolean)) {
      return;
    }
    onSubmit(state);
    dispatch({ type: "CLEAR" });
    modalRef.current?.close();
  }

  return (
    <dialog
      id="my_modal_1"
      className="modal"
      ref={modalRef}
      onClose={() => dispatch({ type: "CLEAR" })}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {editMode ? "編輯代辦事項" : "建立代辦事項"}
        </h3>
        <table className="table">
          <tbody>
            <tr>
              <th>標題</th>
              <td>
                <input
                  type="text"
                  value={state.title}
                  placeholder="輸入標題"
                  className={`input ${errorStatus.title ? "input-error" : ""}`}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE",
                      payload: { title: e.target.value },
                    })
                  }
                />
                {errorStatus.title && (
                  <p className="text-red-500 fieldset-label">請輸入標題</p>
                )}
              </td>
            </tr>
            <tr>
              <th>標籤</th>
              <td>
                <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn m-1">
                    {state.tag}
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                  >
                    {tags.map((tag) => (
                      <li
                        key={tag}
                        onClick={() => {
                          (document.activeElement as HTMLElement)?.blur();
                          dispatch({ type: "UPDATE", payload: { tag } });
                        }}
                      >
                        <a>{tag}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <th>內容</th>
              <td>
                <textarea
                  className={`textarea ${
                    errorStatus.content ? "textarea-error" : ""
                  }`}
                  placeholder="輸入內容"
                  value={state.content}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE",
                      payload: { content: e.target.value },
                    })
                  }
                />
                {errorStatus.content && (
                  <p className="text-red-500 fieldset-label">請輸入內容</p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end w-full gap-2">
          <button className="btn btn-ghost" onClick={closeModal}>
            取消
          </button>
          <button className="btn btn-primary" onClick={createTodo}>
            {editMode ? "更新" : "建立"}
          </button>
        </div>
      </div>
    </dialog>
  );
});

CreateTodoModal.displayName = "CreateTodoModal";
export default CreateTodoModal;
