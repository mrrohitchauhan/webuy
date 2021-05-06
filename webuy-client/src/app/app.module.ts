import { UsersService } from './services/users.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from 'src/environments/environment.prod';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
   
  ],
  providers: [ UsersService ],
  bootstrap: [AppComponent],
})
export class AppModule {}
