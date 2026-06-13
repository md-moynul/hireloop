import React from 'react';

const JobDetailsPage =async ({params}) => {
    const {id} = await params
    return (
        <div>
            details page
        </div>
    );
};

export default JobDetailsPage;