document.querySelector("#compose").style.left = document.querySelector("section").firstElementChild.offsetLeft + "px"
window.onresize = function() {
  document.querySelector("#compose").style.left = document.querySelector("section").firstElementChild.offsetLeft + "px"
}
