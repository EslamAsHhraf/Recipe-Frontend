import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { Profile } from 'src/app/model/profile';
import { ProfileService } from '../../../service/profile.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    providers: [MessageService],
})
export class ProfileComponent implements OnInit {
    productDialog: boolean = false;
    ingredient!: string;
    userImage: any;
    category: Category[] = [];
    profile: Profile = {
        id: 0,
        name: '',
        imageFile: '',
    };

    constructor(
        private profileService: ProfileService,
        private router: Router,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.profileService.getMe().subscribe({
            next: (res: any) => {
                this.profile.id = res?.data?.id;
                this.profile.name = res?.data?.name;
                this.userImage = res?.data?.imageFile;
            },
            error: () => {
                this.router.navigate(['./auth/login']);
            },
        });
    }

    logout() {
        this.profileService.logout().subscribe({
            next: () => {
                this.router.navigate(['./auth/login']);
            },
            error: (err) => {
                this.router.navigate(['./auth/login']);
            },
        });
    }
    onFileSelect(event: any) {
        console.log(event.currentFiles);
        const formData = new FormData();
        // Handle the selected file here
        if (event.currentFiles.length > 0) {
            const selectedFile = event.currentFiles[0];
            console.log('Selected File:', selectedFile);
            formData.append('ImageFile', selectedFile);
            this.profileService.uploadImage(formData).subscribe({
                next: () => {
                    this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Change Image Successfully',
                    life: 3000,
                    });
                setTimeout(() => {
                    this.router.navigate(['/']);
                }, 3000);
                },
                error: (err) => {
                    console.log(err);
                },
            });
        }
        // You can perform further actions, such as file validation or upload, here
    }
}
