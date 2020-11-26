import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonAvatar,
  IonListHeader,
  IonCard,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import React from 'react';
import {auth} from '../firebase';
import avatar from '../Images/avatar.jpg';

const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonGrid>
        <IonRow>
          <IonCol> 
            <IonAvatar class="ion-margin-start">
              <img src={avatar} alt="avatar.jpg"/>
            </IonAvatar>     
          </IonCol>
        </IonRow>
        <IonRow>
          <IonListHeader>John Doe</IonListHeader>
          </IonRow>
          </IonGrid>
        </IonCard>
        <IonButton color="medium" expand="block" fill="clear">
          Edit</IonButton>
        <IonButton color="medium" expand="block"
        onClick={()=> auth.signOut()}>
        Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
