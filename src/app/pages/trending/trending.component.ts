import { Component } from '@angular/core';
import { SearchResponse } from 'src/app/models';
import { GiphyService } from 'src/app/services';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent {
  searchResponse: SearchResponse = {};
  columns: any[] = [];

  constructor(public giphyService: GiphyService) {
    this.giphyService.trending().subscribe((res: SearchResponse) => {
      this.searchResponse = res;
    })
  }
}
