import { Component, HostListener, Input, OnChanges, AfterViewInit, SimpleChanges, NgZone } from '@angular/core';
import { Item, SearchResponse } from 'src/app/models';
import { GiphyService } from 'src/app/services';

/**
 * Returns chunks of size n.
 * @param {Array<any>} array any array
 * @param {number} n size of chunk 
 */
function* chunks(array: any[], n: number) {
  for (let i = 0; i < array.length; i += n) yield array.slice(i, i + n);
}

@Component({
  selector: 'app-gif-list',
  templateUrl: './gif-list.component.html',
  styleUrls: ['./gif-list.component.scss']
})
export class GifListComponent implements OnChanges, AfterViewInit {
  @Input() searchResponse: SearchResponse = {};
  items: Item[] = [];
  columns: any[] = [];
  contentLoaded = false;
  viewInit = false;
  collection: any = {};
  sort = 'desc';

  constructor(
    public zone: NgZone,
    public giphyService: GiphyService
  ) {
    // this.giphyService.search().subscribe((res: SearchResponse) => {
    //   this.searchResponse = res;
    //   const width = window.innerWidth - 300;
    //   const noOfCol = width / 210 - 1;
    //   this.split(res.data || [], noOfCol);
    // })
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { searchResponse } = changes;
    if (searchResponse) {
      this.sortItems();
      if (this.viewInit) {
        this.render();
      }
    }
  }

  ngAfterViewInit() {
    this.viewInit = true;
    this.collection = this.giphyService.collection();
    this.render();
  }

  sortItems() {
    const items = this.searchResponse.data?.sort((a: Item, b: Item) => {
      if (new Date(a.import_datetime).getTime() > new Date(b.import_datetime).getTime()) {
        return 1;
      }
      return -1;
    });
    this.items = items || [];
  }

  render() {
    const width = window.innerWidth;
    const noOfCol = width / 210 - 1;
    this.split(this.items, noOfCol);

    setTimeout(() => {
      this.zone.run(() => this.contentLoaded = true);
    }, 4000);
  }

  split(items: Item[], noOfCol: number) {
    const colSize = Math.floor(items.length / noOfCol);
    this.columns = [...chunks(items, colSize)];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const width = event.target.innerWidth;
    const noOfCol = width / 210 - 1;
    this.split(this.searchResponse.data || [], noOfCol);
  }

  theme(image: any) {
    return {
      'width': '200px',
      'height': image.height + 'px',
      'border-radius': '10px',
    }
  }

  toggleBookmark(image: any) {
    this.collection = this.giphyService.toggleBookmark(image);
  }

  changeSort() {
    this.sortItems();
    this.render();
  }
}
