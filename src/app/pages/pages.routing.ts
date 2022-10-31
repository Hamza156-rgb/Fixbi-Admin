import { Routes } from '@angular/router';



export const PagesRoutes: Routes = [
   {
      path: '',
      redirectTo: 'media',
      pathMatch: 'full'
   },
   {
      path: '',
      children: [

      ]
   }
];
