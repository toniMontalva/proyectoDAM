import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { auth } from 'firebase/app'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  data: any;
  form: FormGroup;
  isSubmitted = false;

  errorEmptyFields: boolean = false;
  errorDontMatch: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.data = {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
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
    let email = this.afAuth.auth.currentUser.email;
    let password = myForm.value['password'];
    let newPassword = myForm.value['newPassword'];
    let confirmNewPassword = myForm.value['confirmNewPassword'];

    if (password == '' || newPassword == '' || confirmNewPassword == '') {
      this.errorEmptyFields = true;
      return this.presentAlert('¡Error!', 'Debes introducir los campos obligatorios');
    }

    if (newPassword != confirmNewPassword) {
      this.errorDontMatch = true;
      return this.presentAlert('¡Error!', 'Las contraseñas no coinciden');
    }

    try {
      await this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(email, password));
    } catch (error) {
      this.presentAlert('¡Error!', 'La contraseña no es correcta');
    }

    await this.authService.changeUserPassword(newPassword);
    this.presentToast('Contraseña cambiada, inicia sesión de nuevo', 'bottom', 1000);
    this.authService.logout();

    // return this.afAuth.auth.currentUser.linkWithCredential()
  }

  noSubmit(e) {
    e.preventDefault();
  }

}
