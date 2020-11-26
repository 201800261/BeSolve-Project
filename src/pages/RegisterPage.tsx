import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonList,
  IonLabel,
  IonInput,
  IonText,
  IonLoading
} from '@ionic/react';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../auth';
import { auth } from '../firebase';


const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleRegister = async () => {

    try {
      setStatus({ loading: true, error: false });
      const credential = await auth.createUserWithEmailAndPassword(email, password)
      console.log('credendtial', credential);

    } catch (error) {
      setStatus({ loading: false, error: true })
      console.log('error: ', error);
    }
  }

  const { loggedIn } = useAuth();
  if (loggedIn) {
    return <Redirect to="/my/entries" />;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput type="email" value={email} onIonChange={(event) => setEmail(event.detail.value)} />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput type="password" value={password} onIonChange={(event) => setPassword(event.detail.value)} />
          </IonItem>
        </IonList>

        {status.error &&
          <IonText color="danger">Registration Failed</IonText>
        }

        <IonButton expand="block" onClick={handleRegister}> Create Account </IonButton>
        <IonButton expand="block" fill="clear" routerLink="/login">
          Already have an account? Login
        </IonButton>
        <IonLoading isOpen={status.loading}></IonLoading>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
