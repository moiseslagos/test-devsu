import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.scss'
})
export class DropdownMenuComponent {
  @Input() options: string[] = [];
  @Output() optionSelected = new EventEmitter<string>();
  showDropdown: boolean = false;

  closeDropdown(): void {
    this.showDropdown = false;
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  selectOption(option: string): void {
    this.showDropdown = false;
    this.optionSelected.emit(option);
  }
}
