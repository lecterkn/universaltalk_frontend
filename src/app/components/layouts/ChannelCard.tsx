import React from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Captions } from 'lucide-react'
import { ChannelEntity } from '@/app/api/response/schema'
import { Skeleton } from '@/components/ui/skeleton'

interface ChannelCardProps {
  channel: ChannelEntity;
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

export const ChannelCardSkelton = () => {
  return (
    <div>
      <div className='block flex justify-start items-center space-x-2'>
        <Skeleton className="h-8 w-64 mx-4 my-2 rounded-full"/>
      </div>
    </div>
  )
}

export default ChannelCard
