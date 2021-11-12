const apiURL = "http://localhost:8088"
const applicationElement = document.querySelector(".giffygram")


const applicationState = {
    currentUser: {},
    feed: {
        chosenUser: null,
        displayFavorites: false,
        displayMessages: false,
        newMessage: false 
    },
    "users": [],
    "posts": [],
    "likes": [],
    "messages": []
}

export const setNewMessageState = () =>{
    applicationState.feed.newMessage ? applicationState.feed.newMessage = false : applicationState.feed.newMessage = true
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getFeed = () => {
    return applicationState.feed
}
export const getUsers = () => {
    return applicationState.users.map((user) => ({ ...user }))
}

export const getLikes = () => {
    return applicationState.likes.map((like) => ({ ...like }))
}

export const getMessages = () => {
    return applicationState.messages.map((message) => ({ ...message }))
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

export const fetchMessages = () => {
    return fetch(`${apiURL}/messages`)
        .then(response => response.json())
        .then(
            (messagesArray) => {
                // Store the external state in application state
                applicationState.messages = messagesArray
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

export const sendMessage = (userPostCreation) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userPostCreation)
    }
    return fetch(`${apiURL}/messages`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        })
        .then( () => {
            setNewMessageState()
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
        
        const modifiedCopyOfObj = { ...post }

        const foundUser = applicationState.users.find((user) => user.id === post.userId)
        
        if (foundUser) {
            modifiedCopyOfObj.userName = `${foundUser.name}`      
        }
        
        return modifiedCopyOfObj

    }) 
    
    if (applicationState.feed.displayFavorites === false) {

        
        return postsArr

    } else {
        
        const filteredPostsArr = postsArr.filter((modifiedCopyOfObj) => {
        
            const favorites = likedposts()
        
            const foundFavorite = favorites.find((favorite) => {
        
                return favorite.postId === modifiedCopyOfObj.id    
        
            })
        
            if (foundFavorite) {
                return true
            } else {
                return false
            }
                
        })

        return filteredPostsArr

    }


    
}

export const likedposts = () => {
    const likes = getLikes()
    const user = parseInt(localStorage.getItem("gg_user"))
    const likesByUser = likes.filter((like) => {
        return user === like.userId
    })

    return likesByUser

}

export const getDisplayFavorites = () => {
    return applicationState.feed.displayFavorites
}

export const setDisplayFavorites = (choice) => {
    applicationState.feed.displayFavorites = choice
    applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
}
