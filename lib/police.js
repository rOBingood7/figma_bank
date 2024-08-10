let localed = localStorage.getItem('user') || null

if(!localed) {
    location.assign('/pages/signin/')
}