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
    const postsArr = applicationState.posts.map((post) => ({...post}))
    const sortByTimeStamp = postsArr => {
        const sorter = (a, b) => {
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        }
        postsArr.sort(sorter)
    }
    sortByTimeStamp(postsArr)
    return postsArr
}