// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCeG_D6l5HWEzENGmSBMyiAH-XSx2zyqig",
  authDomain: "sail-project-819fa.firebaseapp.com",
  projectId: "sail-project-819fa",
  storageBucket: "sail-project-819fa.appspot.com",
  messagingSenderId: "836051632223",
  appId: "1:836051632223:web:599dcc7fcf6ce47d27dbea"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Elements
const requestForm = document.getElementById("requestBusForm");
const studentRequestsBody = document.getElementById("studentRequestsBody");
const logoutBtn = document.getElementById("studentLogoutBtn");

// Submit Request
if (requestForm) {
  requestForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("studentName").value.trim();
    const message = document.getElementById("studentMessage").value.trim();
    const timestamp = new Date().toLocaleString();

    if (!name || !message) {
      alert("Enter your name and message.");
      return;
    }

    db.collection("busRequests").add({
      student: name,
      message: message,
      requestTime: timestamp,
      status: "pending"
    }).then(() => {
      alert("Request sent successfully!");
      requestForm.reset();
      showStudentRequests(name);
    }).catch(err => {
      console.error(err);
      alert("Error sending request.");
    });
  });
}

// Show only this student's requests
function showStudentRequests(name) {
  if (!studentRequestsBody) return;
  db.collection("busRequests").where("student", "==", name)
    .onSnapshot(snapshot => {
      studentRequestsBody.innerHTML = "";
      snapshot.forEach(doc => {
        const data = doc.data();
        const tr = document.createElement("tr");

        const tdMsg = document.createElement("td");
        tdMsg.textContent = data.message;
        tr.appendChild(tdMsg);

        const tdTime = document.createElement("td");
        tdTime.textContent = data.requestTime;
        tr.appendChild(tdTime);

        const tdStatus = document.createElement("td");
        tdStatus.textContent = data.status;
        if (data.status === "approved") tdStatus.style.color = "green";
        else if (data.status === "pending") tdStatus.style.color = "orange";
        else if (data.status === "rejected") tdStatus.style.color = "red";
        tr.appendChild(tdStatus);

        studentRequestsBody.appendChild(tr);
      });
    });
}

// Logout
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}
