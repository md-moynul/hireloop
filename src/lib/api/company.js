import { serverFetch } from "../core/server"
import { getUserSession } from "../core/session"

export const getCompanyByRecruiter = (recruiterId) =>{
    return serverFetch(`/api/my/company?recruiterId=${recruiterId}`)
}
export const getLoggedInRecruiterCompany = async()=>{
    const user = await getUserSession()
    const company =await getCompanyByRecruiter(user?.id)
    return company
}
export const getCompanyById =(companyId) =>{
    return serverFetch(`/api/company/${companyId}`)
}