import {
  collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc,
  query, orderBy, serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase.js'

const projectsRef = collection(db, 'projects')

// Documents are stored in the exact shape the components render, so there's
// no field-mapping layer needed (unlike the old backend integration).
export async function fetchProjects() {
  const q = query(projectsRef, orderBy('sortOrder', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function fetchProject(id) {
  const snap = await getDoc(doc(db, 'projects', id))
  if (!snap.exists()) throw new Error('Project not found')
  return { id: snap.id, ...snap.data() }
}

// project: { title, desc, chips: string[], link, linkLabel, status, statusLabel, sortOrder }
export function createProject(project) {
  return addDoc(projectsRef, { ...project, createdAt: serverTimestamp() })
}

export function updateProject(id, project) {
  return updateDoc(doc(db, 'projects', id), project)
}

export function deleteProject(id) {
  return deleteDoc(doc(db, 'projects', id))
}
