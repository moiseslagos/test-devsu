import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showModalSource = new Subject<boolean>();
  private modalConfig: any = {};
  showModal$ = this.showModalSource.asObservable();

  private modalResponse = new Subject<boolean>();
  modalResponse$ = this.modalResponse.asObservable();

  constructor() {}

  toggleModal(show: boolean) {
    this.showModalSource.next(show);
  }
  setModalConfig(config: any) {
    this.modalConfig = config;
  }
  getModalConfig() {
    return this.modalConfig;
  }

  onAcceptAction(response:boolean) {
    return this.modalResponse.next(response);
  }
}
