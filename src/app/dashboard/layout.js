import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const layout = ({children}) => {
    return (
        <div className='flex min-h-screen'>
            <DashboardSidebar />
            <main className="flex-1 p-6">
                {children}
            </main>
         
        </div>
    );
};

export default layout;