import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/model/Recipe';
import { RecipeService } from '../../service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

/*import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
*/
@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

    recipeID?:number;
    recipes :Recipe[]=[];
  /*
    items!: MenuItem[];
    products!: Product[];
    chartData: any;
    chartOptions: any;
    subscription!: Subscription;
*/
    constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute ) {}

    ngOnInit() {
        this.route.params.subscribe((params) => {
            if (params['searchTerm']){
              this.recipeService.searchRecipe(params['searchTerm'])
              .subscribe((result: Recipe[]) => this.recipes = result);
               console.log(this.recipes);}
            else {
                this.recipeService.getRecipes()
                .subscribe((result:Recipe[]) => this.recipes = result);
            }
          });

    }

    viewdetails(recipe:Recipe){
        this.recipeID = recipe.id;
        this.router.navigate(['recipe/',{ recipeId: this.recipeID }]);
    }
}
/*
    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    */
//}

