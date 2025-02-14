// Crear estrellas en el fondo
function createStars() {
  const starsContainer = document.createElement('div');
  starsContainer.classList.add('stars');
  document.body.appendChild(starsContainer);

  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    starsContainer.appendChild(star);
  }
}

createStars();

// Efecto de escritura
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  const typingInterval = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typingInterval);
    }
  }, speed);
}

// Botones de abrir y cerrar
const btnOpenElement = document.querySelector('#open');
const btnCloseElement = document.querySelector('#close');

btnCloseElement.disabled = true;

btnOpenElement.addEventListener('click', () => {
  btnOpenElement.disabled = true;
  btnCloseElement.disabled = false;
  const coverElement = document.querySelector('.cover');
  coverElement.classList.add('open-cover');

  setTimeout(() => {
    coverElement.style.zIndex = -1;

    const paperElement = document.querySelector('.paper');
    paperElement.classList.remove('close-paper');
    paperElement.classList.add('open-paper');

    const heartElement = document.querySelector('.heart');
    heartElement.style.display = 'block';

    // Confeti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Música de fondo
    const music = document.getElementById('backgroundMusic');
    music.play();

    // Efecto de escritura
    const mainMessageElement = document.querySelector('#mainMessage');
    const message = mainMessageElement.textContent;
    mainMessageElement.textContent = '';
    typeWriter(mainMessageElement, message, 50);

    // Mostrar imagen y botón de mensaje secreto
    const loveImage = document.getElementById('loveImage');
    loveImage.classList.remove('hidden');
    const revealButton = document.getElementById('revealMessage');
    revealButton.classList.remove('hidden');

    // Crear corazones flotantes
    createHearts();

    // Mostrar fotos aleatorias
    showRandomPhotos();
  }, 500);
});

btnCloseElement.addEventListener('click', () => {
  btnOpenElement.disabled = false;
  btnCloseElement.disabled = true;

  const coverElement = document.querySelector('.cover');
  const paperElement = document.querySelector('.paper');
  paperElement.classList.remove('open-paper');
  paperElement.classList.add('close-paper');

  setTimeout(() => {
    coverElement.style.zIndex = 0;
    coverElement.classList.remove('open-cover');

    const heartElement = document.querySelector('.heart');
    heartElement.style.display = 'none';

    // Detener la música
    const music = document.getElementById('backgroundMusic');
    music.pause();
    music.currentTime = 0;

    // Ocultar imagen y mensaje secreto
    const loveImage = document.getElementById('loveImage');
    loveImage.classList.add('hidden');
    const revealButton = document.getElementById('revealMessage');
    revealButton.classList.add('hidden');
    const secretMessage = document.getElementById('secretMessage');
    secretMessage.classList.add('hidden');

    // Eliminar corazones y fotos
    const heartsContainer = document.querySelector('.hearts-container');
    const photosContainer = document.querySelector('.photos-container');
    if (heartsContainer) heartsContainer.remove();
    if (photosContainer) photosContainer.remove();
  }, 500);
});

// Mensaje secreto
const revealButton = document.getElementById('revealMessage');
const secretMessage = document.getElementById('secretMessage');

revealButton.addEventListener('click', () => {
  secretMessage.classList.remove('hidden');
  revealButton.classList.add('hidden');
});

// Modo oscuro
const toggleThemeButton = document.getElementById('toggleTheme');

toggleThemeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    toggleThemeButton.textContent = 'Modo Claro';
  } else {
    toggleThemeButton.textContent = 'Modo Oscuro';
  }
});

// Botón de imprimir carta
const printButton = document.getElementById('printLetter');

printButton.addEventListener('click', () => {
  // Capturamos solo el contenido del mensaje de la carta
  const messageContent = document.querySelector('.paper').innerHTML;

  // Creamos un elemento temporal para el PDF
  const element = document.createElement('div');
  element.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif; color: #333;">
      <h1 style="text-align: center; color: #ff3234;">Carta de Amor</h1>
      <p style="font-size: 18px; line-height: 1.6;">${messageContent}</p>
    </div>
  `;

  // Opciones para el PDF
  const opt = {
    margin: 10,
    filename: 'carta_de_amor.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  // Generar el PDF
  html2pdf().from(element).set(opt).save();
});

// Función para crear corazones flotantes
function createHearts() {
  const heartsContainer = document.createElement('div');
  heartsContainer.classList.add('hearts-container');
  document.body.appendChild(heartsContainer);

  for (let i = 0; i < 50; i++) { // Crea 50 corazones
    const heart = document.createElement('div');
    heart.classList.add('heart-floating');
    heart.innerHTML = '♥';
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${Math.random() * 3 + 2}s`; // Duración aleatoria
    heart.style.animationDelay = `${Math.random() * 2}s`; // Retraso aleatorio
    heartsContainer.appendChild(heart);
  }
}

// Función para mostrar fotos de forma aleatoria
function showRandomPhotos() {
  const photos = [
    'foto1.jpg', // Ruta de la primera foto
    'foto2.jpg', // Ruta de la segunda foto
    'foto3.jpg', // Ruta de la tercera foto
    'foto4.jpg', // Ruta de la tercera foto
    'foto5.jpg', // Ruta de la tercera foto
    'foto6.jpg', // Ruta de la tercera foto
    'foto7.jpg', // Ruta de la tercera foto
    'foto8.jpg', // Ruta de la tercera foto
    'foto9.jpg', // Ruta de la tercera foto
    'foto10.jpg', // Ruta de la tercera foto

  ];

  const photosContainer = document.createElement('div');
  photosContainer.classList.add('photos-container');
  document.body.appendChild(photosContainer);

  photos.forEach((photo, index) => {
    const img = document.createElement('img');
    img.src = photo;
    img.classList.add('random-photo');
    img.style.left = `${Math.random() * 80}vw`; // Posición horizontal aleatoria
    img.style.top = `${Math.random() * 80}vh`; // Posición vertical aleatoria
    img.style.animationDelay = `${Math.random() * 2}s`; // Retraso aleatorio
    photosContainer.appendChild(img);

    // Hacemos que la foto desaparezca después de un tiempo
    setTimeout(() => {
      img.remove();
    }, 10000 + Math.random() * 10000); // Desaparece entre 5 y 10 segundos
  });
}