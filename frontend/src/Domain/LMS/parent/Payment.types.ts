export type PaymentType =
  | "SchoolFees"
  | "DevelopmentFee"
  | "RegistrationFee"
  | "Activity";

export type PaymentMethod =
  | "BankTransfer"
  | "MyZaka"
  | "OrangeMoney";

export interface PaymentRecord {

  id: string;

  studentId: string;

  type: PaymentType;

  description: string;

  amount: number;

  paidAmount: number;

  balance: number;

  dueDate: string;

  datePaid?: string;

  method?: PaymentMethod;

  reference?: string;

  status: "Paid" | "Partial" | "Pending";
}

export interface PaymentTransaction {

  id: string;

  paymentId: string;

  studentId: string;

  amount: number;

  method: PaymentMethod;

  reference: string;

  date: string;

}

export interface PaymentReceipt {

  receiptNumber: string;

  studentId: string;

  description: string;

  amount: number;

  method: PaymentMethod;

  date: string;

}