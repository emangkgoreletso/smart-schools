import {
  PaymentRecord,
  PaymentTransaction,
  PaymentReceipt,
  PaymentMethod
} from "../parent/Payment.types";

export class PaymentEngine {

  static calculateBalance(payment: PaymentRecord): number {

    return payment.amount - payment.paidAmount;

  }

  static determineStatus(payment: PaymentRecord): "Paid" | "Partial" | "Pending" {

    if (payment.paidAmount === 0) return "Pending";

    if (payment.paidAmount >= payment.amount) return "Paid";

    return "Partial";

  }

  static applyPayment(

    payment: PaymentRecord,

    amount: number,

    method: PaymentMethod,

    reference: string

  ): PaymentRecord {

    const newPaid = payment.paidAmount + amount;

    const newBalance = payment.amount - newPaid;

    return {

      ...payment,

      paidAmount: newPaid,

      balance: newBalance < 0 ? 0 : newBalance,

      method,

      reference,

      datePaid: new Date().toISOString(),

      status:

        newPaid >= payment.amount

          ? "Paid"

          : "Partial"

    };

  }

  static createTransaction(

    payment: PaymentRecord,

    amount: number,

    method: PaymentMethod,

    reference: string

  ): PaymentTransaction {

    return {

      id: crypto.randomUUID(),

      paymentId: payment.id,

      studentId: payment.studentId,

      amount,

      method,

      reference,

      date: new Date().toISOString()

    };

  }

  static generateReceipt(

    transaction: PaymentTransaction,

    description: string

  ): PaymentReceipt {

    return {

      receiptNumber: `RCPT-${Date.now()}`,

      studentId: transaction.studentId,

      description,

      amount: transaction.amount,

      method: transaction.method,

      date: transaction.date

    };

  }

  static studentBalance(payments: PaymentRecord[]): number {

    return payments.reduce(

      (sum, p) => sum + p.balance,

      0

    );

  }

}