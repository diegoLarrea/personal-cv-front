import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Host } from 'src/_services/host';
import { Educacion } from 'src/_models/educacion';

@Injectable({
    providedIn: 'root'
})
export class EducacionService {
    constructor(private http: HttpClient) { }
    
    get():Observable<any>{    
        return this.http.get(`${Host.api}/educacion/`);
    }

    post(body:Educacion):Observable<any>{    
        return this.http.post(`${Host.api}/educacion/`, body);
    }

    put(body:Educacion):Observable<any>{    
        return this.http.put(`${Host.api}/educacion/${body.id}`, body);
    }

    delete(id):Observable<any>{    
        return this.http.delete(`${Host.api}/educacion/${id}`);
    }
}