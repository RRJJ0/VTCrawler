

export enum OffsetUnit {
    Day = 0,
    Month = 1,
    Year = 2
}
 

export function getOffsetDateString(offset: number, unit: OffsetUnit = OffsetUnit.Day, date: Date = new Date()): string {
 
    const newDate = new Date(date);

    switch (unit) {
        case OffsetUnit.Day:
            newDate.setDate(newDate.getDate() + offset);
            break;
        case OffsetUnit.Month:
            newDate.setMonth(newDate.getMonth() + offset);
            break;
        case OffsetUnit.Year:
            newDate.setFullYear(newDate.getFullYear() + offset);
            break;
    }

    return newDate.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' });
}