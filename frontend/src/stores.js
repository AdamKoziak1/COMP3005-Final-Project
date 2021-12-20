import { writable } from 'svelte/store';

export let activeBook = new writable('');
export let user = new writable(null);
export let shoppingCart = new writable(sessionStorage.getItem('cart') ? JSON.parse(sessionStorage.getItem('cart')) : {});