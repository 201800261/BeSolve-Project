import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabs,
  IonTabButton,
  IonTabBar,
} from '@ionic/react';
import HomePage from './pages/HomePage';
import EntryPage from './pages/EntryPage';
import { Redirect, Route} from 'react-router-dom';
import React from 'react';
import { home as homeIcon, settings as settingsIcon } from "ionicons/icons";
import SettingsPage from './pages/SettingsPage';
import AddEntryPage from './pages/AddEntryPage';
import AddTopicPage from './pages/AddTopicPage';
import AddCommentPage from './pages/AddCommentPage';
import { useAuth } from './auth';


const AppTabs: React.FC = () => {
  const {loggedIn} = useAuth();
  if (!loggedIn){
    return <Redirect to="/login" />
  }
  return (
       <IonTabs> 
        <IonRouterOutlet>

          <Route exact path="/my/entries">
            <HomePage/>
          </Route>

          <Route exact path="/my/settingspage">
            <SettingsPage/>
          </Route>

          <Route exact path="/my/entries/view/:id">
            <EntryPage/>
          </Route>

          <Route exact path="/my/entries/add">
            <AddEntryPage/>
          </Route>

          <Route exact path="/my/entries/topic">
            <AddTopicPage/>
          </Route>

          <Route exact path="/my/entries/comment">
            <AddCommentPage/>
          </Route>

          <Redirect exact path="/" to="/my/entries"/>
          </IonRouterOutlet>
            <IonTabBar slot = "bottom">
              <IonTabButton tab="home" href="/my/entries">
                <IonIcon icon={homeIcon} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>

              <IonTabButton tab="settings" href="/my/SettingsPage">
                <IonIcon icon={settingsIcon} />
                <IonLabel>Settings</IonLabel>
              </IonTabButton>
              </IonTabBar>
          </IonTabs>
  );
};

export default AppTabs;
