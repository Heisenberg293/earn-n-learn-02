
const FeaturedTasks = () => {
  const tasks = [
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

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Tasks</h2>
          <p className="text-gray-600">
            Discover popular tasks that match your skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="group p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary">
                  {task.category}
                </span>
                <span className="text-xs font-medium text-accent">
                  {task.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                {task.title}
              </h3>
              <p className="text-gray-600 mb-4">Budget: {task.budget}</p>
              <button className="w-full px-4 py-2 rounded-lg bg-secondary text-gray-900 font-medium hover:bg-accent hover:text-white transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTasks;
