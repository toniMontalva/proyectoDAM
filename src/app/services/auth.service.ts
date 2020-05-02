import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

    error: string = "";

    constructor(public afAuth: AngularFireAuth, private router: Router, private toastController: ToastController, private loadingController: LoadingController) {

    }

    // shows a message to the user in top, middle or bottom position
    async presentToast(message, position, duration) {
        const toast = await this.toastController.create({
            message: message,
            position: position,
            duration: duration
        });
        toast.present();
    }

    // shows a message while the app is running the backend
    async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'Please wait...',
            duration: 1200 // 1.2s
        });
        await loading.present();

        const { role, data } = await loading.onDidDismiss();
        console.log('Loading dismissed!');
    }

    // Login with email and password
    async login(email: string, password: string) {
        this.error = "";
        this.presentLoading();
        await this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(data => {
            if (data.user) {
                // user logged, we welcome him 
                this.router.navigate(['/tabs/tab1']);
                this.presentToast('Welcome ' + email + '!', 'bottom', 2000);
            }
        })
        .catch(error => {
            // an error happened
            this.error = error;
        })        
    }

    // Log out the current user
    logout() {
        this.presentLoading();
        this.afAuth
            .auth
            .signOut()
            .then(() => {
                this.router.navigate(['/auth']);
            });
    }
}