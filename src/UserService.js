import Keycloak from 'keycloak-js'

const _kc = new Keycloak({
    url: "https://openid.finoid.eu/auth",    
    // url: "https://id.newpay.bg/auth",  
    realm: "billing-module",
    clientId: "master",
    publicClient :true
  });

const initKeycloak = (onAuthenticatedCallback) => {
 
  _kc.init({
    // onLoad: 'login-required',
    onLoad: 'check-sso',

    // silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256',
    publicClient: 'true',
    checkLoginIframe: false
  })
    .then((authenticated) => {
      if (authenticated) {
        onAuthenticatedCallback();
 
      } else {
        console.log("user is not authenticated..!");
        doLogin();

      }
      
      })
      .catch(console.error);
};
const doLogin = _kc.login;

const doLogout = _kc.logout;
const isTokenExpired = _kc.isTokenExpired;

const getToken = () => _kc.token;
const newRefreshToken =()=> _kc.refreshToken;

console.log(_kc);

const isLoggedIn = () => !!_kc.token;
 

const updateToken = (successCallback) =>
  _kc.updateToken(30)
    .then(successCallback)
    .catch(doLogin);

const getUsername = () => _kc.tokenParsed?.family_name;
const getRole = () => _kc.tokenParsed?.realm_access;

// const {userRole} = _kc.realm_access;
// console.log(getUsername)

// const hasRole = (roles) => roles.some((role) => _kc.realmAccess(role));

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  getRole,
  newRefreshToken,
  isTokenExpired,
  // userRole
};

export default UserService;