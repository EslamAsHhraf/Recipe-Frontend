import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import dayGridPlugin from '@fullcalendar/daygrid';
import { PlanMealsService } from '../../service/planmeals.service';
import { PlanMeal } from 'src/app/model/PlanMeals';
import { RecipeService } from '../../service/recipe.service';
import { Recipe } from 'src/app/model/recipe';
import { ProfileService } from '../../service/profile.service';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
    templateUrl: './eventcalendar.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
            .error {
                color: red;
            }
            .success {
                color: green;
                font-weight: bold;
            }
            :host ::ng-deep .pi-times {
                font-size: 12px !important; /* Change the size as needed */
            }
            .custom-icon-class {
                height: 1.5rem !important;
                width: 1.5rem;
            }
            li {
                font-size: 18px;
            }
        `,
    ],
    providers: [ConfirmationService, MessageService],
})
export class EventcalendarComponent implements OnInit {
    selectedDate: string;
    selectedRecipe: Recipe;
    recipes: Recipe[];
    planmeals: any[];
    userId!: number;
    events: { title: string; date: string }[];
    calendarOptions: CalendarOptions;
    displayRecipeDialog = false; // Control the visibility of the dialog
    userSelectedDate = false;
    displayeditdeleteDialog = false;
    meal: PlanMeal;
    displayEditdate = false;
    newSelectedDate: string;
    constructor(
        private planMealService: PlanMealsService,
        private messageService: MessageService,
        private recipeService: RecipeService,
        private profileService: ProfileService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.recipeService.getRecipes().subscribe((result: Recipe[]) => {
            this.recipes = result['data'];
        });

        this.profileService.getMe().subscribe({
            next: (res: any) => {
                this.userId = res?.data?.user?.id;
                this.planMealService
                    .getallUsersplanes(this.userId)
                    .subscribe((result: PlanMeal[]) => {
                        this.planmeals = result['data'];
                        this.events = this.planmeals.map((planmeal) => ({
                            title: planmeal.title,
                            date: planmeal.dateOn.toString().split('T')[0],
                        }));
                        this.planmeals = this.planmeals.map((planmeal) => ({
                            id: planmeal.id,
                            title: planmeal.title,
                            date: planmeal.dateOn.toString().split('T')[0],
                            recipeId: planmeal.recipeId,
                        }));
                        this.calendarOptions.events = this.events;
                    });
            },
        });
        this.calendarOptions = {
            initialView: 'dayGridMonth',
            plugins: [dayGridPlugin, interactionPlugin],
            height: 550,
            editable: true,
            firstDay: 0,
            weekends: true,
            allDayText: 'allday',
            // eventDrop: this.handleEventDrop.bind(this),
            eventDrop: (info) => {
                const startDate = info.event.start;
                const oldStartDate = info.oldEvent.start;

                oldStartDate.setDate(oldStartDate.getDate() + 1);
                startDate.setDate(startDate.getDate() + 1);

                const localStartDate = new Date(
                    oldStartDate.getTime() +
                        oldStartDate.getTimezoneOffset() * 60 * 1000
                );
                const formattedStartDate = localStartDate
                    .toISOString()
                    .split('T')[0];

                var recipename = info.event.title;

                this.meal = this.planmeals.filter((planmeal) => {
                    return (
                        planmeal.date === formattedStartDate &&
                        planmeal.title === recipename
                    );
                })[0];

                console.log(this.meal);
                var plan: PlanMeal = {
                    id: this.meal.id,
                    authorId: this.userId,
                    title: this.meal.title,
                    recipeId: this.meal.recipeId,
                    dateOn: startDate,
                };

                this.planMealService.updatePlan(plan).subscribe({
                    next: (res) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Updated Successfully',
                            life: 3000,
                        });
                        new Promise((resolve) => setTimeout(resolve, 800));

                        window.location.reload();
                    },
                    error: (err) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Success',
                            detail: "Error happen can't Delete",
                            life: 3000,
                        });
                    },
                });
            },
            eventClick: (info) => {
                this.displayeditdeleteDialog = true;
                const startDate = info.event.start;
                const isAllDayEvent = info.event.allDay;
                if (isAllDayEvent) {
                    startDate.setDate(startDate.getDate() + 1);
                }
                const localStartDate = new Date(
                    startDate.getTime() +
                        startDate.getTimezoneOffset() * 60 * 1000
                );
                const formattedStartDate = localStartDate
                    .toISOString()
                    .split('T')[0];
                var date = formattedStartDate;
                var recipename = info.event.title;
                // change the border color just for fun

                info.el.style.borderColor = 'red';
                this.meal = this.planmeals.filter((planmeal) => {
                    return (
                        planmeal.date === date && planmeal.title === recipename
                    );
                })[0];
            },
            dateClick: (info) => {
                this.userSelectedDate = true;
                this.displayRecipeDialog = true; // Open the dialog
                this.selectedDate = info.dateStr;
            },
        };
    }

    filterRecipes(event) {
        const query = event.query.toLowerCase();
        this.recipes = this.recipes.filter((recipe) =>
            recipe.title.toLowerCase().includes(query)
        );
    }

    onRecipeSelected() {
        if (this.selectedRecipe) {
            const dateObject = new Date(this.selectedDate);
            const formattedDate = `${dateObject.getFullYear()}-${(
                dateObject.getMonth() + 1
            )
                .toString()
                .padStart(2, '0')}-${dateObject
                .getDate()
                .toString()
                .padStart(2, '0')}`;
            const date = new Date(formattedDate);

            var plan: any = {
                authorId: this.userId,
                title: this.selectedRecipe.title,
                recipeId: this.selectedRecipe.id,
                dateOn: date,
            };
            this.planMealService.postPlan(plan).subscribe({
                next: (res) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'added success',
                        life: 3000,
                    });
                    new Promise((resolve) => setTimeout(resolve, 800));

                    window.location.reload();
                },
                error: (err) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'error',
                        detail: err['data'],
                        life: 3000,
                    });
                },
            });
            this.userSelectedDate = false;

            this.displayRecipeDialog = false; // Close the dialog
        } else {
            alert('Please select a recipe.');
        }
    }

    openRecipeDialog() {
        this.userSelectedDate = false;
        this.displayRecipeDialog = true; // Open the dialog
    }
    onClick() {
        this.displayEditdate = true;
    }
    onEditing() {
        const dateObject = new Date(this.newSelectedDate);
        const formattedDate = `${dateObject.getFullYear()}-${(
            dateObject.getMonth() + 1
        )
            .toString()
            .padStart(2, '0')}-${dateObject
            .getDate()
            .toString()
            .padStart(2, '0')}`;
        const date = new Date(formattedDate);

        var plan: PlanMeal = {
            id: this.meal.id,
            authorId: this.userId,
            title: this.meal.title,
            recipeId: this.meal.recipeId,
            dateOn: date,
        };

        this.planMealService.updatePlan(plan).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Updated Successfully',
                    life: 3000,
                });
                new Promise((resolve) => setTimeout(resolve, 800));

                window.location.reload();
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Success',
                    detail: "Error happen can't Delete",
                    life: 3000,
                });
            },
        });
        this.displayEditdate = false;
    }
    confirm1() {
        var res = this.confirmationService.confirm({
            key: 'confirm1',
            message: 'Are you sure to delete this recipe?',

            accept: () => this.acceptres(),
        });
    }
    acceptres() {
        this.planMealService.deletePlan(this.meal.id).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Delete Successfully',
                    life: 3000,
                });
                new Promise((resolve) => setTimeout(resolve, 800));

                window.location.reload();
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Success',
                    detail: "Error happen can't Delete",
                    life: 3000,
                });
            },
        });
    }

    eventsPromise: Promise<EventInput>;
}
