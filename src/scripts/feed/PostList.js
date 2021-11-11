import { addtolikes, getLikes, getPosts, likedposts, deletelike, deletePosts } from "../data/provider.js"

document.addEventListener(
    "click",
    clickevent => {
        if (clickevent.target.id.startsWith("fav_icon")) {
            const [, postId] = clickevent.target.id.split("--")
            const user = parseInt(localStorage.getItem("gg_user"))

            const allLikes = likedposts()
            if (allLikes.length !== 0) {
                const alreadyliked = allLikes.filter((like) => like.postId === parseInt(postId) && like.userId === user)

                alreadyliked.length > 0 ? deletelike(alreadyliked[0].id) : addtolikes({ userId: user, postId: parseInt(postId) })
            } else {
                addtolikes({ userId: user, postId: parseInt(postId) })
            }
        }
    }
)

const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", click => {
    if (click.target.id.startsWith("blockPost")) {
        const [, postId] = click.target.id.split("--")
        deletePosts(parseInt(postId))
    }
})

export const PostList = () => {

    const user = parseInt(localStorage.getItem("gg_user"))
    const posts = getPosts()
    const likes = getLikes()
    const user = parseInt(localStorage.getItem("gg_user"))

    const likesByUser = likes.filter((like) => {
        return user === like.userId
    })


    const displayPosts = (post) => {

        const likedpost = likesByUser.find((like) => { return like.postId === post.id })


        //convert timestamp to date
        const getDate = () => {
            const date = new Date(post.timestamp)
            return date.toLocaleDateString('en-US')
        }


        //convert posts data to visible html

        return `
        <div>
            <div class='post__remark'>
                ${post.title}
            </div>
            <div class='post__image'>
                <img src="${post.imageURL}" alt="" />
            </div>
            <div class='post__tagline'>
                ${post.description}
            </div>
            <div class='post__date'>
                Posted by ${post.userName} on ${getDate()}
            </div>
            <div id="fav_${post.id}">
            ${likedpost ? `<img id="fav_iconyellow--${post.id}" class="faviconyellow_${post.id} fav_icon post__actions"src="${"./../images/favorite-star-yellow.svg"}" alt="favorite icon" />` : `<img id="fav_iconblank--${post.id}" class="faviconblank__${post.id} fav_icon post__actions"src="${"./../images/favorite-star-blank.svg"}" alt="favorite icon" />`}
            </div>
            ${user === post.userId ? `<img id="blockPost--${post.id}" class="actionIcon" src="./images/block.svg">` : ""}
            </div>
            `
    




    // Show main main UI

    let postsHTML = `
        <section class='post'>
            ${posts.map(displayPosts).join("")
        }
        </section>
    `
    return postsHTML
}
}
