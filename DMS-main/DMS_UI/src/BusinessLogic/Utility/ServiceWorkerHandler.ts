

export const registerServiceWorker = () => {
    if('serviceWorker' in navigator){
        window.addEventListener('load', () => {
            navigator.serviceWorker
                    .register('./serviceWorker.js')
        })
    }
    sendTokenToService(localStorage.getItem('Token')!)
}


export const sendTokenToService = (token: string) => {
    navigator.serviceWorker.controller?.postMessage({
        type: 'TOKEN',
        value: token
    })
}