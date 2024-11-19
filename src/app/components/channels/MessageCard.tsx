import { getUserProfile } from '@/app/api/api';
import { MessageEntity } from '@/app/api/response/schema'
import { useUserProfileListStorea } from '@/app/store/store';
import { Skeleton } from '@/components/ui/skeleton';
import { User } from 'lucide-react'
import { UUID } from 'node:crypto';
import React from 'react'

interface MessageCardProps {
    message: MessageEntity;
}

const MessageCard:React.FC<MessageCardProps> = ({message}) => {
  const {profiles, updateProfiles} = useUserProfileListStorea();
  const fetchUserProfile = async(id: UUID) => {
    const response = await getUserProfile(id)
    if (response !== null) {
      updateProfiles(response);
    }
  }
  const renderProfile = () => {
    const profile = profiles.find(it => it.userId == message.userId)
    if (profile == null) {
      fetchUserProfile(message.userId);
      return (<MessageSkeleton/>)
    }
    return (profile.displayName)
  }
  return (
    <div className="text-white flex space-x-2 py-2">
      <div className="flex-shrink-0 flex justify-center py-2">
        <User className="h-8 w-8">
        </User>
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-md font-semibold">
          {renderProfile()}
          <span className='font-light pl-4 text-gray-400'>
            {new Date(message.createdAt).toLocaleDateString()}
          </span>
          <span className='font-light pl-2 text-gray-400'>
            {new Date(message.createdAt).toLocaleTimeString()}
          </span>
        </span>
        <div className="inline-block rounded bg-gray-800 px-2 py-1">
          <span className="text-sm">{message.message}</span>
        </div>
      </div>
    </div>
  )
}

export const MessageSkeleton = () => {
  return (
    <Skeleton className='h-4 w-32 my-2'></Skeleton>
  )
}

export default MessageCard
