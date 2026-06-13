import { serverFetch } from "../core/server"

export const getJobByCompanyId = async(companyId,status="active") =>{
 return serverFetch(`/api/jobs?companyId=${companyId}&status=${status}`)
}
export const getAllJobs = async()=>{
    return serverFetch('/api/jobs')
}
export const getJobByJobId = (jobId) => {
    return serverFetch(`/api/jobs/${jobId}`)
}