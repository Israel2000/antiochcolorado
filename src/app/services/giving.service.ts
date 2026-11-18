import { Injectable } from '@angular/core';

/**
 * Giving — PLACEHOLDER / SIMULATED ONLY.
 *
 * Apple & Google donation rules (read before going live):
 * - Donations to a registered 501(c)(3) nonprofit are EXEMPT from the
 *   30% in-app-purchase fee. Do NOT use Apple/Google IAP for giving.
 * - Use an approved processor (Stripe, Tithe.ly, Pushpay, Planning Center).
 * - The money must go directly to the church; the app must not take a cut.
 * - The church must own the Stripe / Tithe.ly account (EIN + bank account).
 * - Never put a Stripe SECRET key in this app. Secret keys live on the
 *   server only. The app only ever sees a publishable key / Checkout URL.
 *
 * TODO — to go live, replace `submitDonation()` with ONE of:
 *   A) Stripe Checkout: POST {fund, amount, frequency, donor} to YOUR
 *      backend -> backend creates a Stripe Checkout Session with the
 *      SECRET key -> app opens the returned session URL in the browser.
 *   B) Tithe.ly / Pushpay: open their hosted giving page / SDK with the
 *      church's account, pre-filled with fund + amount.
 *   C) Stripe Payment Links: one link per fund, opened in the browser.
 *
 * Until then this service simulates a successful gift locally so the
 * UI flow (fund -> amount -> confirm) can be tested end-to-end.
 */

export type GivingFrequency = 'one-time' | 'monthly';

export interface DonationRequest {
  fundId: string;
  fundLabel: string;
  amount: number;
  frequency: GivingFrequency;
  donorName: string;
  donorEmail: string;
}

export interface DonationResult {
  success: boolean;
  reference: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class GivingService {
  async submitDonation(donation: DonationRequest): Promise<DonationResult> {
    // Simulated latency + local confirmation. Replace with a real call.
    await new Promise((resolve) => setTimeout(resolve, 900));
    const reference = `GIVE-${new Date().getFullYear()}-${Math.floor(
      100000 + Math.random() * 900000,
    )}`;
    console.info('[GivingService] SIMULATED donation (no payment taken):', {
      ...donation,
      reference,
    });
    return {
      success: true,
      reference,
      message: `Thank you, ${donation.donorName || 'friend'}! Your ${donation.frequency} gift of $${donation.amount.toFixed(2)} to ${donation.fundLabel} was recorded (demo mode — no payment was taken).`,
    };
  }
}
