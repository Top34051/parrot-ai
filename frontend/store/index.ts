import create from "zustand";

export interface storeType {
  url: string;
}

const useStore = create<storeType>((set) => ({
  url: "",
}));
