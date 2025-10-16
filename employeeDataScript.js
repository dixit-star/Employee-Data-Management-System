let inputName = document.getElementById("inputName");
let inputEmployeeId = document.getElementById("inputEmId");
let inputGmailId = document.getElementById("inputGmail");
let inputMbNo = document.getElementById("inputMobile");
let inputSalary = document.getElementById("inputSalary");
let inputGender = document.getElementById("gender");
let inputDOB = document.getElementById("DOB");
let inputDepartment = document.getElementById("department");
let inputDOJ = document.getElementById("DOJ");
let inputAdress = document.getElementById("address");

let clickbtn = document.getElementById("btn");
let tableItem = document.querySelector(".tableItem");
let searchBar = document.getElementById("search");
let searchBtn = document.getElementById("searchbtn");
let employeeDetails = document.getElementById("EmployeeData");
let logOutBtn = document.getElementById("logoutbtn");
let errorMssg = document.getElementById("errorMsg");
const gettodoListfromLocalstor = () => {
  return JSON.parse(localStorage.getItem("EmployeeData"));
};
let localtodolist = gettodoListfromLocalstor() || [];

let addnewTable = () => {
  let newElement = document.createElement("tr");
  let InputName = inputName.value;
  let InputEmployeeId = inputEmployeeId.value;
  let InputGmailId = inputGmailId.value;
  let InputMbNo = inputMbNo.value;
  let InputSalary = inputSalary.value;
  let InputGender = inputGender.value;
  let InputDOB = inputDOB.value;
  let InputDepartment = inputDepartment.value;
  let InputDOJ = inputDOJ.value;
  let InputAdress = inputAdress.value;
  newElement.innerHTML = `<td>${InputName}</td>
            <td>${InputEmployeeId}</td>
            <td>${InputGmailId}</td>
            <td>${InputMbNo}</td>
            <td>$ ${InputSalary}</td>
            <td>${InputGender}</td>
            <td>${InputDOB}</td>
            <td>${InputDepartment}</td>
            <td>${InputDOJ}</td>
            <td>${InputAdress}</td>
            <td><button class = "delBtn">del</button> <button class = "EditBtn">Edit</button></td>`;

  tableItem.append(newElement);
};

let todo = () => {
  //store employe data in object
  let EmployeeData = {};
  EmployeeData.Name = inputName.value;
  EmployeeData.EmployeeId = inputEmployeeId.value;
  EmployeeData.GmailId = inputGmailId.value;
  EmployeeData.MobleNo = inputMbNo.value;
  EmployeeData.Salary = inputSalary.value;
  EmployeeData.Gender = inputGender.value;
  EmployeeData.DOB = inputDOB.value;
  EmployeeData.Department = inputDepartment.value;
  EmployeeData.DOJ = inputDOJ.value;
  EmployeeData.Address = inputAdress.value;
  //console.log(EmployeeData);

  //protect when user enter exist emailId/employeeID/moblienumber
  let isDuplicate = localtodolist.some(
    (emp) =>
      emp.EmployeeId === EmployeeData.EmployeeId ||
      emp.GmailId.toLowerCase() === EmployeeData.GmailId.toLowerCase() ||
      emp.MobleNo === EmployeeData.MobleNo
  );
  //protect the storing Null value
  if (
    EmployeeData.Name.trim() === "" ||
    EmployeeData.EmployeeId.trim() === "" ||
    EmployeeData.GmailId.trim() === "" ||
    EmployeeData.MobleNo.trim() === "" ||
    EmployeeData.Salary.trim() === ""
  ) {
    errorMssg.innerText = "*Please fill all information";
    console.log(EmployeeData.EmployeeId);
  } else if (isDuplicate) {
    errorMssg.innerText =
      " Employee already exists (Duplicate ID / Gmail / Mobile No.)";
    return;
  } else {
    //pushing the data into the array and set into the localstorage
    // console.log(EmployeeData.EmployeeId);
    localtodolist.push(EmployeeData);
    //console.log(localtodolist);
    localStorage.setItem("EmployeeData", JSON.stringify(localtodolist));

    addnewTable();
  }
  inputName.value = "";
  inputEmployeeId.value = "";
  inputGmailId.value = "";
  inputMbNo.value = "";
  inputSalary.value = "";
  inputAdress.value = "";
  inputDOB.value = "";
  inputDOJ.value = "";
};
//retrive the data from local stroge after refress the page
const showtodoTable = () => {
  // console.log("fghgfdfgfd = ", localtodolist);
  localtodolist.forEach((emp, index) => {
    let newElement = document.createElement("tr");
    newElement.innerHTML = `<td>${emp.Name}</td>
            <td>${emp.EmployeeId}</td>
            <td>${emp.GmailId}</td>
            <td>${emp.MobleNo}</td>
            <td>$ ${emp.Salary}</td>
            <td>${emp.Gender}</td>
            <td>${emp.DOB}</td>
            <td>${emp.Department}</td>
            <td>${emp.DOJ}</td>
            <td> ${emp.Address}</td>
            <td><button class = "delBtn" onclick ="removeData(${index}) " >del</button> <button class = "editBtn"onclick ="EditData(${index}) " >Edit</button></td>`;

    tableItem.append(newElement);
  });
};
showtodoTable();
//delet the data from table and local storage
const removeData = (index) => {
  localtodolist.splice(index, 1);
  localStorage.setItem("EmployeeData", JSON.stringify(localtodolist));

  location.reload();
};
clickbtn.addEventListener("click", () => {
  todo();
  setTimeout(() => {
  location.reload()
  }, 3000);
  
});

const EditData = (index) => {
  inputName.value = localtodolist[index].Name;
  inputEmployeeId.value = localtodolist[index].EmployeeId;
  inputGmailId.value = localtodolist[index].GmailId;
  inputMbNo.value = localtodolist[index].MobleNo;
  inputSalary.value = localtodolist[index].Salary;
  inputGender.value = localtodolist[index].Gender;
  inputDepartment.value = localtodolist[index].Department;
  inputAdress.value = localtodolist[index].Address;
  inputDOB.value = localtodolist[index].DOB;
  inputDOJ.value = localtodolist[index].DOJ;
  localtodolist.splice(index, 1);
  localStorage.setItem("EmployeeData", JSON.stringify(localtodolist));
};
//search the data using employee id
let searchData = () => {
  let searchObj = {};
  //making the key of employeeId
  for (let i of localtodolist) {
    let key = i.EmployeeId;
    searchObj[key] = i;
  }
  // let keys = 748513;
  // console.log(searchObj[keys]);
  // console.log(Object.values(searchObj[keys]));
  //searchBar.value = [searchObj[keys]]
  let arr = [searchObj[searchBar.value]];
  console.log(arr);
  employeeDetails.innerText = " ";
  //convert object data into table form
  arr.forEach((emp, index) => {
    let newElement = document.createElement("tr");
    newElement.innerHTML = `<td>${emp.Name}</td>
            <td>${emp.EmployeeId}</td>
            <td>${emp.GmailId}</td>
            <td>${emp.MobleNo}</td>
            <td>$${emp.Salary}</td>
            <td>${emp.Gender}</td>
            <td>${emp.DOB}</td>
            <td>${emp.Department}</td>
            <td>${emp.DOJ}</td>
            <td> ${emp.Address}</td>
            <td><button class = "delBtn" onclick ="removeData(${index}) " >del</button><button class = "editBtn"onclick ="EditData(${index}) " >Edit</button></td>`;

    employeeDetails.append(newElement);
  });
};

searchBtn.addEventListener("click", () => {
  searchData();
});
logOutBtn.addEventListener("click", () => {
  open("index.html");
   localStorage.removeItem("EmployeeData")
});
