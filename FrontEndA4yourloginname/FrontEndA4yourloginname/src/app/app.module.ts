import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';  // Import the routing module
import { RouterModule } from '@angular/router';  // Import RouterModule for routing

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';  // Correct imports for HttpClient
import { BackendService } from './services/backend-service.service';  // Import the service

import { HomePage } from './home/home.page';

@NgModule({
  declarations: [AppComponent, HomePage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule,  // Add this if you have a routing module
    RouterModule.forRoot([]),  // If you don't have a separate AppRoutingModule
  ],
  providers: [
    BackendService,
    provideHttpClient(withInterceptorsFromDi())  // Add provideHttpClient to providers array
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
