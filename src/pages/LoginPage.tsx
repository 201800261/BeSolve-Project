import {
  IonPage,
  IonContent,
  IonCardTitle,
  IonButton,
  IonItem,
  IonList,
  IonLabel,
  IonInput,
  IonText,
  IonLoading,
  IonCard,
  IonCardHeader,
  IonCardContent

} from '@ionic/react';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import { auth } from '../firebase';
import logo from '../Images/logo_transparent.png';

const LoginPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleLogin = async () => {

    try {
      setStatus({ loading: true, error: false });
      const credential = await auth.signInWithEmailAndPassword(email, password)
      console.log('credendtial', credential);

    } catch (error) {
      setStatus({ loading: false, error: true })
      console.log('error: ', error);
    }


  }

  if (loggedIn) {
    return <Redirect to="/my/entries" />;
  }
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <img src={logo} alt="logo_transparent.png" height='180' width='180' />
            <IonCardTitle>Login</IonCardTitle>
          </IonCardHeader>
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput placeholder="johndoe@gmail.com" type="email" value={email} onIonChange={(event) => setEmail(event.detail.value)} />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Password</IonLabel>
              <IonInput placeholder="**********" type="password" value={password} onIonChange={(event) => setPassword(event.detail.value)} />
            </IonItem>
          </IonList>

          {status.error &&
            <IonText color="danger">Invalid Credentials</IonText>
          }
          <IonCardContent>
            <IonButton expand="block" onClick={handleLogin}> Login </IonButton>

            <IonButton expand="block" fill="clear" routerLink="/register">
              Don't have an account? Create </IonButton>
          </IonCardContent>
        </IonCard>
        <IonLoading isOpen={status.loading}></IonLoading>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
