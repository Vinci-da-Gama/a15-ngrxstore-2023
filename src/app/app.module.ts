import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';

import { environment } from '../environments/environment'; // Angular CLI environment
import { AppRoutingModule } from './app-routing.module';
import { ShareModule } from '../modules/share/share.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from '../modules/share/shareComponents/header/header.component';
import { NoFoundComponent } from '../modules/share/shareComponents/no-found/no-found.component';
import { appReducers } from './../store/app-store.reducer';
import { AuthEffects } from '../store/authStore/auth.effects';
import { CoreModule } from './../modules/core/core.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, NoFoundComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ShareModule,
    StoreModule.forRoot({
      ...appReducers,
    } as any),
    EffectsModule.forRoot([AuthEffects]),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      features: {
        pause: false, // start/pause recording of dispatched actions
        lock: true, // lock/unlock dispatching actions and side effects
        persist: true, // persist states on page reloading
      },
    }),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
