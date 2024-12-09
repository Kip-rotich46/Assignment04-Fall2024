import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../services/backend-service.service';

interface Book {
  serialNo: number;
  bookTitle: string;
  authorName: string;
  _id: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  bookForm!: FormGroup;
  responseMessage: string = '';
  responseDetails: any = null;  // Declare the responseDetails property
  isSuccess: boolean = true; // To toggle message color (success/error)

  constructor(private fb: FormBuilder, private backendService: BackendService) {}

  ngOnInit() {
    this.bookForm = this.fb.group({
      serialNo: [
        null,
        [Validators.required, Validators.pattern('^[1-9][0-9]*$')] // Non-negative, non-zero number
      ],
      bookTitle: ['', Validators.required],
      authorName: ['', Validators.required],
    });
  }

  // Add Book function
  addBook() {
    if (this.bookForm.valid) {
      this.backendService.addBook(this.bookForm.value).subscribe(
        (response) => {
          this.responseMessage = 'Book added to the library';
          this.responseDetails = response.book; // Assuming the response contains the added book
          this.isSuccess = true; // Success message
        },
        (error) => {
          this.responseMessage = 'Error adding book';
          this.isSuccess = false; // Error message
          console.error('Error adding book:', error);
        }
      );
    }
  }

  // Check Book function
  checkBook() {
    const serialNo = this.bookForm.get('serialNo')?.value;
    if (serialNo) {
      this.backendService.checkBook(serialNo).subscribe(
        (response) => {
          this.responseMessage = 'Book available to rent';
          this.responseDetails = response.book; // Assuming response contains the book details
          this.isSuccess = true; // Success message
        },
        (error) => {
          this.responseMessage = 'Book not found';
          this.isSuccess = false; // Error message
          console.error('Error checking book:', error);
        }
      );
    }
  }

  // Update Book function
  updateBook() {
    if (this.bookForm.valid) {
      this.backendService.updateBook(this.bookForm.value).subscribe(
        (response) => {
          this.responseMessage = 'Book updated successfully';
          this.responseDetails = response.book; // Assuming response contains the updated book
          this.isSuccess = true; // Success message
        },
        (error) => {
          this.responseMessage = 'Error updating book';
          this.isSuccess = false; // Error message
          console.error('Error updating book:', error);
        }
      );
    }
  }

  // Remove Book function
  removeBook() {
    const serialNo = this.bookForm.get('serialNo')?.value;
    this.backendService.deleteBook(serialNo).subscribe(
      (res) => {
        this.responseMessage = 'Book removed from the library';
        this.responseDetails = res.book;  // Assuming 'book' is returned from the backend
        this.isSuccess = true;
      },
      (err) => {
        this.responseMessage = 'Error removing book';
        this.isSuccess = false;
        console.error('Error removing book', err);
      }
    );
  }
}
