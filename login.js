import {
auth,
signInWithEmailAndPassword
}
from "./firebase.js";

window.login = async function(){

let email =
document.getElementById("username").value;

let password =
document.getElementById("password").value;

if(email === "" || password === ""){

alert("Fill all fields");
return;

}

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

sessionStorage.setItem(
"loggedIn",
"true"
);

alert("Login Successful");

window.location.href =
"index.html";

}
catch(error){

console.log(error.code);
console.log(error.message);

alert(error.code);

}

}