export type Transfer = {
  id: string;
  date: string;
  amount: number;
  userFromId: string;
  userFrom: User;
  userToId: string;
  userTo: User;
};
