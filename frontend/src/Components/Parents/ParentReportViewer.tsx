import React from "react";
import { TermReport } from "../../Domain/LMS/parent/Report.types";

interface Props {
  report: TermReport;
  onBack: () => void;
}

const ParentReportViewer: React.FC<Props> = ({
  report,
  onBack,
}) => {

  return (
    <div className="space-y-5">

      <button
        onClick={onBack}
        className="text-sm text-maroon-700 hover:underline"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold text-maroon-700">
        Term Report
      </h2>

      <table className="w-full border text-sm">

        <thead className="bg-gray-100">

          <tr>
            <th className="p-2 text-left">Subject</th>
            <th className="p-2">Marks</th>
            <th className="p-2">Grade</th>
            <th className="p-2">Teacher Remark</th>
          </tr>

        </thead>

        <tbody>

          {report.subjects.map((s) => (

            <tr key={s.subjectId} className="border-t">

              <td className="p-2">{s.subjectName}</td>

              <td className="p-2 text-center">{s.marks}</td>

              <td className="p-2 text-center">{s.grade}</td>

              <td className="p-2">{s.teacherRemark}</td>

            </tr>

          ))}

        </tbody>

      </table>

      <div className="border-t pt-4">

        <p className="font-semibold">
          Headteacher Remark
        </p>

        <p className="text-sm text-gray-600">
          {report.headTeacherRemark}
        </p>

      </div>

    </div>
  );
};

export default ParentReportViewer;