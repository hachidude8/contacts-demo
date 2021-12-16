import { NgModule } from '@angular/core';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { getToken } from './token-storage';


const jwtConfig: JwtModuleOptions = {
  config: {
    tokenGetter: () => (getToken()?.token || ''),
    allowedDomains: ['localhost:8080'],
    disallowedRoutes: ['//localhost:8080/auth/login']
  },
};

@NgModule({
  imports: [JwtModule.forRoot(jwtConfig)],
  exports: [JwtModule]
})
export class JwtConfigurationModule {
}
