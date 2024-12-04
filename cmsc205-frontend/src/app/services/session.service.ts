import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  firstname = signal('firstname')
  lastname = signal('lastname')

  constructor() { }

  getFullname() {
    return `${this.firstname()} ${this.lastname()}`
  }

  getFirstname(){
    return this.firstname()
  }

  getLastname() {
    return this.lastname()
  }

  updateFirstName(firstname: string){
    this.firstname.set(firstname)
  }

  updateLastname(lastname: string){
    this.lastname.set(lastname)
  }
}
