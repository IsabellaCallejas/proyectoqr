let qrCode;
let data;

function preload() {
  partyConnect("wss://deepstream-server-1.com", "mi-proyecto", "main");
  data = partyLoadShared("data");
}

function setup() {
  noCanvas();
  // Inicializa el contador en 0 si es la primera vez que se carga la página.
  if (data.scanCount === undefined) {
    data.scanCount = 0;
  }
  
  // Incrementa el contador con cada escaneo/visita.
  data.scanCount += 1;
  
  // Llama a la función para generar el código QR.
  updateQRCode();
}

function updateQRCode() {
  // Elimina cualquier código QR anterior.
  const qrContainer = document.getElementById('qr-container');
  qrContainer.innerHTML = '';
  
  // El texto o URL que contendrá el nuevo código QR.
  let qrUrl = "https://tu-pagina-web.com/scan/" + data.scanCount;
  
  // Genera el nuevo código QR en el contenedor.
  qrCode = new QRCode(qrContainer, {
    text: qrUrl,
    width: 256,
    height: 256,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H 
  });
  
  // Muestra el número de escaneos.
  const scanDisplay = document.createElement('h1');
  scanDisplay.innerText = `Este es el escaneo número ${data.scanCount}`;
  qrContainer.prepend(scanDisplay);
}