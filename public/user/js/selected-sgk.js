function hideShowSgk() {
  var getElement=document.querySelector('#selectorsgk');
  if(getElement.style.display=="none") {
    getElement.style.display="block"
  }else {
    getElement.style.display="none"
  }
  var getElement=document.querySelector('#nosgk-btn');
  if(getElement.style.display=="none") {
    getElement.style.display="block"
  }else {
    getElement.style.display="none"
  }
}
function hideShowNoSgk() {
  var getElement=document.querySelector('#payment');
  if(getElement.style.display=="none") {
    getElement.style.display="block"
  }else {
    getElement.style.display="none"
  }
  var getElement=document.querySelector('#sgk-btn');
  if(getElement.style.display=="none") {
    getElement.style.display="block"
  }else {
    getElement.style.display="none"
  }
}