import create from "zustand";

interface iformItems {}

export interface iFormData {
  description: string;
  form_items: iformItems[];
  title: string;
}

export interface storeType {
  url: string;
  setUrl: (url: string) => void;
  formData: iFormData | null;
  setFormData: (form: iFormData) => void;
}

const useStore = create<storeType>((set) => ({
  url: "",
  setUrl: (url) =>
    set((state) => ({
      ...state,
      url,
    })),
  formData: null,
  setFormData: (form) =>
    set((state) => ({
      ...state,
      form,
    })),
}));

export default useStore;
