
import { useState, useEffect } from 'react';
import { getSearchCourses } from "../services/coursesFirestore";
import { onSnapshot } from '@firebase/firestore';


export function useCourses({ keyword }) {
    const [loading, setLoading] = useState(false)
    const [courses, setCourses] = useState([])

    useEffect(() => {
        setLoading(true)
        const refCollection = getSearchCourses(keyword)
        const unsubscribe = onSnapshot(refCollection,
            snapshot => {
                setCourses(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                setLoading(false)
            },
            error => console.log('error')
        );
        return () => unsubscribe()
    }, [keyword])


    return {
        loading, courses
    };
}