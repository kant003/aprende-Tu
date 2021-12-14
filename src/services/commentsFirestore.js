import { getFirestore, query, collection, addDoc, doc, deleteDoc, serverTimestamp, orderBy, limit } from 'firebase/firestore';
import { app } from './auth';

const COURSES = 'course'
const COMMENTS = 'comments'

const db = getFirestore(app);

const getComentsByExperienceId = idExp => query(collection(db, COURSES, idExp, COMMENTS), orderBy("createdAt", "desc"), limit(100))
const saveComment = async (idExp, commnet) => await addDoc(collection(db, COURSES, idExp, COMMENTS), { ...commnet, createdAt: serverTimestamp() })
const removeComment = async (idExp, idComment) => await deleteDoc(doc(db, COURSES, idExp, COMMENTS, idComment))

export { removeComment, saveComment, getComentsByExperienceId }


