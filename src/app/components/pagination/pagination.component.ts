import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit {
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter<number>();
  pageSize: number = 5;

  ngOnInit() {
    this.pageSizeChange.emit(this.pageSize);
  }

  onChangePageSize() {
    this.pageSizeChange.emit(this.pageSize);
  }
}
