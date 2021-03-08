import { Component } from '@angular/core';
import firebase from 'firebase';
//import 'firebase/database';
//import * as firebase from 'firebase';
import 'firebase/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor (){
    var firebaseConfig = {
      apiKey: "AIzaSyChFx1RGmlAS5xKqKdCAjsWQ0aa2dXhIUk",
      authDomain: "mes-livres-demo.firebaseapp.com",
      projectId: "mes-livres-demo",
      storageBucket: "mes-livres-demo.appspot.com",
      messagingSenderId: "465600599302",
      appId: "1:465600599302:web:6c23aba1a21dfa04a23a87",
      measurementId: "G-5E5FQ63ES6"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

}
