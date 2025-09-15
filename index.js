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
        e.preventDefault();
        const product = this.getAttribute('data-product');
        const messageTextarea = document.getElementById('mensaje');
        
        if (product && product !== 'Consulta general') {
            messageTextarea.value = `Hola, quisiera recibir un presupuesto para el producto: ${product}. ¡Gracias!`;
        }
        
        if (document.body.classList.contains('modal-active')) {
            toggleModal();
        }
        document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
    });
});

// Nueva Lógica para el envío del formulario
const form = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async function(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const formProps = Object.fromEntries(formData);
  
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;

  // Ocultamos mensajes anteriores
  successMessage.classList.add('hidden');
  errorMessage.classList.add('hidden');
  
  submitButton.innerHTML = 'Enviando...';
  submitButton.disabled = true;

  try {
    const response = await fetch('/api/enviar-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formProps),
    });

    if (response.ok) {
      successMessage.classList.remove('hidden'); // Mostramos mensaje de éxito
      form.reset();
    } else {
      errorMessage.classList.remove('hidden'); // Mostramos mensaje de error
    }
  } catch (error) {
    errorMessage.classList.remove('hidden'); // Mostramos mensaje de error
  } finally {
    submitButton.innerHTML = originalButtonText;
    submitButton.disabled = false;
  }
});