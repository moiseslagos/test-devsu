import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services';
import { Products } from '../../models';
import { ButtonComponent, CardComponent, DropdownMenuComponent, FilterInputComponent, PaginationComponent } from '../../components';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ButtonComponent, DropdownMenuComponent, CardComponent, FilterInputComponent, PaginationComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit, OnDestroy {
  // Inject service
  private service = inject(ApiService)
  private modalService = inject(ModalService)

  public loading:boolean = false;
  public products:Products[] = [];
  public productsFiltered:Products[] = [];

  dropdownOptions: string[] = ['Editar', 'Eliminar'];

  private modalResponse!: Subscription;

  // Pagination
  pageSize: number = 5;
  currentPage: number = 1;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loading = true;
    this.service.getProducts().subscribe({
      next: (response) => {
        this.products = response;
        this.productsFiltered = response;
        this.paginateItems()
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.modalResponse) {
      this.modalResponse.unsubscribe();
    }
  }

  handleNewProduct():void {
    this.router.navigate(['/product/create']);
  }

  handleFilterChange(value: string): void {
    const query = value.toLowerCase().trim();
    console.log(query)
    if (query === '') {
      this.productsFiltered = this.products;
    } else {
      this.productsFiltered = this.products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.logo.toLowerCase().includes(query) ||
        product.id.includes(query)
      );
    }
  }

  onOptionSelected(option: string, product: Products): void {
    if(option === 'Editar') {
      // Añadiendo el producto seleccionado en un servicio, esto debido a que no hay un api que permita obtener un producto por id
      this.service.productSelected(product);
      // Navegando a la ruta de edición
      this.router.navigate([`/product/edit/${product.id}`]);
    }
    if(option === 'Eliminar') {
      this.loading = true;
      this.modalService.setModalConfig({
        content: `¿Estás seguro que deseas eliminar el producto ${product.name}?`,
        acceptButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar2'
      });
      this.modalService.toggleModal(true);
      this.modalResponse = this.modalService.modalResponse$.subscribe({
        next: (response) => {
          if(response) {
            this.service.deleteProduct(product.id).subscribe({
              next: () => {
                this.products = this.products.filter(item => item.id !== product.id);
                this.productsFiltered = this.productsFiltered.filter(item => item.id !== product.id);
                this.paginateItems();
              },
              error: (error) => {
                console.log(error);
              },
              complete: () => {
                this.loading = false;
              }
            });
          }
          this.loading = false;
          this.modalResponse.unsubscribe();
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.loading = false;
          this.modalResponse.unsubscribe();
        }
      });
    }
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.paginateItems();
  }
  paginateItems() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.productsFiltered = this.products.slice(startIndex, endIndex);
  }
}
