// login-status.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginStatusService {
  private isLoggedIn = false;  // Aquí almacenamos el estado de login

  setLoginStatus(status: boolean) {
    this.isLoggedIn = status;
  }

  getLoginStatus(): boolean {
    return this.isLoggedIn;
  }
}
