<script>
    import page from 'page';
    import * as http from '../../http';
    import { user } from '../../stores';

    import Header from '../../components/Header.svelte';
    import Body from '../../components/Body.svelte';
    import Input from '../../components/Input.svelte';
    import Button from '../../components/Button.svelte';

    async function signIn(event) {
        user.set(await http.signInWithEmail(
            event.target.email.value,
            event.target.password.value
        ));
        localStorage.setItem('idUser', $user.idUser);
        page('/');
    }

    async function register(event) {
        user.set(await http.register(
            event.target.firstName.value,
            event.target.lastName.value,
            event.target.email.value,
            event.target.password.value, 
            event.target.address.value, 
            event.target.city.value, 
            event.target.province.value, 
            event.target.postalCode.value
        ));
        localStorage.setItem('idUser', $user.idUser);
        page('/');
    }
</script>

<Header text='Sign In / Create an Account'/>
<Body style='max-width: 50rem; margin-top: 2rem;' text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'/>

<div style='display: flex;'>

    <form on:submit|preventDefault={signIn}>
        <div class='section-title'>Sign in</div>
        <Input id='email' text='Email' style='margin-top: 2rem; max-width: 400px;'/>
        <Input id='password' text='Password' style='margin-top: 1rem; max-width: 400px;'/>
        <Button text='Sign in' icon='key' style='margin-top: 1rem; max-width: 434px; justify-content: center;'/>
    </form>

    <form on:submit|preventDefault={register} style='margin-left: 2rem;'>
        <div class='section-title'>Register</div>
        <Input id='firstName' text='First Name' style='margin-top: 2rem; max-width: 400px;'/>
        <Input id='lastName' text='Last Name' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='email' text='Email' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='password' text='Password' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='address' text='Address' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='city' text='City' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='province' text='Province' style='margin-top: 1rem; max-width: 400px;'/>
        <Input id='postalCode' text='Postal Code' style='margin-top: 1rem; max-width: 400px;'/>
        <Button text='Register' icon='key' style='margin-top: 1rem; max-width: 434px; justify-content: center;'/>
    </form>

</div>

<style>
    form {
        display: flex;
        flex-direction: column;
    }
    .section-title {
        margin-top: 2rem;
        font-size: 1.5rem;
        font-family: 'Playfair-Display', serif;
        color: var(--text-dark);
    }
</style>