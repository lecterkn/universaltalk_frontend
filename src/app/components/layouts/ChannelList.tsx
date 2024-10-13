import React from "react";
import { ChannelEntity } from "@/app/api/response/schema";
import ChannelCard, { ChannelCardSkeleton } from "./ChannelCard";

interface ChannelListProps {
  channels: ChannelEntity[];
}

const ChatMenu: React.FC<ChannelListProps> = ({ channels }) => {
  return (
    <div>
      <nav className="space-y-1 py-2">
        {channels.filter(it => it != null).map((channel) => (
          <ChannelCard key={channel.id} channel={channel}></ChannelCard>
        ))}
      </nav>
    </div>
  );
};

export const ChatMenuSkelton = () => {
  return (
    <div>
      <nav className="space-y-1 py-2">
        <ChannelCardSkeleton></ChannelCardSkeleton>
        <ChannelCardSkeleton></ChannelCardSkeleton>
        <ChannelCardSkeleton></ChannelCardSkeleton>
      </nav>
    </div>
  )
}

export default ChatMenu;
