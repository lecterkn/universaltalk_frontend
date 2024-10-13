import { ChannelEntity } from '@/app/api/response/schema';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

interface ChannelHeaderProps {
    channel: ChannelEntity;
}

const ChannelHeader:React.FC<ChannelHeaderProps> = ({channel}) => {
  return (
    <div className="text-white w-full h-16 bg-gray-600 flex items-center px-8">
      <h1 className="font-semibold text-lg">{channel.name}</h1> 
    </div>
  )
}

export const ChannelHeaderSkeleton = () => {
  return (
    <div className="text-white w-full h-16 bg-gray-600 flex items-center px-8">
      <Skeleton className="h-8 w-64"></Skeleton>
    </div>
  )
}

export default ChannelHeader
