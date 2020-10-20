import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Host } from 'src/_services/host';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(public jwtHelper: JwtHelperService, private http: HttpClient, private router: Router) { }
    
    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }

    public getUser(): Object {
        let token = localStorage.getItem('token');
        
        let decodedToken = this.jwtHelper.decodeToken(token);

        if(!decodedToken){
            return null;
        }

        return {
            nombre: decodedToken.nombre,
            apellido: decodedToken.apellido,
            email: decodedToken.email
        };
    }
    
    login(usuario, pass):Observable<any>{    
        return this.http.post(`${Host.api}/login/`,{
            username: usuario,
            password: pass
        });
    }

    logout(){    
        localStorage.removeItem("token");
    }
}