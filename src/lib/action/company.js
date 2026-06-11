import { Base_url } from "./job"

export const createCompany = async(companyData) => {
    const res = await fetch(`${Base_url}/api/companies`,{
        method :'POST',
        headers :{
            'content-type':'application/json'
        },
        body : JSON.stringify(companyData)
    })
    return res.json()
}