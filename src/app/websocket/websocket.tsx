"use client";

import { UUID } from "crypto";
import Cookies from "js-cookie";
import { ChannelEntity, MessageEntity } from "../api/response/schema";
import { on_add_message, on_delete_message, on_update_message } from "./handlers/message_handler";
import { on_add_channel, on_delete_channel, on_update_channel } from "./handlers/channel_handler";

const jwtToken = () => {
  return Cookies.get("token");
};

interface EventMessage {
  src: UUID;
  event: string;
  message: string;
}

export async function ws_handler() {
  const token = jwtToken();
  if (token == undefined) {
    console.log("token is undefined");
    return;
  }
  const socket = new WebSocket("ws://localhost:8891");
  // JWT認証
  socket.onopen = function (event) {
    socket.send(token);
    console.log("waiting for ws server...");
  };
  socket.onmessage = handle_event
}

function handle_event(event: MessageEvent<any>) {
    if (event.data == jwtToken()) {
      console.log("websocket connected");
      return;
    }
    console.log("websocket receveid: " + event.data);
    // イベントメッセージに変換
    const messageEvent: EventMessage = JSON.parse(event.data);
    // 新規メッセージの場合
    if (messageEvent.event == "add_message") {
      const message: MessageEntity = JSON.parse(messageEvent.message);
      on_add_message(message);
    }
    else if (messageEvent.event == "update_message") {
      const message: MessageEntity = JSON.parse(messageEvent.message);
      on_update_message(message);
    }
    else if (messageEvent.event == "delete_message") {
      const message: MessageEntity = JSON.parse(messageEvent.message);
      on_delete_message(message);
    }
    else if (messageEvent.event == "add_channel") {
      const channel: ChannelEntity = JSON.parse(messageEvent.message);
      on_add_channel(channel);
    }
    else if (messageEvent.event == "update_channel") {
      const channel: ChannelEntity = JSON.parse(messageEvent.message);
      on_update_channel(channel);
    }
    else if (messageEvent.event == "remove_channel") {
      const channel: ChannelEntity = JSON.parse(messageEvent.message);
      on_delete_channel(channel);
    }
}
