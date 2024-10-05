import React from 'react'
import ChatMenu from './ChatMenu'
import UserTab from './UserTab'
import { getChannels, getUser, getUserProfile } from '@/app/api/api'
import { ChannelResponse, UserProfileResponse, UserResponse } from '@/app/api/response/schema'

const Sidebar = async () => {
  // チャンネル取得
  const channels:ChannelResponse = await getChannels()
  // ユーザー取得
  const user: UserResponse = await getUser()
  // ユーザープロフィール取得
  const profile: UserProfileResponse = await getUserProfile(user.id)

  return (
    <div className='relative bg-gray-800 text-white w-64 h-screen p-4'>
      <h1 className="text-exl font-bold mb-4">
          UniversalTalk
      </h1>
      <ChatMenu channels={ channels.list }></ChatMenu>
      <div className="absolute bottom-4 left-4 right-4">
        <UserTab user={user} profile={profile}></UserTab>
      </div>
    </div>
  )
}

export default Sidebar
