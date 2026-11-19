import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonBadge,
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
import {
  checkmark,
  copy,
  heart,
  location,
  notifications,
  playCircle,
  radio,
  shareSocial,
  time,
} from 'ionicons/icons';
import {
  CHURCH_INFO,
  DAILY_VERSES,
  LIVE_STREAM,
  OFFICE_HOURS,
} from '../../data/church-data';

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
    IonBadge,
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
        <!-- Live stream -->
        <ion-card class="live-card">
          <ion-card-content>
            @if (isLiveStream()) {
              <ion-badge color="danger">● LIVE</ion-badge>
              <h3 class="live-title">{{ liveStream.title }}</h3>
              <p class="muted">Watching live now.</p>
              <ion-button
                expand="block"
                color="danger"
                [href]="liveStream.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ion-icon name="radio" slot="start"></ion-icon>
                Watch Live
              </ion-button>
            } @else {
              <p class="live-label">Next live stream</p>
              <h3 class="live-title">{{ liveStream.title }}</h3>
              <p class="muted">{{ liveStream.nextLiveLabel }}</p>
              @if (!reminderSet) {
                <ion-button expand="block" fill="outline" (click)="remindMe()">
                  <ion-icon name="notifications" slot="start"></ion-icon>
                  Remind me
                </ion-button>
              } @else {
                <p class="reminder-set">
                  <ion-icon name="checkmark"></ion-icon>
                  We&rsquo;ll remind you
                </p>
              }
            }
          </ion-card-content>
        </ion-card>

        <!-- Daily verse -->
        <ion-card class="verse-card">
          <ion-card-header>
            <ion-card-title>Daily Verse</ion-card-title>
            <p class="muted verse-date">{{ todayLabel }}</p>
          </ion-card-header>
          <ion-card-content>
            <p class="verse-text">&ldquo;{{ verse.text }}&rdquo;</p>
            <p class="verse-ref">{{ verse.reference }}</p>
            <ion-button fill="clear" (click)="shareVerse()">
              <ion-icon name="share-social" slot="start"></ion-icon>
              Share
            </ion-button>
            <ion-button fill="clear" (click)="copyVerse()">
              <ion-icon name="copy" slot="start"></ion-icon>
              {{ copied ? 'Copied' : 'Copy' }}
            </ion-button>
          </ion-card-content>
        </ion-card>

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
      .live-card {
        border-left: 4px solid var(--ion-color-danger);
      }
      .live-label {
        font-size: 0.8rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin: 0 0 4px;
      }
      .live-title {
        font-size: 1.15rem;
        font-weight: 700;
        margin: 4px 0;
      }
      .reminder-set {
        font-weight: 700;
        margin: 8px 0 0;
      }
      .verse-card {
        background: var(--ion-color-light);
      }
      .verse-date {
        margin: 2px 0 0;
      }
      .verse-text {
        font-size: 1.1rem;
        font-style: italic;
        line-height: 1.6;
      }
      .verse-ref {
        font-weight: 700;
        text-align: right;
      }
    `,
  ],
})
export class HomePage {
  church = CHURCH_INFO;
  officeHours = OFFICE_HOURS;
  liveStream = LIVE_STREAM;
  copied = false;
  reminderSet = false;

  /** Same verse all day for everyone: picked by day-of-year. */
  readonly verse = HomePage.pickDailyVerse(new Date());
  readonly todayLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  private static pickDailyVerse(date: Date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const dayOfYear = Math.floor(
      (date.getTime() - start.getTime()) / 86_400_000,
    );
    return DAILY_VERSES[dayOfYear % DAILY_VERSES.length];
  }

  private router = inject(Router);

  constructor() {
    addIcons({
      heart,
      playCircle,
      time,
      location,
      radio,
      notifications,
      shareSocial,
      copy,
      checkmark,
    });
    try {
      this.reminderSet =
        localStorage.getItem('antioch-live-reminder') === '1';
    } catch {
      this.reminderSet = false;
    }
  }

  isLiveStream(): boolean {
    return this.liveStream.isLive && this.liveStream.url !== '';
  }

  remindMe(): void {
    this.reminderSet = true;
    try {
      localStorage.setItem('antioch-live-reminder', '1');
    } catch {
      // Reminder state still shows on screen even if storage is unavailable.
    }
  }

  private verseShareText(): string {
    return `"${this.verse.text}" — ${this.verse.reference} | ${this.church.name}`;
  }

  async shareVerse(): Promise<void> {
    const text = this.verseShareText();
    try {
      const nav = navigator as Navigator & {
        share?: (data: { text: string }) => Promise<void>;
      };
      if (typeof nav.share === 'function') {
        await nav.share({ text });
        return;
      }
    } catch {
      // Fall through to copy.
    }
    await this.copyVerse();
  }

  async copyVerse(): Promise<void> {
    const text = this.verseShareText();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 2000);
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
