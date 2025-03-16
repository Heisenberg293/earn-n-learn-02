
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FeaturedJobs = () => {
  const navigate = useNavigate();
  
  const jobs = [
    {
      id: 1,
      title: "Website Redesign",
      category: "Web Development",
      budget: "$500-1000",
      difficulty: "Intermediate",
    },
    {
      id: 2,
      title: "Logo Design",
      category: "Graphic Design",
      budget: "$200-400",
      difficulty: "Beginner",
    },
    {
      id: 3,
      title: "Content Writing",
      category: "Writing",
      budget: "$100-300",
      difficulty: "Beginner",
    },
  ];

  const handleViewDetails = (jobId: number) => {
    navigate(`/task-hub?job=${jobId}`);
  };

  const handlePostJob = () => {
    navigate("/task-hub?post=true");
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Jobs</h2>
          <p className="text-gray-600 mb-8">
            Discover popular jobs that match your skills
          </p>
          <Button 
            onClick={handlePostJob}
            className="bg-primary hover:bg-primary/90"
          >
            Post a Job
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="group p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary">
                  {job.category}
                </span>
                <span className="text-xs font-medium text-accent">
                  {job.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                {job.title}
              </h3>
              <p className="text-gray-600 mb-4">Budget: {job.budget}</p>
              <Button 
                className="w-full"
                variant="secondary"
                onClick={() => handleViewDetails(job.id)}
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
