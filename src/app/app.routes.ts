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

export const routes: Routes = [
  { path: '', component: Home, title: 'Accueil' },
  { path: 'home', component: Home, title: 'Accueil' },
  { path: 'login', component: LogIn, title: 'Connexion' },
  { path: 'signup', component: SignUp, title: 'Créer un compte' },
  { path: 'aboutus', component: AboutUs, title: 'A props' },
  { path: 'forgot-password', component: ForgotPassword, title: 'Mot de passe oublié' },
  { path: 'museums', component: MuseumList, title: 'Liste des musées' },
  { path: 'museum/:id', component: MuseumSelected, title: 'Musée sélectionné' },
  { path: 'museum/:id/comments', component: MuseumComments, title: 'Commentaires du musée' },
  { path: 'museum/:id/pay-ticket', component: PayTicketMuseum, title: 'Acheter un ticket' },
  { path: '**', redirectTo: 'home' }
];
