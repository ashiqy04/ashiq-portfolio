import {
  collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy,
} from 'firebase/firestore'
import { db } from './firebase.js'

const stackRef = collection(db, 'stack')

// item: { category: 'Backend'|'Frontend'|'Mobile'|..., title, desc, tags: string[], sortOrder }
export async function fetchStack() {
  const q = query(stackRef, orderBy('sortOrder', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export function createStackItem(item) {
  return addDoc(stackRef, item)
}

export function updateStackItem(id, item) {
  return updateDoc(doc(db, 'stack', id), item)
}

export function deleteStackItem(id) {
  return deleteDoc(doc(db, 'stack', id))
}
