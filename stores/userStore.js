//userStore.js 

import { create } from 'zustand';

// Store for user profile information
export const useUserStore = create((set) => ({
  name: '',
  profilePic: null,
  setNameAndProfilePic: (name, profilePic) => set({ name, profilePic }),
  // Optional: method to update profile pic
  updateProfilePic: (profilePic) => set({ profilePic }),
}));

// Store for call information
export const useUserCallStore = create((set) => ({
  name: '',
  profilePic: null,
  calltype: '', // missed, outgoing, incoming
  setNameProfilePicAndCalltype: (name, profilePic, calltype) => set({ name, profilePic, calltype }),
}));

// Store for managing users and chat data
export const useChatStore = create((set) => ({
  users: [],
  chats: [],
  setUsers: (users) => set({ users }),
  setChats: (chats) => set({ chats }),
}));
