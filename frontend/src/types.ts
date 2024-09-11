export interface Expense {
    id?: number;  // Optional because new expenses won't have an ID yet
    description: string;
    amount: number;
    date: string;  // Date as string in YYYY-MM-DD format
    category: string;
  }
  