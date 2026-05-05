import React from "react";
import { PaymentRecord } from "../../Domain/LMS/parent/Payment.types";

interface Props {
  payments: PaymentRecord[];
}

const ParentPaymentHistory: React.FC<Props> = ({ payments }) => {

  return (
    <div className="space-y-4">

      <h3 className="text-lg font-semibold text-maroon-700">
        Payment History
      </h3>

      <table className="w-full border">

        <thead className="bg-gray-100">

          <tr>
            <th className="border p-2">Description</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Paid</th>
            <th className="border p-2">Balance</th>
            <th className="border p-2">Date Paid</th>
            <th className="border p-2">Status</th>
          </tr>

        </thead>

        <tbody>

          {payments.map((p) => (

            <tr key={p.id}>

              <td className="border p-2">{p.description}</td>
              <td className="border p-2">P{p.amount}</td>
              <td className="border p-2">P{p.paidAmount}</td>
              <td className="border p-2">P{p.balance}</td>
              <td className="border p-2">{p.datePaid || "-"}</td>
              <td className="border p-2">{p.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ParentPaymentHistory;