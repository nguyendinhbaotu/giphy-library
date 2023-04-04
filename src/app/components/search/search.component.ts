import { Component, HostListener } from '@angular/core';
import { Item, SearchResponse } from 'src/app/models';
import { GiphyService } from 'src/app/services';

/**
 * Returns chunks of size n.
 * @param {Array<any>} array any array
 * @param {number} n size of chunk 
 */
function* chunks(array: any[], n: number) {
  for (let i = 0; i < array.length; i += n) yield array.slice(i, i + n);
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchRes: SearchResponse = {};
  columns: any[] = [];
  limit = '25';
  rating = 'g';

  constructor(private giphyService: GiphyService) {
    this.giphyService.search<SearchResponse>('dogs', this.limit, 0, this.rating).subscribe((res: SearchResponse) => {
      this.searchRes = res;
      const width = window.innerWidth - 300;
      const noOfCol = width / 210 - 1;
      this.split(res.data || [], noOfCol);
    })
  }

  split(items: Item[], noOfCol: number) {
    const colSize = Math.floor(items.length / noOfCol);
    this.columns = [...chunks(items, colSize)];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const width = event.target.innerWidth - 300;
    const noOfCol = width / 210 - 1;
    this.split(this.searchRes.data || [], noOfCol);
  }
}
