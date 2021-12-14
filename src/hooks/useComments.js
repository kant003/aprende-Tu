
import { useState, useEffect } from 'react';
import { onSnapshot } from '@firebase/firestore';
import { getComentsByExperienceId, saveComment, removeComment } from "../services/commentsFirestore";


export function useComments({ idExp, authUser }) {
    const [loading, setLoading] = useState(false)
    const [comments, setComents] = useState([])


    const addComment = comment => saveComment(idExp, comment)

    const deleteComment = (idExp, idComment) => removeComment(idExp, idComment)

    useEffect(() => {
        setLoading(true)

        const unsubscribe = onSnapshot(getComentsByExperienceId(idExp),
            snapshot => {
                setComents(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                setLoading(false)
            },
            error => console.log('error')
        );
        return () => unsubscribe()
    }, [idExp])

    return {
        loading, comments, addComment, deleteComment
    };
}