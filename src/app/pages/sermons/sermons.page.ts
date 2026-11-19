import { Component } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { play } from 'ionicons/icons';
import { CHURCH_INFO, SAMPLE_SERMONS } from '../../data/church-data';

@Component({
  selector: 'app-sermons',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    IonButton,
    IonIcon,
  ],
  template: `
    <ion-header [translucent]="false">
      <ion-toolbar>
        <img
          slot="start"
          class="brand-logo"
          src="assets/church-logo.webp"
          alt="Church logo"
        />
        <ion-title>Sermons</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="page-pad">
        <p class="muted">Recent messages from {{ churchName }}.</p>

        @if (notice) {
          <ion-card color="light">
            <ion-card-content>{{ notice }}</ion-card-content>
          </ion-card>
        }

        <ion-list>
          @for (sermon of sermons; track sermon.id) {
            <ion-item>
              <ion-label>
                <h2>{{ sermon.title }}</h2>
                <p>{{ sermon.speaker }} · {{ sermon.date }}</p>
                <p>{{ sermon.scripture }} · {{ sermon.description }}</p>
                @if (!sermon.mediaUrl) {
                  <p class="coming-soon">Video coming soon</p>
                }
              </ion-label>
              <ion-note slot="end">{{ sermon.duration }}</ion-note>
              <ion-button
                slot="end"
                fill="clear"
                (click)="playSermon(sermon.id, sermon.title, sermon.mediaUrl)"
                [attr.aria-label]="'Play ' + sermon.title"
              >
                <ion-icon name="play" slot="icon-only"></ion-icon>
              </ion-button>
            </ion-item>
          }
        </ion-list>
      </div>
    </ion-content>
  `,
  styles: [
    `
      .coming-soon {
        color: var(--ion-color-secondary);
        font-weight: 600;
      }
    `,
  ],
})
export class SermonsPage {
  sermons = SAMPLE_SERMONS;
  churchName = CHURCH_INFO.name;
  notice = '';

  constructor() {
    addIcons({ play });
  }

  playSermon(id: number, title: string, mediaUrl: string): void {
    if (!mediaUrl) {
      // No video linked yet — mediaUrl is '' until the church provides a link.
      this.notice = `"${title}" — the video isn't available yet. Please check back soon.`;
      return;
    }
    this.notice = '';
    window.open(mediaUrl, '_blank');
  }
}
