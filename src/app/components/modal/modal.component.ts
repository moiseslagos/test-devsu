import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { ButtonComponent } from '../button';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  showModal = false;
  modalContent: string = '';
  acceptButtonText: string = 'Aceptar';
  cancelButtonText: string = 'Cancelar';
  private modalSubscription: Subscription;

  private modalService = inject(ModalService)

  constructor() {
    this.modalSubscription = this.modalService.showModal$.subscribe(show => {
      this.showModal = show;
      const config = this.modalService.getModalConfig();
      if (config) {
        this.modalContent = config.content || 'Modal Content';
        this.acceptButtonText = config.acceptButtonText || 'Aceptar';
        this.cancelButtonText = config.cancelButtonText || 'Cancelar';
      }
    });
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

  closeModal() {
    this.modalService.onAcceptAction(false);
    this.modalService.toggleModal(false);
  }
  onAccept() {
    this.modalService.onAcceptAction(true);
    this.modalService.toggleModal(false);
  }
}
