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
const auth = firebase.auth();
const db = firebase.firestore();

// Render auth form
document.getElementById('auth-container').innerHTML = `
  <div class="auth-box">
    <input type="email" id="email" placeholder="Email" class="auth-input">
    <input type="password" id="password" placeholder="Password" class="auth-input">
    <button onclick="login()" class="auth-button">Login</button>
    <button onclick="signup()" class="auth-button">Sign Up</button>
  </div>
`;

// Login function
function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  auth.signInWithEmailAndPassword(email, password)
    .then(() => loadContent())
    .catch(err => alert("Login failed: " + err.message));
}

// Load content after login
function loadContent() {
  document.getElementById('auth-container').style.display = 'none';
  
  db.collection("topics").get().then((snapshot) => {
    let html = "<h2>Your Topics</h2><ul>";
    snapshot.forEach(doc => {
      html += `<li>${doc.data().title}</li>`;
    });
    document.getElementById('content').innerHTML = html + "</ul>";
  });
}

// Signup function (optional)
function signup() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Account created!"))
    .catch(err => alert("Signup failed: " + err.message));
}
