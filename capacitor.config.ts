import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.5630becfafaa416f9635733d4f4a29e7',
  appName: 'melody-muse-global',
  webDir: 'dist',
  server: {
    url: 'https://5630becf-afaa-416f-9635-733d4f4a29e7.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;