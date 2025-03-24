
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, ChevronRight, Clock, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

interface Material {
  id: number;
  title: string;
  category: string;
  status: string;
  listedAt: string;
  soldAt?: string;
  price: string;
  condition?: string;
  buyer?: string;
}

interface MaterialExchangeListProps {
  materials: Material[];
  type: "active" | "completed";
}

const MaterialExchangeList = ({ materials, type }: MaterialExchangeListProps) => {
  if (materials.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Package className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No {type === "active" ? "Active" : "Completed"} Materials
          </h3>
          <p className="text-gray-500 text-center max-w-md mb-6">
            {type === "active"
              ? "You don't have any materials listed for exchange at the moment."
              : "You haven't completed any material exchanges yet."}
          </p>
          {type === "active" && (
            <Link to="/task-hub">
              <Button>List Materials</Button>
            </Link>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {materials.map((material) => (
        <Card key={material.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-semibold">{material.title}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                  <span>{material.category}</span>
                  <span>•</span>
                  <span>
                    {type === "active"
                      ? `Condition: ${material.condition}`
                      : `Buyer: ${material.buyer}`}
                  </span>
                </div>
              </div>
              <Badge
                className={
                  type === "active"
                    ? "bg-purple-100 text-purple-800 border-purple-200"
                    : "bg-green-100 text-green-800 border-green-200"
                }
              >
                {type === "active" ? "For Sale" : "Sold"}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {type === "active" ? (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Listed: {material.listedAt}</span>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Sold: {material.soldAt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Listed: {material.listedAt}</span>
                  </div>
                </>
              )}
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Price: {material.price}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <Link to={`/materials/${material.id}`}>
                <Button variant="outline" className="gap-2">
                  View Details
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MaterialExchangeList;
