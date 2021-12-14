
import { useState, useEffect } from 'react';
import { onSnapshot } from '@firebase/firestore';
import { getSectionsByThemeId, saveSection, removeSection } from "../services/sectionFirestore";


export function useSections({ idCourse, idTheme, authUser }) {
    const [loading, setLoading] = useState(false)
    const [sections, setSections] = useState([])


    const addSection = section => saveSection(idCourse, idTheme, section)

    const deleteSection = (idCourse, idTheme, idSection) => removeSection(idCourse, idTheme, idSection)

    useEffect(() => {
        setLoading(true)

        const unsubscribe = onSnapshot(getSectionsByThemeId(idCourse, idTheme),
            snapshot => {
                setSections(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                setLoading(false)
            },
            error => console.log('error')
        );
        return () => unsubscribe()
    }, [idCourse, idTheme])

    return {
        loading, sections, addSection, deleteSection
    };
}