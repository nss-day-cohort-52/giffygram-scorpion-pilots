import { getDisplayFavorites, setDisplayFavorites  } from "../data/provider.js"

document.addEventListener( 'change', chngEvt => {
    if (chngEvt.target.name === 'showFavorites') {
        if ( showFavorites.checked ) {
            setDisplayFavorites(true)
            console.log('checked')
        } else {
            setDisplayFavorites(false)
            console.log('unchecked')
        }
    }
})

const setCheckBox = () => {
    const choice = getDisplayFavorites()
    if (choice === true) {
        return `
            <input type='checkbox' id='showFavorites' name='showFavorites' value='showFavorites' checked='checked'>
        `
    } else {
        return `
            <input type='checkbox' id='showFavorites' name='showFavorites' value='showFavorites'>
        `
    }
}

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
                ${setCheckBox()}
                <label for='showFavorites'>
                    Show only favorites
                </label>
            </div>
        </section>
    `
    return postsHTML
}
