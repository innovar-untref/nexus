// Definimos el modelo ultraliviano (360MB) usando el objeto global de la librería webllm
// Esto garantiza descargas en segundos incluso con conexiones lentas
const selectedModel = "SmolLM2-360M-Instruct-q4f16_1-MLC";
let engine = null;

// Capturamos todos los elementos de la interfaz de la grilla de NEXUS UNTREF
const downloadBtn = document.getElementById("download-btn");
const analyzeBtn = document.getElementById("analyze-btn");
const statusLog = document.getElementById("status-log");
const analysisResult = document.getElementById("analysis-result");

// 1. Función para descargar e inicializar el modelo ultraliviano en el navegador
downloadBtn.addEventListener("click", function() {
    downloadBtn.disabled = true;
    statusLog.innerText = "Estado: Inicializando motor WebGPU en tu navegador...";
    
    // Accedemos a la librería a través del objeto global 'webllm' cargado por el HTML
    webllm.CreateGenericEngine()
        .then(function(createdEngine) {
            engine = createdEngine;
            
            // Callback para mostrar el progreso real de la descarga en pantalla
            engine.setInitProgressCallback(function(report) {
                statusLog.innerText = report.text;
            });
            
            // Cargamos el modelo seleccionado en la memoria local de la computadora
            return engine.reload(selectedModel);
        })
        .then(function() {
            statusLog.innerText = "Estado: ¡NEXUS cargado con éxito en tu computadora!";
            analyzeBtn.disabled = false; // Habilitamos el botón para analizar el trabajo
        })
        .catch(function(error) {
            statusLog.innerText = "Error: Tu hardware o navegador no soporta WebGPU.";
            console.error(error);
        });
});

// 2. Función para procesar el texto bajo la pedagogía de la pregunta
analyzeBtn.addEventListener("click", function() {
    const studentName = document.getElementById("student-name").value;
    const iaUsage = document.getElementById("ia-usage").value;
    const promptInput = document.getElementById("prompt-input").value;
    const textOutput = document.getElementById("text-output").value;

    // Validación de campos obligatorios del formulario
    if (!textOutput || !studentName) {
        alert("Por favor completá los campos obligatorios.");
        return;
    }

    analysisResult.innerHTML = "<p>NEXUS está pensando de forma soberana en tu navegador...</p>";
    
    // Prompt del sistema estructurado bajo la intencionalidad cognitiva y didáctica de la universidad
    const systemPrompt = "Actúas como una interfaz de IA ética inspirada en la pedagogía de la pregunta de Freire y Edith Litwin para la Universidad Nacional de Tres de Febrero. Tu objetivo no es corregir, ni calificar, ni reescribir el texto. Debes devolver un análisis crítico breve con 2 preguntas que incomoden genuinamente al estudiante, desafiando sus argumentos y obligándolo a reflexionar sobre lo que delegó a la máquina y cómo rescatar su propia voz autoral. El estudiante dice que usó la IA para: " + iaUsage + ", y declaró este prompt: \"" + promptInput + "\".";

    const messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Este es mi trabajo práctico: " + textOutput }
    ];

    // Ejecutamos la inferencia de forma 100% local usando Promesas clásicas
    engine.chat.completions.create({ messages: messages })
        .then(function(reply) {
            const aiResponse = reply.choices[0].message.content;
            
            // Renderizamos la devolución formativa integrada al Contrato Didáctico
            analysisResult.innerHTML = `
                <h3>Contrato Didáctico Firmado para: ${studentName}</h3>
                <p><strong>Declaración de uso:</strong> ${iaUsage}</p>
                <hr>
                <h4>Interpelación del Interlocutor Crítico:</h4>
                <p>${aiResponse}</p>
                <br>
                <small style="color: #7A1C2C; font-weight: bold;">Procesado 100% de manera local. Soberanía de datos garantizada por NEXUS UNTREF.</small>
            `;
        })
        .catch(function(error) {
            analysisResult.innerHTML = "<p>Error al procesar la respuesta del modelo local.</p>";
            console.error(error);
        });
});
