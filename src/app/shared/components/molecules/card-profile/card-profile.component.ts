import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-profile',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule
  ],
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.scss'],
})
export class CardProfileComponent implements AfterViewInit {

  //the text that need to be put in the container
  @Input() text!: string;

  //maximum height of the container
  @Input() maxHeight: number = 10;
  
  @Output() edited = new EventEmitter<string>();



  //set these to false to get the height of the expended container
  public isCollapsed: boolean = false;
  public isCollapsable: boolean = false;

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    let currentHeight = this.elementRef.nativeElement.getElementsByTagName('div')[0].offsetHeight;
    //collapsable only if the contents make container exceed the max height
    console.log(currentHeight)
    if (currentHeight > this.maxHeight) {
      this.isCollapsed = true;
      this.isCollapsable = true;
    }
  }

  onClick(id: string): void {
    this.edited.emit(id);
  }

}
