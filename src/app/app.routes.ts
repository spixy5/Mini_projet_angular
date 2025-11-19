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

    { path: 'home', component: Home, title: 'Accueil' },
    { path: 'login', component: LogIn, title: 'Connexion' },
    { path: 'signup', component: SignUp, title: 'Créer un compte' },
    { path: 'forgotpassword/:email', component: ForgotPassword, title: 'Mot de passe oublié' },
    { path: 'aboutus', component: AboutUs, title: 'A props' },
    { path: 'museums', component: MuseumList, title: 'Liste des musées' },
    { path: 'museum/:id', component: MuseumSelected, title: 'Musée sélectionné' },
    { path: 'museum/comments', component: MuseumComments, title: 'Commentaires du musée' },
    { path: 'museum/:id/pay-ticket', component: PayTicketMuseum, title: 'Acheter un ticket' },
    { path: '', component: Home, title: 'Accueil' },
    { path: '**', redirectTo: 'home' }
  ];
