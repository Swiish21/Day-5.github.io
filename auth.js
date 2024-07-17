//below is a sample firebase config that can be used for local development and testing 
// require('dotenv').config();
//we are importing firebase modules that we need for the web app
//they are initializeapp for initialising the firebase app and getdatabase for accessing the database
//and getauth for accessing the user authentication module
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";


//This configuration object is used to initialize the Firebase SDK in a web application. By providing these details, you are essentially telling the Firebase SDK how to connect to your specific Firebase project and its resources.
const firebaseConfig = {
    apiKey: "AIzaSyB-SkwO6gHjjCSXnkOisgorDcY1RlF-xk8",
    authDomain: "demo1-3d336.firebaseapp.com",
    projectId: "demo1-3d336",
    storageBucket: "demo1-3d336.appspot.com",
    messagingSenderId: "265419533955",
    appId: "1:265419533955:web:474e84576ae3fe0bf535b6",
    measurementId: "G-KBMQFDBJ9F"
  };

  //below we are getting the initialize app, getting the database and authentication modules that we imported and declaring some variables that we will use later in the code.
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

//below we are fetching some elements(id names in green) from the html page(signup.html) where a user can login or register,
const main = document.getElementById("main");
const returnBtn = document.getElementById("return-btn");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submit");

const signupEmailIn = document.getElementById("email-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById(
  "confirm-password-signup"
);
//below we are creating a function that will be called when the user clicks on the "Create Account" button.
const createacct = document.getElementById("create-acct");

// Start with this
const createacctbtn = document.getElementById("create-acct-btn");
const signupButton = document.getElementById("sign-up");

//below we are declaring some variables that will be used later to verify the user's email and password if already signed up or create a new account if not.
var email,
  password,
  signupEmail,
  signupPassword,
  confirmSignupEmail,
  confirmSignUpPassword;

//below is the event listener that will be called when the user clicks on the "Create Account" button.
createacctbtn.addEventListener("click", function () {
  var isVerified = true;

  //below we are checking if the user's email and password fields are not empty and if they match.
  signupEmail = signupEmailIn.value;
  confirmSignupEmail = confirmSignupEmailIn.value;
  if (signupEmail != confirmSignupEmail) {
    window.alert("Email fields do not match. Try again.");
    isVerified = false;
  }
  //below we are checking if the user's password and confirm password fields match in the new user signup process.
  signupPassword = signupPasswordIn.value;
  confirmSignUpPassword = confirmSignUpPasswordIn.value;
  if (signupPassword != confirmSignUpPassword) {
    window.alert("Password fields do not match. Try again.");
    isVerified = false;
  }
  //below we are checking if the user's email and password fields are not empty, if they are empty or if they do not match we will alert the user to fill out all required fields.
  if (
    signupEmail == null ||
    confirmSignupEmail == null ||
    signupPassword == null ||
    confirmSignUpPassword == null
  ) {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }
  // This code is a part of a signup process where the user's email and password are verified before creating the account. If the isVerified condition is true, it creates a user account using the provided email and password through createUserWithEmailAndPassword method.
  if (isVerified) {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        window.alert("Success! Account created.");
        window.location = "index.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        window.alert("Error occurred. Try again.");
        window.alert(errorMessage);
      });
  }
});

  //Overall, this code snippet demonstrates a basic implementation of user sign-in using Firebase Authentication with error handling and redirection to the index.html page upon successful login.
submitButton.addEventListener("click", function () {
  email = emailInput.value;
  console.log(email);
  password = passwordInput.value;
  console.log(password);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      window.alert("Success! Welcome back!");
      window.location = "index.html";

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert("Error occurred. Try again.");
    });
});

// //This code snippet below adds event listeners to two buttons: `signupButton` and `returnBtn`. When the `signupButton` is clicked, it hides the `main` element and displays the `createacct` element. This is typically used to switch the view from the main page to a signup form. When the `returnBtn` is clicked, it hides the `createacct` element and displays the `main` element. This is typically used to switch the view back to the main page.
signupButton.addEventListener("click", () => {
  main.style.display = "none";
  createacct.style.display = "block";
});

returnBtn.addEventListener("click", function () {
  main.style.display = "block";
  createacct.style.display = "none";
});