import React, { useState } from 'react';
import axios from 'axios';
import { IonHeader, IonInput, IonFooter, IonTitle, IonToolbar, IonContent, IonButton, IonToast } from '@ionic/react';
import { useHistory } from 'react-router';

function Login() {
    const history = useHistory();
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('123456789');
    const [errorToast, setErrorToast] = useState(false);

    const startScan = () => {
        const url = "https://0801241705-production.up.railway.app/login";
        const datapost = {
            username: username,
            password: password
        };

        console.log('Données avant envoi de la requête :', datapost);

        axios.post(url, datapost)
            .then(response => {
                console.log('Réponse de l\'API :', response.data);
                sessionStorage.setItem("token", response.data.access_token);
                history.push('/Acceuil');
            })
            .catch(error => {
                console.error('Erreur lors de la requête :', error);

                // Affichez le message d'erreur de la réponse s'il y en a un
                if (error.response && error.response.data && error.response.data.error_message) {
                    console.error('Erreur de réponse de l\'API :', error.response.data.error_message);

                    // Affichez une notification Toast pour informer l'utilisateur de l'erreur
                    setErrorToast(true);
                }
            });
    }

    return (
        <>
            <IonHeader></IonHeader>
            <br></br>
            <IonContent className='contenu'>
                <center>
                    <div className='login'><br></br>
                        <h1>Se connecter</h1>
                        <IonInput
                            className="custom-input"
                            label='email'
                            type='text'
                            labelPlacement='floating'
                            fill='outline'
                            value={username}
                            onIonChange={(e) => setUsername(e.detail.value!)}
                        ></IonInput><br></br>
                        <IonInput
                            className="custom-input"
                            label='password'
                            type='password'
                            labelPlacement='floating'
                            fill='outline'
                            value={password}
                            onIonInput={(e) => setPassword(e.detail.value!)}
                        ></IonInput><br></br>

                        <IonButton color={'warning'} onClick={startScan}>valider</IonButton><br></br>
                        <a href='/Inscription'>ou s'inscrire</a>
                    </div>
                </center>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonTitle>
                        <center>
                            BICARS
                        </center>
                    </IonTitle>
                </IonToolbar>
            </IonFooter>
            {/* Toast pour afficher les erreurs */}
            <IonToast
                isOpen={errorToast}
                onDidDismiss={() => setErrorToast(false)}
                message="Mot de passe incorrect"
                duration={3000}
                position="top"
                color="danger"
            />
        </>
    );
}

export default Login;
