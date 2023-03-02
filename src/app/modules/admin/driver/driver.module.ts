import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DriverDetailComponent } from './detail/driver-detail.component';
import { DriverDetailResolver } from './detail/driver-detail.resolvers';
import { AccountStatusPipe } from '@fuse/pipes/status/status.pipe';
import { DriverComponent } from './driver.component';
import { DriversResolver } from './driver.resolvers';

const driverRoutes: Route[] = [
    {
        path: '',
        component: DriverComponent,
        resolve: {
            driver: DriversResolver
        },
    },
    {
        path: ':id',
        component: DriverDetailComponent,
        resolve: {
            driverDetail: DriverDetailResolver
        }
    }
];

@NgModule({
    declarations: [
        // Component
        DriverComponent,
        DriverDetailComponent,
        // Pipe
        AccountStatusPipe
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(driverRoutes),
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
export class DriverModule {
}
