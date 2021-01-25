console.log("Start");

function loginUser(email, password, callback) {
    setTimeout(() => {
        console.log("Now we have the data");
        callback({ userEmail: email, password: password });
    }, 5000);
}

const user = loginUser("jay@gmail.com", 123456, user => { console.log(user); console.log("End"); });



