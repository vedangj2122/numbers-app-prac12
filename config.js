const localHosts = {
    arithmetic: "http://localhost:4000",
    primes: "http://localhost:8085",
    ciphers: "http://localhost:4006",
    quotation: "http://localhost:4004"
};

const remoteHosts = {
    arithmetic: "https://arithmetic-service-6stu.onrender.com",
    primes: "https://primes-service-o8g8.onrender.com",
    ciphers: "https://ciphers-service-aav.onrender.com",
    quotation: "?" // Provide the correct URL for the quotation service
};

const mode = 0;

function getHosts() {
    return (mode == 0) ? localHosts : remoteHosts;
}

let config = {
    isLoggedIn: false,
    hosts: getHosts(),
    token: ""
};

function renderLogin() {
    let loginDiv = document.getElementById("login");
    if (config.isLoggedIn) {
        loginDiv.innerHTML = `<h4>You are logged in.</h4>`;
    } else {
        loginDiv.innerHTML = `<form>
            <input id="username" placeholder="Enter your username" required/>
            <input id="password" placeholder="Enter your password" required/>
            <button type="button" onclick="performLogin()">Login</button>
        </form>`;
    }
}

async function performLogin() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let userCredentials = { username: username, password: password };
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userCredentials)
    };
    try {
        let response = await fetch(config.hosts.primes + "/login", request);
        if (response.status == 200) {
            const token = await response.text();
            config.token = token;
            config.isLoggedIn = true;
            renderLogin();
        } else {
            console.log(`Response status: ${response.status}`);
            config.isLoggedIn = false;
            renderLogin();
            alert("Login failed. Please try again.");
        }
    } catch (error) {
        console.log(error);
        config.isLoggedIn = false;
        renderLogin();
        alert("Something went wrong. Please try again later.");
    }
}


renderLogin();
