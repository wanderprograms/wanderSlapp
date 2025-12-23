// Universal loader.js
// Assumes Firebase is already initialized in the HTML file

const auth = firebase.auth();
const firestore = firebase.firestore();

/**
 * ✅ Load user name into any element
 * @param {string} elementId - ID ya element yomwe dzina la user liyikidwe
 */
function loadUserName(elementId = "profileName") {
  auth.onAuthStateChanged(async user => {
    if (user) {
      const uid = user.uid;
      const doc = await firestore.collection("users").doc(uid).get();
      if (doc.exists) {
        const data = doc.data();
        const fullName = data.public?.fullName || "Anonymous";
        const el = document.getElementById(elementId);
        if (el) el.textContent = fullName;
      }
    }
  });
}

