// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcIAOtanabtMVzPASSBghSrEuW7OinpBs",
  authDomain:  "project-050224.firebaseapp.com",
  projectId: "project-050224",
  storageBucket: "project-050224.appspot.com",
  messagingSenderId: "431198301205",
  appId: "1:431198301205:web:ad57bb26344ca94992f21c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the default bucket
const storage = getStorage(app);

// Export the storage instance so it can be used in other parts of your app
export { storage };

