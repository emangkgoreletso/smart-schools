import React, { useState } from "react";
import ParentPaymentGateway from "./ParentPaymentGateway";
import ParentActivityPayments from "./ParentActivityPayments";
import ParentPaymentPlan, { PlanType } from "./ParentPaymentPlan";
import ParentPaymentHistory from "./ParentPaymentHistory";
import { PaymentRecord } from "../../Domain/LMS/parent/Payment.types";

interface Props {
  studentId: string;
}

const ParentPayments: React.FC<Props> = ({ studentId }) => {

  const [activeTab, setActiveTab] = useState<"school" | "activity" | "history">("school");

  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);

  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

  // Example school fees records
  const schoolPayments: PaymentRecord[] = [
    {
      id: "SF1",
      studentId,
      type: "SchoolFees",
      description: "Term 1 School Fees",
      amount: 3500,
      paidAmount: 2000,
      balance: 1500,
      dueDate: "2026-05-01",
      status: "Partial"
    },
    {
      id: "SF2",
      studentId,
      type: "DevelopmentFee",
      description: "Development Fee",
      amount: 1200,
      paidAmount: 1200,
      balance: 0,
      dueDate: "2026-03-01",
      datePaid: "2026-02-15",
      status: "Paid"
    },
    {
      id: "SF3",
      studentId,
      type: "RegistrationFee",
      description: "Registration Fee",
      amount: 800,
      paidAmount: 800,
      balance: 0,
      dueDate: "2026-01-10",
      datePaid: "2026-01-10",
      status: "Paid"
    }
  ];

  // Ledger
  const paymentHistory: PaymentRecord[] = schoolPayments;

  const totalAmount = schoolPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalPaid = schoolPayments.reduce((sum, p) => sum + p.paidAmount, 0);
  const totalBalance = totalAmount - totalPaid;

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div>
        <h2 className="text-2xl font-bold text-maroon-700">
          Payments & Finance
        </h2>

        <p className="text-sm text-gray-500">
          Manage school fees, activities and payment history
        </p>
      </div>

      {/* BALANCE SUMMARY */}

      <div className="grid grid-cols-3 gap-4">

        <div className="border rounded p-4 bg-white">
          <p className="text-sm text-gray-500">Total Fees</p>
          <p className="text-xl font-bold">P{totalAmount}</p>
        </div>

        <div className="border rounded p-4 bg-white">
          <p className="text-sm text-gray-500">Total Paid</p>
          <p className="text-xl font-bold text-green-600">P{totalPaid}</p>
        </div>

        <div className="border rounded p-4 bg-white">
          <p className="text-sm text-gray-500">Outstanding Balance</p>
          <p className="text-xl font-bold text-red-600">P{totalBalance}</p>
        </div>

      </div>

      {/* TABS */}

      <div className="flex gap-4 border-b pb-2">

        <button
          onClick={() => setActiveTab("school")}
          className={`px-4 py-2 ${
            activeTab === "school"
              ? "border-b-2 border-maroon-700 font-semibold"
              : ""
          }`}
        >
          School Fees
        </button>

        <button
          onClick={() => setActiveTab("activity")}
          className={`px-4 py-2 ${
            activeTab === "activity"
              ? "border-b-2 border-maroon-700 font-semibold"
              : ""
          }`}
        >
          Activity Fees
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 ${
            activeTab === "history"
              ? "border-b-2 border-maroon-700 font-semibold"
              : ""
          }`}
        >
          Payment History
        </button>

      </div>

      {/* SCHOOL FEES */}

      {activeTab === "school" && (

        <div className="space-y-6">

          <ParentPaymentPlan
            onPlanSelected={(plan) => setSelectedPlan(plan)}
          />

          {selectedPlan && (
            <p className="text-sm text-gray-600">
              Selected plan: <strong>{selectedPlan}</strong>
            </p>
          )}

          {schoolPayments.map((payment) => (

            <div key={payment.id} className="border p-4 rounded bg-white">

              <div className="flex justify-between">

                <div>

                  <p className="font-semibold">
                    {payment.description}
                  </p>

                  <p className="text-sm text-gray-500">
                    Due: {payment.dueDate}
                  </p>

                </div>

                <div className="text-right">

                  <p>Amount: P{payment.amount}</p>
                  <p>Paid: P{payment.paidAmount}</p>

                  <p className="text-red-600 font-semibold">
                    Balance: P{payment.balance}
                  </p>

                </div>

              </div>

              {payment.balance > 0 && (

                <button
                  onClick={() => setSelectedPayment(payment)}
                  className="mt-3 bg-maroon-700 text-white px-4 py-1 rounded"
                >
                  Pay Balance
                </button>

              )}

            </div>

          ))}

        </div>

      )}

      {/* ACTIVITY PAYMENTS */}

      {activeTab === "activity" && (

        <ParentActivityPayments studentId={studentId} />

      )}

      {/* PAYMENT HISTORY */}

      {activeTab === "history" && (

        <ParentPaymentHistory payments={paymentHistory} />

      )}

      {/* PAYMENT GATEWAY */}

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

export default ParentPayments;