import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Host } from 'src/_services/host';
import { Referencia } from 'src/_models/referencia';

@Injectable({
    providedIn: 'root'
})
export class ReferenciaService {
    constructor(private http: HttpClient) { }
    
    get():Observable<any>{    
        return this.http.get(`${Host.api}/referencia/`);
    }

    post(body:Referencia):Observable<any>{    
        return this.http.post(`${Host.api}/referencia/`, body);
    }

    put(body:Referencia):Observable<any>{    
        return this.http.put(`${Host.api}/referencia/${body.id}`, body);
    }

    delete(id):Observable<any>{    
        return this.http.delete(`${Host.api}/referencia/${id}`);
    }
}