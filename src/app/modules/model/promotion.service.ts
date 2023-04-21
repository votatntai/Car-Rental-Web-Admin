import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs';
import { Promotion, PromotionPagination } from './promotion.type';

@Injectable({ providedIn: 'root' })
export class PromotionService {

    private _promotion: BehaviorSubject<Promotion | null> = new BehaviorSubject(null);
    private _promotions: BehaviorSubject<Promotion[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<PromotionPagination | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for promotion
 */
    get promotion$(): Observable<Promotion> {
        return this._promotion.asObservable();
    }

    /**
     * Getter for promotions
     */
    get promotions$(): Observable<Promotion[]> {
        return this._promotions.asObservable();
    }

    /**
 * Getter for pagination
 */
    get pagination$(): Observable<PromotionPagination> {
        return this._pagination.asObservable();
    }

    /**
 * Get promotions
 *
 *
 * @param page
 * @param size
 * @param sort
 * @param promotion
 * @param search
 */
    getPromotions(pageNumber: number = 0, pageSize: number = 20, sort: string = 'name', promotion: 'asc' | 'desc' | '' = 'asc', search?: string):
        Observable<{ pagination: PromotionPagination; data: Promotion[] }> {

        return this._httpClient.get<{ pagination: PromotionPagination; data: Promotion[] }>('/api/promotions', {
            params: {
                pageSize: '' + pageSize,
                pageNumber: '' + pageNumber,
                sort,
                promotion,
                name: search || ''
            }
        }).pipe(
            tap((response) => {

                this._pagination.next(response.pagination);
                this._promotions.next(response.data);
            }),
        );
    }

    /**
     * Get promotion by id
     */
    getPromotionById(id: string): Observable<Promotion> {
        return this.promotions$.pipe(
            take(1),
            switchMap(() => this._httpClient.get<Promotion>('/api/promotions/' + id).pipe(
                map((promotion) => {

                    // Set value for current promotion
                    this._promotion.next(promotion);

                    // Return the new contact
                    return promotion;
                })
            ))
        );
    }

    /**
* Create promotion
*/
    createPromotion(data) {
        return this.promotions$.pipe(
            take(1),
            switchMap((promotions) => this._httpClient.post<Promotion>('/api/promotions', data).pipe(
                map((newPromotion) => {

                    // Update promotion list with current page size
                    this._promotions.next([newPromotion, ...promotions].slice(0, this._pagination.value.pageSize));

                    return newPromotion;
                })
            ))
        )
    }

    /**
    * Update promotion
    */
    updatePromotion(id: string, data) {
        return this.promotions$.pipe(
            take(1),
            switchMap((promotions) => this._httpClient.put<Promotion>('/api/promotions/' + id, data).pipe(
                map((updatedPromotion) => {

                    // Find and replace updated promotion
                    const index = promotions.findIndex(item => item.id === id);
                    promotions[index] = updatedPromotion;
                    this._promotions.next(promotions);

                    // Update promotion
                    this._promotion.next(updatedPromotion);

                    return updatedPromotion;
                })
            ))
        )
    }
}