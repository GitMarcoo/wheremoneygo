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

    getAmountByInterval(interval: Interval | undefined): number {
        if(interval === undefined) throw new Error("Interval is undefined");

        switch(this.timeInterval) {
            case Interval.DAILY:
                return this.dailyToOtherInterval(this.amount, interval);
            case Interval.WEEKLY:
                return this.weeklyToOtherInterval(this.amount, interval);
            case Interval.MONTHLY:
                return this.monthlyToOtherInterval(this.amount, interval);
            case Interval.YEARLY:
                return this.yearlyToOtherInterval(this.amount, interval);
            default:
                    throw new Error("Invalid interval");
        } 
    }

    equals(other: Expense | undefined | null): boolean {
        if(other === null || other === undefined) return false;
        return this.name === other.name &&
        this.amount === other.amount &&
        this.timeInterval === other.timeInterval
    }

    private dailyToOtherInterval(amount: number, interval: Interval): number {
        switch(interval) {
            case Interval.DAILY:
                return amount;
            case Interval.WEEKLY:
                return amount * 7;
            case Interval.MONTHLY:
                return amount * 30;
            case Interval.YEARLY:
                return amount * 365;
        }
    }

    private weeklyToOtherInterval(amount: number, interval: Interval): number {
        switch(interval) {
            case Interval.DAILY:
                return amount / 7;
            case Interval.WEEKLY:
                return amount;
            case Interval.MONTHLY:
                return amount * 4;
            case Interval.YEARLY:
                return amount * 52;
        }
    }

    private monthlyToOtherInterval(amount: number, interval: Interval): number {
        switch(interval) {
            case Interval.DAILY:
                return amount / 30;
            case Interval.WEEKLY:
                return amount / 4;
            case Interval.MONTHLY:
                return amount;
            case Interval.YEARLY:
                return amount * 12;
        }
    }

    private yearlyToOtherInterval(amount: number, interval: Interval): number {
        switch(interval) {
            case Interval.DAILY:
                return amount / 365;
            case Interval.WEEKLY:
                return amount / 52;
            case Interval.MONTHLY:
                return amount / 12;
            case Interval.YEARLY:
                return amount;
        }
    }
}