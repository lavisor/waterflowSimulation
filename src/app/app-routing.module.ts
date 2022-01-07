import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SlidersComponent } from './sliders/sliders.component';
import { SimulatorBoardComponent } from './simulator-board/simulator-board.component';


const routes: Routes = [
  { path: 'create', component: SlidersComponent }, 
  { path: 'simulate', component: SimulatorBoardComponent }, 
  { path: '', redirectTo: '/create', pathMatch: 'full' },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})


export class AppRoutingModule { }
