import { getPosts } from "../data/provider.js"

export const PostList = () => {

    const posts = getPosts()

    const displayPosts = (post) => {

        //convert timestamp to date
        const getDate = () => {
            const date = new Date(post.timestamp)
            return date.toLocaleDateString('en-US')
        }

        //convert posts data to visible html

        return `
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
        `
    }
    
    // Show main main UI
    
    let postsHTML =`
        <section class='post'>
            ${
                posts.map(displayPosts).join("")
            }
        </section>
    `
    return postsHTML
}
