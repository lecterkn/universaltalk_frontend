import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Captions, Plus } from 'lucide-react'
import { Channel } from '@/app/api/response/schema'
import ChannelCard from './ChannelCard'

interface ChatMenuProps {
  channels: Channel[];
}

const ChatMenu: React.FC<ChatMenuProps> = ({channels}) => {
  return (
    <div>
      <Button asChild className='block flex items-center space-x-2'>
        <Link href='/new'>
          <Plus/>
          <span>新規作成</span>
        </Link>
      </Button>
      <nav className="space-y-1 py-2">
        {channels.map(channel => (
          <ChannelCard channel={channel}></ChannelCard>
        ))}
      </nav>
    </div>
  )
}

export default ChatMenu
