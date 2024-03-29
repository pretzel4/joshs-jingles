import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { Error404Component } from './components/error404/error404.component';
import { GlobalValuesService } from './services/global-values.service';
import { UserDataService } from './services/user-data.service';
import { FirebaseService } from './services/firebase.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { RulesComponent } from './components/rules/rules.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComService } from './services/header-com.service'
import { HttpClientModule } from '@angular/common/http';
import { RequestComponent } from './components/request/request.component';
import { EmailVerifyComponent } from './components/email-verify/email-verify.component';
import { MenuComponent } from './components/menu/menu.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LoadingSpinnerComponent } from './layouts/loading-spinner/loading-spinner.component';
import { InfoComponent } from './components/info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AppLayoutComponent,
    Error404Component,
    RulesComponent,
    OrdersComponent,
    RegisterComponent,
    LoginComponent,
    RequestComponent,
    EmailVerifyComponent,
    MenuComponent,
    LoadingSpinnerComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features 
    PdfViewerModule
  ],
  providers: [
    HeaderComService,
    GlobalValuesService,
    UserDataService,
    FirebaseService,
    UserService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
