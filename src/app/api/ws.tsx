"use client";

import { UUID } from 'crypto';
import Cookies from 'js-cookie';
import { useMessageStore } from '../store/store';
import { MessageEntity } from './response/schema';

const jwtToken = () => {
  return Cookies.get("token");
}

interface EventMessage {
    src: UUID,
    event: string,
    message: string;
}

export async function ws_handler() {
    const token = jwtToken();
    if (token == undefined) {
        console.log("token is undefined");
        return
    }
    console.log("ws handshake");
    const socket = new WebSocket("ws://localhost:8891");
    socket.onopen = function(event) {
        socket.send(token);
        console.log("waiting for ws server...");
    }
    socket.onmessage = function(event) {
        if (event.data == token) {
            console.log("websocket connected");
            return
        }
        const messageEvent: EventMessage = JSON.parse(event.data)
        if (messageEvent.event == "message") {
            const message: MessageEntity = JSON.parse(messageEvent.message);
            const {addMessages} = useMessageStore.getState();
            addMessages(message.channelId, [message]);
        }
    }
}