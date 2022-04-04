import create from "zustand";

interface iformItems {
  data: {
    audio: string;
    text: string;
  };
  required: boolean;
  type: string;
}

export interface iFormData {
  description: string;
  form_items: iformItems[];
  title: string;
}

export interface Answer {
  audio: string;
  text: string;
}

export interface storeType {
  url: string;
  setUrl: (url: string) => void;
  formData: iFormData | null;
  setFormData: (form: iFormData) => void;
  questionIndex: number; 
  setQuestionIndex: (questionIndex: number) => void;
  answers: Answer[];
  setAnswer: (questionIndex: number, answer: Answer) => void;
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
  questionIndex: 0,
  setQuestionIndex: (questionIndex) =>
    set((state) => ({
      ...state,
      questionIndex,
    })),
  answers: [],
  setAnswer: (questionIndex, answer) =>
    set((state) => ({
      ...state,
      answers: [
        ...state.answers.slice(0, questionIndex),
        answer,
        ...state.answers.slice(questionIndex+1),
      ],
    })),
}));

export default useStore;
