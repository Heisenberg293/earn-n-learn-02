
import { Link } from "react-router-dom";
import { 
  Code, 
  Paintbrush, 
  BookOpen, 
  Presentation, 
  Globe, 
  BarChart 
} from "lucide-react";

const HomeCategories = () => {
  const categories = [
    {
      title: "Web Development",
      icon: <Code className="h-8 w-8 text-green-600" />,
      description: "Frontend, backend, and full-stack development projects",
      link: "/task-hub?category=development",
    },
    {
      title: "Design",
      icon: <Paintbrush className="h-8 w-8 text-green-600" />,
      description: "Graphic design, UI/UX, and creative work",
      link: "/task-hub?category=design",
    },
    {
      title: "Writing",
      icon: <BookOpen className="h-8 w-8 text-green-600" />,
      description: "Content writing, copywriting, and technical writing",
      link: "/task-hub?category=writing",
    },
    {
      title: "Marketing",
      icon: <Presentation className="h-8 w-8 text-green-600" />,
      description: "Social media, SEO, and marketing strategy",
      link: "/task-hub?category=marketing",
    },
    {
      title: "Translation",
      icon: <Globe className="h-8 w-8 text-green-600" />,
      description: "Document translation and language services",
      link: "/task-hub?category=translation",
    },
    {
      title: "Data Analysis",
      icon: <BarChart className="h-8 w-8 text-green-600" />,
      description: "Data processing, visualization, and insights",
      link: "/task-hub?category=data",
    },
  ];

  return (
    <section className="py-20 bg-green-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore opportunities across different categories and find your perfect match
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={index} 
              to={category.link}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex gap-4 items-start"
            >
              <div className="p-3 bg-green-50 rounded-full">
                {category.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCategories;
