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

const requestsBody = document.getElementById("requestsBody");

// Show all requests
if (requestsBody) {
  db.collection("busRequests").onSnapshot(snapshot => {
    requestsBody.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      const tr = document.createElement("tr");

      // Student Name
      const tdName = document.createElement("td");
      tdName.textContent = data.student;
      tr.appendChild(tdName);

      // Message
      const tdMsg = document.createElement("td");
      tdMsg.textContent = data.message;
      tr.appendChild(tdMsg);

      // Request Time
      const tdTime = document.createElement("td");
      tdTime.textContent = data.requestTime;
      tr.appendChild(tdTime);

      // Status
      const tdStatus = document.createElement("td");
      tdStatus.textContent = data.status;
      if (data.status === "approved") tdStatus.style.color = "green";
      else if (data.status === "pending") tdStatus.style.color = "orange";
      else if (data.status === "rejected") tdStatus.style.color = "red";
      tr.appendChild(tdStatus);

      // Actions
      const tdActions = document.createElement("td");
      tdActions.style.display = "flex";
      tdActions.style.gap = "5px";

      const approveBtn = document.createElement("button");
      approveBtn.textContent = "Approve";
      approveBtn.classList.add("approve");
      approveBtn.addEventListener("click", () => {
        db.collection("busRequests").doc(doc.id).update({ status: "approved" });
      });

      const pendingBtn = document.createElement("button");
      pendingBtn.textContent = "Pending";
      pendingBtn.classList.add("pending");
      pendingBtn.addEventListener("click", () => {
        db.collection("busRequests").doc(doc.id).update({ status: "pending" });
      });

      const rejectBtn = document.createElement("button");
      rejectBtn.textContent = "Reject";
      rejectBtn.classList.add("reject");
      rejectBtn.addEventListener("click", () => {
        db.collection("busRequests").doc(doc.id).update({ status: "rejected" });
      });

      tdActions.appendChild(approveBtn);
      tdActions.appendChild(pendingBtn);
      tdActions.appendChild(rejectBtn);
      tr.appendChild(tdActions);

      requestsBody.appendChild(tr);
    });
  });
}
