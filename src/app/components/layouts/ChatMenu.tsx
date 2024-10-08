import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Captions, Plus } from "lucide-react";
import { ChannelEntity } from "@/app/api/response/schema";
import ChannelCard, { ChannelCardSkelton } from "./ChannelCard";

interface ChatMenuProps {
  channels: ChannelEntity[];
}

const ChatMenu: React.FC<ChatMenuProps> = ({ channels }) => {
  return (
    <div>
      <nav className="space-y-1 py-2">
        {channels.map((channel) => (
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
        <ChannelCardSkelton></ChannelCardSkelton>
        <ChannelCardSkelton></ChannelCardSkelton>
        <ChannelCardSkelton></ChannelCardSkelton>
      </nav>
    </div>
  )
}

export default ChatMenu;
