import { DecimalPipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PromotionService } from '../promotion.service';
import { Promotion } from '../promotion.type';

@Component({
    selector: 'app-update-promotion',
    templateUrl: 'update-promotion.component.html'
})

export class UpdatePromotionComponent implements OnInit {

    promotion: Promotion;
    currentFormValue: any;
    updatePromotionForm: UntypedFormGroup;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Promotion,
        public matDialogRef: MatDialogRef<UpdatePromotionComponent>,
        private _promotionServive: PromotionService,
        private _formBuilder: UntypedFormBuilder,
        private _decimalPipe: DecimalPipe
    ) { }

    ngOnInit() {
        this.initUpdatePromotionForm();
        this.currentFormValue = this.updatePromotionForm.value;
    }

    private initUpdatePromotionForm() {
        this.updatePromotionForm = this._formBuilder.group({
            name: [this.data.name, [Validators.required]],
            description: [this.data.description, Validators.required],
            discount: [this.data.discount, Validators.required],
            expiryAt: [this.data.expiryAt, [Validators.required]],
            quantity: [this.data.quantity, [Validators.required]],
        });
    }

    public updatePromotion() {
        if (this.updatePromotionForm.valid && !this.compareInstances(this.updatePromotionForm.value, this.currentFormValue)) {
            this._promotionServive.updatePromotion(this.data.id, this.updatePromotionForm.value).subscribe(result => {
                if (result) {
                    this.matDialogRef.close('success');
                } else {
                    this.matDialogRef.close('error');
                }
            })
        }
    }

    private compareInstances(instance1: Promotion, instance2: Promotion): boolean {
        const keys = Object.keys(instance1);
        for (const key of keys) {
            if (instance1[key] !== instance2[key]) {
                return false;
            }
        }
        return true;
    }

}