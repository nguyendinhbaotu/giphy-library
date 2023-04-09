import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/models';

export interface DialogData {
  item: Item;
}

@Component({
  selector: 'app-gif-details',
  templateUrl: './gif-details.component.html',
  styleUrls: ['./gif-details.component.scss']
})
export class GifDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
