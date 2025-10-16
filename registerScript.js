  //delet the side test of loging btn when screen size is less the 500
    let textConatiner = document.getElementById("textConatiner");
    if (screen.width <= 500) {
      textConatiner.innerHTML = "";
    }
    //get the data from local storge 
    let getDataFromLocalStorage = () => {
      return JSON.parse(localStorage.getItem("personalData"));
    };
    let localArray = getDataFromLocalStorage() || [];
    let userName = document.getElementById("username");
    let gmail = document.getElementById("gmail");
    let passWord = document.getElementById("password");
    let registerBtn = document.getElementById("registerbtn");
    let fillUserName = document.getElementById("errorMsg1")
    let fillEmail = document.getElementById("errorMsg2")
    let fillPassword = document.getElementById("errorMsg3")

    let displayData = () => {
      //crating a object
      let userData = {};
      userData.username = userName.value;
      userData.gmailId = gmail.value;
      userData.password = passWord.value;
        //checking the dublicates values
      let isDuplicate = localArray.some(
        (user) =>
          user.username.toLowerCase() === userData.username.toLowerCase() ||
          user.gmailId.toLowerCase() === userData.gmailId.toLowerCase() ||
          user.password.toLowerCase() === userData.password.toLowerCase()
      );
      if (
        userName.value.trim() == "" ||
        gmail.value.trim() == "" ||
        passWord.value.trim() == ""
      ) {
           
        if (userName.value.trim() == "" &&  
          gmail.value.trim() == "" &&
          passWord.value.trim() == "") {
          fillUserName.innerText = "*Please enter username"
          fillEmail.innerText = "*Please enter Email Id"
          fillPassword.innerText = "*Please enter password"
        } else if ((gmail.value.trim() == "" &&
          passWord.value.trim() == "")) {
          fillPassword.innerText = "*Please enter password"
          fillEmail.innerText = "*Please enter Email Id"
          fillUserName.innerText = ""
        }else if(userName.value.trim() == "" &&
          gmail.value.trim() == "" ){
          fillUserName.innerText = "*Please enter username"
          fillEmail.innerText = "*Please enter Email Id"
          fillPassword.innerText = ""
        }else if(userName.value.trim() == "" &&  passWord.value.trim() == "" ){
           fillPassword.innerText = "*Please enter password"
           fillUserName.innerText = "*Please enter username"
           fillEmail.innerText = ""
        }
        else if ((userName.value.trim() == "")) {
          fillUserName.innerText = "*Please enter username"
          fillEmail.innerText = ""
          fillPassword.innerText = ""
        } else if ((gmail.value.trim() == "")) {
          fillEmail.innerText = "*Please enter Email Id"
          fillPassword.innerText = ""
          fillUserName.innerText = ""
        }
        else if ((passWord.value.trim() == "")) {
          fillPassword.innerText = "*Please enter password"
          fillUserName.innerText = ""
          fillEmail.innerText = ""
        }

      }
      //when you have an account
      else if (isDuplicate) {
        alert("you have already have an account please Log in");

      } else {//if you have not account you can register successfull 
        localArray.push(userData);
        localStorage.setItem("personalData", JSON.stringify(localArray));
        open("employeeData.html")
      }
      // userName.value = "";
      // gmail.value = "";
      // passWord.value = "";
    };
    
    registerBtn.addEventListener("click", (event) => {
      event.preventDefault();
      displayData();


    });