import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'wgd-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss'],
})
export class CopyrightComponent implements OnInit {
  @Input() bottom: string;
  text: string;
  constructor() {
    const year = (new Date()).getFullYear();
    this.text = `2010-${year} 生意专家byWuu`;
    this.bottom = '10px';
   }

  ngOnInit() {}

}
