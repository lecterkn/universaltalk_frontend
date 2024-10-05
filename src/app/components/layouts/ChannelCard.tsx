import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Captions } from 'lucide-react'
import { Channel } from '@/app/api/response/schema'

interface ChannelCardProps {
  channel: Channel;
}

const ChannelCard: React.FC<ChannelCardProps> = ({channel}) => {
  return (
    <div>
        <Button asChild variant="ghost" className='block flex justify-start items-center space-x-2'>
          <Link href={`/channels/${channel.id}`}>
            <Captions/>
            <span className="text-md font-semibold">{channel.name}</span>
          </Link>
        </Button>
    </div>
  )
}

export default ChannelCard
