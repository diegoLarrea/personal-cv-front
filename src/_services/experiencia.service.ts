import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Host } from 'src/_services/host';
import { Experiencia } from 'src/_models/experiencia';

@Injectable({
    providedIn: 'root'
})
export class ExperienciaService {
    constructor(private http: HttpClient) { }
    
    get():Observable<any>{    
        return this.http.get(`${Host.api}/experiencia/`);
    }

    post(body:Experiencia):Observable<any>{    
        return this.http.post(`${Host.api}/experiencia/`, body);
    }

    put(body:Experiencia):Observable<any>{    
        return this.http.put(`${Host.api}/experiencia/${body.id}`, body);
    }

    delete(id):Observable<any>{    
        return this.http.delete(`${Host.api}/experiencia/${id}`);
    }
}