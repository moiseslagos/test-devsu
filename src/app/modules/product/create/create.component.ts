import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder, AsyncValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { ApiService } from '../../../services';
import { ButtonComponent, InputComponent } from '../../../components';
import { Observable, Subscription, catchError, finalize, map, of } from 'rxjs';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule, InputComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {

  productForm!: FormGroup
  loadingForm: boolean = false;
  loadingValidationId: boolean = false;
  isUpdate: boolean = false;
  private service = inject(ApiService)
  private serviceObservable: Subscription = new Subscription();

  minDate: string = new Date().toISOString().split("T")[0];

  constructor(
    private formBuilder: FormBuilder,
    private destroyRef: DestroyRef
  ) {
    destroyRef.onDestroy(() => {
      this.serviceObservable.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      id: new FormControl('', {
        validators: [Validators.required],
        asyncValidators: [this.validateIdExistence()],
        updateOn: 'blur'
      }),
      name: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(100) ]),
      description: new FormControl('', [ Validators.required, Validators.minLength(10), Validators.maxLength(200) ]),
      logo: new FormControl('', [ Validators.required ]),
      date_release: new FormControl('', [ Validators.required ]),
      date_revision: new FormControl('', [ Validators.required ]),
    });
    this.serviceObservable = this.service.currentProduct.subscribe(producto => {
      if (!producto) return;
      this.isUpdate = true;
      this.productForm.patchValue(producto);
    });
  }

  handleRestart(): void {
    this.productForm.reset();
  }
  onSubmit(): void {
    if (this.productForm.valid) {
      this.loadingForm = true;
      // Actualizar producto
      if (this.isUpdate) {
        this.serviceObservable = this.service.updateProduct(this.productForm.value).subscribe({
          next: (response) => {
            console.log(response)
          },
          error: (error) => {
            console.log(error)
          },
          complete: () => {
            this.loadingForm = false;
          }
        });
        return;
      }
      // Crear producto
      this.serviceObservable = this.service.createProduct(this.productForm.value).subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => {
          this.loadingForm = false;
        }
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  get id() {
    return this.productForm.get('id');
  }

  validateIdExistence(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      this.loadingValidationId = true;
      return this.service.checkIdProduct(control.value).pipe(
        map(exists => (exists ? { idExists: true } : null )),
        catchError(() => of({ idExists: true })),
        finalize(() => this.loadingValidationId = false)
      );
    };
  }

  get f() {
    return this.productForm.controls;
  }
}
