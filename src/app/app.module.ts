import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpButtonComponent } from './components/http-button/http-button.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Params001DetailComponent } from './components/forms/params001-detail/params001-detail.component';
import { Params001Component } from './components/forms/params001/params001.component';
import { Params002Component } from './components/forms/params002/params002.component';
import { Params003Component } from './Modules/Institucionales/Components/params003/params003.component';
import { Params004Component } from './Modules/Institucionales/Components/params004/params004.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { Http401Component } from 'src/assets/httpRequests/http401/http401.component';
import { LoginWebComponent } from './components/forms/login-web/login-web.component';
import { LoginComponent } from './components/forms/login/login.component';
import { NavbarComponent } from './components/share/navbar/navbar.component';
import { SpinnerComponent } from './components/share/Spinner/Spinner.component';
import { TableComponent } from './components/share/table/table.component';
import { AuthGuard } from './Guards/AuthGuard';

import { MY_DATE_FORMATS } from './Modules/Institucionales/Components/Params005/Components/Search-bonnus-for-date/date-formats';
import { SearchBonnusForDateComponent } from './Modules/Institucionales/Components/Params005/Components/Search-bonnus-for-date/Search-bonnus-for-date.component';
import { TableDownloadComponent } from './Modules/Institucionales/Components/Params005/Components/table-download/table-download.component';
import { TableUpdateBonusesComponent } from './Modules/Institucionales/Components/Params005/Components/Table-update-bonuses/Table-update-bonuses.component';
import { UploadFileComponent } from './Modules/Institucionales/Components/Params005/Components/upload-file/upload-file.component';
import { Params005Component } from './Modules/Institucionales/Components/Params005/Params005.component';
import { TableBondsComponent } from './Modules/Institucionales/Components/Params006/Components/Table-bonds/Table-bonds.component';
import { UploadBondListComponent } from './Modules/Institucionales/Components/Params006/Components/Upload-bond-list/Upload-bond-list.component';
import { Params006Component } from './Modules/Institucionales/Components/Params006/Params006.component';
import { DialogComponent } from './Modules/Institucionales/Share/Dialog/Dialog.component';
import { InputFileComponent } from './Modules/Institucionales/Share/input-file/input-file.component';
import { TemplateEmailComponent } from './Modules/Institucionales/Share/Template-email/Template-email.component';
import { OperationsParam001Component } from './Modules/Operaciones/Components/OperationsParam001/OperationsParam001.component';
import { LoginModalComponent } from './Modules/Operaciones/Components/Share/LoginModal/LoginModal.component';
import { AuthService } from './services/auth.service';
import { ErrorInterceptorService } from './services/ErrorInterceptor.service';
import { JwtInterceptorService } from './services/JwtInterceptor.service';


registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    HttpButtonComponent,
    Params001Component,
    Params001DetailComponent,
    Params002Component,
    Params003Component,
    Params004Component,
    Params005Component,
    Params006Component,
    OperationsParam001Component,
    LoginComponent,
    LoginWebComponent,
    TableComponent,
    NavbarComponent,
    InputFileComponent,
    Http401Component,
    SpinnerComponent,
    DialogComponent,
    LoginModalComponent,
    TemplateEmailComponent,
    SearchBonnusForDateComponent,
    TableDownloadComponent,
    UploadFileComponent,
    TableUpdateBonusesComponent,
    UploadBondListComponent,
    TableBondsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSelectModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: LOCALE_ID, useValue: 'es-ES' },
    DatePipe,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
