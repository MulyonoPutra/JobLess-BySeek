import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export const handlerHttpError = (res: HttpErrorResponse) => {
    let errorMessage = 'An error occurred';
    if (res.error instanceof ErrorEvent) {
        errorMessage = `Error: ${res.error.message}`;
    } else {
        errorMessage = `Error Code: ${res.status}\nMessage: ${res.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
};
