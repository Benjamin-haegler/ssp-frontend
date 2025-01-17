export const STORAGE_KEY = 'cloud-ssp';

export const state = {
  backendURL: 'http://localhost:8000',
  wzuURL: 'http://localhost:8001',
  ssoRealmName: 'SBB_Public',
  ssoRealmURL: 'https://sso.sbb.ch/auth',
  ssoClientID: 'client-ssp-dev',
  ssoIdpHint: 'adfs_sbb_prod',
  user: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null'),
  notification: {}
};

export const mutations = {
  setUser(state, { user }) {
    state.user = user;
  },
  setNotification(state, { notification }) {
    state.notification = notification;
  }
};
