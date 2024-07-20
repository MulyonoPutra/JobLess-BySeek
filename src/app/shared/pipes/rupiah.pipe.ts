import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
    name: 'rupiah',
    standalone: true,
})
export class RupiahPipe implements PipeTransform {
    transform(value: number): string {
        if (value === null || value === undefined) return '';

        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    }
}
