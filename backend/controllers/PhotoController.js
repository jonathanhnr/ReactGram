const Photo = require("../models/Photo")
const User = require("../models/User")

const mongoose = require("mongoose")
const {body} = require("express-validator");

//Insert a photo, whith an user relative to it
const insertPhoto = async (req, res) => {
    const {title} = req.body
    const image = req.file.filename

    const reqUser = req.user

    const user = await User.findById(reqUser._id)

    const newPhoto = await Photo.create({
        image, title, userId: user._id, userName: user.name
    })

    // id photo was created successfuly return data
    if (!newPhoto) {
        res.status(422).json({
            errors: ["houve um problema, por favor tente novamente mais tarde"]
        })
        return;
    }

    res.status(201).json(newPhoto)
}

const deletePhoto = async (req, res) => {
    const {id} = req.params
    const reqUser = req.user

    try {
        const photo = await Photo.findById(mongoose.Types.ObjectId(id))

        if (!photo) {
            res.status(404).json({errors: ["foto nao encontrada"]})
        }

        if (!photo.userId.equals(reqUser._id)) {
            res.status(422).json({errors: ["Ocorreu um erro"]});
        }

        await Photo.findByIdAndDelete(photo._id)
        res.status(200)
            .json({
                id: photo._id,
                message: "foto excluida com sucesso"

            })

    } catch (error) {
        res.status(404).json({errors: ["foto nao encontrada"]})
        return
    }
}

const getAllPhotos = async (req, res) => {
    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec()

    return res.status(200).json(photos)


}

//get user photos
const getUserPhotos = async (req, res) => {
    const {id} = req.params
    const photos = await Photo.find({userId: id})
        .sort([["createdAt", -1]]).exec()
    res.status(200).json(photos)
}

// get photo by id
const getPhotoById = async (req, res) => {
    const {id} = req.params
    const photo = await Photo.findById(mongoose.Types.ObjectId(id))

    //check if photo exists
    if (!photo) {
        res.status(404).json({errors: ["foto nao encontrada"]})
    }
    res.status(200).json(photo)
}

//update a photo
const updatePhoto = async (req, res) => {
    const {id} = req.params
    const {title} = req.body

    const reqUser = req.user
    const photo = await Photo.findById(id)

    //check if photo exists
    if (!photo) {
        res.status(404).json({errors: ["foto nao encontrada"]})
        return;
    }

    //check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
        res.status(404).json({errors: ["nao permitido"]})
        return
    }
    if (title) {
        photo.title = title
    }
    await photo.save()
    res.status(200).json({photo, message: "foto atualizada com sucesso"})
}

//like functionality
const likePhoto = async (req, res) => {
    const {id} = req.params
    const reqUser = req.user
    const photo = await Photo.findById(id)

    //check if photo exists
    if (!photo) {
        res.status(404).json({errors: ["foto nao encontrada"]})
        return;
    }

    //check if user already liked the photo
    if (photo.likes.includes(reqUser._id)) {
        res.status(404).json({errors: ["voce ja curiu a foto"]})
        return
    }

    //put user id in likes array
    photo.likes.push(reqUser._id)

    photo.save()

    res.status(200).json({photoId: id, userId: reqUser._id, message: "a foto foi curtida"})

}

//comment functionality
const commentPhoto = async (req, res) => {

    const {id} = req.params
    const {comment} = req.body
    const reqUser = req.user
    const user = await User.findById(reqUser._id)
    const photo = await Photo.findById(id)

    //check if photo exists
    if (!photo) {
        res.status(404).json({errors: ["foto nao encontrada"]})
        return;
    }

    //put comment in the array comment
    const userComment = {
        comment,
        userName: user.name,
        userImage: user.profileImage,
        userId: user._id

    }
    photo.comments.push(userComment)

    await photo.save()

    res.status(200).json({
        comment: userComment,
        message: "o comentario foi adicionado com sucesso"
    })
}

//search photos by title
const searchPhotos = async (req, res) =>{
    const {q} = req.query
    const photos = await Photo.find({title: new RegExp(q, "i")}).exec()
    res.status(200).json(photos)
}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searchPhotos

}