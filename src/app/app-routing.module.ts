import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [ 


{
  path:'',  // if the path is empty so use redirectTo property
  redirectTo:'home',
  pathMatch:'full'
},




 ];  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  

}

