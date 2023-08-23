export type ExpenseType = {
  id: string;
  title: string;
  amount: number;
  payerId: string;
  date: string;
  received: User[];
  payer: User;
};
