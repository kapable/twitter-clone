export let backUrl;

if(process.env.NODE_ENV === 'development') {
    backUrl = 'http://localhost:3065';
} else {
    backUrl = 'http://api.jellinggame.net';
}