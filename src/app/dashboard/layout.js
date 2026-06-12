import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { getLoggedInRecruiterCompany } from '@/lib/api/company';
import React from 'react';

const layout = async({children}) => {
    const recruiter = await getLoggedInRecruiterCompany()
    return (
        <div className='flex min-h-screen'>
            <DashboardSidebar recruiter={recruiter}/>
            <main className="flex-1 p-6">
                {children}
            </main>
         
        </div>
    );
};

export default layout;