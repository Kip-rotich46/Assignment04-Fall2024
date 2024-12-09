import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private apiUrl = 'http://localhost:3000/api/books';  // Ensure this URL is correct

  constructor(private http: HttpClient) {}

  addBook(bookData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, bookData);  // Correct endpoint
  }

  checkBook(serialNo: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/check?serialNo=${serialNo}`);
  }

  updateBook(bookData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, bookData);
  }

  deleteBook(serialNo: number) {
    return this.http.delete<any>(`http://localhost:3000/api/books/remove?serialNo=${serialNo}`);
  }
}
