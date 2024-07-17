// userStore.js (or any suitable name)
import {create} from 'zustand';

export const useUserStore = create((set) => ({
  name: '',
  profilePic: null,
  setNameAndProfilePic: (name, profilePic) => set({ name, profilePic }),
}));

export const useUserCallStore = create((set) => ({
  name: '',
  profilePic: null,
  calltype: '', // missed, outgoing, incoming
  setNameProfilePicAndCalltype: (name, profilePic, calltype) => set({ name, profilePic, calltype }),
}));
