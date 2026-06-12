import React from 'react';
import CompanyProfile from './CompanyProfile';
import { getUserSession } from '@/lib/core/session';

const CompanyPage = async() => {
    const user =await getUserSession()
    console.log('company page user',user);
    
    return (
        <div>
           <CompanyProfile /> 
        </div>
    );
};

export default CompanyPage;