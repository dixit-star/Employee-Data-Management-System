//delet the text when width under 500 or when you are run the website in your phone
  let textConatiner = document.getElementById("textConatiner");
  if (screen.width <= 500) {
    textConatiner.innerHTML = "";
  }
  //get the data from local storage
  let getDataFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("personalData"));
  };
  let localArray = getDataFromLocalStorage() || [];
  let userName = document.getElementById("username");
  let gmail = document.getElementById("gmail");
  let passWord = document.getElementById("password");
  let loginBtn = document.getElementById("Loginbtn");
  let LoginProperty = document.getElementById("pera");
  let LoginProperty2 = document.getElementById("pera2");

  console.log(localArray);
  let displayData = () => {
    //creating a object for storing one person data
    let userData = {};
    userData.gmailId = gmail.value;
    userData.password = passWord.value;
    //check  dublicate element function
    let isDuplicate = localArray.some(
      (user) =>
        user.gmailId.toLowerCase() === userData.gmailId.toLowerCase() &&
        user.password.toLowerCase() === userData.password.toLowerCase()
    );
    //if() run then user does not enter the value in inputbox
    if (gmail.value.trim() == "" || passWord.value.trim() == "") {

      if (gmail.value.trim() == "" && passWord.value.trim() == "") {
        LoginProperty.innerText = "*Please enter your gmail Id";
        LoginProperty2.innerText = "*Please enter your password"
      } else if (gmail.value.trim() == "") {
        LoginProperty.innerText = "*Please enter your gmail Id";
        LoginProperty2.innerText = ""
      }
      else {
        LoginProperty2.innerText = "*Please enter your password"
        LoginProperty.innerText = ""
      }
    } else if (isDuplicate) { //call the isDublicate if dublicate value is exist login is succsesfull else register 
      alert("Login SuccsesFully");
      open("employeeData.html");
    } else {//if input is full but data is wrong

      if ((localArray.some( //if email is right but password is wrong
        (user) =>
          user.gmailId.toLowerCase() === userData.gmailId.toLowerCase()
      ))) {
        LoginProperty2.innerText = "*password is wrong"
        LoginProperty.innerText = "";
      } else if ((localArray.some(//if email is wrong but password is right
        (user) =>
          user.password.toLowerCase() === userData.password.toLowerCase()
      ))) {
        LoginProperty.innerText = "*gmail Id is wrong";
        LoginProperty2.innerText = ""
      } else {//if both are wrong
        LoginProperty.innerText = "*gmail Id is wrong";
        LoginProperty2.innerText = "*password is wrong"
      }
    }
  };
  loginBtn.addEventListener("click", (event) => {
    event.preventDefault();
    displayData();
  });