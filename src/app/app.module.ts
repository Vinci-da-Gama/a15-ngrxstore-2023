import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { ShareModule } from '../modules/share/share.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../modules/share/shareComponents/header/header.component';
import { NoFoundComponent } from '../modules/share/shareComponents/no-found/no-found.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, NoFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ShareModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
