import { Injectable } from '@angular/core';
import { GiphyRepo } from '../repos';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  q = 'dogs';
  limit = '25';
  offset = 0;
  rating = 'g';
  lang = 'en';

  constructor(
    private giphyRepo: GiphyRepo
  ) { }

  search() {
    return this.giphyRepo.search(this.q, this.limit, this.offset, this.rating, this.lang);
  }

  trending() {
    return this.giphyRepo.trending(this.limit, this.rating);
  }
}
