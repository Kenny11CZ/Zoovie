import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from '../../i18n/en';
import cs from '../../i18n/cs';

const lang = require('electron').ipcRenderer.sendSync('zoovie:lang:request');

Vue.use(VueI18n);

const messages = {
    en: en,
    cs: cs

};

export default new VueI18n({
    locale: lang,
    messages: messages
});