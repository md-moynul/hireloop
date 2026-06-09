import React from 'react';
import { getUser } from '@/lib/data/getUser';
import DashboardStatus from '@/components/dashboard/DashboardStatus';

const page = async () => {
    const user = await getUser();
    return (
        <div className="">
            
            <main className="flex-1 p-6">
                <div>
                    <h1 className="text-2xl font-bold">Hi, {user?.name || 'there'}!</h1>
                    <p>Welcome to your dashboard!</p>
                </div>
                <DashboardStatus />
            </main>
        </div>
    );
};

export default page;