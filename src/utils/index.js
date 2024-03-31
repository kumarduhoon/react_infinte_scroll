//  this is the new technique for load the data infinitly 
const observer = new IntersectionObserver((entits) => {
    entits.forEach((item) => {
        item.target.classList.toggle("show", item.isIntersecting)
        // remove the aniamtion from the top side 
        if (item.isIntersecting) {
            observer.unobserve(item.target)
        }
    })
}, {
    threshold: 1 //speed the data show on screen
}
)