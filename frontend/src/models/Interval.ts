enum Interval {
    DAILY =  "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY"
}

export default Interval;

export function getIntervalName(interval: Interval): string {
    switch (interval) {
      case Interval.DAILY:
        return 'DAILY';
      case Interval.WEEKLY:
        return 'WEEKLY';
      case Interval.MONTHLY:
        return 'MONTHLY';
      case Interval.YEARLY:
        return 'YEARLY';
      default:
        return '';
    }
  }