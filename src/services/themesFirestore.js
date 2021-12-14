import { getFirestore, query, collection, addDoc, updateDoc, getDoc, doc, deleteDoc, serverTimestamp, orderBy, limit } from 'firebase/firestore';
import { app } from './auth';

const COURSES = 'courses'
const THEMES = 'themes'

const db = getFirestore(app);

const getThemesByCourseId = idCou => query(collection(db, COURSES, idCou, THEMES), orderBy("createdAt", "desc"), limit(100))
const getThemeById = (idCou, id) => getDoc(doc(db, COURSES, idCou, THEMES, id) )
const updateTheme = async (idCou, id, course) => await updateDoc(doc(db, COURSES, idCou, THEMES, id), { ...course })
const saveTheme = async (idCou, theme) => await addDoc(collection(db, COURSES, idCou, THEMES), { ...theme, createdAt: serverTimestamp() })
const removeTheme = async (idCou, idTheme) => await deleteDoc(doc(db, COURSES, idCou, THEMES, idTheme))

export { getThemeById, updateTheme, removeTheme, saveTheme, getThemesByCourseId }


