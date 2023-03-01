import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ManagerService } from './manager.service';
import { Manager, ManagerPagination } from './manager.type';

@Injectable({
    providedIn: 'root'
})
// export class ManagerResolver implements Resolve<any>
// {
//     /**
//      * Constructor
//      */
//     constructor(
//         private _managerService: ManagerService,
//         private _router: Router
//     )
//     {
//     }

//     // -----------------------------------------------------------------------------------------------------
//     // @ Public methods
//     // -----------------------------------------------------------------------------------------------------

//     /**
//      * Resolver
//      *
//      * @param route
//      * @param state
//      */
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Manager>
//     {
//         return this._managerService.getManagerById(route.paramMap.get('id'))
//                    .pipe(
//                        // Error here means the requested product is not available
//                        catchError((error) => {

//                            // Log the error
//                            console.error(error);

//                            // Get the parent url
//                            const parentUrl = state.url.split('/').slice(0, -1).join('/');

//                            // Navigate to there
//                            this._router.navigateByUrl(parentUrl);

//                            // Throw an error
//                            return throwError(error);
//                        })
//                    );
//     }
// }

@Injectable({
    providedIn: 'root'
})
export class ManagersResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _managerService: ManagerService) {
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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: ManagerPagination; data: Manager[] }> {
        return this._managerService.getManagers();
    }
}
