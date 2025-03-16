
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Users, DollarSign, Clock } from "lucide-react";

const HomeActivitySummary = () => {
  const stats = [
    {
      title: "Jobs Completed",
      value: "10,000+",
      icon: <Briefcase className="h-5 w-5 text-green-600" />,
    },
    {
      title: "Active Users",
      value: "5,000+",
      icon: <Users className="h-5 w-5 text-green-600" />,
    },
    {
      title: "Payments Processed",
      value: "$2M+",
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
    },
    {
      title: "Average Response Time",
      value: "2 Hours",
      icon: <Clock className="h-5 w-5 text-green-600" />,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Platform Activity</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of professionals building their careers on our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-50 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeActivitySummary;
