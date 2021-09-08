import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { HttpClientModule } from '@angular/common/http';

import { APP_ROUTING } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HomeComponent } from './paginas/home/home.component';
import { ContactosComponent } from './paginas/contactos/contactos.component';
import { VideoComponent } from './paginas/video/video.component';
import { CitaspendientesComponent } from './paginas/citaspendientes/citaspendientes.component';
import { CitaComponent } from './paginas/cita/cita.component';
import { LoginComponent } from './paginas/login/login.component';
import { DetallecitaComponent } from './paginas/detallecita/detallecita.component';
import { environment } from 'src/environments/environment';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

//Agora
import { NgxAgoraModule } from 'ngx-agora';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Angular material
import { MatDialogModule } from '@angular/material/dialog';
import { DatepastComponent } from './modals/datepast/datepast.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RecipeComponent } from './modals/recipe/recipe.component';
import { ErrorComponent } from './alerts/error/error.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { CiesearchComponent } from './components/ciesearch/ciesearch.component';
import { DiagnosticsComponent } from './modals/diagnostics/diagnostics.component';
import { RecetaComponent } from './paginas/receta/receta.component';

import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ErrorconectionComponent } from './modals/errorconection/errorconection.component';
import { ErrologinComponent } from './modals/errologin/errologin.component';
import {NgxPaginationModule} from 'ngx-pagination';

registerLocaleData(localeEs, 'es');



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    ContactosComponent,
    VideoComponent,
    CitaspendientesComponent,
    CitaComponent,
    LoginComponent,
    DetallecitaComponent,
    DatepastComponent,
    RecipeComponent,
    ErrorComponent,
    CiesearchComponent,
    DiagnosticsComponent,
    RecetaComponent,
    ErrorconectionComponent,
    ErrologinComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    NgxAgoraModule.forRoot({ AppID: environment.agora.appId }),
    BrowserAnimationsModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSidenavModule,
    NgxPaginationModule,
    MatSortModule
  ],
  entryComponents: [
    DatepastComponent,
    RecipeComponent,
    ErrorComponent,
    DiagnosticsComponent,
    ErrorconectionComponent,
    ErrologinComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' },],
  bootstrap: [AppComponent]
})
export class AppModule { }
