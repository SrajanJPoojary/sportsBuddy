// js/db.js
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const { db, auth } = window.firebaseServices;
const eventsCollection = collection(db, "events");

// Add event
export async function addEvent(eventData) {
  try {
    const docRef = await addDoc(eventsCollection, {
      ...eventData,
      createdBy: auth.currentUser.uid,
      createdAt: serverTimestamp(),
      time: eventData.time ? Timestamp.fromDate(new Date(eventData.time)) : null
    });
    alert("Event created successfully!");
    return docRef.id;
  } catch (err) {
    console.error("Error adding event:", err);
    alert(err.message);
  }
}

// Get all events
export async function getEvents() {
  try {
    const q = query(eventsCollection, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Convert Firestore Timestamp to JS Date
        time: data.time ? data.time.toDate() : null
      };
    });
  } catch (err) {
    console.error("Error fetching events:", err);
    return [];
  }
}

// Update event
export async function updateEvent(id, newData) {
  try {
    const eventRef = doc(db, "events", id);

    // Convert time to Timestamp if updating
    if (newData.time) newData.time = Timestamp.fromDate(new Date(newData.time));

    await updateDoc(eventRef, newData);
    alert("Event updated!");
  } catch (err) {
    console.error("Error updating event:", err);
    alert(err.message);
  }
}

// Delete event
export async function deleteEvent(id) {
  try {
    const eventRef = doc(db, "events", id);
    await deleteDoc(eventRef);
    alert("Event deleted!");
  } catch (err) {
    console.error("Error deleting event:", err);
    alert(err.message);
  }
}
