import { UUID } from "crypto";
import {
  ChannelEntity,
  ChannelResponse,
  LoginResponse,
  MessageEntity,
  MessageResponse,
  UserProfileResponse,
  UserResponse,
} from "./response/schema";
import Cookies from 'js-cookie';

const host = "http://localhost:8765";
// TODO 認証形式を変更する
const authorizationHeader = () => {
  return `Bearer ${Cookies.get("token")}`
}
//const authorization = `Basic ${btoa("lecter:mysecretpassword")}`;
export async function registerUser(username:string, password:string) {
  const response = await fetch(`${host}/api/v1/register`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({name: username, password: password})
  });
  if (response.status != 200) {
    return null;
  }
  const data: UserResponse = await response.json();
  return data;
}

export async function postLogin(username:string, password:string) {
  const response = await fetch(`${host}/api/v1/login`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({name: username, password: password})
  });
  if (response.status != 200) {
    return null;
  }
  const data: LoginResponse = await response.json();
  return data;
}

export async function getUser() {
  const response = await fetch(`${host}/api/v1/users/`, {
    cache: "no-store",
    headers: {
      Authorization: authorizationHeader()
    },
  });
  const data: UserResponse = await response.json();
  return data;
}

export async function getUserProfile(id: UUID) {
  const response = await fetch(`${host}/api/v1/users/${id}/profiles`, {
    cache: "no-store",
    headers: {
      Authorization: authorizationHeader(),
    },
  });
  const data: UserProfileResponse = await response.json();
  return data;
}

export async function updateChannel(id: UUID, name: string, permission: string) {
  const response = await fetch(`${host}/api/v1/users/channels/${id}`, {
    method: "PATCH",
    cache: "no-store",
    headers: {
      Authorization: authorizationHeader(),
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({name: name, permission: permission})
  });
  const data: ChannelEntity = await response.json();
  return data;
}


export async function createChannel(name: string, permission: string) {
  const response = await fetch(`${host}/api/v1/users/channels`, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: authorizationHeader(),
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({name: name, permission: permission})
  });
  const data: ChannelEntity = await response.json();
  return data;
}

export async function deleteChannel(id: UUID) {
  const response = await fetch(`${host}/api/v1/users/channels/${id}`, {
    method: "DELETE",
    cache: "no-store",
    headers: {
      Authorization: authorizationHeader(),
    },
  });
  return response.status == 204;
}

export async function getChannel(id: UUID) {
  const response = await fetch(`${host}/api/v1/users/channels/${id}`, {
    cache: "no-store",
    headers: {
      Authorization: authorizationHeader(),
    },
  });
  if (response.status != 200) {
    return null
  }
  const data: ChannelEntity = await response.json();
  return data;
}

export async function getChannels() {
  const response = await fetch(`${host}/api/v1/users/channels`, {
    cache: "no-store",
    headers: {
      Authorization: authorizationHeader(),
    },
  });
  const data: ChannelResponse = await response.json();
  return data;
}

export async function sendMessage(channelId: UUID, message: string) {
  const response = await fetch(`${host}/api/v1/users/channels/${channelId}/messages`, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: authorizationHeader(),
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({message:message})
  });
  const data: MessageEntity = await response.json();
  return data;
}

const MESSAGE_LIMIT = 50;
export async function getMessages(channelId: UUID, lastMessageId: UUID | null) {
  const response = await fetch(
    `${host}/api/v1/users/channels/${channelId}/messages?limit=${MESSAGE_LIMIT}`,
    {
      cache: "no-store",
      headers: {
        Authorization: authorizationHeader(),
      },
    }
  );
  const data: MessageResponse = await response.json();
  return data;
}
