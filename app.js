import {
db,
collection,
getDocs
}
from "./firebase.js";

loadDashboard();

async function loadDashboard(){

const querySnapshot =
await getDocs(
collection(db,"students")
);

let total = 0;
let selected = 0;
let rejected = 0;

querySnapshot.forEach((studentDoc)=>{

total++;

const student =
studentDoc.data();

if(student.status === "Selected"){
selected++;
}

if(student.status === "Rejected"){
rejected++;
}

});

document.getElementById(
"totalStudents"
).textContent = total;

document.getElementById(
"selectedStudents"
).textContent = selected;

document.getElementById(
"rejectedStudents"
).textContent = rejected;

let placementRate = 0;

if(total > 0){

placementRate =
((selected / total) * 100)
.toFixed(1);

}

document.getElementById(
"placementRate"
).textContent =
placementRate + "%";

const ctx =
document.getElementById(
"placementChart"
);

new Chart(ctx,{

type:"pie",

data:{

labels:[
"Selected",
"Rejected"
],

datasets:[{

data:[
selected,
rejected
]

}]

}

});

}