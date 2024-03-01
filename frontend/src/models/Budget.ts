import  Interval from './Interval';
import { getIntervalName } from './Interval';
import mock from "@/assets/expensesData.json";

export default class Budget {
    id: number;
    name: string;
    amount: number;
    timeInterval: Interval | null;
    start: Date | undefined;
    end: Date | undefined;
    recurring: boolean;
    savings: boolean;


    constructor(id: number, name: string, amount: number, interval: Interval | string | null,
        start?: Date, end?: Date, isRecurring?: boolean, savings?: boolean) {
        this.id = id;
        this.name = name;
        this.amount = amount;

        if(savings === true) {
            this.timeInterval = null;
        } else {
            this.timeInterval = this.setExpenseInterval(interval);
        }
        this.start = start;
        this.end = end;
        this.recurring = isRecurring || false;
        this.savings = savings || false;
    }

    static copyConstructor(input: any): Budget {
        return new Budget(input.id, input.name, input.amount, input.timeInterval, input.start, input.end, input.recurring, input.savings);
    }

    setExpenseInterval(interval: Interval | string | null): Interval | null {
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

    getMonthlyInterval(): Interval | null{
        return this.timeInterval;
    }

    getName(): string {
        return this.name;
    }

    getAmount(): number {
        return this.amount;
    }

    getIntervalName(): string | null {
        if(this.timeInterval === null) return null;
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
            default:
                    throw new Error("Invalid interval");

        }
    }

    getAmountByInterval(interval: Interval | undefined | null): number {
        if(interval === null) return this.amount;
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

    equals(other: Budget | undefined | null): boolean {
        if(other === null || other === undefined) return false;
        return this.name === other.name &&
        this.amount === other.amount &&
        this.timeInterval === other.timeInterval &&
        this.start === other.start &&
        this.end === other.end &&
        this.recurring === other.recurring &&
        this.savings === other.savings;
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