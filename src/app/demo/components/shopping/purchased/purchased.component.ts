import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProfileService } from 'src/app/demo/service/profile.service';
import { Router } from '@angular/router';
import { ShoppingService } from 'src/app/demo/service/shopping.service';
import { Shopping } from 'src/app/model/shopping';
@Component({
    selector: 'app-purchased',
    templateUrl: './purchased.component.html',
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
export class PurchasedComponent implements OnInit {
    shoppings: Shopping[] = [];
    shoppingDelete: Shopping;
    cols: any[] = [];
    validationMessage: string = '';
    productDialog: boolean = false;
    deleteProductsDialog: boolean = false;
    userId!: number;
    constructor(
        private shoppingServices: ShoppingService,
        private router: Router,
        private messageService: MessageService,
        private profileService: ProfileService
    ) {}

    ngOnInit() {
        this.shoppingServices.getPurchased().subscribe({
            next: (res: any) => {
                this.shoppings = res.data;
            },
            error: (err) => {
                this.router.navigate(['./auth/login']);
            },
        });
        this.cols = [
            { field: 'title', header: 'Title' },
            { field: 'quantityPurchased', header: 'Quantity' },
        ];
        this.profileService.getMe().subscribe({
            next: (res: any) => {
                this.userId = res?.data?.user?.id;
            },
            error: () => {
                this.router.navigate(['./auth/login']);
            },
        });
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

}
