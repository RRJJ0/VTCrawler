

export function delay(min: number = 1000, max: number = 3000) {
    return new Promise(resolve => setTimeout(resolve, Math.random() * (max - min) + min));
}


export function getUserAgent(): any {
    const userAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    // ...
    ];
    
    // select a random user agent from the list
    const ua = userAgents[Math.floor(Math.random() * userAgents.length)];
    
    // set the user agent in the headers and make a get request
    const headers = {
        "User-Agent": ua,
    };

    return headers;
}