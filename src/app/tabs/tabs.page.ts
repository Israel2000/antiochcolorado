import { Component } from '@angular/core';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  calendar,
  ellipsisHorizontal,
  heart,
  home,
  playCircle,
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
  ],
  template: `
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon name="home"></ion-icon>
          <ion-label>Home</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="sermons" href="/tabs/sermons">
          <ion-icon name="play-circle"></ion-icon>
          <ion-label>Sermons</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="events" href="/tabs/events">
          <ion-icon name="calendar"></ion-icon>
          <ion-label>Events</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="give" href="/tabs/give">
          <ion-icon name="heart"></ion-icon>
          <ion-label>Give</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="more" href="/tabs/more">
          <ion-icon name="ellipsis-horizontal"></ion-icon>
          <ion-label>More</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
})
export class TabsPage {
  constructor() {
    addIcons({ home, playCircle, calendar, heart, ellipsisHorizontal });
  }
}
