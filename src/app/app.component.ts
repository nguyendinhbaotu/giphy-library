import { Component } from '@angular/core';
import { GiphyService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'giphy-library';


  constructor(private giphyService: GiphyService) {
    this.giphyService.search('dogs').subscribe((res) => {
      alert(res);
    })
  }
}
