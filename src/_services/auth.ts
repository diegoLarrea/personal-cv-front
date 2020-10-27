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

        if(this.isAuthenticated()){
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
        }else{
            return null;
        }
    }
    
    login(usuario, pass):Observable<any>{    
        return this.http.post(`${Host.api}/login/`,{
            username: usuario,
            password: pass
        }, {headers:{skip:"true"}});
    }

    public captcha(body): Observable<any> {
        return this.http.post(`${Host.api}/captcha/`, body, {headers:{skip:"true"}})
    }

    logout(){    
        localStorage.removeItem("token");
    }

    register(body):Observable<any>{    
        return this.http.post(`${Host.api}/usuario-signup/`,body, {headers:{skip:"true"}});
    }

    activarCuenta(key):Observable<any>{    
        return this.http.post(`${Host.api}/usuario-activar-cuenta/`,{key:key}, {headers:{skip:"true"}});
    }

    resetPass(key, pass):Observable<any>{    
        return this.http.put(`${Host.api}/usuario-reset-pass/`,{key:key, password:pass}, {headers:{skip:"true"}});
    }

    solicitarResetPass(email):Observable<any>{    
        return this.http.post(`${Host.api}/usuario-reset-pass/`,{email:email}, {headers:{skip:"true"}});
    }
}