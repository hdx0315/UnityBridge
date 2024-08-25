

import {create} from 'zustand';

export const useCameraMsgStore = create((set) => ({
  message: '',
  setCameraMessage: (message) => set({ message }),
}));
