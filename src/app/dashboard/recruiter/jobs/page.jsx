import JobsTable from "@/components/dashboard/JobsTable";
import { getJobByCompanyId } from "@/lib/api/job";

const RecruiterJobsPage = async () => {
  const companyId = "company_123_mock";

  const companyJobs = await getJobByCompanyId(companyId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Recruiter Jobs
        </h1>

        <p className="text-default-500">
          Manage all your posted jobs.
        </p>
      </div>

      <JobsTable jobs={companyJobs} />
    </div>
  );
};

export default RecruiterJobsPage;

