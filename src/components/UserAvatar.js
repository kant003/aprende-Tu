import { Avatar, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { getUser } from "../services/usersFirestore";

function UserAvatar({ idUser }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (idUser) {
            getUser(idUser).then(user => {
                setUser(user.data());
            });
        }

    }, [idUser]);
    return (
        <Tooltip title={user&&user.displayName}>
            <Avatar alt={user && user.displayName} src={user && user.photoURL} />
        </Tooltip>

    );
}
export default UserAvatar;