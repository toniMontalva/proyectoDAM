import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class AuthService {

    error: string = "";
    lang: string = "es";

    userRol: string = "";
    userKey: string = "";
    userNick: string = "";

    constructor(
        public afAuth: AngularFireAuth,
        private _db: AngularFireDatabase,
        private router: Router, 
        private toastController: ToastController, 
        private loadingController: LoadingController, 
        private translate: TranslateService
        ) {            
        }


    // BBDD references

    getUserReference(): firebase.database.Reference {
        return this._db.database.ref("Users");
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
        this.lang = this.translate.currentLang;
        if(this.lang == "en") {
            const loading = await this.loadingController.create({
                message: 'Please wait...',
                duration: 1200 // 1.2s
            });
            await loading.present();
            const { role, data } = await loading.onDidDismiss();
        } else if(this.lang == "es") {
            const loading = await this.loadingController.create({
                message: 'Por favor espera...',
                duration: 1200 // 1.2s
            });
            await loading.present();
            const { role, data } = await loading.onDidDismiss();
            console.log('Loading dismissed!');
        }
    }

    async getUserNick() {
        let ref = this._db.database.ref(`Users/`);
        await ref.once("value", snapshot => {
            snapshot.forEach(value => {                
                let child = value.val();
                if(child.id == this.userKey) {
                    this.userNick = child.nickname;
                    return true;
                }                
            });
        });
    }

    // Login with email and password
    async login(email: string, password: string) {
        this.error = "";
        this.lang = this.translate.currentLang;
        this.presentLoading();
        await this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(data => {
            if (data.user) {
                // user logged, we welcome him 
                this.userKey = this.afAuth.auth.currentUser.uid;
                this.router.navigate(['/tabs/tab1']);
                if(this.lang == "es") {
                    this.presentToast('¡Bienvenido ' + email + '!', 'bottom', 2000);
                } else if(this.lang == "en") {
                    this.presentToast('Welcome ' + email + '!', 'bottom', 2000);
                }                
            }
        })
        .catch(error => {
            // an error happened
            this.error = error;
        })        
    }

    // Log out the current user
    async logout() {
        this.presentLoading();
        await this.afAuth
            .auth
            .signOut()
            .then(() => {
                this.userNick = "";
                this.userKey = "";
                this.router.navigate(['/auth']);
            });
    }

    /**
     * generates a random nickname
     */
    getRandomNick() : string {
        let user = "user";
        let randomNumber = Math.round(Math.random()*2000000);
        user += randomNumber;
        console.log(user);

        return user;
    }

    // Sign up a new user
    async signup(email: string, password: string) : Promise<string> {
        this.error = "";
        let id = "";
        let username = this.getRandomNick();
        this.presentLoading();
        await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(data => {
                if(data.user) {
                    // User has been created successfully
                    id = data.user.uid;
                    let user = {
                        id : id,
                        email: email,
                        nickname: username
                    }
                    this.addUserInfo(user);
                    this.router.navigate(['/auth']);
                    this.presentToast("User created, log in", 'bottom', 3000);
                }
            })
            .catch(error => {
                // An error happened
                this.error = error;
            });
        return id;
    }

    /**
     * Registers info of a customer in the BBDD Firebase
     * @param user 
     */
    addUserInfo(user: any) {
        //let ref = this.getClientesRefencia();
        let ref = this._db.database.ref("Users/");
        ref.push(user);
    }

    /**
     * Obtain the rol of the logged user
     */
    async getRolOfLoggedUser() {
        let ref = this.getUserReference();

        await ref.once("value", snapshot => {
            snapshot.forEach(child => {
                let value = child.val();
                if (value.id == this.userKey) {
                    this.userRol = value.rol;
                }
            })
        })
    }

    changeUserPassword(newPassword: string) {
        return this.afAuth.auth.currentUser.updatePassword(newPassword)
    }

    changeUserEmail(email: string) {
        return this.afAuth.auth.currentUser.updateEmail(email)
    }

    async changeUserNick(nick: string) {
        let ref = this._db.database.ref("Users/");
        let data = {
            nickname: nick
        }
        await ref.once("value", snapshot => {
            snapshot.forEach(value => {
                let child = value.val();
                if(child.id == this.userKey) {
                    let ref2 = this._db.database.ref(`Users/${value.key}/${this.userKey}`);
                    ref2.update(data);
                    return true;
                }
            })
        })
    }
}