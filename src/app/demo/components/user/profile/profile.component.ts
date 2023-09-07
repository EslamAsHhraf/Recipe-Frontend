import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { Profile } from 'src/app/model/Profile';
import { Recipe } from '../model/Recipe';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
    productDialog: boolean = false;
    ingredient!: string;
    recipe: Recipe[] = [];
    category: Category[] = [];
    profile: Profile = {
        id: 0,
        name: '',
        imageFile: '',
    };
    constructor(
        private profileService: ProfileService,
        private router: Router
    ) {}

    ngOnInit() {
        this.profileService.getMe().subscribe({
            next: (res: any) => {
                this.profile.id = res?.data?.userData?.id;
                this.profile.name = res?.data?.userData?.name;
                this.profile.imageFile =
                    'src/assets/api/' + res?.data?.userData?.imageFile;
            },
            error: () => {
                this.router.navigate(['./auth/login']);
            },
        });
    }
    openNew() {
        this.productDialog = true;
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
                next: () => {},
                error: (err) => {
                    console.log(err);
                },
            });
        }
        // You can perform further actions, such as file validation or upload, here
    }
}
