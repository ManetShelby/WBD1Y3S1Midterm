import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Dashboard } from './dashboard/dashboard'
import { Category } from './category/category';
import { Products } from './products/products';
import { User } from './user/user';
export const routes: Routes = [


    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'home', component: Home},
    {path:'dashboard',component:Dashboard},
    {path:'category', component: Category},
    {path:'products',component:Products},
    {path:'user',component:User},
];
