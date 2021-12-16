import { APP_INITIALIZER, Provider } from '@angular/core';
import { AuthenticationService } from './authentication.service';

const checkAuthentication = (authentication: AuthenticationService): () => Promise<void> => {
  return () => new Promise<void>(resolve => {
    authentication.checkExistingAuthentication();
    resolve();
  });
};

export const authInitialization: Provider = {
  provide: APP_INITIALIZER,
  multi: true,
  deps: [AuthenticationService],
  useFactory: (checkAuthentication)
};
