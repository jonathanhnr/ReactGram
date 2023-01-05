import {api, requestConfig} from "../utils/config";


//get users datails
const profile = async (data, token) => {
    const config = requestConfig("GET", data, token)
    try {
        const res = await fetch(api + "/users/profile", config)
            .then((res) => res.json())
            .catch((err) => err)

        return res
    } catch (error) {
        console.log(error)
    }
}

//update users details
const updateProfile = async (data, token) => {
    const config = requestConfig("PUT", data, token, true)
    try {
        const res = fetch(api + "/users/", config)
            .then((re) => re.json())
            .catch((err) => err)
        return res;
    } catch (error) {
        console.log(error)
    }

}

const getUsersDetails = async (id) => {
    const config = requestConfig("GET")
    try {
        const res = fetch(api + "/users/" + id, config)
            .then((re) => re.json())
            .catch((err) => err)
        return res
    }catch (error){
        console.log(error)
    }

}

const userService = {
    profile, updateProfile,getUsersDetails
}
export default userService
