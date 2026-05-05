import React from "react";
import { TermReport } from "../../Domain/LMS/parent/Report.types";

interface Props {
  reports: TermReport[];
  onOpen: (report: TermReport) => void;
}

const ParentReports: React.FC<Props> = ({ reports, onOpen }) => {

  return (
    <div className="space-y-4">

      <h2 className="text-xl font-bold text-maroon-700">
        Term Reports
      </h2>

      {reports.map((r) => (

        <div
          key={r.id}
          className="border p-4 rounded cursor-pointer hover:bg-gray-50"
          onClick={() => onOpen(r)}
        >

          <p className="font-medium">
            Year {r.year} Term {r.term}
          </p>

          <p className="text-sm text-gray-500">
            Position: {r.position}
          </p>

        </div>

      ))}

    </div>
  );
};

export default ParentReports;