import { UUID } from "crypto";
import { Channel, ChannelResponse, UserProfileResponse, UserResponse } from "./response/schema";

const host = "http://localhost:8765"
// TODO 認証形式を変更する
const authorization = `Basic ${btoa("lecter:mysecretpassword")}`

export async function getUser() {
    const response = await fetch(`${host}/api/v1/users/`, {
        cache: "no-store",
        headers: {
            Authorization: authorization
        }
    });
    const data: UserResponse = await response.json();
    return data 
}

export async function getUserProfile(id: UUID) {
    const response = await fetch(`${host}/api/v1/users/${id}/profiles`, {
        cache: "no-store",
        headers: {
            Authorization: authorization
        }
    });
    const data: UserProfileResponse = await response.json();
    return data 
}

export async function getChannels() {
    const response = await fetch(`${host}/api/v1/users/channels/`, {
        cache: "no-store",
        headers: {
            Authorization: authorization
        }
    })
    const data: ChannelResponse = await response.json()
    return data
}