import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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
import { CHURCH_INFO, SERVICE_TIMES } from '../../data/church-data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
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
    RouterLink,
  ],
  template: `
    <ion-header>
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
            <p>{{ church.welcome }}</p>
            <p class="countdown" *ngIf="countdown">
              Next service in <strong>{{ countdown }}</strong>
            </p>
            <ion-button expand="block" color="primary" routerLink="/tabs/give">
              <ion-icon name="heart" slot="start"></ion-icon>
              Give
            </ion-button>
            <ion-button expand="block" fill="outline" routerLink="/tabs/sermons">
              <ion-icon name="play-circle" slot="start"></ion-icon>
              Watch Sermons
            </ion-button>
          </ion-card-content>
        </ion-card>

        <!-- Service times -->
        <h2 class="section-title">Service Times</h2>
        <ion-list>
          @for (service of serviceTimes; track service.day) {
            <ion-item>
              <ion-icon name="time" slot="start" color="primary"></ion-icon>
              <ion-label>
                <h2>{{ service.day }} — {{ service.time }}</h2>
                <p>{{ service.note }}</p>
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
            <p class="muted">{{ church.phone }} · {{ church.email }}</p>
            <p class="muted">
              TODO: replace the address above, then add a map link / directions
              button here.
            </p>
          </ion-card-content>
        </ion-card>

        <!-- Quick actions -->
        <h2 class="section-title">Plan Your Visit</h2>
        <ion-button expand="block" fill="outline" routerLink="/tabs/events">
          See This Week’s Events
        </ion-button>
        <ion-button expand="block" fill="outline" routerLink="/tabs/more">
          About, Ministries &amp; Prayer
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
      }
      .hero ion-card-title {
        color: var(--church-hero-text);
        font-size: 1.4rem;
      }
      .hero p {
        color: var(--church-hero-text);
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
      .countdown {
        font-size: 1.05rem;
        margin-top: 12px;
      }
    `,
  ],
})
export class HomePage implements OnInit, OnDestroy {
  church = CHURCH_INFO;
  serviceTimes = SERVICE_TIMES;
  countdown = '';
  private timer: ReturnType<typeof setInterval> | undefined;

  constructor() {
    addIcons({ heart, playCircle, time, location });
  }

  ngOnInit(): void {
    this.updateCountdown();
    this.timer = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  /** Next service: Sunday 10:00 AM or Wednesday 7:00 PM, whichever is next. */
  private updateCountdown(): void {
    const now = new Date();
    const candidates: Date[] = [];
    // Sunday = 0, Wednesday = 3
    for (const [day, hour] of [
      [0, 10],
      [3, 19],
    ] as const) {
      const d = new Date(now);
      d.setDate(now.getDate() + ((day - now.getDay() + 7) % 7));
      d.setHours(hour, 0, 0, 0);
      if (d.getTime() <= now.getTime()) d.setDate(d.getDate() + 7);
      candidates.push(d);
    }
    const next = candidates.sort((a, b) => a.getTime() - b.getTime())[0];
    const diff = next.getTime() - now.getTime();
    const days = Math.floor(diff / 86_400_000);
    const hours = Math.floor((diff % 86_400_000) / 3_600_000);
    const mins = Math.floor((diff % 3_600_000) / 60_000);
    const secs = Math.floor((diff % 60_000) / 1000);
    const dayLabel = next.toLocaleDateString(undefined, { weekday: 'long' });
    this.countdown = `${dayLabel} ${next.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    })} — ${days}d ${hours}h ${mins}m ${secs}s`;
  }
}
