import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { DetailsComponent } from './pages/details/details.component';


export const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'details',
    // path: 'details/:id',
    component: DetailsComponent
  }

];
