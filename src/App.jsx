import { useState } from "react";

// ─── EXERCISE MEDIA ────────────────────────────────────────────────────────────
// Images: free GIFs from exercisedb / wger / wikimedia
// Videos: verified YouTube IDs (open in new tab)
const MEDIA = {
  // ── TREINO A ─────────────────────────────────────────────────────────────────
  "Cat-Cow (Gato-Vaca)": {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Cat-Cow_Pose.gif/220px-Cat-Cow_Pose.gif",
    gif: true,
    ytId: "kqnua4rHVVA",
    ytTitle: "How to Do a Cat Cow Pose — Howcast",
  },
  "Hip 90/90 com Rotação de Tronco": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/seated-90-90-hip-stretch.jpg",
    ytId: "qg8E5MkRHLo",
    ytTitle: "90/90 Hip Stretch Tutorial",
  },
  "Dead Bug — Ativação de Core Profundo": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/dead-bug-exercise.jpg",
    ytId: "4XLEnwUr1d8",
    ytTitle: "Dead Bug Exercise — Proper Form",
  },
  "Glute Bridge Lento (Ponte de Glúteo)": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/glute-bridge.jpg",
    ytId: "8bbE64NuDTU",
    ytTitle: "Glute Bridge — Proper Form",
  },
  "Romanian Deadlift — RDL": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/romanian-deadlift.jpg",
    ytId: "KN5vN3JskqI",
    ytTitle: "Romanian Deadlift — Proper Form & Technique [4K]",
  },
  "Bird Dog com Pausa de 3 Segundos": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/bird-dog-exercise.jpg",
    ytId: "wiFNA3sqjCA",
    ytTitle: "How to Do the Bird Dog Exercise",
  },
  "Hollow Body Hold (Posição Hollow)": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/hollow-body-hold.jpg",
    ytId: "LlDNef_Ztsc",
    ytTitle: "Hollow Body Hold Progression — GMB Fitness",
  },
  "Good Morning com Faixa Elástica": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/banded-good-morning.jpg",
    ytId: "fJA39ZOVaEQ",
    ytTitle: "How To Do Banded Good Mornings — Rogue",
  },
  "Pallof Press — Anti-Rotação": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/pallof-press.jpg",
    ytId: "axgv7H_VQOo",
    ytTitle: "Pallof Press Exercise Guide — BarBend",
  },
  "Superman Alternado com Pausa": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/alternating-superman.jpg",
    ytId: "cc3tHPVRXgE",
    ytTitle: "Superman Exercise — Alternating",
  },
  // ── TREINO B ─────────────────────────────────────────────────────────────────
  "World's Greatest Stretch": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/worlds-greatest-stretch.jpg",
    ytId: "Q3lJRL_QC9Y",
    ytTitle: "World's Greatest Stretch Tutorial",
  },
  "Lateral Band Walk (Caminhada Lateral com Faixa)": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/lateral-band-walk.jpg",
    ytId: "pqSxMVPGyjY",
    ytTitle: "Lateral Band Walk — Glute Med Activation",
  },
  "Leg Swing — Frontal e Lateral": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/leg-swing.jpg",
    ytId: "LMnGHNlpfAQ",
    ytTitle: "Leg Swings — Hip Mobility Drill",
  },
  "Agachamento de Ativação (Lento)": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/bodyweight-squat.jpg",
    ytId: "aclHkVaku9U",
    ytTitle: "Bodyweight Squat — Activation",
  },
  "Agachamento Búlgaro (Rear Foot Elevated Split Squat)": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/dumbbell-bulgarian-split-squat.jpg",
    ytId: "SkNsa3eBwLA",
    ytTitle: "How to do the Bulgarian Split Squat — 2 Min Tutorial",
  },
  "Step Up com Pausa de 2 Segundos": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/step-up.jpg",
    ytId: "aKj-6hgiViA",
    ytTitle: "How To PROPERLY Perform Dumbbell Step Ups",
  },
  "Single Leg Deadlift (Levantamento Unipodal)": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/single-leg-romanian-deadlift.jpg",
    ytId: "ooGNupLrZJw",
    ytTitle: "Single Leg Deadlift — Proper Form & Tutorial",
  },
  "Lateral Lunge com Toque no Chão": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/lateral-lunge.jpg",
    ytId: "gwWv7aPcD88",
    ytTitle: "How To Series — Lateral Lunge",
  },
  "Equilíbrio Unipodal no Bosu": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/single-leg-bosu-balance.jpg",
    ytId: "rCJKBqOJUV8",
    ytTitle: "Single Leg Balance on Bosu — Proprioception",
  },
  "Skater Squat (Agachamento Patinador)": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/skater-squat.jpg",
    ytId: "YO-247pOeIc",
    ytTitle: "Skater Squats — Best Bodyweight Leg Exercise",
  },
  // ── TREINO C ─────────────────────────────────────────────────────────────────
  "Shoulder CARs (Rotações Articulares Controladas)": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/shoulder-car-rotation.jpg",
    ytId: "2NEzCYI2_sU",
    ytTitle: "Shoulder CARs — Controlled Articular Rotations",
  },
  "Band Pull Apart (Faixa Elástica)": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/band-pull-apart.jpg",
    ytId: "VGcEkjGHH6I",
    ytTitle: "Band Pull Apart — Upper Back & Shoulder Health",
  },
  "Calf Raises Lentos na Borda do Degrau": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/standing-calf-raise.jpg",
    ytId: "D7KaRcUTQeE",
    ytTitle: "Calf Raises — Full Range on Step",
  },
  "Inchworm com Push-Up": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/inchworm.jpg",
    ytId: "Zrn-mQGpSKs",
    ytTitle: "Inchworm with Push-Up — Full Body Warm-Up",
  },
  "Face Pull com Faixa Elástica": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/face-pull.jpg",
    ytId: "AlTGQrDOd98",
    ytTitle: "Banded Face Pulls Tutorial — Proper Form",
  },
  "Plank com Thread the Needle (Rotação Torácica)": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/thread-the-needle.jpg",
    ytId: "GBzCNEjborE",
    ytTitle: "Thread the Needle — Thoracic Rotation",
  },
  "Single Arm Row com Faixa Elástica": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/single-arm-band-row.jpg",
    ytId: "ZPU0mZyMmgE",
    ytTitle: "Single Arm Band Row",
  },
  "Calf Raise Unipodal Excêntrico na Borda": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/single-leg-calf-raise.jpg",
    ytId: "fuiPJBMTv3c",
    ytTitle: "Eccentric Single Leg Calf Raise",
  },
  "T Push-Up (Flexão com Rotação)": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/t-push-up.jpg",
    ytId: "vRqGdDlPQKM",
    ytTitle: "T Push-Up — Rotation Push-Up Tutorial",
  },
  "Turkish Get-Up — TGU": {
    img: "https://cdn.muscleandstrength.com/sites/default/files/turkish-get-up.jpg",
    ytId: "5kb9Blkrj2w",
    ytTitle: "The Turkish Get-Up Step by Step",
  },
};

// ─── Fallback: exercise illustration SVGs per category ─────────────────────────
function ExerciseIllustration({ name, color }) {
  // Simple SVG stick figures per movement pattern
  const patterns = {
    floor: ["Cat-Cow", "Dead Bug", "Hollow Body", "Glute Bridge", "Bird Dog", "Superman"],
    hinge: ["Romanian Deadlift", "Good Morning", "Single Leg Deadlift"],
    squat: ["Agachamento", "Búlgaro", "Step Up", "Skater", "Lateral Lunge"],
    pull: ["Pallof", "Face Pull", "Band Pull Apart", "Single Arm Row"],
    balance: ["Equilíbrio", "Bosu"],
    shoulder: ["Shoulder CARs", "Thread", "T Push-Up", "Inchworm"],
    getup: ["Turkish"],
    stretch: ["Hip 90", "World's Greatest", "Leg Swing", "Pigeon", "Couch", "Child", "Calf", "Doorway", "Thoracic", "Neck", "Respiração", "Adductor", "Isquiotibiais", "Standing", "Box Breathing", "4-7-8", "Alongside"],
    walk: ["Lateral Band Walk"],
  };

  let type = "floor";
  for (const [key, names] of Object.entries(patterns)) {
    if (names.some(n => name.includes(n))) { type = key; break; }
  }

  const svgs = {
    floor: (
      <svg viewBox="0 0 120 80" style={{ width: "100%", height: "100%" }}>
        <ellipse cx="35" cy="20" rx="8" ry="8" fill={color + "cc"} />
        <line x1="35" y1="28" x2="35" y2="55" stroke={color} strokeWidth="3" strokeLinecap="round"/>
        <line x1="35" y1="38" x2="20" y2="50" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="35" y1="38" x2="50" y2="50" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="35" y1="55" x2="20" y2="70" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="35" y1="55" x2="50" y2="70" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <text x="65" y="40" fill={color + "99"} fontSize="9" fontFamily="sans-serif">posição</text>
        <text x="65" y="52" fill={color + "99"} fontSize="9" fontFamily="sans-serif">horizontal</text>
        <line x1="10" y1="75" x2="110" y2="75" stroke={color + "44"} strokeWidth="1.5"/>
      </svg>
    ),
    hinge: (
      <svg viewBox="0 0 120 80" style={{ width: "100%", height: "100%" }}>
        <ellipse cx="80" cy="15" rx="8" ry="8" fill={color + "cc"} />
        <line x1="80" y1="23" x2="55" y2="45" stroke={color} strokeWidth="3" strokeLinecap="round"/>
        <line x1="68" y1="34" x2="85" y2="25" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="55" y1="45" x2="48" y2="70" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="55" y1="45" x2="68" y2="70" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="30" y="62" width="10" height="8" rx="2" fill={color + "88"}/>
        <rect x="60" y="62" width="10" height="8" rx="2" fill={color + "88"}/>
        <text x="10" y="30" fill={color + "99"} fontSize="9" fontFamily="sans-serif">hip hinge</text>
        <line x1="10" y1="75" x2="110" y2="75" stroke={color + "44"} strokeWidth="1.5"/>
      </svg>
    ),
    squat: (
      <svg viewBox="0 0 120 80" style={{ width: "100%", height: "100%" }}>
        <ellipse cx="60" cy="14" rx="8" ry="8" fill={color + "cc"} />
        <line x1="60" y1="22" x2="60" y2="45" stroke={color} strokeWidth="3" strokeLinecap="round"/>
        <line x1="60" y1="32" x2="42" y2="40" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="60" y1="32" x2="78" y2="40" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="60" y1="45" x2="45" y2="68" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="60" y1="45" x2="75" y2="68" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <text x="20" y="78" fill={color + "99"} fontSize="9" fontFamily="sans-serif">agachamento</text>
        <line x1="10" y1="75" x2="110" y2="75" stroke={color + "44"} strokeWidth="1.5"/>
      </svg>
    ),
    pull: (
      <svg viewBox="0 0 120 80" style={{ width: "100%", height: "100%" }}>
        <ellipse cx="40" cy="18" rx="8" ry="8" fill={color + "cc"} />
        <line x1="40" y1="26" x2="40" y2="52" stroke={color} strokeWidth="3" strokeLinecap="round"/>
        <line x1="40" y1="36" x2="65" y2="30" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="40" y1="36" x2="22" y2="44" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="40" y1="52" x2="30" y2="72" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="40" y1="52" x2="50" y2="72" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="70" y1="30" x2="100" y2="30" stroke={color + "66"} strokeWidth="2" strokeDasharray="4,3"/>
        <circle cx="100" cy="30" r="4" fill={color + "55"}/>
        <line x1="10" y1="75" x2="110" y2="75" stroke={color + "44"} strokeWidth="1.5"/>
      </svg>
    ),
    balance: (
      <svg viewBox="0 0 120 80" style={{ width: "100%", height: "100%" }}>
        <ellipse cx="60" cy="12" rx="8" ry="8" fill={color + "cc"} />
        <line x1="60" y1="20" x2="60" y2="48" stroke={color} strokeWidth="3" strokeLinecap="round"/>
        <line x1="60" y1="30" x2="42" y2="22" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="60" y1="30" x2="78" y2="22" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="60" y1="48" x2="60" y2="68" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="60" y1="55" x2="72" y2="48" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <ellipse cx="60" cy="70" rx="16" ry="5" fill={color + "33"} stroke={color + "66"} strokeWidth="1"/>
        <line x1="10" y1="76" x2="110" y2="76" stroke={color + "44"} strokeWidth="1.5"/>
      </svg>
    ),
    shoulder: (
      <svg viewBox="0 0 120 80" style={{ width: "100%", height: "100%" }}>
        <ellipse cx="60" cy="14" rx="8" ry="8" fill={color + "cc"} />
        <line x1="60" y1="22" x2="60" y2="50" stroke={color} strokeWidth="3" strokeLinecap="round"/>
        <path d="M60,32 Q40,20 30,10" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M60,32 Q80,10 90,18" stroke={color + "77"} strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="4,3"/>
        <line x1="60" y1="50" x2="46" y2="70" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="60" y1="50" x2="74" y2="70" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <text x="10" y="78" fill={color + "99"} fontSize="8" fontFamily="sans-serif">rotação ombro</text>
        <line x1="10" y1="75" x2="110" y2="75" stroke={color + "44"} strokeWidth="1.5"/>
      </svg>
    ),
    getup: (
      <svg viewBox="0 0 120 80" style={{ width: "100%", height: "100%" }}>
        <ellipse cx="25" cy="55" rx="7" ry="7" fill={color + "cc"} />
        <line x1="25" y1="62" x2="55" y2="65" stroke={color} strokeWidth="3" strokeLinecap="round"/>
        <line x1="35" y1="63" x2="28" y2="75" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="35" y1="63" x2="50" y2="58" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="50" y1="58" x2="62" y2="45" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="63" cy="40" r="5" fill={color + "66"} stroke={color} strokeWidth="1.5"/>
        <text x="72" y="20" fill={color + "99"} fontSize="8" fontFamily="sans-serif">Turkish</text>
        <text x="72" y="30" fill={color + "99"} fontSize="8" fontFamily="sans-serif">Get-Up</text>
        <line x1="10" y1="78" x2="110" y2="78" stroke={color + "44"} strokeWidth="1.5"/>
      </svg>
    ),
    walk: (
      <svg viewBox="0 0 120 80" style={{ width: "100%", height: "100%" }}>
        <ellipse cx="50" cy="14" rx="8" ry="8" fill={color + "cc"} />
        <line x1="50" y1="22" x2="50" y2="50" stroke={color} strokeWidth="3" strokeLinecap="round"/>
        <line x1="50" y1="34" x2="30" y2="28" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="50" y1="34" x2="70" y2="28" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="50" y1="50" x2="35" y2="70" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="50" y1="50" x2="65" y2="70" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M25,58 Q50,52 75,58" stroke={color + "55"} strokeWidth="1.5" fill="none" strokeDasharray="4,3"/>
        <line x1="10" y1="75" x2="110" y2="75" stroke={color + "44"} strokeWidth="1.5"/>
      </svg>
    ),
    stretch: (
      <svg viewBox="0 0 120 80" style={{ width: "100%", height: "100%" }}>
        <ellipse cx="60" cy="14" rx="8" ry="8" fill={color + "cc"} />
        <path d="M60,22 Q50,40 40,55" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
        <line x1="60" y1="36" x2="78" y2="30" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="40" y1="55" x2="25" y2="68" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="40" y1="55" x2="58" y2="65" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
        <text x="68" y="55" fill={color + "99"} fontSize="9" fontFamily="sans-serif">mobilidade</text>
        <line x1="10" y1="75" x2="110" y2="75" stroke={color + "44"} strokeWidth="1.5"/>
      </svg>
    ),
  };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {svgs[type] || svgs.floor}
    </div>
  );
}

// ─── Exercise Image Component ─────────────────────────────────────────────────
function ExerciseImage({ name, color }) {
  const media = MEDIA[name];
  const [imgOk, setImgOk] = useState(!!media?.img);

  if (!media?.img || !imgOk) {
    return (
      <div style={{ width: "100%", height: "100%", background: `${color}10`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ExerciseIllustration name={name} color={color} />
      </div>
    );
  }

  return (
    <img
      src={media.img}
      alt={name}
      onError={() => setImgOk(false)}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
}

// ─── YouTube Button ───────────────────────────────────────────────────────────
function YoutubeBtn({ name }) {
  const media = MEDIA[name];
  if (!media?.ytId) return null;
  return (
    <a
      href={`https://www.youtube.com/watch?v=${media.ytId}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        background: "#ff000018", border: "1px solid #ff000044",
        borderRadius: 8, padding: "6px 12px",
        textDecoration: "none", fontSize: 11,
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700, color: "#ff6666", letterSpacing: 0.5,
        transition: "all 0.15s",
      }}
      onMouseEnter={e => { e.currentTarget.style.background = "#ff000030"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "#ff000018"; }}
    >
      <span style={{ fontSize: 13 }}>▶</span> VER TUTORIAL NO YOUTUBE ↗
    </a>
  );
}

// ─── EXERCISE DATABASE ────────────────────────────────────────────────────────
const TRAININGS = [
  // ══════════════════════════════════════════════════════════════════════════════
  // TREINO A
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: "A", icon: "⚡", color: "#4ade80",
    name: "TREINO A",
    focus: "Core Profundo · Cadeia Posterior · Lombar",
    duration: "45–55 min",
    mtbLink: "Subidas longas, postura no pedal, prevenção de dor lombar",
    warmup: [
      {
        name: "Cat-Cow (Gato-Vaca)", sets: "2 × 10 reps lentas", equipment: "Peso corporal",
        steps: ["Em quatro apoios: joelhos sob quadris, pulsos sob ombros.", "VACA: inspire, barriga cai, olhar e cóccix sobem. Arqueie toda a coluna.", "GATO: expire, empurre o meio das costas para o teto, queixo ao peito.", "Mínimo 3 segundos em cada posição. Sinta cada vértebra se movendo."],
        feel: "Deve sentir: alongamento na lombar e torácica. Pressão suave no abdômen durante o gato.",
        errors: "Erro: mover só o pescoço. O movimento deve vir de toda a coluna.",
        muscles: "Eretores, multífidos, reto abdominal, coluna torácica",
        mtb: "Torácica rígida impede absorção de impacto nas descidas.",
      },
      {
        name: "Hip 90/90 com Rotação de Tronco", sets: "2 × 8 reps/lado", equipment: "Peso corporal",
        steps: ["Sente no chão, perna da frente em 90° e perna de trás em 90° para o lado.", "Coluna ereta, incline o tronco sobre a perna da frente.", "Gire o tronco abrindo o peito para o lado oposto — rotação vem da torácica.", "Use cada expiração para aprofundar a posição."],
        feel: "Tensão na virilha (perna de fora), glúteo (perna da frente), rotação nas costas.",
        errors: "Inclinar o tronco de lado. Mantenha coluna reta — o movimento é no quadril.",
        muscles: "Rotadores do quadril, piriforme, TFL, adutores, torácica",
        mtb: "Mobilidade de quadril para inclinação nas curvas e posição em descidas.",
      },
      {
        name: "Dead Bug — Ativação de Core Profundo", sets: "2 × 8 reps/lado", equipment: "Peso corporal",
        steps: ["Deite de costas, braços para o teto, pernas em 90° (coxas verticais).", "CRÍTICO: lombar 100% colada ao chão — nunca perde este contato.", "Expire e desça braço direito (para trás) + estenda perna esquerda (para frente).", "Se a lombar levantar, reduza a amplitude. Retorne e troque o lado."],
        feel: "Contração profunda abaixo do umbigo. Não na barriga toda — no centro.",
        errors: "Arqueiar a lombar, prender a respiração, mover rápido.",
        muscles: "Transverso abdominal, multífidos, psoas, diafragma",
        mtb: "Estabiliza a pelve em cada pedalada. Sem ele a lombar sofre nos longos.",
      },
      {
        name: "Glute Bridge Lento (Ponte de Glúteo)", sets: "2 × 10 reps (3s sobe / 2s pausa / 3s desce)", equipment: "Peso corporal",
        steps: ["Deitado, joelhos dobrados, pés no chão na largura dos quadris.", "Ative o core: lombar leve para baixo antes de começar.", "Expire e empurre os calcanhares — suba o quadril em 3 segundos.", "No topo: esprema os glúteos ao máximo. Segure 2s. Desça em 3s."],
        feel: "Queimação nos glúteos no topo. Se sentir mais nas coxas, empurre mais os calcanhares.",
        errors: "Subir demais (hiperextensão lombar) ou não apertar o glúteo no topo.",
        muscles: "Glúteo máximo, glúteo médio, isquiotibiais, core",
        mtb: "Glúteos fracos = joelho caindo para dentro + dor lombar nas subidas.",
      },
    ],
    main: [
      {
        name: "Romanian Deadlift — RDL", sets: "3 × 12 reps", rest: "45s", equipment: "Halteres leves a moderados",
        steps: ["Em pé, halteres à frente das coxas, palmas para o corpo.", "Inspire, ative o core. Empurre o quadril para TRÁS — dobradiça, não agachamento.", "Desça os halteres rentes às coxas mantendo coluna neutra.", "Desça até sentir forte tensão nos isquiotibiais (atrás da coxa).", "Expire, ative o glúteo: empurre o quadril para frente para subir."],
        feel: "Estiramento profundo na parte de trás da coxa. Glúteo forte na subida. Se sentir nas costas, reduza a carga.",
        errors: "Arredondar a lombar, dobrar os joelhos demais (vira agachamento), afastar os halteres do corpo.",
        muscles: "Isquiotibiais (foco), glúteo máximo, eretores, core",
        mtb: "Cadeia posterior é o motor das subidas longas. RDL forte = menos cãibra no final.",
        progression: { "1–2": "Halteres leves, 10 reps, técnica", "3–4": "Carga moderada, 12 reps, 3s descida", "5–6": "Carga moderada-alta, 12 reps + pausa 2s", "7–8": "3-4 séries, 15 reps, 3s excêntrico" },
      },
      {
        name: "Bird Dog com Pausa de 3 Segundos", sets: "3 × 10 reps/lado", rest: "30s", equipment: "Peso corporal",
        steps: ["Quatro apoios: joelhos sob quadris, pulsos sob ombros. Coluna neutra.", "Ative o core — como se fosse levar um soco na barriga.", "Estenda braço direito à frente + perna esquerda para trás simultaneamente.", "PAUSA 3 segundos: quadril completamente NIVELADO — não deixe cair.", "Retorne sem tocar o joelho/mão no chão. Repita no mesmo lado."],
        feel: "Glúteo da perna levantada, lombar estabilizando, ombro oposto. O tremido é o sistema nervoso ativando.",
        errors: "Rotacionar o quadril para 'abrir espaço'. Proibido — o quadril fica paralelo ao chão.",
        muscles: "Multífidos, transverso abdominal, glúteo máximo, deltóide, romboides, eretores",
        mtb: "Quando a bike salta, o core absorve sem transmitir para a lombar.",
        progression: { "1–2": "3s pausa, 8 reps/lado", "3–4": "Pausa + puxar cotovelo ao joelho", "5–6": "Com elástico no tornozelo", "7–8": "Bird Dog Row com halter leve" },
      },
      {
        name: "Hollow Body Hold (Posição Hollow)", sets: "3 × 30–45 segundos", rest: "45s", equipment: "Peso corporal",
        steps: ["Deite de costas. Primeiro: lombar pressionada ao chão — NUNCA perde esse contato.", "Eleve os ombros e estenda os braços acima da cabeça.", "Eleve as pernas a 30–45 cm. Mais baixo = mais difícil. Se lombar levantar, suba as pernas.", "Mantenha respirando. Corpo em 'banana côncava' — barriga pra dentro."],
        feel: "Queimação intensa no centro do abdômen, tensão nos quadríceps e ombros. Tremido é normal.",
        errors: "Lombar saindo do chão, prender a respiração, dobrar joelhos.",
        muscles: "Transverso abdominal, reto abdominal, iliopsoas, quadríceps, serrátil",
        mtb: "Idêntico à postura no MTB — core comprimido sustentando a bike em descidas.",
        progression: { "1–2": "30s, pernas a 60cm", "3–4": "40s, pernas a 45cm", "5–6": "45s, pernas a 30cm", "7–8": "60s ou dead bug hollow" },
      },
      {
        name: "Good Morning com Faixa Elástica", sets: "3 × 15 reps", rest: "45s", equipment: "Faixa elástica",
        steps: ["Faixa atrás do pescoço/ombros, pise nas pontas. Mãos nas extremidades próximas ao ombro.", "Inspire, ative o core. Empurre o quadril para trás inclinando o tronco à frente.", "Desça até o tronco quase paralelo ao chão (ou até onde a coluna neutra permitir).", "Expire e ative os glúteos para retornar — o glúteo puxa o quadril, não as costas."],
        feel: "Forte tensão nos isquiotibiais na descida. Glúteos e lombar na subida.",
        errors: "Arredondar a lombar, dobrar os joelhos demais.",
        muscles: "Isquiotibiais, glúteo máximo, eretores, lombar",
        mtb: "Simula posição inclinada do ciclista — treina resistência postural da lombar.",
        progression: { "1–2": "Faixa leve, 12 reps, amplitude reduzida", "3–4": "Faixa média, 15 reps", "5–6": "Faixa média-forte, 3s excêntrico", "7–8": "Faixa forte, 15 reps + 5 com pausa 3s" },
      },
      {
        name: "Pallof Press — Anti-Rotação", sets: "3 × 12 reps/lado", rest: "30s", equipment: "Faixa elástica ancorada",
        steps: ["Ancore a faixa na altura do peito. De lado à âncora, mãos juntas na faixa na altura do peito.", "Afaste-se até tensão moderada. Pés na largura dos ombros, joelhos levemente dobrados.", "Sinta a faixa tentando te girar — RESISTA. Essa é a essência.", "Estenda os braços lentamente à frente sem rotacionar o tronco. Segure 2 segundos.", "Retorne devagar."],
        feel: "Trabalho intenso nos oblíquos e lateral do core. Também glúteo médio estabilizando.",
        errors: "Compensar com o ombro ou deixar o quadril girar. Peito sempre para frente.",
        muscles: "Oblíquos internos e externos, transverso abdominal, glúteo médio",
        mtb: "Anti-rotação mantém o tronco estável enquanto os braços guiam no terreno técnico.",
        progression: { "1–2": "Faixa leve, perto da âncora, 10 reps", "3–4": "Faixa média, 12 reps", "5–6": "12 reps + passo lateral segurando", "7–8": "Faixa forte + agachamento em cada extensão" },
      },
      {
        name: "Superman Alternado com Pausa", sets: "3 × 12 reps/lado", rest: "30s", equipment: "Peso corporal",
        steps: ["Deite de barriga para baixo, braços acima da cabeça, pernas estendidas.", "Ative glúteos e core — encolha o umbigo em direção à coluna.", "Levante braço direito + perna esquerda simultaneamente. Máximo 15–20cm.", "Segure 2 segundos. Volte e troque o lado.", "Pescoço neutro — olhar para o chão."],
        feel: "Contração na lombar, glúteo (perna levantada) e trapézio/ombro (braço levantado).",
        errors: "Levantar muito (compressão lombar), rotacionar o quadril, levantar a cabeça.",
        muscles: "Eretores, glúteo máximo, romboide, trapézio médio e inferior, deltóide posterior",
        mtb: "Lombar resistente absorve solavancos sem dores pós-prova.",
        progression: { "1–2": "Sem pausa, 10 reps/lado", "3–4": "2s pausa, 12 reps", "5–6": "3s pausa + torção diagonal leve", "7–8": "Com halteres leves, 12 reps/lado" },
      },
    ],
    cooldown: [
      { name: "Pigeon Pose (Pombo)", duration: "60s/lado", steps: ["Do quadrupede, joelho direito à frente em diagonal. Perna esquerda estendida.", "Caminhe as mãos para frente e incline o tronco. Testa pode tocar o chão.", "Respire profundamente — a cada expiração, afunde mais."], feel: "Profundo no glúteo e piriforme. Se sentir no joelho, ajuste o ângulo da canela.", muscles: "Piriforme, rotadores do quadril, glúteo médio, TFL" },
      { name: "Alongamento de Isquiotibiais em Pé", duration: "45s/lado", steps: ["Calcanhar numa superfície elevada, joelho estendido.", "Coluna reta, incline o tronco à frente.", "Puxe levemente a ponta do pé em sua direção."], feel: "Tensão forte na parte de trás da coxa.", muscles: "Isquiotibiais, panturrilha" },
      { name: "Child's Pose com Rotação Lateral", duration: "30s/lado", steps: ["Posição do bebê: joelhos afastados, bumbum nos calcanhares, braços esticados.", "Deslize o braço direito por baixo do corpo rotacionando o tronco.", "Ombro direito toca o chão. Respire e relaxe."], feel: "Abertura lateral das costas, torácica e lombar relaxando.", muscles: "Latíssimo do dorso, eretores torácicos, lombar" },
      { name: "Respiração Diafragmática — Recuperação", duration: "2–3 minutos", steps: ["Deitado, mão no peito e outra no abdômen.", "Inspire 4s pelo nariz: abdômen sobe primeiro.", "Expire 6s: abdômen desce, peito desce. Mão do peito se move pouco."], feel: "Ritmo cardíaco desacelerando, tensão aliviando, mente acalmando.", muscles: "Diafragma, sistema nervoso parassimpático" },
    ],
  },
  // ══════════════════════════════════════════════════════════════════════════════
  // TREINO B
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: "B", icon: "🔥", color: "#f97316",
    name: "TREINO B",
    focus: "Glúteos · Quadríceps · Equilíbrio · Propriocepção",
    duration: "50–60 min",
    mtbLink: "Descidas técnicas, curvas, controle de joelho, terrenos acidentados",
    warmup: [
      {
        name: "World's Greatest Stretch", sets: "5 reps/lado", equipment: "Peso corporal",
        steps: ["Passo grande à frente com pé direito. Mão direita no chão ao lado do pé.", "Gire o tronco para a esquerda, braço esquerdo ao teto. Siga a mão com o olhar.", "Retorne a mão ao chão. Estique o joelho traseiro, calcanhar no chão.", "Volte e repita no lado oposto."],
        feel: "Abertura de quadril, rotação nas costas, panturrilha.", errors: "Mão longe do pé dificulta a rotação.", muscles: "Adutores, flexores do quadril, torácica, panturrilha, ombros", mtb: "Prepara toda a cadeia cinemática de uma só vez.",
      },
      {
        name: "Lateral Band Walk (Caminhada Lateral com Faixa)", sets: "2 × 15 passos/lado", equipment: "Faixa elástica abaixo dos joelhos",
        steps: ["Faixa abaixo dos joelhos, pés paralelos levemente afastados.", "Semi-agachamento (20–30°). MANTENHA esta posição o tempo todo.", "Passo lateral com pé direito, suficiente para manter tensão na faixa.", "Traga o pé esquerdo. Não deixe os pés se juntarem. Joelhos apontam para os pés."],
        feel: "Queimação rápida no glúteo médio (lateral do quadril). Se não sentir, abra mais os passos.", errors: "Joelhos caindo para dentro, subir do agachamento entre os passos.", muscles: "Glúteo médio (foco), glúteo mínimo, TFL, abdutores", mtb: "Glúteo médio fraco = joelho que colapsa nas curvas e descidas.",
      },
      {
        name: "Leg Swing — Frontal e Lateral", sets: "10 reps/direção/perna", equipment: "Apoio na parede",
        steps: ["FRONTAL: mão na parede, balance a perna frente-trás como pêndulo. Amplitude crescente.", "LATERAL: de frente para a parede, balance a perna para o lado e cruzando na frente.", "Tronco não rotaciona — movimento 100% do quadril.", "Pé em dorsiflexão (puxado para cima) durante os swings."],
        feel: "Liberação progressiva na virilha, glúteo e lateral do quadril.", errors: "Balançar o tronco junto. Core levemente ativado.", muscles: "Flexores, extensores, abdutores e adutores do quadril", mtb: "Mobilidade do quadril melhora eficiência do pedal e liberdade nas curvas.",
      },
      {
        name: "Agachamento de Ativação (Lento)", sets: "2 × 8 reps (3s desce / 2s pausa)", equipment: "Peso corporal",
        steps: ["Pés na largura dos ombros, dedos 15–30° para fora.", "Desça em 3 segundos, peito erguido, joelhos apontando para os pés.", "Pause 2 segundos no fundo. Suba de forma firme.", "Cheque: calcanhar fica no chão durante todo o movimento?"],
        feel: "Ativação simétrica nos dois quadríceps. Glúteos ao subir.", errors: "Joelhos colabando, calcanhar saindo do chão.", muscles: "Quadríceps, glúteo máximo, isquiotibiais, core", mtb: "Ativa extensores do joelho que trabalham em cada pedalada.",
      },
    ],
    main: [
      {
        name: "Agachamento Búlgaro (Rear Foot Elevated Split Squat)", sets: "3 × 10 reps/lado", rest: "45s", equipment: "Halteres opcional + banco",
        steps: ["Peito do pé traseiro numa superfície elevada (~40–50cm). Pé da frente avança para o joelho não passar além do dedão.", "Halteres ao lado do corpo (ou mãos na cintura sem peso). Incline o tronco ~15° à frente.", "Desça controlado: joelho traseiro desce em direção ao chão. Joelho da frente acompanha o dedão.", "Suba empurrando o calcanhar da frente. O glúteo é o motor — não use impulso da perna de trás."],
        feel: "Glúteo e quadríceps da perna da frente. Estiramento no flexor de quadril da perna de trás. Se sentir mais na perna de trás, avance mais o pé da frente.", errors: "Pé da frente muito perto, torso excessivamente ereto, apoiar peso na perna de trás.", muscles: "Quadríceps (foco), glúteo máximo, isquiotibiais, core, flexores do quadril", mtb: "Força unilateral de perna é a base das subidas técnicas — cada pedalada é unilateral.",
        progression: { "1–2": "Sem peso, 8 reps, superfície baixa", "3–4": "Halteres leves, 10 reps", "5–6": "Halteres moderados, 10 reps, 3s excêntrico", "7–8": "3-4s excêntrico + 1s pausa no fundo, 12 reps" },
      },
      {
        name: "Step Up com Pausa de 2 Segundos", sets: "3 × 12 reps/lado", rest: "45s", equipment: "Caixa 40–50cm, halteres opcional",
        steps: ["Um pé completamente sobre a caixa. Pé de baixo relaxado — NÃO dá impulso.", "Empurre o calcanhar de cima para subir.", "No topo: PAUSE 2 segundos, joelho levemente flexionado, quadril nivelado.", "Desça LENTAMENTE em 3 segundos. Toque o pé de baixo e suba de novo sem transferir peso."],
        feel: "Glúteo e quadríceps da perna de cima. A pausa no topo desafia o equilíbrio — é isso que ativa os estabilizadores.", errors: "Usar o pé de baixo para impulsionar — o erro mais comum.", muscles: "Quadríceps (vastus medialis), glúteo máximo, estabilizadores do tornozelo, core", mtb: "Replica o padrão unilateral do pedal em subidas.",
        progression: { "1–2": "Caixa 30cm, sem peso, 10 reps", "3–4": "Caixa 40cm, 12 reps, 2s pausa", "5–6": "Caixa 40cm, halteres leves", "7–8": "Caixa 50cm, halteres moderados, 3s excêntrico" },
      },
      {
        name: "Single Leg Deadlift (Levantamento Unipodal)", sets: "3 × 10 reps/lado", rest: "45s", equipment: "Halter ou kettlebell",
        steps: ["Em pé, peso na mão direita. Apoio na perna esquerda.", "Tronco e perna direita formam UMA linha reta. Ao inclinar o tronco, a perna sobe atrás.", "Quadril da perna levantada NÃO abre para o lado — paralelo ao chão.", "Desça o peso rente à perna de apoio, toque levemente o chão.", "Suba ativando o glúteo. Pé de apoio pressionado no chão em todas as direções."],
        feel: "Isquiotibiais e glúteo da perna de apoio. Dificuldade de equilíbrio é normal e desejada.", errors: "Rotacionar o quadril — perna vai para o lado ao invés de atrás.", muscles: "Isquiotibiais, glúteo máximo, glúteo médio, eretores, tibial anterior, fibulares", mtb: "Equilíbrio sobre um ponto = cada pedalada e cada 'pesca' em terreno solto.",
        progression: { "1–2": "Sem peso, mão na parede, 8 reps", "3–4": "Halter leve, sem apoio, 10 reps", "5–6": "Halter moderado, 2s pausa no fundo", "7–8": "Halter moderado, 3s excêntrico, 12 reps" },
      },
      {
        name: "Lateral Lunge com Toque no Chão", sets: "3 × 10 reps/lado", rest: "30s", equipment: "Peso corporal (halter opcional)",
        steps: ["Em pé. Afunde com o pé direito para o lado, pé esquerdo fixo e joelho estendido.", "Dobre o joelho direito e empurre o quadril para trás.", "Toque as mãos no chão ao lado do pé direito. Peito erguido.", "Empurre o calcanhar direito no chão para voltar."],
        feel: "Virilha e adutor da perna estendida. Glúteo e quadríceps da perna que afundou.", errors: "Joelho da perna que afunda indo para dentro, não empurrar o quadril para trás.", muscles: "Adutores (perna estendida), quadríceps, glúteo máximo e médio, core", mtb: "Adutores = críticos para inclinar a bicicleta nas curvas.",
        progression: { "1–2": "Sem peso, amplitude reduzida, 8 reps", "3–4": "Toque no chão, 10 reps", "5–6": "Halter Goblet à frente, 10 reps", "7–8": "Halter + 2s pausa no fundo, 12 reps" },
      },
      {
        name: "Equilíbrio Unipodal no Bosu", sets: "3 × 35–45s/perna", rest: "30s", equipment: "Bosu ball",
        steps: ["INICIAL: Bosu lado plano para CIMA (mais estável). Um pé no centro.", "AVANÇADO (sem 3–4+): lado abaulado para CIMA (mais instável).", "Suba e encontre o equilíbrio — dedos se agarram, tornozelo ajusta. Normal e desejado.", "Joelho levemente flexionado (nunca travado). Quadril nivelado.", "PROGRESSÃO: olhos abertos → fechados → head turns → braços se movendo."],
        feel: "Trabalho intenso no tornozelo, panturrilha e lateral da perna. O tremido é o sistema nervoso aprendendo.", errors: "Travar o joelho, segurar a respiração, ficar rígido.", muscles: "Tibial anterior, fibulares, tríceps sural, glúteo médio, core — propriocepção completa", mtb: "Reação mais rápida quando a bike 'escapa' em pedras ou areia.",
        progression: { "1–2": "Lado plano, olhos abertos, 25s", "3–4": "Lado abaulado, olhos abertos, 35s", "5–6": "Olhos fechados, 40s", "7–8": "Olhos fechados + head turns, 45s" },
      },
      {
        name: "Skater Squat (Agachamento Patinador)", sets: "3 × 8 reps/lado", rest: "45s", equipment: "Peso corporal (faixa para auxílio inicial)",
        steps: ["Em pé numa perna. Perna livre para trás, joelho dobrado.", "Incline o tronco levemente à frente — posição de descida no MTB: peito para baixo, quadril para trás.", "Desça: joelho traseiro em direção ao chão. Toque LEVEMENTE.", "Joelho da frente NÃO vai para dentro — aponta para o 2° dedo.", "Empurre o calcanhar para subir. Tronco permanece inclinado."],
        feel: "Quadríceps em chamas, glúteo forte, equilíbrio intenso.", errors: "Joelho colabando para dentro — o erro mais crítico. Pare e corrija imediatamente.", muscles: "Quadríceps (foco), glúteo máximo, isquiotibiais, core, estabilizadores do tornozelo", mtb: "O exercício mais próximo da posição real de descida técnica no MTB.",
        progression: { "1–2": "Com apoio faixa/parede, 5 reps", "3–4": "Sem apoio, amplitude média, 8 reps", "5–6": "Amplitude completa, 2s pausa no fundo", "7–8": "Amplitude completa + halter leve, 10 reps" },
      },
    ],
    cooldown: [
      { name: "Couch Stretch (Flexor do Quadril)", duration: "60s/lado", steps: ["Joelho direito no chão próximo à parede. Peito do pé na parede.", "Avance pé esquerdo à frente — joelho esquerdo em 90°.", "Aperte o glúteo direito, empurre o quadril levemente para frente."], feel: "Estiramento profundo na frente do quadril e coxa. O mais importante para ciclistas.", muscles: "Iliopsoas, reto femoral, flexores do quadril" },
      { name: "Adductor Rockback", duration: "2 × 10 reps lentas/lado", steps: ["Em quatro apoios, afaste o joelho direito bem para o lado.", "Balance o quadril para trás em direção ao pé de apoio.", "Retorne sem pressa."], feel: "Estiramento progressivo na virilha. A gravidade faz o trabalho.", muscles: "Adutores (magno, longo, curto), pectíneo, grácil" },
      { name: "Standing Calf Stretch — 2 Posições", duration: "45s cada posição/perna", steps: ["P1: antepé na parede, calcanhar no chão, joelho ESTENDIDO (gastrocnêmio).", "P2: mesma posição, mas DOBRE o joelho (sóleo).", "Ambas necessárias para um alongamento completo."], feel: "P1: alto na panturrilha. P2: mais profundo, perto do tendão de Aquiles.", muscles: "Gastrocnêmio (P1), sóleo (P2), tendão de Aquiles" },
      { name: "Box Breathing — Controle Autonômico", duration: "8–10 ciclos", steps: ["Inspire 4s → Segure 4s → Expire 4s → Segure vazio 4s.", "Ideal também antes de competições para controlar ansiedade."], feel: "Sistema nervoso desacelerando. Após 3–4 ciclos a FC já cai.", muscles: "Diafragma, sistema nervoso autônomo, parassimpático" },
    ],
  },
  // ══════════════════════════════════════════════════════════════════════════════
  // TREINO C
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: "C", icon: "🏔️", color: "#c084fc",
    name: "TREINO C",
    focus: "Ombros · Cintura Escapular · Panturrilhas · Integração Total",
    duration: "45–55 min",
    mtbLink: "Controle de guidão, absorção de impacto, estabilidade técnica, resistência de panturrilha",
    warmup: [
      {
        name: "Shoulder CARs (Rotações Articulares Controladas)", sets: "5 reps/sentido/ombro", equipment: "Peso corporal",
        steps: ["Em pé ou sentado. Um braço ao lado, o outro realiza o movimento.", "Levante à frente, leve acima da cabeça, para trás e abaixo — círculo completo.", "CRUCIAL: movimento ATIVO — use os músculos do ombro em cada ponto.", "No ponto mais difícil, não compense com o tronco.", "Devagar: cada círculo leva 8–10 segundos."],
        feel: "O ombro trabalhando em toda a amplitude. Onde há esforço, há fraqueza — informação útil.", errors: "Fazer rápido, compensar com o tronco, encolher o ombro.", muscles: "Deltóide (3 cabeças), manguito rotador, serrátil anterior", mtb: "Ombros com mobilidade ativa absorvem os impactos do guidão sem lesões.",
      },
      {
        name: "Band Pull Apart (Faixa Elástica)", sets: "3 × 15 reps", equipment: "Faixa elástica leve",
        steps: ["Segure a faixa na largura dos ombros, cotovelos levemente dobrados, palmas para baixo.", "Braços à frente na altura dos ombros.", "Afaste as mãos horizontalmente — abra completamente o peito.", "No máximo, aperte as escápulas uma contra a outra. Segure 1 segundo.", "Retorne lentamente."],
        feel: "Contração entre as escápulas. Se sentir no pescoço, abaixe os ombros.", errors: "Elevar os ombros para as orelhas, abrir os cotovelos, fazer rápido.", muscles: "Trapézio médio e inferior, romboide, deltóide posterior, infraespinal", mtb: "Retrátores escapulares mantêm postura correta no guidão por horas.",
      },
      {
        name: "Calf Raises Lentos na Borda do Degrau", sets: "2 × 12 reps (3s sobe / 1s pausa / 3s desce)", equipment: "Degrau ou borda",
        steps: ["Meia ponta dos pés na borda. Calcanhares no ar.", "Desça os calcanhares ABAIXO do nível do degrau — amplitude completa.", "Suba lentamente em 3 segundos até a ponta máxima. Segure 1 segundo.", "Desça em 3 segundos. Comece com amplitude reduzida para aquecer o Aquiles."],
        feel: "Grande estiramento na panturrilha na descida, forte contração no topo.", errors: "Apoiar o peso nos dedos, não ir abaixo do nível.", muscles: "Gastrocnêmio, sóleo, tendão de Aquiles", mtb: "Panturrilha resistente previne cãibras em provas longas.",
      },
      {
        name: "Inchworm com Push-Up", sets: "5 reps", equipment: "Peso corporal",
        steps: ["Em pé, flexione o tronco e apoie as mãos no chão.", "Caminhe com as mãos até a posição de prancha (corpo reto).", "Faça 1 push-up controlado.", "Caminhe os pés em direção às mãos.", "Suba de volta à posição em pé."],
        feel: "Isquiotibiais ao caminhar os pés, ombros e peitoral no push-up, core na prancha.", errors: "Quadril caindo na prancha, push-up sem o corpo alinhado.", muscles: "Isquiotibiais, ombros, peitoral, serrátil, core", mtb: "Integração de cadeia cinética completa.",
      },
    ],
    main: [
      {
        name: "Face Pull com Faixa Elástica", sets: "3 × 15 reps", rest: "30s", equipment: "Faixa elástica ancorada na altura dos olhos",
        steps: ["Faixa na altura dos olhos. Segure com as duas mãos, polegares para trás, cotovelos ALTOS (acima dos ombros).", "Afaste-se até tensão moderada. Core ativado.", "Puxe em direção ao rosto — cotovelos abrem para os lados na altura das orelhas.", "No ponto final: ROTAÇÃO EXTERNA — mãos para trás das orelhas, como o número '21'.", "Segure 2 segundos e retorne LENTAMENTE."],
        feel: "Ombro posterior, trapézio médio, sensação de 'abrir' o peito. Se sentir no pescoço, abaixe os cotovelos.", errors: "Cotovelos abaixo dos ombros, sem rotação externa final, voltar rápido.", muscles: "Deltóide posterior, trapézio médio e inferior, romboide, infraespinal, redondo menor", mtb: "Previne ombro arredondado e mantém postura no guidão.",
        progression: { "1–2": "Faixa leve, 12 reps", "3–4": "Faixa média, 15 reps, 2s contração", "5–6": "Faixa média, 15 reps, 3s excêntrico", "7–8": "Faixa média-forte, 15 reps + 5 isotônicas" },
      },
      {
        name: "Plank com Thread the Needle (Rotação Torácica)", sets: "3 × 10 reps/lado", rest: "30s", equipment: "Peso corporal",
        steps: ["Prancha lateral: antebraço no chão, corpo alinhado, quadril levantado. Braço livre ao teto.", "Ative o core — quadril não cai durante o movimento.", "Leve o braço livre por BAIXO do tronco, passando pelo espaço entre o chão e o corpo.", "Siga o braço com o olhar. Ombro de baixo quase toca o chão.", "Retorne abrindo o braço para o teto. Quadril nivelado o tempo todo."],
        feel: "Oblíquo (lateral do abdômen), abertura da torácica, ombro de baixo estabilizando.", errors: "Quadril que afunda ou sobe, rotação insuficiente.", muscles: "Oblíquos, serrátil anterior, rotadores torácicos, deltóide, glúteo médio", mtb: "Rotacionar o tronco independente do quadril = chave das curvas técnicas.",
        progression: { "1–2": "Plank lateral estático, 30s/lado", "3–4": "Thread the needle, amplitude reduzida, 8 reps", "5–6": "Amplitude completa, 10 reps", "7–8": "Thread + abrir o braço acima da cabeça no final" },
      },
      {
        name: "Single Arm Row com Faixa Elástica", sets: "3 × 12 reps/lado", rest: "30s", equipment: "Faixa elástica ancorada na altura do quadril",
        steps: ["Faixa ancorada à frente na altura do quadril. De frente, segure com mão direita.", "Afaste-se até tensão. PRIMEIRO: retrate a escápula (ombro para trás e para baixo).", "Então puxe o cotovelo para trás em direção ao quadril.", "O tronco NÃO rotaciona. Ombro de suporte estabiliza isometricamente."],
        feel: "Latíssimo (músculo lateral grande das costas), romboide, bíceps. Se o pescoço cansa, está elevando o ombro.", errors: "Rotacionar o tronco para ajudar, iniciar pelo bíceps ao invés da escápula.", muscles: "Latíssimo do dorso, romboide, trapézio médio, bíceps, core anti-rotação", mtb: "Cada puxada no guidão em subidas usa exatamente este padrão.",
        progression: { "1–2": "Faixa leve, sentado, 10 reps", "3–4": "Em pé, faixa leve-média, 12 reps", "5–6": "Em pé, faixa média, 2s pausa", "7–8": "Levemente inclinado, faixa média" },
      },
      {
        name: "Calf Raise Unipodal Excêntrico na Borda", sets: "3 × 15 reps/lado", rest: "30s", equipment: "Degrau ou borda",
        steps: ["Meia ponta do pé de apoio na borda. Pé livre no ar.", "SUBA com os dois pés para a posição alta.", "DESÇA em 3 segundos com UM pé só — a fase excêntrica lenta é o foco.", "Calcanhares abaixo da borda na descida (amplitude máxima).", "Use apoio na parede para equilíbrio — não comprometa a técnica."],
        feel: "Estiramento profundo na panturrilha na descida. Queimação progressiva após 8–10 reps.", errors: "Descer rápido (perde o benefício excêntrico), não ir abaixo do nível.", muscles: "Gastrocnêmio, sóleo, tendão de Aquiles, fibulares", mtb: "Panturrilha forte = estabilidade no pedal e prevenção de cãibra nas descidas.",
        progression: { "1–2": "Com dois pés, 15 reps, 3s excêntrico", "3–4": "Unipodal, 12 reps, 3s", "5–6": "Unipodal, 15 reps, 3s", "7–8": "Unipodal, 15 reps, 4s + 1s pausa no fundo" },
      },
      {
        name: "T Push-Up (Flexão com Rotação)", sets: "3 × 8 reps/lado", rest: "45s", equipment: "Peso corporal",
        steps: ["Prancha alta. Mãos levemente mais abertas que os ombros.", "Desça fazendo um push-up completo — cotovelos a 45° do corpo.", "Ao subir, transfira o peso para a mão esquerda e rotacione — braço direito ao teto.", "O corpo forma um 'T'. Quadril não cai.", "Retorne ao centro, repita alternando lados."],
        feel: "Peitoral e tríceps no push-up. Serrátil e oblíquos na rotação. Ombro de apoio estabilizando intensamente.", errors: "Quadril caindo durante a rotação, cotovelos muito abertos.", muscles: "Peitoral, tríceps, serrátil anterior, deltóide, oblíquos, core anti-rotação", mtb: "Força de empurrar + estabilidade de ombro = absorção de impacto no guidão.",
        progression: { "1–2": "Push-up joelhos, sem rotação", "3–4": "Push-up completo + rotação parcial, 6 reps/lado", "5–6": "Rotação completa, 8 reps/lado", "7–8": "Halteres nas mãos (instabilidade extra)" },
      },
      {
        name: "Turkish Get-Up — TGU", sets: "2 × 3 reps/lado", rest: "60s", equipment: "Kettlebell leve ou halter (ou sem peso para aprender)",
        steps: ["FASE 1: Deite com KB acima do ombro direito. Sempre olhando para o KB. Perna direita dobrada. Role para o antebraço esquerdo.", "FASE 2: Empurre o antebraço no chão e sente. Braço direito sempre esticado.", "FASE 3: Eleve o quadril apoiando na mão esquerda. Linha do chão ao KB.", "FASE 4: Deslize a perna esquerda e coloque o joelho no chão — posição de afundo.", "FASE 5: Fique em pé. Pausa. Reverta toda a sequência com controle."],
        feel: "Ombro trabalhando em TODA a amplitude, core em todas as fases, integração total.", errors: "Perder o contato visual com o KB, apressar qualquer fase, carga alta antes de dominar sem peso.", muscles: "Ombro (360°), core completo, quadríceps, glúteos, estabilizadores do tornozelo, manguito rotador", mtb: "Integração de toda a cadeia cinética — mesma usada ao recuperar o equilíbrio da bike.",
        progression: { "1–2": "Sem peso, foco em cada fase", "3–4": "Peso leve, até fase 4", "5–6": "Peso leve, sequência completa, 3 reps", "7–8": "Peso moderado, sequência fluida" },
      },
    ],
    cooldown: [
      { name: "Doorway Chest Stretch (Porta)", duration: "45s/lado", steps: ["Antebraço vertical no batente da porta (cotovelo a 90°).", "Avance um passo — tronco rotaciona para o lado oposto.", "DOIS ÂNGULOS: braço a 90° (peitoral médio), braço acima (peitoral inferior)."], feel: "Abertura do peito, estiramento no peitoral e deltóide anterior.", muscles: "Peitoral maior e menor, deltóide anterior, bíceps" },
      { name: "Thoracic Extension no Rolo de Espuma", duration: "2–3 minutos", steps: ["Rolo horizontalmente no meio das costas (torácica, não lombar).", "Mãos entrelaçadas atrás da nuca. Joelhos dobrados.", "Deixe as costas se dobrarem sobre o rolo — respire fundo e relaxe na expiração.", "Mova o rolo por diferentes segmentos."], feel: "Abertura e extensão das costas. Pode fazer 'estalar' — é normal.", muscles: "Coluna torácica, romboides, peitoral (alongamento), intercostais" },
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

// ─── Exercise Card with image ─────────────────────────────────────────────────
function ExerciseCard({ ex, color, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ background: open ? "#0d0d18" : "#0a0a14", border: `1px solid ${open ? color + "55" : "#ffffff0d"}`, borderRadius: 12, overflow: "hidden", transition: "all 0.2s" }}>
      {/* ── Header row ── */}
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "stretch", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
        {/* Image thumbnail */}
        <div style={{ width: 80, minHeight: 64, flexShrink: 0, overflow: "hidden", background: `${color}10` }}>
          <ExerciseImage name={ex.name} color={color} />
        </div>
        {/* Title + meta */}
        <div style={{ flex: 1, padding: "10px 14px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", lineHeight: 1.2 }}>{ex.name}</div>
          <div style={{ fontSize: 10, color: "#555", marginTop: 4, display: "flex", gap: 10, flexWrap: "wrap" }}>
            {ex.sets && <span style={{ color }}>{ex.sets}</span>}
            {ex.rest && <span>↩ {ex.rest}</span>}
            {ex.duration && <span style={{ color }}>{ex.duration}</span>}
            {MEDIA[ex.name]?.ytId && <span style={{ color: "#ff6666" }}>▶ tutorial</span>}
          </div>
        </div>
        <div style={{ padding: "0 14px", display: "flex", alignItems: "center", color: open ? color : "#444", fontSize: 18, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>⌄</div>
      </button>

      {/* ── Expanded content ── */}
      {open && (
        <div style={{ borderTop: `1px solid ${color}22` }}>
          {/* Large image + video button */}
          <div style={{ position: "relative", background: `${color}08` }}>
            <div style={{ height: 180, overflow: "hidden" }}>
              <ExerciseImage name={ex.name} color={color} />
            </div>
            {MEDIA[ex.name]?.ytId && (
              <div style={{ position: "absolute", bottom: 10, right: 10 }}>
                <YoutubeBtn name={ex.name} />
              </div>
            )}
          </div>

          <div style={{ padding: "14px 16px 18px" }}>
            {ex.equipment && (
              <div style={{ display: "inline-block", background: "#ffffff08", borderRadius: 20, padding: "3px 12px", fontSize: 11, color: "#777", marginBottom: 14 }}>
                🎯 {ex.equipment}
              </div>
            )}

            {/* Steps */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#555", fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 8 }}>EXECUÇÃO PASSO A PASSO</div>
              {ex.steps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 7, alignItems: "flex-start" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: `${color}20`, border: `1px solid ${color}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <span style={{ fontSize: 9, color, fontWeight: 700 }}>{i + 1}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.6 }}>{step}</div>
                </div>
              ))}
            </div>

            {/* Feel */}
            {ex.feel && (
              <div style={{ background: `${color}12`, border: `1px solid ${color}33`, borderRadius: 8, padding: "10px 12px", marginBottom: 8 }}>
                <div style={{ fontSize: 9, letterSpacing: 2, color, fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 5 }}>💪 ONDE DEVE SENTIR</div>
                <div style={{ fontSize: 12, color: "#e0e0e0", lineHeight: 1.6 }}>{ex.feel}</div>
              </div>
            )}

            {/* Errors */}
            {ex.errors && (
              <div style={{ background: "#ff444410", border: "1px solid #ff444430", borderRadius: 8, padding: "10px 12px", marginBottom: 8 }}>
                <div style={{ fontSize: 9, letterSpacing: 2, color: "#ff6666", fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 5 }}>⚠️ ERROS COMUNS</div>
                <div style={{ fontSize: 12, color: "#ffaaaa", lineHeight: 1.6 }}>{ex.errors}</div>
              </div>
            )}

            {/* Muscles + MTB */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
              {ex.muscles && (
                <div style={{ background: "#ffffff05", borderRadius: 8, padding: "8px 10px" }}>
                  <div style={{ fontSize: 9, letterSpacing: 1.5, color: "#555", fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 4 }}>MÚSCULOS</div>
                  <div style={{ fontSize: 11, color: "#888", lineHeight: 1.5 }}>{ex.muscles}</div>
                </div>
              )}
              {ex.mtb && (
                <div style={{ background: "#ffffff05", borderRadius: 8, padding: "8px 10px" }}>
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
                    const pColors = ["#4ade8044", "#facc1544", "#f9731644", "#c084fc44"];
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
    { id: "main", label: "⚡ Principal", count: t.main.length },
    { id: "cooldown", label: "🌙 Finalização", count: t.cooldown.length },
  ];
  const current = tab === "warmup" ? t.warmup : tab === "main" ? t.main : t.cooldown;
  return (
    <div>
      <div style={{ background: `linear-gradient(135deg, ${t.color}15 0%, #0a0a1480 60%)`, border: `1px solid ${t.color}33`, borderRadius: 14, padding: "18px 20px", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
          <span style={{ fontSize: 38 }}>{t.icon}</span>
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: t.color, letterSpacing: 4 }}>{t.name}</div>
            <div style={{ fontSize: 12, color: "#aaa" }}>{t.focus}</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: "#555" }}>⏱ {t.duration} &nbsp;·&nbsp; 🚵 {t.mtbLink}</div>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {tabs.map(tb => (
          <button key={tb.id} onClick={() => setTab(tb.id)} style={{ padding: "9px 16px", borderRadius: 40, border: `1px solid ${tab === tb.id ? t.color + "88" : "#ffffff12"}`, background: tab === tb.id ? `${t.color}18` : "#ffffff05", color: tab === tb.id ? t.color : "#555", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
            {tb.label} <span style={{ opacity: 0.5 }}>({tb.count})</span>
          </button>
        ))}
      </div>
      <div style={{ background: "#ffffff04", borderRadius: 7, padding: "7px 12px", fontSize: 11, color: "#555", marginBottom: 12 }}>
        {tab === "warmup" && "Mobilidade Dinâmica + Ativação — 5 a 10 minutos"}
        {tab === "main" && "Circuito Funcional — Imagem de referência + tutorial em vídeo em cada exercício"}
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
    { id: "trainings", label: "Treinos A · B · C" },
    { id: "progression", label: "Progressão 8 Semanas" },
    { id: "calendar", label: "Calendário & MTB" },
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
      <div style={{ background: "linear-gradient(180deg,#0d0d1e 0%,#080810 100%)", borderBottom: "1px solid #ffffff0a", padding: "32px 24px 24px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px,7vw,60px)", letterSpacing: 6, color: "#fff", lineHeight: 1 }}>PROGRAMA FUNCIONAL MTB</div>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(12px,3vw,17px)", letterSpacing: 4, color: "#4ade80", marginTop: 6 }}>PERFORMANCE & LONGEVIDADE ESPORTIVA</div>
        <div style={{ fontSize: 10, color: "#444", letterSpacing: 2, marginTop: 8 }}>8 SEMANAS · 3 TREINOS/SEMANA · IMAGENS + TUTORIAIS EM VÍDEO</div>
      </div>

      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "center", background: "#0a0a14", borderBottom: "1px solid #ffffff0a", position: "sticky", top: 0, zIndex: 20, flexWrap: "wrap" }}>
        {nav.map(n => (
          <button key={n.id} onClick={() => setSection(n.id)} style={{ padding: "13px 18px", border: "none", background: "transparent", color: section === n.id ? "#4ade80" : "#555", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: 1, borderBottom: section === n.id ? "2px solid #4ade80" : "2px solid transparent", transition: "all 0.2s", cursor: "pointer" }}>{n.name}</button>
        ))}
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "24px 14px 80px" }}>

        {/* TRAININGS */}
        {section === "trainings" && (
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
              {TRAININGS.map(t => (
                <button key={t.id} onClick={() => setActiveTraining(t.id)} style={{ flex: 1, padding: "12px 8px", borderRadius: 12, border: `1px solid ${activeTraining === t.id ? t.color + "88" : "#ffffff0d"}`, background: activeTraining === t.id ? `${t.color}15` : "#0a0a14", cursor: "pointer", transition: "all 0.2s" }}>
                  <div style={{ fontSize: 24 }}>{t.icon}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 17, color: activeTraining === t.id ? t.color : "#555", letterSpacing: 2, marginTop: 3 }}>{t.name}</div>
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
            <p style={{ color: "#666", fontSize: 12, marginBottom: 20, lineHeight: 1.7 }}>Qualidade técnica sempre acima da carga. Se a técnica falhar, não avance.</p>
            <div style={{ display: "grid", gap: 12, marginBottom: 28 }}>
              {PROGRESSION_DATA.map((p, i) => (
                <div key={i} style={{ background: `linear-gradient(135deg,${p.color}10 0%,transparent 70%)`, border: `1px solid ${p.color}33`, borderRadius: 12, padding: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 10 }}>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: p.color, letterSpacing: 3 }}>{p.phase}</div>
                      <div style={{ fontSize: 11, color: "#666" }}>Semanas {p.weeks}</div>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {[["SÉRIES", p.series], ["REPS/TEMPO", p.repsTime], ["DESCANSO", p.rest], ["CARGA", p.load]].map(([label, val], li) => (
                        <div key={li} style={{ background: "#ffffff08", borderRadius: 7, padding: "5px 10px", textAlign: "center" }}>
                          <div style={{ fontSize: 8, color: "#555", letterSpacing: 1 }}>{label}</div>
                          <div style={{ fontSize: 13, color: li === 3 ? p.color : "#fff", fontWeight: 700 }}>{val}</div>
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
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 3, color: "#fff", marginBottom: 12 }}>PRINCÍPIOS GERAIS</div>
            <div style={{ display: "grid", gap: 8 }}>
              {[
                { icon: "🎯", t: "Técnica antes de carga", d: "Nunca aumente o peso se a execução não estiver perfeita. Um exercício técnico com carga leve vale mais que carga alta com erro." },
                { icon: "⚖️", t: "Não prejudicar o pedal", d: "Se houver excesso de fadiga nos treinos de MTB, reduza 1 série dos exercícios funcionais. O MTB é a prioridade." },
                { icon: "🔄", t: "Excêntrico é a chave", d: "A fase de descida/retorno deve ser sempre controlada (2–4 segundos). É onde a maioria das adaptações acontecem." },
                { icon: "🧠", t: "Conexão mente-músculo", d: "Antes de cada série, toque o músculo que vai trabalhar. Concentre-se nele. Aumenta a ativação em até 20%." },
                { icon: "💤", t: "Recuperação é treino", d: "Intercale os funcionais com os dias de MTB. Priorize sono de 7–9h nas semanas de intensificação (5–6)." },
              ].map((p, i) => (
                <div key={i} style={{ background: "#ffffff04", border: "1px solid #ffffff0c", borderRadius: 9, padding: 13, display: "flex", gap: 11, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{p.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, color: "#fff", fontWeight: 700, marginBottom: 3 }}>{p.t}</div>
                    <div style={{ fontSize: 12, color: "#777", lineHeight: 1.5 }}>{p.d}</div>
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
                { day: "SEG", content: "🚵 MTB", sub: "Técnico ou base Z2", color: "#4ade80" },
                { day: "TER", content: "⚡ TREINO A", sub: "Core + Cadeia Posterior + Lombar", color: "#4ade80" },
                { day: "QUA", content: "🚵 MTB", sub: "Intervalo ou Z2", color: "#4ade80" },
                { day: "QUI", content: "🔥 TREINO B", sub: "Glúteos + Quadríceps + Propriocepção", color: "#f97316" },
                { day: "SEX", content: "🚵 MTB", sub: "Longo ou XC específico", color: "#4ade80" },
                { day: "SÁB", content: "🏔️ TREINO C", sub: "Ombros + Integração + Panturrilha", color: "#c084fc" },
                { day: "DOM", content: "😴 RECUPERAÇÃO", sub: "Ativo leve, mobilidade, banho frio", color: "#555" },
              ].map((d, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 18px", borderBottom: i < 6 ? "1px solid #ffffff07" : "none", background: i % 2 === 0 ? "#ffffff02" : "transparent" }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, letterSpacing: 2, color: "#444", width: 36, flexShrink: 0 }}>{d.day}</div>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, color: d.color, fontWeight: 700 }}>{d.content}</div>
                    <div style={{ fontSize: 10, color: "#555", marginTop: 1 }}>{d.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 4, color: "#4ade80", marginBottom: 14 }}>CONEXÃO COM O MTB</div>
            {[
              { title: "Descidas Técnicas", icon: "⛰️", color: "#f97316", items: [{ ex: "Skater Squat", why: "Treina o joelho travado em ângulo neutro — posição exata da descida com quadril atrás e tronco baixo." }, { ex: "Equilíbrio Unipodal no Bosu", why: "Propriocepção treinada = reação mais rápida quando a roda escapa em pedra ou raiz." }, { ex: "T Push-Up", why: "Reflexo de ombro para absorver impactos abruptos do guidão." }] },
              { title: "Subidas Longas", icon: "🔼", color: "#4ade80", items: [{ ex: "Romanian Deadlift (RDL)", why: "Isquiotibiais e glúteos resistentes = menos cãibra e mais potência no final." }, { ex: "Hollow Body Hold", why: "Previne a perda de postura lombar na fadiga — o core aguenta mais." }, { ex: "Step Up com Pausa", why: "Replica o padrão unilateral do pedal em rampas." }] },
              { title: "Curvas e Técnica", icon: "↩️", color: "#facc15", items: [{ ex: "Lateral Lunge", why: "Adutores fortes = melhor inclinação lateral do corpo nas curvas." }, { ex: "Thread the Needle", why: "Dissociação tronco-quadril: a chave das curvas técnicas." }, { ex: "Face Pull + Band Pull Apart", why: "Ombros estáveis = guidão mais preciso." }] },
              { title: "Provas acima de 3 horas", icon: "⏱️", color: "#38bdf8", items: [{ ex: "Calf Raise Excêntrico Unipodal", why: "Panturrilha resiliente = sem cãibra nos últimos 20km das maratonas XCM." }, { ex: "Good Morning + RDL (altas reps)", why: "Resistência muscular na cadeia posterior evita fadiga precoce." }, { ex: "Respiração Diafragmática", why: "Menor custo energético respiratório em esforços prolongados." }] },
            ].map((note, ni) => (
              <div key={ni} style={{ background: `linear-gradient(135deg,${note.color}10 0%,transparent 70%)`, border: `1px solid ${note.color}33`, borderRadius: 12, padding: 18, marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 22 }}>{note.icon}</span>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: 3, color: note.color }}>{note.title}</div>
                </div>
                <div style={{ display: "grid", gap: 7 }}>
                  {note.items.map((item, ii) => (
                    <div key={ii} style={{ background: "#ffffff05", borderRadius: 7, padding: "9px 12px", display: "flex", gap: 10 }}>
                      <div style={{ width: 3, borderRadius: 2, background: note.color, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, color: "#fff", fontWeight: 700, marginBottom: 2 }}>{item.ex}</div>
                        <div style={{ fontSize: 11, color: "#999", lineHeight: 1.5 }}>{item.why}</div>
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
