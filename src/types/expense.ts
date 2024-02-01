export type ExpenseType = {
  id: string;
  title: string;
  amount: number;
  payerId: string;
  payer: User;
  date: string;
  received: User[];
  items: Item[];
};
