import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe  implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter(item => {
          // Implement your filtering logic here
          // For example, filtering by item's name
          return JSON.stringify(item).toLowerCase().includes(searchText);
        });
      }
}