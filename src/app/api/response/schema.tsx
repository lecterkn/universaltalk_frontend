import { UUID } from "crypto";

export interface ChannelResponse {
    list: ChannelEntity[]
}

export interface MessageResponse {
    messages: MessageEntity[]
}

export interface UserAndProfile {
    user: UserResponse;
    profile: UserProfileResponse;
}

export interface UserResponse {
    id: UUID;
    name: string;
    language: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserProfileResponse {
    id: UUID;
    userId: UUID;
    displayName: string;
    url: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface MessageEntity {
    id: UUID;
    channelId: UUID;
    userId: UUID;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

export const ChannelPermissions = [
    {
      value: "readOnly",
      label: "閲覧のみ"
    },
    {
      value: "writable",
      label: "書込可能"
    },
    {
      value: "private",
      label: "非公開"
    }
]

export interface ChannelEntity {
    id: UUID;
    ownerId: UUID;
    name: string;
    permission: string;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}