import { Component } from '@angular/core';
import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { SAMPLE_EVENTS } from '../../data/church-data';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonBadge,
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
        <ion-title>Events</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="page-pad">
        <p class="muted">
          What’s happening at Antioch Church of Colorado. RSVPs are saved on
          this device for now.
        </p>

        @for (event of events; track event.id) {
          <ion-card>
            <ion-card-header>
              <ion-card-subtitle>
                {{ event.date }} · {{ event.time }}
                <ion-badge color="secondary">{{ event.category }}</ion-badge>
              </ion-card-subtitle>
              <ion-card-title>{{ event.title }}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>{{ event.description }}</p>
              <p class="muted">{{ event.location }}</p>
              <ion-button
                [color]="isRsvped(event.id) ? 'success' : 'primary'"
                (click)="toggleRsvp(event.id)"
              >
                {{ isRsvped(event.id) ? '✓ RSVP’d — tap to cancel' : 'RSVP' }}
              </ion-button>
            </ion-card-content>
          </ion-card>
        }
      </div>
    </ion-content>
  `,
})
export class EventsPage {
  events = SAMPLE_EVENTS;
  private rsvps = new Set<number>(EventsPage.loadRsvps());

  private static loadRsvps(): number[] {
    try {
      return JSON.parse(localStorage.getItem('antioch-rsvps') ?? '[]');
    } catch {
      return [];
    }
  }

  isRsvped(id: number): boolean {
    return this.rsvps.has(id);
  }

  toggleRsvp(id: number): void {
    if (this.rsvps.has(id)) this.rsvps.delete(id);
    else this.rsvps.add(id);
    try {
      localStorage.setItem(
        'antioch-rsvps',
        JSON.stringify([...this.rsvps]),
      );
    } catch {
      // RSVP state still shows on screen even if storage is unavailable.
    }
  }
}
