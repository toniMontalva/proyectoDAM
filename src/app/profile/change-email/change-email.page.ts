import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.page.html',
  styleUrls: ['./change-email.page.scss'],
})
export class ChangeEmailPage implements OnInit {

  // variable para almacenar el input y validar su valor
  emailFormat: boolean = false;

  errorDismatch: boolean = false;
  errorSame: boolean = false;
  errorEmptyField: boolean = false;
  errorNotActualEmail: boolean = false;

  data: any;
  form: FormGroup;
  isSubmitted = false;

  error: string;

  selectedLanguage: string = "";

  constructor(
    private translate: TranslateService,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.selectedLanguage = this.translate.currentLang;
    this.data = {
      email: '',
      newEmail: '',
      confirmNewEmail: '',
    }
  }

  ngOnInit() {
  }

  async presentToast(message, position, duration) {
    const toast = await this.toastCtrl.create({
      message: message,
      position: position,
      duration: duration
    });
    toast.present();
  }

  async presentAlert(title: string, content: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: content,
      buttons: ['OK']
    })

    await alert.present()
  }

  async onSubmit(myForm: NgForm) {
    // obtengo el email en firebase del usuario logueado
    let email = "";
    if(this.afAuth.auth.currentUser != null){
      email = await this.afAuth.auth.currentUser.email;
    }

    let emailWrited = myForm.value['email'];
    let newEmailWrited = myForm.value['newEmail'];
    let confirmNewEmail = myForm.value['confirmNewEmail'];

    // si hay algún campo vacio
    if(emailWrited == '' || newEmailWrited == '' || confirmNewEmail == '') {
      this.errorEmptyField = true;
    }
    
    // si el email del usuario en firebase no es el mismo que el introducido
    if(email != emailWrited) {
      this.errorNotActualEmail = true;
    }

    // si el campo nuevo email no coincide con el de confirmación
    if(newEmailWrited != confirmNewEmail){
      this.errorDismatch = true;
    }

    // pruebo emailValid metodo
    // let isValid : boolean = false;
    // this.emailValid(emailWrited).then(value => {
    //   isValid = value;
    // });

    // console.log("variable isValid" + isValid);


    // si no hay errores, proceder
    if(!this.errorDismatch && !this.errorEmptyField && !this.errorNotActualEmail) {
      this.isSubmitted = true;

      this.authService.changeUserEmail(newEmailWrited)
      .then(() => {
        if(this.selectedLanguage == "es") {
          this.presentToast('Email modificado, inicia sesión con las nuevas credenciales', 'bottom', 1000); 
        } else if(this.selectedLanguage == "en") {
          this.presentToast('Email modified, login with new credentials', 'bottom', 1000); 
        }
      })
      .catch(err => {
        console.log(` failed ${err}`);
        this.error = err.message;
      })
      .finally(() => {
        this.authService.logout();
      })
    }
  }

  noSubmit(e){
    e.preventDefault();
  }

}
