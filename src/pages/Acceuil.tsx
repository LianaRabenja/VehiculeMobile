import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonFooter, IonTitle, IonCardHeader, IonHeader, IonToolbar, IonCardTitle, IonCardContent, IonCard, IonImg } from '@ionic/react';
import Header from '../pages/Header';

function Example() {
  interface Annonce {
    id: number;
    voiture: {
      nom: string;
      description: string;
      marque: {
        nom: string;
      };
      categorie: {
        nom: string;
      };
      modele: {
        nom: string;
      };
      transmission: {
        nom: string;
      };
      etat: {
        nom: string;
      };
      photo: [
        {
        id: number;
        encoded: string;
      }];
    };
    
    prix: number;
  }

  const [annonces, setAnnonces] = useState<Annonce[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        console.log(token);
        const response = await fetch('https://0801241705-production.up.railway.app/annonce/mine', {
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        });

        const responseData = await response.json();
        console.log(responseData);
        if (response.ok) {
          console.log(responseData);
          setAnnonces(responseData);
        } else {
          console.error('Erreur lors de la requête. Statut HTTP:', response.status);
          console.error('Réponse de l\'API :', responseData);
        }
      } catch (error) {
        console.error('Erreur lors de la requête :', error);
      }
    };

    fetchData();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Header />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {annonces.map((item) => (
          <IonCard key={item.id}>
            <IonCardHeader>
       
            </IonCardHeader>
            <IonCardContent>
          
              Modele: {item.voiture && item.voiture.modele.nom}<br></br>
              Categorie: {item.voiture && item.voiture.categorie.nom} <br></br>
              Marque: {item.voiture && item.voiture.marque.nom} <br />
              Transmission: {item.voiture && item.voiture.transmission.nom} <br />
              Etat: {item.voiture && item.voiture.etat.nom} <br />
              Prix: {item.prix}
              <IonImg src={item.voiture && item.voiture.photo && item.voiture.photo[0] &&  item.voiture.photo[0].encoded} />

            </IonCardContent>
          </IonCard>
        ))}
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
    </IonPage>
  );
}

export default Example;
