"use client";

import React, { useEffect } from "react";
import ChatMenu, { ChatMenuSkelton } from "./ChatMenu";
import UserTab, { UserTabSkelton } from "./UserTab";
import { getChannels, getUser, getUserProfile } from "@/app/api/api";
import {
  ChannelResponse,
  UserProfileResponse,
  UserResponse,
} from "@/app/api/response/schema";
import { useChannelListStore, useUserStore } from "@/app/store/store";
import NewChat from "./NewChat";

const Sidebar = () => {
  const {channels, setChannels} = useChannelListStore();
  const {user, profile, setUser, setProfile} = useUserStore();
  useEffect(() => {
    // チャンネル取得
    const fetchChannels = async () => {
      const channels: ChannelResponse = await getChannels();
      setChannels(channels.list);
    }
    const fetchUser = async() => {
      // ユーザー取得
      const user: UserResponse = await getUser();
      setUser(user);
      const profile: UserProfileResponse = await getUserProfile(user.id);
      setProfile(profile);
    }
    fetchChannels();
    fetchUser();
  }, [setChannels, setProfile]);

  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4">
      <h1 className="text-exl font-bold mb-4">UniversalTalk</h1>
      <NewChat/>
      {channels.length > 0 ? <ChatMenu channels={channels}></ChatMenu> : <ChatMenuSkelton/>}
      <div className="absolute bottom-4 left-4 right-4">
        {user && profile ? <UserTab user={user} profile={profile}></UserTab> : <UserTabSkelton/>}
      </div>
    </div>
  );
};

export default Sidebar;
