import React, { useState } from "react";

export type PlanType = "Yearly" | "Term" | "Monthly";

interface Props {
  onPlanSelected: (plan: PlanType) => void;
}

const ParentPaymentPlan: React.FC<Props> = ({ onPlanSelected }) => {

  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

  const selectPlan = (plan: PlanType) => {
    setSelectedPlan(plan);
    onPlanSelected(plan);
  };

  return (
    <div className="border p-4 rounded bg-white space-y-4">

      <h3 className="font-semibold text-lg text-maroon-700">
        Select Payment Plan
      </h3>

      <div className="flex gap-4">

        <button
          onClick={() => selectPlan("Yearly")}
          className={`px-4 py-2 rounded ${
            selectedPlan === "Yearly"
              ? "bg-maroon-700 text-white"
              : "border"
          }`}
        >
          Pay Yearly
        </button>

        <button
          onClick={() => selectPlan("Term")}
          className={`px-4 py-2 rounded ${
            selectedPlan === "Term"
              ? "bg-maroon-700 text-white"
              : "border"
          }`}
        >
          Pay Per Term
        </button>

        <button
          onClick={() => selectPlan("Monthly")}
          className={`px-4 py-2 rounded ${
            selectedPlan === "Monthly"
              ? "bg-maroon-700 text-white"
              : "border"
          }`}
        >
          Monthly Installments
        </button>

      </div>

    </div>
  );
};

export default ParentPaymentPlan;