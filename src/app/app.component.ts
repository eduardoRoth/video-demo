import { Component, signal } from '@angular/core';
import { MediaPlayer } from '@eduardoroth/media-player';
import {
  IonApp,
  IonButton,
  IonCard,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IonApp,
    IonRouterOutlet,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonCardHeader,
  ],
  template: `
    <ion-app>
      <ion-header>
        <ion-toolbar>
          <ion-title>Video</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-card>
          <ion-button (click)="create()">Create</ion-button>
          <ion-button (click)="play()">Play</ion-button>
          <ion-button (click)="pause()">Pause</ion-button>
          <ion-button (click)="goto()">Go To</ion-button>
          <ion-button (click)="isPlaying()">Is Playing?</ion-button>
          <ion-button (click)="getCurrentTime()"
            >Current time {{ currentTime() }}</ion-button
          >
          <ion-button (click)="remove()">Remove</ion-button>
          <ion-button (click)="removeAll()">Remove All</ion-button>
          <div class="video-container">
            <video id="player"></video>
          </div>
        </ion-card>
      </ion-content>
      <!--      <ion-router-outlet></ion-router-outlet>-->
    </ion-app>
  `,
})
export class AppComponent {
  currentTime = signal<number>(0);
  constructor() {}

  async create() {
    await MediaPlayer.create({
      playerId: 'player',
      //url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      url: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
      //url: 'https://stream-fastly.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8',
      //url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_30MB.mp4',
      web: {},
      ios: {
        enableExternalPlayback: true,
        enablePiP: true,
        enableBackgroundPlay: true,
        openInFullscreen: false,
      },
      extra: {
        title: 'Brain and ADHD',
        subtitle: 'MedStudy Videos',
        poster:
          'https://pbs.twimg.com/profile_images/892763956137218051/mk0IqRT1_400x400.jpg',
        rate: 1,
        showControls: true,
      },
    });
    await MediaPlayer.addListener(
      'MediaPlayer:TimeUpdate',
      ({ playerId, currentTime }) => {
        this.currentTime.set(currentTime);
        console.log(playerId, currentTime);
      },
    );
  }
  async remove() {
    const result = await MediaPlayer.remove({
      playerId: 'player',
    });
    await MediaPlayer.removeAllListeners('player');
    console.log(result);
  }
  async removeAll() {
    const result = await MediaPlayer.removeAll();
    console.log(result);
  }
  async getCurrentTime() {
    const result = await MediaPlayer.getCurrentTime({
      playerId: 'player',
    });
    if (result.result === true && result.value) {
      this.currentTime.set(result.value);
    }
  }
  async play() {
    const result = await MediaPlayer.play({
      playerId: 'player',
    });
    console.log(result);
  }
  async pause() {
    const result = await MediaPlayer.pause({
      playerId: 'player',
    });
    console.log(result);
  }
  async goto() {
    const result = await MediaPlayer.setCurrentTime({
      playerId: 'player',
      time: 300,
    });
    console.log(result);
  }
  async isPlaying() {
    const result = await MediaPlayer.isPlaying({
      playerId: 'player',
    });
    console.log(result);
  }
}
