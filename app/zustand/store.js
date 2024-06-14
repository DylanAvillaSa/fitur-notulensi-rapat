import { create } from "zustand";

export const useFormDataStore = create((set) => ({
  data: [],
  history: [],
  addData: (dataFromComp) =>
    set((state) => ({ data: [...state.data, dataFromComp] })),

  dataHistory: (data_history) =>
    set((state) => ({ history: [...state.history, data_history] })),

  editData: (form_edit_data) =>
    set((state) => ({
      data: state.data.map((dataItem) => {
        if (dataItem.no === form_edit_data.no) {
          return { ...form_edit_data };
        }
        return dataItem;
      }),
    })),

  delData: (specificData) =>
    set((state) => ({ ...state.data, data: specificData })),
}));
