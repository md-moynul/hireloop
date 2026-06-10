
const Base_url = process.env.NEXT_PUBLIC_BASE_URL
export const getJobByCompanyId = async(companyId,status="active") =>{
 const res = await fetch(`${Base_url}/api/jobs?companyId=${companyId}&status=${status}`)
 return res.json()
}