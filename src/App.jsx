import { useState } from "react";

const GH = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/";

// ─── Real photos: [pos1, pos2, pos3?] from free-exercise-db (open source, MIT) ─
const PHOTOS = {
  // ── TREINO A ──
  "Cat-Cow (Gato-Vaca)":                              [`${GH}Cat_Stretch/0.jpg`,           `${GH}Cat_Stretch/1.jpg`],
  "Hip 90/90 com Rotação de Tronco":                  [`${GH}Hip_Flexor_Stretch/0.jpg`,    `${GH}Hip_Flexor_Stretch/1.jpg`],
  "Dead Bug — Ativação de Core Profundo":             [`${GH}Dead_Bug/0.jpg`,              `${GH}Dead_Bug/1.jpg`],
  "Glute Bridge Lento (Ponte de Glúteo)":             [`${GH}Barbell_Glute_Bridge/0.jpg`,  `${GH}Barbell_Glute_Bridge/1.jpg`],
  "Romanian Deadlift — RDL":                          [`${GH}Romanian_Deadlift/0.jpg`,     `${GH}Romanian_Deadlift/1.jpg`],
  "Bird Dog com Pausa de 3 Segundos":                 [`${GH}All_Fours_Quad_Stretch/0.jpg`,`${GH}All_Fours_Quad_Stretch/1.jpg`],
  "Hollow Body Hold (Posição Hollow)":                [`${GH}Straight_Leg_Raise/0.jpg`,    `${GH}Straight_Leg_Raise/1.jpg`],
  "Good Morning com Faixa Elástica":                  [`${GH}Band_Good_Morning/0.jpg`,     `${GH}Band_Good_Morning/1.jpg`],
  "Pallof Press — Anti-Rotação":                      [`${GH}Pallof_Press/0.jpg`,          `${GH}Pallof_Press/1.jpg`],
  "Superman Alternado com Pausa":                     [`${GH}Superman/0.jpg`,              `${GH}Superman/1.jpg`],
  // ── TREINO B ──
  "World's Greatest Stretch":                         [`${GH}Bodyweight_Walking_Lunge/0.jpg`, `${GH}Bodyweight_Walking_Lunge/1.jpg`],
  "Lateral Band Walk (Caminhada Lateral com Faixa)":  [`${GH}Band_Hip_Adductions/0.jpg`,   `${GH}Band_Hip_Adductions/1.jpg`],
  "Leg Swing — Frontal e Lateral":                    [`${GH}Single_Leg_Butt_Kick/0.jpg`,  `${GH}Single_Leg_Butt_Kick/1.jpg`],
  "Agachamento de Ativação (Lento)":                  [`${GH}Bodyweight_Squat/0.jpg`,      `${GH}Bodyweight_Squat/1.jpg`],
  "Agachamento Búlgaro (Rear Foot Elevated Split Squat)": [`${GH}Barbell_Lunge/0.jpg`,    `${GH}Barbell_Lunge/1.jpg`],
  "Step Up com Pausa de 2 Segundos":                  [`${GH}Step-up_with_Knee_Raise/0.jpg`, `${GH}Step-up_with_Knee_Raise/1.jpg`],
  "Single Leg Deadlift (Levantamento Unipodal)":      [`${GH}Romanian_Deadlift/0.jpg`,     `${GH}Romanian_Deadlift/1.jpg`],
  "Lateral Lunge com Toque no Chão":                  [`${GH}Barbell_Side_Split_Squat/0.jpg`, `${GH}Barbell_Side_Split_Squat/1.jpg`],
  "Equilíbrio Unipodal no Bosu":                      [`${GH}Single_Leg_Push-off/0.jpg`,   `${GH}Single_Leg_Push-off/1.jpg`],
  "Skater Squat (Agachamento Patinador)":             [`${GH}Bodyweight_Walking_Lunge/0.jpg`, `${GH}Bodyweight_Walking_Lunge/1.jpg`],
  // ── TREINO C ──
  "Shoulder CARs (Rotações Articulares Controladas)": [`${GH}Shoulder_Circles/0.jpg`,      `${GH}Shoulder_Circles/1.jpg`],
  "Band Pull Apart (Faixa Elástica)":                 [`${GH}Band_Pull_Apart/0.jpg`,       `${GH}Band_Pull_Apart/1.jpg`],
  "Calf Raises Lentos na Borda do Degrau":            [`${GH}Standing_Calf_Raises/0.jpg`,  `${GH}Standing_Calf_Raises/1.jpg`],
  "Inchworm com Push-Up":                             [`${GH}Inchworm/0.jpg`,              `${GH}Inchworm/1.jpg`],
  "Face Pull com Faixa Elástica":                     [`${GH}Face_Pull/0.jpg`,             `${GH}Face_Pull/1.jpg`],
  "Plank com Thread the Needle (Rotação Torácica)":   [`${GH}Side_Plank/0.jpg`,            `${GH}Side_Plank/1.jpg`],
  "Single Arm Row com Faixa Elástica":                [`${GH}Bent_Over_Two-Dumbbell_Row/0.jpg`, `${GH}Bent_Over_Two-Dumbbell_Row/1.jpg`],
  "Calf Raise Unipodal Excêntrico na Borda":          [`${GH}Calf_Raise_On_A_Dumbbell/0.jpg`, `${GH}Calf_Raise_On_A_Dumbbell/1.jpg`],
  "T Push-Up (Flexão com Rotação)":                   [`${GH}Clock_Push-Up/0.jpg`,         `${GH}Clock_Push-Up/1.jpg`],
  "Turkish Get-Up — TGU":                             [`${GH}Kettlebell_Turkish_Get-Up_Lunge_style/0.jpg`, `${GH}Kettlebell_Turkish_Get-Up_Lunge_style/1.jpg`],
};

// Step labels per exercise (what each photo represents)
const STEP_LABELS = {
  "Cat-Cow (Gato-Vaca)":                             ["Posição Vaca (inspire)", "Posição Gato (expire)"],
  "Hip 90/90 com Rotação de Tronco":                 ["Posição inicial 90/90", "Rotação torácica"],
  "Dead Bug — Ativação de Core Profundo":            ["Posição inicial (lombar no chão)", "Extensão oposta (não soltar a lombar)"],
  "Glute Bridge Lento (Ponte de Glúteo)":            ["Posição inicial deitado", "Topo: esprema o glúteo 2s"],
  "Romanian Deadlift — RDL":                         ["Posição inicial em pé", "Descida: quadril para trás"],
  "Bird Dog com Pausa de 3 Segundos":                ["Posição de 4 apoios", "Extensão: braço + perna opostos"],
  "Hollow Body Hold (Posição Hollow)":               ["Posição inicial (lombar no chão)", "Hollow: pernas e ombros levantados"],
  "Good Morning com Faixa Elástica":                 ["Posição inicial em pé", "Inclinação: quadril para trás"],
  "Pallof Press — Anti-Rotação":                     ["Faixa no peito, resista a rotação", "Estenda os braços sem girar"],
  "Superman Alternado com Pausa":                    ["Deitado de barriga para baixo", "Levante braço + perna opostos (2s)"],
  "World's Greatest Stretch":                        ["Posição de afundo, mão no chão", "Rotação: braço ao teto"],
  "Lateral Band Walk (Caminhada Lateral com Faixa)": ["Semi-agachado, faixa ativa", "Passo lateral controlado"],
  "Leg Swing — Frontal e Lateral":                   ["Posição inicial apoiado", "Swing frontal (amplitude crescente)"],
  "Agachamento de Ativação (Lento)":                 ["Posição inicial em pé", "Agachamento: 3s descida, 2s pausa"],
  "Agachamento Búlgaro (Rear Foot Elevated Split Squat)": ["Pé traseiro elevado", "Descida: joelho da frente a 90°"],
  "Step Up com Pausa de 2 Segundos":                 ["Pé na caixa, pé de baixo relaxado", "Topo: pausa 2s numa perna"],
  "Single Leg Deadlift (Levantamento Unipodal)":     ["Em pé, peso na mão", "Tronco + perna livre = linha reta"],
  "Lateral Lunge com Toque no Chão":                 ["Posição inicial em pé", "Afundo lateral: toque o chão"],
  "Equilíbrio Unipodal no Bosu":                     ["Subindo no Bosu", "Equilíbrio unipodal estável"],
  "Skater Squat (Agachamento Patinador)":            ["Em pé numa perna, tronco inclinado", "Descida: joelho traseiro ao chão"],
  "Shoulder CARs (Rotações Articulares Controladas)":["Braço ao lado do corpo", "Círculo ativo completo do ombro"],
  "Band Pull Apart (Faixa Elástica)":                ["Faixa à frente na altura dos ombros", "Abrir peito: escápulas se encontram"],
  "Calf Raises Lentos na Borda do Degrau":           ["Calcanhar abaixo do nível (estiramento)", "Ponta do pé (contração máxima)"],
  "Inchworm com Push-Up":                            ["Mãos no chão, caminhe até a prancha", "Push-up + caminhe pés às mãos"],
  "Face Pull com Faixa Elástica":                    ["Braços estendidos, faixa em tensão", "Puxe ao rosto + rotação externa"],
  "Plank com Thread the Needle (Rotação Torácica)":  ["Prancha lateral, braço ao teto", "Thread: braço passa por baixo"],
  "Single Arm Row com Faixa Elástica":               ["De frente à faixa, escápula neutra", "Puxe o cotovelo ao quadril"],
  "Calf Raise Unipodal Excêntrico na Borda":         ["Topo: suba com dois pés", "Desça em 3s com UM pé só"],
  "T Push-Up (Flexão com Rotação)":                  ["Push-up completo", "Rotação: braço ao teto (forma T)"],
  "Turkish Get-Up — TGU":                            ["Deitado, KB acima do ombro", "Fase 4: afundo antes de levantar"],
};

// YouTube verified IDs
const YT = {
  "Cat-Cow (Gato-Vaca)":                             "kqnua4rHVVA",
  "Dead Bug — Ativação de Core Profundo":            "4XLEnwUr1d8",
  "Glute Bridge Lento (Ponte de Glúteo)":            "8bbE64NuDTU",
  "Romanian Deadlift — RDL":                         "KN5vN3JskqI",
  "Bird Dog com Pausa de 3 Segundos":                "wiFNA3sqjCA",
  "Hollow Body Hold (Posição Hollow)":               "LlDNef_Ztsc",
  "Good Morning com Faixa Elástica":                 "fJA39ZOVaEQ",
  "Pallof Press — Anti-Rotação":                     "axgv7H_VQOo",
  "Superman Alternado com Pausa":                    "cc3tHPVRXgE",
  "World's Greatest Stretch":                        "Q3lJRL_QC9Y",
  "Lateral Band Walk (Caminhada Lateral com Faixa)": "pqSxMVPGyjY",
  "Agachamento Búlgaro (Rear Foot Elevated Split Squat)": "SkNsa3eBwLA",
  "Step Up com Pausa de 2 Segundos":                 "aKj-6hgiViA",
  "Single Leg Deadlift (Levantamento Unipodal)":     "ooGNupLrZJw",
  "Lateral Lunge com Toque no Chão":                 "gwWv7aPcD88",
  "Skater Squat (Agachamento Patinador)":            "YO-247pOeIc",
  "Band Pull Apart (Faixa Elástica)":                "VGcEkjGHH6I",
  "Inchworm com Push-Up":                            "Zrn-mQGpSKs",
  "Face Pull com Faixa Elástica":                    "AlTGQrDOd98",
  "Calf Raise Unipodal Excêntrico na Borda":         "fuiPJBMTv3c",
  "T Push-Up (Flexão com Rotação)":                  "vRqGdDlPQKM",
  "Turkish Get-Up — TGU":                            "5kb9Blkrj2w",
};

// ─── Step-by-step photo grid (like the sandbag example) ───────────────────────
function StepPhotoGrid({ name, color }) {
  const photos = PHOTOS[name];
  const labels = STEP_LABELS[name] || ["Posição inicial", "Posição final"];
  const [failed, setFailed] = useState({});

  if (!photos) return null;

  const validPhotos = photos.filter((_, i) => !failed[i]);
  if (validPhotos.length === 0) return null;

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 9, letterSpacing: 2, color: "#555", fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 8 }}>
        📸 POSIÇÕES DE EXECUÇÃO
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${photos.length}, 1fr)`,
        gap: 6,
        background: "#0a0a0a",
        borderRadius: 10,
        overflow: "hidden",
        border: `1px solid ${color}22`,
      }}>
        {photos.map((src, i) => (
          <div key={i} style={{ position: "relative" }}>
            {!failed[i] ? (
              <img
                src={src}
                alt={labels[i] || `Passo ${i + 1}`}
                onError={() => setFailed(f => ({ ...f, [i]: true }))}
                style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }}
              />
            ) : (
              <div style={{ width: "100%", aspectRatio: "4/3", background: `${color}10`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 28, opacity: 0.3 }}>🏋️</span>
              </div>
            )}
            {/* Step number badge */}
            <div style={{
              position: "absolute", top: 6, left: 6,
              background: color, color: "#000",
              borderRadius: "50%", width: 22, height: 22,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, fontWeight: 700,
            }}>{i + 1}</div>
            {/* Step label */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(transparent, #000000cc)",
              padding: "16px 8px 6px",
              fontSize: 9, color: "#ddd", lineHeight: 1.3,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600, letterSpacing: 0.3,
            }}>
              {labels[i] || `Passo ${i + 1}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── YouTube button ───────────────────────────────────────────────────────────
function YTButton({ name }) {
  const id = YT[name];
  if (!id) return null;
  return (
    <a
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        background: "#ff000015", border: "1px solid #ff000040",
        borderRadius: 8, padding: "7px 14px", marginBottom: 14,
        textDecoration: "none", color: "#ff6666",
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: 12, fontWeight: 700, letterSpacing: 0.5,
      }}
    >
      <span style={{ fontSize: 14 }}>▶</span> VER TUTORIAL COMPLETO NO YOUTUBE ↗
    </a>
  );
}

// ─── Exercise Database ────────────────────────────────────────────────────────
const TRAININGS = [
  {
    id: "A", icon: "⚡", color: "#4ade80",
    name: "TREINO A", focus: "Core Profundo · Cadeia Posterior · Lombar",
    duration: "45–55 min", mtbLink: "Subidas longas, postura no pedal, prevenção de dor lombar",
    warmup: [
      { name: "Cat-Cow (Gato-Vaca)", sets: "2 × 10 reps lentas", equipment: "Peso corporal",
        steps: ["Em quatro apoios: joelhos sob quadris, pulsos sob ombros.", "VACA (foto 1): inspire, barriga cai, olhar e cóccix sobem. Arqueie toda a coluna.", "GATO (foto 2): expire, empurre as costas para o teto, queixo ao peito.", "3 segundos em cada posição. Sinta cada vértebra se movendo."],
        feel: "Deve sentir: alongamento na lombar e torácica. Pressão suave no abdômen durante o gato.",
        errors: "Erro: mover só o pescoço. O movimento deve vir de toda a coluna.",
        muscles: "Eretores, multífidos, reto abdominal, coluna torácica",
        mtb: "Torácica rígida impede absorção de impacto nas descidas." },
      { name: "Hip 90/90 com Rotação de Tronco", sets: "2 × 8 reps/lado", equipment: "Peso corporal",
        steps: ["Sente no chão, perna da frente em 90° e perna de trás em 90° para o lado (foto 1).", "Coluna ereta, incline o tronco sobre a perna da frente.", "Gire o tronco abrindo o peito — rotação vem da torácica, não do pescoço (foto 2).", "Use cada expiração para aprofundar."],
        feel: "Tensão na virilha (perna de fora), glúteo (perna da frente), rotação nas costas.",
        errors: "Inclinar o tronco de lado. Mantenha coluna reta — o movimento é no quadril.",
        muscles: "Rotadores do quadril, piriforme, TFL, adutores, torácica",
        mtb: "Mobilidade de quadril para inclinação nas curvas e posição em descidas." },
      { name: "Dead Bug — Ativação de Core Profundo", sets: "2 × 8 reps/lado", equipment: "Peso corporal",
        steps: ["Deite de costas, braços para o teto, pernas em 90° — coxas verticais (foto 1).", "CRÍTICO: lombar 100% colada ao chão durante todo o exercício.", "Expire: desça braço direito + estenda perna esquerda quase tocando o chão (foto 2).", "Se a lombar levantar, reduza a amplitude. Retorne e troque."],
        feel: "Contração profunda abaixo do umbigo — no centro, não na barriga toda.",
        errors: "Arqueiar a lombar, prender a respiração, mover rápido.",
        muscles: "Transverso abdominal, multífidos, psoas, diafragma",
        mtb: "Estabiliza a pelve em cada pedalada. Sem ele a lombar sofre nos longos." },
      { name: "Glute Bridge Lento (Ponte de Glúteo)", sets: "2 × 10 reps (3s sobe / 2s pausa / 3s desce)", equipment: "Peso corporal",
        steps: ["Deitado, joelhos dobrados, pés no chão na largura dos quadris (foto 1).", "Ative o core: lombar levemente para baixo.", "Expire, empurre os calcanhares — suba o quadril em 3 segundos.", "No topo (foto 2): esprema os glúteos ao máximo. Segure 2s. Desça em 3s."],
        feel: "Queimação nos glúteos no topo. Se sentir mais nas coxas, empurre mais os calcanhares.",
        errors: "Subir demais (hiperextensão lombar) ou não apertar o glúteo no topo.",
        muscles: "Glúteo máximo, glúteo médio, isquiotibiais, core",
        mtb: "Glúteos fracos = joelho caindo para dentro + dor lombar nas subidas." },
    ],
    main: [
      { name: "Romanian Deadlift — RDL", sets: "3 × 12 reps", rest: "45s", equipment: "Halteres leves a moderados",
        steps: ["Em pé, halteres à frente das coxas, palmas para o corpo (foto 1).", "Inspire, ative o core. Empurre o quadril para TRÁS — dobradiça, não agachamento.", "Desça os halteres rentes às coxas mantendo coluna neutra (foto 2).", "Desça até sentir forte tensão nos isquiotibiais (atrás da coxa).", "Expire, ative o glúteo: empurre o quadril para frente para subir."],
        feel: "Estiramento profundo na parte de trás da coxa (foto 2). Glúteo forte na subida. Se sentir nas costas, reduza a carga.",
        errors: "Arredondar a lombar, dobrar os joelhos demais (vira agachamento), afastar os halteres do corpo.",
        muscles: "Isquiotibiais (foco), glúteo máximo, eretores, core",
        mtb: "Cadeia posterior é o motor das subidas longas. RDL forte = menos cãibra no final.",
        progression: { "1–2": "Halteres leves, 10 reps, técnica", "3–4": "Carga moderada, 12 reps, 3s descida", "5–6": "Carga moderada-alta, 12 reps + pausa 2s", "7–8": "3-4 séries, 15 reps, 3s excêntrico" } },
      { name: "Bird Dog com Pausa de 3 Segundos", sets: "3 × 10 reps/lado", rest: "30s", equipment: "Peso corporal",
        steps: ["Quatro apoios: joelhos sob quadris, pulsos sob ombros. Coluna neutra (foto 1).", "Ative o core — como se fosse levar um soco na barriga.", "Estenda braço direito à frente + perna esquerda para trás simultaneamente (foto 2).", "PAUSA 3 segundos: quadril completamente NIVELADO — não deixe cair.", "Retorne sem tocar no chão. Repita no mesmo lado."],
        feel: "Glúteo da perna levantada, lombar estabilizando, ombro oposto. O tremido é o sistema nervoso ativando.",
        errors: "Rotacionar o quadril para 'abrir espaço' — proibido. O quadril fica paralelo ao chão.",
        muscles: "Multífidos, transverso abdominal, glúteo máximo, deltóide, romboides, eretores",
        mtb: "Quando a bike salta, o core absorve sem transmitir para a lombar.",
        progression: { "1–2": "3s pausa, 8 reps/lado", "3–4": "Pausa + puxar cotovelo ao joelho", "5–6": "Com elástico no tornozelo", "7–8": "Bird Dog Row com halter leve" } },
      { name: "Hollow Body Hold (Posição Hollow)", sets: "3 × 30–45 segundos", rest: "45s", equipment: "Peso corporal",
        steps: ["Deite de costas. Lombar pressionada ao chão — NUNCA perde esse contato (foto 1).", "Eleve os ombros e estenda os braços acima da cabeça.", "Eleve as pernas a 30–45 cm (foto 2). Mais baixo = mais difícil.", "Se a lombar levantar, suba as pernas. Mantenha respirando."],
        feel: "Queimação intensa no centro do abdômen, tensão nos quadríceps e ombros. Tremido é normal.",
        errors: "Lombar saindo do chão, prender a respiração, dobrar joelhos.",
        muscles: "Transverso abdominal, reto abdominal, iliopsoas, quadríceps, serrátil",
        mtb: "Posição idêntica à postura no MTB — core comprimido sustentando a bike em descidas.",
        progression: { "1–2": "30s, pernas a 60cm", "3–4": "40s, pernas a 45cm", "5–6": "45s, pernas a 30cm", "7–8": "60s ou dead bug hollow" } },
      { name: "Good Morning com Faixa Elástica", sets: "3 × 15 reps", rest: "45s", equipment: "Faixa elástica",
        steps: ["Faixa atrás do pescoço/ombros, pise nas pontas (foto 1). Coluna neutra.", "Inspire, ative o core. Empurre o quadril para trás inclinando o tronco à frente.", "Desça até o tronco quase paralelo ao chão (foto 2) — ou até onde a coluna neutra permitir.", "Expire e ative os glúteos para retornar — o glúteo puxa o quadril."],
        feel: "Forte tensão nos isquiotibiais na descida (foto 2). Glúteos e lombar na subida.",
        errors: "Arredondar a lombar, dobrar os joelhos demais.",
        muscles: "Isquiotibiais, glúteo máximo, eretores, lombar",
        mtb: "Simula posição inclinada do ciclista — treina resistência postural da lombar.",
        progression: { "1–2": "Faixa leve, 12 reps, amplitude reduzida", "3–4": "Faixa média, 15 reps", "5–6": "Faixa média-forte, 3s excêntrico", "7–8": "Faixa forte, 15 reps + 5 com pausa 3s" } },
      { name: "Pallof Press — Anti-Rotação", sets: "3 × 12 reps/lado", rest: "30s", equipment: "Faixa elástica ancorada",
        steps: ["Ancore a faixa na altura do peito. De lado à âncora, mãos juntas na faixa (foto 1).", "Afaste-se até tensão moderada. Pés na largura dos ombros, joelhos levemente dobrados.", "Sinta a faixa tentando te girar — RESISTA. Essa é a essência.", "Estenda os braços lentamente à frente sem rotacionar o tronco (foto 2). Segure 2s."],
        feel: "Trabalho intenso nos oblíquos e lateral do core. Também glúteo médio estabilizando.",
        errors: "Compensar com o ombro ou deixar o quadril girar. Peito sempre para frente.",
        muscles: "Oblíquos internos e externos, transverso abdominal, glúteo médio",
        mtb: "Anti-rotação mantém o tronco estável enquanto os braços guiam no terreno técnico.",
        progression: { "1–2": "Faixa leve, perto da âncora, 10 reps", "3–4": "Faixa média, 12 reps", "5–6": "12 reps + passo lateral segurando", "7–8": "Faixa forte + agachamento em cada extensão" } },
      { name: "Superman Alternado com Pausa", sets: "3 × 12 reps/lado", rest: "30s", equipment: "Peso corporal",
        steps: ["Deite de barriga para baixo, braços acima da cabeça, pernas estendidas (foto 1).", "Ative glúteos e core — encolha o umbigo em direção à coluna.", "Levante braço direito + perna esquerda simultaneamente. Máximo 15–20cm (foto 2).", "Segure 2 segundos. Volte e troque o lado. Pescoço neutro — olhar para o chão."],
        feel: "Contração na lombar, glúteo (perna levantada) e trapézio/ombro (braço levantado).",
        errors: "Levantar muito (compressão lombar), rotacionar o quadril, levantar a cabeça.",
        muscles: "Eretores, glúteo máximo, romboide, trapézio médio e inferior, deltóide posterior",
        mtb: "Lombar resistente absorve solavancos sem dores pós-prova.",
        progression: { "1–2": "Sem pausa, 10 reps/lado", "3–4": "2s pausa, 12 reps", "5–6": "3s pausa + torção diagonal leve", "7–8": "Com halteres leves, 12 reps/lado" } },
    ],
    cooldown: [
      { name: "Pigeon Pose (Pombo)", duration: "60s/lado", steps: ["Do quadrupede, joelho direito à frente em diagonal. Perna esquerda estendida.", "Caminhe as mãos para frente e incline o tronco. Testa pode tocar o chão.", "Respire profundamente — a cada expiração, afunde mais."], feel: "Profundo no glúteo e piriforme. Se sentir no joelho, ajuste o ângulo da canela.", muscles: "Piriforme, rotadores do quadril, glúteo médio, TFL" },
      { name: "Alongamento de Isquiotibiais em Pé", duration: "45s/lado", steps: ["Calcanhar numa superfície elevada, joelho estendido.", "Coluna reta, incline o tronco à frente.", "Puxe levemente a ponta do pé em sua direção."], feel: "Tensão forte na parte de trás da coxa.", muscles: "Isquiotibiais, panturrilha" },
      { name: "Child's Pose com Rotação Lateral", duration: "30s/lado", steps: ["Posição do bebê: joelhos afastados, bumbum nos calcanhares, braços esticados.", "Deslize o braço direito por baixo do corpo rotacionando o tronco.", "Ombro direito toca o chão. Respire e relaxe."], feel: "Abertura lateral das costas, torácica e lombar relaxando.", muscles: "Latíssimo do dorso, eretores torácicos, lombar" },
      { name: "Respiração Diafragmática — Recuperação", duration: "2–3 minutos", steps: ["Deitado, mão no peito e outra no abdômen.", "Inspire 4s pelo nariz: abdômen sobe primeiro.", "Expire 6s: abdômen desce, peito desce. Mão do peito se move pouco."], feel: "Ritmo cardíaco desacelerando, tensão aliviando, mente acalmando.", muscles: "Diafragma, sistema nervoso parassimpático" },
    ],
  },
  {
    id: "B", icon: "🔥", color: "#f97316",
    name: "TREINO B", focus: "Glúteos · Quadríceps · Equilíbrio · Propriocepção",
    duration: "50–60 min", mtbLink: "Descidas técnicas, curvas, controle de joelho, terrenos acidentados",
    warmup: [
      { name: "World's Greatest Stretch", sets: "5 reps/lado", equipment: "Peso corporal",
        steps: ["Passo grande à frente com pé direito (foto 1). Mão direita no chão ao lado do pé.", "Gire o tronco para a esquerda, braço esquerdo ao teto (foto 2). Siga a mão com o olhar.", "Retorne a mão ao chão. Estique o joelho traseiro, calcanhar no chão.", "Volte e repita no lado oposto."],
        feel: "Abertura de quadril, rotação nas costas, panturrilha.", errors: "Mão longe do pé dificulta a rotação.", muscles: "Adutores, flexores do quadril, torácica, panturrilha, ombros", mtb: "Prepara toda a cadeia cinemática de uma só vez." },
      { name: "Lateral Band Walk (Caminhada Lateral com Faixa)", sets: "2 × 15 passos/lado", equipment: "Faixa elástica abaixo dos joelhos",
        steps: ["Faixa abaixo dos joelhos, pés paralelos. Semi-agachamento — mantenha essa posição (foto 1).", "Passo lateral com o pé direito, suficiente para manter tensão na faixa (foto 2).", "Traga o pé esquerdo. Não deixe os pés se juntarem.", "Joelhos NÃO dobram para dentro — apontam para os pés."],
        feel: "Queimação rápida no glúteo médio (lateral do quadril). Se não sentir, abra mais os passos.", errors: "Joelhos caindo para dentro, subir do agachamento entre passos.", muscles: "Glúteo médio (foco), glúteo mínimo, TFL, abdutores", mtb: "Glúteo médio fraco = joelho que colapsa nas curvas e descidas." },
      { name: "Leg Swing — Frontal e Lateral", sets: "10 reps/direção/perna", equipment: "Apoio na parede",
        steps: ["FRONTAL: mão na parede, balance a perna frente-trás como pêndulo. Amplitude crescente (foto 1).", "LATERAL: de frente para a parede, balance a perna para o lado e cruzando na frente (foto 2).", "Tronco não rotaciona — movimento 100% do quadril.", "Pé em dorsiflexão (puxado para cima) durante os swings."],
        feel: "Liberação progressiva na virilha, glúteo e lateral do quadril.", errors: "Balançar o tronco junto. Core levemente ativado.", muscles: "Flexores, extensores, abdutores e adutores do quadril", mtb: "Mobilidade do quadril melhora eficiência do pedal e liberdade nas curvas." },
      { name: "Agachamento de Ativação (Lento)", sets: "2 × 8 reps (3s desce / 2s pausa)", equipment: "Peso corporal",
        steps: ["Pés na largura dos ombros, dedos 15–30° para fora (foto 1).", "Desça em 3 segundos, peito erguido, joelhos apontando para os pés.", "Pause 2 segundos no fundo (foto 2). Suba de forma firme.", "Cheque: calcanhar fica no chão durante todo o movimento?"],
        feel: "Ativação simétrica nos dois quadríceps. Glúteos ao subir.", errors: "Joelhos colabando, calcanhar saindo do chão.", muscles: "Quadríceps, glúteo máximo, isquiotibiais, core", mtb: "Ativa extensores do joelho que trabalham em cada pedalada." },
    ],
    main: [
      { name: "Agachamento Búlgaro (Rear Foot Elevated Split Squat)", sets: "3 × 10 reps/lado", rest: "45s", equipment: "Halteres opcional + banco",
        steps: ["Peito do pé traseiro numa superfície elevada (~40–50cm) (foto 1). Pé da frente avança o suficiente.", "Halteres ao lado do corpo. Incline o tronco ~15° à frente — ativa mais o glúteo.", "Desça controlado: joelho traseiro desce em direção ao chão. Joelho da frente acompanha o dedão (foto 2).", "Suba empurrando o calcanhar da frente. O glúteo é o motor — não use a perna de trás."],
        feel: "Glúteo e quadríceps da perna da frente. Estiramento no flexor de quadril da perna de trás. Se sentir mais na perna de trás, avance mais o pé da frente.", errors: "Pé da frente muito perto, torso excessivamente ereto, apoiar peso na perna de trás.", muscles: "Quadríceps (foco), glúteo máximo, isquiotibiais, core, flexores do quadril", mtb: "Força unilateral de perna é a base das subidas técnicas — cada pedalada é unilateral.",
        progression: { "1–2": "Sem peso, 8 reps, superfície baixa", "3–4": "Halteres leves, 10 reps", "5–6": "Halteres moderados, 10 reps, 3s excêntrico", "7–8": "3-4s excêntrico + 1s pausa no fundo, 12 reps" } },
      { name: "Step Up com Pausa de 2 Segundos", sets: "3 × 12 reps/lado", rest: "45s", equipment: "Caixa 40–50cm, halteres opcional",
        steps: ["Um pé completamente sobre a caixa (foto 1). Pé de baixo relaxado — NÃO dá impulso.", "Empurre o calcanhar de cima para subir — glúteo e quadríceps trabalhando.", "No topo (foto 2): PAUSE 2 segundos, joelho levemente flexionado, quadril nivelado.", "Desça LENTAMENTE em 3 segundos. Toque o pé de baixo e suba de novo sem transferir peso."],
        feel: "Glúteo e quadríceps da perna de cima. A pausa no topo desafia o equilíbrio — é isso que ativa os estabilizadores.", errors: "Usar o pé de baixo para impulsionar — o erro mais comum.", muscles: "Quadríceps (vastus medialis), glúteo máximo, estabilizadores do tornozelo, core", mtb: "Replica o padrão unilateral do pedal em subidas.",
        progression: { "1–2": "Caixa 30cm, sem peso, 10 reps", "3–4": "Caixa 40cm, 12 reps, 2s pausa", "5–6": "Caixa 40cm, halteres leves", "7–8": "Caixa 50cm, halteres moderados, 3s excêntrico" } },
      { name: "Single Leg Deadlift (Levantamento Unipodal)", sets: "3 × 10 reps/lado", rest: "45s", equipment: "Halter ou kettlebell",
        steps: ["Em pé, peso na mão direita. Apoio na perna esquerda (foto 1).", "Tronco e perna direita formam UMA linha reta. Ao inclinar o tronco, a perna sobe atrás.", "Quadril da perna levantada NÃO abre para o lado — paralelo ao chão (foto 2).", "Desça o peso rente à perna de apoio. Suba ativando o glúteo."],
        feel: "Isquiotibiais e glúteo da perna de apoio. Dificuldade de equilíbrio é normal e desejada.", errors: "Rotacionar o quadril — perna vai para o lado ao invés de atrás.", muscles: "Isquiotibiais, glúteo máximo, glúteo médio, eretores, tibial anterior, fibulares", mtb: "Equilíbrio sobre um ponto = cada pedalada e cada 'pesca' em terreno solto.",
        progression: { "1–2": "Sem peso, mão na parede, 8 reps", "3–4": "Halter leve, sem apoio, 10 reps", "5–6": "Halter moderado, 2s pausa no fundo", "7–8": "Halter moderado, 3s excêntrico, 12 reps" } },
      { name: "Lateral Lunge com Toque no Chão", sets: "3 × 10 reps/lado", rest: "30s", equipment: "Peso corporal (halter opcional)",
        steps: ["Em pé, posição inicial (foto 1).", "Afunde com o pé direito para o lado, pé esquerdo fixo e joelho estendido.", "Dobre o joelho direito e empurre o quadril para trás. Toque as mãos no chão (foto 2).", "Empurre o calcanhar direito no chão para voltar."],
        feel: "Virilha e adutor da perna estendida. Glúteo e quadríceps da perna que afundou.", errors: "Joelho da perna que afunda indo para dentro, não empurrar o quadril para trás.", muscles: "Adutores (perna estendida), quadríceps, glúteo máximo e médio, core", mtb: "Adutores = críticos para inclinar a bicicleta nas curvas.",
        progression: { "1–2": "Sem peso, amplitude reduzida, 8 reps", "3–4": "Toque no chão, 10 reps", "5–6": "Halter Goblet à frente, 10 reps", "7–8": "Halter + 2s pausa no fundo, 12 reps" } },
      { name: "Equilíbrio Unipodal no Bosu", sets: "3 × 35–45s/perna", rest: "30s", equipment: "Bosu ball",
        steps: ["INICIAL: Bosu lado plano para CIMA (mais estável). Um pé no centro (foto 1).", "AVANÇADO (sem 3–4+): lado abaulado para CIMA (mais instável).", "Suba e encontre o equilíbrio (foto 2) — tornozelo ajusta, dedos se agarram.", "Joelho levemente flexionado (nunca travado). PROGRESSÃO: olhos fechados → head turns."],
        feel: "Trabalho intenso no tornozelo, panturrilha e lateral da perna. O tremido é o sistema nervoso aprendendo.", errors: "Travar o joelho, segurar a respiração, ficar rígido.", muscles: "Tibial anterior, fibulares, tríceps sural, glúteo médio, core — propriocepção completa", mtb: "Reação mais rápida quando a bike 'escapa' em pedras ou areia.",
        progression: { "1–2": "Lado plano, olhos abertos, 25s", "3–4": "Lado abaulado, olhos abertos, 35s", "5–6": "Olhos fechados, 40s", "7–8": "Olhos fechados + head turns, 45s" } },
      { name: "Skater Squat (Agachamento Patinador)", sets: "3 × 8 reps/lado", rest: "45s", equipment: "Peso corporal (faixa para auxílio inicial)",
        steps: ["Em pé numa perna. Perna livre para trás, joelho dobrado. Tronco inclinado à frente (foto 1).", "Descida: joelho traseiro em direção ao chão. Toque LEVEMENTE (foto 2).", "Joelho da frente NÃO vai para dentro — aponta para o 2° dedo.", "Empurre o calcanhar para subir. Tronco permanece inclinado."],
        feel: "Quadríceps em chamas, glúteo forte, equilíbrio intenso.", errors: "Joelho colabando para dentro — o erro mais crítico. Pare e corrija imediatamente.", muscles: "Quadríceps (foco), glúteo máximo, isquiotibiais, core, estabilizadores do tornozelo", mtb: "O exercício mais próximo da posição real de descida técnica no MTB.",
        progression: { "1–2": "Com apoio faixa/parede, 5 reps", "3–4": "Sem apoio, amplitude média, 8 reps", "5–6": "Amplitude completa, 2s pausa no fundo", "7–8": "Amplitude completa + halter leve, 10 reps" } },
    ],
    cooldown: [
      { name: "Couch Stretch (Flexor do Quadril)", duration: "60s/lado", steps: ["Joelho direito no chão próximo à parede. Peito do pé na parede.", "Avance pé esquerdo à frente — joelho esquerdo em 90°.", "Aperte o glúteo direito, empurre o quadril levemente para frente."], feel: "Estiramento profundo na frente do quadril e coxa. O mais importante para ciclistas.", muscles: "Iliopsoas, reto femoral, flexores do quadril" },
      { name: "Adductor Rockback", duration: "2 × 10 reps lentas/lado", steps: ["Em quatro apoios, afaste o joelho direito bem para o lado.", "Balance o quadril para trás em direção ao pé de apoio.", "Retorne sem pressa."], feel: "Estiramento progressivo na virilha. A gravidade faz o trabalho.", muscles: "Adutores (magno, longo, curto), pectíneo, grácil" },
      { name: "Standing Calf Stretch — 2 Posições", duration: "45s cada posição/perna", steps: ["P1: antepé na parede, calcanhar no chão, joelho ESTENDIDO (gastrocnêmio).", "P2: mesma posição, mas DOBRE o joelho (sóleo).", "Ambas necessárias para um alongamento completo."], feel: "P1: alto na panturrilha. P2: mais profundo, perto do tendão de Aquiles.", muscles: "Gastrocnêmio (P1), sóleo (P2), tendão de Aquiles" },
      { name: "Box Breathing — Controle Autonômico", duration: "8–10 ciclos", steps: ["Inspire 4s → Segure 4s → Expire 4s → Segure vazio 4s.", "Ideal também antes de competições para controlar ansiedade."], feel: "Sistema nervoso desacelerando. Após 3–4 ciclos a FC já cai.", muscles: "Diafragma, sistema nervoso autônomo, parassimpático" },
    ],
  },
  {
    id: "C", icon: "🏔️", color: "#c084fc",
    name: "TREINO C", focus: "Ombros · Cintura Escapular · Panturrilhas · Integração Total",
    duration: "45–55 min", mtbLink: "Controle de guidão, absorção de impacto, estabilidade técnica, resistência de panturrilha",
    warmup: [
      { name: "Shoulder CARs (Rotações Articulares Controladas)", sets: "5 reps/sentido/ombro", equipment: "Peso corporal",
        steps: ["Em pé ou sentado. Um braço ao lado, o outro realiza o movimento (foto 1).", "Levante à frente, leve acima da cabeça, para trás e abaixo — círculo completo (foto 2).", "CRUCIAL: movimento ATIVO — use os músculos do ombro em cada ponto.", "Devagar: cada círculo leva 8–10 segundos."],
        feel: "O ombro trabalhando em toda a amplitude. Onde há esforço, há fraqueza — informação útil.", errors: "Fazer rápido, compensar com o tronco, encolher o ombro.", muscles: "Deltóide (3 cabeças), manguito rotador, serrátil anterior", mtb: "Ombros com mobilidade ativa absorvem os impactos do guidão sem lesões." },
      { name: "Band Pull Apart (Faixa Elástica)", sets: "3 × 15 reps", equipment: "Faixa elástica leve",
        steps: ["Segure a faixa na largura dos ombros, braços à frente na altura dos ombros (foto 1).", "Afaste as mãos horizontalmente — abra completamente o peito (foto 2).", "No máximo, aperte as escápulas uma contra a outra. Segure 1 segundo.", "Retorne lentamente."],
        feel: "Contração entre as escápulas. Se sentir no pescoço, abaixe os ombros.", errors: "Elevar os ombros para as orelhas, abrir os cotovelos, fazer rápido.", muscles: "Trapézio médio e inferior, romboide, deltóide posterior, infraespinal", mtb: "Retrátores escapulares mantêm postura correta no guidão por horas." },
      { name: "Calf Raises Lentos na Borda do Degrau", sets: "2 × 12 reps (3s sobe / 1s pausa / 3s desce)", equipment: "Degrau ou borda",
        steps: ["Meia ponta dos pés na borda. Calcanhares abaixo do nível — amplitude completa (foto 1).", "Suba lentamente em 3 segundos até a ponta máxima (foto 2). Segure 1 segundo.", "Desça em 3 segundos. Comece com amplitude reduzida para aquecer o Aquiles."],
        feel: "Grande estiramento na panturrilha na descida, forte contração no topo.", errors: "Apoiar o peso nos dedos, não ir abaixo do nível.", muscles: "Gastrocnêmio, sóleo, tendão de Aquiles", mtb: "Panturrilha resistente previne cãibras em provas longas." },
      { name: "Inchworm com Push-Up", sets: "5 reps", equipment: "Peso corporal",
        steps: ["Em pé, flexione o tronco e apoie as mãos no chão (foto 1).", "Caminhe com as mãos até a posição de prancha (corpo reto).", "Faça 1 push-up controlado (foto 2).", "Caminhe os pés em direção às mãos. Suba de volta à posição em pé."],
        feel: "Isquiotibiais ao caminhar os pés, ombros e peitoral no push-up, core na prancha.", errors: "Quadril caindo na prancha, push-up sem o corpo alinhado.", muscles: "Isquiotibiais, ombros, peitoral, serrátil, core", mtb: "Integração de cadeia cinética completa." },
    ],
    main: [
      { name: "Face Pull com Faixa Elástica", sets: "3 × 15 reps", rest: "30s", equipment: "Faixa elástica ancorada na altura dos olhos",
        steps: ["Faixa na altura dos olhos, polegares para trás, cotovelos ALTOS. Afaste-se até tensão (foto 1).", "Puxe em direção ao rosto — cotovelos abrem para os lados na altura das orelhas.", "No ponto final: ROTAÇÃO EXTERNA — mãos para trás das orelhas, como o número '21' (foto 2).", "Segure 2 segundos e retorne LENTAMENTE."],
        feel: "Ombro posterior, trapézio médio, sensação de 'abrir' o peito. Se sentir no pescoço, abaixe os cotovelos.", errors: "Cotovelos abaixo dos ombros, sem rotação externa final, voltar rápido.", muscles: "Deltóide posterior, trapézio médio e inferior, romboide, infraespinal, redondo menor", mtb: "Previne ombro arredondado e mantém postura no guidão.",
        progression: { "1–2": "Faixa leve, 12 reps", "3–4": "Faixa média, 15 reps, 2s contração", "5–6": "Faixa média, 15 reps, 3s excêntrico", "7–8": "Faixa média-forte, 15 reps + 5 isotônicas" } },
      { name: "Plank com Thread the Needle (Rotação Torácica)", sets: "3 × 10 reps/lado", rest: "30s", equipment: "Peso corporal",
        steps: ["Prancha lateral: antebraço no chão, corpo alinhado, braço livre ao teto (foto 1).", "Ative o core — quadril não cai durante o movimento.", "Leve o braço livre por BAIXO do tronco passando pelo espaço entre o chão e o corpo (foto 2).", "Siga o braço com o olhar. Retorne abrindo o braço para o teto. Quadril nivelado."],
        feel: "Oblíquo (lateral do abdômen), abertura da torácica, ombro de baixo estabilizando.", errors: "Quadril que afunda ou sobe, rotação insuficiente.", muscles: "Oblíquos, serrátil anterior, rotadores torácicos, deltóide, glúteo médio", mtb: "Rotacionar o tronco independente do quadril = chave das curvas técnicas.",
        progression: { "1–2": "Plank lateral estático, 30s/lado", "3–4": "Thread the needle, amplitude reduzida, 8 reps", "5–6": "Amplitude completa, 10 reps", "7–8": "Thread + abrir o braço acima da cabeça no final" } },
      { name: "Single Arm Row com Faixa Elástica", sets: "3 × 12 reps/lado", rest: "30s", equipment: "Faixa elástica ancorada na altura do quadril",
        steps: ["Faixa ancorada à frente na altura do quadril. De frente, segure com mão direita (foto 1).", "PRIMEIRO: retrate a escápula (ombro para trás e para baixo) ANTES de dobrar o cotovelo.", "Puxe o cotovelo para trás em direção ao quadril — não para a axila (foto 2).", "O tronco NÃO rotaciona. Ombro de suporte estabiliza isometricamente."],
        feel: "Latíssimo (músculo lateral grande das costas), romboide, bíceps. Se o pescoço cansa, está elevando o ombro.", errors: "Rotacionar o tronco para ajudar, iniciar pelo bíceps ao invés da escápula.", muscles: "Latíssimo do dorso, romboide, trapézio médio, bíceps, core anti-rotação", mtb: "Cada puxada no guidão em subidas usa exatamente este padrão.",
        progression: { "1–2": "Faixa leve, sentado, 10 reps", "3–4": "Em pé, faixa leve-média, 12 reps", "5–6": "Em pé, faixa média, 2s pausa", "7–8": "Levemente inclinado, faixa média" } },
      { name: "Calf Raise Unipodal Excêntrico na Borda", sets: "3 × 15 reps/lado", rest: "30s", equipment: "Degrau ou borda",
        steps: ["Suba com os DOIS pés para a posição alta (foto 1).", "Transfira o peso para UM pé só. Meia ponta na borda.", "DESÇA em 3 segundos com UM pé só (foto 2) — fase excêntrica lenta é o foco.", "Calcanhares abaixo da borda na descida (amplitude máxima)."],
        feel: "Estiramento profundo na panturrilha na descida. Queimação progressiva após 8–10 reps.", errors: "Descer rápido (perde o benefício excêntrico), não ir abaixo do nível.", muscles: "Gastrocnêmio, sóleo, tendão de Aquiles, fibulares", mtb: "Panturrilha forte = estabilidade no pedal e prevenção de cãibra nas descidas.",
        progression: { "1–2": "Com dois pés, 15 reps, 3s excêntrico", "3–4": "Unipodal, 12 reps, 3s", "5–6": "Unipodal, 15 reps, 3s", "7–8": "Unipodal, 15 reps, 4s + 1s pausa no fundo" } },
      { name: "T Push-Up (Flexão com Rotação)", sets: "3 × 8 reps/lado", rest: "45s", equipment: "Peso corporal",
        steps: ["Prancha alta. Mãos levemente mais abertas que os ombros (foto 1).", "Desça fazendo um push-up completo — cotovelos a 45° do corpo.", "Ao subir, transfira o peso para a mão esquerda e rotacione — braço direito ao teto.", "O corpo forma um 'T' (foto 2). Quadril não cai."],
        feel: "Peitoral e tríceps no push-up. Serrátil e oblíquos na rotação. Ombro de apoio estabilizando intensamente.", errors: "Quadril caindo durante a rotação, cotovelos muito abertos.", muscles: "Peitoral, tríceps, serrátil anterior, deltóide, oblíquos, core anti-rotação", mtb: "Força de empurrar + estabilidade de ombro = absorção de impacto no guidão.",
        progression: { "1–2": "Push-up joelhos, sem rotação", "3–4": "Push-up completo + rotação parcial, 6 reps/lado", "5–6": "Rotação completa, 8 reps/lado", "7–8": "Halteres nas mãos (instabilidade extra)" } },
      { name: "Turkish Get-Up — TGU", sets: "2 × 3 reps/lado", rest: "60s", equipment: "Kettlebell leve ou halter",
        steps: ["FASE 1: Deite com KB acima do ombro direito. Sempre olhando para o KB. Role para o antebraço (foto 1).", "FASE 2: Sente completamente. Braço direito sempre esticado.", "FASE 3: Eleve o quadril. FASE 4: Joelho no chão — posição de afundo (foto 2).", "FASE 5: Fique em pé. Pausa. Reverta toda a sequência com controle."],
        feel: "Ombro trabalhando em TODA a amplitude, core em todas as fases, integração total.", errors: "Perder o contato visual com o KB, apressar qualquer fase, carga alta antes de dominar sem peso.", muscles: "Ombro (360°), core completo, quadríceps, glúteos, estabilizadores do tornozelo, manguito rotador", mtb: "Integração de toda a cadeia cinética — mesma usada ao recuperar o equilíbrio da bike.",
        progression: { "1–2": "Sem peso, foco em cada fase", "3–4": "Peso leve, até fase 4", "5–6": "Peso leve, sequência completa, 3 reps", "7–8": "Peso moderado, sequência fluida" } },
    ],
    cooldown: [
      { name: "Doorway Chest Stretch (Porta)", duration: "45s/lado", steps: ["Antebraço vertical no batente da porta (cotovelo a 90°).", "Avance um passo — tronco rotaciona para o lado oposto.", "DOIS ÂNGULOS: braço a 90° (peitoral médio), braço acima (peitoral inferior)."], feel: "Abertura do peito, estiramento no peitoral e deltóide anterior.", muscles: "Peitoral maior e menor, deltóide anterior, bíceps" },
      { name: "Thoracic Extension no Rolo de Espuma", duration: "2–3 minutos", steps: ["Rolo horizontalmente no meio das costas (torácica, não lombar).", "Mãos entrelaçadas atrás da nuca. Joelhos dobrados.", "Deixe as costas se dobrarem sobre o rolo — respire fundo e relaxe na expiração."], feel: "Abertura e extensão das costas. Pode fazer 'estalar' — é normal.", muscles: "Coluna torácica, romboides, peitoral (alongamento), intercostais" },
      { name: "Neck Release — Lateral com Respiração", duration: "3 respirações/lado", steps: ["Incline a cabeça para o lado (orelha ao ombro).", "Mão levemente sobre a cabeça — só o peso da mão.", "Inspire expandindo o lado oposto do pescoço. Expire afundando mais."], feel: "Estiramento suave na lateral do pescoço. Muito comum em ciclistas pela posição no guidão.", muscles: "Escalenos, esternocleidomastoideo, trapézio superior, levantador da escápula" },
      { name: "4-7-8 Respiração — Recuperação Avançada", duration: "4 ciclos completos", steps: ["Inspire pelo nariz: 4 segundos.", "Segure o ar: 7 segundos.", "Expire pela boca (lábios em 'O'): 8 segundos."], feel: "Leve tontura nos primeiros ciclos (normal). Após 4 ciclos, calma profunda.", muscles: "Diafragma, sistema nervoso parassimpático" },
    ],
  },
];

const PROGRESSION_DATA = [
  { weeks: "1–2", phase: "ADAPTAÇÃO", color: "#4ade80", series: "2–3", repsTime: "10–12 / 30s", rest: "60–75s", load: "Leve", goal: "Aprender a técnica correta de cada exercício. Não importa a carga — importa a execução perfeita." },
  { weeks: "3–4", phase: "DESENVOLVIMENTO", color: "#facc15", series: "3", repsTime: "12–15 / 40s", rest: "45–60s", load: "Leve-Moderada", goal: "Aumentar o volume. Inserir superfícies instáveis. Manter qualidade com mais esforço." },
  { weeks: "5–6", phase: "INTENSIFICAÇÃO", color: "#f97316", series: "3–4", repsTime: "15–20 / 45–60s", rest: "30–45s", load: "Moderada", goal: "Reduzir descanso e aumentar volume. Inserir excêntrico (3s) nos principais exercícios." },
  { weeks: "7–8", phase: "CONSOLIDAÇÃO", color: "#c084fc", series: "3–4", repsTime: "15–20 / 60s", rest: "30s", load: "Moderada-Alta", goal: "Integração neuromuscular. Máxima qualidade com o maior volume do programa." },
];

// ─── Exercise Card ─────────────────────────────────────────────────────────────
function ExerciseCard({ ex, color, index }) {
  const [open, setOpen] = useState(false);
  const photos = PHOTOS[ex.name] || [];

  return (
    <div style={{ background: open ? "#0d0d18" : "#0a0a14", border: `1px solid ${open ? color + "55" : "#ffffff0d"}`, borderRadius: 12, overflow: "hidden", transition: "all 0.2s" }}>
      {/* ── Collapsed header with first photo thumb ── */}
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "stretch", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
        {/* Thumbnail */}
        <div style={{ width: 72, minHeight: 56, flexShrink: 0, overflow: "hidden", background: `${color}10`, position: "relative" }}>
          {photos[0] && (
            <img src={photos[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={e => { e.target.style.display = "none"; }} />
          )}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.35)" }}>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: color, textShadow: "0 1px 4px #000" }}>{index + 1}</span>
          </div>
        </div>
        {/* Title */}
        <div style={{ flex: 1, padding: "10px 12px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", lineHeight: 1.2 }}>{ex.name}</div>
          <div style={{ fontSize: 10, color: "#555", marginTop: 3, display: "flex", gap: 10, flexWrap: "wrap" }}>
            {ex.sets && <span style={{ color }}>{ex.sets}</span>}
            {ex.rest && <span>↩ {ex.rest}</span>}
            {ex.duration && <span style={{ color }}>{ex.duration}</span>}
            {YT[ex.name] && <span style={{ color: "#ff5555" }}>▶ tutorial</span>}
            {photos.length > 0 && <span style={{ color: "#888" }}>📸 {photos.length} fotos</span>}
          </div>
        </div>
        <div style={{ padding: "0 12px", display: "flex", alignItems: "center", color: open ? color : "#444", fontSize: 18, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>⌄</div>
      </button>

      {/* ── Expanded content ── */}
      {open && (
        <div style={{ padding: "14px 14px 18px", borderTop: `1px solid ${color}22` }}>

          {/* Step photo grid — the main visual reference */}
          <StepPhotoGrid name={ex.name} color={color} />

          {/* YouTube button */}
          <YTButton name={ex.name} />

          {ex.equipment && (
            <div style={{ display: "inline-block", background: "#ffffff08", borderRadius: 20, padding: "3px 12px", fontSize: 10, color: "#777", marginBottom: 12 }}>
              🎯 {ex.equipment}
            </div>
          )}

          {/* Steps */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: "#555", fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 8 }}>EXECUÇÃO PASSO A PASSO</div>
            {ex.steps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 7, alignItems: "flex-start" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: `${color}20`, border: `1px solid ${color}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <span style={{ fontSize: 9, color, fontWeight: 700 }}>{i + 1}</span>
                </div>
                <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.6 }}>{step}</div>
              </div>
            ))}
          </div>

          {/* Feel + Errors side by side */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
            {ex.feel && (
              <div style={{ background: `${color}12`, border: `1px solid ${color}33`, borderRadius: 8, padding: "9px 11px" }}>
                <div style={{ fontSize: 9, letterSpacing: 2, color, fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 5 }}>💪 ONDE SENTIR</div>
                <div style={{ fontSize: 11, color: "#e0e0e0", lineHeight: 1.5 }}>{ex.feel}</div>
              </div>
            )}
            {ex.errors && (
              <div style={{ background: "#ff444410", border: "1px solid #ff444430", borderRadius: 8, padding: "9px 11px" }}>
                <div style={{ fontSize: 9, letterSpacing: 2, color: "#ff6666", fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 5 }}>⚠️ ERROS</div>
                <div style={{ fontSize: 11, color: "#ffaaaa", lineHeight: 1.5 }}>{ex.errors}</div>
              </div>
            )}
          </div>

          {/* Muscles + MTB side by side */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
            {ex.muscles && (
              <div style={{ background: "#ffffff04", borderRadius: 8, padding: "8px 10px" }}>
                <div style={{ fontSize: 9, letterSpacing: 1.5, color: "#555", fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 4 }}>MÚSCULOS</div>
                <div style={{ fontSize: 11, color: "#888", lineHeight: 1.5 }}>{ex.muscles}</div>
              </div>
            )}
            {ex.mtb && (
              <div style={{ background: "#ffffff04", borderRadius: 8, padding: "8px 10px" }}>
                <div style={{ fontSize: 9, letterSpacing: 1.5, color: "#555", fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 4 }}>🚵 MTB</div>
                <div style={{ fontSize: 11, color: "#aaa", lineHeight: 1.5 }}>{ex.mtb}</div>
              </div>
            )}
          </div>

          {/* Progression */}
          {ex.progression && (
            <div>
              <div style={{ fontSize: 9, letterSpacing: 2, color: "#555", fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 7 }}>PROGRESSÃO 8 SEMANAS</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
                {Object.entries(ex.progression).map(([wk, val], pi) => {
                  const pColors = ["#4ade8044","#facc1544","#f9731644","#c084fc44"];
                  return (
                    <div key={pi} style={{ background: "#ffffff04", borderRadius: 6, padding: "7px 9px", borderLeft: `3px solid ${pColors[pi]}` }}>
                      <div style={{ fontSize: 8, color: "#555", letterSpacing: 1, marginBottom: 2 }}>SEM {wk}</div>
                      <div style={{ fontSize: 10, color: "#bbb", lineHeight: 1.4 }}>{val}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Training View ─────────────────────────────────────────────────────────────
function TrainingView({ t }) {
  const [tab, setTab] = useState("warmup");
  const tabs = [
    { id: "warmup", label: "🔆 Aquecimento", count: t.warmup.length },
    { id: "main",   label: "⚡ Principal",   count: t.main.length },
    { id: "cooldown", label: "🌙 Finalização", count: t.cooldown.length },
  ];
  const current = tab === "warmup" ? t.warmup : tab === "main" ? t.main : t.cooldown;

  return (
    <div>
      <div style={{ background: `linear-gradient(135deg, ${t.color}15 0%, #0a0a1480 60%)`, border: `1px solid ${t.color}33`, borderRadius: 14, padding: "16px 18px", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <span style={{ fontSize: 36 }}>{t.icon}</span>
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, color: t.color, letterSpacing: 4 }}>{t.name}</div>
            <div style={{ fontSize: 12, color: "#aaa" }}>{t.focus}</div>
          </div>
        </div>
        <div style={{ fontSize: 10, color: "#555" }}>⏱ {t.duration} · 🚵 {t.mtbLink}</div>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        {tabs.map(tb => (
          <button key={tb.id} onClick={() => setTab(tb.id)} style={{ padding: "8px 14px", borderRadius: 40, border: `1px solid ${tab === tb.id ? t.color + "88" : "#ffffff12"}`, background: tab === tb.id ? `${t.color}18` : "#ffffff05", color: tab === tb.id ? t.color : "#555", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
            {tb.label} <span style={{ opacity: 0.5 }}>({tb.count})</span>
          </button>
        ))}
      </div>

      <div style={{ background: "#ffffff04", borderRadius: 7, padding: "6px 12px", fontSize: 10, color: "#555", marginBottom: 10 }}>
        {tab === "warmup" && "Mobilidade Dinâmica + Ativação — 5 a 10 minutos · Fotos de execução + tutorial em vídeo em cada exercício"}
        {tab === "main" && "Circuito Funcional — Fotos step-by-step reais + tutorial em vídeo no YouTube · Clique em cada exercício para expandir"}
        {tab === "cooldown" && "Mobilidade + Alongamento + Respiração — 8 a 12 minutos"}
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {current.map((ex, i) => <ExerciseCard key={i} ex={ex} color={t.color} index={i} />)}
      </div>
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [section, setSection] = useState("trainings");
  const [activeTraining, setActiveTraining] = useState("A");
  const currentTraining = TRAININGS.find(t => t.id === activeTraining);
  const nav = [
    { id: "trainings",  label: "Treinos A · B · C" },
    { id: "progression", label: "Progressão 8 Semanas" },
    { id: "calendar",   label: "Calendário & MTB" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#080810", color: "#e0e0e0", fontFamily: "'Barlow', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; background: #111; }
        ::-webkit-scrollbar-thumb { background: #2a2a3a; border-radius: 2px; }
      `}</style>

      {/* Hero */}
      <div style={{ background: "linear-gradient(180deg,#0d0d1e 0%,#080810 100%)", borderBottom: "1px solid #ffffff0a", padding: "30px 20px 22px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(26px,6.5vw,58px)", letterSpacing: 6, color: "#fff", lineHeight: 1 }}>PROGRAMA FUNCIONAL MTB</div>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(11px,2.5vw,16px)", letterSpacing: 4, color: "#4ade80", marginTop: 5 }}>PERFORMANCE & LONGEVIDADE ESPORTIVA</div>
        <div style={{ fontSize: 9, color: "#444", letterSpacing: 2, marginTop: 7 }}>8 SEMANAS · 3 TREINOS/SEMANA · FOTOS STEP-BY-STEP + VÍDEOS TUTORIAIS</div>
      </div>

      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "center", background: "#0a0a14", borderBottom: "1px solid #ffffff0a", position: "sticky", top: 0, zIndex: 20, flexWrap: "wrap" }}>
        {nav.map(n => (
          <button key={n.id} onClick={() => setSection(n.id)} style={{ padding: "12px 18px", border: "none", background: "transparent", color: section === n.id ? "#4ade80" : "#555", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: 1, borderBottom: section === n.id ? "2px solid #4ade80" : "2px solid transparent", transition: "all 0.2s", cursor: "pointer" }}>{n.name}</button>
        ))}
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "22px 12px 80px" }}>

        {/* TRAININGS */}
        {section === "trainings" && (
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {TRAININGS.map(t => (
                <button key={t.id} onClick={() => setActiveTraining(t.id)} style={{ flex: 1, padding: "12px 8px", borderRadius: 12, border: `1px solid ${activeTraining === t.id ? t.color + "88" : "#ffffff0d"}`, background: activeTraining === t.id ? `${t.color}15` : "#0a0a14", cursor: "pointer", transition: "all 0.2s" }}>
                  <div style={{ fontSize: 22 }}>{t.icon}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: activeTraining === t.id ? t.color : "#555", letterSpacing: 2, marginTop: 3 }}>{t.name}</div>
                  <div style={{ fontSize: 9, color: "#444", marginTop: 2, lineHeight: 1.3 }}>{t.focus.split("·")[0].trim()}</div>
                </button>
              ))}
            </div>
            <TrainingView t={currentTraining} />
          </div>
        )}

        {/* PROGRESSION */}
        {section === "progression" && (
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: 4, color: "#4ade80", marginBottom: 6 }}>PROGRESSÃO DE CARGA — 8 SEMANAS</div>
            <p style={{ color: "#666", fontSize: 12, marginBottom: 18, lineHeight: 1.7 }}>Qualidade técnica sempre acima da carga. Se a técnica falhar, não avance.</p>
            <div style={{ display: "grid", gap: 12, marginBottom: 28 }}>
              {PROGRESSION_DATA.map((p, i) => (
                <div key={i} style={{ background: `linear-gradient(135deg,${p.color}10 0%,transparent 70%)`, border: `1px solid ${p.color}33`, borderRadius: 12, padding: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 10 }}>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: p.color, letterSpacing: 3 }}>{p.phase}</div>
                      <div style={{ fontSize: 11, color: "#666" }}>Semanas {p.weeks}</div>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {[["SÉRIES",p.series],["REPS/TEMPO",p.repsTime],["DESCANSO",p.rest],["CARGA",p.load]].map(([label,val],li) => (
                        <div key={li} style={{ background: "#ffffff08", borderRadius: 7, padding: "5px 10px", textAlign: "center" }}>
                          <div style={{ fontSize: 8, color: "#555", letterSpacing: 1 }}>{label}</div>
                          <div style={{ fontSize: 13, color: li===3 ? p.color : "#fff", fontWeight: 700 }}>{val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ background: "#ffffff05", borderRadius: 7, padding: "8px 12px", fontSize: 12, color: "#bbb", lineHeight: 1.6 }}>
                    <span style={{ color: p.color, fontWeight: 600 }}>Objetivo: </span>{p.goal}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CALENDAR */}
        {section === "calendar" && (
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, letterSpacing: 4, color: "#4ade80", marginBottom: 6 }}>CALENDÁRIO SEMANAL</div>
            <p style={{ color: "#666", fontSize: 12, marginBottom: 16 }}>Funcionais nunca antes de um MTB intenso no mesmo dia.</p>
            <div style={{ background: "#0a0a14", border: "1px solid #ffffff0d", borderRadius: 12, overflow: "hidden", marginBottom: 26 }}>
              {[
                { day:"SEG", content:"🚵 MTB", sub:"Técnico ou base Z2", color:"#4ade80" },
                { day:"TER", content:"⚡ TREINO A", sub:"Core + Cadeia Posterior + Lombar", color:"#4ade80" },
                { day:"QUA", content:"🚵 MTB", sub:"Intervalo ou Z2", color:"#4ade80" },
                { day:"QUI", content:"🔥 TREINO B", sub:"Glúteos + Quadríceps + Propriocepção", color:"#f97316" },
                { day:"SEX", content:"🚵 MTB", sub:"Longo ou XC específico", color:"#4ade80" },
                { day:"SÁB", content:"🏔️ TREINO C", sub:"Ombros + Integração + Panturrilha", color:"#c084fc" },
                { day:"DOM", content:"😴 RECUPERAÇÃO", sub:"Ativo leve, mobilidade, banho frio", color:"#555" },
              ].map((d,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 16px", borderBottom: i<6 ? "1px solid #ffffff07" : "none", background: i%2===0 ? "#ffffff02" : "transparent" }}>
                  <div style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:14, letterSpacing:2, color:"#444", width:34, flexShrink:0 }}>{d.day}</div>
                  <div>
                    <div style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:14, color:d.color, fontWeight:700 }}>{d.content}</div>
                    <div style={{ fontSize:10, color:"#555", marginTop:1 }}>{d.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:22, letterSpacing:4, color:"#4ade80", marginBottom:12 }}>CONEXÃO COM O MTB</div>
            {[
              { title:"Descidas Técnicas", icon:"⛰️", color:"#f97316", items:[{ex:"Skater Squat",why:"Treina o joelho travado em ângulo neutro — posição exata da descida com quadril atrás e tronco baixo."},{ex:"Equilíbrio Unipodal no Bosu",why:"Propriocepção treinada = reação mais rápida quando a roda escapa em pedra ou raiz."},{ex:"T Push-Up",why:"Reflexo de ombro para absorver impactos abruptos do guidão."}]},
              { title:"Subidas Longas", icon:"🔼", color:"#4ade80", items:[{ex:"Romanian Deadlift (RDL)",why:"Isquiotibiais e glúteos resistentes = menos cãibra e mais potência no final."},{ex:"Hollow Body Hold",why:"Previne a perda de postura lombar na fadiga — o core aguenta mais."},{ex:"Step Up com Pausa",why:"Replica o padrão unilateral do pedal em rampas."}]},
              { title:"Curvas e Técnica", icon:"↩️", color:"#facc15", items:[{ex:"Lateral Lunge",why:"Adutores fortes = melhor inclinação lateral do corpo nas curvas."},{ex:"Thread the Needle",why:"Dissociação tronco-quadril: a chave das curvas técnicas."},{ex:"Face Pull + Band Pull Apart",why:"Ombros estáveis = guidão mais preciso."}]},
              { title:"Provas acima de 3 horas", icon:"⏱️", color:"#38bdf8", items:[{ex:"Calf Raise Excêntrico Unipodal",why:"Panturrilha resiliente = sem cãibra nos últimos 20km das maratonas XCM."},{ex:"Good Morning + RDL (altas reps)",why:"Resistência muscular na cadeia posterior evita fadiga precoce."},{ex:"Respiração Diafragmática",why:"Menor custo energético respiratório em esforços prolongados."}]},
            ].map((note,ni) => (
              <div key={ni} style={{ background:`linear-gradient(135deg,${note.color}10 0%,transparent 70%)`, border:`1px solid ${note.color}33`, borderRadius:12, padding:16, marginBottom:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                  <span style={{ fontSize:20 }}>{note.icon}</span>
                  <div style={{ fontFamily:"'Bebas Neue', sans-serif", fontSize:17, letterSpacing:3, color:note.color }}>{note.title}</div>
                </div>
                <div style={{ display:"grid", gap:7 }}>
                  {note.items.map((item,ii) => (
                    <div key={ii} style={{ background:"#ffffff05", borderRadius:7, padding:"9px 12px", display:"flex", gap:10 }}>
                      <div style={{ width:3, borderRadius:2, background:note.color, flexShrink:0 }} />
                      <div>
                        <div style={{ fontFamily:"'Barlow Condensed', sans-serif", fontSize:13, color:"#fff", fontWeight:700, marginBottom:2 }}>{item.ex}</div>
                        <div style={{ fontSize:11, color:"#999", lineHeight:1.5 }}>{item.why}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
