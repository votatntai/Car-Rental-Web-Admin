import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { confirmPasswordValidator, passwordValidator, phoneValidator, usernameValidator } from '@fuse/validators/custom-validator';
import { DriverService } from '../driver.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
    selector: 'app-create-driver',
    templateUrl: 'create-driver.component.html'
})

export class CreateDriverComponent implements OnInit {
    @ViewChild("placesRef") placesRef: GooglePlaceDirective;
    latitude: number;
    longitude: number;
    zoom: number;
    options: any = {
        types: [],
        componentRestrictions: { country: 'VN' },
    };
    createDriverForm: UntypedFormGroup;

    constructor(
        private _driverServive: DriverService,
        public matDialogRef: MatDialogRef<CreateDriverComponent>,
        private _formBuilder: UntypedFormBuilder
    ) { }

    ngOnInit() {
        this.initCreateDriverForm();
        this.setDefaultLocation();
    }

    private initCreateDriverForm() {
        this.createDriverForm = this._formBuilder.group({
            username: ['', [Validators.required, usernameValidator()]],
            password: ['', [Validators.required, passwordValidator()]],
            confirmPassword: [''],
            name: ['', Validators.required],
            address: ['', Validators.required],
            bankName: ['', Validators.required],
            bankAccountNumber: ['', Validators.required],
            gender: ['', Validators.required],
            phone: ['', [Validators.required, phoneValidator()]],
            location: [null, Validators.required],
        });
        this.createDriverForm.get('confirmPassword').setValidators([
            Validators.required,
            confirmPasswordValidator(this.createDriverForm.get('password'))
        ]);
    }

    public onGenderChange(value: string) {
        this.createDriverForm.controls['gender'].setValue(value);
    }

    public createDriver() {
        if (this.createDriverForm.valid) {
            this._driverServive.createDriver(this.createDriverForm.value).subscribe(result => {
                if (result) {
                    this.matDialogRef.close('success');
                } else {
                    this.matDialogRef.close('error');
                }
            })
        }
    }

    setDefaultLocation() {
        // Set default location is "FPT University"
        this.latitude = 10.841210501207392;
        this.longitude = 106.81019304317037;
        this.zoom = 15;
    }

    public handleAddressChange(address: Address) {
        this.latitude = address.geometry.location.lat();
        this.longitude = address.geometry.location.lng();
        this.createDriverForm.controls['location'].setValue({
            latitude: this.latitude,
            longitude: this.longitude
        });
    }

    mapClicked($event: any): void {
        this.latitude = $event.coords.lat;
        this.longitude = $event.coords.lng;
        this.createDriverForm.controls['location'].setValue({
            latitude: this.latitude,
            longitude: this.longitude
        });
    }
}