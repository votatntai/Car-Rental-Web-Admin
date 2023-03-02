import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ManagerComponent } from 'app/modules/admin/manager/manager.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ManagersResolver } from './manager.resolvers';
import { MatSortModule } from '@angular/material/sort';
import { ManagerDetailComponent } from './detail/manager-detail.component';
import { ManagerDetailResolver } from './detail/manager-detail.resolvers';
import { AccountStatusPipe } from '@fuse/pipes/status/status.pipe';

const managerRoutes: Route[] = [
    {
        path: '',
        component: ManagerComponent,
        resolve: {
            manager: ManagersResolver
        },
    },
    {
        path: ':id',
        component: ManagerDetailComponent,
        resolve: {
            managerDetail: ManagerDetailResolver
        }
    }
];

@NgModule({
    declarations: [
        // Component
        ManagerComponent,
        ManagerDetailComponent,
        // Pipe
        AccountStatusPipe
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(managerRoutes),
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSortModule
    ],
})
export class ManagerModule {
}