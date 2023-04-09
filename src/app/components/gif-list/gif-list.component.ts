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
      // this.sortItems();
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

  sortItems(sort: string) {
    const items = this.searchResponse.data?.sort((a: Item, b: Item) => {
      const diff = new Date(b.import_datetime).getTime() - new Date(a.import_datetime).getTime();
      return sort === 'desc' ? diff : diff * -1;
      // if (new Date(a.import_datetime).getTime() > new Date(b.import_datetime).getTime()) {
      //   return 1;
      // }
      // return -1;
    });
    // this.items = items || [];
    return items ? items : [];
  }

  estimateTotalHeight(items: Item[]) {
    let totalHeight = 0;
    items.forEach(item => {
      totalHeight += +item.images.fixed_width_downsampled.height;
    });

    return totalHeight;
  }

  estimateNumberOfColumns() {
    const width = window.innerWidth;
    const noOfCol = Math.floor(width / 208) - 1; // min-width for each gif is 200px + gap 16px / 2
    return noOfCol;
  }

  render() {
    const items = this.sortItems(this.sort);
    const totalHeight = this.estimateTotalHeight(items);
    const numberOfColumns = this.estimateNumberOfColumns();

    debugger;
    let colIdx = 0;
    this.columns = [];
    items.forEach(item => {
      if (!this.columns[colIdx]) this.columns[colIdx] = [];
      this.columns[colIdx].push(item);
      colIdx = (colIdx + 1) % numberOfColumns;
      debugger;
    })
    // for (let colIdx = 0; colIdx < numberOfColumns; colIdx++) {

    // }

    // this.split(this.items, numberOfColumns);

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
    // this.sortItems();
    this.render();
  }
}
