function animate(element, animationName, callback ) {
  console.log("ANIMATION: " + animationName);
  //callback = callback || null;
  const prefix = 'animate__';
  
  element.classList.add('animate__animated', prefix + animationName);

  if(!callback) return;

  const cleanup = (cb) => {
    element.removeEventListener('animationend', cb);
    callback = null;
  }

  let animationEnd = (e) => {
    //console.log("CALLBACK");
    element.classList.remove('animate__animated', prefix + animationName);
    if(callback){
      callback(e);
    }  
    cleanup(this);
  }

  // cleanup
  element.addEventListener('animationend', animationEnd);
}

function togglePanel(){
  const panel = document.querySelector('#overlay #panel-right');
  const overlay = document.querySelector('#overlay');
  const isOpen = overlay.classList.contains('open');
  let animation;

  if(isOpen){
    animation = 'slideOutRight';
  } else {
    animation = 'slideInRight';
  }
 
  overlay.classList.add("animating"); 

  let callback = (evt) => {
    overlay.classList.remove("animating"); 
    overlay.classList.toggle("open", !isOpen); 
    panel.classList.toggle("open", !isOpen);
    console.log(overlay);
  }

  animate(panel, animation, callback);
}

function toggleFooter(){
  const footer = document.querySelector('#footer ');
  const chevron = document.querySelector('#footer #footer-trigger .icon i ');
  const isOpen = footer.classList.contains('open');
  let animation;

  if(isOpen){
    animation = 'slideOutDown';
    chevron.classList.replace('mdi-chevron-down', 'mdi-chevron-up');
  } else {
    animation = 'slideInUp';
    chevron.classList.replace('mdi-chevron-up', 'mdi-chevron-down');
  }
 
  const callback = (evt) => {
    footer.classList.toggle("open", !isOpen); 
  }

  animate(footer, animation, callback);
}

function toggleUtils(selector){
  const otherSelector = selector == '.grid' ? '.guides' : '.grid';
  const otherElement = document.querySelector(otherSelector);
  const otherElementHidden = otherElement.classList.contains('hidden');

  const element = document.querySelector(selector);
  const elementHidden = element.classList.contains('hidden');

  const container = document.querySelector('#design-utils');
  const containerHidden = element.classList.contains('hidden');
  
  element.classList.toggle("hidden", !elementHidden); 

  const containerActive = otherElementHidden && element.classList.contains('hidden') && !containerHidden;
  container.classList.toggle("hidden", containerActive); 

}

function main(e){
  /* Reference the elements we care about */
  const panelTrigger = document.querySelector('#overlay #panel-right .icon.close');
  const altPanelTrigger = document.querySelector('.btn.panel-trigger');
  const footerTrigger = document.querySelector('#footer-trigger .icon');
  const sidenavTrigger = document.querySelector('#sidenav');
  const gridTrigger = document.querySelector('.btn.grid-trigger');
  const guidesTrigger = document.querySelector('.btn.guides-trigger');

  // Setup Events
  panelTrigger.onclick = (e) => {
    togglePanel();
  }

  altPanelTrigger.onclick = (e) => {
    togglePanel();
  }

  footerTrigger.onclick = (e) => {
    toggleFooter();
  }

  gridTrigger.onclick = (e) => {
    toggleUtils('.grid');
  }

  guidesTrigger.onclick = (e) => {
    toggleUtils('.guides');
  }

}

document.addEventListener("DOMContentLoaded", function(){
  // Handler when the DOM is fully loaded
  main();
});

