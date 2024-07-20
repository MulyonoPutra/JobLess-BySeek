import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
    name: 'monthYear',
    standalone: true,
})
export class MonthYearPipe implements PipeTransform {
    transform(value: Date | string | null): string {
        if (!value) {
            return '';
        }

        let date: Date;
        if (typeof value === 'string') {
            date = new Date(value);
        } else {
            date = value;
        }

        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }
}
