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

window.location.href =
"index.html";

}
catch(error){

alert(error.message);

}

}