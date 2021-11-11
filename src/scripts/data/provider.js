const apiURL = "http://localhost:8088"
const applicationElement = document.querySelector(".giffygram")


const applicationState = {
    currentUser: {},
    feed: {
        chosenUser: null,
        displayFavorites: false,
        displayMessages: false
    },
    "users": [],
    "posts": [],
    "likes": []
}

export const getUsers = () => {
    return applicationState.users.map((user) => ({ ...user }))
}

export const getLikes = () => {
    return applicationState.likes.map((like) => ({ ...like }))
}

export const fetchUsers = () => {
    return fetch(`${apiURL}/users`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.users = serviceRequests
            }
        )
}

export const fetchLikes = () => {
    return fetch(`${apiURL}/likes`)
        .then(response => response.json())
        .then(
            (likesArray) => {
                // Store the external state in application state
                applicationState.likes = likesArray
            }
        )
}

export const sendPostMessage = (userPostCreation) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userPostCreation)
    }
    return fetch(`${apiURL}/posts`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deletelike = (id) => {
    return fetch(`${apiURL}/likes/${id}` ,{ method: "DELETE"})
        .then(() => {
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const addtolikes = (userlikedpost) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userlikedpost)
    }
    return fetch(`${apiURL}/likes`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
// create copy of POSTS from db to appState & serve copy in getPosts

export const fetchPosts = () => {
    return fetch(`${apiURL}/posts`)
        .then(res => res.json())
        .then(
            (postsArray) => {
                // Store the external state in application state
                applicationState.posts = postsArray
            }
        )
}


export const deletePosts = (id) => {
    return fetch(`${apiURL}/posts/${id}`, { method: "DELETE" })
        .then(
            () => {
                applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}



export const getPosts = () => {

    const postsArr = applicationState.posts.map((post) => {

        const modifiedCopyOfArray = { ...post }

        const foundUser = applicationState.users.find((user) => user.id === post.userId)

        if (foundUser) {
            modifiedCopyOfArray.userName = `${foundUser.name}`
        }

        return modifiedCopyOfArray

    })

    const sortByTimeStamp = modifiedCopyOfArray => {

        const sorter = (a, b) => {

            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        }
        postsArr.sort(sorter)
    }

    sortByTimeStamp()

    return postsArr

}

export const likedposts = () => {
    const likes = getLikes()
    const user = parseInt(localStorage.getItem("gg_user"))
    const likesByUser = likes.filter((like) => {
        return user === like.userId
    })

    return likesByUser

}