import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonButton,
  IonButtons,
  IonBackButton,
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { firestore } from "../firebase";
import { Entry, toEntry } from "../model";
import { useAuth } from "../auth";
import { trash, add as addIcon } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import {formatDate} from './FormatDate';

interface RouteParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const match = useRouteMatch<RouteParams>();
  const { id } = match.params;
  const [entry, setEntry] = useState<Entry>();
  const [comment, setComment] = useState('');
  // const [testing, settopic] = useState('');
  const { userId } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const entryRef = firestore.collection("users").doc(userId).collection("entries").doc(id);
    entryRef.get().then((doc) => {setEntry(toEntry(doc));
    });
  }, [userId, id]);

  function handleDelete() {
    const entryRef = firestore.collection("users").doc(userId).collection("entries").doc(id);
      entryRef.delete();
    history.goBack();
  }

  function handleComment() {
    firestore.collection("users").doc(userId).collection("entries").doc(id).collection("topics").doc(id).collection("comments")
      .add({
          comment: comment,
      })
    history.goBack();
  }

  // function handleTopic() {
  //   firestore.collection("departments").doc(id).collection("deptinfo")
  //   .add({
  //       topic: testing
  //   })
  //   console.log;
  // // history.goBack();
  // }

  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle> {formatDate(entry?.date)} </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>{entry?.title}</h2> 
        <img src={entry?.pictureUrl} alt={entry?.title} />
        <p>{entry?.description}</p>
        <IonCard>
          <IonCardHeader>Topic: {entry?.topic} </IonCardHeader>
            <IonCardContent>
              Details: {entry?.discussion} <br></br>
              Comments: {entry?.comment}
              <IonItem>
                <IonInput type="text" placeholder="Leave a comment"
                  value={comment} onIonChange={(event) => setComment(event.detail.value)}/>
                <IonButton onClick={handleComment}> Add Comment </IonButton>
              </IonItem>

              {/* <IonItem>
                <IonInput type="text" placeholder="testing"
                  value={testing} onIonChange={(event) => settopic(event.detail.value)}/>
                <IonButton onClick={handleTopic}> Add Comment </IonButton>
              </IonItem> */}

            </IonCardContent>
        </IonCard> 
      </IonContent>
        <IonFab vertical="bottom" horizontal="start">
          <IonFabButton routerLink="/my/entries">
            <IonIcon icon={trash} onClick={handleDelete}/>
          </IonFabButton>
        </IonFab>
        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/my/entries/topic">
            <IonIcon icon={addIcon}/>
          </IonFabButton>
          </IonFab>
    </IonPage>
  );
};

export default EntryPage;
