document.addEventListener("DOMContentLoaded", function (event) {

    let widget = document.querySelector('.widget_video')
    let widgetVideo = widget.querySelector('.widget_video video')
    let controlBtn = widget.querySelector('.controlBtn')

    let widgetBtn = true // true или false  включить отключить кнопку
    let widgetBtnUrl = 'https://www.google.com/' // если нужна ссылка на кнопку - указать адрес (= 'https://www.google.com/')
    let widgetBtnUrl_blank = true // открыть в новой вкладке true или false если мы указали ссылку на которую хотим перейти
    let widgetBtnClasses = ['widget_btn'] // добавить через кому строку в объект - добавить класс
    let widgetBtnText = 'google' // изменить текст кнопки

    let countClickWidget = 0
    let widgetPause = false
    widgetVideo.load()
    widgetVideo.muted = true;

    widgetVideo.addEventListener('click', () => {
        if (countClickWidget === 0) {
            widgetVideo.currentTime = 0
            playAndPause()
            controlBtn.classList.add('active')
            countClickWidget += 1
        } else {
            playAndPause()
        }
    })

    function playAndPause() {
        if (widgetPause === false) {
            console.log('Play')
            widget.classList.add('active')
            widgetVideo.play()
            widgetVideo.muted = false;
            widgetPause = true
        } else if (widgetPause === true) {
            console.log('Pause')
            widgetVideo.pause()
            widgetPause = false
        }
    }

    controlBtn.addEventListener('click', (e) => {
        let target = e.target
        if (countClickWidget > 0) {
            widget.classList.remove('active')
            widgetVideo.muted = true;
            widgetVideo.play()
            countClickWidget = 0
            widgetPause = false
            target.classList.add('active')
        } else {
            console.log(countClickWidget)
            widget.classList.add('remove')
            widgetVideo.pause()
        }
    })

    document.addEventListener('click', (e)=> {
        let target =e.target
        let clickWidget = target === widget || widget.contains(target);
        if (!clickWidget) {
            if(widget.classList.contains('active')) {
                widget.classList.remove('active')
                widgetVideo.muted = true;
                widgetVideo.play()
                countClickWidget = 0
                widgetPause = false
                controlBtn.classList.add('active')
            }
        }
    })

    if (widgetBtn) {
        let addBtn
        if (widgetBtnUrl === '') {
            addBtn = document.createElement('div')
        } else {
            addBtn = document.createElement('a')
            addBtn.setAttribute('href', `${widgetBtnUrl}`)
            if (widgetBtnUrl_blank) {
                addBtn.setAttribute('target', '_blank')
            }
        }
        widgetBtnClasses.forEach(elem => {
            addBtn.classList.add(elem)
        })
        addBtn.textContent = widgetBtnText
        widget.append(addBtn)
    }




    //Sticky header
    let stickyNav = document.querySelector('.header')
    let mainContent = document.querySelector('.main')
    document.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            stickyNav.classList.add('sticky')
            mainContent.style.padding = `${stickyNav.offsetHeight}px 0 0 0`
        } else {
            stickyNav.classList.remove('sticky')
            mainContent.style.padding = `0 0 0 0`
        }
    })
    //Sticky header THE END

    // Anchor smooth scroll to block
    let menuLinks = document.querySelectorAll('.header_nav a')
    let offsetPosition

    menuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault()
            let href = link.getAttribute('href')
            let scrollTarget = document.querySelector(`${href}`)
            let topOffset = stickyNav.offsetHeight
            // const topOffset = 0 // если не нужен отступ сверху или фиксированный отступ задать "n > 0"
            let elementPosition = scrollTarget.getBoundingClientRect().top // for native JS
            offsetPosition = elementPosition - topOffset
            scrollToAnchor(offsetPosition)
        })
    })

    function scrollToAnchor(sizeScroll) {
        window.scrollBy({
            top: sizeScroll,
            behavior: 'smooth'
        })
    }
    // Anchor scroll to block THE END

    // Add class anchor link if block view client
    let sectionToScroll = document.querySelectorAll('.article_page')
    document.addEventListener('scroll', function () {
        sectionToScroll.forEach((el)=>{
            let top  = el.offsetTop - stickyNav.offsetHeight - 1
            let bottom = top + el.offsetHeight
            let scroll = window.scrollY
            let id = el.getAttribute('id')
            el.classList.remove('current_block')
            if( scroll > top && scroll < bottom) {

                menuLinks.forEach(elemLink =>{
                    elemLink.parentElement.classList.remove('current-menu-item')
                    if (elemLink.getAttribute('href') === `#${id}`) {
                        elemLink.parentElement.classList.add('current-menu-item')
                        el.classList.add('current_block')
                    }
                })
            }

        })
    })
    // Add class anchor link if block view client THE END


    //burger control

    let mobBtn = document.querySelector('.burger_btn')
    let header_menuWr = document.querySelector('.header_nav')

    let mobBtn_info = document.querySelector('.burger_btn2')
    let header_body = document.querySelector('.header_contact')

    let main_wr = document.querySelector('.main_wr')
    let body = document.body

    function menuControl(btn, menu, hidden, overlay) {
        if ( btn.classList.contains('active') ) {
            resetBtn(btn, menu, hidden, overlay)
            return
        }

        btn.classList.add('active')
        menu.classList.add('show')
        hidden.classList.add('hidden')
        overlay.classList.add('overlay')

        document.addEventListener('click', (e) => {
            let target = e.target
            let clickBtn = target === btn || btn.contains(target)
            let clickMenu = target === menu || menu.contains(target)

            if ( !clickBtn && !clickMenu ) {
                if ( menu.classList.contains('show') ) {
                    resetBtn(btn, menu, hidden, overlay)
                }
            }
        })
    }

    function resetBtn(btn, menu, hidden, overlay) {
        btn.classList.remove('active')
        menu.classList.remove('show')
        hidden.classList.remove('hidden')
        overlay.classList.remove('overlay')
    }

    mobBtn.addEventListener('click', () => {
        setTimeout(() => {
            menuControl(mobBtn, header_menuWr, body, main_wr)
        }, 0)
    })

    mobBtn_info.addEventListener('click', () => {
        setTimeout(() => {
            menuControl(mobBtn_info, header_body, body, main_wr)
        }, 0)
    })

})