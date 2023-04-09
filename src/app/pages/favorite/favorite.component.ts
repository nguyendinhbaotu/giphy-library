import { Component, OnInit } from '@angular/core';
import { SearchResponse } from 'src/app/models';
import { GiphyService } from 'src/app/services';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  searchResponse: SearchResponse = {
    data: []
  };
  
  constructor(public giphyService: GiphyService) { }

  ngOnInit(): void {
    this.searchResponse.data = [];
    const collection = this.giphyService.collection();
    Object.keys(collection).forEach((key) => {
      this.searchResponse?.data?.push(collection[key]);
    })
  }
}
