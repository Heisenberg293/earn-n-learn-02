
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Freelance Designer",
      message:
        "earn-n-learn helped me find consistent design work while improving my skills. The platform's focus on learning while earning is exactly what I needed to grow my career.",
      avatar: "/placeholder.svg",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Project Owner",
      message:
        "As a small business owner, I've found incredible talent through this platform. The quality of work is outstanding, and the process is streamlined and efficient.",
      avatar: "/placeholder.svg",
      rating: 5,
    },
    {
      id: 3,
      name: "Aisha Patel",
      role: "Web Developer",
      message:
        "The microfinance options helped me fund my equipment upgrades, which directly led to me landing bigger projects. This platform truly invests in freelancers' success.",
      avatar: "/placeholder.svg",
      rating: 4,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from freelancers and businesses who have found success on our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">"{testimonial.message}"</p>
              <div className="flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                {[...Array(5 - testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gray-300" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
