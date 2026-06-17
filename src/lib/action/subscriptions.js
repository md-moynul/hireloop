import { serverMutation } from "../core/server"

export const createSubscriptions = (subInfo)=>{
    return serverMutation('/api/subscriptions', subInfo)
}