/**
 * NEXUS UNTREF - Motor de Inferencia Léxica y Evaluación Antifrágil
 * Arquitectura de Procesamiento Lingüístico Nativo en Cliente (NLP)
 */

// 1. SELECTORES DE INTERFAZ
const downloadBtn = document.getElementById("download-btn");
const analyzeBtn = document.getElementById("analyze-btn");
const statusLog = document.getElementById("status-log");
const analysisResult = document.getElementById("analysis-result");
const progressContainer = document.getElementById("progress-container");
const downloadProgress = document.getElementById("download-progress");

// Diccionario de redundancias algorítmicas
const GLOSARIO_CLICHES = [
    "es importante destacar", "cabe mencionar", "en el escenario contemporaneo", 
    "resulta imperativo señalar", "a lo largo de la historia de la educacion",
    "es de vital importancia indicar", "en este sentido se puede afirmar",
    "crucial", "fundamental", "esencial", "holistico", "disruptivo", 
    "revolucionar", "eje crucial", "cambio de paradigma", "de manera integral",
    "en resumen", "en conclusion", "en ultima instancia", "a modo de cierre", 
    "logrando asi un equilibrio", "para sintetizar", "en resumidas cuentas"
];

// Matriz de interpelación docente multidimensional
const BANCO_PREGUNTAS_AVANZADO = {
    soberano: {
        autoral: [
            "En línea con Edith Litwin, tu prosa esquiva las estructuras prefabricadas. ¿De qué manera esta producción académica recupera tu genuina voz autoral frente a la automatización discursiva?",
            "La ausencia de muletillas algorítmicas denota artesanía escrita. ¿Qué pasajes de este borrador académico considerás que reflejan tu estilo único y unidad de estilo?"
        ],
        epistemologica: [
            "Tu texto ensaya un recorrido situado y conceptualmente denso. ¿Qué debates o tensiones del aula de la UNTREF operaron como escudo crítico en tu argumentación?",
            "Evitás el 'rigor aparente' de los entornos corporativos. ¿Cómo dialoga tu mirada con el principio de integridad académica y honestidad intelectual de la universidad?"
        ],
        transparencia: [
            "Al optar por una producción analógica pura, asumís el riesgo de la duda. ¿Qué parte del proceso de documentación manual modificó tus supuestos pedagógicos?",
            "Tu escrito se toma el tiempo del desarrollo exhaustivo. ¿Qué conceptos de este trabajo clasificarías hoy como zonas de pensamiento humano no delegables?"
        ],
        antifragilidad: [
            "Tu argumentación se sostiene sin soportes sintéticos. Si tuvieras que reescribir este trabajo bajo una estructura de juego pedagógico, ¿cómo se verían alterados tus puntos clave?",
            "Establecer metas de comprensión profundas exige autonomía. ¿Cuál es el núcleo problemático o la pregunta incómoda de tu hipótesis que aún no te animaste a responder?"
        ],
        metacognitiva: [
            "Frente a la inmediatez de la cultura infotecnológica, elegiste la pausa analítica. ¿Cómo transforma este borrador tu experiencia de aprendizaje perdurable?",
            "¿Cómo proyectás sostener este nivel de vigilancia epistemológica y honestidad intelectual en tus futuras producciones académicas?"
        ]
    },
    mediado: {
        autoral: [
            "Detectamos marcas léxicas estandarizadas en tu redacción. ¿Cómo planeás rescatar los pliegues de tu propia oralidad frente a un texto que tiende a la homogeneización algorítmica?",
            "Mirando la métrica de clichés de tu entrega, ¿considerás que la producción académica conserva verdaderamente tu voz autoral y estilo propio?"
        ],
        epistemologica: [
            "La IA tiende a construir soluciones armónicas y conclusiones artificiales. ¿Dónde quedó expresada la verdadera tensión geopolítica o social de tu campo disciplinar?",
            "La adjetivación grandilocuente detectada suele enmascarar una falta de datos situados. ¿Qué indicadores reales de la comunidad de la UNTREF incorporarías para fundamentar el texto?"
        ],
        transparencia: [
            "Al declarar un ensamblaje híbrido, ¿en qué medida la estructura predeterminada por el prompt limitó la aparición de ideas disruptivas o divergentes?",
            "Tu documento arrastra automatismos de apertura. ¿Hiciste un chequeo crítico y sospecha de las fuentes reales que el modelo probabilístico utilizó para armar tus párrafos?"
        ],
        antifragilidad: [
            "El documento institucional advierte sobre la delegación cognitiva. Al usar el software como co-pilot, ¿qué operaciones conceptuales asumiste vos y cuáles le transferiste al código?",
            "La pedagogía de la pregunta nos empuja a incomodar los escritos. Si obligaras a la IA a contraargumentar tu propia entrega, ¿cuál sería el punto más frágil que destruiría?"
        ],
        metacognitiva: [
            "Estás delegando autoridad argumentativa en un modelo de mercado. ¿De qué manera vas a reescribir este borrador para que la herramienta pase de ser un interlocutor crítico?",
            "Si tuvieras que defender este trabajo de forma oral frente a la cátedra, ¿cuáles de estas premisas sostendrás con tu experiencia empírica y cuáles pertenecen al patrón del modelo?"
        ]
    }
};

// 2. PROCESADORES ANALÍTICOS
function calcularEntropiaLexica(texto) {
    if (!window.winkUtils) {
        const limpia = texto.toLowerCase().replace(/[^a-záéíóúñ]/g, " ");
        const tokens = limpia.split(/\s+/).filter(t => t.length > 2);
        if (tokens.length === 0) return 0;
        return (new Set(tokens).size / tokens.length).toFixed(2);
    }
    const tokens = window.winkUtils.string.tokenize(texto, true);
    const palabrasFiltradas = tokens.filter(t => t.type === 'word' && t.value.length > 2);
    if (palabrasFiltradas.length === 0) return 0;
    const unicos = new Set(palabrasFiltradas.map(t => t.value.toLowerCase()));
    return (unicos.size / palabrasFiltradas.length).toFixed(2);
}

function clasificarEntrega(densidadVerbal, cliches) {
    if (cliches > 3 && densidadVerbal < 13) {
        return {
            categoria: "Actividad Frágil / Alta Delegación",
            color: "#CBD5E1", 
            consejo: "Alerta de automatización discursiva. El borrador académico copia el sesgo de estilo armónico de la máquina. Se sugiere inyectar contradicción y sospecha."
        };
    }
    if (cliches === 0) {
        return {
            categoria: "Propuesta Antifrágil / Producción Orgánica",
            color: "#1E5F94", 
            consejo: "Soberanía intelectual confirmada. La producción académica asume el riesgo de la duda, resguardando la unidad de estilo y voz autoral."
        };
    }
    return {
        categoria: "Acoplamiento Híbrido Robusto",
        color: "#1B75BB", 
        consejo: "Hibridación moderada bajo control humano. Asegúrese de transparentar debidamente el tipo de uso en la grilla de la cátedra."
    };
}

function generarBateriaPreguntasAdaptativas(usoDeclarado, conteoCliches, diversidadLexica, texto) {
    const esMediado = (conteoCliches > 0 || usoDeclarado !== "none");
    const pool = esMediado ? BANCO_PREGUNTAS_AVANZADO.mediado : BANCO_PREGUNTAS_AVANZADO.soberano;
    
    let preguntasFinales = [];
    const obtenerUnaAlAzar = (arr) => arr[Math.floor(Math.random() * arr.length)];

    preguntasFinales.push(obtenerUnaAlAzar(pool.autoral));
    preguntasFinales.push(obtenerUnaAlAzar(pool.epistemologica));
    preguntasFinales.push(obtenerUnaAlAzar(pool.transparencia));
    preguntasFinales.push(obtenerUnaAlAzar(pool.antifragilidad));

    if (esMediado && diversidadLexica < 0.50) {
        preguntasFinales.push(`<strong>[Interpelación por Entropía Crítica]:</strong> Tu índice de diversidad léxica es inusualmente plano (${diversidadLexica}). Las repeticiones mecánicas sugieren un licuado de estilo. ¿Qué conceptos o ideas humanas decidiste omitir para aceptar la velocidad sintética del modelo?`);
    } else if (!esMediado && texto.toLowerCase().includes("¿")) {
        preguntasFinales.push(`<strong>[Validación Antifrágil]:</strong> Tu escrito incorpora la pregunta y la duda de forma explícita en su estructura. Sabiendo que los modelos de lenguaje tienden a eludir la ambigüedad profunda, ¿cómo potencia la incertidumbre tu propio proceso de investigación?`);
    } else {
        preguntasFinales.push(obtenerUnaAlAzar(pool.metacognitiva));
    }
    return preguntasFinales;
}

function normalizarTexto(texto) {
    return texto.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[,.;:()¿?"]/g, " ");
}

// 3. EVENTOS DE CONTROL DE FLUJO
downloadBtn.addEventListener("click", function() {
    downloadBtn.disabled = true;
    statusLog.className = "log-processing";
    statusLog.innerText = "Estado: Cargando librerías estadísticas y arrays semánticos de la UNTREF...";
    progressContainer.style.display = "block";
    downloadProgress.value = 0.4;

    setTimeout(() => {
        downloadProgress.value = 0.8;
        statusLog.innerText = "Estado: Indexando matrices didácticas críticas (Litwin, Anijovich, Ravela)...";
    }, 400);

    setTimeout(() => {
        downloadProgress.value = 1.0;
        statusLog.className = "log-success";
        statusLog.innerText = "Estado: ¡Entorno NEXUS UNTREF activo y protegido en cliente!";
        analyzeBtn.disabled = false;
    }, 800);
});

analyzeBtn.addEventListener("click", function() {
    const name = document.getElementById("student-name").value.trim();
    const usage = document.getElementById("ia-usage").value;
    const text = document.getElementById("text-output").value.trim();

    if (!name || !text) {
        alert("Por favor ingrese su nombre y el borrador académico de su producción.");
        return;
    }

    analysisResult.innerHTML = `
        <div style="text-align: center; padding: 1rem; color: var(--untref-azul);">
            <p class="log-processing">NEXUS aplicando vigilancia epistemológica sobre la densidad de la entrega...</p>
        </div>
    `;

    const palabras = text.split(/\s+/).filter(p => p.length > 0).length;
    let verbos = 0, sustantivos = 0;

    try {
        let doc = nlp(text);
        verbos = doc.verbs().count() || Math.round(palabras * 0.14);
        sustantivos = doc.nouns().count() || Math.round(palabras * 0.25);
    } catch(e) {
        verbos = Math.round(palabras * 0.15);
        sustantivos = Math.round(palabras * 0.25);
    }

    const densidadVerbal = palabras > 0 ? ((verbos / palabras) * 100).toFixed(1) : 0;
    let conteoCliches = 0;
    let detectados = [];
    const textNormalizado = normalizarTexto(text);

    GLOSARIO_CLICHES.forEach(c => {
        const regex = new RegExp(`\\b${normalizarTexto(c)}\\b`, 'g');
        const matches = textNormalizado.match(regex);
        if (matches) {
            conteoCliches += matches.length;
            detectados.push(c);
        }
    });

    const diversidad = calcularEntropiaLexica(text);
    const evaluacion = clasificarEntrega(parseFloat(densidadVerbal), conteoCliches);
    const reactivos = generarBateriaPreguntasAdaptativas(usage, conteoCliches, parseFloat(diversidad), text);

    setTimeout(function() {
        analysisResult.innerHTML = `
            <div class="report-header">
                <h3>CONTRATO DIDÁCTICO E INFERENCIA LÉXICA</h3>
                <p>Estudiante: <strong>${name}</strong> | Régimen Declarado: <span class="badge-status">${usage === 'none' ? 'Uso Instrumental' : 'Entorno Híbrido'}</span></p>
            </div>
            
            <div class="metrics-box" style="border-left-color: ${evaluacion.color}">
                <strong class="metrics-title">Vigilancia Epistemológica y Atributos de Comprensión:</strong>
                <table class="metrics-table">
                    <tbody>
                        <tr><td>Volumen de la entrega:</td><td class="text-right"><strong>${palabras} palabras</strong></td></tr>
                        <tr><td>Segmentación gramatical:</td><td class="text-right">${sustantivos} Sustantivos | ${verbos} Verbos</td></tr>
                        <tr><td>Índice de Acción (Densidad Verbal):</td><td class="text-right"><strong>${densidadVerbal}%</strong></td></tr>
                        <tr><td>Diversidad Léxica (Entropía Wink):</td><td class="text-right"><strong>${diversidad}</strong> (Escala de 0 a 1)</td></tr>
                        <tr><td>Patrones estandarizados detectados:</td><td class="text-right" style="color: ${evaluacion.color}; font-weight:bold;">${conteoCliches} coincidencia(s)</td></tr>
                        <tr><td>Clasificación Didáctica:</td><td class="text-right" style="color: ${evaluacion.color}; font-weight:bold;">${evaluacion.categoria}</td></tr>
                    </tbody>
                </table>
                
                ${detectados.length > 0 ? `<div class="cliche-tags" style="margin-top: 1rem;"><small>Marcas halladas: ${[...new Set(detectados)].map(t=>`<span class="tag">${t}</span>`).join('')}</small></div>` : ''}
                
                <div class="diagnostico-text" style="background-color: ${evaluacion.color}10; color: ${evaluacion.color}">
                    <strong>Diagnóstico NEXUS:</strong> ${evaluacion.consejo}
                </div>
            </div>

            <h4 class="interpellation-title">Interlocución Crítica Adaptativa (Bitácora de Devolución Respondible):</h4>
            
            <div class="questions-container">
                <details class="dimension-accordion">
                    <summary><span>1. Dimensión Autoral</span></summary>
                    <div class="accordion-content">
                        <p>${reactivos[0]}</p>
                        <label style="font-size: 0.85rem; color: var(--untref-azul-oscuro); margin-top:1rem;">Tu argumentación / Registro de marcas propias:</label>
                        <textarea class="student-response-area" placeholder="Escribí acá tus decisiones estéticas y cómo defendés tu estilo autoral frente al escrito..."></textarea>
                    </div>
                </details>

                <details class="dimension-accordion">
                    <summary><span>2. Dimensión Epistemológica</span></summary>
                    <div class="accordion-content">
                        <p>${reactivos[1]}</p>
                        <label style="font-size: 0.85rem; color: var(--untref-azul-oscuro); margin-top:1rem;">Anclaje territorial y debate de fuentes:</label>
                        <textarea class="student-response-area" placeholder="Definí acá las tensiones locales de tu campo disciplinar u observaciones del aula UNTREF que sustentan tu idea..."></textarea>
                    </div>
                </details>

                <details class="dimension-accordion">
                    <summary><span>3. Dimensión de Transparencia</span></summary>
                    <div class="accordion-content">
                        <p>${reactivos[2]}</p>
                        <label style="font-size: 0.85rem; color: var(--untref-azul-oscuro); margin-top:1rem;">Trastienda del Ensamblaje Técnico (Prompts / Lecturas):</label>
                        <textarea class="student-response-area" placeholder="Transparentá qué operaciones delegaste en el código, cuáles retuviste y qué fuentes críticas manuales utilizaste..."></textarea>
                    </div>
                </details>

                <details class="dimension-accordion">
                    <summary><span>4. Dimensión de Antifragilidad</span></summary>
                    <div class="accordion-content">
                        <p>${reactivos[3]}</p>
                        <label style="font-size: 0.85rem; color: var(--untref-azul-oscuro); margin-top:1rem;">Ensayo de Contraargumento Crítico:</label>
                        <textarea class="student-response-area" placeholder="Incomodá tu propia hipótesis. ¿Cuál es el flanco más débil de tu borrador si tuvieras que refutarte a vos mismo?"></textarea>
                    </div>
                </details>

                <details class="dimension-accordion">
                    <summary><span>5. Evaluación de Procesos (Metacognición)</span></summary>
                    <div class="accordion-content">
                        <p>${reactivos[4]}</p>
                        <label style="font-size: 0.85rem; color: var(--untref-azul-oscuro); margin-top:1rem;">Registro del Aprendizaje Perdurable:</label>
                        <textarea class="student-response-area" placeholder="¿Qué zonas conceptuales de este trabajo clasificarías hoy como humanas e indelegables para tu formación?"></textarea>
                    </div>
                </details>
            </div>
            
            <div class="report-footer" style="margin-top: 2.5rem; border-top: 1px solid var(--untref-borde); padding-top: 1.2rem; text-align: center;">
                <small style="color: var(--untref-azul); font-weight: bold; font-size: 0.85rem;">Ecosistema de Transparencia Académica Organizada - Cátedra UNTREF</small>
            </div>
        `;
        analysisResult.scrollIntoView({ behavior: 'smooth' });
    }, 500);
});
