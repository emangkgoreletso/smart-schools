import React from "react";
import { LucideIcon } from "lucide-react"; // Optional: if you're using lucide-react icons

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  color?: string; // e.g. "bg-maroon-700", "bg-gray-800"
  onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon: Icon,
  color = "bg-maroon-700",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`${color} text-white p-5 rounded-2xl shadow-md flex items-center justify-between cursor-pointer hover:shadow-xl transition duration-300`}
    >
      <div>
        <h2 className="text-sm uppercase text-gray-200 font-semibold">{title}</h2>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
      </div>
      {Icon && <Icon className="w-10 h-10 text-gray-100 opacity-90" />}
    </div>
  );
};

export default DashboardCard;
