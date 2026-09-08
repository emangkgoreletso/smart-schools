import React from "react";
import { PaymentRecord } from "../../Domain/LMS/parent/Payment.types";

interface Props {
  payment: PaymentRecord;
}

const ParentReceiptViewer: React.FC<Props> = ({ payment }) => {

  return (
    <div className="border p-6 rounded bg-white space-y-3">

      <h2 className="text-xl font-bold text-maroon-700">
        Payment Receipt
      </h2>

      <p>Student ID: {payment.studentId}</p>

      <p>Description: {payment.description}</p>

      <p>Amount Paid: P{payment.paidAmount}</p>

      <p>Date Paid: {payment.datePaid}</p>

      <p>Status: {payment.status}</p>

      <button
        onClick={() => window.print()}
        className="bg-maroon-700 text-white px-4 py-2 rounded"
      >
        Print Receipt
      </button>

    </div>
  );
};

export default ParentReceiptViewer;