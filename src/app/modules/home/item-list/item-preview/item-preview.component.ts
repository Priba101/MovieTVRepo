import { Component, Input, OnInit } from '@angular/core';

import { MovieTV } from 'src/app/shared/models/movietv.model';

@Component({
  selector: 'app-item-preview',
  templateUrl: './item-preview.component.html',
  styleUrls: ['./item-preview.component.css']
})
export class ItemPreviewComponent implements OnInit {
  @Input() public singleItem: MovieTV;

  constructor() { }

  ngOnInit(): void {
  }

}
