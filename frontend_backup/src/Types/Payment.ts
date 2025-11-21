export interface Payment {
  id: number;
  studentId: number;
  amount: number;
  method: "Cash" | "Card" | "Online Transfer";
  referenceNumber: string;
  date: string;
  term: string;
  status: "Completed" | "Pending" | "Failed";
}
