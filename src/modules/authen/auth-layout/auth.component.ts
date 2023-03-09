import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { AppStoreStateInterface } from '../../../contracts/interfaces/app-store-state-interface';
import { AlertPlaceholderDirective } from 'src/directive/alert-placeholder/alert-placeholder.directive';
import { AlertModalComponent } from '../../share/shareComponents/alert-modal/alert-modal.component';
import { AuthStateInterface } from '../../../contracts/interfaces/auth-state-interface';
import {
  ClearError,
  LoginStart,
  SignupStart,
} from '../../../store/authStore/auth.actions';
import { AuthRespInterface } from '../../../contracts/interfaces/auth-resp-interface';

@Component({
  selector: 'a15ngrxstore-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('authForm') slAuthForm!: NgForm;
  @ViewChild(AlertPlaceholderDirective) alertHost!: AlertPlaceholderDirective;
  private storeSub!: Subscription;
  private closeModalSub!: Subscription;
  isLoading: boolean = false;
  isLoginMode: boolean = false;
  error: string | null = null;

  /**
   * componentFactoryResolver
   * store
   */
  constructor(
    private compoFactResov: ComponentFactoryResolver,
    private store: Store<AppStoreStateInterface>
  ) {}

  ngOnInit(): void {
    this.atBeginningClearError();
    this.storeSub = this.store
      .select('AuthReducer')
      .subscribe((authState: AuthStateInterface) => {
        const { loading, authError } = authState;

        this.isLoading = loading;
        this.error = authError;
        if (this.error) {
          this.showErrorMsg(this.error);
        }
      });
  }

  onSwitchMode = () => {
    this.isLoading = !this.isLoading;
  };

  clearErrorToCloseModal = () => {
    this.error = null;
  };

  private showErrorMsg(msg: string) {
    const alertCompoFactory =
      this.compoFactResov.resolveComponentFactory(AlertModalComponent);
    const hostViewContainerRef = this.alertHost.vcRef;
    hostViewContainerRef.clear();

    const compoRef = hostViewContainerRef.createComponent(alertCompoFactory);

    /* pass message then close modal */
    compoRef.instance.msg = msg;
    this.closeModalSub = compoRef.instance.closeModal.subscribe(() => {
      this.closeModalSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  private atBeginningClearError() {
    this.store.dispatch(ClearError());
  }

  onSubmit() {
    const { value } = this.slAuthForm;
    this.isLoading = true;
    if (this.slAuthForm.invalid) {
      this.isLoading = false;
      return;
    }

    let authObj: Observable<AuthRespInterface>;
    if (this.isLoading) {
      // authObs = this.authServ.login(value);
      // this.isLoading = false;
      this.store.dispatch(LoginStart({ ...value }));
    } else {
      // authObs = this.authServ.signup(value);
      // this.isLoading = false;
      this.store.dispatch(SignupStart({ ...value }));
    }
  }

  ngOnDestroy(): void {
    this.closeModalSub && this.closeModalSub.unsubscribe();
    this.storeSub && this.storeSub.unsubscribe();
  }
}
