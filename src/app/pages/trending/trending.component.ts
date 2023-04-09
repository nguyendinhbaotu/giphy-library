import { Component, OnInit } from '@angular/core';
import { SearchResponse } from 'src/app/models';
import { GiphyService } from 'src/app/services';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  searchResponse: SearchResponse = {};
  columns: any[] = [];

  constructor(public giphyService: GiphyService) { }

  ngOnInit(): void {
    this.giphyService.trending().subscribe((res: SearchResponse) => {
      this.searchResponse = res;
    })
  }
}
