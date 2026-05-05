import React, { useState } from "react";
import {
  PaymentRecord,
  PaymentMethod
} from "../../Domain/LMS/parent/Payment.types";

import { PaymentEngine } from "../../Domain/LMS/finance/PaymentEngine";

interface Props {
  payment: PaymentRecord;
  studentId: string;
  onClose: () => void;
}

const ParentPaymentGateway: React.FC<Props> = ({
  payment,
  studentId,
  onClose
}) => {

  const [method, setMethod] =
    useState<PaymentMethod>("BankTransfer");

  const [amount, setAmount] =
    useState<number>(payment.balance);

  const [loading, setLoading] = useState(false);

  const handlePayment = () => {

    if (amount <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }

    if (amount > payment.balance) {
      alert("Amount exceeds remaining balance.");
      return;
    }

    setLoading(true);

    try {

      /* Apply payment */

      const updatedPayment =
        PaymentEngine.applyPayment(
          payment,
          amount,
          method,
          studentId
        );

      /* Create transaction */

      const transaction =
        PaymentEngine.createTransaction(
          payment,
          amount,
          method,
          studentId
        );

      /* Generate receipt */

      const receipt =
        PaymentEngine.generateReceipt(
          transaction,
          payment.description
        );

      console.log("Updated Payment:", updatedPayment);
      console.log("Transaction:", transaction);
      console.log("Receipt:", receipt);

      alert(
        `Payment successful!\nReceipt: ${receipt.receiptNumber}`
      );

      onClose();

    } catch (error) {

      console.error("Payment failed", error);

      alert("Payment failed. Please try again.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="border p-6 rounded-lg bg-white shadow-md space-y-5">

      <h3 className="text-lg font-bold text-maroon-700">
        Pay {payment.description}
      </h3>

      <div className="text-sm text-gray-600">
        Remaining Balance:{" "}
        <span className="font-semibold">
          P{payment.balance}
        </span>
      </div>

      {/* Amount Input */}

      <div className="space-y-1">

        <label className="text-sm font-medium">
          Payment Amount
        </label>

        <input
          type="number"
          value={amount}
          onChange={(e) =>
            setAmount(Number(e.target.value))
          }
          className="border rounded p-2 w-full"
        />

      </div>

      {/* Payment Method */}

      <div className="space-y-1">

        <label className="text-sm font-medium">
          Payment Method
        </label>

        <select
          value={method}
          onChange={(e) =>
            setMethod(e.target.value as PaymentMethod)
          }
          className="border rounded p-2 w-full"
        >
          <option value="BankTransfer">
            Bank Transfer
          </option>

          <option value="MyZaka">
            MyZaka Mobile Money
          </option>

          <option value="OrangeMoney">
            Orange Money
          </option>

        </select>

      </div>

      {/* Payment Reference */}

      <div className="text-sm text-gray-500">

        Reference:{" "}
        <span className="font-semibold">
          {studentId}
        </span>

      </div>

      {/* Buttons */}

      <div className="flex gap-3 pt-2">

        <button
          onClick={handlePayment}
          disabled={loading}
          className="flex-1 bg-maroon-700 text-white py-2 rounded hover:bg-maroon-800"
        >
          {loading ? "Processing..." : "Confirm Payment"}
        </button>

        <button
          onClick={onClose}
          className="flex-1 border py-2 rounded text-gray-600"
        >
          Cancel
        </button>

      </div>

    </div>
  );
};

export default ParentPaymentGateway;