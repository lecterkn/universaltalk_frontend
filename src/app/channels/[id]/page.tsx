"use client";

import { getChannel, getChannels, getMessages } from '@/app/api/api';
import { ChannelEntity, MessageResponse } from '@/app/api/response/schema';
import ChannelHeader, { ChannelHeaderSkeleton } from '@/app/components/channels/ChannelHeader';
import MessageCard from '@/app/components/channels/MessageCard';
import NewMessage from '@/app/components/channels/NewMessage';
import { useChannelStore, useMessageStore } from '@/app/store/store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UUID } from 'crypto';
import React, { useEffect } from 'react'

const Channel = ({params}: {params:{ id:UUID}}) => {
  const channelId = params.id
  const {messages, updateMessages } = useMessageStore();
  const {channel, setChannel} = useChannelStore();
  useEffect(() => {
    const fetchMessages = async() => {
      const messages: MessageResponse = await getMessages(channelId, null)
      updateMessages(channelId, messages.messages)
    }
    const fetchChannel = async() => {
      const channel = await getChannel(channelId)
      if (channel != null) {
        setChannel(channel)
      }
      return () => {
        setChannel(null);
      }
    }
    fetchChannel()
    fetchMessages()
  }, [updateMessages, setChannel]);
  return (
    <div className="relative w-full h-full bg-gray-700">
      {channel ? <ChannelHeader key={channel.id} channel={channel}/> : <ChannelHeaderSkeleton/>}
      <ScrollArea className="p-8 m-8 h-64">
        {messages[channelId] ? messages[channelId].map(message => (
          <MessageCard key={message.id} message={message}></MessageCard>
        )) : <div></div>}
      </ScrollArea>
      <div className="absolute bottom-8 left-8 right-8">
        <NewMessage key={channelId} channelId={channelId}></NewMessage>
      </div>
    </div>
  )
}

export default Channel
