import {
db,
collection,
getDocs
}
from "./firebase.js";

/* =========================
   PDF EXPORT
========================= */

window.downloadPDF = async function(){

const { jsPDF } = window.jspdf;

const pdf = new jsPDF();

const querySnapshot =
await getDocs(
collection(db,"students")
);

let total = 0;
let selected = 0;
let rejected = 0;

pdf.setFontSize(18);
pdf.text(
"STUDENT PLACEMENT REPORT",
20,
20
);

pdf.setFontSize(12);

let y = 40;

pdf.text("Name",20,y);
pdf.text("Department",70,y);
pdf.text("Company",120,y);
pdf.text("Status",170,y);

y += 10;

querySnapshot.forEach((doc)=>{

const student =
doc.data();

total++;

if(student.status === "Selected"){
selected++;
}

if(student.status === "Rejected"){
rejected++;
}

pdf.text(
student.name,
20,
y
);

pdf.text(
student.department,
70,
y
);

pdf.text(
student.company,
120,
y
);

pdf.text(
student.status,
170,
y
);

y += 10;

if(y > 270){

pdf.addPage();

y = 20;

}

});

let placementRate =
total > 0
? ((selected / total) * 100).toFixed(1)
: 0;

y += 15;

pdf.text(
`Total Students : ${total}`,
20,
y
);

y += 10;

pdf.text(
`Selected : ${selected}`,
20,
y
);

y += 10;

pdf.text(
`Rejected : ${rejected}`,
20,
y
);

y += 10;

pdf.text(
`Placement Rate : ${placementRate}%`,
20,
y
);

pdf.save(
"Student_Placement_Report.pdf"
);

};

/* =========================
   CSV EXPORT
========================= */

window.exportCSV = async function(){

const querySnapshot =
await getDocs(
collection(db,"students")
);

let csv =
"Name,Department,Company,Status\n";

querySnapshot.forEach((doc)=>{

const student =
doc.data();

csv +=
`${student.name},
${student.department},
${student.company},
${student.status}\n`;

});

let blob =
new Blob(
[csv],
{
type:"text/csv"
}
);

let link =
document.createElement("a");

link.href =
URL.createObjectURL(blob);

link.download =
"students.csv";

link.click();

};

/* =========================
   CLEAR DATA
========================= */

window.clearData = function(){

let confirmDelete =
confirm(
"Delete all student records?"
);

if(confirmDelete){

localStorage.clear();

alert(
"All local records deleted"
);

location.reload();

}

};