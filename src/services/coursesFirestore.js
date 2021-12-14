import { getFirestore, query, collection, getDocs, getDoc, addDoc, deleteField, updateDoc, doc, deleteDoc, serverTimestamp, where, orderBy, limit } from 'firebase/firestore';
import { app } from './auth';
const COURSES = 'courses'
const EXPERIENCES = 'courses'
const USERS = 'users'

const db = getFirestore(app);

const getUserRef = uid => doc(db, USERS, uid);


// TODO No usado
const getCoursesSnapshot = async () => await getDocs(query(collection(db, EXPERIENCES)))

const addCourse = async course => await addDoc(collection(db, COURSES), { ...course, createdAt: serverTimestamp() })
const updateCourse = async (id, course) => await updateDoc(doc(db, COURSES, id), { ...course })
const removeCourse = async id => await deleteDoc(doc(db, COURSES, id))

const getCourse = async id => await getDoc(doc(db, COURSES, id))
const getCourseRef = id => doc(db, COURSES, id);


const getAllExperiences = uid => query(collection(db, EXPERIENCES), where("userRef", "!=", getUserRef(uid), orderBy("createdAt", "desc"), limit(100)))
const getSearchCourses = (keyword) => {
    const q = keyword ? query(collection(db, COURSES),  where("title", "==", keyword), orderBy("createdAt", "desc"), limit(100))
        :
        query(collection(db, COURSES),  orderBy("createdAt", "desc"), limit(100))
    return q
}

const getAllExperiencesByUid = uid => query(collection(db, EXPERIENCES), where("userRef", "==", getUserRef(uid), orderBy("createdAt", "desc"), limit(100)))


const followCourse = async (idCourse, userRef, value) => await updateDoc(doc(db, COURSES, idCourse), { [`followers.${userRef}`]: value });
const followingCourse = async (idCourse, userRef, value) => await updateDoc(doc(db, COURSES, idCourse), { [`following.${userRef}`]: value });

const unFollow = async (idCourse, userRef) => await updateDoc(doc(db, COURSES, idCourse), { [`following.${userRef}`]: deleteField() });
const follow = async (idCourse, userRef) => await updateDoc(doc(db, COURSES, idCourse), { [`following.${userRef}`]: false });

const unFollowCourse = async (idCourse, userRef) => await updateDoc(doc(db, COURSES, idCourse), { [`followers.${userRef}`]: deleteField() });


export { getCourseRef,getUserRef, getSearchCourses, getAllExperiencesByUid, unFollowCourse, getAllExperiences, getCourse, getCoursesSnapshot, addCourse, updateCourse,removeCourse,followCourse,followingCourse,unFollow,follow }


