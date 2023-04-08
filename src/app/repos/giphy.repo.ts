import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchResponse, TrendingResponse } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GiphyRepo {

  baseUrl = 'https://api.giphy.com/v1/gifs';
  apiKey = '5wTVQqqo8bo7gkKAa5qkSZYyFvSWjwJt';

  constructor(
    private client: HttpClient
  ) { }

  search(q: string, limit: string = '25', offset: number = 0, rating: string = 'g', lang: string = 'en'): Observable<SearchResponse> {
    return this.client.get<SearchResponse>(`${this.baseUrl}/search`, {
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

  trending(limit: string = '25', rating: string = 'g') {
    return this.client.get<TrendingResponse>(`${this.baseUrl}/trending`, {
      params: {
        api_key: '5wTVQqqo8bo7gkKAa5qkSZYyFvSWjwJt',
        limit,
        rating,
      }
    })
  }
}
