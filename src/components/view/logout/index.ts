console.log('logout');

/* export default function Login(): void {
    const logout = document.querySelector('logaout') as HTMLElement;

    logout.addEventListener('click', () => {
        localStorage.setItem('isTokenUser', 'false');
    });
}
 */
// eslint-disable-next-line import/prefer-default-export

/* export default function Login(): void {
    const divHeader = document.querySelector('header') as HTMLElement;
    const divLogout = document.createElement('div');
    divLogout.classList.add('logout');
    divHeader.appendChild(divLogout);
    divLogout.innerHTML = 'Logout';

    const logout = document.querySelector('.logout') as HTMLElement;
    logout.addEventListener('click', () => {
        localStorage.setItem('isTokenUser', 'false');
        logout.style.display = 'none';
    });

    if (localStorage.isTokenUser !== undefined) {
        logout.style.display = 'block';
    } else {
        logout.style.display = 'none';
    }
}

setTimeout(Login, 0); */

if (localStorage.isTokenUser === undefined) {
    localStorage.setItem('isTokenUser', 'false');
}
