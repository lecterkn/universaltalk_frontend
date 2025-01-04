import { MessageEntity } from "@/app/api/response/schema";
import { useMessageStore } from "@/app/store/store";

export function on_add_message(message: MessageEntity) {
    const { addMessages } = useMessageStore.getState();
    console.log("event: AddMessage " + message);
    addMessages(message.channelId, [message]);
}

export function on_update_message(message: MessageEntity) {
    const { updateMessages } = useMessageStore.getState();
    updateMessages(message.channelId, [message]);
}

export function on_delete_message(message: MessageEntity) {
    const { removeMessage } = useMessageStore.getState();
    removeMessage(message.channelId, message.id);
}