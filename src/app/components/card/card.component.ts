import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() classes!: string[] | string | object;;
  @Input() loading: boolean = false;
}
