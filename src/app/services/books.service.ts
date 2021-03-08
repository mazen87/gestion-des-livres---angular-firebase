import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/book.model';
import firebase from 'firebase';
//import 'firebase/database';
//import 'firebase/storage';



@Injectable({
  providedIn: 'root'
})
export class BooksService {
  books : Book [] = [];
  bookSubjet = new Subject<Book[]>();

 

  constructor() {
    this.getBooks();
   }

  emitBooks () {
    this.bookSubjet.next(this.books);
  }

  saveBooks (){
    firebase.database().ref('/books').set(this.books);
  }

  getBooks () {
    firebase.database().ref('/books').on('value', (data : firebase.database.DataSnapshot ) =>{
      this.books = data.val() ? data.val() : [];
      this.emitBooks(); 
    });
  }

  getSingleBook (id : Number) {
    return new Promise((resolve,reject) =>{
      firebase.database().ref('/books/'+ id).once('value').then(
        (data : firebase.database.DataSnapshot)=>{ 
          resolve(data.val());
        },
        (error)=>{
          reject(error);
        }
      );
    }
    );
  }


  createNewBook (book :Book) {
    this.books.push(book);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book :Book) {
    if(book.photo){
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        ()=>{
          console.log('Photo supprimé ! ');
        },
        (error) => {
          console.log('photo non supprimé ! ' + error );
        }
      );
    }
    const indexBookToRemove = this.books.findIndex(
      (bookEl) => {
        if(bookEl == book){
          return true ;
        }
      }
    )
    this.books.splice(indexBookToRemove,1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file : File) {
    return new Promise(
      (resolve,reject) =>{
        const almostUniqueName = Date.now().toString();
        const upload = firebase.storage().ref().child('images/' + almostUniqueName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED, 
          () => {
            console.log('chargement....');
          },
          (error) => {
            console.log('erreur de chargement ! '+ error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
          );
      }
    );
  }

}
