import { stats } from "./stats";

export type cardData = {
  color: string;
  title: string;
  value: string;
  bottomLink?: linkAction;
};
type linkAction = {
  action: () => void;
  name: string;
};
export type Cards = {
  stats: stats;
};
