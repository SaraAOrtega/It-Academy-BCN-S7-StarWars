import { Routes } from '@angular/router';
import { StarShipListComponent } from './star-ship-list/star-ship-list.component';
import { StarShipItemComponent } from './star-ship-item/star-ship-item.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
    { path: 'starships', component: StarShipListComponent,canActivate: [authGuard], },
    { path: 'starshipInfo/:id', component: StarShipItemComponent, canActivate: [authGuard]  },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
];
