import React from "react";

interface Props {
  childId: string;
}

const ParentPayments: React.FC<Props> = ({ childId }) => {

  const payments = [
    { term: "Term 1", amount: "BWP 2500", status: "Paid" },
    { term: "Term 2", amount: "BWP 2500", status: "Pending" },
  ];

  return (
    <div className="space-y-5">

      <h3 className="text-lg font-semibold text-maroon-700">
        School Fees
      </h3>

      <table className="w-full border rounded-lg">

        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left text-sm">Term</th>
            <th className="p-3 text-left text-sm">Amount</th>
            <th className="p-3 text-left text-sm">Status</th>
          </tr>
        </thead>

        <tbody>

          {payments.map((p, i) => (
            <tr key={i} className="border-t">

              <td className="p-3 text-sm">{p.term}</td>
              <td className="p-3 text-sm">{p.amount}</td>

              <td className="p-3 text-sm">
                <span
                  className={`px-2 py-1 rounded text-xs
                    ${
                      p.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {p.status}
                </span>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ParentPayments;