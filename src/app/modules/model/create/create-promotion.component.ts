import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PromotionService } from '../promotion.service';

@Component({
    selector: 'app-create-promotion',
    templateUrl: 'create-promotion.component.html'
})

export class CreatePromotionComponent implements OnInit {

    createPromotionForm: UntypedFormGroup;
    constructor(
        private _promotionServive: PromotionService,
        public matDialogRef: MatDialogRef<CreatePromotionComponent>,
        private _formBuilder: UntypedFormBuilder
    ) { }

    ngOnInit() {
        this.initCreatePromotionForm();
    }

    private initCreatePromotionForm() {
        this.createPromotionForm = this._formBuilder.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            discount: ['', [Validators.required]],
            expiryAt: ['', Validators.required],
        });
    }

    public createPromotion() {
        if (this.createPromotionForm.valid) {
            this._promotionServive.createPromotion(this.createPromotionForm.value).subscribe(result => {
                if (result) {
                    this.matDialogRef.close('success');
                } else {
                    this.matDialogRef.close('error');
                }
            })
        }
    }
}