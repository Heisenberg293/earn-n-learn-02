
import { Search, FileText, Shield } from "lucide-react";

const HomeFeatureHighlights = () => {
  const features = [
    {
      title: "Find Jobs Easily",
      description: "Browse through hundreds of opportunities matching your skills and interests",
      icon: <Search className="h-10 w-10 text-green-600" />,
    },
    {
      title: "Post Jobs and Hire",
      description: "Create your job listing in minutes and connect with talented professionals",
      icon: <FileText className="h-10 w-10 text-green-600" />,
    },
    {
      title: "Secure Payments",
      description: "Our escrow system ensures safe transactions for both parties",
      icon: <Shield className="h-10 w-10 text-green-600" />,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How We Can Help You</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform makes it easy to connect talent with opportunities
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

export default HomeFeatureHighlights;
