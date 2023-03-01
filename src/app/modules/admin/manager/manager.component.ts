import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { ManagerService } from './manager.service';
import { Manager, ManagerPagination } from './manager.type';

@Component({
    selector: 'app-manager',
    templateUrl: 'manager.component.html',
    styleUrls: ['manager.component.css'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})

export class ManagerComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    managers$: Observable<Manager[]>;

    searchInputControl: UntypedFormControl = new UntypedFormControl();
    isLoading: boolean = false;
    pagination: ManagerPagination;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _managerService: ManagerService,
        private _changeDetectorRef: ChangeDetectorRef,
    ) { }

    ngOnInit() {
        // Get the products
        this.managers$ = this._managerService.managers$;

        // Get the pagination
        this._managerService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination: ManagerPagination) => {

                // Update the pagination
                this.pagination = pagination;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Search input value change
        this.subscribeSearchInput();
    }

    /**
 * After view init
 */
    ngAfterViewInit(): void {
        if (this._sort && this._paginator) {
            // Set the initial sort
            this._sort.sort({
                id: 'name',
                start: 'asc',
                disableClear: true
            });

            // Detect changes
            this._changeDetectorRef.detectChanges();

            // If the user changes the sort order...
            this._sort.sortChange
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(() => {
                    // Reset back to the first page
                    this._paginator.pageIndex = 0;
                });

            // Get products if sort or page changes
            merge(this._sort.sortChange, this._paginator.page).pipe(
                switchMap(() => {
                    this.isLoading = true;
                    return this._managerService.getManagers(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction, this.searchInputControl.value);
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
        }
    }

    subscribeSearchInput() {
        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                switchMap((query) => {
                    this.isLoading = true;
                    return this._managerService.getManagers(0, 10, 'name', 'asc', query);
                }),
                map(() => {
                    this.isLoading = false;
                })
            ).subscribe();
    }
}