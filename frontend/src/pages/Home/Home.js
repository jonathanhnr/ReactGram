import "./Home.css"

import {useAuth} from "../../hooks/useAuth";
import {Navigate} from 'react-router-dom'

//components
import LikeContainer from "../../components/LikeContainer";
import PhotoItem from "../../components/PhotoItem";
import {Link} from "react-router-dom"

//hooks
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useResetComponentMessage} from "../../hooks/useResetComponentMessage";

//redux
import {getPhotos, like} from "../../slices/photoSlice";

const Home = () => {
const {auth, loading: authLoading} = useAuth()

    const dispatch = useDispatch()

    const resetMessage = useResetComponentMessage(dispatch)

    const {user} = useSelector((state) => state.auth)
    const {photos, loading} = useSelector((state) => state.photo)


    useEffect(() => {
        dispatch(getPhotos())
    },[dispatch])

    const handleLike = (photo) => {
    dispatch(like(photo._id))

        resetMessage()
    }
    if(loading ){
        return <p>Carregando...</p>
    }

    if(!authLoading && !auth){
        return <Navigate to="/login"/>
    }

    return (
        <div id={"home"}>
            {photos && photos.map((photo) => (
                <div key={photo._id}>
                    <PhotoItem photo={photo}/>
                    <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
                    <Link className={"btn"} to={`/photos/${photo._id}`}>Ver mais</Link>
                </div>
            ))}
            {photos && photos.length === 0 && (
                <h2 className="no-photos">
                    Ainda nao a fotos publicadas, <Link to={`/users/${user._id}`}>clique aqui</Link>
                </h2>
            )}
        </div>
    )
}
export default Home;