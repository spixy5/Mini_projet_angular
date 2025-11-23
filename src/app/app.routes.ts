import { Routes } from '@angular/router';
import { Home } from './front/components/home/home';
import { LogIn } from './front/components/log-in/log-in';
import { SignUp } from './front/components/sign-up/sign-up';
import { ForgotPassword } from './front/components/forgot-password/forgot-password';
import { MuseumList } from './front/components/museum-list/museum-list';
import { MuseumSelected } from './front/components/museum-selected/museum-selected';
import { MuseumComments } from './front/components/museum-comments/museum-comments';
import { PayTicketMuseum } from './front/components/pay-ticket-museum/pay-ticket-museum';
import { AboutUs } from './front/components/about-us/about-us';
import { AdminStatistics } from './back/components/admin-statistics/admin-statistics';
import { AdminUsers } from './back/components/admin-user-list/admin-user-list';
import { AdminModifyMuseum } from './back/components/admin-modify-museum/admin-modify-museum';
import { AdminAddMuseum } from './back/components/admin-add-museum/admin-add-museum';
import { AdminMuseumList } from './back/components/admin-museum_list/admin-museum_list';
import { Admin } from './back/components/admin/admin';
import { AdminSelectedUser } from './back/components/admin-selected-user/admin-selected-user';
import { authadminGuard } from './guards/authadmin-guard';
import { authuserGuard } from './guards/authuser-guard';
  export const routes: Routes = [
{ path: 'home', component: Home, title: 'Accueil' },
{ path: 'login', component: LogIn, title: 'Connexion' },
{ path: 'signup', component: SignUp, title: 'Créer un compte' },
{ path: 'forgotpassword/:email', component: ForgotPassword, title: 'Mot de passe oublié' },
{ path: 'aboutus', component: AboutUs, title: 'A propos' },
{ path: 'museums', component: MuseumList, title: 'Liste des musées' },
{ path: 'museum/:id', component: MuseumSelected, title: 'Musée sélectionné', 
   children: [
    { path: 'comments', component: MuseumComments, title: 'Commentaires du musée' }
  ] },
{ path: 'museum/:id/pay-ticket', component: PayTicketMuseum, title: 'Acheter un ticket',canActivate:[authuserGuard] },
{ path: 'admin', component: Admin, title: 'Admin' },
{ path: 'admin/museums', component: AdminMuseumList, title: 'Admin Musées',canActivate:[authadminGuard] },
{ path: 'admin/museum/:id/modify', component: AdminModifyMuseum, title: 'Modifier un musée' ,canActivate:[authadminGuard]},
{ path: 'admin/add-museum', component: AdminAddMuseum, title: 'Ajouter un musée',canActivate:[authadminGuard] },
{ path: 'admin/users', component: AdminUsers, title: 'Utilisateurs',canActivate:[authadminGuard] },
{ path: 'admin/user/:id', component: AdminSelectedUser, title: 'Utilisateur sélectionné' ,canActivate:[authadminGuard]},
{ path: 'admin/statistics', component: AdminStatistics, title: 'Statistiques' ,canActivate:[authadminGuard]},
{ path: '', component: Home, title: 'Accueil' },
{ path: '**', redirectTo: 'home' }
  ];
