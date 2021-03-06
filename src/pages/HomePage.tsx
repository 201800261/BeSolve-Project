import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonFab,
  IonFabButton,
  IonIcon,
  IonThumbnail,
  IonImg
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth';
import {firestore} from '../firebase';
import { Entry, toEntry } from '../model';
import {add as addIcon} from 'ionicons/icons';
import {formatDate} from './FormatDate';


const HomePage: React.FC = () => {
  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  useEffect(() => {
    const entriesRef = firestore.collection('users').doc(userId).collection('entries');
    console.log('You are in the homepage', entriesRef);
      return entriesRef.orderBy("date","desc").limit(7).onSnapshot(({docs}) => setEntries(docs.map(toEntry)));
  }, [userId]);    
    
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Communities</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
            { entries.map((entry) =>
              <IonItem button key={entry.id} 
              routerLink={`/my/entries/view/${entry.id}`}>
                <IonThumbnail slot="end">
                  <IonImg src={entry.pictureUrl} />
                </IonThumbnail>
                {formatDate(entry.date)}<br/>
                {entry.title}
              </IonItem>
            )}
        </IonList>
           
          <IonFab vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/my/entries/add">
            <IonIcon icon={addIcon}/>
          </IonFabButton>
          </IonFab>

      </IonContent>
    </IonPage>
  );
};

export default HomePage;
