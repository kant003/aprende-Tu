
import { useState, useEffect } from 'react';
import { onSnapshot } from '@firebase/firestore';
import { getThemesByCourseId, saveTheme, removeTheme } from "../services/themesFirestore";


export function useThemes({ idCourse, authUser }) {
    const [loading, setLoading] = useState(false)
    const [themes, setThemes] = useState([])


    const addTheme = theme => saveTheme(idCourse, theme)

    const deleteTheme = (idCourse, idTheme) => removeTheme(idCourse, idTheme)

    useEffect(() => {
        setLoading(true)

        const unsubscribe = onSnapshot(getThemesByCourseId(idCourse),
            snapshot => {
                setThemes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                setLoading(false)
            },
            error => console.log('error')
        );
        return () => unsubscribe()
    }, [idCourse])

    return {
        loading, themes, addTheme, deleteTheme
    };
}