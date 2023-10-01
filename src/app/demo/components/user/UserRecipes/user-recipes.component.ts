import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../service/user.service';
import { Profile } from 'src/app/model/profile';
import { Router ,ActivatedRoute} from '@angular/router';
import { Recipe } from 'src/app/model/recipe';

@Component({
    selector: 'app-user-recipes',
    templateUrl: './user-recipes.component.html',
    providers: [MessageService],
})
export class UserRecipesComponent implements OnInit {
    userid:number;
    profile: Profile = {
        id: 0,
        name: '',
        imageFile: '',
    };
    userImage: any;
    recipes: Recipe[] = [];
    constructor(
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,

    ) {}

    ngOnInit() {
        this.userid = parseInt(this.route.snapshot.params['userid']);
        console.log(this.userid);
        this.userService.getUser(this.userid).subscribe((res:any)=>{
                this.profile.id = res?.data?.id;
                this.profile.name = res?.data?.name;
                this.userImage = res?.data?.image;
        })
        this.userService.getRecipesOfUser(this.userid).subscribe((res:any)=>{
            this.recipes= res?.data;
    })

    }

}

