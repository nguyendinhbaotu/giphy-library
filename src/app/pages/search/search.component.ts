import { Component } from '@angular/core';
import { SearchResponse } from 'src/app/models';
import { GiphyService } from 'src/app/services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchResponse: SearchResponse = {};
  columns: any[] = [];

  constructor(public giphyService: GiphyService) {
    this.giphyService.search().subscribe((res: SearchResponse) => {
      this.searchResponse = res;
    })
  }
}
