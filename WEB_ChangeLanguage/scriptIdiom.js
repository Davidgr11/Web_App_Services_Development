// Función para cambiar el idioma
function changeLanguage(language, data) {
    document.getElementById('welcome-heading').textContent = data[language].heading;
    document.getElementById('welcome-paragraph').textContent = data[language].paragraph;
}

// Cargar el archivo lang.json
fetch('lang.json')
    .then(response => response.json())
    .then(data => {
        // Asignar eventos a los botones después de cargar los datos
        document.getElementById('btn1').addEventListener('click', function() {
            changeLanguage('en', data);
        });
        document.getElementById('btn2').addEventListener('click', function() {
            changeLanguage('zh', data);
        });
        document.getElementById('btn3').addEventListener('click', function() {
            changeLanguage('ar', data);
        });
        document.getElementById('btn4').addEventListener('click', function() {
            changeLanguage('es', data);
        });
        document.getElementById('btn5').addEventListener('click', function() {
            changeLanguage('hi', data);
        });
    })
    .catch(error => console.error('Error loading language data:', error));
