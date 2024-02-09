import React, { useState, useEffect,useRef  } from 'react';
import axios from 'axios';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonLabel,
  InputChangeEventDetail,
} from '@ionic/react';

interface Marque {
  idMarque:number;
  id: number;
  nom: string;
}

interface Transmission {
  idTransmission:number;
  id: number;
  nom: string;
}

interface Categorie {
  idCategorie:number;
  id: number;
  nom: string;
}

interface Etat {
  idEtat:number;
  id: number;
  nom: string;
}

interface Modele {
  idModele:number;
  id: number;
  nom: string;
}
interface Photo{
  id:number;
  idVoiture:number;
  encoded:string;
}

interface Voiture {
  nom: string;
  description: string;
  marque: Marque;
  categorie: Categorie;
  modele: Modele;
  transmission: Transmission;
  etat: Etat;
  photo?:Photo[];
}


interface Annonce {
  voiture: Voiture;
  prix: number;
}


function Example() {
  const [newAnnonce, setNewAnnonce] = useState<Annonce>({
    voiture: {
      nom: '',
      description: '',
      marque: {
        idMarque:0,
        id: 0,
        nom: '',
      },
      categorie: {
        idCategorie:0,
        id: 0,
        nom: '',
      },
      modele: {
        idModele:0,
        id: 0,
        nom: '',
      },
      transmission: {
        idTransmission:0,
        id: 0,
        nom: '',
      },
      etat: {
        idEtat:0,
        id: 0,
        nom: '',
      },
      photo:[],
    },
  
    prix: 0,
  });
  const [encoded, setEncoded] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
  
    if (selectedFile) {
      let reader = new FileReader();
  
      reader.readAsDataURL(selectedFile);
  
      reader.onloadend = (event) => {
        const result = (event.target as FileReader).result;
  
        if (result) {
          setSelectedFile(selectedFile);
  
          // Stockez l'image dans la propriété "photo" avec l'attribut "encoded"
          setNewAnnonce((prevAnnonce) => ({
            ...prevAnnonce,
            voiture: {
              ...prevAnnonce.voiture,
              photo: [
                ...(prevAnnonce.voiture.photo || []),
                ...convertToPhoto(result),
              ],
            },
          }));
        }
      };
    } else {
      alert('Sélectionnez un fichier');
    }
  };
  
  const convertToPhoto = (result: string | ArrayBuffer): Photo[] => {
    if (typeof result === 'string') {
      return [
        {
          id: 0,
          idVoiture: 0,
          encoded: result,
        },
      ];
    } else if (result instanceof ArrayBuffer) {
      // Convertir ArrayBuffer en chaîne base64 si nécessaire
      const encoded = arrayBufferToBase64(result);
      return [
        {
          id: 0,
          idVoiture: 0,
          encoded: encoded,
        },
      ];
    } else {
      return [];
    }
  };
  
  // Fonction pour convertir ArrayBuffer en chaîne base64
  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };
  
  


  


  const [marques, setMarques] = useState<Marque[]>([]);
  useEffect(() => {
    const apiUrl = 'https://0801241705-production.up.railway.app/marque';
    axios
      .get(apiUrl)
      .then((response) => {
        setMarques(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des marques', error);
      });
  }, []);

  const [categories, setCategories] = useState<Categorie[]>([]);
  useEffect(() => {
    const apiUrl = 'https://0801241705-production.up.railway.app/categorie';
    axios
      .get(apiUrl)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des catégories', error);
      });
  }, []);

  const [etats, setEtats] = useState<Etat[]>([]);
  useEffect(() => {
    const apiUrl = 'https://0801241705-production.up.railway.app/etat';
    axios
      .get(apiUrl)
      .then((response) => {
        setEtats(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des états', error);
      });
  }, []);

  const [transmissions, setTransmissions] = useState<Transmission[]>([]);
  useEffect(() => {
    const apiUrl = 'https://0801241705-production.up.railway.app/transmission';
    axios
      .get(apiUrl)
      .then((response) => {
        setTransmissions(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des transmissions', error);
      });
  }, []);

  const [modeles, setModeles] = useState<Modele[]>([]);
  useEffect(() => {
    const apiUrl = 'https://0801241705-production.up.railway.app/modele';
    axios
      .get(apiUrl)
      .then((response) => {
        setModeles(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des modèles', error);
      });
  }, []);

  const handleInputChange = (e: CustomEvent<InputChangeEventDetail>, inputName: string) => {
    const { value } = e.detail;
    setNewAnnonce((prevAnnonce) => ({
      ...prevAnnonce,
      voiture: { ...prevAnnonce.voiture, [inputName]: value },
    }));
  };

  type SelectableEntity = Marque | Transmission | Categorie | Etat | Modele;

  const handleSelectChange = <T extends { id: number; nom: string }>(
    e: CustomEvent<InputChangeEventDetail>,
    inputName: string,
    options: T[]
  ) => {
    const { value } = e.detail;
    const selectedId = Number(value);
    const selectedOption = options.find((option) => option.id === selectedId);

    if (selectedOption) {
      setNewAnnonce((prevAnnonce) => ({
        ...prevAnnonce,
        voiture: { ...prevAnnonce.voiture, [inputName]: selectedOption },
      }));
    }
  };

  const handleAjoutAnnonce = () => {
    const apiUrl = 'https://0801241705-production.up.railway.app/annonce';
    const token = sessionStorage.getItem('token');

    console.log(token);
    const headers = {
      Authorization: 'Bearer ' + token,
      
      'Content-Type': 'application/json',
    };

    const voitureWithIds = {
      ...newAnnonce.voiture,
      marque: { id: newAnnonce.voiture.marque.id, nom: newAnnonce.voiture.marque.nom },
      categorie: { id: newAnnonce.voiture.categorie.id, nom: newAnnonce.voiture.categorie.nom },
      modele: { id: newAnnonce.voiture.modele.id, nom: newAnnonce.voiture.modele.nom },
      transmission: { id: newAnnonce.voiture.transmission.id, nom: newAnnonce.voiture.transmission.nom },
      etat: { id: newAnnonce.voiture.etat.id, nom: newAnnonce.voiture.etat.nom },
      idMarque:newAnnonce.voiture.marque.id,
      idCategorie: newAnnonce.voiture.categorie.id,
      idModele: newAnnonce.voiture.modele.id,
      idTransmission: newAnnonce.voiture.transmission.id,
      idEtat: newAnnonce.voiture.etat.id,
    };
    

    const newAnnounceWithCorrectedVoiture = {
      ...newAnnonce,
      voiture: voitureWithIds,
    };

    console.log('Sending newAnnounce:', newAnnounceWithCorrectedVoiture);

    axios
      .post(apiUrl, newAnnounceWithCorrectedVoiture, { headers })
      .then((response) => {
        console.log('Annonce ajoutée avec succès', response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de l'annonce", error);
        
      });
  };


  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ajouter une Annonce</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="conteneur-annonce">
          <IonItem>
            <IonLabel>Marque</IonLabel>
            <IonSelect
              value={newAnnonce.voiture.marque.id}
              placeholder="Choisir une Marque"
              onIonChange={(e) => handleSelectChange(e, 'marque', marques)}
            >
              {marques.map((option) => (
                <IonSelectOption key={option.id} value={option.id}>
                  {option.nom}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Categorie</IonLabel>
            <IonSelect
              value={newAnnonce.voiture.categorie.id}
              placeholder="Choisir une Categorie"
              onIonChange={(e) => handleSelectChange(e, 'categorie', categories)}
            >
              {categories.map((option) => (
                <IonSelectOption key={option.id} value={option.id}>
                  {option.nom}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Etat</IonLabel>
            <IonSelect
              value={newAnnonce.voiture.etat.id}
              placeholder="Choisir un Etat"
              onIonChange={(e) => handleSelectChange(e, 'etat', etats)}
            >
              {etats.map((option) => (
                <IonSelectOption key={option.id} value={option.id}>
                  {option.nom}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Transmission</IonLabel>
            <IonSelect
              value={newAnnonce.voiture.transmission.id}
              placeholder="Choisir une Transmission"
              onIonChange={(e) => handleSelectChange(e, 'transmission', transmissions)}
            >
              {transmissions.map((option) => (
                <IonSelectOption key={option.id} value={option.id}>
                  {option.nom}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Modele</IonLabel>
            <IonSelect
              value={newAnnonce.voiture.modele.id}
              placeholder="Choisir un Modele"
              onIonChange={(e) => handleSelectChange(e, 'modele', modeles)}
            >
              {modeles.map((option) => (
                <IonSelectOption key={option.id} value={option.id}>
                  {option.nom}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Prix</IonLabel>
            <IonInput
              type="number"
              value={newAnnonce.prix}
              onIonChange={(e) =>
                setNewAnnonce((prevAnnonce) => ({
                  ...prevAnnonce,
                  prix: parseFloat(e.detail.value!),
                }))
              }
            />
          </IonItem>
          <IonInput
            type="text"
            value={selectedFile ? selectedFile.name : ''}
            readonly={true}
          />
          <IonButton
            expand="full"
            fill="clear"
            onClick={() => fileInput.current?.click()}
          >
            Sélectionner un fichier
          </IonButton>
          <input
            type="file"
            accept="image/*"
            ref={fileInput}
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e)}
          />
          <IonButton onClick={handleAjoutAnnonce}>Ajouter Annonce</IonButton>
        </div>
      </IonContent>
    </>
  );
}

export default Example;