import React from "react";

interface Props {
  studentId: string;
}

interface Trend {
  subject: string;
  term1: number;
  term2: number;
  term3: number;
}

const trends: Trend[] = [
  { subject: "Mathematics", term1: 70, term2: 78, term3: 82 },
  { subject: "English", term1: 68, term2: 72, term3: 75 },
  { subject: "Physics", term1: 60, term2: 65, term3: 70 },
  { subject: "Chemistry", term1: 66, term2: 70, term3: 74 },
];

const SubjectTrends: React.FC<Props> = () => {

  return (
    <div className="bg-white p-5 rounded shadow space-y-4">

      <h3 className="font-semibold text-maroon-700">
        Subject Performance Trends
      </h3>

      <div className="overflow-x-auto">

        <table className="w-full border text-sm">

          <thead className="bg-maroon-700 text-white">

            <tr>
              <th className="p-3 text-left">Subject</th>
              <th className="p-3 text-left">Term 1</th>
              <th className="p-3 text-left">Term 2</th>
              <th className="p-3 text-left">Term 3</th>
              <th className="p-3 text-left">Trend</th>
            </tr>

          </thead>

          <tbody>

            {trends.map((t) => {

              const improving = t.term3 > t.term1;

              return (
                <tr key={t.subject} className="border-b">

                  <td className="p-3 font-medium">
                    {t.subject}
                  </td>

                  <td className="p-3">
                    {t.term1}%
                  </td>

                  <td className="p-3">
                    {t.term2}%
                  </td>

                  <td className="p-3">
                    {t.term3}%
                  </td>

                  <td className={`p-3 font-semibold ${
                    improving ? "text-green-600" : "text-red-600"
                  }`}>
                    {improving ? "Improving" : "Declining"}
                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default SubjectTrends;