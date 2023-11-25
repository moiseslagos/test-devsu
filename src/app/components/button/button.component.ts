import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { buttonVariant } from '../../models';
import { LoadingComponent } from '../loading';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Input() variant: buttonVariant = 'primary';
  @Input() loading: boolean = false;
  @Output() buttonClick: EventEmitter<any> = new EventEmitter();

  onClick(): void {
    this.buttonClick.emit();
  }

}
