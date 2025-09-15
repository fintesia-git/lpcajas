var scrollpos = window.scrollY;
var header = document.getElementById("header");
var navcontent = document.getElementById("nav-content");
var navaction = document.getElementById("navAction");
var toToggle = document.querySelectorAll(".toggleColour");

document.addEventListener("scroll", function () {
    /* Apply classes for slide in bar */
    scrollpos = window.scrollY;

    if (scrollpos > 10) {
        header.classList.add("bg-white");
        navaction.classList.remove("bg-white");
        navaction.classList.add("gradient");
        navaction.classList.remove("text-gray-800");
        navaction.classList.add("text-white");
        // Use to switch toggleColour colours
        for (var i = 0; i < toToggle.length; i++) {
            toToggle[i].classList.add("text-gray-800");
            toToggle[i].classList.remove("text-white");
        }
        header.classList.add("shadow");
    } else {
        header.classList.remove("bg-white");
        navaction.classList.remove("gradient");
        navaction.classList.add("bg-white");
        navaction.classList.remove("text-white");
        navaction.classList.add("text-gray-800");
        // Use to switch toggleColour colours
        for (var i = 0; i < toToggle.length; i++) {
            toToggle[i].classList.add("text-white");
            toToggle[i].classList.remove("text-gray-800");
        }
        header.classList.remove("shadow");
    }
});
// Modal Logic
var openmodal = document.querySelectorAll('.modal-open');
for (var i = 0; i < openmodal.length; i++) {
  openmodal[i].addEventListener('click', function(event){
    event.preventDefault();
    
    // Get data from the button
    const title = this.getAttribute('data-title');
    const description = this.getAttribute('data-description');
    const image = this.getAttribute('data-image');
    
    // Populate the modal
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-description').innerText = description;
    document.getElementById('modal-image').src = image;
    document.querySelector('.modal-quote-btn').setAttribute('data-product', title);
    
    toggleModal();
  });
}

const overlay = document.querySelector('.modal-overlay');
overlay.addEventListener('click', toggleModal);

var closemodal = document.querySelectorAll('.modal-close');
for (var i = 0; i < closemodal.length; i++) {
  closemodal[i].addEventListener('click', toggleModal);
}

document.onkeydown = function(evt) {
  evt = evt || window.event;
  var isEscape = false;
  if ("key" in evt) {
    isEscape = (evt.key === "Escape" || evt.key === "Esc");
  } else {
    isEscape = (evt.keyCode === 27);
  }
  if (isEscape && document.body.classList.contains('modal-active')) {
    toggleModal();
  }
};

function toggleModal () {
  const body = document.querySelector('body');
  const modal = document.querySelector('.modal');
  modal.classList.toggle('opacity-0');
  modal.classList.toggle('pointer-events-none');
  body.classList.toggle('modal-active');
}

// Form Logic and Smooth Scroll
document.querySelectorAll('.quote-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Prevent default anchor behavior for a moment to run our script
        e.preventDefault();

        const product = this.getAttribute('data-product');
        const messageTextarea = document.getElementById('mensaje');
        
        if (product && product !== 'Consulta general') {
            messageTextarea.value = `Hola, quisiera recibir un presupuesto para el producto: ${product}. ¡Gracias!`;
        } else {
            // Clear if it's a general inquiry or already filled
            messageTextarea.value = '';
        }
        
        // Close the modal if it's open
        if (document.body.classList.contains('modal-active')) {
            toggleModal();
        }

        // Now, manually scroll to the form
        document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
    });
});