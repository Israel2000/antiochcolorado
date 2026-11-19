import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, location, playCircle, time } from 'ionicons/icons';
import { CHURCH_INFO, OFFICE_HOURS } from '../../data/church-data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
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
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="page-pad">
        <!-- Hero -->
        <ion-card class="hero">
          <ion-card-header>
            <ion-card-title>{{ church.tagline }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p class="vision-title">{{ church.visionTitle }}</p>
            <p lang="am" class="vision-quote">{{ church.vision }}</p>
            <ion-button
              expand="block"
              color="primary"
              [href]="church.website"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Involved Today!
            </ion-button>
            <ion-button expand="block" color="primary" (click)="goTo('give')">
              <ion-icon name="heart" slot="start"></ion-icon>
              Give
            </ion-button>
            <ion-button expand="block" fill="outline" (click)="goTo('sermons')">
              <ion-icon name="play-circle" slot="start"></ion-icon>
              Watch Sermons
            </ion-button>
          </ion-card-content>
        </ion-card>

        <!-- Service times -->
        <h2 class="section-title">Hours</h2>
        <ion-list>
          @for (hour of officeHours; track hour.day) {
            <ion-item>
              <ion-icon name="time" slot="start" color="primary"></ion-icon>
              <ion-label>
                <h2>{{ hour.day }}</h2>
                <p>{{ hour.hours }}</p>
              </ion-label>
            </ion-item>
          }
        </ion-list>

        <!-- Location -->
        <h2 class="section-title">Visit Us</h2>
        <ion-card>
          <ion-card-content>
            <p>
              <ion-icon name="location" color="primary"></ion-icon>
              {{ church.address }}
            </p>
            @for (phone of church.phones; track phone.href) {
              <p><a class="contact-link" [href]="phone.href">{{ phone.label }}</a></p>
            }
            <ion-button fill="outline" (click)="openDirections()">
              Get Directions
            </ion-button>
          </ion-card-content>
        </ion-card>

        <!-- Quick actions -->
        <h2 class="section-title">Plan Your Visit</h2>
        <ion-button expand="block" fill="outline" (click)="goTo('more')">
          About, Ministries &amp; Contact
        </ion-button>
        <ion-button expand="block" fill="outline" (click)="goTo('events')">
          See This Week’s Events
        </ion-button>
      </div>
    </ion-content>
  `,
  styles: [
    `
      .hero {
        background: linear-gradient(
          135deg,
          var(--church-hero-start),
          var(--church-hero-end)
        );
        color: var(--church-hero-text);
        min-height: 220px;
      }
      .hero ion-card-title {
        color: var(--church-hero-text);
        font-size: 1.4rem;
      }
      .hero p {
        color: var(--church-hero-text);
      }
      .hero .vision-title {
        font-weight: 700;
        margin-bottom: 4px;
      }
      .hero .vision-quote {
        white-space: pre-line;
        line-height: 1.65;
      }
      .hero ion-button[color='primary'] {
        --background: var(--ion-color-secondary);
        --border-color: var(--ion-color-secondary);
        --color: var(--ion-color-secondary-contrast);
      }
      .hero ion-button[fill='outline'] {
        --border-color: var(--church-hero-text);
        --color: var(--church-hero-text);
      }
    `,
  ],
})
export class HomePage {
  church = CHURCH_INFO;
  officeHours = OFFICE_HOURS;
  private router = inject(Router);

  constructor() {
    addIcons({ heart, playCircle, time, location });
  }

  /** Tab buttons navigate explicitly so they work even if a link is missed. */
  goTo(tab: 'give' | 'sermons' | 'events' | 'more'): void {
    void this.router.navigate(['/tabs', tab]);
  }

  openDirections(): void {
    const query = encodeURIComponent(this.church.address);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      '_blank',
    );
  }
}
