import { getFirestore, query, collection, addDoc, updateDoc, getDoc, doc, deleteDoc, serverTimestamp, orderBy, limit } from 'firebase/firestore';
import { app } from './auth';

const COURSES = 'courses'
const THEMES = 'themes'
const SECTIONS = 'sections'

const db = getFirestore(app);

const getSectionsByThemeId = (idCou,idTheme) => query(collection(db, COURSES, idCou, THEMES, idTheme, SECTIONS), orderBy("createdAt", "asc"), limit(100))
const getSectionByIdSection = (idCou, idTheme, idSection) => getDoc(doc(db, COURSES, idCou, THEMES, idTheme, SECTIONS, idSection ) )
const updateSection = async (idCou, idTheme, idSection, section) => await updateDoc(doc(db, COURSES, idCou, THEMES, idTheme, SECTIONS, idSection), { ...section })
const saveSection = async (idCou, idTheme, section) => await addDoc(collection(db, COURSES, idCou, THEMES, idTheme, SECTIONS), { ...section, createdAt: serverTimestamp() })
const removeSection = async (idCou, idTheme, idSection) => await deleteDoc(doc(db, COURSES, idCou, THEMES, idTheme, SECTIONS, idSection))

export { getSectionsByThemeId, getSectionByIdSection, updateSection, saveSection, removeSection }


