import {
db,
collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc
}
from "./firebase.js";

let editId = null;
let photoData = "";

loadStudents();

document
.getElementById("photo")
.addEventListener("change", function(){

const file = this.files[0];

if(file){

const reader = new FileReader();

reader.onload = function(e){

photoData = e.target.result;

};

reader.readAsDataURL(file);

}

});

window.addStudent = async function(){

let name =
document.getElementById("name").value;

let department =
document.getElementById("department").value;

let company =
document.getElementById("company").value;

let status =
document.getElementById("status").value;

if(
name === "" ||
department === "" ||
company === ""
){
alert("Fill all fields");
return;
}

const studentData = {
name,
department,
company,
status,
photo: photoData
};

try{

if(editId){

await updateDoc(
doc(db,"students",editId),
studentData
);

alert("Student Updated Successfully");

editId = null;

document.querySelector(".add-btn")
.textContent = "Add Student";

}
else{

await addDoc(
collection(db,"students"),
studentData
);

alert("Student Added Successfully");

}

clearForm();

loadStudents();

}
catch(error){

console.error(error);

alert("Error Saving Student");

}

};

async function loadStudents(){

let table =
document.getElementById("studentTable");

table.innerHTML = "";

const querySnapshot =
await getDocs(
collection(db,"students")
);

let companies =
new Set();

querySnapshot.forEach((studentDoc)=>{

let student =
studentDoc.data();

companies.add(student.company);

table.innerHTML += `

<tr>

<td>
<img
src="${student.photo}"
width="50"
height="50">
</td>

<td>${student.name}</td>
<td>${student.department}</td>
<td>${student.company}</td>
<td>${student.status}</td>

<td>

<button
class="edit-btn"
onclick="editStudent('${studentDoc.id}')">

Edit

</button>

<button
class="delete-btn"
onclick="deleteStudent('${studentDoc.id}')">

Delete

</button>

</td>

</tr>

`;

});

const filter =
document.getElementById("companyFilter");

filter.innerHTML =
'<option value="All">All Companies</option>';

companies.forEach(company=>{

filter.innerHTML +=
`<option value="${company}">
${company}
</option>`;

});

}

window.editStudent =
async function(id){

const querySnapshot =
await getDocs(
collection(db,"students")
);

querySnapshot.forEach((studentDoc)=>{

if(studentDoc.id === id){

const student =
studentDoc.data();

document.getElementById("name").value =
student.name;

document.getElementById("department").value =
student.department;

document.getElementById("company").value =
student.company;

document.getElementById("status").value =
student.status;

photoData =
student.photo;

editId = id;

document.querySelector(".add-btn")
.textContent =
"Update Student";

}

});

};

window.deleteStudent =
async function(id){

if(confirm("Delete Student?")){

await deleteDoc(
doc(db,"students",id)
);

loadStudents();

}

};

window.searchStudent =
function(){

let value =
document.getElementById("search")
.value.toLowerCase();

let rows =
document.querySelectorAll("#studentTable tr");

rows.forEach(row=>{

let text =
row.innerText.toLowerCase();

row.style.display =
text.includes(value)
? ""
: "none";

});

};

window.filterCompany =
function(){

let company =
document.getElementById("companyFilter").value;

let rows =
document.querySelectorAll("#studentTable tr");

rows.forEach(row=>{

if(company === "All"){

row.style.display = "";

}
else{

let text =
row.innerText;

row.style.display =
text.includes(company)
? ""
: "none";

}

});

};

function clearForm(){

document.getElementById("name").value = "";
document.getElementById("department").value = "";
document.getElementById("company").value = "";
document.getElementById("status").value = "Applied";
document.getElementById("photo").value = "";

photoData = "";

}