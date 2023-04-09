import { Component, OnInit } from '@angular/core';
import { SearchResponse } from 'src/app/models';
import { GiphyService } from 'src/app/services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  q = '';
  limit = '25';
  offset = 0;
  rating = 'g';
  lang = 'en';
  sort = 'desc';
  searchResponse: SearchResponse = {};
  columns: any[] = [];

  constructor(public giphyService: GiphyService) { }

  ngOnInit(): void {
    this.giphyService.trending().subscribe((res: SearchResponse) => {
      this.searchResponse = res;
    })
  }

  search() {
    if (this.q) {
      this.giphyService.search(this.q, this.limit, this.offset, this.rating, this.lang).subscribe((res: SearchResponse) => {
        this.searchResponse = res;
      })
    }
  }
}
