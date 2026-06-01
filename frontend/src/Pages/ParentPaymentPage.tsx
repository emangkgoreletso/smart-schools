import React from "react";
import { useParams } from "react-router-dom";
import ParentPayments from "../Components/Parents/ParentPayments";

const ParentPaymentPage: React.FC = () => {

  const params = useParams();
  const studentId = params.studentId as string;

  if (!studentId) {
    return (
      <div className="p-10">
        <h2 className="text-xl font-bold text-red-600">
          No student selected
        </h2>
      </div>
    );
  }

  return <ParentPayments studentId={studentId} />;
};

export default ParentPaymentPage;