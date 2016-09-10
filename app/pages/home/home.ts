import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, ModalController, ViewController, Platform } from 'ionic-angular';
import { RateService } from '../../providers/rate-service/rate-service';
import 'rxjs';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [RateService]
})
export class HomePage {

  giphyModal: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, 
              public rateService: RateService, public platform: Platform) {         
  }

  showGiphy () {    
    let giphyModal = this.modalCtrl.create(GiphyModal);
    giphyModal.onDidDismiss(() => this.rateService.appRate.promptForRating(false))
    giphyModal.present(GiphyModal);
  }
}


@Component({
  template: `
    <ion-header>
      <ion-navbar>
        <button (tap)="viewCtrl.dismiss()" clear>Close</button>
        <ion-title>
          Puppies
        </ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content padding>
      <img [src]="giphy">
    </ion-content>
  `
})
export class GiphyModal {

  giphy: string;
  
  constructor(public http: Http, public viewCtrl: ViewController) {}

  ionViewDidEnter () {    
    let url = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=corgi+puppy&rating=g";   
    this.http.get(url)
      .map(res => res.json())
      .subscribe(res => this.giphy = res.data.fixed_width_downsampled_url)
  }
}