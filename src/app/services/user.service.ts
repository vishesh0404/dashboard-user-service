import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy{
  baseUrl = 'http://localhost:3000/users';
  updateHeaderTitleSub: Subject<any> = new Subject();

  constructor(private http: HttpClient) {}

  addUser(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  getUserDetails(): Observable<any> {
    /** uncomment when integrate API call */
    // return this.http.get(this.baseUrl);

    /** comment when integrate API call */
    return this.http.get('./assets/user-list.json');
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateUser(id: number, data: any): Observable<unknown> {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }

  updateHeaderTitle(title: string) {
    this.updateHeaderTitleSub.next(title);
  }

  ngOnDestroy(): void {
    this.updateHeaderTitleSub?.unsubscribe();
  }
}
