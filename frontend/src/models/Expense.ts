import  Interval from './Interval';
import { getIntervalName } from './Interval';
import mock from "@/assets/expensesData.json";

export default class Expense {
    id: number;
    name: string;
    amount: number;
    timeInterval: Interval;


    constructor(id: number, name: string, amount: number, interval: Interval | string) {
       this.id = id;
       this.name = name;
       this.amount = amount;
       this.timeInterval = this.setExpenseInterval(interval);
    }

    static copyConstructor(input: any): Expense {
        return new Expense(input.id, input.name, input.amount, input.timeInterval);
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
        return this.timeInterval;
    }

    getName(): string {
        return this.name;
    }

    getAmount(): number {
        return this.amount;
    }

    getIntervalName(): string {
        return getIntervalName(this.timeInterval);
    }

    getMontlyAmount(): number {
        switch(this.timeInterval) {
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

    equals(other: Expense | undefined | null): boolean {
        if(other === null || other === undefined) return false;
        return this.name === other.name &&
        this.amount === other.amount &&
        this.timeInterval === other.timeInterval
    }
}