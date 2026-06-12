import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/lib/core/session';
import { getCompanyByRecruiter } from '@/lib/api/company';

const CompanyPage = async() => {
    const user =await getUserSession()
    console.log('company page user',user);
    if(!user){
        return
    }
    const company =await getCompanyByRecruiter(user?.id)
    console.log("company by re ",company);
    
    
    return (
        <div>
           <CompanyProfile recruiter={user} recruiterCompany={company} /> 
        </div>
    );
};

export default CompanyPage;