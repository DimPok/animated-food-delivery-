const mainTag = document.querySelector("main")
const bodyTag = document.querySelector("body")
const figcaptions = document.querySelectorAll("figcaption")

const cursor = document.querySelector("div.cursor")
const cursorQuoater = document.querySelector("div.cursor-quoater")

const mq = window.matchMedia("(prefers-reduced-motion: no-preference) and (min-width: 600px)")


if(mq.matches) {
    mainTag.style.position = "fixed"
    mainTag.style.top = "0px"
    mainTag.style.left = "0px"
    mainTag.style.width = "98%"


    const observer = new IntersectionObserver(entries => {
       entries.forEach(entry => {
         if(entry.intersectionRatio > 0.25) {
            entry.target.classList.add("in-view")
         }
       })
    }, {
       threshold: [0, 0.25, 1] 
    })

    figcaptions.forEach(caption => {
        observer.observe(caption)
    })
    
    
    let currentScroll = 0
    let aimScroll = 0
    
    const changeScroll = function() {
        bodyTag.style.height = mainTag.offsetHeight + "px"
    
        currentScroll = currentScroll + (aimScroll - currentScroll) * 0.05
    
        mainTag.style.top = (-1 * currentScroll) + "px"

        figcaptions.forEach(caption => {
            const box = caption.getBoundingClientRect()
            const midY = box.y + box.height / 2
            const midScreen = window.innerHeight / 2
            const diff = midY - midScreen


            const images = caption.querySelectorAll("img")

            images.forEach((image, index) => {
                const speed = 0.1 + 0.05 * index
                image.style.top = (diff * speed) + "px"
            })
        })
    
        requestAnimationFrame(changeScroll)
    }
    
    
    window.addEventListener("scroll", function() {
        aimScroll = window.pageYOffset
    })
    
    changeScroll()


    document.addEventListener("mousemove", function(event) {
        cursor.style.left = event.pageX + "px"
        cursor.style.top = event.pageY + "px"
    })


    let cursorCurrentX = 0
    let cursorCurrentY = 0
    let cursorQuoaterCurrentX = 0
    let cursorQuoaterCurrentY = 0
    let cursorAimX = 0
    let cursorAimY = 0

    const changeCursor = function() {

        cursorCurrentX = cursorCurrentX + (cursorAimX - cursorCurrentX) * 0.1
        cursorCurrentY = cursorCurrentY + (cursorAimY - cursorCurrentY) * 0.1

        cursor.style.left = cursorCurrentX + "px"
        cursor.style.top = cursorCurrentY + "px"


        cursorQuoaterCurrentX = cursorQuoaterCurrentX + (cursorAimX - cursorQuoaterCurrentX) * 0.05
        cursorQuoaterCurrentY = cursorQuoaterCurrentY + (cursorAimY - cursorQuoaterCurrentY) * 0.05

        cursorQuoater.style.left = cursorQuoaterCurrentX + "px"
        cursorQuoater.style.top = cursorQuoaterCurrentY + "px"


        requestAnimationFrame(changeCursor)

    }

    document.addEventListener("mousemove", function(event) {
        cursorAimX = event.pageX
        cursorAimY = event.pageY
    })

    changeCursor()
}

