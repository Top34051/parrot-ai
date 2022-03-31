import create from "zustand";

interface iformItems {
  data: {
    audio_content: {
      title: string;
      description: string;
    };
    text: {
      title: string;
      description: string;
    };
  };
  required: boolean;
  type: "short-answer";
}

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
  nq: number; //current number of question
  setNq: (nq: number) => void;
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
      formData: form,
    })),
  nq: 0,
  setNq: (nq) =>
    set((state) => ({
      ...state,
      nq,
    })),
}));

export default useStore;
