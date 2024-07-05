import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://cloak.mindsoftdev.com:8443',
        realm: 'external',
        clientId: 'ruby-client-front-test'
      },
      initOptions: {
        onLoad: 'login-required'
      }
    });
}
