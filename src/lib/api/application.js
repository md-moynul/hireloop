import { serverFetch } from "../core/server"

export const getApplicationByCandidateId = (candidateId) =>{
    return serverFetch(`/api/application?candidateId=${candidateId}`)
}