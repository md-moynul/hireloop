import { getLoggedInRecruiterCompany } from '@/lib/api/company';
import React from 'react';
import AddJobFrom from './AddJobFrom';

const AddJobPage = async() => {
    const company = await getLoggedInRecruiterCompany()
    // console.log(company);
    
    return (
        <div>
            <AddJobFrom company={company}/>
        </div>
    );
};

export default AddJobPage;