import React from "react";
import { useNavigate } from "react-router-dom";

const ReportsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4">
      <h3 className="text-lg font-semibold text-maroon-700">
        Academic Reports
      </h3>

      <p className="text-sm text-gray-600">
        View your academic performance, term reports, and subject summaries.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Academic Record */}
        <button
          onClick={() => navigate("/reports?type=record")}
          className="border border-maroon-700 rounded-lg p-4 text-left
            hover:bg-maroon-50 transition"
        >
          <h4 className="font-semibold text-maroon-700">
            Academic Record
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            View grades per subject and overall performance.
          </p>
        </button>

        {/* Termly Reports */}
        <button
          onClick={() => navigate("/reports?type=term")}
          className="border border-maroon-700 rounded-lg p-4 text-left
            hover:bg-maroon-50 transition"
        >
          <h4 className="font-semibold text-maroon-700">
            Termly Reports
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            Access official end-of-term reports and remarks.
          </p>
        </button>
      </div>
    </div>
  );
};

export default ReportsSection;
