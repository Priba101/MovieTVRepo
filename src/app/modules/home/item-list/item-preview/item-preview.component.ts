import { Content } from 'src/app/shared/models/content.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-preview',
  templateUrl: './item-preview.component.html',
  styleUrls: ['./item-preview.component.css']
})
export class ItemPreviewComponent implements OnInit {
  @Input() public singleItem: Content;
  constructor() { }

  ngOnInit(): void {
  }

}
