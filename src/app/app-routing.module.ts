import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HorizontalLayoutComponent } from './horizontal-layout/horizontal-layout.component';
import { MainComponent }   from './main/main.component';
import { AuthGuard } from './core/guards/auth.guard';


const appRoutes: Routes = [
   {
      path: '',
      redirectTo: 'tables/customers',
      pathMatch: 'full',
   },
   {	
      path: 'session',
      loadChildren: () => import('./session/session.module').then(m => m.SessionModule)
   },
   {
      path: '',
      component: MainComponent,
      canActivate: [AuthGuard],
      runGuardsAndResolvers: 'always',
      children: [
         {  path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
         {  path: 'editor', loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule)},
         {  path: 'icons', loadChildren: () => import('./material-icons/material-icons.module').then(m => m.MaterialIconsModule)},
         {  path: 'components', loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)},
         {  path: 'dragndrop', loadChildren: () => import('./drag-drop/drag-drop.module').then(m => m.DragDropModule)},
         {  path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)},
         {  path: 'forms', loadChildren: () => import('./forms/forms.module').then(m => m.FormModule)},
         {  path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
         {  path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
         {  path: 'video-player', loadChildren: () => import('./video-player/video-player.module').then(m => m.VideoPlayerModule)},
         {  path: 'taskboard', loadChildren: () => import('./task-board/task-board.module').then(m => m.TaskBoardModule)},
         {  path: 'user-management', loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule)},
      ]
   },
   {
      path: 'horizontal',
      component: HorizontalLayoutComponent,
      canActivate: [AuthGuard],
      runGuardsAndResolvers: 'always',
      children: [
         {  path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
         {  path: 'editor', loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule)},
         {  path: 'icons', loadChildren: () => import('./material-icons/material-icons.module').then(m => m.MaterialIconsModule)},
         {  path: 'components', loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)},
         {  path: 'dragndrop', loadChildren: () => import('./drag-drop/drag-drop.module').then(m => m.DragDropModule)},
         {  path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)},
         {  path: 'forms', loadChildren: () => import('./forms/forms.module').then(m => m.FormModule)},
         {  path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
         {  path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
         {  path: 'video-player', loadChildren: () => import('./video-player/video-player.module').then(m => m.VideoPlayerModule)},
         {  path: 'taskboard', loadChildren: () => import('./task-board/task-board.module').then(m => m.TaskBoardModule)},
         {  path: 'user-management', loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule)},
      ]
   },
   {
      path: '**',
      redirectTo: 'session/login'
   }
]

@NgModule({
  	imports: [RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })],
 	exports: [RouterModule],
  	providers: []
})
export class RoutingModule { }
