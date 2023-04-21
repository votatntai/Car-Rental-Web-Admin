import { AgmCoreModule } from '@agm/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Route, RouterModule } from '@angular/router';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { PromotionComponent } from './promotion.component';
import { PromotionsResolver } from './promotion.resolvers';
import { CreatePromotionComponent } from './create/create-promotion.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UpdatePromotionComponent } from './update/update-promotion.component';

const modelRoutes: Route[] = [
    {
        path: '',
        component: PromotionComponent,
        resolve: {
            model: PromotionsResolver
        },
    },
];

@NgModule({
    declarations: [
        PromotionComponent,
        CreatePromotionComponent,
        UpdatePromotionComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(modelRoutes),
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatSelectModule,
        FuseCardModule,
        AgmCoreModule,
        MatTableModule,
        MatAutocompleteModule,
        FuseAlertModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    providers: [
        DecimalPipe
    ]
})
export class PromotionModule {
}
