import { create } from "zustand";
import { ChannelEntity, ChannelResponse, MessageEntity, MessageResponse, UserProfileResponse, UserResponse } from "../api/response/schema";
import { channel } from "process";
import { UUID } from "crypto";

interface ChannelListStore {
  channels: ChannelEntity[];
  addChannel: (channel: ChannelEntity) => void;
  editChannel: (channel: ChannelEntity) => void;
  removeChannel: (channelId: UUID) => void;
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
  messages: {
    [channelId: UUID]: MessageEntity[]
  };
  updateMessages: (channelId: UUID, messages: MessageEntity[]) => void;
  addMessages:(channelId: UUID, messages: MessageEntity[]) => void;
  removeMessage: (channelId: UUID, messageId: UUID) => void;
}

export const useChannelListStore = create<ChannelListStore>((set) => ({
  channels: [],
  addChannel: (channel: ChannelEntity) => set(state => ({
    channels: [
      ...state.channels,
      channel
    ]
  })),
  editChannel: (channel: ChannelEntity) => set(state => ({
    channels: state.channels.map((c) => c.id == channel.id ? channel : c)
  })),
  removeChannel: (channelId: UUID) => (set(state => ({
    channels: state.channels.filter(it => it.id != channelId)
  }))),
  setChannels: (channelList: ChannelEntity[]) => set({
    channels: channelList
  })
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
  messages: {},
  updateMessages: (channelId: UUID, messages: MessageEntity[]) => set(state => ({
    messages: {
      ...state.messages,
      [channelId]: messages
    }
  })),
  addMessages: (channelId: UUID, messages: MessageEntity[]) => set(state => ({
    messages: {
      ...state.messages,
      [channelId]: {
        ...(state.messages[channelId]),
        ...messages
      }
    }
   })),
  removeMessage: (channelId: UUID, messageId: UUID) => set(state => ({
    messages: {
      ...state.messages,
      [channelId]: state.messages[channelId].filter(
        (message) => message.id != messageId
      )
    }
  })),
}));