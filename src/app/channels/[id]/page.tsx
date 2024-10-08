"use client";

import { getChannel, getChannels, getMessages } from '@/app/api/api';
import { ChannelEntity, MessageResponse } from '@/app/api/response/schema';
import ChannelHeader, { ChannelHeaderSkeleton } from '@/app/components/channels/ChannelHeader';
import MessageCard from '@/app/components/channels/MessageCard';
import NewMessage from '@/app/components/channels/NewMessage';
import { useChannelStore, useMessageStore } from '@/app/store/store';
import { UUID } from 'crypto';
import React, { useEffect } from 'react'

const Channel = ({params}: {params:{ id:UUID}}) => {
  const channelId = params.id
  const {messages, setMessages } = useMessageStore();
  const {channel, setChannel} = useChannelStore();
  useEffect(() => {
    const fetchMessages = async() => {
      const messages: MessageResponse = await getMessages(channelId, null)
      setMessages(messages)
      return () => {
        setMessages(null);
      }
    }
    const fetchChannel = async() => {
      const channel: ChannelEntity = await getChannel(channelId)
      setChannel(channel)
      return () => {
        setChannel(null);
      }
    }
    fetchChannel()
    fetchMessages()
  }, [setMessages, setChannel]);
  return (
    <div className="relative w-full h-full bg-gray-700">
      {channel ? <ChannelHeader key={channel.id} channel={channel}/> : <ChannelHeaderSkeleton/>}
      <div className="p-8 m-8">
        {messages ? messages.messages.map(message => (
          <MessageCard key={message.id} message={message}></MessageCard>
        )) : <div></div>}
      </div>
      <div className="absolute bottom-8 left-8 right-8">
        <NewMessage key={channelId} channelId={channelId}></NewMessage>
      </div>
    </div>
  )
}

export default Channel
