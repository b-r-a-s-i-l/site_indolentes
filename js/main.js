//scroll pelo menu

const menuItems = document.querySelectorAll('#nav-list a[href^="#"]'); //[href^="#"] para pegar somente os href com #.

menuItems.forEach(item => {
   item.addEventListener('click', scrollToIdOnClick);
})

function getScrollTopByHref(element){
    const id = element.getAttribute('href'); //busca o valor do atributo do elemento
    return document.querySelector(id).offsetTop; // busca a seção
}

function scrollToIdOnClick(event) {  //verificar qual item recebeu click
    event.preventDefault(); //retira o padrão.
    const to = getScrollTopByHref(event.target); //focar no elemento
    scrollToPosition(to);
}

function scrollToPosition(to) {
    // window.scroll({
    //   top: to,
    //   behavior: "smooth",
    // });
    smoothScrollTo(0, to, 1000);
  }
   
  /** CODIGO PRONTO
   * Smooth scroll animation
   * @param {int} endX: destination x coordinate
   * @param {int} endY: destination y coordinate
   * @param {int} duration: animation duration in ms
   */
  function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();
   
    duration = typeof duration !== 'undefined' ? duration : 400;
   
    // Easing function
    const easeInOutQuart = (time, from, distance, duration) => {
      if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
      return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };
   
    const timer = setInterval(() => {
      const time = new Date().getTime() - startTime;
      const newX = easeInOutQuart(time, startX, distanceX, duration);
      const newY = easeInOutQuart(time, startY, distanceY, duration);
      if (time >= duration) {
        clearInterval(timer);
      }
      window.scroll(newX, newY);
    }, 1000 / 60); // 60 fps
  };



