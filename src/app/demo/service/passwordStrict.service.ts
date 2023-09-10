import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PasswordStrict {
    constructor() {}

    data() {
        return [
            {
                label: 'Minium 8 Character',
                status: false,
            },
            {
                label: 'Uppercase Character',
                status: false,
            },
            {
                label: 'Lowercase Character',
                status: false,
            },
            {
                label: 'Special Character',
                status: false,
            },
            {
                label: 'Digit',
                status: false,
            },
        ];
    }
}
