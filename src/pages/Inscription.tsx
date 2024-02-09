// SignUpComponent.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { IonPage, IonContent, IonInput, IonLabel, IonButton } from '@ionic/react';
import { useHistory } from 'react-router';
const SignUpComponent: React.FC = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    passwordFront: '',
    nom: '',
    mail: '',
    telephone: '',
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSignUp = () => {
    const apiUrl = 'https://0801241705-production.up.railway.app/utilisateur/save';
    
    axios.post(apiUrl, userData)
      .then(response => {
        history.push('/Login');
        // Gérer la réponse (par exemple, afficher un message de succès)
        console.log('Inscription réussie', response.data);
       
      })
      .catch(error => {
        // Gérer les erreurs (par exemple, afficher un message d'erreur)
        console.error('Erreur lors de l\'inscription', error);
      });
  };

  return (
    <IonPage>
      <IonContent>
        <h2>Inscription</h2>
        <form>
          <IonLabel>Username:</IonLabel>
          <IonInput type="text" name="username" value={userData.username} onIonChange={handleInputChange} />

          <IonLabel>Password:</IonLabel>
          <IonInput type="password" name="password" value={userData.password} onIonChange={handleInputChange} />

          <IonLabel>Confirm Password:</IonLabel>
          <IonInput type="password" name="passwordFront" value={userData.passwordFront} onIonChange={handleInputChange} />

          <IonLabel>Nom:</IonLabel>
          <IonInput type="text" name="nom" value={userData.nom} onIonChange={handleInputChange} />

          <IonLabel>Email:</IonLabel>
          <IonInput type="email" name="mail" value={userData.mail} onIonChange={handleInputChange} />

          <IonLabel>Téléphone:</IonLabel>
          <IonInput type="number" name="telephone" value={userData.telephone} onIonChange={handleInputChange} />

          <IonButton expand="full" onClick={handleSignUp}>S'inscrire</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default SignUpComponent;
