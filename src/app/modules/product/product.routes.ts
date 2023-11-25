import { Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { CreateComponent } from './create/create.component';

export const productRoutes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: CreateComponent}
];
