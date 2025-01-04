"use client";

import { getChannel, getChannels, getMessages } from '@/app/api/api';
import { ChannelEntity, MessageResponse } from '@/app/api/response/schema';
import ChannelHeader, { ChannelHeaderSkeleton } from '@/app/components/channels/ChannelHeader';
import MessageCard from '@/app/components/channels/MessageCard';
import NewMessage from '@/app/components/channels/NewMessage';
import { useChannelListStore, useChannelStore, useMessageStore } from '@/app/store/store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UUID } from 'crypto';
import React, { useEffect, useRef } from 'react'

const Channel = ({params}: {params:{ id:UUID}}) => {
  const channelId = params.id
  const {messages, updateMessages } = useMessageStore();
  const {channels, addChannel } = useChannelListStore();
  useEffect(() => {
    const fetchMessages = async() => {
      if (messages[channelId] == null) {
        const messages: MessageResponse = await getMessages(channelId, null)
        if (messages != null) {
          updateMessages(channelId, messages.messages)
        }
      }
    }
    const fetchChannel = async() => {
      if (channels.find(it => it.id == channelId) == null) {
        const channel = await getChannel(channelId)
        if (channel != null) {
          addChannel(channel)
        }
      } 
    }
    fetchChannel()
    fetchMessages()
  }, [updateMessages, addChannel]);
  const channel = channels.find(it => it.id == channelId)
  return (
    <div className="relative w-full h-full bg-gray-700">
      {channel ? <ChannelHeader key={channel.id} channel={channel}/> : <ChannelHeaderSkeleton/>}
      <ScrollArea className="p-4 m-4 h-3/4">
        {messages[channelId]?.filter(it => it !== null).map(message => (
          <MessageCard key={message.id} message={message}></MessageCard>
        ))}
      </ScrollArea>
      <div className="absolute bottom-8 left-8 right-8">
        <NewMessage key={channelId} channelId={channelId}></NewMessage>
      </div>
    </div>
  )
}

export default Channel
