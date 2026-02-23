import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.uimastery.pro',
  appName: 'UI Mastery Pro',
  webDir: 'web/dist',
  server: {
    androidScheme: 'http',
    cleartext: true,
  },
};

export default config;
