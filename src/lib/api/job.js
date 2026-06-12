import { serverFetch } from "../core/server"

export const getJobByCompanyId = async(companyId,status="active") =>{
 return serverFetch(`/api/jobs?companyId=${companyId}&status=${status}`)
}