import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonLabel,
  IonInput,
  IonButton,
  IonButtons,
  IonBackButton,
  IonItem,
  IonTextarea

} from "@ionic/react";
import React, { useState } from "react";
import { firestore } from "../firebase";
import { useAuth } from "../auth";
import { useHistory } from "react-router-dom";



const AddTopicPage: React.FC = () => {
  const { userId } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const history = useHistory();

  function handlesave() {
    firestore.collection("users").doc(userId).collection("entries")
      .add({
        description: description,
        title: title,
        date: date
      })
    history.goBack();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Create a new topic!</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Title</IonLabel>
          <IonInput type="email"
            value={title} onIonChange={(event) => setTitle(event.detail.value)} />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Description</IonLabel>
          <IonTextarea
            value={description} onIonChange={(event) => setDescription(event.detail.value)} />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Date</IonLabel>
          <IonInput type="date"
            value={date} onIonChange={(event) => setDate(event.detail.value)}/>
        </IonItem>

        <IonButton expand="block" onClick={handlesave} >Submit New Topic</IonButton>
      </IonContent>
    </IonPage>
  );
};



export default AddTopicPage;