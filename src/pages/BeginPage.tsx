import {
    IonPage,
    IonContent,
    IonButton,
    IonLoading,
    IonCard,
    IonCardHeader,
    IonCardContent
  
  } from '@ionic/react';
  import React, { useState } from 'react';
  import logo from '../Images/logo_transparent.png';
  
  const BeginPage: React.FC = () => {
    const [status, setStatus] = useState({ loading: false, error: false });
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <IonCard>
            <IonCardHeader>
              <img src={logo} alt="logo_transparent.png" height='180' width='180' />
            </IonCardHeader>
            
            <IonCardContent>
              <IonButton expand="block" routerLink="/login"> Login </IonButton>
  
              <IonButton expand="block" routerLink="/register">
                Sign Up </IonButton>
            </IonCardContent>
          </IonCard>
          <IonLoading isOpen={status.loading}></IonLoading>
        </IonContent>
      </IonPage>
    );
  };
  
  export default BeginPage;
  