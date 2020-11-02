import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Host } from 'src/_services/host';

@Injectable({
    providedIn: 'root'
})
export class LocalidadService {
    constructor(private http: HttpClient) { }
    
    get():Observable<any>{    
        return this.http.get(`${Host.api}/localidad/`);
    }

    post(body):Observable<any>{    
        return this.http.post(`${Host.api}/localidad/`, body);
    }

    put(body):Observable<any>{    
        return this.http.put(`${Host.api}/localidad/${body.id}`, body);
    }

    delete(id):Observable<any>{    
        return this.http.delete(`${Host.api}/localidad/${id}`);
    }

}