import { Component } from '@angular/core';
import { SearchResponse } from 'src/app/models';
import { GiphyService } from 'src/app/services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchRes: any
  constructor(private giphyService: GiphyService) {
    this.giphyService.search('dogs').subscribe((res) => {
      this.searchRes = res;
    })
  }
}
