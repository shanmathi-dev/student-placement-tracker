import {
db,
collection,
getDocs
} from "./firebase.js";

loadCompanies();

async function loadCompanies(){

    const companyData = {};

    try{

        const querySnapshot =
        await getDocs(
        collection(db,"students")
        );

        querySnapshot.forEach((studentDoc)=>{

            const student =
            studentDoc.data();

            const company =
            student.company;

            if(!companyData[company]){

                companyData[company] = {
                    applied:0,
                    selected:0,
                    rejected:0
                };

            }

            companyData[company].applied++;

            if(student.status === "Selected"){
                companyData[company].selected++;
            }

            if(student.status === "Rejected"){
                companyData[company].rejected++;
            }

        });

        document.getElementById("totalCompanies")
        .textContent =
        Object.keys(companyData).length;

        let table =
        document.getElementById("companyTable");

        table.innerHTML = "";

        for(let company in companyData){

            table.innerHTML += `
            <tr>
                <td>${company}</td>
                <td>${companyData[company].applied}</td>
                <td>${companyData[company].selected}</td>
                <td>${companyData[company].rejected}</td>
            </tr>
            `;
        }

    }
    catch(error){

        console.error(error);

        alert("Error Loading Company Data");

    }

}