import { serverMutation } from "../core/server"

export const applicationSubmit = (applicationData) =>{
    return serverMutation('/api/application' ,applicationData)
}