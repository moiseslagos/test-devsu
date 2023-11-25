import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-filter-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-input.component.html',
  styleUrl: './filter-input.component.scss'
})
export class FilterInputComponent {
  @Input() debounceTimeMs: number = 300; // Tiempo de debounce predeterminado
  @Output() textoActualizado: EventEmitter<string> = new EventEmitter<string>();

  private inputSubject: Subject<string> = new Subject<string>();

  ngOnInit(): void {
    this.inputSubject.pipe(
      debounceTime(this.debounceTimeMs)
    ).subscribe(value => {
      this.textoActualizado.emit(value);
    });
  }

  onInputChange(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.inputSubject.next(valor);
  }
}
