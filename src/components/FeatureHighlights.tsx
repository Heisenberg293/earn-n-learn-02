
import { Briefcase, TrendingUp, GraduationCap } from "lucide-react";

const FeatureHighlights = () => {
  const features = [
    {
      title: "Job Listings",
      description: "Find freelance opportunities matching your skills and interests",
      icon: <Briefcase className="h-10 w-10 text-green-600" />,
    },
    {
      title: "Microfinance",
      description: "Get funding for your projects or invest in others' initiatives",
      icon: <TrendingUp className="h-10 w-10 text-green-600" />,
    },
    {
      title: "Learning Opportunities",
      description: "Develop new skills while earning through hands-on projects",
      icon: <GraduationCap className="h-10 w-10 text-green-600" />,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform offers everything you need to find work, secure funding, and grow your skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-green-50 rounded-full">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
