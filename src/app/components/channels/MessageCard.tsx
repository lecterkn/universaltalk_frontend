import { MessageEntity } from '@/app/api/response/schema'
import { User } from 'lucide-react'
import React from 'react'

interface MessageCardProps {
    message: MessageEntity;
}

const MessageCard:React.FC<MessageCardProps> = ({message}) => {
  return (
    <div className="text-white flex space-x-2 py-2">
      <div className="flex-shrink-0 flex justify-center py-2">
        <User className="h-8 w-8">
        </User>
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-md font-semibold">{message.userId}</span>
        <div className="inline-block rounded bg-gray-800 px-2 py-1">
          <span className="text-sm">{message.message}</span>
        </div>
      </div>
    </div>
  )
}

export default MessageCard
