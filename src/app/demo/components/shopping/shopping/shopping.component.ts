import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingService } from 'src/app/demo/service/shopping.service';
import { Shopping } from 'src/app/model/shopping';
import { MessageService } from 'primeng/api';
import { ProfileService } from 'src/app/demo/service/profile.service';

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
    providers: [MessageService],
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
    addShopping: string[] | undefined;
    shoppingDelete: Shopping;
    cols: any[] = [];
    validationMessage: string = '';
    productDialog: boolean = false;
    deleteProductsDialog: boolean = false;
    addProductsDialog: boolean = false;
    editNumber: number = 0;
    userId!: number;
    addError: boolean = false;

    constructor(
        private shoppingServices: ShoppingService,
        private router: Router,
        private messageService: MessageService,
        private profileService: ProfileService
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
        this.profileService.getMe().subscribe({
            next: (res: any) => {
                this.userId = res?.data?.user?.id;
                console.log(this.userId);
            },
            error: () => {
                this.router.navigate(['./auth/login']);
            },
        });
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

        if (
            this.shoppingEdit.quantityShopping > this.editNumber ||
            this.shoppingEdit.quantityShopping <= 0
        ) {
            this.validationMessage = `Number must be less than or equal to ${this.editNumber} and large than 0`;
            this.shoppingEdit.quantityShopping = this.editNumber;
        } else {
            this.validationMessage = '';
            this.shoppingServices
                .addPurchased(
                    this.shoppingEdit.id,
                    this.shoppingEdit.quantityShopping
                )
                .subscribe({
                    next: (res) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Update Successfully',
                            life: 3000,
                        });
                        setTimeout(() => {
                            this.router.navigate(['shopping/purchased']);
                        }, 3000); // 3000 milliseconds (3 seconds)
                    },
                    error: (err) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'error in updating product',
                            life: 3000,
                        });
                    },
                });
        }
        console.log(this.validationMessage);
    }
    closeEdit() {
        this.productDialog = false;
        this.validationMessage = '';
    }
    confirmDelete() {
        this.deleteProductsDialog = false;
        this.shoppingServices.deleteProduct(this.shoppingDelete.id).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Delete Product',
                    life: 3000,
                });
                this.shoppings = this.shoppings.filter(
                    (item) => item.id !== this.shoppingDelete.id
                );
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'error in deleting product',
                    life: 3000,
                });
            },
        });
    }
    deleteProduct(object: Shopping) {
        this.deleteProductsDialog = true;
        this.shoppingDelete = object;
    }
    addProduct() {
        if (this.addShopping ==undefined|| this.addShopping.length == 0) {
            this.addError = true;
            console.log('Sa');
            return;
        }
        this.addError = false;

        this.addProductsDialog = false;
        var products = this.addShopping.map((val) => ({
            createdBy: this.userId,
            quantityShopping: 1,
            quantityPurchased: 0,
            title: val,
        }));

        this.addShopping = [];
        this.shoppingServices.addShopping(products).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Add Products',
                    life: 3000,
                });
                setTimeout(() => {
                    location.reload();
                }, 2000); // 3000 milliseconds (3 seconds)
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'error in add products',
                    life: 3000,
                });
            },
        });
    }
}
