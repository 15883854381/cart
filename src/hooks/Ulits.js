export function useMouse(e) {

    return new Promise((resolve) => {
        let scrollTop = e.target.scrollTop
        let windowHeight = e.target.clientHeight
        let scrollHeight = e.target.scrollHeight


        if (Math.ceil(scrollTop + windowHeight) >= parseInt(scrollHeight)) {
            resolve(true)
        } else {
            resolve(false)
        }

    })

}