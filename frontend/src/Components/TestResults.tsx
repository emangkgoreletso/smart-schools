import React, { useEffect, useState } from "react";
import { TestResult } from "../types/Test";
import { getTestResults } from "../api/tests"; // adjust based on your API structure
import { Trophy, XCircle, CheckCircle, Loader2 } from "lucide-react";

const TestResults: React.FC<{ studentId: number }> = ({ studentId }) => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await getTestResults(studentId);
        setResults(res.data);
      } catch (err) {
        console.error("Error fetching test results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [studentId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-maroon-600">
        <Loader2 size={28} className="animate-spin mr-2" />
        Loading test results...
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center p-6 bg-white rounded-xl shadow-md">
        <p className="text-gray-600">No test results available yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-6 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-maroon-700 mb-6 flex items-center gap-2">
        <Trophy className="text-yellow-500" /> Test Results
      </h2>

      <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
        <thead className="bg-maroon-700 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Test Name</th>
            <th className="px-4 py-2 text-left">Score</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Taken On</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr
              key={r.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3 font-semibold">{r.testTitle}</td>
              <td className="px-4 py-3">{r.score}%</td>
              <td className="px-4 py-3">
                {r.passed ? (
                  <span className="flex items-center text-green-600 font-medium">
                    <CheckCircle className="mr-1" size={18} /> Passed
                  </span>
                ) : (
                  <span className="flex items-center text-red-500 font-medium">
                    <XCircle className="mr-1" size={18} /> Failed
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {new Date(r.dateTaken).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 text-right text-gray-500 text-sm">
        Showing {results.length} result(s)
      </div>
    </div>
  );
};

export default TestResults;
