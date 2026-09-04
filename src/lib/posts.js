import {
  collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase.js'

const postsRef = collection(db, 'posts')

export async function fetchPublishedPosts() {
  const q = query(postsRef, where('published', '==', true), orderBy('publishedAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function fetchPostBySlug(slug) {
  const q = query(postsRef, where('slug', '==', slug), where('published', '==', true))
  const snap = await getDocs(q)
  if (snap.empty) throw new Error('Post not found')
  const d = snap.docs[0]
  return { id: d.id, ...d.data() }
}

// Admin only — security rules require auth for unfiltered/draft-inclusive reads.
export async function fetchAllPostsAdmin() {
  const q = query(postsRef, orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

async function isSlugTaken(slug, excludeId) {
  const q = query(postsRef, where('slug', '==', slug))
  const snap = await getDocs(q)
  return snap.docs.some((d) => d.id !== excludeId)
}

async function uniqueSlug(baseSlug, excludeId) {
  let slug = baseSlug
  let suffix = 1
  while (await isSlugTaken(slug, excludeId)) {
    slug = `${baseSlug}-${suffix++}`
  }
  return slug
}

function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// post: { title, slug?, excerpt, content, coverImageUrl, published }
export async function createPost(post) {
  const baseSlug = post.slug?.trim() ? slugify(post.slug) : slugify(post.title)
  const slug = await uniqueSlug(baseSlug)
  return addDoc(postsRef, {
    ...post,
    slug,
    createdAt: serverTimestamp(),
    publishedAt: post.published ? serverTimestamp() : null,
  })
}

export async function updatePost(id, post) {
  const baseSlug = post.slug?.trim() ? slugify(post.slug) : slugify(post.title)
  const slug = await uniqueSlug(baseSlug, id)

  const existing = await getDoc(doc(db, 'posts', id))
  const wasPublished = existing.exists() && existing.data().published

  const payload = { ...post, slug }
  if (post.published && !wasPublished) {
    payload.publishedAt = serverTimestamp()
  }
  return updateDoc(doc(db, 'posts', id), payload)
}

export function deletePost(id) {
  return deleteDoc(doc(db, 'posts', id))
}
