import { create } from "zustand";
import { ChannelEntity, ChannelResponse, MessageResponse, UserProfileResponse, UserResponse } from "../api/response/schema";
import { channel } from "process";

interface ChannelListStore {
  channels: ChannelEntity[];
  addChannel: (channel: ChannelEntity) => void;
  setChannels: (channel: ChannelEntity[]) => void;
}

interface ChannelStore {
  channel: ChannelEntity | null;
  setChannel: (channel: ChannelEntity | null) => void;
}

interface UserStore {
  user: UserResponse | null;
  profile: UserProfileResponse | null;
  setUser: (user: UserResponse) => void;
  setProfile: (profile: UserProfileResponse) => void;
}

interface MessageStore {
  messages: MessageResponse | null;
  setMessages: (messages: MessageResponse | null) => void;
}

export const useChannelListStore = create<ChannelListStore>((set) => ({
  channels: [],
  addChannel: (channel: ChannelEntity) => set(state => ({
    channels: [...state.channels, channel]
  })),
  setChannels: (channels: ChannelEntity[]) => set({channels})
}));

export const useChannelStore = create<ChannelStore>((set) => ({
  channel: null,
  setChannel: (channel: ChannelEntity | null) => set({channel})
}))

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  profile: null,
  setUser: (user: UserResponse) => set({user}),
  setProfile: (profile: UserProfileResponse) => set({profile})
}));

export const useMessageStore = create<MessageStore>((set) => ({
  messages: null,
  setMessages: (messages: MessageResponse | null) => set({messages})
}))