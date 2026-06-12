import React from 'react';
import DashboardStatus from '@/components/dashboard/DashboardStatus';
import { getUserSession } from '@/lib/core/session';

const page = async () => {
    const user = await getUserSession;
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