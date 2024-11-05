import { Routes } from '@angular/router';
import { CardListComponent } from './products/card/card-list/card-list.component';
import { CartViewComponent } from './products/cart/cart-view/cart-view.component';
import { LogInComponent } from './auth/login/log-in/log-in.component';
import { SignInComponent } from './auth/sign-in/sign-in/sign-in.component';
import { ReportComponent } from './reports/report/report.component';

export const routes: Routes = [
    { path: '', component: CardListComponent },
    { path: 'cart', component: CartViewComponent },
    { path: 'login', component: LogInComponent },
    { path: 'sign', component: SignInComponent  },
    { path: 'report', component: ReportComponent }
];
