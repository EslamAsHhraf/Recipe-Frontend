import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingService } from 'src/app/demo/service/shopping.service';
import { Shopping } from 'src/app/model/shopping';

@Component({
    selector: 'app-shopping',
    templateUrl: './shopping.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
            :host ::ng-deep .error {
                color: red;
            }
        `,
    ],
})
export class ShoppingComponent implements OnInit {
    shoppings: Shopping[] = [];
    shoppingEdit: Shopping = {
        id: 0,
        quantityPurchased: 0,
        quantityShopping: 0,
        title: '',
        createdBy: 0,
    };
    cols: any[] = [];
    validationMessage: string = '';
    productDialog: boolean = false;
    editNumber: number = 0;
    constructor(
        private shoppingServices: ShoppingService,
        private router: Router
    ) {}

    ngOnInit() {
        this.shoppingServices.getShopping().subscribe({
            next: (res: any) => {
                this.shoppings = res.data;
            },
            error: (err) => {
                this.router.navigate(['./auth/login']);
            },
        });
        this.cols = [
            { field: 'title', header: 'Title' },
            { field: 'quantityShopping', header: 'Quantity' },
        ];
    }
    editProduct(object: Shopping) {
        this.shoppingEdit = object;
        this.editNumber = object.quantityShopping;
        this.productDialog = true;
        console.log(this.shoppingEdit);
    }
    submit() {
        console.log(this.editNumber);
        console.log(this.shoppingEdit.quantityShopping);

        if (this.shoppingEdit.quantityShopping > this.editNumber) {
            this.validationMessage = `Number must be less than or equal to ${this.editNumber}`;
            this.shoppingEdit.quantityShopping = this.editNumber;
        } else {
            this.validationMessage = '';
        }
        console.log(this.validationMessage);
    }
    closeEdit() {
        this.productDialog = false;
        this.validationMessage = '';

    };
}
