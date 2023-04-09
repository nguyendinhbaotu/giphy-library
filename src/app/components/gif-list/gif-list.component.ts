import { Component, HostListener, Input, OnChanges, AfterViewInit, SimpleChanges, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item, SearchResponse } from 'src/app/models';
import { GiphyService } from 'src/app/services';
import { GifDetailsComponent } from '../gif-details/gif-details.component';

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
    public giphyService: GiphyService,
    public dialog: MatDialog
  ) {
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
    });
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.render();
  }

  theme(image: any) {
    return {
      'width': '200px',
      'height': image.height + 'px',
      'border-radius': '10px',
    }
  }

  toggleFavorite(item: Item) {
    this.collection = this.giphyService.toggleFavorite(item);
  }

  changeSort() {
    this.render();
  }

  openDetails(item: Item) {
    this.dialog.open(GifDetailsComponent, {
      height: '90%',
      width: '90%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        item,
      }
    });
  }
}
