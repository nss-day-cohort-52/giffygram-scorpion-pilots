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
    "posts": []
}

export const getUsers = () => {
    return applicationState.users.map((user) => ({...user}))
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
    .then( () => {
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

export const getPosts = () => {
    return applicationState.posts.map((post) => ({...post}))
}

export const deletePosts = (id) => {
    return fetch(`${apiURL}/posts/${id}`, { method: "DELETE" })
        .then(
            () => {
                applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
            }
        ) 
}