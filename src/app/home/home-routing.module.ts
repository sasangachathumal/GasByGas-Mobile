import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { MyRequestsComponent } from "./my-requests/my-requests.component";

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'myRequest',
    component: MyRequestsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
