import {
  collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy,
} from 'firebase/firestore'
import { db } from './firebase.js'

const experienceRef = collection(db, 'experience')

// item: { company, title, startDate, endDate, bullets: string[], sortOrder }
export async function fetchExperience() {
  const q = query(experienceRef, orderBy('sortOrder', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export function createExperience(item) {
  return addDoc(experienceRef, item)
}

export function updateExperience(id, item) {
  return updateDoc(doc(db, 'experience', id), item)
}

export function deleteExperience(id) {
  return deleteDoc(doc(db, 'experience', id))
}
