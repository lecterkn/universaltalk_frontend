import { ChannelEntity } from "@/app/api/response/schema";
import { useChannelListStore } from "@/app/store/store";

export function on_add_channel(channel: ChannelEntity) {
    const { addChannel } = useChannelListStore.getState();
    addChannel(channel);
}

export function on_update_channel(channel: ChannelEntity) {
    const { addChannel } = useChannelListStore.getState();
    addChannel(channel);
}

export function on_delete_channel(channel: ChannelEntity) {
    const { removeChannel } = useChannelListStore.getState();
    removeChannel(channel.id);
}