import Vue from 'vue';
import VueRouter from 'vue-router';
import Buefy from 'buefy';
import VueResource from 'vue-resource';
import VeeValidate, { Validator } from 'vee-validate';
import VeeValidateGerman from 'vee-validate/dist/locale/de';
import Moment from 'moment';
import 'moment-timezone';

// Styles
import 'buefy/dist/buefy.css';
import './theme.css';
// Store
import store from './store';
// Components
import {GlobalComponents, LocalComponents} from './components';
// Router
import router from './router';

// Mixins
Vue.use(VueRouter);
Vue.use(Buefy);
Vue.use(VueResource);

Moment.locale('de')
Moment.tz.setDefault("Europe/Zurich")
Vue.prototype.moment = Moment

Validator.localize('de', VeeValidateGerman);
Vue.use(VeeValidate);

// Support endsWith on old browsers
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

// Http interceptors: Global response handler
Vue.http.interceptors.push(function (request, next) {
    next(function (res) {
        if (res.body.message) {
            this.$store.commit('setNotification', {
                notification: {
                    type: res.status === 200 ? 'success' : 'danger',
                    message: res.body.message
                }
            });
        }
    });
});

// Http interceptors: Add Auth-Header if token present
Vue.http.interceptors.push(function (request, next) {
    if (store.state.user) {
        request.headers.set('Authorization', `Bearer ${store.state.user.token}`);
    }
    next();
});

new Vue({
    router,
    store,
    components: LocalComponents,
    el: '#app',
    render: h => h(GlobalComponents.App)
});

