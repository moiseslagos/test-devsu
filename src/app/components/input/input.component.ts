import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() label!: string;
  @Input() controlName!: string;
  @Input() form!: FormGroup;
  @Input() type!: string;
  @Input() minDate!: string;

  get isError() {
    const control = this.form.get(this.controlName);
    return control?.invalid && control.touched;
  }

  get isPending() {
    const control = this.form.get(this.controlName);
    return control?.pending && control.touched;
  }
}
