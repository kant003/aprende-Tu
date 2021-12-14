
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

import { app } from './auth';

//const storage = getStorage(app);
const storage = getStorage(app);

export const uploadFile = (reference, file, setUploading, uploading) => {
    // TODO: Refactor this function, it is too big!
    const storageRef = ref(storage, reference + file.name);
   /* const metadata = {
        contentType: "image/jpg",
    };*/

    const uploadTask = uploadBytesResumable(storageRef, file/*, metadata*/);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploading({
                ...uploading,
                isUploading: true,
                progress: progress,
            });
        },
        (error) => {
            console.log(error);
        },
        async () => {
            const url = await getDownloadURL(storageRef);
            setUploading({
                ...uploading,
                isUploading: false,
                isUploaded: true,
                progress: 100,
                uploadURL: url,
            });
        }
    );
};
