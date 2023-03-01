import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Manager, ManagerPagination } from './manager.type';

@Injectable({ providedIn: 'root' })
export class ManagerService {

    private _manager: BehaviorSubject<Manager | null> = new BehaviorSubject(null);
    private _managers: BehaviorSubject<Manager[] | null> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<ManagerPagination | null> = new BehaviorSubject(null);


    constructor(private _httpClient: HttpClient) { }

    /**
 * Getter for manager
 */
    get manager$(): Observable<Manager> {
        return this._manager.asObservable();
    }

    /**
     * Getter for managers
     */
    get managers$(): Observable<Manager[]> {
        return this._managers.asObservable();
    }

    /**
 * Getter for pagination
 */
    get pagination$(): Observable<ManagerPagination> {
        return this._pagination.asObservable();
    }

    /**
 * Get managers
 *
 *
 * @param page
 * @param size
 * @param sort
 * @param order
 * @param search
 */
    getManagers(pageNumber: number = 0, pageSize: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search?: string):
        Observable<{ pagination: ManagerPagination; data: Manager[] }> {
        return this._httpClient.get<{ pagination: ManagerPagination; data: Manager[] }>('/api/users', {
            params: {
                pageSize: '' + pageSize,
                pageNumber: '' + pageNumber,
                sort,
                order,
                name: search || ''
            }
        }).pipe(
            tap((response) => {
                this._pagination.next(response.pagination);
                this._managers.next(response.data);
            })
        );
    }
}