import React from "react";
import { TermReport } from "../../../Domain/LMS/student/Report.types";

interface Props {
  report: TermReport;
}

const ReportCard: React.FC<Props> = ({ report }) => {

  const downloadReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">

      {/* REPORT HEADER */}

      <div className="bg-white p-6 rounded-lg shadow border">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-2xl font-bold text-maroon-700">
              Smart Schools
            </h1>

            <p className="text-sm text-gray-500">
              Official Academic Report
            </p>

          </div>

          <button
            onClick={downloadReport}
            className="bg-maroon-700 text-white px-4 py-2 rounded text-sm"
          >
            Download Report
          </button>

        </div>

      </div>

      {/* STUDENT DETAILS */}

      <div className="bg-white p-5 rounded-lg shadow border grid md:grid-cols-4 gap-4 text-sm">

        <div>
          <p className="text-gray-500">Student</p>
          <p className="font-semibold">{report.studentName}</p>
        </div>

        <div>
          <p className="text-gray-500">Class</p>
          <p className="font-semibold">{report.className}</p>
        </div>

        <div>
          <p className="text-gray-500">Year</p>
          <p className="font-semibold">{report.year}</p>
        </div>

        <div>
          <p className="text-gray-500">Term</p>
          <p className="font-semibold">{report.term}</p>
        </div>

      </div>

      {/* SUBJECT RESULTS */}

      <div className="bg-white p-5 rounded-lg shadow border">

        <h2 className="font-semibold text-maroon-700 mb-4">
          Subject Results
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full border text-sm">

            <thead className="bg-maroon-700 text-white">

              <tr>
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Teacher</th>
                <th className="p-3 text-left">Marks</th>
                <th className="p-3 text-left">Grade</th>
                <th className="p-3 text-left">Teacher Remark</th>
              </tr>

            </thead>

            <tbody>

              {report.subjects.map((s) => (
                <tr key={s.subjectId} className="border-b">

                  <td className="p-3 font-medium">
                    {s.subjectName}
                  </td>

                  <td className="p-3">
                    {s.teacherName}
                  </td>

                  <td className="p-3">
                    {s.mark}%
                  </td>

                  <td className="p-3 font-semibold text-maroon-700">
                    {s.grade}
                  </td>

                  <td className="p-3 text-gray-600">
                    {s.remark}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* PERFORMANCE SUMMARY */}

      <div className="bg-white p-5 rounded-lg shadow border grid md:grid-cols-3 gap-4 text-center">

        <div>
          <p className="text-gray-500 text-sm">
            Overall Average
          </p>

          <p className="text-xl font-bold text-maroon-700">
            {report.overallAverage.toFixed(1)}%
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Position
          </p>

          <p className="text-xl font-bold">
            {report.position} / {report.totalStudents}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Issued Date
          </p>

          <p className="text-xl font-bold">
            {report.issuedDate}
          </p>
        </div>

      </div>

      {/* HEADTEACHER REMARK */}

      <div className="bg-white p-5 rounded-lg shadow border">

        <h3 className="font-semibold text-maroon-700 mb-2">
          Headteacher Remark
        </h3>

        <p className="text-gray-700 text-sm">
          {report.headTeacherRemark}
        </p>

        <div className="flex justify-between mt-6 text-sm">

          <div>
            <p className="text-gray-500">Signature</p>
            <div className="border w-40 h-10 mt-1"></div>
          </div>

          <div>
            <p className="text-gray-500">School Stamp</p>
            <div className="border w-40 h-10 mt-1"></div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ReportCard;