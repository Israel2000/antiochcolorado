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
    <ion-header>
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
        <!-- About / Beliefs -->
        <h2 class="section-title">About {{ church.name }}</h2>
        <ion-card>
          <ion-card-content>
            <p>{{ church.welcome }}</p>
            <p class="muted">
              {{ church.address }} · {{ church.phone }} · {{ church.email }}
            </p>
          </ion-card-content>
        </ion-card>

        <h2 class="section-title">What We Believe</h2>
        <ion-list>
          @for (belief of church.beliefs; track belief) {
            <ion-item>
              <ion-label>{{ belief }}</ion-label>
            </ion-item>
          }
        </ion-list>

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
                Saved on this device only for now — connect it to the backend
                / church email later so the prayer team actually receives it.
              </p>
            </ion-card-content>
          </ion-card>
        }

        <!-- Contact -->
        <h2 class="section-title">Contact</h2>
        <ion-card>
          <ion-card-content>
            <p>{{ church.address }}</p>
            <p>{{ church.phone }}</p>
            <p>{{ church.email }}</p>
            <p class="muted">{{ church.website }}</p>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
})
export class MorePage {
  church = CHURCH_INFO;
  ministries = MINISTRIES;
  staff = STAFF;
  prayerName = '';
  prayerRequest = '';
  prayerSent = false;

  submitPrayer(): void {
    if (!this.prayerRequest.trim()) return;
    // TODO: POST to backend / email the prayer team. Local state only for now.
    console.info('[Prayer] request (local only):', {
      name: this.prayerName,
      request: this.prayerRequest,
    });
    this.prayerSent = true;
    this.prayerName = '';
    this.prayerRequest = '';
  }
}
