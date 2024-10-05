import React from 'react'
import { User } from 'lucide-react'
import { UserProfileResponse, UserResponse } from '@/app/api/response/schema'

interface UserTabProps {
  user: UserResponse,
  profile: UserProfileResponse
}

const UserTab:React.FC<UserTabProps> = ({user, profile}) => {
  return (
    <div className="flex items-ecnter space-x-2">
        <div className="flex-shrink-0 flex justify-center items-center">
            <User className="h-8 w-8">
            </User>
        </div>
        <div className="flex flex-col justify-center">
            <span className="text-md font-semibold">{profile.displayName}</span>
            <span className="text-sm text-gray-500">@{user.name}</span>
        </div>
    </div>
  )
}

export default UserTab
