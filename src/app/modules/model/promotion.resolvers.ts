import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PromotionService } from './promotion.service';

@Injectable({
    providedIn: 'root'
})

export class PromotionsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _modelService: PromotionService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this._modelService.getPromotions();
    }
}
