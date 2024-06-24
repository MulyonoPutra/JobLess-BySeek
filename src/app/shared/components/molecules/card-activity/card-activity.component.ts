import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, type OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-card-activity',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    ButtonComponent,
  ],
  templateUrl: './card-activity.component.html',
  styleUrls: ['./card-activity.component.scss'],
})
export class CardActivityComponent implements OnInit {

  @Input() isLoading!: boolean;
  @Input() borderColor!: string;
  @Input({required: false}) isButtonHidden?: boolean;
  @Input() data!: any;
  @Output() clicked = new EventEmitter<void>();
  @Output() removed = new EventEmitter<string>();

  onClick(): void {
    this.clicked.emit();
  }

  onRemove(): void {
    this.removed.emit();
  }

  ngOnInit(): void { }



}
