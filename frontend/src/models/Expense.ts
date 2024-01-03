import  Interval from './Interval';
import { getIntervalName } from './Interval';
import mock from "@/assets/expensesData.json";

export default class Expense {
    name: string;
    amount: number;
    interval: Interval;


    constructor(name: string, amount: number, interval: Interval | string) {
       this.name = name;
       this.amount = amount;
       this.interval = this.setExpenseInterval(interval);
    }

    setExpenseInterval(interval: Interval | string): Interval {
        switch(interval) {
            case Interval.DAILY || "DAILY":
                return Interval.DAILY;
            case Interval.WEEKLY || "WEEKLY":
                return Interval.WEEKLY;
            case Interval.MONTHLY || "MONTHLY":
                return Interval.MONTHLY;
            case Interval.YEARLY || "YEARLY":
                return Interval.YEARLY;
            default:
                    return Interval.MONTHLY;
        }
    }

    getMonthlyInterval(): Interval{
        return this.interval;
    }

    getName(): string {
        return this.name;
    }

    getAmount(): number {
        return this.amount;
    }

    getIntervalName(): string {
        return getIntervalName(this.interval);
    }

    getMontlyAmount(): number {
        switch(this.interval) {
            case Interval.DAILY:
                return this.amount * 30;
            case Interval.WEEKLY:
                return this.amount * 4;
            case Interval.MONTHLY:
                return this.amount;
            case Interval.YEARLY:
                return this.amount / 12;
        }
    }

    static getMockIncomes(): Expense[] {
        return  mock.incomes.map((income) => new Expense(income.name, income.amount, income.interval));   
    }

    static getMockExpenses(): Expense[] {
        return mock.expenses.map((expense) => new Expense(expense.name, expense.amount, expense.interval));   
    }
}