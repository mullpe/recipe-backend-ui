import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./upload.component').then((c) => c.UploadComponent)
  },
  {
    path: 'hello-world',
    loadComponent: () => import('./hello-world.component').then((c) => c.HellowWorldComponent)
  }
];
