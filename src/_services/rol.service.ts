import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Host } from 'src/_services/host';

@Injectable({
    providedIn: 'root'
})
export class RolService {
    constructor(private http: HttpClient) { }
    
    get():Observable<any>{    
        return this.http.get(`${Host.api}/rol/`);
    }

    post(body):Observable<any>{    
        return this.http.post(`${Host.api}/rol/`, body);
    }

    put(body):Observable<any>{    
        return this.http.put(`${Host.api}/rol/${body.id}`, body);
    }

    delete(id):Observable<any>{    
        return this.http.delete(`${Host.api}/rol/${id}`);
    }

    permisos(idRol):Observable<any>{
        let httpParams = new HttpParams();
        httpParams = httpParams.append("rol", idRol.toString());    
        return this.http.get(`${Host.api}/rol-permiso/`, {params: httpParams});
    }

    addPermisos(idRol, idPermiso):Observable<any>{    
        return this.http.post(`${Host.api}/rol-permiso/`,{rol:idRol,permiso:idPermiso});
    }

    removePermisos(idRol, idPermiso):Observable<any>{
        let httpParams = new HttpParams();
        httpParams = httpParams.append("permiso", idPermiso.toString());    
        return this.http.delete(`${Host.api}/rol-permiso/${idRol}`, {params: httpParams});
    }

}