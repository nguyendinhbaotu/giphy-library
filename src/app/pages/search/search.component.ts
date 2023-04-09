import { Component } from '@angular/core';
import { SearchResponse } from 'src/app/models';
import { GiphyService } from 'src/app/services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  q = '';
  limit = '25';
  offset = 0;
  rating = 'g';
  lang = 'en';
  searchResponse: SearchResponse = {};
  columns: any[] = [];

  constructor(public giphyService: GiphyService) {
    this.giphyService.trending().subscribe((res: SearchResponse) => {
      this.searchResponse = res;
    })
  }

  search() {
    this.giphyService.search(this.q, this.limit, this.offset, this.rating, this.lang).subscribe((res: SearchResponse) => {
      this.searchResponse = res;
    })
  }
}
