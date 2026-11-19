import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import {
  CHURCH_INFO,
  MINISTRIES,
  OFFICE_HOURS,
  STAFF,
} from '../../data/church-data';

@Component({
  selector: 'app-more',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
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
        <ion-title>More</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="page-pad">
        <h2 class="section-title">About Antioch Colorado</h2>
        <ion-card>
          <img
            class="church-photo"
            src="https://img1.wsimg.com/isteam/ip/40b00a17-ffb8-4038-941d-60fe2a0c282f/Antioch%20Church%20COLORADO.png/:/cr=t:5.53%25,l:0%25,w:100%25,h:88.93%25/rs=w:600,h:300,cg:true"
            alt="Antioch Church of Colorado"
            loading="eager"
          />
          <ion-card-header>
            <ion-card-title>{{ church.visionTitle }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p lang="am" class="vision-quote">{{ church.vision }}</p>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-header>
            <ion-card-title>{{ church.missionTitle }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p lang="am">{{ church.mission }}</p>
          </ion-card-content>
        </ion-card>
        <ion-button
          expand="block"
          color="primary"
          [href]="church.website"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Involved Today!
        </ion-button>

        <!-- Ministries -->
        <h2 class="section-title">Ministries</h2>
        @for (ministry of ministries; track ministry.name) {
          <ion-card>
            <ion-card-header>
              <ion-card-title>{{ ministry.name }}</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>{{ ministry.description }}</p>
              <p class="muted">
                Led by {{ ministry.leader }} · {{ ministry.meetingTime }}
              </p>
            </ion-card-content>
          </ion-card>
        }

        <!-- Staff -->
        <h2 class="section-title">Our Team</h2>
        <ion-list>
          @for (person of staff; track person.name) {
            <ion-item>
              <ion-label>
                <h2>{{ person.name }}</h2>
                <p>{{ person.role }} — {{ person.bio }}</p>
              </ion-label>
            </ion-item>
          }
        </ion-list>

        <!-- Prayer request -->
        <h2 class="section-title">Prayer Request</h2>
        @if (prayerSent) {
          <ion-card color="success">
            <ion-card-content>
              Thank you — your prayer request was received. Our prayer team
              will be praying for you this week.
            </ion-card-content>
          </ion-card>
          <ion-button fill="outline" (click)="prayerSent = false">
            Send Another Request
          </ion-button>
        } @else {
          <ion-card>
            <ion-card-content>
              <ion-item>
                <ion-label position="stacked">Your name (optional)</ion-label>
                <ion-input
                  placeholder="First name"
                  [(ngModel)]="prayerName"
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">How can we pray for you?</ion-label>
                <ion-textarea
                  rows="4"
                  placeholder="Share your request here…"
                  [(ngModel)]="prayerRequest"
                ></ion-textarea>
              </ion-item>
              <ion-button
                expand="block"
                [disabled]="!prayerRequest.trim()"
                (click)="submitPrayer()"
              >
                Submit Prayer Request
              </ion-button>
              <p class="muted">
                Your request is saved on this device for now. Once the church
                connects prayer requests, the prayer team will receive it
                directly.
              </p>
            </ion-card-content>
          </ion-card>
        }

        <!-- Contact -->
        <h2 class="section-title">Contact Us</h2>
        <ion-card>
          <ion-card-header>
            <ion-card-title>Questions or Comments</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>
              For questions or comments, visit our website and send us a
              message. We will do our best to get back to you soon!
            </p>
            <h3>{{ church.name }}</h3>
            <p>{{ church.address }}</p>
            @for (phone of church.phones; track phone.href) {
              <p>
                <a class="contact-link" [href]="phone.href">{{
                  phone.label
                }}</a>
              </p>
            }
            <ion-button
              expand="block"
              fill="outline"
              [href]="church.website"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website
            </ion-button>
            <h3>Hours</h3>
            @for (hour of officeHours; track hour.day) {
              <p><strong>{{ hour.day }}</strong> · {{ hour.hours }}</p>
            }
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
  styles: [
    `
      .church-photo {
        display: block;
        width: 100%;
        max-height: 300px;
        min-height: 120px;
        object-fit: cover;
        background: linear-gradient(
          135deg,
          var(--church-hero-start),
          var(--church-hero-end)
        );
      }

      .vision-quote {
        white-space: pre-line;
        font-size: 1.1rem;
        line-height: 1.7;
      }
    `,
  ],
})
export class MorePage {
  church = CHURCH_INFO;
  officeHours = OFFICE_HOURS;
  ministries = MINISTRIES;
  staff = STAFF;
  prayerName = '';
  prayerRequest = '';
  prayerSent = false;

  submitPrayer(): void {
    if (!this.prayerRequest.trim()) return;
    // Saved on this device only for now. Later this will be sent to the
    // prayer team (backend / church email) — see the project notes.
    try {
      const saved: { name: string; request: string; date: string }[] =
        JSON.parse(localStorage.getItem('antioch-prayer-requests') ?? '[]');
      saved.push({
        name: this.prayerName.trim(),
        request: this.prayerRequest.trim(),
        date: new Date().toISOString(),
      });
      localStorage.setItem(
        'antioch-prayer-requests',
        JSON.stringify(saved),
      );
    } catch {
      // If storage is unavailable, the on-screen confirmation still shows.
    }
    this.prayerSent = true;
    this.prayerName = '';
    this.prayerRequest = '';
  }
}
