import styles from './scss/main.scss';
import _ from 'jquery';
import './js/preloader';
import './js/main';
import './js/canvasSphere';
import './js/jsonAnimation';
import './js/contactForm';
import './js/hash';
import './js/turn';
import './js/flipbook';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();

