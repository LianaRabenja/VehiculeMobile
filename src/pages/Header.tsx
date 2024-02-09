import React, { useEffect, useState } from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonContent } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useHistory } from 'react-router';
import { home, notifications, book, power, personCircle, homeSharp, notificationsSharp, bookSharp, personCircleSharp, powerSharp} from 'ionicons/icons';
import Ajoutannonce from '../pages/Ajoutannonce';
import Login from '../pages/Login';


interface Marque {
  id: number;
  nom: string;
}


interface Annonce {
  id: number;
  titre: string;
  description: string;
  image: string;
}





function Accueil() { 


  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/Accueil" to="/h" />
          <Redirect exact path="/login" to="/" />
          <Route path="/library" render={() => <Login />} exact={true} />
          <Route path="/ajoutannonce" render={() => <Ajoutannonce />} exact={true} />
          <Redirect exact from="/Accueil/:id" to="/Detail/:id" />
        </IonRouterOutlet>

        <IonTabBar slot="bottom" id='barmenu'>
          <IonTabButton tab="home" href="/Acceuil">
            <IonIcon icon={homeSharp} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="annonce" href="/ajoutannonce">
            <IonIcon icon={bookSharp} />
            <IonLabel>Ajouter Annonce</IonLabel>
          </IonTabButton>

          <IonTabButton tab="library" href="/library">
            <IonIcon icon={notificationsSharp} />
            <IonLabel>Notification</IonLabel>
          </IonTabButton>

          <IonTabButton tab="library" href="/Profil">
            <IonIcon icon={personCircleSharp} />
            <IonLabel>Profil</IonLabel>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
}

export default Accueil;
