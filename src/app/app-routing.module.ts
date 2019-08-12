import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: "", redirectTo: "/sensors", pathMatch: 'full'},
  {path: "sensors", loadChildren: "./components/sensors/sensors.module#SensorsModule"}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
    ],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
