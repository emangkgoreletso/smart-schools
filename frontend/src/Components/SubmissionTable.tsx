import React, { useEffect, useState } from "react";
import { getSubmissions } from "../Api/Api";
import { StudentSubmission } from "../Types/Submission";

const SubmissionTable: React.FC = () => {
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const data = await getSubmissions();
        console.log("✅ Submissions fetched:", data);
        setSubmissions(data);
      } catch (err) {
        console.error("❌ Failed to fetch submissions:", err);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead>
          <tr className="bg-maroon-700 text-white">
            <th className="px-4 py-2">Assignment</th>
            <th className="px-4 py-2">Student</th>
            <th className="px-4 py-2">File</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Grade</th>
          </tr>
        </thead>
        <tbody>
          {submissions.length > 0 ? (
            submissions.map((sub) => (
              <tr key={sub.id} className="text-center border-t">
                <td>{sub.assignmentId}</td>
                <td>{sub.studentId}</td>
                <td>{sub.filePath}</td>
                <td>{sub.status}</td>
                <td>{sub.grade ?? "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No submissions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionTable;
