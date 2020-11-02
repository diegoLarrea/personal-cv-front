import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Host } from 'src/_services/host';

@Injectable({
    providedIn: 'root'
})
export class AreaService {
    constructor(private http: HttpClient) { }
    
    get():Observable<any>{    
        return this.http.get(`${Host.api}/area/`);
    }

    post(body):Observable<any>{    
        return this.http.post(`${Host.api}/area/`, body);
    }

    put(body):Observable<any>{    
        return this.http.put(`${Host.api}/area/${body.id}`, body);
    }

    delete(id):Observable<any>{    
        return this.http.delete(`${Host.api}/area/${id}`);
    }

}