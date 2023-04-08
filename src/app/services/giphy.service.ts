import { Injectable } from '@angular/core';
import { GiphyRepo } from '../repos';

export const GIPHY_FAVORTIE_COLLECTION = 'giphy-favorite-collection';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  constructor(
    private giphyRepo: GiphyRepo
  ) { }

  search(q: string, limit: string = '25', offset: number = 0, rating: string = 'g', lang: string = 'en') {
    return this.giphyRepo.search(q, limit, offset, rating, lang);
  }

  trending(limit: string = '25', rating: string = 'g') {
    return this.giphyRepo.trending(limit, rating);
  }

  bookmark(image: any) {
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
