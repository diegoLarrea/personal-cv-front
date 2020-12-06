import { Pipe, PipeTransform } from '@angular/core';
import { Empleo } from 'src/_models/empleo';

@Pipe({
  name: 'homePipe'
})
export class HomePipe implements PipeTransform{
    transform(items: Empleo[], searchText: string): any[] {        
        if (!items) return [];

        if(searchText == null || searchText == "") return items;

        searchText = searchText.toLowerCase();

        return items.filter(it => {
            return it.oportunidad.toLowerCase().includes(searchText) ||
            it.id.toLowerCase().includes(searchText) ||
            it.localidad.nombre.toLowerCase().includes(searchText) ||
            it.localidad.direccion.toLowerCase().includes(searchText);
        });

    }
}