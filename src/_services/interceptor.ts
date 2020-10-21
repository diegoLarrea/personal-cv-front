
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

    constructor(
        private router: Router,
        private ngxService: NgxUiLoaderService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token: string = localStorage.getItem('token');

        let request = req;

        if (token) {
            request = req.clone({
                setHeaders: {
                    authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {

                if (err.status === 401) {
                    this.ngxService.stop();
                    this.router.navigateByUrl('/login');
                }

                return throwError(err);

            })
        );
    }

}