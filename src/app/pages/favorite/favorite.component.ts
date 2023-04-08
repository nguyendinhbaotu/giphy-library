import { Component } from '@angular/core';
import { SearchResponse } from 'src/app/models';
import { GiphyService } from 'src/app/services';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {
  searchResponse: SearchResponse = {
    data: []
  };
  columns: any[] = [];

  constructor(public giphyService: GiphyService) {
    // const items = [];
    this.searchResponse.data = [];
    // this.searchResponse.data  = [];
    const collection = this.giphyService.collection();
    debugger;
    Object.keys(collection).forEach((key) => {
      debugger;
      this.searchResponse?.data?.push(collection[key]);
    })
  }
}
