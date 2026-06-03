import {
db,
collection,
getDocs
}
from "./firebase.js";

async function loadAnalytics(){

const querySnapshot =
await getDocs(
collection(db,"students")
);

let total = 0;
let selected = 0;
let rejected = 0;
let recentSelected = [];
let companyData = {};

querySnapshot.forEach((studentDoc)=>{

const student = studentDoc.data();

total++;

if(student.status === "Selected"){

selected++;

recentSelected.push({
name: student.name,
department: student.department,
company: student.company
});

}

if(student.status === "Rejected"){
rejected++;
}

if(!companyData[student.company]){
companyData[student.company] = {
total:0,
selected:0
};
}

companyData[student.company].total++;

if(student.status === "Selected"){
companyData[student.company].selected++;
}

});

let placementRate = 0;

if(total > 0){
placementRate =
((selected / total) * 100).toFixed(1);
}

document.getElementById("totalStudents").textContent =
total;

document.getElementById("selectedStudents").textContent =
selected;

document.getElementById("rejectedStudents").textContent =
rejected;

document.getElementById("placementRate").textContent =
placementRate + "%";


const recentTable =
document.getElementById("recentPlacements");

recentTable.innerHTML = "";

recentSelected
.slice(-5)
.reverse()
.forEach(student=>{

recentTable.innerHTML += `

<tr>
<td>${student.name}</td>
<td>${student.department}</td>
<td>${student.company}</td>
</tr>

`;

});
/* Placement Pie Chart */

new Chart(
document.getElementById("placementChart"),
{
type:"pie",
data:{
labels:[
"Selected",
"Rejected"
],
datasets:[
{
data:[
selected,
rejected
],
backgroundColor:[
"#22c55e",
"#ef4444"
]
}
]
},
options:{
responsive:true,
maintainAspectRatio:false
}
}
);

/* Company Bar Chart */

new Chart(
document.getElementById("companyChart"),
{
type:"bar",
data:{
labels:Object.keys(companyData),
datasets:[
{
label:"Total Students",
data:Object.values(companyData).map(
item => item.total
),
backgroundColor:"#2563eb"
},
{
label:"Selected Students",
data:Object.values(companyData).map(
item => item.selected
),
backgroundColor:"#22c55e"
}
]
},
options:{
responsive:true,
maintainAspectRatio:false,
scales:{
y:{
beginAtZero:true,
ticks:{
stepSize:1
}
}
}
}
}
);

}

loadAnalytics();