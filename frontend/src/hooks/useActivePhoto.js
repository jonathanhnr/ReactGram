import { useSelector } from 'react-redux';

export function useActivePhoto(manualId = null) {
  return useSelector(state => {
    const {photos, activePhoto = null} = state.photo
    if (photos.length <= 0) return null
    return photos.find(photo => {
      if (manualId) {
        return photo._id === manualId
      }
      return photo._id === activePhoto;
    })
  })
}