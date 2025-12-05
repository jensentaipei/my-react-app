import { forwardRef, useRef, useImperativeHandle, useState } from "react";
import useTagStore from "@/stores/useTagStore";
export type ChildMethod = {
  open: () => void;
};

const TodoSetting = forwardRef<ChildMethod>((_props, ref) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { tags, addTag, removeTag } = useTagStore();
  const [tagInput, setTagInput] = useState("");
  useImperativeHandle(ref, () => ({
    open: () => modalRef.current?.showModal(),
  }));

  return (
    <dialog
      id="my_modal_1"
      className="modal"
      ref={modalRef}
      onClose={() => setTagInput("")}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">設定</h3>
        <table className="table">
          <tbody>
            <tr>
              <th>標籤</th>
              <td className="flex flex-wrap gap-2 items-center">
                {tags.map((tag) => {
                  return (
                    <div
                      key={tag}
                      className="badge badge-outline border-yellow-500"
                    >
                      <span>{tag}</span>
                      {tags.length > 1 && (
                        <button onClick={() => removeTag(tag)}>x</button>
                      )}
                    </div>
                  );
                })}
                <input
                  type="text"
                  className="input w-20 h-6"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key !== "Enter") return;
                    addTag(tagInput);
                    setTagInput("");
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
});

TodoSetting.displayName = "TodoSetting";
export default TodoSetting;
