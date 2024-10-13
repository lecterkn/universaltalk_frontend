"use client";

import React, { useEffect } from "react";
import ChatMenu, { ChatMenuSkelton } from "./ChannelList";
import UserTab, { UserTabSkelton } from "./UserTab";
import { getChannels, getUser, getUserProfile } from "@/app/api/api";
import {
  ChannelResponse,
  UserProfileResponse,
  UserResponse,
} from "@/app/api/response/schema";
import { useChannelListStore, useUserProfileListStorea, useUserStore } from "@/app/store/store";
import NewChat from "./NewChat";
import { useCookies } from 'next-client-cookies';
import { redirect } from "next/navigation";

const Sidebar = () => {
  const token = useCookies().get("token");
  if (token == undefined || token.length < 1) {
    redirect("/login");
    return
  }
  const {channels, setChannels} = useChannelListStore();
  const {updateProfiles} = useUserProfileListStorea();
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
      updateProfiles(profile);
    }
    fetchChannels();
    fetchUser();
  }, [setChannels, updateProfiles]);

  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4">
      <h1 className="text-exl font-bold mb-4">UniversalTalk</h1>
      <NewChat/>
      {channels?.length > 0 ? <ChatMenu channels={channels}></ChatMenu> : <ChatMenuSkelton/>}
      <div className="absolute bottom-4 left-4 right-4">
        {user && profile ? <UserTab user={user} profile={profile}></UserTab> : <UserTabSkelton/>}
      </div>
    </div>
  );
};

export default Sidebar;
