import { create } from "zustand";
import { persist } from 'zustand/middleware'
interface TagStore {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
}

const useTagStore = create<TagStore>()(
  persist((set, get) => ({
    tags: [],
    addTag: (tag) => {
      if (get().tags.includes(tag)) {
      return;
    }
    set((state) => ({ tags: [...state.tags, tag] }));
  },
  removeTag: (tag) => set((state) => ({ tags: state.tags.filter((t) => t !== tag) })),
}),
  {
    name: "tags",
  }
));

export default useTagStore;