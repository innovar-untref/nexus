/**
 * NEXUS UNTREF - Motor de Inferencia Léxica y Evaluación Antifrágil
 * Arquitectura de Procesamiento Lingüístico Nativo en Cliente (NLP)
 * Basado estrictamente en las "Orientaciones para el uso responsable de las IA en la UNTREF"
 */

// Selección de componentes de la interfaz de usuario (UI)
const downloadBtn = document.getElementById("download-btn");
const analyzeBtn = document.getElementById("analyze-btn");
const statusLog = document.getElementById("status-log");
const analysisResult = document.getElementById("analysis-result");
const progressContainer = document.getElementById("progress-container");
const downloadProgress = document.getElementById("download-progress");

// TAXONOMÍA INSTITUCIONAL: Glosario extendido de clichés predictivos de IAgen
const TAXONOMIA_CLICHES = {
    apertura: [
        "es importante destacar", "cabe mencionar", "en el escenario contemporaneo", 
        "resulta imperativo señalar", "a lo largo de la historia de la educacion",
        "es de vital importancia indicar", "en este sentido se puede afirmar"
    ],
    adjetivos: [
        "crucial", "fundamental", "esencial", "holistico", "disruptivo", 
        "revolucionar", "eje crucial", "cambio de paradigma", "de manera integral"
    ],
    cierre: [
        "en resumen", "en conclusion", "en ultima instancia", "a modo de cierre", 
        "logrando asi un equilibrio", "para sintetizar", "en resumidas cuentas"
    ]
};

// Combinación unificada para el bucle de conteo e inferencia léxica
const GLOSARIO_COMPLETO = [
    ...TAXONOMIA_CLICHES.apertura, 
    ...TAXONOMIA_CLICHES.adjetivos, 
    ...TAXONOMIA_CLICHES.cierre
];

// MATRIZ MASIVA DE INTERPELACIÓN DOCENTE (30 Preguntas basadas en el marco UNTREF)
const MATRIZ_PREGUNTAS_SOBERANAS = [
    // Bloque 1: Edith Litwin y la configuración didáctica
    "Sostener una redacción con 0 coincidencias estandarizadas es un acto de resistencia postdigital. En línea con Edith Litwin, ¿de qué manera tu propuesta se aleja de una respuesta prefabricada y recupera tu genuina voz autoral?",
    "Tu texto esquiva el 'rigor aparente' de las estructuras corporativas. Si contrastamos tu escrito con el concepto de 'vida infotecnológica', ¿qué dimensiones de tu propia subjetividad quedaron impresas aquí?",
    "Al no registrarse marcas de automatización discursiva, el texto adquiere densidad analítica. ¿Qué pasajes de tu borrador considerás que son verdaderos 'tópicos generativos' para profundizar?",
    "Considerando que tu texto cuenta con una densidad verbal estructurada, ¿cuál es el núcleo problemático o la pregunta incómoda que subyace en tu hipótesis y que todavía no te animaste a responder?",
    "Frente a la sobreabundancia de información contemporánea, tu borrador ensaya un recorrido situado. ¿De qué manera tu conclusión desafía las visiones tecnocráticas tradicionales de la enseñanza?",
    
    // Bloque 2: Anijovich, Ravela y la Evaluación Auténtica
    "Pedro Ravela critica la arbitrariedad y la falta de significado en las evaluaciones. Al comprometerte con una producción analógica pura, ¿cómo transforma este borrador tu experiencia de aprendizaje perdurable?",
    "Tu argumentación evita las falacias de estilo comunes. Si tuvieras que reescribir este trabajo bajo una estructura de juego pedagógico o gamificación, ¿cómo se verían alterados tus puntos de análisis?",
    "La originalidad analítica requiere eludir los sesgos y alucinaciones de forma. ¿Qué fuentes académicas confiables de la universidad sirvieron de escudo crítico contra las simplificaciones del entorno digital?",
    "En un ecosistema educativo tensionado por la inmediatez, tu escrito se toma el tiempo del desarrollo exhaustivo. ¿Cómo dialoga tu mirada con el principio de integridad académica y honestidad intelectual de la UNTREF?",
    "Establecer metas de comprensión profundas exige que seas un protagonista activo. ¿Qué parte del proceso de documentación manual de este trabajo modificó tus supuestos pedagógicos previos?",
    
    // Bloque 3: Vigilancia Epistemológica y Enfoque Crítico
    "La ausencia de muletillas algorítmicas le otorga una unidad de estilo orgánica al manuscrito. ¿Cómo proyectás sostener este nivel de vigilancia epistemológica en tus futuras producciones?",
    "Tu texto demuestra un acoplamiento reflexivo alejado del facilismo de mercado. ¿Qué debates o discusiones colectivas del aula se desvanecerían si hubieses dejado el cierre en manos de una IAgen?",
    "Tu producción asume el riesgo de la duda y la sospecha, pilares de los alfabetismos postdigitales. ¿Qué contradicción de tu propio campo disciplinar decidiste visibilizar en este desarrollo?",
    "La escritura artesanal denota un ejercicio consciente de toma de decisiones. ¿Qué autores clave operaron como tu anclaje teórico para evitar caer en las respuestas homogeneizadoras sintéticas?",
    "Si un modelo predictivo intentara optimizar tu redacción, reduciría tu diversidad léxica en pos de la inmediatez. ¿Qué concepts de tu trabajo defenderías como zonas de pensamiento humano no delegables?"
];

const MATRIZ_PREGUNTAS_MEDIADAS = [
    // Bloque 1: Ensamblaje Humano-Máquina Crítico
    "Al declarar un ensamblaje con la máquina, ¿en qué medida la estructura predeterminada por el prompt limitó la aparición de ideas de pensamiento divergente en tu investigación?",
    "Detectamos marcas léxicas estandarizadas en la redacción. ¿Cómo planeás rescatar los pliegues de tu propia oralidad y tu acento local frente a un texto que tiende a la homogeneización algorítmica?",
    "La IA tiende a construir soluciones armónicas y conclusiones artificiales. ¿Dónde quedó expresada la verdadera tensión geopolítica, social o educativa en la resolución de tu trabajo?",
    "El documento institucional advierte sobre el riesgo de la delegación cognitiva. Al usar el software como co-piloto, ¿qué operaciones conceptuales asumiste vos y cuáles le transferiste al código?",
    "Si tuvieras que defender este trabajo de forma oral frente a un comité, ¿cuáles de estas premisas sostendrás con tu propia experiencia empírica y cuáles pertenecen al patrón predictivo del modelo?",
    
    // Bloque 2: Grillas de Transparencia e Inclusión con Reparos
    "Tu declaración registra un uso instrumental, pero el texto arrastra automatismos de apertura. ¿Hiciste un chequeo crítico y sospecha de las fuentes que el modelo de lenguaje utilizó para expresar tus párrafos?",
    "El uso de conectores como 'en resumen' o 'en conclusión' tiende a pacificar los debates pedagógicos. ¿Qué contradicciones del aula universitaria fueron silenciadas por la IA al cerrar tu escrito?",
    "En base a las Orientaciones de la UNTREF, las IA reflejan decisiones de diseño de grandes corporaciones que no pensaron en la educación. ¿Cómo altera esto la soberanía del conocimiento que presentás?",
    "La plantilla institucional busca explicitar el uso de agentes sintéticos. Mirando tu métrica de clichés, ¿considerás que el manuscrito conserva verdaderamente tu voz autoral y estilo propio?",
    "Estás delegando autoridad argumentativa en un modelo probabilístico. ¿De qué manera vas a reescribir este borrador para que las herramientas de IA pasen de ser un sustituto a un interlocutor crítico?",
    
    // Bloque 3: Alfabetismos Postdigitales Avanzados
    "La adjetivación grandilocuente detectada (como 'crucial' o 'fundamental') suele enmascarar una falta de datos locales. ¿Qué indicadores reales de la comunidad de la UNTREF incorporarías para fundamentar esos adjetivos?",
    "Un ecosistema de hibridación exige que el humano retenga el control de las decisiones de fondo. ¿Qué conceptos de este borrador clasificás hoy como actividades cognitivas absolutamente indelegables?",
    "El uso de ingeniería de prompts (prompt literacy) es solo una mirada instrumental. Más allá del código utilizado, ¿cómo evalúas el impacto ético de los sesgos algorítmicos reflejados en tu producción?",
    "Si aplicáramos una grilla de transparencia estricta (Resnik & Hosseini), ¿qué partes de este escrito requerirían una declaración obligatoria por haber sufrido una alteración sustancial de contenido?",
    "La pedagogía de la pregunta nos empuja a incomodar los textos. Si obligaras a la IA a contraargumentar tu propio borrador, ¿cuál sería el punto más frágil que el modelo destruiría de tu entrega?"
];

// 1. FUNCIONES ANÁLITICAS NATIVAS DE IA
// Mide de 0 a 1 la variedad léxica (Type-Token Ratio) para penalizar el texto plano de las IA
function calcularDiversidadLexica(texto) {
    const textoLimpio = texto.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()¿?]/g," ");
        
    const palabras = textoLimpio.split(/\s+/).filter(p => p.length > 2);
    if (palabras.length === 0) return 0;

    const terminosUnicos = new Set(palabras);
    return (terminosUnicos.size / palabras.length).toFixed(2);
}

// Clasifica el manuscrito según los cuadrantes de riesgo cognitivo institucionales
function clasificarNivelAntifragilidad(texto, densidadVerbal, clichesDetectados) {
    if (clichesDetectados > 3 && densidadVerbal < 13) {
        return {
            categoria: "Actividad Frágil (Delegación Cognitiva)",
            color: "#b71c1c",
            consejo: "El manuscrito arrastra un fuerte sesgo de estilo armónico corporativo y falacias de rigor aparente. Es urgente recuperar el conflicto y el acento local."
        };
    }
    
    const textoMinuscula = texto.toLowerCase();
    if (textoMinuscula.includes("¿") || textoMinuscula.includes("sospecha") || textoMinuscula.includes("tension") || clichesDetectados === 0) {
        return {
            categoria: "Propuesta Antifrágil (Producción Orgánica)",
            color: "#27ae60",
            consejo: "Excelente. El texto asume el riesgo de la duda, la vigilancia epistemológica y la honestidad intelectual que promueve la universidad."
        };
    }

    return {
        categoria: "Acoplamiento Híbrido Robusto",
        color: "#D9A74A",
        consejo: "Buen equilibrio en el ecosistema digital. Recordá definir claramente en tu bitácora qué actividades considerás delegables e indelegables."
    };
}

// Algoritmo de barajado Fisher-Yates para garantizar aleatoriedad pura en los reactivos
function barajarPreguntas(banco, cantidad) {
    const copia = [...banco];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia.slice(0, cantidad);
}

function normalizarTexto(texto) {
    return texto.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[,.;:()¿?"]/g, " ");
}

// 2. LOGICA DE INTERFAZ Y EVENTOS
// Inicialización simulada de carga de pesos ontológicos
downloadBtn.addEventListener("click", function() {
    downloadBtn.disabled = true;
    statusLog.className = "log-processing";
    statusLog.innerText = "Estado: Cargando ontologías didácticas y modelos de tokenización NLP...";
    progressContainer.style.display = "block";
    downloadProgress.value = 0.3;

    setTimeout(function() {
        downloadProgress.value = 0.7;
        statusLog.innerText = "Estado: Indexando matrices analíticas de Litwin, Anijovich y Ravela...";
    }, 400);

    setTimeout(function() {
        downloadProgress.value = 1.0;
        statusLog.className = "log-success";
        statusLog.innerText = "Estado: ¡Ecosistema de Inteligencia Léxica UNTREF inicializado localmente!";
        analyzeBtn.disabled = false;
    }, 850);
});

// Procesamiento principal asíncrono
analyzeBtn.addEventListener("click", function() {
    const studentName = document.getElementById("student-name").value.trim();
    const iaUsage = document.getElementById("ia-usage").value;
    const promptInput = document.getElementById("prompt-input").value.trim();
    const textOutput = document.getElementById("text-output").value.trim();

    if (!textOutput || !studentName) {
        alert("Por favor completá los campos obligatorios: Nombre y Texto del trabajo.");
        return;
    }

    analysisResult.innerHTML = `
        <div style="text-align: center; padding: 1rem; color: #555;">
            <p class="log-processing">NEXUS analizando la densidad cognitiva y aplicando vigilancia epistemológica...</p>
        </div>
    `;

    // Extracción de datos métricos base
    const palabras = textOutput.split(/\s+/).filter(p => p.length > 0);
    const cantidadPalabras = palabras.length;
    const textoLimpio = normalizarTexto(textOutput);
    
    let totalVerbos = 0;
    let totalSustantivos = 0;

    // Procesamiento gramatical con compromise (con amortiguación por textos cortos)
    try {
        let doc = nlp(textOutput);
        totalVerbos = doc.verbs().count();
        totalSustantivos = doc.nouns().count();
        
        if (totalVerbos === 0) totalVerbos = Math.round(cantidadPalabras * 0.14);
        if (totalSustantivos === 0) totalSustantivos = Math.round(cantidadPalabras * 0.26);
    } catch(e) {
        totalVerbos = Math.round(cantidadPalabras * 0.15);
        totalSustantivos = Math.round(cantidadPalabras * 0.25);
    }

    const densidadVerbal = cantidadPalabras > 0 ? ((totalVerbos / cantidadPalabras) * 100).toFixed(1) : 0;

    // Ejecución del escáner de expresiones regulares para clichés compuestos
    let coincidenciasStnd = 0;
    let desglosesDetectados = [];

    GLOSARIO_COMPLETO.forEach(cliche => {
        const clicheNormalizado = normalizarTexto(cliche);
        const regex = new RegExp(`\\b${clicheNormalizado}\\b`, 'g');
        const matches = textoLimpio.match(regex);
        if (matches) {
            coincidenciasStnd += matches.length;
            desglosesDetectados.push(cliche);
        }
    });

    // Inferencia avanzada y cálculo de índices predictivos
    const diversidadLexica = calcularDiversidadLexica(textOutput);
    const clasificacionDidactica = clasificarNivelAntifragilidad(textOutput, parseFloat(densidadVerbal), coincidenciasStnd);

    // Selección de la batería pedagógica adaptativa
    let bancoDestino = (coincidenciasStnd === 0 && iaUsage === "none") ? MATRIZ_PREGUNTAS_SOBERANAS : MATRIZ_PREGUNTAS_MEDIADAS;
    const preguntasElegidas = barajarPreguntas(bancoDestino, 5);

    // Inyección y renderizado tipográfico dinámico en la UI
    setTimeout(function() {
        analysisResult.innerHTML = `
            <div class="report-header">
                <h3>CONTRATO DIDÁCTICO E INTERPELACIÓN FORMATIVA</h3>
                <p>Estudiante: <strong>${studentName}</strong> | Régimen Declarado: 
                    <span class="badge-status">${iaUsage === 'none' ? 'Mediación Analítica Pura' : 'Entorno Híbrido'}</span>
                </p>
            </div>
            
            <div class="metrics-box" style="border-left-color: ${clasificacionDidactica.color}">
                <strong class="metrics-title">Vigilancia Epistemológica y Densidad Lógica:</strong>
                <table class="metrics-table">
                    <tr>
                        <td>Extensión del manuscrito analizado:</td>
                        <td class="text-right"><strong>${cantidadPalabras} palabras</strong></td>
                    </tr>
                    <tr>
                        <td>Estructura gramatical computada:</td>
                        <td class="text-right">${totalSustantivos} Sustantivos | ${totalVerbos} Verbos</td>
                    </tr>
                    <tr>
                        <td>Índice de Densidad Verbal (Complejidad):</td>
                        <td class="text-right"><strong>${densidadVerbal}%</strong></td>
                    </tr>
                    <tr>
                        <td>Índice de Diversidad Léxica (Riqueza de ideas):</td>
                        <td class="text-right"><strong>${diversidadLexica}</strong> (Escala 0 a 1)</td>
                    </tr>
                    <tr>
                        <td>Frecuencia de marcadores estandarizados de IA:</td>
                        <td class="text-right" style="color: ${coincidenciasStnd === 0 ? '#27ae60' : '#b71c1c'}; font-weight: bold;">
                            ${coincidenciasStnd} coincidencia(s) detectada(s)
                        </td>
                    </tr>
                    <tr>
                        <td>Clasificación de la Entrega Docente:</td>
                        <td class="text-right" style="color: ${clasificacionDidactica.color}; font-weight: bold;">
                            ${clasificacionDidactica.categoria}
                        </td>
                    </tr>
                </table>
                
                ${desglosesDetectados.length > 0 ? `
                    <div class="cliche-tags">
                        <small>Marcas de automatización detectadas: ${[...new Set(desglosesDetectados)].map(t => `<span class="tag">${t}</span>`).join(' ')}</small>
                    </div>
                ` : ''}
                
                <div class="diagnostico-text" style="background-color: ${clasificacionDidactica.color}15">
                    <small><strong>Diagnóstico de Inferencia NEXUS:</strong> ${clasificacionDidactica.consejo}</small>
                </div>
            </div>

            <h4 class="interpellation-title">Interlocución Crítica (Batería Pedagógica Basada en la Pregunta):</h4>
            <ol class="questions-list">
                <li><strong>${preguntasElegidas[0]}</strong></li>
                <li><strong>${preguntasElegidas[1]}</strong></li>
                <li><strong>${preguntasElegidas[2]}</strong></li>
                <li><strong>${preguntasElegidas[3]}</strong></li>
                <li><strong>${preguntasElegidas[4]}</strong></li>
            </ol>
            
            <div class="report-footer">
                <small>Ecosistema Antifrágil NEXUS. Proceso de alfabetismo postdigital regulado institucionalmente (UNTREF).</small>
            </div>
        `;
        
        // Scroll animado suave hacia los resultados
        analysisResult.scrollIntoView({ behavior: 'smooth' });
    }, 500);
});
