import App from './App.svelte';
import * as http from './http';
import { user } from './stores';

(async () => {
	if (localStorage.getItem('idUser')) {
		console.log(await http.signInWithId(localStorage.getItem('idUser')));
		user.set(await http.signInWithId(localStorage.getItem('idUser')));
	}
})();

export default new App({
	target: document.body,
	props: {}
});;