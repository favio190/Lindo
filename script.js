const quotes = [
    "El amor no se trata de cuántos días, meses o años han pasado juntos. Se trata de cuánto se aman cada día.",
    "Contigo, cada momento es un recuerdo hermoso.",
    "Eres la razón detrás de mi sonrisa y la paz en mi corazón.",
    "El amor verdadero no tiene final feliz. El amor verdadero nunca termina.",
    "Te amo más que las palabras pueden expresar."
];

const quoteElement = document.getElementById('quote');
let currentQuoteIndex = 0;

// Cambiar el título inicial de la pestaña
document.title = "Te amo💗✨";

function updateQuote() {
    quoteElement.classList.add('fade-out');
    setTimeout(() => {
        quoteElement.innerText = quotes[currentQuoteIndex];
        quoteElement.classList.remove('fade-out');
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    }, 1000); // Tiempo de espera para el desvanecimiento
}

// Iniciar el cambio de citas cada 20 segundos
updateQuote();
setInterval(updateQuote, 7000);

const audio = document.getElementById('audio');
const musicToggleButton = document.getElementById('music-toggle');

let audioContext;
let analyser;

// Inicializar el contexto de audio y el analizador
function initializeAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 256;
}

// Configurar el canvas
const canvas = document.getElementById('audio-visualizer');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Dibujar el espectrómetro
function draw() {
    requestAnimationFrame(draw);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const barWidth = (canvas.width / dataArray.length) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
        barHeight = dataArray[i] / 2;
        ctx.fillStyle = 'rgba(255, 0, 0, 0.8)'; // Color rojo
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
    }
}

// Configurar el evento de reproducción de música
musicToggleButton.addEventListener('click', () => {
    if (audio.paused) {
        audioContext.resume().then(() => {
            audio.play().then(() => {
                musicToggleButton.innerText = 'Detener Música';
                draw(); // Iniciar la visualización al reproducir música
            }).catch(error => {
                console.error("Error al reproducir música:", error);
                alert("No se puede reproducir la música. Asegúrate de que el archivo existe y es compatible.");
            });
        });
    } else {
        audio.pause();
        musicToggleButton.innerText = 'Reproducir Música';
    }
});

// Inicializar audio y añadir evento de cambio de título
initializeAudio();
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = "Vuelve mi niña😢";
    } else {
        document.title = "✨💗Te amo💗✨"; // Restablecer el título al regresar
    }
});
