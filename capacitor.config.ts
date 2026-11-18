import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.webinnovativetech.churchapp',
  appName: 'Church App',
  // Angular 19 application builder outputs to dist/church-app/browser
  webDir: 'dist/church-app/browser',
  backgroundColor: '#fffaf3',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
