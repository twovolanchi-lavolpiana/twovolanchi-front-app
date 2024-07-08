import { createApp } from 'vue'
import App from './App.vue'
import { VueDraggableNext } from 'vue-draggable-next';

const app = createApp(App);
app.component('VueDraggable', VueDraggableNext);
app.mount('#app');
