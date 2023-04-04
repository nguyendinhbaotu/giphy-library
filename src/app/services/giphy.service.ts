import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  apiKey = '5wTVQqqo8bo7gkKAa5qkSZYyFvSWjwJt';

  constructor(
    private client: HttpClient
  ) { }

  search<T>(q: string, limit: string = '25', offset: number = 0, rating: string = 'g', lang: string = 'en') {
    return this.client.get<T>('https://api.giphy.com/v1/gifs/search', {
      params: {
        api_key: '5wTVQqqo8bo7gkKAa5qkSZYyFvSWjwJt',
        q,
        limit,
        offset,
        rating,
        lang
      }
    })
  }
}
