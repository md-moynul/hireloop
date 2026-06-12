import JobsTable from "@/components/dashboard/JobsTable";
import { getLoggedInRecruiterCompany } from "@/lib/api/company";
import { getJobByCompanyId } from "@/lib/api/job";
import NoJobsState from "@/components/dashboard/NoJobsState";

const RecruiterJobsPage = async () => {
    const company = await getLoggedInRecruiterCompany();
    const companyJobs = await getJobByCompanyId(company._id);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Recruiter Jobs</h1>
                <p className="text-default-500">Manage all your posted jobs.</p>
            </div>

            {companyJobs?.length > 0 ? (
                <JobsTable jobs={companyJobs} />
            ) : (
                <NoJobsState />
            )}
        </div>
    );
};

export default RecruiterJobsPage;