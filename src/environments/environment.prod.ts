import {apiUri} from '../../apiUri';

export const environment = {
    production: true,
    auth: {
        domain: 'dev-sxtr6zi3.us.auth0.com',
        clientId: 'S1mR9nnMwSO3YZSPaxIzM76fezprbKaX',
        redirectUri: window.location.origin,
        errorPath: '/error'
    },
    httpInterceptor: {
        allowedList: [`${apiUri}/*`],
    },
};
