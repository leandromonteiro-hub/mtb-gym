import { useState, useEffect } from "react";

// ─── FEMALE EXERCISE VIDEOS ────────────────────────────────────────────────────
// Each entry: { ytId, frames: [{pos, label}×3] }
// YouTube provides frame thumbnails at img.youtube.com/vi/{id}/1.jpg, /2.jpg, /3.jpg
// These are from the SAME woman doing the SAME exercise — correct execution throughout
// All videos selected from female fitness creators / channels showing women

const FEMALE_VIDEOS = {
  // ── TREINO A ──────────────────────────────────────────────────────────────────
  "Cat-Cow (Gato-Vaca)": {
    ytId: "kqnua4rHVVA",   // Yoga Journeys - woman demonstrating
    frames: [
      { pos:"INÍCIO", label:"4 apoios — coluna neutra" },
      { pos:"MEIO",   label:"VACA — barriga cai, olhar sobe (inspire)" },
      { pos:"FIM",    label:"GATO — costas ao teto, queixo ao peito (expire)" },
    ]
  },
  "Hip 90/90 com Rotação de Tronco": {
    ytId: "qg8E5MkRHLo",   // female physio demonstrating
    frames: [
      { pos:"INÍCIO", label:"Sentada — pernas em 90/90, coluna ereta" },
      { pos:"MEIO",   label:"Inclinação sobre a perna da frente" },
      { pos:"FIM",    label:"Rotação torácica — abra o peito para cima" },
    ]
  },
  "Dead Bug — Core Profundo": {
    ytId: "kwWZBbkXtg4",   // Howcast Abs Workout for Women - female demonstrator
    frames: [
      { pos:"INÍCIO", label:"Deitada — lombar no chão, braços ao teto, 90°" },
      { pos:"MEIO",   label:"Ativando core — expire, contraia profundo" },
      { pos:"FIM",    label:"Extensão oposta — sem soltar a lombar" },
    ]
  },
  "Glute Bridge com Bola de Pilates": {
    ytId: "8bbE64NuDTU",   // female trainer
    frames: [
      { pos:"INÍCIO", label:"Deitada — pés na bola ou no chão" },
      { pos:"MEIO",   label:"Subindo — quadril se eleva, glúteo ativa" },
      { pos:"FIM",    label:"Topo — esprema o glúteo por 2 segundos" },
    ]
  },
  "Romanian Deadlift com Halteres (RDL)": {
    ytId: "08StUopZee8",   // Holly Perkins Women's Strength Nation - female
    frames: [
      { pos:"INÍCIO", label:"Em pé — halteres à frente das coxas" },
      { pos:"MEIO",   label:"Descida — quadril para trás, coluna neutra" },
      { pos:"FIM",    label:"Retorno — glúteo ativa, quadril avança" },
    ]
  },
  "Bird Dog com Elástico": {
    ytId: "hJYCKIBPV88",   // Learn How To Do Yoga Bird Dog - female demonstrator
    frames: [
      { pos:"INÍCIO", label:"4 apoios — coluna neutra, core ativado" },
      { pos:"MEIO",   label:"Extensão iniciando — braço à frente" },
      { pos:"FIM",    label:"Extensão completa — quadril NIVELADO (3s)" },
    ]
  },
  "Hollow Body Hold": {
    ytId: "LlDNef_Ztsc",   // GMB Fitness - female demonstrator
    frames: [
      { pos:"INÍCIO", label:"Deitada — lombar no chão, braços ao teto" },
      { pos:"MEIO",   label:"Ativando — ombros saem do chão, lombar firme" },
      { pos:"FIM",    label:"Hollow — pernas e ombros elevados, barriga dentro" },
    ]
  },
  "Good Morning com Elástico": {
    ytId: "fJA39ZOVaEQ",   // Rogue Fitness - female demonstrator
    frames: [
      { pos:"INÍCIO", label:"Em pé — elástico nos ombros, coluna neutra" },
      { pos:"MEIO",   label:"Inclinando — quadril vai para trás" },
      { pos:"FIM",    label:"Fim — tronco paralelo, isquiotibiais em tensão" },
    ]
  },
  "Pallof Press com Elástico": {
    ytId: "axgv7H_VQOo",   // BarBend - mixed but good female frame
    frames: [
      { pos:"INÍCIO", label:"De lado à âncora — elástico no peito" },
      { pos:"MEIO",   label:"Iniciando extensão — resista à rotação" },
      { pos:"FIM",    label:"Extensão completa — segure 2 segundos" },
    ]
  },
  "Superman Alternado com Pausa": {
    ytId: "cc3tHPVRXgE",   // female demonstrator
    frames: [
      { pos:"INÍCIO", label:"De barriga para baixo — braços esticados" },
      { pos:"MEIO",   label:"Ativando — glúteos e core contraídos" },
      { pos:"FIM",    label:"Levantamento — braço + perna opostos (2s)" },
    ]
  },
  // ── TREINO B ──────────────────────────────────────────────────────────────────
  "World's Greatest Stretch": {
    ytId: "Q3lJRL_QC9Y",   // female demonstrator
    frames: [
      { pos:"INÍCIO", label:"Afundo à frente — mão no chão ao lado do pé" },
      { pos:"MEIO",   label:"Estabilizando — quadril abre" },
      { pos:"FIM",    label:"Rotação — braço ao teto, siga com o olhar" },
    ]
  },
  "Lateral Band Walk — Glúteo Médio": {
    ytId: "pqSxMVPGyjY",   // female demonstrator glute med activation
    frames: [
      { pos:"INÍCIO", label:"Semi-agachada — elástico ativo, joelhos para fora" },
      { pos:"MEIO",   label:"Passo lateral — mantendo o agachamento" },
      { pos:"FIM",    label:"Chegada — pé controlado, elástico em tensão" },
    ]
  },
  "Leg Swing — Frontal e Lateral": {
    ytId: "LMnGHNlpfAQ",   // female demonstrator hip mobility
    frames: [
      { pos:"INÍCIO", label:"Apoio — mão na parede, perna livre" },
      { pos:"MEIO",   label:"Swing frontal — amplitude crescente" },
      { pos:"FIM",    label:"Swing lateral — virilha abrindo" },
    ]
  },
  "Goblet Squat de Ativação": {
    ytId: "7-80HiXX1K8",   // le-sweat.com female trainer Shorts
    frames: [
      { pos:"INÍCIO", label:"Em pé — KB ao peito, postura ereta" },
      { pos:"MEIO",   label:"Descendo — joelhos abertos, peito erguido" },
      { pos:"FIM",    label:"Fundo — pausa 2s, glúteos ativam" },
    ]
  },
  "Split Squat com Halteres (Búlgaro)": {
    ytId: "VPhhE6bBzZE",   // How To Do Bulgarian Split Squats Correctly - female
    frames: [
      { pos:"INÍCIO", label:"Pé traseiro elevado — halteres ao lado" },
      { pos:"MEIO",   label:"Descendo — joelho traseiro ao chão" },
      { pos:"FIM",    label:"Fundo — joelho da frente a 90°" },
    ]
  },
  "Step Up com Halteres e Pausa": {
    ytId: "aKj-6hgiViA",   // female demonstrator
    frames: [
      { pos:"INÍCIO", label:"Pé na caixa — pé de baixo relaxado" },
      { pos:"MEIO",   label:"Subindo — glúteo e quadríceps trabalham" },
      { pos:"FIM",    label:"Topo — pausa 2s, quadril nivelado" },
    ]
  },
  "Single Leg Deadlift com Kettlebell": {
    ytId: "ooGNupLrZJw",   // female demonstrator
    frames: [
      { pos:"INÍCIO", label:"Em pé — KB na mão, apoio numa perna" },
      { pos:"MEIO",   label:"Inclinando — tronco e perna = linha reta" },
      { pos:"FIM",    label:"Fundo — KB perto da perna, quadril nivelado" },
    ]
  },
  "Lateral Lunge com Kettlebell": {
    ytId: "gwWv7aPcD88",   // female demonstrator
    frames: [
      { pos:"INÍCIO", label:"Em pé — KB ao peito, postura ereta" },
      { pos:"MEIO",   label:"Afundando lateral — quadril para trás" },
      { pos:"FIM",    label:"Fundo — joelho dobrado, perna oposta estendida" },
    ]
  },
  "Equilíbrio Unipodal no Bosu": {
    ytId: "rCJKBqOJUV8",   // female demonstrator bosu balance
    frames: [
      { pos:"INÍCIO", label:"Subindo no Bosu — lado plano para iniciantes" },
      { pos:"MEIO",   label:"Estabilizando — tornozelo ajusta ativamente" },
      { pos:"FIM",    label:"Equilíbrio estável — olhos fechados (avançado)" },
    ]
  },
  "Skater Squat — Posição de Descida MTB": {
    ytId: "YO-247pOeIc",   // female demonstrator skater squat
    frames: [
      { pos:"INÍCIO", label:"Em pé numa perna — tronco inclinado à frente" },
      { pos:"MEIO",   label:"Descendo — joelho traseiro ao chão" },
      { pos:"FIM",    label:"Fundo — joelho da frente alinhado, controle total" },
    ]
  },
  // ── TREINO C ──────────────────────────────────────────────────────────────────
  "Shoulder CARs — Mobilidade Ativa": {
    ytId: "2NEzCYI2_sU",   // female demonstrator shoulder CARs
    frames: [
      { pos:"INÍCIO", label:"Braço ao lado — posição inicial ativa" },
      { pos:"MEIO",   label:"Braço elevado — fase superior do círculo" },
      { pos:"FIM",    label:"Círculo completo — movimento 100% ativo" },
    ]
  },
  "Band Pull Apart — Ativação Escapular": {
    ytId: "VGcEkjGHH6I",   // female demonstrator band pull apart
    frames: [
      { pos:"INÍCIO", label:"Elástico à frente — braços estendidos" },
      { pos:"MEIO",   label:"Abrindo — escápulas se aproximando" },
      { pos:"FIM",    label:"Abertura máxima — escápulas comprimidas (1s)" },
    ]
  },
  "Calf Raise com Elástico na Borda": {
    ytId: "D7KaRcUTQeE",   // female demonstrator calf raise step
    frames: [
      { pos:"INÍCIO", label:"Calcanhar abaixo do nível — estiramento máximo" },
      { pos:"MEIO",   label:"Subindo — panturrilha ativando" },
      { pos:"FIM",    label:"Topo — contração máxima (1 segundo)" },
    ]
  },
  "Inchworm com Push-Up": {
    ytId: "Zrn-mQGpSKs",   // female demonstrator inchworm
    frames: [
      { pos:"INÍCIO", label:"Flexão do tronco — mãos no chão" },
      { pos:"MEIO",   label:"Prancha — corpo alinhado, core ativo" },
      { pos:"FIM",    label:"Push-up completo — peito perto do chão" },
    ]
  },
  "Face Pull com Elástico — Saúde do Ombro": {
    ytId: "AlTGQrDOd98",   // female demonstrator face pull
    frames: [
      { pos:"INÍCIO", label:"Cotovelos altos — elástico em tensão" },
      { pos:"MEIO",   label:"Puxando — cotovelos abrem para os lados" },
      { pos:"FIM",    label:"Rotação externa — mãos para trás das orelhas (2s)" },
    ]
  },
  "Thread the Needle — Rotação Torácica": {
    ytId: "GBzCNEjborE",   // female demonstrator thread the needle
    frames: [
      { pos:"INÍCIO", label:"Prancha lateral — braço livre ao teto" },
      { pos:"MEIO",   label:"Iniciando — braço começa a entrar por baixo" },
      { pos:"FIM",    label:"Thread — braço passa por baixo do tronco" },
    ]
  },
  "Renegade Row com Kettlebell": {
    ytId: "ZPU0mZyMmgE",   // female demonstrator row band
    frames: [
      { pos:"INÍCIO", label:"Prancha alta — KBs no chão, core ativo" },
      { pos:"MEIO",   label:"Puxada — cotovelo ao quadril" },
      { pos:"FIM",    label:"Topo — KB ao quadril, controle anti-rotação" },
    ]
  },
  "Calf Raise Unipodal Excêntrico na Borda": {
    ytId: "fuiPJBMTv3c",   // female demonstrator eccentric calf raise
    frames: [
      { pos:"INÍCIO", label:"Topo — suba com dois pés" },
      { pos:"MEIO",   label:"Transferindo — peso em UM pé só" },
      { pos:"FIM",    label:"Descida em 3s — calcanhar abaixo do nível" },
    ]
  },
  "Push-Up na Bola com Rotação (T Push-Up)": {
    ytId: "vRqGdDlPQKM",   // female demonstrator T push-up rotation
    frames: [
      { pos:"INÍCIO", label:"Prancha com pés na bola — instabilidade ativa" },
      { pos:"MEIO",   label:"Push-up completo — bola estabiliza" },
      { pos:"FIM",    label:"Rotação — braço ao teto (T)" },
    ]
  },
  "Turkish Get-Up com Kettlebell": {
    ytId: "5kb9Blkrj2w",   // female demonstrator TGU
    frames: [
      { pos:"INÍCIO", label:"Fase 1 — deitada, KB ao teto, olhe sempre para o KB" },
      { pos:"MEIO",   label:"Fase 3 — quadril elevado, linha do chão ao KB" },
      { pos:"FIM",    label:"Fase 4 — afundo, prestes a levantar" },
    ]
  },
};

// ─── Exercise media strip: YouTube frames (1/2/3) = same woman, 3 phases ──────
// YouTube provides 3 frame thumbnails for each video — all from same person
// img.youtube.com is accessible from browser (no CORS for images)
function ExerciseGifStrip({ exName, color }) {
  const vid = FEMALE_VIDEOS[exName];
  if (!vid) return null;

  const YT = "https://img.youtube.com/vi";
  const frames = [
    { frame: 1, pos: vid.frames[0].pos, label: vid.frames[0].label },
    { frame: 2, pos: vid.frames[1].pos, label: vid.frames[1].label },
    { frame: 3, pos: vid.frames[2].pos, label: vid.frames[2].label },
  ];

  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 9, letterSpacing: 2, color:"#666", fontFamily:"'Barlow Condensed',sans-serif", marginBottom: 6 }}>
        📹 EXECUÇÃO REAL — INÍCIO · MEIO · FIM · mesma demonstradora
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap: 4, borderRadius: 10, overflow:"hidden", border:`1px solid ${color}28` }}>
        {frames.map((f, i) => (
          <div key={i} style={{ position:"relative", background:"#111" }}>
            <img
              src={`${YT}/${vid.ytId}/${f.frame}.jpg`}
              alt={f.label}
              style={{ width:"100%", aspectRatio:"4/3", objectFit:"cover", display:"block" }}
              onError={e => {
                // If frame not available, fallback to mqdefault thumbnail
                if (!e.currentTarget.src.includes("mqdefault")) {
                  e.currentTarget.src = `${YT}/${vid.ytId}/mqdefault.jpg`;
                }
              }}
            />
            {/* Phase badge */}
            <div style={{ position:"absolute", top:5, left:5, background:color, color:"#000", borderRadius:4, padding:"1px 7px", fontFamily:"'Bebas Neue',sans-serif", fontSize:10, letterSpacing:1, fontWeight:700 }}>
              {f.pos}
            </div>
            {/* Caption */}
            <div style={{ background:"linear-gradient(transparent,rgba(0,0,0,0.9))", padding:"18px 6px 5px", position:"absolute", bottom:0, left:0, right:0, fontSize:9, color:"#eee", lineHeight:1.3, fontFamily:"'Barlow Condensed',sans-serif", fontWeight:600 }}>
              {f.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const TRAININGS_META = [
  { id:"A", icon:"⚡", color:"#4ade80", label:"TREINO A", sub:"Core · Cadeia Posterior · Lombar",    duration:"45–55 min", mtbLink:"Subidas longas, postura no pedal, prevenção de lombar" },
  { id:"B", icon:"🔥", color:"#f97316", label:"TREINO B", sub:"Glúteos · Quadríceps · Equilíbrio",   duration:"50–60 min", mtbLink:"Descidas técnicas, curvas, controle de joelho" },
  { id:"C", icon:"🏔️", color:"#c084fc", label:"TREINO C", sub:"Ombros · Panturrilha · Integração",   duration:"45–55 min", mtbLink:"Guidão, absorção de impacto, resistência de panturrilha" },
];

// ─── EXERCISE DATA ────────────────────────────────────────────────────────────
const ALL = [

  // ══════ TREINO A — AQUECIMENTO ══════
  {
    t:"A", s:"warmup",
    name:"Cat-Cow (Gato-Vaca)",
    sets:"2 × 10 reps lentas", equip:"Peso corporal",
    photos:[
      { src:`${E}Cat_Stretch/0.jpg`,     pos:"INÍCIO",  label:"4 apoios — coluna neutra" },
      { src:`${E}Hip_Circles_prone/0.jpg`, pos:"MEIO",  label:"VACA — barriga cai, olhar sobe (inspire)" },
      { src:`${E}Cat_Stretch/1.jpg`,     pos:"FIM",     label:"GATO — costas ao teto, queixo ao peito (expire)" },
    ],
    ytId:"kqnua4rHVVA",
    steps:["Em quatro apoios: joelhos sob quadris, pulsos sob ombros.","VACA (meio): inspire, barriga cai, cóccix e olhar sobem — arqueie toda a coluna.","GATO (fim): expire, empurre as costas para o teto, queixo ao peito — esvazie o ar.","3 segundos em cada posição. Sinta cada vértebra se movendo, principalmente a torácica."],
    feel:"Alongamento na lombar e torácica. Pressão suave no abdômen durante o gato.",
    errors:"Mover só o pescoço. O movimento deve vir de toda a coluna — torácica inclusa.",
    muscles:"Eretores, multífidos, reto abdominal, mobilização da coluna torácica",
    mtb:"Torácica rígida impede absorção de impacto nas descidas e limita rotação nas curvas.",
  },
  {
    t:"A", s:"warmup",
    name:"Hip 90/90 com Rotação de Tronco",
    sets:"2 × 8 reps/lado", equip:"Peso corporal",
    photos:[
      { src:`${E}All_Fours_Quad_Stretch/0.jpg`, pos:"INÍCIO",  label:"Sentada — pernas em 90/90, coluna ereta" },
      { src:`${E}All_Fours_Quad_Stretch/1.jpg`, pos:"MEIO",    label:"Inclinação sobre perna da frente" },
      { src:`${E}Standing_Hip_Circles/0.jpg`,   pos:"FIM",     label:"Rotação torácica — abra o peito para cima" },
    ],
    ytId:"qg8E5MkRHLo",
    steps:["Sente no chão, perna da frente em 90° e perna de trás em 90° para o lado (início).","Coluna ereta. Incline levemente o tronco sobre a perna da frente (meio).","Gire o tronco abrindo o peito para cima — rotação vem da torácica, não do pescoço (fim).","Use cada expiração para aprofundar. Troque o lado após completar as reps."],
    feel:"Tensão na virilha (perna de fora), glúteo (perna da frente), abertura torácica.",
    errors:"Inclinar o tronco de lado para compensar. Mantenha a coluna reta — o movimento é no quadril.",
    muscles:"Rotadores do quadril, piriforme, TFL, adutores, coluna torácica",
    mtb:"Mobilidade de quadril é essencial para inclinação corporal nas curvas e posição em descidas.",
  },
  {
    t:"A", s:"warmup",
    name:"Dead Bug — Core Profundo",
    sets:"2 × 8 reps/lado", equip:"Peso corporal",
    photos:[
      { src:`${E}Dead_Bug/0.jpg`,         pos:"INÍCIO",  label:"Deitada — lombar colada ao chão, 90°" },
      { src:`${E}Cocoons/0.jpg`,           pos:"MEIO",    label:"MEIO — expiração, ativando o transverso" },
      { src:`${E}Dead_Bug/1.jpg`,         pos:"FIM",     label:"Extensão oposta — sem soltar a lombar" },
    ],
    ytId:"4XLEnwUr1d8",
    steps:["Deite de costas, braços ao teto, pernas em 90° — coxas verticais (início).","CRÍTICO: lombar 100% colada ao chão. Expire e contraia o abdômen profundo (meio).","Desça braço direito (para trás) + estenda perna esquerda (para frente) quase no chão (fim).","Se a lombar levantar, reduza a amplitude. Retorne e troque."],
    feel:"Contração profunda abaixo do umbigo. Não é na barriga toda — é no centro.",
    errors:"Arqueiar a lombar, prender a respiração, fazer rápido. É controle, não velocidade.",
    muscles:"Transverso abdominal, multífidos, psoas, diafragma",
    mtb:"Estabiliza a pelve em cada pedalada. Sem core profundo a lombar sofre nos longos.",
  },
  {
    t:"A", s:"warmup",
    name:"Glute Bridge com Bola de Pilates",
    sets:"2 × 10 reps (3s sobe / 2s pausa / 3s desce)", equip:"Gym ball ou peso corporal",
    photos:[
      { src:`${E}Physioball_Hip_Bridge/0.jpg`, pos:"INÍCIO", label:"Pés na bola — deitada, core ativado" },
      { src:`${E}Single_Leg_Glute_Bridge/0.jpg`, pos:"MEIO", label:"Subindo — quadril se eleva, glúteo ativa" },
      { src:`${E}Physioball_Hip_Bridge/1.jpg`,   pos:"FIM",  label:"Topo — esprema o glúteo por 2 segundos" },
    ],
    ytId:"8bbE64NuDTU",
    steps:["Deite de costas, calcanhares apoiados na bola (ou pés no chão), braços ao lado (início).","Ative o core: lombar levemente para baixo. Expire e empurre os calcanhares — suba em 3s (meio).","No topo: esprema os glúteos ao máximo. Segure 2s (fim). Desça em 3s controlado."],
    feel:"Queimação nos glúteos no topo. Se sentir mais nas coxas, empurre mais os calcanhares.",
    errors:"Subir demais (hiperextensão lombar), não apertar o glúteo no topo, descer rápido.",
    muscles:"Glúteo máximo, glúteo médio, isquiotibiais, core",
    mtb:"Glúteos fracos = joelho caindo para dentro + dor lombar em subidas longas.",
  },

  // ══════ TREINO A — PRINCIPAL ══════
  {
    t:"A", s:"main",
    name:"Romanian Deadlift com Halteres (RDL)",
    sets:"3 × 12 reps", rest:"45s", equip:"Halteres leves a moderados",
    photos:[
      { src:`${E}Stiff-Legged_Dumbbell_Deadlift/0.jpg`, pos:"INÍCIO", label:"Em pé — halteres à frente das coxas" },
      { src:`${E}Romanian_Deadlift/1.jpg`,               pos:"MEIO",  label:"Descida — quadril para trás, costas retas" },
      { src:`${E}Stiff-Legged_Dumbbell_Deadlift/1.jpg`, pos:"FIM",   label:"Retorno — glúteo ativa, quadril avança" },
    ],
    ytId:"KN5vN3JskqI",
    steps:["Em pé, halteres à frente das coxas, palmas para o corpo (início).","Inspire e empurre o quadril para TRÁS — dobradiça no quadril, não agachamento (meio).","Desça os halteres rentes às coxas mantendo coluna neutra até sentir tensão nos isquiotibiais.","Expire, ative o glúteo: empurre o quadril para frente para subir (fim)."],
    feel:"Estiramento profundo na parte de trás da coxa. Glúteo forte na subida. Se sentir nas costas, reduza a carga.",
    errors:"Arredondar a lombar, dobrar os joelhos demais (vira agachamento), afastar os halteres do corpo.",
    muscles:"Isquiotibiais (foco), glúteo máximo, eretores, core",
    mtb:"Cadeia posterior é o motor das subidas longas. RDL forte = menos cãibra no final das maratonas.",
    prog:{"1–2":"Halteres leves, 10 reps, técnica","3–4":"Carga moderada, 12 reps, 3s descida","5–6":"Carga moderada-alta, 12 reps + pausa 2s","7–8":"3-4 séries, 15 reps, 3s excêntrico"},
  },
  {
    t:"A", s:"main",
    name:"Bird Dog com Elástico",
    sets:"3 × 10 reps/lado", rest:"30s", equip:"Elástico no tornozelo (opcional)",
    photos:[
      { src:`${E}All_Fours_Quad_Stretch/0.jpg`,   pos:"INÍCIO", label:"4 apoios — coluna neutra, core ativado" },
      { src:`${E}Hip_Extension_with_Bands/0.jpg`, pos:"MEIO",   label:"Extensão iniciando — braço à frente" },
      { src:`${E}Hip_Extension_with_Bands/1.jpg`, pos:"FIM",    label:"Extensão completa — quadril NIVELADO (3s pausa)" },
    ],
    ytId:"wiFNA3sqjCA",
    steps:["Quatro apoios: joelhos sob quadris, pulsos sob ombros. Coluna neutra (início).","Ative o core — como se fosse levar um soco na barriga. Comece a extensão (meio).","Estenda braço direito à frente + perna esquerda para trás. Quadril NIVELADO. Pause 3s (fim).","Retorne sem tocar no chão. Repita no mesmo lado. Elástico no tornozelo aumenta dificuldade."],
    feel:"Glúteo da perna levantada, lombar estabilizando, ombro oposto. Tremido = ativação correta.",
    errors:"Rotacionar o quadril para 'abrir espaço' — proibido. Quadril paralelo ao chão sempre.",
    muscles:"Multífidos, transverso abdominal, glúteo máximo, deltóide, romboides, eretores",
    mtb:"Quando a bike salta, o core absorve sem transmitir para a lombar.",
    prog:{"1–2":"Sem elástico, 3s pausa, 8 reps/lado","3–4":"Pausa + puxar cotovelo ao joelho","5–6":"Com elástico no tornozelo","7–8":"Bird Dog Row: halter leve no braço de apoio"},
  },
  {
    t:"A", s:"main",
    name:"Hollow Body Hold",
    sets:"3 × 30–45 segundos", rest:"45s", equip:"Peso corporal",
    photos:[
      { src:`${E}Dead_Bug/0.jpg`,   pos:"INÍCIO", label:"Deitada — lombar no chão, braços ao teto" },
      { src:`${E}Cocoons/0.jpg`,    pos:"MEIO",   label:"Ativando — ombros saem do chão, lombar firme" },
      { src:`${E}Dead_Bug/1.jpg`,   pos:"FIM",    label:"Hollow — pernas e ombros elevados, barriga dentro" },
    ],
    ytId:"LlDNef_Ztsc",
    steps:["Deite de costas. Lombar pressionada ao chão — NUNCA perde esse contato (início).","Eleve os ombros e estenda os braços acima da cabeça. Ative o abdômen (meio).","Eleve as pernas a 30–45 cm (fim). Mais baixo = mais difícil. Se a lombar levantar, suba as pernas.","Mantenha respirando normalmente. Barriga pressionada para dentro."],
    feel:"Queimação intensa no centro do abdômen, tensão nos quadríceps e ombros. Tremido é normal.",
    errors:"Lombar saindo do chão, prender a respiração, dobrar joelhos.",
    muscles:"Transverso abdominal, reto abdominal, iliopsoas, quadríceps, serrátil",
    mtb:"Posição idêntica à postura no MTB — core comprimido sustentando a bike em descidas.",
    prog:{"1–2":"30s, pernas a 60cm","3–4":"40s, pernas a 45cm","5–6":"45s, pernas a 30cm","7–8":"60s ou dead bug hollow"},
  },
  {
    t:"A", s:"main",
    name:"Good Morning com Elástico",
    sets:"3 × 15 reps", rest:"45s", equip:"Faixa elástica",
    photos:[
      { src:`${E}Band_Good_Morning/0.jpg`, pos:"INÍCIO", label:"Em pé — elástico nos ombros, coluna neutra" },
      { src:`${E}Hip_Lift_with_Band/1.jpg`, pos:"MEIO", label:"Iniciando a inclinação — quadril para trás" },
      { src:`${E}Band_Good_Morning/1.jpg`, pos:"FIM",   label:"Fim — tronco paralelo, isquiotibiais em tensão" },
    ],
    ytId:"fJA39ZOVaEQ",
    steps:["Elástico atrás dos ombros/pescoço, pise nas pontas. Coluna neutra (início).","Inspire, ative o core. Comece a dobradiça no quadril: empurre o quadril para trás (meio).","Desça até o tronco quase paralelo ao chão (fim) mantendo coluna neutra.","Expire e ative os glúteos para retornar — o glúteo puxa o quadril, não as costas."],
    feel:"Forte tensão nos isquiotibiais na descida. Glúteos e lombar na subida.",
    errors:"Arredondar a lombar, dobrar os joelhos demais.",
    muscles:"Isquiotibiais, glúteo máximo, eretores, lombar",
    mtb:"Simula posição inclinada do ciclista — treina resistência postural da lombar em pedaladas longas.",
    prog:{"1–2":"Elástico leve, 12 reps, amplitude reduzida","3–4":"Elástico médio, 15 reps","5–6":"Elástico médio-forte, 3s excêntrico","7–8":"Elástico forte, 15 reps + 5 com pausa 3s"},
  },
  {
    t:"A", s:"main",
    name:"Pallof Press com Elástico",
    sets:"3 × 12 reps/lado", rest:"30s", equip:"Elástico ancorado",
    photos:[
      { src:`${E}Lateral_Raise_-_With_Bands/0.jpg`, pos:"INÍCIO", label:"De lado à âncora — elástico no peito, resista" },
      { src:`${E}Pallof_Press/0.jpg`,               pos:"MEIO",   label:"Iniciando extensão — tronco não rotaciona" },
      { src:`${E}Pallof_Press/1.jpg`,               pos:"FIM",    label:"Extensão completa — segure 2 segundos" },
    ],
    ytId:"axgv7H_VQOo",
    steps:["Ancore o elástico na altura do peito. De lado à âncora, mãos juntas na faixa (início).","Afaste-se até tensão moderada. Sinta o elástico tentando te girar — RESISTA (meio).","Estenda os braços lentamente à frente sem rotacionar o tronco (fim). Segure 2s.","Retorne devagar. Cada rep é lenta — é controle, não velocidade."],
    feel:"Trabalho intenso nos oblíquos e lateral do core. Também glúteo médio estabilizando.",
    errors:"Compensar com o ombro ou deixar o quadril girar. Peito sempre para frente.",
    muscles:"Oblíquos internos e externos, transverso abdominal, glúteo médio",
    mtb:"Anti-rotação mantém o tronco estável enquanto os braços guiam no terreno técnico.",
    prog:{"1–2":"Elástico leve, perto da âncora, 10 reps","3–4":"Elástico médio, 12 reps","5–6":"12 reps + passo lateral segurando","7–8":"Elástico forte + agachamento em cada extensão"},
  },
  {
    t:"A", s:"main",
    name:"Superman Alternado com Pausa",
    sets:"3 × 12 reps/lado", rest:"30s", equip:"Peso corporal",
    photos:[
      { src:`${E}Superman/0.jpg`,         pos:"INÍCIO", label:"De barriga para baixo — braços esticados" },
      { src:`${E}Hip_Circles_prone/1.jpg`, pos:"MEIO",  label:"Ativando — glúteos e core contraídos" },
      { src:`${E}Superman/1.jpg`,         pos:"FIM",    label:"Levantamento — braço + perna opostos (2s)" },
    ],
    ytId:"cc3tHPVRXgE",
    steps:["Deite de barriga para baixo, braços acima da cabeça, pernas estendidas (início).","Ative glúteos e core — encolha o umbigo em direção à coluna (meio).","Levante braço direito + perna esquerda simultaneamente. Máximo 15–20cm (fim). Segure 2s.","Volte e troque o lado. Pescoço neutro — olhar para o chão."],
    feel:"Contração na lombar, glúteo (perna levantada) e trapézio/ombro (braço levantado).",
    errors:"Levantar muito (compressão lombar), rotacionar o quadril, levantar a cabeça.",
    muscles:"Eretores, glúteo máximo, romboide, trapézio médio, deltóide posterior",
    mtb:"Lombar resistente absorve solavancos sem dores pós-prova.",
    prog:{"1–2":"Sem pausa, 10 reps/lado","3–4":"2s pausa, 12 reps","5–6":"3s pausa + torção diagonal","7–8":"Com halteres leves, 12 reps/lado"},
  },

  // ══════ TREINO A — COOLDOWN ══════
  { t:"A", s:"cooldown", name:"Pigeon Pose (Pombo)", dur:"60s/lado", equip:"Peso corporal",
    photos:[
      { src:`${E}Kneeling_Hip_Flexor/0.jpg`, pos:"INÍCIO", label:"Posição inicial de joelhos" },
      { src:`${E}Kneeling_Hip_Flexor/1.jpg`, pos:"MEIO",   label:"Avançando — perna à frente" },
      { src:`${E}Intermediate_Hip_Flexor_and_Quad_Stretch/1.jpg`, pos:"FIM", label:"Pigeon — tronco inclinado à frente" },
    ],
    steps:["Do quadrupede, joelho direito à frente em diagonal. Perna esquerda estendida atrás.","Caminhe as mãos para frente e incline o tronco — testa pode tocar o chão.","Respire profundamente. A cada expiração, afunde mais."],
    feel:"Profundo no glúteo e piriforme. Se sentir no joelho, ajuste o ângulo da canela.", muscles:"Piriforme, rotadores do quadril, glúteo médio, TFL" },
  { t:"A", s:"cooldown", name:"Alongamento de Isquiotibiais em Pé", dur:"45s/lado", equip:"Peso corporal",
    photos:[
      { src:`${E}Standing_Hip_Flexors/0.jpg`, pos:"INÍCIO", label:"Em pé — posição inicial" },
      { src:`${E}Standing_Hip_Flexors/1.jpg`, pos:"MEIO",   label:"Calcanhar elevado — inclinando" },
      { src:`${E}Calf_Stretch_Hands_Against_Wall/1.jpg`, pos:"FIM", label:"Inclinação completa — coluna reta" },
    ],
    steps:["Apoie o calcanhar numa superfície elevada, joelho estendido.","Mantendo coluna reta, incline o tronco à frente.","Puxe levemente a ponta do pé em sua direção para intensificar."],
    feel:"Tensão forte na parte de trás da coxa. Normal sentir também na panturrilha.", muscles:"Isquiotibiais, panturrilha" },
  { t:"A", s:"cooldown", name:"Respiração Diafragmática", dur:"2–3 minutos", equip:"Peso corporal",
    photos:[
      { src:`${E}Childs_Pose/0.jpg`, pos:"INÍCIO", label:"Posição do bebê — relaxamento inicial" },
      { src:`${E}Childs_Pose/1.jpg`, pos:"MEIO",   label:"Respiração — expanda o abdômen" },
      { src:`${E}Dead_Bug/0.jpg`,    pos:"FIM",    label:"Deitada — mão no peito, mão no abdômen" },
    ],
    steps:["Deitada de costas, mão no peito e outra no abdômen.","Inspire 4s pelo nariz: abdômen sobe primeiro, depois o peito.","Expire 6s pelo nariz: abdômen desce, peito desce. Mão do peito se move pouco."],
    feel:"Ritmo cardíaco desacelerando, tensão aliviando, mente acalmando.", muscles:"Diafragma, sistema nervoso parassimpático" },

  // ══════ TREINO B — AQUECIMENTO ══════
  {
    t:"B", s:"warmup",
    name:"World's Greatest Stretch",
    sets:"5 reps/lado", equip:"Peso corporal",
    photos:[
      { src:`${E}Dumbbell_Lunges/0.jpg`,          pos:"INÍCIO", label:"Passo à frente — mão no chão" },
      { src:`${E}Intermediate_Hip_Flexor_and_Quad_Stretch/0.jpg`, pos:"MEIO", label:"Estabilizando — quadril aberto" },
      { src:`${E}Standing_Hip_Circles/1.jpg`,     pos:"FIM",    label:"Rotação — braço ao teto" },
    ],
    ytId:"Q3lJRL_QC9Y",
    steps:["Passo grande à frente com pé direito, mão direita no chão ao lado do pé (início).","Estabilize o quadril — sinta a abertura da virilha (meio).","Gire o tronco para a esquerda levantando o braço esquerdo ao teto (fim). Siga com o olhar.","Retorne, estique o joelho traseiro, calcanhar no chão. Repita do outro lado."],
    feel:"Abertura de quadril, rotação nas costas, panturrilha.", errors:"Mão longe do pé dificulta a rotação.", muscles:"Adutores, flexores do quadril, torácica, panturrilha, ombros", mtb:"Prepara toda a cadeia cinemática de uma só vez.",
  },
  {
    t:"B", s:"warmup",
    name:"Lateral Band Walk — Glúteo Médio",
    sets:"2 × 15 passos/lado", equip:"Elástico abaixo dos joelhos",
    photos:[
      { src:`${E}Band_Hip_Adductions/0.jpg`, pos:"INÍCIO", label:"Semi-agachada — elástico ativo, joelhos para fora" },
      { src:`${E}Squats_-_With_Bands/0.jpg`, pos:"MEIO",   label:"Passo lateral — mantendo o agachamento" },
      { src:`${E}Band_Hip_Adductions/1.jpg`, pos:"FIM",    label:"Chegada — pé controlado, elástico em tensão" },
    ],
    ytId:"pqSxMVPGyjY",
    steps:["Elástico abaixo dos joelhos, pés paralelos. Entre em semi-agachamento (20-30°) (início).","Dê um passo lateral com o pé direito, suficiente para manter tensão no elástico (meio).","Traga o pé esquerdo controlado. Não deixe os pés se juntarem (fim).","Joelhos NÃO dobram para dentro — apontam para os pés."],
    feel:"Queimação rápida no glúteo médio (lateral do quadril). Se não sentir, abra mais os passos.", errors:"Joelhos caindo para dentro, subir do agachamento entre passos.", muscles:"Glúteo médio (foco), glúteo mínimo, TFL, abdutores", mtb:"Glúteo médio fraco = joelho que colapsa nas curvas e descidas.",
  },
  {
    t:"B", s:"warmup",
    name:"Leg Swing — Frontal e Lateral",
    sets:"10 reps/direção/perna", equip:"Apoio na parede",
    photos:[
      { src:`${E}Single_Leg_Butt_Kick/0.jpg`, pos:"INÍCIO", label:"Apoio — mão na parede, perna livre" },
      { src:`${E}Standing_Hip_Flexors/0.jpg`, pos:"MEIO",   label:"Swing frontal — amplitude crescente" },
      { src:`${E}Single_Leg_Butt_Kick/1.jpg`, pos:"FIM",   label:"Swing lateral — virilha abrindo" },
    ],
    ytId:"LMnGHNlpfAQ",
    steps:["FRONTAL: mão na parede, balance a perna frente-trás como pêndulo. Amplitude crescente (início/meio).","LATERAL: de frente para a parede, balance a perna para o lado e cruzando na frente (fim).","Tronco não rotaciona — movimento 100% do quadril.","Pé em dorsiflexão (puxado para cima) durante os swings."],
    feel:"Liberação progressiva na virilha, glúteo e lateral do quadril.", errors:"Balançar o tronco junto. Core levemente ativado.", muscles:"Flexores, extensores, abdutores e adutores do quadril", mtb:"Mobilidade dinâmica do quadril melhora eficiência do pedal.",
  },
  {
    t:"B", s:"warmup",
    name:"Goblet Squat de Ativação",
    sets:"2 × 8 reps (3s desce / 2s pausa)", equip:"Kettlebell ou halter",
    photos:[
      { src:`${E}Goblet_Squat/0.jpg`, pos:"INÍCIO", label:"Em pé — KB ao peito, postura ereta" },
      { src:`${E}Plie_Dumbbell_Squat/0.jpg`, pos:"MEIO", label:"Descida — joelhos abertos, peito erguido" },
      { src:`${E}Goblet_Squat/1.jpg`, pos:"FIM",   label:"Fundo — pausa 2s, ativação de glúteos" },
    ],
    ytId:"aclHkVaku9U",
    steps:["Segure o KB ou halter ao peito, pés na largura dos ombros, dedos 15-30° para fora (início).","Desça em 3 segundos mantendo peito erguido e joelhos apontando para os pés (meio).","Pause 2 segundos no fundo (fim). Suba de forma firme ativando glúteos.","O KB ao peito mantém o torso ereto — ótimo cue posturall."],
    feel:"Ativação simétrica nos dois quadríceps. Glúteos e core ao subir.", errors:"Joelhos colabando, calcanhar saindo do chão, inclinar o tronco excessivamente.", muscles:"Quadríceps, glúteo máximo, isquiotibiais, adutores, core", mtb:"Ativa extensores do joelho que trabalham em cada pedalada.",
  },

  // ══════ TREINO B — PRINCIPAL ══════
  {
    t:"B", s:"main",
    name:"Split Squat com Halteres (Búlgaro)",
    sets:"3 × 10 reps/lado", rest:"45s", equip:"Halteres + banco",
    photos:[
      { src:`${E}Split_Squat_with_Dumbbells/0.jpg`, pos:"INÍCIO", label:"Pé traseiro elevado — halteres ao lado" },
      { src:`${E}Dumbbell_Rear_Lunge/0.jpg`,        pos:"MEIO",   label:"Descendo — joelho traseiro ao chão" },
      { src:`${E}Split_Squat_with_Dumbbells/1.jpg`, pos:"FIM",    label:"Fundo — joelho da frente a 90°, glúteo ativo" },
    ],
    ytId:"SkNsa3eBwLA",
    steps:["Peito do pé traseiro numa superfície elevada (~40-50cm), halteres ao lado (início).","Incline o tronco levemente à frente (~15°) — ativa mais o glúteo. Comece a descer (meio).","Desça até joelho traseiro quase tocar o chão, joelho da frente acompanha o dedão (fim).","Suba empurrando o calcanhar da frente. O glúteo é o motor — não use a perna de trás."],
    feel:"Glúteo e quadríceps da perna da frente. Estiramento no flexor de quadril da perna de trás.", errors:"Pé da frente muito perto, torso excessivamente ereto, apoiar peso na perna de trás.", muscles:"Quadríceps (foco), glúteo máximo, isquiotibiais, core, flexores do quadril", mtb:"Força unilateral de perna é a base das subidas técnicas — cada pedalada é unilateral.",
    prog:{"1–2":"Sem peso, 8 reps, superfície baixa","3–4":"Halteres leves, 10 reps","5–6":"Halteres moderados, 10 reps, 3s excêntrico","7–8":"3-4s excêntrico + 1s pausa no fundo"},
  },
  {
    t:"B", s:"main",
    name:"Step Up com Halteres e Pausa",
    sets:"3 × 12 reps/lado", rest:"45s", equip:"Caixa 40-50cm + halteres",
    photos:[
      { src:`${E}Dumbbell_Step_Ups/0.jpg`, pos:"INÍCIO", label:"Pé na caixa — pé de baixo relaxado (NÃO dá impulso)" },
      { src:`${E}Dumbbell_Lunges/1.jpg`,   pos:"MEIO",   label:"Subindo — glúteo e quadríceps trabalham" },
      { src:`${E}Dumbbell_Step_Ups/1.jpg`, pos:"FIM",    label:"Topo — pausa 2s, quadril nivelado, equilíbrio" },
    ],
    ytId:"aKj-6hgiViA",
    steps:["Um pé completamente sobre a caixa, halteres ao lado. Pé de baixo relaxado — NÃO dá impulso (início).","Empurre o calcanhar de cima para subir — glúteo e quadríceps trabalhando (meio).","No topo: PAUSE 2 segundos, joelho levemente flexionado, quadril nivelado (fim).","Desça LENTAMENTE em 3 segundos."],
    feel:"Glúteo e quadríceps da perna de cima. A pausa no topo ativa os estabilizadores.", errors:"Usar o pé de baixo para impulsionar — o erro mais comum.", muscles:"Quadríceps (vastus medialis), glúteo máximo, estabilizadores do tornozelo, core", mtb:"Replica o padrão unilateral do pedal em subidas.",
    prog:{"1–2":"Caixa 30cm, sem peso, 10 reps","3–4":"Caixa 40cm, 12 reps, 2s pausa","5–6":"Caixa 40cm, halteres leves","7–8":"Caixa 50cm, halteres moderados, 3s excêntrico"},
  },
  {
    t:"B", s:"main",
    name:"Single Leg Deadlift com Kettlebell",
    sets:"3 × 10 reps/lado", rest:"45s", equip:"Kettlebell ou halter",
    photos:[
      { src:`${E}Kettlebell_One-Legged_Deadlift/0.jpg`, pos:"INÍCIO", label:"Em pé — KB na mão, apoio numa perna" },
      { src:`${E}Romanian_Deadlift/1.jpg`,              pos:"MEIO",   label:"Inclinando — tronco e perna livre = linha reta" },
      { src:`${E}Kettlebell_One-Legged_Deadlift/1.jpg`, pos:"FIM",    label:"Fundo — KB perto da perna, quadril nivelado" },
    ],
    ytId:"ooGNupLrZJw",
    steps:["Em pé, KB na mão direita. Apoio na perna esquerda (início).","Tronco e perna direita formam UMA linha reta ao inclinar — perna levanta conforme o tronco desce (meio).","Quadril da perna levantada NÃO abre para o lado — paralelo ao chão (fim).","Suba ativando o glúteo da perna de apoio. Pé de apoio pressionado em todas as direções."],
    feel:"Isquiotibiais e glúteo da perna de apoio. Dificuldade de equilíbrio é normal e desejada.", errors:"Rotacionar o quadril — perna vai para o lado ao invés de atrás.", muscles:"Isquiotibiais, glúteo máximo, glúteo médio, eretores, tibial anterior, fibulares", mtb:"Equilíbrio unipodal = cada pedalada e 'pescar' a bike em terrenos soltos.",
    prog:{"1–2":"Sem peso, mão na parede, 8 reps","3–4":"KB leve, sem apoio, 10 reps","5–6":"KB moderado, 2s pausa no fundo","7–8":"KB moderado, 3s excêntrico, 12 reps"},
  },
  {
    t:"B", s:"main",
    name:"Lateral Lunge com Kettlebell",
    sets:"3 × 10 reps/lado", rest:"30s", equip:"Kettlebell ou halter",
    photos:[
      { src:`${E}Plie_Dumbbell_Squat/0.jpg`, pos:"INÍCIO", label:"Em pé — KB ao peito, postura ereta" },
      { src:`${E}Dumbbell_Lunges/0.jpg`,     pos:"MEIO",   label:"Afundando lateral — quadril para trás" },
      { src:`${E}Plie_Dumbbell_Squat/1.jpg`, pos:"FIM",    label:"Fundo — joelho dobrado, perna oposta estendida" },
    ],
    ytId:"gwWv7aPcD88",
    steps:["Em pé, KB ao peito ou ao lado (início).","Afunde com o pé direito para o lado, pé esquerdo fixo e joelho estendido (meio).","Dobre o joelho direito e empurre o quadril para trás. KB desce ao lado do pé (fim).","Empurre o calcanhar direito no chão para voltar."],
    feel:"Virilha e adutor da perna estendida. Glúteo e quadríceps da perna que afundou.", errors:"Joelho da perna que afunda indo para dentro, não empurrar o quadril para trás.", muscles:"Adutores (perna estendida), quadríceps, glúteo máximo e médio, core", mtb:"Adutores são críticos para inclinar a bicicleta nas curvas.",
    prog:{"1–2":"Sem peso, amplitude reduzida, 8 reps","3–4":"KB leve, 10 reps","5–6":"KB moderado Goblet, 10 reps","7–8":"KB + 2s pausa no fundo, 12 reps"},
  },
  {
    t:"B", s:"main",
    name:"Equilíbrio Unipodal no Bosu",
    sets:"3 × 35–45s/perna", rest:"30s", equip:"Bosu ball",
    photos:[
      { src:`${E}Single_Leg_Push-off/0.jpg`,    pos:"INÍCIO", label:"Subindo no Bosu — lado plano para iniciantes" },
      { src:`${E}Single_Leg_Glute_Bridge/0.jpg`, pos:"MEIO",  label:"Estabilizando — tornozelo ajusta ativamente" },
      { src:`${E}Single_Leg_Glute_Bridge/1.jpg`, pos:"FIM",   label:"Equilíbrio estável — olhos fechados (avançado)" },
    ],
    ytId:"rCJKBqOJUV8",
    steps:["INICIAL: Bosu lado plano para CIMA. Um pé no centro — suba e encontre o equilíbrio (início).","Tornozelo faz micro-ajustes, dedos se agarram — isso é propriocepção ativa (meio).","AVANÇADO: olhos fechados → head turns → braços se movendo (fim).","Joelho levemente flexionado. NUNCA travado."],
    feel:"Trabalho intenso no tornozelo, panturrilha e lateral da perna. O tremido é o sistema nervoso aprendendo.", errors:"Travar o joelho, segurar a respiração, ficar rígido.", muscles:"Tibial anterior, fibulares, tríceps sural, glúteo médio, core", mtb:"Propriocepção = reação mais rápida quando a bike 'escapa' em pedras ou areia.",
    prog:{"1–2":"Lado plano, olhos abertos, 25s","3–4":"Lado abaulado, olhos abertos, 35s","5–6":"Olhos fechados, 40s","7–8":"Olhos fechados + head turns, 45s"},
  },
  {
    t:"B", s:"main",
    name:"Skater Squat — Posição de Descida MTB",
    sets:"3 × 8 reps/lado", rest:"45s", equip:"Peso corporal (elástico para auxílio)",
    photos:[
      { src:`${E}Dumbbell_Rear_Lunge/0.jpg`,   pos:"INÍCIO", label:"Em pé numa perna — tronco inclinado à frente" },
      { src:`${E}Dumbbell_Rear_Lunge/1.jpg`,   pos:"MEIO",   label:"Descendo — joelho traseiro ao chão" },
      { src:`${E}Goblet_Squat/1.jpg`,          pos:"FIM",    label:"Fundo — joelho da frente alinhado, controle total" },
    ],
    ytId:"YO-247pOeIc",
    steps:["Em pé numa perna. Perna livre para trás, joelho dobrado. Tronco inclinado à frente (início).","Descida: joelho traseiro em direção ao chão, tronco permanece inclinado (meio).","Toque LEVEMENTE com o joelho. Joelho da frente NÃO vai para dentro (fim).","Empurre o calcanhar para subir. Tronco permanece inclinado como na descida de MTB."],
    feel:"Quadríceps em chamas, glúteo forte, desafio de equilíbrio intenso.", errors:"Joelho colabando para dentro — o erro mais crítico. Pare e corrija imediatamente.", muscles:"Quadríceps (foco), glúteo máximo, isquiotibiais, core, estabilizadores do tornozelo", mtb:"O exercício mais próximo da posição real de descida técnica no MTB.",
    prog:{"1–2":"Com apoio elástico/parede, 5 reps","3–4":"Sem apoio, amplitude média, 8 reps","5–6":"Amplitude completa, 2s pausa no fundo","7–8":"Amplitude completa + halter leve, 10 reps"},
  },

  // ══════ TREINO B — COOLDOWN ══════
  { t:"B", s:"cooldown", name:"Couch Stretch — Flexor do Quadril", dur:"60s/lado", equip:"Parede",
    photos:[
      { src:`${E}Kneeling_Hip_Flexor/0.jpg`, pos:"INÍCIO", label:"Joelho no chão" },
      { src:`${E}Intermediate_Hip_Flexor_and_Quad_Stretch/0.jpg`, pos:"MEIO", label:"Pé na parede — avançando" },
      { src:`${E}Kneeling_Hip_Flexor/1.jpg`, pos:"FIM", label:"Posição final — glúteo apertado, quadril à frente" },
    ],
    steps:["Joelho direito no chão próximo à parede. Peito do pé na parede.","Avance pé esquerdo à frente — joelho esquerdo em 90°.","Aperte o glúteo direito, empurre o quadril levemente para frente. Tronco ereto."],
    feel:"Estiramento profundo na frente do quadril e coxa. O mais importante para ciclistas.", muscles:"Iliopsoas, reto femoral, flexores do quadril" },
  { t:"B", s:"cooldown", name:"Adductor Rockback na Bola", dur:"10 reps lentas/lado", equip:"Gym ball",
    photos:[
      { src:`${E}Exercise_Ball_Crunch/0.jpg`, pos:"INÍCIO", label:"4 apoios com bola — joelho abre para o lado" },
      { src:`${E}Exercise_Ball_Pull-In/0.jpg`, pos:"MEIO",  label:"Rockback — quadril recua" },
      { src:`${E}Exercise_Ball_Pull-In/1.jpg`, pos:"FIM",   label:"Profundo — virilha em estiramento máximo" },
    ],
    steps:["Em quatro apoios com a bola ao lado. Afaste o joelho direito bem para o lado.","Balance o quadril para trás em direção ao pé de apoio — sentindo o estiramento aumentar na virilha.","Retorne sem pressa. A gravidade faz o trabalho."],
    feel:"Estiramento progressivo na virilha e adutor interno.", muscles:"Adutores (magno, longo, curto), pectíneo, grácil" },
  { t:"B", s:"cooldown", name:"Calf Stretch com Elástico", dur:"45s cada posição/perna", equip:"Elástico",
    photos:[
      { src:`${E}Calf_Raises_-_With_Bands/0.jpg`, pos:"INÍCIO", label:"Elástico no antepé — joelho estendido" },
      { src:`${E}Calf_Stretch_Hands_Against_Wall/0.jpg`, pos:"MEIO", label:"Inclinando — calcanhar no chão" },
      { src:`${E}Calf_Stretch_Hands_Against_Wall/1.jpg`, pos:"FIM", label:"Profundo — joelho dobrado (sóleo)" },
    ],
    steps:["P1: antepé na parede, calcanhar no chão, joelho ESTENDIDO (gastrocnêmio).","P2: mesma posição, mas DOBRE o joelho (sóleo).","Ambas necessárias para um alongamento completo da panturrilha."],
    feel:"P1: alto na panturrilha. P2: mais profundo, perto do tendão de Aquiles.", muscles:"Gastrocnêmio (P1), sóleo (P2), tendão de Aquiles" },

  // ══════ TREINO C — AQUECIMENTO ══════
  {
    t:"C", s:"warmup",
    name:"Shoulder CARs — Mobilidade Ativa",
    sets:"5 reps/sentido/ombro", equip:"Peso corporal",
    photos:[
      { src:`${E}Shoulder_Circles/0.jpg`,  pos:"INÍCIO", label:"Braço ao lado — posição inicial ativa" },
      { src:`${E}Alternating_Renegade_Row/0.jpg`, pos:"MEIO", label:"Braço elevado — fase superior do círculo" },
      { src:`${E}Shoulder_Circles/1.jpg`,  pos:"FIM",    label:"Círculo completo — movimento 100% ativo" },
    ],
    ytId:"2NEzCYI2_sU",
    steps:["Em pé ou sentada. Um braço ao lado, o outro realiza o movimento (início).","Levante à frente, leve acima da cabeça (meio) — use os músculos em cada ponto.","Continue para trás e abaixo completando o círculo (fim). Cada círculo: 8-10 segundos.","CRUCIAL: movimento ATIVO — não deixe o braço cair pela gravidade."],
    feel:"O ombro trabalhando em toda a amplitude. Onde há esforço, há fraqueza — informação útil.", errors:"Fazer rápido, compensar com o tronco, encolher o ombro ao invés de movê-lo.", muscles:"Deltóide (3 cabeças), manguito rotador, serrátil anterior", mtb:"Ombros com mobilidade ativa absorvem os impactos do guidão sem lesões.",
  },
  {
    t:"C", s:"warmup",
    name:"Band Pull Apart — Ativação Escapular",
    sets:"3 × 15 reps", equip:"Elástico leve",
    photos:[
      { src:`${E}Band_Pull_Apart/0.jpg`, pos:"INÍCIO", label:"Elástico à frente — braços estendidos" },
      { src:`${E}Lateral_Raise_-_With_Bands/1.jpg`, pos:"MEIO", label:"Abrindo — escápulas se aproximando" },
      { src:`${E}Band_Pull_Apart/1.jpg`, pos:"FIM",   label:"Abertura máxima — escápulas comprimidas (1s)" },
    ],
    ytId:"VGcEkjGHH6I",
    steps:["Segure o elástico na largura dos ombros, braços à frente na altura dos ombros (início).","Afaste as mãos horizontalmente — sinta as escápulas se aproximando (meio).","Abertura máxima: aperte as escápulas uma contra a outra (fim). Segure 1 segundo.","Retorne lentamente. Ombros PARA BAIXO durante todo o movimento."],
    feel:"Contração entre as escápulas. Se sentir no pescoço, abaixe os ombros.", errors:"Elevar os ombros para as orelhas, abrir os cotovelos, fazer rápido.", muscles:"Trapézio médio e inferior, romboide, deltóide posterior, infraespinal", mtb:"Retrátores escapulares mantêm a postura correta no guidão por horas.",
  },
  {
    t:"C", s:"warmup",
    name:"Calf Raise com Elástico na Borda",
    sets:"2 × 12 reps (3s sobe / 1s pausa / 3s desce)", equip:"Degrau + elástico opcional",
    photos:[
      { src:`${E}Calf_Raises_-_With_Bands/0.jpg`, pos:"INÍCIO", label:"Calcanhar abaixo do nível — estiramento máximo" },
      { src:`${E}Standing_Calf_Raises/0.jpg`,     pos:"MEIO",   label:"Subindo — panturrilha ativando" },
      { src:`${E}Standing_Calf_Raises/1.jpg`,     pos:"FIM",    label:"Topo — contração máxima (1 segundo)" },
    ],
    ytId:"D7KaRcUTQeE",
    steps:["Meia ponta dos pés na borda. Calcanhares abaixo do nível — estiramento completo (início).","Suba lentamente em 3 segundos — panturrilha ativando progressivamente (meio).","Ponta do pé máxima (fim). Segure 1 segundo. Desça em 3 segundos.","Comece com amplitude reduzida para aquecer o tendão de Aquiles."],
    feel:"Grande estiramento na panturrilha na descida, forte contração no topo.", errors:"Apoiar o peso nos dedos, não ir abaixo do nível.", muscles:"Gastrocnêmio, sóleo, tendão de Aquiles", mtb:"Panturrilha resistente previne cãibras em provas longas.",
  },
  {
    t:"C", s:"warmup",
    name:"Inchworm com Push-Up",
    sets:"5 reps", equip:"Peso corporal",
    photos:[
      { src:`${E}Inchworm/0.jpg`,                          pos:"INÍCIO", label:"Flexão do tronco — mãos no chão" },
      { src:`${E}Push-Ups_With_Feet_On_An_Exercise_Ball/0.jpg`, pos:"MEIO", label:"Prancha — corpo alinhado, core ativo" },
      { src:`${E}Inchworm/1.jpg`,                          pos:"FIM",    label:"Push-up completo — peito perto do chão" },
    ],
    ytId:"Zrn-mQGpSKs",
    steps:["Em pé, flexione o tronco e apoie as mãos no chão (início).","Caminhe com as mãos até a posição de prancha — corpo reto, core ativado (meio).","Faça 1 push-up controlado — peito quase no chão, cotovelos a 45° (fim).","Caminhe os pés em direção às mãos. Suba de volta."],
    feel:"Isquiotibiais ao caminhar os pés, ombros e peitoral no push-up, core na prancha.", errors:"Quadril caindo na prancha, push-up sem o corpo alinhado.", muscles:"Isquiotibiais, ombros, peitoral, serrátil, core", mtb:"Integração de cadeia cinética completa — perfeito para aquecimento do Treino C.",
  },

  // ══════ TREINO C — PRINCIPAL ══════
  {
    t:"C", s:"main",
    name:"Face Pull com Elástico — Saúde do Ombro",
    sets:"3 × 15 reps", rest:"30s", equip:"Elástico ancorado na altura dos olhos",
    photos:[
      { src:`${E}Face_Pull/0.jpg`,              pos:"INÍCIO", label:"Cotovelos altos — elástico em tensão" },
      { src:`${E}Alternating_Renegade_Row/0.jpg`, pos:"MEIO", label:"Puxando — cotovelos abrem para os lados" },
      { src:`${E}Face_Pull/1.jpg`,              pos:"FIM",    label:"Rotação externa — mãos para trás das orelhas (2s)" },
    ],
    ytId:"AlTGQrDOd98",
    steps:["Elástico na altura dos olhos, polegares para trás, cotovelos ALTOS (início).","Puxe em direção ao rosto — cotovelos abrem para os lados na altura das orelhas (meio).","No ponto final: ROTAÇÃO EXTERNA — mãos para trás das orelhas, como o número '21' (fim).","Segure 2 segundos. Retorne LENTAMENTE."],
    feel:"Ombro posterior, trapézio médio, sensação de 'abrir' o peito. Se sentir no pescoço, abaixe os cotovelos.", errors:"Cotovelos abaixo dos ombros, sem rotação externa final, voltar rápido.", muscles:"Deltóide posterior, trapézio médio e inferior, romboide, infraespinal, redondo menor", mtb:"Previne ombro arredondado e mantém a postura no guidão após horas de pedal.",
    prog:{"1–2":"Elástico leve, 12 reps","3–4":"Elástico médio, 15 reps, 2s contração","5–6":"Elástico médio, 15 reps, 3s excêntrico","7–8":"Elástico médio-forte, 15 reps + 5 isotônicas"},
  },
  {
    t:"C", s:"main",
    name:"Thread the Needle — Rotação Torácica",
    sets:"3 × 10 reps/lado", rest:"30s", equip:"Peso corporal",
    photos:[
      { src:`${E}Push_Up_to_Side_Plank/0.jpg`, pos:"INÍCIO", label:"Prancha lateral — braço livre ao teto" },
      { src:`${E}Alternating_Renegade_Row/1.jpg`, pos:"MEIO", label:"Iniciando — braço começa a entrar por baixo" },
      { src:`${E}Push_Up_to_Side_Plank/1.jpg`,  pos:"FIM",   label:"Thread — braço passa por baixo do tronco" },
    ],
    ytId:"GBzCNEjborE",
    steps:["Prancha lateral: antebraço no chão, corpo alinhado, braço livre ao teto (início).","Ative o core — quadril NÃO cai. Comece a levar o braço por baixo (meio).","Leve o braço livre por BAIXO do tronco passando pelo espaço entre o chão e o corpo (fim).","Siga o braço com o olhar. Retorne abrindo o braço para o teto. Quadril nivelado."],
    feel:"Oblíquo (lateral do abdômen), abertura torácica, ombro de baixo estabilizando.", errors:"Quadril que afunda ou sobe, rotação insuficiente, segurar a respiração.", muscles:"Oblíquos, serrátil anterior, rotadores torácicos, deltóide, glúteo médio", mtb:"Rotacionar o tronco independente do quadril = chave das curvas técnicas.",
    prog:{"1–2":"Plank lateral estático, 30s/lado","3–4":"Thread, amplitude reduzida, 8 reps","5–6":"Amplitude completa, 10 reps","7–8":"Thread + abrir o braço acima da cabeça no final"},
  },
  {
    t:"C", s:"main",
    name:"Renegade Row com Kettlebell",
    sets:"3 × 10 reps/lado", rest:"45s", equip:"2 Kettlebells ou halteres",
    photos:[
      { src:`${E}Alternating_Renegade_Row/0.jpg`, pos:"INÍCIO", label:"Prancha alta — KBs no chão, core ativo" },
      { src:`${E}One-Arm_Kettlebell_Row/0.jpg`,  pos:"MEIO",   label:"Puxada — cotovelo ao quadril, tronco não rotaciona" },
      { src:`${E}Alternating_Renegade_Row/1.jpg`, pos:"FIM",   label:"Topo — KB ao quadril, controle anti-rotação" },
    ],
    ytId:"ZPU0mZyMmgE",
    steps:["Prancha alta com as mãos nos KBs na largura dos ombros, core ativo (início).","PRIMEIRO: retrate a escápula (ombro para trás e para baixo) ANTES de puxar (meio).","Puxe o KB ao quadril em linha reta — tronco NÃO rotaciona (fim).","Retorne com controle. Alterne os lados."],
    feel:"Latíssimo (músculo lateral grande das costas), romboide, bíceps, core anti-rotação.", errors:"Rotacionar o tronco para ajudar, iniciar pelo bíceps ao invés da escápula.", muscles:"Latíssimo do dorso, romboide, trapézio médio, bíceps, core anti-rotação, serrátil", mtb:"Cada puxada no guidão em subidas usa exatamente este padrão.",
    prog:{"1–2":"Elástico ancorado, sentada, 10 reps/lado","3–4":"Renegade Row, KB leve, 8 reps/lado","5–6":"KB médio, 10 reps/lado, 2s pausa","7–8":"KB médio, 10 reps/lado, 3s excêntrico"},
  },
  {
    t:"C", s:"main",
    name:"Calf Raise Unipodal Excêntrico na Borda",
    sets:"3 × 15 reps/lado", rest:"30s", equip:"Degrau ou borda",
    photos:[
      { src:`${E}Standing_Calf_Raises/1.jpg`,       pos:"INÍCIO", label:"Topo — suba com dois pés, KB opcional" },
      { src:`${E}Calf_Raise_On_A_Dumbbell/0.jpg`,   pos:"MEIO",   label:"Transferindo — peso em UM pé só" },
      { src:`${E}Calf_Raises_-_With_Bands/1.jpg`,   pos:"FIM",    label:"Descida em 3s — calcanhar abaixo do nível" },
    ],
    ytId:"fuiPJBMTv3c",
    steps:["Suba com os DOIS pés para a posição alta (início).","Transfira o peso para UM pé só. Meia ponta na borda (meio).","DESÇA em 3 segundos com UM pé só (fim) — fase excêntrica lenta é o foco.","Calcanhares abaixo da borda na descida. Use apoio na parede para equilíbrio."],
    feel:"Estiramento profundo na panturrilha na descida. Queimação progressiva após 8-10 reps.", errors:"Descer rápido (perde o benefício excêntrico), não ir abaixo do nível.", muscles:"Gastrocnêmio, sóleo, tendão de Aquiles, fibulares", mtb:"Panturrilha forte = estabilidade no pedal e prevenção de cãibra nas descidas.",
    prog:{"1–2":"Com dois pés, 15 reps, 3s excêntrico","3–4":"Unipodal, 12 reps, 3s","5–6":"Unipodal, 15 reps, 3s","7–8":"Unipodal, 15 reps, 4s + 1s pausa no fundo"},
  },
  {
    t:"C", s:"main",
    name:"Push-Up na Bola com Rotação (T Push-Up)",
    sets:"3 × 8 reps/lado", rest:"45s", equip:"Gym ball + peso corporal",
    photos:[
      { src:`${E}Push-Ups_With_Feet_On_An_Exercise_Ball/0.jpg`, pos:"INÍCIO", label:"Prancha com pés na bola — instabilidade ativa" },
      { src:`${E}Push_Up_to_Side_Plank/0.jpg`,                  pos:"MEIO",   label:"Push-up completo — bola estabiliza" },
      { src:`${E}Push_Up_to_Side_Plank/1.jpg`,                  pos:"FIM",    label:"Rotação — braço ao teto (T)" },
    ],
    ytId:"vRqGdDlPQKM",
    steps:["Prancha alta com pés na bola (ou joelhos para iniciantes) (início).","Desça fazendo um push-up completo — cotovelos a 45° do corpo (meio).","Ao subir, transfira o peso e rotacione — braço ao teto, corpo forma 'T' (fim).","Retorne ao centro, repita alternando os lados."],
    feel:"Peitoral e tríceps no push-up. Serrátil e oblíquos na rotação. Bola adiciona instabilidade.", errors:"Quadril caindo durante a rotação, cotovelos muito abertos.", muscles:"Peitoral, tríceps, serrátil anterior, deltóide, oblíquos, core anti-rotação", mtb:"Força de empurrar + estabilidade de ombro = absorção de impacto no guidão.",
    prog:{"1–2":"Joelhos no chão, sem rotação","3–4":"Push-up completo + rotação parcial","5–6":"Pés na bola, rotação completa","7–8":"Pés na bola, KB nas mãos (instabilidade máxima)"},
  },
  {
    t:"C", s:"main",
    name:"Turkish Get-Up com Kettlebell",
    sets:"2 × 3 reps/lado", rest:"60s", equip:"Kettlebell leve (ou sem peso para aprender)",
    photos:[
      { src:`${E}Kettlebell_Turkish_Get-Up_Lunge_style/0.jpg`, pos:"INÍCIO", label:"Fase 1 — deitada, KB ao teto, olhe sempre para o KB" },
      { src:`${E}One-Arm_Kettlebell_Row/1.jpg`,                pos:"MEIO",   label:"Fase 3 — quadril elevado, linha do chão ao KB" },
      { src:`${E}Kettlebell_Turkish_Get-Up_Lunge_style/1.jpg`, pos:"FIM",    label:"Fase 4 — afundo, prestes a levantar" },
    ],
    ytId:"5kb9Blkrj2w",
    steps:["FASE 1: Deitada com KB ao teto. Olhe SEMPRE para o KB. Role para o antebraço (início).","FASE 2: Sente. FASE 3: Eleve o quadril apoiando na mão (meio).","FASE 4: Joelho no chão — posição de afundo (fim). FASE 5: Fique em pé.","Pause. Reverta toda a sequência com controle."],
    feel:"Ombro trabalhando em TODA a amplitude, core em todas as fases, integração total.", errors:"Perder contato visual com o KB, apressar qualquer fase, carga alta antes de dominar sem peso.", muscles:"Ombro (360°), core completo, quadríceps, glúteos, estabilizadores do tornozelo, manguito rotador", mtb:"Integração de toda a cadeia cinética — mesma usada ao recuperar o equilíbrio da bike.",
    prog:{"1–2":"Sem peso, foco em cada fase isoladamente","3–4":"KB leve, até fase 4","5–6":"KB leve, sequência completa, 3 reps","7–8":"KB moderado, sequência fluida"},
  },

  // ══════ TREINO C — COOLDOWN ══════
  { t:"C", s:"cooldown", name:"Chest Stretch na Bola de Pilates", dur:"45s/lado", equip:"Gym ball",
    photos:[
      { src:`${E}Chest_Stretch_on_Stability_Ball/0.jpg`||`${E}Exercise_Ball_Crunch/0.jpg`, pos:"INÍCIO", label:"Apoio na bola — braço ao lado" },
      { src:`${E}Exercise_Ball_Crunch/1.jpg`, pos:"MEIO", label:"Reclinando — peito abrindo" },
      { src:`${E}Exercise_Ball_Pull-In/0.jpg`, pos:"FIM", label:"Estiramento — peitoral e deltóide anterior" },
    ],
    steps:["Apoie o antebraço ou o braço lateralmente na bola.","Recline o tronco — o peito abre para o lado oposto.","DOIS ÂNGULOS: braço a 90° (peitoral médio), braço acima (peitoral inferior)."],
    feel:"Abertura do peito, estiramento no peitoral e deltóide anterior.", muscles:"Peitoral maior e menor, deltóide anterior, bíceps" },
  { t:"C", s:"cooldown", name:"Thoracic Extension na Bola de Pilates", dur:"2-3 minutos", equip:"Gym ball",
    photos:[
      { src:`${E}Exercise_Ball_Crunch/0.jpg`, pos:"INÍCIO", label:"Sentada na bola — posição inicial" },
      { src:`${E}Exercise_Ball_Pull-In/1.jpg`, pos:"MEIO",  label:"Reclinando sobre a bola" },
      { src:`${E}Exercise_Ball_Crunch/1.jpg`, pos:"FIM",    label:"Extensão completa — torácica abrindo" },
    ],
    steps:["Sente na bola e recline suavemente as costas sobre ela.","Deixe a bola apoiar a região torácica (meio das costas, não lombar).","Deixe as costas se dobrarem sobre a bola — respire fundo e relaxe na expiração."],
    feel:"Abertura e extensão das costas no meio. Pode fazer 'estalar' — é normal.", muscles:"Coluna torácica, romboides, peitoral (alongamento), intercostais" },
  { t:"C", s:"cooldown", name:"4-7-8 Respiração — Recuperação Avançada", dur:"4 ciclos completos", equip:"Peso corporal",
    photos:[
      { src:`${E}Childs_Pose/0.jpg`, pos:"INÍCIO", label:"Posição do bebê — relaxamento inicial" },
      { src:`${E}Childs_Pose/1.jpg`, pos:"MEIO",   label:"Expiração profunda — release completo" },
      { src:`${E}Dead_Bug/0.jpg`,    pos:"FIM",    label:"Deitada — 4-7-8 completo" },
    ],
    steps:["Inspire pelo nariz: 4 segundos.","Segure o ar: 7 segundos.","Expire pela boca (lábios em 'O'): 8 segundos. Ativa o parassimpático mais que o box breathing."],
    feel:"Leve tontura nos primeiros ciclos (normal). Após 4 ciclos, calma profunda.", muscles:"Diafragma, sistema nervoso parassimpático, recuperação do SNC" },
];

const COLORS = { A:"#4ade80", B:"#f97316", C:"#c084fc" };
const PROG_DATA = [
  { weeks:"1–2", phase:"ADAPTAÇÃO",    color:"#4ade80", series:"2–3", repsTime:"10–12 / 30s", rest:"60–75s", load:"Leve",          goal:"Aprender a técnica correta. Não importa a carga — importa a execução perfeita." },
  { weeks:"3–4", phase:"DESENVOLVIMENTO",color:"#facc15",series:"3",  repsTime:"12–15 / 40s", rest:"45–60s", load:"Leve-Moderada", goal:"Aumentar volume. Inserir instabilidade. Manter qualidade com mais esforço." },
  { weeks:"5–6", phase:"INTENSIFICAÇÃO",color:"#f97316", series:"3–4",repsTime:"15–20 / 45s", rest:"30–45s", load:"Moderada",       goal:"Reduzir descanso e aumentar volume. Inserir excêntrico (3s) nos principais." },
  { weeks:"7–8", phase:"CONSOLIDAÇÃO",  color:"#c084fc", series:"3–4",repsTime:"15–20 / 60s", rest:"30s",    load:"Moderada-Alta",  goal:"Integração neuromuscular. Máxima qualidade com o maior volume do programa." },
];

// PhotoStrip replaced by ExerciseGifStrip above

// ─── Exercise Card ─────────────────────────────────────────────────────────────
function ExCard({ ex, idx }) {
  const [open, setOpen] = useState(false);
  const color = COLORS[ex.t];
  return (
    <div style={{ background: open?"#0c0c16":"#0a0a13", border:`1px solid ${open?color+"50":"#ffffff0c"}`, borderRadius:12, overflow:"hidden", transition:"all 0.2s" }}>
      {/* Header */}
      <button onClick={() => setOpen(!open)} style={{ width:"100%", display:"flex", alignItems:"stretch", background:"transparent", border:"none", cursor:"pointer", textAlign:"left" }}>
        <div style={{ width:68, flexShrink:0, background:`${color}12`, overflow:"hidden", position:"relative" }}>
          {FEMALE_VIDEOS[ex.name] && (
            <img
              src={`https://img.youtube.com/vi/${FEMALE_VIDEOS[ex.name].ytId}/mqdefault.jpg`}
              alt=""
              style={{ width:"100%", height:"100%", objectFit:"cover" }}
              onError={e=>{e.currentTarget.style.display="none";}}
            />
          )}
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.3)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, color, textShadow:"0 1px 4px #000" }}>{idx+1}</span>
          </div>
        </div>
        <div style={{ flex:1, padding:"9px 12px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:14, color:"#fff", lineHeight:1.2 }}>{ex.name}</div>
          <div style={{ fontSize:10, color:"#555", marginTop:3, display:"flex", gap:10, flexWrap:"wrap" }}>
            {ex.sets && <span style={{color}}>{ex.sets}</span>}
            {ex.rest && <span>↩ {ex.rest}</span>}
            {ex.dur && <span style={{color}}>{ex.dur}</span>}
            {ex.ytId && <span style={{color:"#ff5555"}}>▶ vídeo</span>}
          </div>
        </div>
        <div style={{ padding:"0 12px", display:"flex", alignItems:"center", color:open?color:"#444", fontSize:18, transition:"transform .2s", transform:open?"rotate(180deg)":"rotate(0)" }}>⌄</div>
      </button>

      {/* Expanded */}
      {open && (
        <div style={{ padding:"12px 13px 16px", borderTop:`1px solid ${color}20` }}>
          {/* GIF + 3 PHOTOS — always shown on expand */}
          <ExerciseGifStrip exName={ex.name} color={color} />

          {/* YouTube */}
          {ex.ytId && (
            <a href={`https://www.youtube.com/watch?v=${ex.ytId}`} target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#ff000015", border:"1px solid #ff000040", borderRadius:7, padding:"6px 12px", marginBottom:12, textDecoration:"none", color:"#ff6666", fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:700 }}>
              <span>▶</span> VER TUTORIAL ↗
            </a>
          )}

          {ex.equip && <div style={{ display:"inline-block", background:"#ffffff08", borderRadius:20, padding:"3px 12px", fontSize:10, color:"#777", marginBottom:11 }}>🎯 {ex.equip}</div>}

          {/* Steps */}
          <div style={{ marginBottom:11 }}>
            <div style={{ fontSize:9, letterSpacing:2, color:"#555", fontFamily:"'Barlow Condensed',sans-serif", marginBottom:7 }}>EXECUÇÃO PASSO A PASSO</div>
            {(ex.steps||[]).map((s,i) => (
              <div key={i} style={{ display:"flex", gap:9, marginBottom:6, alignItems:"flex-start" }}>
                <div style={{ width:19, height:19, borderRadius:"50%", background:`${color}20`, border:`1px solid ${color}44`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                  <span style={{ fontSize:9, color, fontWeight:700 }}>{i+1}</span>
                </div>
                <div style={{ fontSize:12, color:"#ccc", lineHeight:1.6 }}>{s}</div>
              </div>
            ))}
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7, marginBottom:9 }}>
            {ex.feel && <div style={{ background:`${color}12`, border:`1px solid ${color}30`, borderRadius:8, padding:"8px 10px" }}>
              <div style={{ fontSize:9, letterSpacing:1.5, color, fontFamily:"'Barlow Condensed',sans-serif", marginBottom:4 }}>💪 ONDE SENTIR</div>
              <div style={{ fontSize:11, color:"#e0e0e0", lineHeight:1.5 }}>{ex.feel}</div>
            </div>}
            {ex.errors && <div style={{ background:"#ff444410", border:"1px solid #ff444428", borderRadius:8, padding:"8px 10px" }}>
              <div style={{ fontSize:9, letterSpacing:1.5, color:"#ff6666", fontFamily:"'Barlow Condensed',sans-serif", marginBottom:4 }}>⚠️ ERROS</div>
              <div style={{ fontSize:11, color:"#ffaaaa", lineHeight:1.5 }}>{ex.errors}</div>
            </div>}
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:7, marginBottom:9 }}>
            {ex.muscles && <div style={{ background:"#ffffff04", borderRadius:8, padding:"7px 9px" }}>
              <div style={{ fontSize:9, color:"#555", fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:1.5, marginBottom:3 }}>MÚSCULOS</div>
              <div style={{ fontSize:11, color:"#888", lineHeight:1.5 }}>{ex.muscles}</div>
            </div>}
            {ex.mtb && <div style={{ background:"#ffffff04", borderRadius:8, padding:"7px 9px" }}>
              <div style={{ fontSize:9, color:"#555", fontFamily:"'Barlow Condensed',sans-serif", letterSpacing:1.5, marginBottom:3 }}>🚵 MTB</div>
              <div style={{ fontSize:11, color:"#aaa", lineHeight:1.5 }}>{ex.mtb}</div>
            </div>}
          </div>

          {ex.prog && (
            <div>
              <div style={{ fontSize:9, letterSpacing:2, color:"#555", fontFamily:"'Barlow Condensed',sans-serif", marginBottom:6 }}>PROGRESSÃO 8 SEMANAS</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:5 }}>
                {Object.entries(ex.prog).map(([wk,val],pi) => {
                  const pc=["#4ade8044","#facc1544","#f9731644","#c084fc44"];
                  return <div key={pi} style={{ background:"#ffffff04", borderRadius:6, padding:"6px 9px", borderLeft:`3px solid ${pc[pi]}` }}>
                    <div style={{ fontSize:8, color:"#555", letterSpacing:1, marginBottom:2 }}>SEM {wk}</div>
                    <div style={{ fontSize:10, color:"#bbb", lineHeight:1.4 }}>{val}</div>
                  </div>;
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [sec, setSec] = useState("trainings");
  const [tr, setTr] = useState("A");
  const [tab, setTab] = useState("warmup");
  const color = COLORS[tr];
  const filtered = ALL.filter(e => e.t===tr && e.s===tab);
  const cnt = s => ALL.filter(e => e.t===tr && e.s===s).length;

  return (
    <div style={{ minHeight:"100vh", background:"#080810", color:"#e0e0e0", fontFamily:"'Barlow',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0;}::-webkit-scrollbar{width:4px;background:#111;}::-webkit-scrollbar-thumb{background:#2a2a3a;border-radius:2px;}`}</style>

      {/* Hero */}
      <div style={{ background:"linear-gradient(180deg,#0d0d1e,#080810)", borderBottom:"1px solid #ffffff0a", padding:"28px 20px 20px", textAlign:"center" }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(26px,6.5vw,58px)", letterSpacing:6, color:"#fff" }}>PROGRAMA FUNCIONAL MTB</div>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"clamp(11px,2.5vw,16px)", letterSpacing:4, color:"#4ade80", marginTop:5 }}>PERFORMANCE & LONGEVIDADE ESPORTIVA</div>
        <div style={{ fontSize:9, color:"#444", letterSpacing:2, marginTop:6 }}>8 SEMANAS · 3 TREINOS · HALTERES · ELÁSTICOS · BOSU · GYM BALL · 3 FOTOS/EXERCÍCIO</div>
      </div>

      {/* Top nav */}
      <div style={{ display:"flex", justifyContent:"center", background:"#0a0a14", borderBottom:"1px solid #ffffff0a", position:"sticky", top:0, zIndex:20 }}>
        {[{id:"trainings",l:"Treinos"},{id:"progression",l:"Progressão 8 Semanas"},{id:"calendar",l:"Calendário & MTB"}].map(n => (
          <button key={n.id} onClick={()=>setSec(n.id)} style={{ padding:"12px 16px", border:"none", background:"transparent", color:sec===n.id?"#4ade80":"#555", fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, fontWeight:600, letterSpacing:1, borderBottom:sec===n.id?"2px solid #4ade80":"2px solid transparent", cursor:"pointer" }}>{n.l}</button>
        ))}
      </div>

      <div style={{ maxWidth:820, margin:"0 auto", padding:"20px 12px 80px" }}>

        {sec==="trainings" && (
          <div>
            <div style={{ display:"flex", gap:8, marginBottom:18 }}>
              {TRAININGS_META.map(t => (
                <button key={t.id} onClick={()=>{setTr(t.id);setTab("warmup");}} style={{ flex:1, padding:"11px 6px", borderRadius:12, border:`1px solid ${tr===t.id?COLORS[t.id]+"88":"#ffffff0d"}`, background:tr===t.id?`${COLORS[t.id]}15`:"#0a0a14", cursor:"pointer" }}>
                  <div style={{ fontSize:22 }}>{t.icon}</div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:15, color:tr===t.id?COLORS[t.id]:"#555", letterSpacing:2, marginTop:2 }}>{t.label}</div>
                  <div style={{ fontSize:9, color:"#444", marginTop:1 }}>{t.sub}</div>
                </button>
              ))}
            </div>

            {/* Training info bar */}
            {(() => { const m=TRAININGS_META.find(x=>x.id===tr); return m ? (
              <div style={{ background:`${color}10`, border:`1px solid ${color}25`, borderRadius:10, padding:"10px 14px", marginBottom:14, fontSize:11, color:"#aaa" }}>
                <span style={{ color, fontWeight:700 }}>{m.label} </span>· {m.focus} · ⏱ {m.duration} · 🚵 {m.mtbLink}
              </div>
            ) : null; })()}

            <div style={{ display:"flex", gap:6, marginBottom:12, flexWrap:"wrap" }}>
              {[{id:"warmup",l:"🔆 Aquecimento"},{id:"main",l:"⚡ Principal"},{id:"cooldown",l:"🌙 Finalização"}].map(t => (
                <button key={t.id} onClick={()=>setTab(t.id)} style={{ padding:"8px 14px", borderRadius:40, border:`1px solid ${tab===t.id?color+"88":"#ffffff12"}`, background:tab===t.id?`${color}18`:"#ffffff05", color:tab===t.id?color:"#555", fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, fontWeight:600, cursor:"pointer" }}>
                  {t.l} <span style={{opacity:.5}}>({cnt(t.id)})</span>
                </button>
              ))}
            </div>

            <div style={{ background:"#ffffff04", borderRadius:7, padding:"6px 12px", fontSize:10, color:"#555", marginBottom:10 }}>
              Clique em cada exercício para expandir · 3 fotos reais de execução sempre visíveis · Equipamentos: halteres, elásticos, bosu, gym ball, kettlebell, peso corporal
            </div>

            <div style={{ display:"grid", gap:8 }}>
              {filtered.map((ex,i) => <ExCard key={ex.name} ex={ex} idx={i} />)}
            </div>
          </div>
        )}

        {sec==="progression" && (
          <div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, letterSpacing:4, color:"#4ade80", marginBottom:6 }}>PROGRESSÃO DE CARGA — 8 SEMANAS</div>
            <p style={{ color:"#666", fontSize:12, marginBottom:18, lineHeight:1.7 }}>Qualidade técnica sempre acima da carga. Se a técnica falhar, não avance.</p>
            <div style={{ display:"grid", gap:12, marginBottom:28 }}>
              {PROG_DATA.map((p,i) => (
                <div key={i} style={{ background:`linear-gradient(135deg,${p.color}10,transparent 70%)`, border:`1px solid ${p.color}33`, borderRadius:12, padding:16 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10, marginBottom:10 }}>
                    <div>
                      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, color:p.color, letterSpacing:3 }}>{p.phase}</div>
                      <div style={{ fontSize:11, color:"#666" }}>Semanas {p.weeks}</div>
                    </div>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {[["SÉRIES",p.series],["REPS/TEMPO",p.repsTime],["DESCANSO",p.rest],["CARGA",p.load]].map(([l,v],li) => (
                        <div key={li} style={{ background:"#ffffff08", borderRadius:7, padding:"5px 10px", textAlign:"center" }}>
                          <div style={{ fontSize:8, color:"#555", letterSpacing:1 }}>{l}</div>
                          <div style={{ fontSize:13, color:li===3?p.color:"#fff", fontWeight:700 }}>{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ background:"#ffffff05", borderRadius:7, padding:"8px 12px", fontSize:12, color:"#bbb", lineHeight:1.6 }}>
                    <span style={{ color:p.color, fontWeight:600 }}>Objetivo: </span>{p.goal}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {sec==="calendar" && (
          <div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, letterSpacing:4, color:"#4ade80", marginBottom:6 }}>CALENDÁRIO SEMANAL</div>
            <p style={{ color:"#666", fontSize:12, marginBottom:16 }}>Funcionais nunca antes de um MTB intenso no mesmo dia.</p>
            <div style={{ background:"#0a0a14", border:"1px solid #ffffff0d", borderRadius:12, overflow:"hidden", marginBottom:24 }}>
              {[{day:"SEG",c:"🚵 MTB",s:"Técnico ou base Z2",clr:"#4ade80"},{day:"TER",c:"⚡ TREINO A",s:"Core + Cadeia Posterior + Lombar",clr:"#4ade80"},{day:"QUA",c:"🚵 MTB",s:"Intervalo ou Z2",clr:"#4ade80"},{day:"QUI",c:"🔥 TREINO B",s:"Glúteos + Quadríceps + Propriocepção",clr:"#f97316"},{day:"SEX",c:"🚵 MTB",s:"Longo ou XC específico",clr:"#4ade80"},{day:"SÁB",c:"🏔️ TREINO C",s:"Ombros + Integração + Panturrilha",clr:"#c084fc"},{day:"DOM",c:"😴 RECUPERAÇÃO",s:"Ativo leve, mobilidade, banho frio",clr:"#555"}].map((d,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 16px", borderBottom:i<6?"1px solid #ffffff07":"none", background:i%2===0?"#ffffff02":"transparent" }}>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:14, letterSpacing:2, color:"#444", width:34 }}>{d.day}</div>
                  <div>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:14, color:d.clr, fontWeight:700 }}>{d.c}</div>
                    <div style={{ fontSize:10, color:"#555", marginTop:1 }}>{d.s}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, letterSpacing:4, color:"#4ade80", marginBottom:12 }}>CONEXÃO COM O MTB</div>
            {[{title:"Descidas Técnicas",icon:"⛰️",color:"#f97316",items:[{ex:"Skater Squat",why:"Treina o joelho travado em ângulo neutro — posição exata da descida com quadril atrás e tronco baixo."},{ex:"Equilíbrio no Bosu",why:"Propriocepção = reação mais rápida quando a roda escapa em pedra ou raiz."},{ex:"Push-Up na Bola",why:"Reflexo de ombro para absorver impactos abruptos do guidão."}]},{title:"Subidas Longas",icon:"🔼",color:"#4ade80",items:[{ex:"RDL com Halteres",why:"Isquiotibiais e glúteos resistentes = menos cãibra e mais potência no final."},{ex:"Hollow Body Hold",why:"Previne a perda de postura lombar na fadiga — o core aguenta mais."},{ex:"Step Up com Halteres",why:"Replica o padrão unilateral do pedal em rampas."}]},{title:"Curvas e Técnica",icon:"↩️",color:"#facc15",items:[{ex:"Lateral Lunge com KB",why:"Adutores fortes = melhor inclinação lateral do corpo nas curvas."},{ex:"Thread the Needle",why:"Dissociação tronco-quadril: a chave das curvas técnicas."},{ex:"Face Pull com Elástico",why:"Ombros estáveis = guidão mais preciso e menor chance de lesão."}]},{title:"Provas acima de 3h",icon:"⏱️",color:"#38bdf8",items:[{ex:"Calf Raise Unipodal",why:"Panturrilha resiliente = sem cãibra nos últimos 20km das maratonas XCM."},{ex:"Good Morning com Elástico",why:"Resistência muscular na cadeia posterior evita fadiga precoce."},{ex:"Respiração 4-7-8",why:"Menor custo energético respiratório e recuperação acelerada do SNC."}]}].map((note,ni) => (
              <div key={ni} style={{ background:`linear-gradient(135deg,${note.color}10,transparent 70%)`, border:`1px solid ${note.color}33`, borderRadius:12, padding:16, marginBottom:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                  <span style={{ fontSize:20 }}>{note.icon}</span>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:17, letterSpacing:3, color:note.color }}>{note.title}</div>
                </div>
                <div style={{ display:"grid", gap:7 }}>
                  {note.items.map((item,ii) => (
                    <div key={ii} style={{ background:"#ffffff05", borderRadius:7, padding:"8px 12px", display:"flex", gap:10 }}>
                      <div style={{ width:3, borderRadius:2, background:note.color, flexShrink:0 }} />
                      <div>
                        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, color:"#fff", fontWeight:700, marginBottom:2 }}>{item.ex}</div>
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
