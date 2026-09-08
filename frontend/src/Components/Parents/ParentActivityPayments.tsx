import React, { useState } from "react";
import { PaymentRecord } from "../../Domain/LMS/parent/Payment.types";
import ParentPaymentGateway from "./ParentPaymentGateway";

interface Props {
  studentId: string;
}

const ParentActivityPayments: React.FC<Props> = ({ studentId }) => {

  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);

  const activities: PaymentRecord[] = [
    {
      id: "A1",
      studentId,
      type: "Activity",
      description: "School Trip",
      amount: 500,
      paidAmount: 0,
      balance: 500,
      dueDate: "2026-05-10",
      status: "Pending"
    },
    {
      id: "A2",
      studentId,
      type: "Activity",
      description: "Sports Day",
      amount: 200,
      paidAmount: 0,
      balance: 200,
      dueDate: "2026-06-01",
      status: "Pending"
    }
  ];

  return (
    <div className="space-y-4">

      <h3 className="text-lg font-semibold text-maroon-700">
        Activity Payments
      </h3>

      {activities.map((activity) => (

        <div key={activity.id} className="border p-4 rounded">

          <p className="font-semibold">
            {activity.description}
          </p>

          <p>Amount: P{activity.amount}</p>
          <p>Balance: P{activity.balance}</p>

          <button
            onClick={() => setSelectedPayment(activity)}
            className="bg-maroon-700 text-white px-3 py-1 rounded mt-2"
          >
            Pay
          </button>

        </div>
      ))}

      {selectedPayment && (
        <ParentPaymentGateway
          payment={selectedPayment}
          studentId={studentId}
          onClose={() => setSelectedPayment(null)}
        />
      )}

    </div>
  );
};

export default ParentActivityPayments;