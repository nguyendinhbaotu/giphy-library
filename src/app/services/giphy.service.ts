import { Injectable } from '@angular/core';
import { GiphyRepo } from '../repos';

export const GIPHY_FAVORTIE_COLLECTION = 'giphy-favorite-collection';

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

  bookmark(image: any) {
    debugger;
    const data = localStorage.getItem(GIPHY_FAVORTIE_COLLECTION);
    const collection = data ? JSON.parse(data) : {};
    collection[image.id] = image;
    localStorage.setItem(GIPHY_FAVORTIE_COLLECTION, JSON.stringify(collection));
    return collection;
  }

  toggleBookmark(image: any) {
    const data = localStorage.getItem(GIPHY_FAVORTIE_COLLECTION);
    const collection = data ? JSON.parse(data) : {};
    if (!!collection[image.id]) {
      delete collection[image.id]
    } else {
      collection[image.id] = image;
    }
    localStorage.setItem(GIPHY_FAVORTIE_COLLECTION, JSON.stringify(collection));
    return collection;
  }

  collection() {
    const data = localStorage.getItem(GIPHY_FAVORTIE_COLLECTION);
    const collection = data ? JSON.parse(data) : {};
    return collection; 
  }
}
