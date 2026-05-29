// [Este fragmento reemplaza la vieja sección de la lista de preguntas dentro del innerHTML]

        <h4 class="interpellation-title">Interlocución Crítica Adaptativa (Bitácora de Devolución Respondible):</h4>
        
        <div class="questions-container">
            
            <!-- Capa 1: Dimensión Autoral -->
            <details class="dimension-accordion">
                <summary><span>1. Dimensión Autoral</span></summary>
                <div class="accordion-content">
                    <p>${reactivos[0]}</p>
                    <label style="font-size: 0.85rem; color: var(--untref-azul-oscuro);">Tu argumentación / Registro de marcas propias:</label>
                    <textarea class="student-response-area" placeholder="Escribí acá tus decisiones estéticas y cómo defendés tu estilo autoral frente al escrito..."></textarea>
                </div>
            </details>

            <!-- Capa 2: Dimensión Epistemológica -->
            <details class="dimension-accordion">
                <summary><span>2. Dimensión Epistemológica</span></summary>
                <div class="accordion-content">
                    <p>${reactivos[1]}</p>
                    <label style="font-size: 0.85rem; color: var(--untref-azul-oscuro);">Anclaje territorial y debate de fuentes:</label>
                    <textarea class="student-response-area" placeholder="Definí acá las tensiones locales de tu campo disciplinar u observaciones del aula UNTREF que sustentan tu idea..."></textarea>
                </div>
            </details>

            <!-- Capa 3: Dimensión de Transparencia -->
            <details class="dimension-accordion">
                <summary><span>3. Dimensión de Transparencia</span></summary>
                <div class="accordion-content">
                    <p>${reactivos[2]}</p>
                    <label style="font-size: 0.85rem; color: var(--untref-azul-oscuro);">Trastienda del Ensamblaje Técnico (Prompts / Lecturas):</label>
                    <textarea class="student-response-area" placeholder="Transparentá qué operaciones delegaste en el código, cuáles retuviste y qué fuentes críticas manuales utilizaste..."></textarea>
                </div>
            </details>

            <!-- Capa 4: Dimensión de Antifragilidad -->
            <details class="dimension-accordion">
                <summary><span>4. Dimensión de Antifragilidad</span></summary>
                <div class="accordion-content">
                    <p>${reactivos[3]}</p>
                    <label style="font-size: 0.85rem; color: var(--untref-azul-oscuro);">Ensayo de Contraargumento Crítico:</label>
                    <textarea class="student-response-area" placeholder="Incomodá tu propia hipótesis. ¿Cuál es el flanco más débil de tu borrador si tuvieras que refutarte a vos mismo?"></textarea>
                </div>
            </details>

            <!-- Capa 5: Evaluación de Procesos / Metacognición -->
            <details class="dimension-accordion">
                <summary><span>5. Evaluación de Procesos (Metacognición)</span></summary>
                <div class="accordion-content">
                    <p>${reactivos[4]}</p>
                    <label style="font-size: 0.85rem; color: var(--untref-azul-oscuro);">Registro del Aprendizaje Perdurable:</label>
                    <textarea class="student-response-area" placeholder="¿Qué zonas conceptuales de este trabajo clasificarías hoy como humanas e indelegables para tu formación?"></textarea>
                </div>
            </details>

        </div>

        <!-- [Mantenés el report-footer abajo exactamente igual] -->
