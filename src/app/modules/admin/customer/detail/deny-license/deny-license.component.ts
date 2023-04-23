import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../../customer.service';

@Component({
    selector: 'app-deny-license',
    templateUrl: 'deny-license.component.html'
})

export class DenyLicenseComponent implements OnInit {

    denyForm: UntypedFormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<DenyLicenseComponent>,
        private _formBuilder: UntypedFormBuilder,
        private _customerService: CustomerService,
    ) { }

    ngOnInit() {
        this.initDenyForm();
    }

    initDenyForm() {
        this.denyForm = this._formBuilder.group({
            isLicenseValid: [false, Validators.required],
            description: [null, Validators.required]
        });
    }

    denyCarRegistration() {
        if (this.denyForm.valid) {
            this._customerService.updateCustomer(this.data.id, this.denyForm.value).subscribe(result => {
                if (result) {
                    this.matDialogRef.close();
                }
            });
        }
    }
}