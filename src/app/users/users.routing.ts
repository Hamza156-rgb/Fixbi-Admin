import { Routes } from '@angular/router';



export const UserRoutes: Routes = [
   {
      path: '',
      redirectTo: 'userlist',
      pathMatch: 'full'
   },
   {
      path: '',
      children: [

      ]
   }
];
