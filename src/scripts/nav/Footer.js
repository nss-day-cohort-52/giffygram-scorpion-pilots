export const Footer = () => {


    let postsHTML =`
        <section class='footer__nav'>
            <div class='footer__item'>
                POSTS SINCE ...
            </div>
            <div class='footer__item'>
                POSTS BY USER ...
            </div>
            <div class='footer__item'>
                <input type='checkbox' id=showFavorites' name='showFavorites' value='showFavorites'>
                <label for='showFavorites'>
                    Show only favorites
                </label>
            </div>
        </section>
    `
    return postsHTML
}
