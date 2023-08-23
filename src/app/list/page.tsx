"use client"
import axios from "axios";
import styles from "./page.module.css"
import Expense from "@/components/List/Expense/Expense";
import Transfer from "@/components/List/Transfer/Transfer";

import { useState, useEffect } from "react";
import { ExpenseType } from "@/types/expense";

export default function ListPage() {
  
  
  return (
    <>
      <Expense/>
      {(transfers)?<Transfer/>:noTransfer?<h3>No transfers yet</h3>:<p>loading</p>}
    </>
  );
}
