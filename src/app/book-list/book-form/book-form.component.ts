import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm :FormGroup;
  fileIsUploading = false;
  fileUrl :string;
  fileUploaded = false;
  constructor(private formBuilder : FormBuilder, private bookService :BooksService, private router : Router) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm(){
    this.bookForm = this.formBuilder.group({
      titre : ['',[Validators.required]],
      author : ['',[Validators.required]],
      synopsis : ''
   
    });
  }

  onSaveBook(){
    const titre = this.bookForm.get('titre').value;
    const author = this.bookForm.get('author').value;
    const synopsis = this.bookForm.get('synopsis').value;
    const newBook = new Book( titre , author );
    newBook.synopsis = synopsis;
    if(this.fileUrl && this.fileUrl !== ''){
      newBook.photo = this.fileUrl;
    }
    this.bookService.createNewBook(newBook);
    this.router.navigate(['/books']);
  }

  onUploadFile(file : File) {
    this.fileIsUploading = true;
    this.bookService.uploadFile(file).then(
      (url :string) => {
          this.fileUrl = url;
          this.fileIsUploading = false;
          this.fileUploaded = true;
      }
    );
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }
}
