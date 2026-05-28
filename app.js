// Capturamos todos los elementos de la interfaz de la grilla de NEXUS UNTREF
const downloadBtn = document.getElementById("download-btn");
const analyzeBtn = document.getElementById("analyze-btn");
const statusLog = document.getElementById("status-log");
const analysisResult = document.getElementById("analysis-result");

// Elementos de la barra de progreso
const progressContainer = document.getElementById("progress-container");
const downloadProgress = document.getElementById("download-progress");

// 1. Inicialización inmediata del Motor de Reglas (Simulado para mantener el flujo didáctico)
downloadBtn.addEventListener("click", function() {
    downloadBtn.disabled = true;
    statusLog.innerText = "Estado: Verificando algoritmos léxicos locales...";
    progressContainer.style.display = "block";
    downloadProgress.value = 0.5;

    // Activación instantánea en 800 milisegundos sin descargar archivos pesados
    setTimeout(function() {
        downloadProgress.value = 1;
        statusLog.innerText = "Estado: ¡Motor Analítico UNTREF activado de forma local!";
        analyzeBtn.disabled = false;
    }, 800);
});

// 2. Procesamiento Léxico y Selección de Preguntas Prediseñadas
analyzeBtn.addEventListener("click", function() {
    const studentName = document.getElementById("student-name").value;
    const iaUsage = document.getElementById("ia-usage").value;
    const promptInput = document.getElementById("prompt-input").value;
    const textOutput = document.getElementById("text-output").value;

    if (!textOutput || !studentName) {
        alert("Por favor completá los campos obligatorios.");
        return;
    }

    analysisResult.innerHTML = "<p>NEXUS ejecutando análisis algorítmico en tu navegador...</p>";

    // --- MOTOR ALGORÍTMICO PREDISEÑADO ---
    // Métricas del texto ingresado
    const palabras = textOutput.trim().split(/\s+/);
    const cantidadPalabras = palabras.length;
    
    // Detección de marcadores discursivos típicos o muletillas de IA
    const marcadoresIA = ["fundamental", "crucial", "en resumen", "por lo tanto", "es importante destacar"];
    let coincidencias = 0;
    palabras.forEach(function(palabra) {
        if (marcadoresIA.includes(palabra.toLowerCase().replace(/[,.]/g, ""))) {
            coincidencias++;
        }
    });

    // Banco de Preguntas Críticas Basadas en la Pedagogía de Freire y Litwin
    let pregunta1 = "";
    let pregunta2 = "";

    // Lógica condicional según la Declaración de Transparencia del estudiante
    if (iaUsage === "heavy") {
        pregunta1 = `Tu texto contiene ${cantidadPalabras} palabras. Al delegar la generación profunda a partir de tu prompt <em>"${promptInput.substring(0, 40)}..."</em>, ¿qué tensiones conceptuales o contradicciones sentís que la IA simplificó u omitió para entregarte un texto tan pulido?`;
        pregunta2 = "Si tuvieras que defender este argumento central en una clase de la UNTREF sin pantallas de por medio, ¿qué porcentaje de esta estructura sostendrías genuinamente como tu propia postura intelectual?";
    } else if (iaUsage === "editing" || iaUsage === "brainstorm") {
        pregunta1 = `Mencionás que usaste la IA como co-piloto o asistente de corrección. Detectamos ${coincidencias} marcadores de transición estándar en tu redacción. ¿De qué manera la sugerencia del entorno algorítmico modificó el ritmo original de tu pensamiento o alteró tu propia voz autoral?`;
        pregunta2 = "¿Qué ideas o giros idiomáticos que eran puramente tuyos decidiste descartar porque el modelo te propuso una alternativa técnicamente 'más correcta'?";
    } else { // Caso "none" (Proceso puramente analógico)
        pregunta1 = `Felicidades por sostener una producción puramente analógica de ${cantidadPalabras} palabras. Si tuvieras que radicalizar tu tesis central y confrontarla con alguno de los autores que leímos en el cuatrimestre, ¿quién creés que pondría más en jaque tu argumento?`;
        pregunta2 = "¿Qué parte del proceso de escritura te generó mayor incertidumbre y cómo resolviste esa tensión sin recurrir a la asistencia automatizada?";
    }

    // Renderizado del Contrato Didáctico final en pantalla de manera inmediata
    setTimeout(function() {
        analysisResult.innerHTML = `
            <h3>Contrato Didáctico Firmado para: ${studentName}</h3>
            <p><strong>Nivel de Mediación Declarado:</strong> ${iaUsage === 'none' ? 'Ninguno (Analógico)' : iaUsage === 'brainstorm' ? 'Co-piloto' : iaUsage === 'editing' ? 'Asistente de Estilo' : 'Ensamblaje Profundo'}</p>
            <hr>
            <h4>Métricas de la Producción (Procesamiento Soberano):</h4>
            <ul>
                <li><strong>Extensión del borrador:</strong> ${cantidadPalabras} palabras analizadas.</li>
                <li><strong>Frecuencia de marcadores estandarizados:</strong> ${coincidencias} coincidencia(s).</li>
            </ul>
            <hr>
            <h4>Interpelación del Interlocutor Crítico:</h4>
            <p><strong>1.</strong> ${pregunta1}</p>
            <br>
            <p><strong>2.</strong> ${pregunta2}</p>
            <br>
            <small style="color: #7A1C2C; font-weight: bold;">Análisis 100% estático ejecutado de forma local en tu navegador. Cero dependencias externas. Soberanía garantizada.</small>
        `;
    }, 400); // Pequeño delay estético para emular el procesamiento científico
});
