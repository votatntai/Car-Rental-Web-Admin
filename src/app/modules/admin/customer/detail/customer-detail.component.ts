import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Subject, takeUntil } from 'rxjs';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.type';
import { MatDialog } from '@angular/material/dialog';
import { DenyLicenseComponent } from './deny-license/deny-license.component';

@Component({
    selector: 'app-customer-detail',
    templateUrl: 'customer-detail.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})

export class CustomerDetailComponent implements OnInit {

    customer: Customer;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _customerService: CustomerService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _dialog: MatDialog
    ) { }

    ngOnInit() {
        // Subscribe value of customer in service
        this._customerService.customer$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(customer => {
                // Update the customer
                this.customer = customer;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            })
    }

    // Update status for customer
    updateCustomerStatus(id: string, status: boolean) {
        this._fuseConfirmationService.open().afterClosed().subscribe(result => {
            if (result === 'confirmed') {
                this._customerService.updateCustomer(id, { status: status }).subscribe();
            }
        })
    }

    confirmLicense(valid: boolean) {
        this._fuseConfirmationService.open().afterClosed().subscribe(result => {
            if (result === 'confirmed') {
                this._customerService.updateCustomer(this.customer.id, { isLicenseValid: valid }).subscribe();
            }
        })
    }

    openDenyLicenseDialog() {
        this._dialog.open(DenyLicenseComponent, {
            width: '720px',
            data: this.customer
        }).afterClosed().subscribe(() => {
            this._changeDetectorRef.markForCheck();
        });
    }

}