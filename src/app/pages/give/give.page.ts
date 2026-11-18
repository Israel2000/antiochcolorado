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
  IonNote,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import {
  GIVING_AMOUNTS,
  GIVING_FUNDS,
} from '../../data/church-data';
import {
  DonationResult,
  GivingFrequency,
  GivingService,
} from '../../services/giving.service';

@Component({
  selector: 'app-give',
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
    IonItem,
    IonLabel,
    IonInput,
    IonNote,
    IonButton,
    IonSegment,
    IonSegmentButton,
    IonSelect,
    IonSelectOption,
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
        <ion-title>Give</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="page-pad">
        <p class="muted">
          Thank you for giving generously. Giving is secure and goes directly
          to the church.
        </p>

        @if (confirmation) {
          <ion-card color="success">
            <ion-card-header>
              <ion-card-title>Gift received — thank you!</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>{{ confirmation.message }}</p>
              <p>Reference: {{ confirmation.reference }}</p>
              <p class="muted">
                Demo mode: no payment was taken. Connect Stripe Checkout or
                Tithe.ly (see GivingService) to take real gifts.
              </p>
              <ion-button fill="outline" color="light" (click)="reset()">
                Give Again
              </ion-button>
            </ion-card-content>
          </ion-card>
        } @else {
          <!-- Fund -->
          <h2 class="section-title">Fund</h2>
          <ion-item>
            <ion-label>Choose a fund</ion-label>
            <ion-select [(ngModel)]="fundId" interface="action-sheet">
              @for (fund of funds; track fund.id) {
                <ion-select-option [value]="fund.id">
                  {{ fund.label }} — {{ fund.description }}
                </ion-select-option>
              }
            </ion-select>
          </ion-item>

          <!-- Frequency -->
          <h2 class="section-title">Frequency</h2>
          <ion-segment [(ngModel)]="frequency">
            <ion-segment-button value="one-time">
              <ion-label>One-time</ion-label>
            </ion-segment-button>
            <ion-segment-button value="monthly">
              <ion-label>Monthly</ion-label>
            </ion-segment-button>
          </ion-segment>

          <!-- Amount -->
          <h2 class="section-title">Amount (USD)</h2>
          <div class="chips">
            @for (amount of amounts; track amount) {
              <ion-button
                [fill]="selectedAmount === amount ? 'solid' : 'outline'"
                (click)="pickAmount(amount)"
              >
                $ {{ amount }}
              </ion-button>
            }
          </div>
          <ion-item>
            <ion-label position="stacked">Custom amount</ion-label>
            <ion-input
              type="number"
              min="1"
              placeholder="e.g. 75"
              [(ngModel)]="customAmount"
              (ionInput)="onCustomAmount()"
            ></ion-input>
          </ion-item>
          @if (amountError) {
            <ion-note color="danger">{{ amountError }}</ion-note>
          }

          <!-- Donor -->
          <h2 class="section-title">Your Details</h2>
          <ion-item>
            <ion-label position="stacked">Name</ion-label>
            <ion-input
              placeholder="Your name"
              [(ngModel)]="donorName"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Email (for your receipt)</ion-label>
            <ion-input
              type="email"
              placeholder="you@example.com"
              [(ngModel)]="donorEmail"
            ></ion-input>
          </ion-item>

          <ion-button
            expand="block"
            color="primary"
            class="give-btn"
            [disabled]="submitting || !isValid()"
            (click)="give()"
          >
            {{ submitting ? 'Processing…' : 'Give $' + effectiveAmount() }}
          </ion-button>

          <p class="muted">
            Secure giving via Stripe / Tithe.ly once connected. The church
            never sees your card number, and no card details are stored in
            this app.
          </p>
        }
      </div>
    </ion-content>
  `,
  styles: [
    `
      .chips {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 8px;
      }
      .give-btn {
        margin-top: 20px;
      }
    `,
  ],
})
export class GivePage {
  funds = GIVING_FUNDS;
  amounts = GIVING_AMOUNTS;
  fundId = 'tithe';
  frequency: GivingFrequency = 'one-time';
  selectedAmount = 25;
  customAmount: number | null = null;
  donorName = '';
  donorEmail = '';
  submitting = false;
  amountError = '';
  confirmation: DonationResult | null = null;

  constructor(private giving: GivingService) {}

  pickAmount(amount: number): void {
    this.selectedAmount = amount;
    this.customAmount = null;
    this.amountError = '';
  }

  onCustomAmount(): void {
    if (this.customAmount) {
      this.selectedAmount = 0;
      this.amountError = '';
    }
  }

  effectiveAmount(): number {
    return this.customAmount ? Number(this.customAmount) : this.selectedAmount;
  }

  isValid(): boolean {
    const amount = this.effectiveAmount();
    if (!amount || amount < 1) {
      this.amountError = 'Please choose or enter an amount of $1 or more.';
      return false;
    }
    this.amountError = '';
    return true;
  }

  async give(): Promise<void> {
    if (!this.isValid()) return;
    const fund = this.funds.find((f) => f.id === this.fundId) ?? this.funds[0];
    this.submitting = true;
    try {
      this.confirmation = await this.giving.submitDonation({
        fundId: fund.id,
        fundLabel: fund.label,
        amount: this.effectiveAmount(),
        frequency: this.frequency,
        donorName: this.donorName.trim(),
        donorEmail: this.donorEmail.trim(),
      });
    } finally {
      this.submitting = false;
    }
  }

  reset(): void {
    this.confirmation = null;
    this.selectedAmount = 25;
    this.customAmount = null;
    this.donorName = '';
    this.donorEmail = '';
  }
}
