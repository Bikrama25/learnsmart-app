// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuDcoR8TuVwHF-EerhoBCUublj6yz7FYs",
  authDomain: "money-loosing-app.firebaseapp.com",
  projectId: "money-loosing-app",
  storageBucket: "money-loosing-app.firebasestorage.app",
  messagingSenderId: "342565020457",
  appId: "1:342565020457:web:37084d5f36031518a68d38",
  measurementId: "G-7B4RP63MN6"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Simple login
document.getElementById('auth-container').innerHTML = `
  <input type="email" id="email" placeholder="Email">
  <input type="password" id="password" placeholder="Password">
  <button onclick="login()">Login</button>
`;

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => loadContent())
    .catch(err => alert("Error: " + err.message));
}

function loadContent() {
  db.collection("topics").get().then((querySnapshot) => {
    let html = "<h2>Topics</h2><ul>";
    querySnapshot.forEach((doc) => {
      html += `<li>${doc.data().title}</li>`;
    });
    document.getElementById('content').innerHTML = html + "</ul>";
  });
}
