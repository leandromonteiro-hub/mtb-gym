import { useState } from "react";

// ─── YouTube video IDs per exercise ───────────────────────────────────────────
const VIDEOS = {
  "Cat-Cow (Gato-Vaca)":                                  { id: "xyNwxiuERXc", title: "Cat-Cow Stretch — Proper Form Tutorial" },
  "Hip 90/90 com Rotação de Tronco":                      { id: "jpcC-6BQbWs", title: "Hip 90/90 Mobility Drill" },
  "Dead Bug — Ativação de Core Profundo":                 { id: "4XLEnwUr1d8", title: "Dead Bug Exercise — Core Activation" },
  "Glute Bridge Lento (Ponte de Glúteo)":                 { id: "8bbE64NuDTU", title: "Glute Bridge — Proper Form" },
  "Romanian Deadlift — RDL":                              { id: "KN5vN3JskqI", title: "Romanian Deadlift — Proper Form & Technique [4K]" },
  "Bird Dog com Pausa de 3 Segundos":                     { id: "dia-fydN7rE", title: "Bird Dog Tutorial — Core Stability & Low Back" },
  "Hollow Body Hold (Posição Hollow)":                    { id: "LlDNef_Ztsc", title: "Hollow Body Hold Progression — GMB Fitness" },
  "Good Morning com Faixa Elástica":                      { id: "fJA39ZOVaEQ", title: "How To Do Banded Good Mornings — Rogue" },
  "Pallof Press — Anti-Rotação":                          { id: "axgv7H_VQOo", title: "Pallof Press Exercise Guide — BarBend" },
  "Superman Alternado com Pausa":                         { id: "cc3tHPVRXgE", title: "Superman Exercise — Back Extension" },
  "World's Greatest Stretch":                             { id: "Q3lJRL_QC9Y", title: "World's Greatest Stretch Tutorial" },
  "Lateral Band Walk (Caminhada Lateral com Faixa)":      { id: "pqSxMVPGyjY", title: "Lateral Band Walk — Glute Med Activation" },
  "Leg Swing — Frontal e Lateral":                        { id: "LMnGHNlpfAQ", title: "Leg Swings — Hip Mobility Drill" },
  "Agachamento de Ativação (Lento)":                      { id: "aclHkVaku9U", title: "Bodyweight Squat — Activation" },
  "Agachamento Búlgaro (Rear Foot Elevated Split Squat)": { id: "SkNsa3eBwLA", title: "How to do the Bulgarian Split Squat — 2 Min Tutorial" },
  "Step Up com Pausa de 2 Segundos":                      { id: "aKj-6hgiViA", title: "How To PROPERLY Perform Dumbbell Step Ups (Glute Focused)" },
  "Single Leg Deadlift (Levantamento Unipodal)":          { id: "ooGNupLrZJw", title: "Single Leg Deadlift — Proper Form & Tutorial" },
  "Lateral Lunge com Toque no Chão":                      { id: "gwWv7aPcD88", title: "How To Series — Lateral Lunge" },
  "Equilíbrio Unipodal no Bosu":                          { id: "rCJKBqOJUV8", title: "Single Leg Balance on Bosu — Proprioception" },
  "Skater Squat (Agachamento Patinador)":                 { id: "YO-247pOeIc", title: "Skater Squats — Best Bodyweight Leg Exercise" },
  "Shoulder CARs (Rotações Articulares Controladas)":     { id: "2NEzCYI2_sU", title: "Shoulder CARs — Controlled Articular Rotations" },
  "Band Pull Apart (Faixa Elástica)":                     { id: "VGcEkjGHH6I", title: "Band Pull Apart — Upper Back & Shoulder Health" },
  "Calf Raises Lentos na Borda do Degrau":                { id: "gwWv7aPcD88", title: "Calf Raises — Full Range on Step" },
  "Inchworm com Push-Up":                                 { id: "Zrn-mQGpSKs", title: "Inchworm with Push-Up — Full Body Warm-Up" },
  "Face Pull com Faixa Elástica":                         { id: "AlTGQrDOd98", title: "Banded Face Pulls Tutorial — Proper Form & Technique" },
  "Plank com Thread the Needle (Rotação Torácica)":       { id: "GBzCNEjborE", title: "Thread the Needle — Thoracic Rotation" },
  "Single Arm Row com Faixa Elástica":                    { id: "ZPU0mZyMmgE", title: "Single Arm Band Row — Back & Anti-Rotation" },
  "Calf Raise Unipodal Excêntrico na Borda":              { id: "fuiPJBMTv3c", title: "Eccentric Single Leg Calf Raise — Achilles Strength" },
  "T Push-Up (Flexão com Rotação)":                       { id: "vRqGdDlPQKM", title: "T Push-Up — Rotation Push-Up Tutorial" },
  "Turkish Get-Up — TGU":                                 { id: "5kb9Blkrj2w", title: "The Turkish Get-Up Step by Step" },
};

// ─── Video Button — opens YouTube in new tab ───────────────────────────────────
function VideoButton({ name, color }) {
  const video = VIDEOS[name];
  if (!video) return null;
  const url = `https://www.youtube.com/watch?v=${video.id}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex", alignItems: "center", gap: 12,
        background: "#ff000012", border: "1px solid #ff000033",
        borderRadius: 10, padding: "10px 16px", marginBottom: 14,
        textDecoration: "none", transition: "all 0.2s",
      }}
      onMouseEnter={e => { e.currentTarget.style.background = "#ff000022"; e.currentTarget.style.borderColor = "#ff000066"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "#ff000012"; e.currentTarget.style.borderColor = "#ff000033"; }}
    >
      {/* YouTube thumbnail */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <img
          src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
          alt={video.title}
          style={{ width: 80, height: 45, borderRadius: 6, objectFit: "cover", display: "block" }}
          onError={e => { e.target.style.display = "none"; }}
        />
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          background: "#00000055", borderRadius: 6,
        }}>
          <div style={{
            width: 20, height: 20, borderRadius: "50%", background: "#ff0000",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 8, color: "#fff", marginLeft: 2 }}>▶</span>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, color: "#ff6666", fontWeight: 700, letterSpacing: 1, marginBottom: 3 }}>
          ▶ ASSISTIR TUTORIAL NO YOUTUBE
        </div>
        <div style={{ fontSize: 11, color: "#888", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {video.title}
        </div>
      </div>
      <span style={{ fontSize: 14, color: "#555", flexShrink: 0 }}>↗</span>
    </a>
  );
}

// ─── Full exercise database ────────────────────────────────────────────────────
const TRAININGS = [
  {
    id: "A", icon: "⚡", color: "#4ade80",
    name: "TREINO A",
    focus: "Core Profundo · Cadeia Posterior · Lombar",
    duration: "45–55 min",
    mtbLink: "Subidas longas, postura no pedal, prevenção de dor lombar",
    warmup: [
      {
        name: "Cat-Cow (Gato-Vaca)", sets: "2 × 10 reps lentas", equipment: "Peso corporal",
        steps: [
          "Posicione-se em quatro apoios: joelhos sob os quadris, pulsos sob os ombros.",
          "VACA: inspire e deixe a barriga cair em direção ao chão, elevando o olhar e o cóccix ao mesmo tempo. Arqueie toda a coluna.",
          "GATO: expire e empurre o meio das costas para o teto, enrolando a coluna como se fosse tocar o queixo no peito. Esvazie completamente o ar.",
          "Movimento lento — mínimo 3 segundos em cada posição. Sinta cada vértebra se movendo.",
        ],
        feel: "Deve sentir: alongamento na lombar e torácica. Pressão suave no abdômen durante o gato.",
        errors: "Erro comum: mover só o pescoço. O movimento deve vir de toda a coluna.",
        muscles: "Eretores da espinha, multífidos, reto abdominal, coluna torácica",
        mtb: "A coluna torácica rígida impede a absorção de impacto nas descidas. Este exercício restaura essa mobilidade.",
      },
      {
        name: "Hip 90/90 com Rotação de Tronco", sets: "2 × 8 reps/lado", equipment: "Peso corporal",
        steps: [
          "Sente no chão com uma perna dobrada à frente em 90° e a outra dobrada para o lado também em 90°.",
          "Mantendo a coluna ereta, incline levemente o tronco sobre a perna da frente — sinta o glúteo trabalhando.",
          "Gire o tronco abrindo o peito para o lado da perna de fora — a rotação vem da torácica, não do pescoço.",
          "Retorne ao centro, repita. Depois troque o lado das pernas.",
        ],
        feel: "Deve sentir: tensão na virilha (perna de fora), glúteo (perna da frente), rotação nas costas do meio.",
        errors: "Compensar inclinando o tronco de lado. Mantenha a coluna reta — o movimento é no quadril.",
        muscles: "Rotadores do quadril, piriforme, TFL, adutores, torácica",
        mtb: "Mobilidade de quadril essencial para inclinação do corpo nas curvas e posição em descidas.",
      },
      {
        name: "Dead Bug — Ativação de Core Profundo", sets: "2 × 8 reps/lado", equipment: "Peso corporal",
        steps: [
          "Deite de costas. Eleve os braços apontando para o teto e as pernas em 90° (joelhos dobrados, coxas verticais).",
          "CRÍTICO: pressione a lombar completamente contra o chão — esse contato nunca pode ser perdido.",
          "Expire devagar e desça o braço direito (acima da cabeça) enquanto estende a perna esquerda para frente — quase tocando o chão.",
          "Retorne ao centro, repita com o lado oposto. Se a lombar levantar, reduza a amplitude.",
        ],
        feel: "Deve sentir: contração profunda no centro do abdômen (abaixo do umbigo), não na barriga toda.",
        errors: "Arqueiar a lombar, prender a respiração, mover rápido. Este exercício é de controle, não velocidade.",
        muscles: "Transverso abdominal, multífidos, psoas, diafragma",
        mtb: "O core profundo estabiliza a pelve durante cada pedalada — sem ele a lombar sofre em longos.",
      },
      {
        name: "Glute Bridge Lento (Ponte de Glúteo)", sets: "2 × 10 reps (3s sobe / 2s pausa / 3s desce)", equipment: "Peso corporal",
        steps: [
          "Deite de costas, joelhos dobrados, pés no chão na largura dos quadris.",
          "Ative o core: pressione a lombar levemente ao chão antes de começar.",
          "Expire e empurre os calcanhares no chão — suba o quadril em 3 segundos.",
          "No topo: esprema os glúteos ao máximo. Segure 2 segundos. Desça em 3 seg controlado.",
        ],
        feel: "Deve sentir: queimação nos glúteos (principalmente no topo). Se sentir mais nas coxas, empurre mais os calcanhares.",
        errors: "Subir demais (hiperextensão lombar) ou não apertar o glúteo no topo.",
        muscles: "Glúteo máximo, glúteo médio, isquiotibiais, core",
        mtb: "Glúteos fracos = joelho caindo para dentro + dor lombar nas subidas longas.",
      },
    ],
    main: [
      {
        name: "Romanian Deadlift — RDL", sets: "3 × 12 reps", rest: "45s", equipment: "Halteres leves a moderados",
        steps: [
          "Em pé, pés na largura do quadril. Halteres à frente das coxas, palmas para o corpo.",
          "Inspire e ative o core. Empurre o quadril para TRÁS — é uma dobradiça no quadril, não um agachamento.",
          "Desça os halteres rentes às coxas e canelas, mantendo a coluna neutra (não arredonde a lombar).",
          "Desça até sentir forte tensão nos isquiotibiais (parte de trás da coxa) — geralmente na altura da canela.",
          "Expire e ative o glúteo: empurre o quadril para frente para subir. O glúteo é o motor principal.",
        ],
        feel: "Deve sentir: estiramento profundo na parte de trás da coxa. Glúteo forte na subida. Se sentir nas costas, reduza a carga.",
        errors: "Arredondar a lombar, dobrar os joelhos demais (vira agachamento), afastar os halteres do corpo.",
        muscles: "Isquiotibiais (foco), glúteo máximo, eretores da espinha, core",
        mtb: "A cadeia posterior é o principal motor de subidas longas. RDL forte = menos cãibra e mais potência no final.",
        progression: { "1–2": "Halteres leves, 10 reps, foco na técnica", "3–4": "Carga moderada, 12 reps, 3s descida", "5–6": "Carga moderada-alta, 12 reps + pausa 2s no fim", "7–8": "3-4 séries, 15 reps, 3s excêntrico + 1s pausa" },
      },
      {
        name: "Bird Dog com Pausa de 3 Segundos", sets: "3 × 10 reps/lado", rest: "30s", equipment: "Peso corporal",
        steps: [
          "Quatro apoios: joelhos sob quadris, pulsos sob ombros. Coluna neutra.",
          "Ative o core antes de mover — imagine levar um soco na barriga e contraia.",
          "Estenda o braço direito à frente + perna esquerda para trás simultaneamente, calcanhar empurrando a parede de trás.",
          "PAUSA 3 segundos: o quadril deve estar completamente NIVELADO — não deixe o lado da perna levantada cair.",
          "Retorne e repita no mesmo lado. Depois troque.",
        ],
        feel: "Deve sentir: glúteo da perna levantada, lombar estabilizando, ombro oposto. O tremido é sinal de ativação correta.",
        errors: "Rotacionar o quadril para abrir espaço. O quadril fica paralelo ao chão — sempre.",
        muscles: "Multífidos, transverso abdominal, glúteo máximo, deltóide, romboides, eretores",
        mtb: "Quando a bicicleta 'salta', seu core absorve sem transmitir para a lombar.",
        progression: { "1–2": "3s pausa, 8 reps/lado", "3–4": "Pausa + puxar cotovelo ao joelho no meio", "5–6": "Com elástico no tornozelo", "7–8": "Bird Dog Row com halter leve" },
      },
      {
        name: "Hollow Body Hold (Posição Hollow)", sets: "3 × 30–45 segundos", rest: "45s", equipment: "Peso corporal",
        steps: [
          "Deite de costas. Primeiro: pressione a lombar contra o chão — esse contato NUNCA pode ser perdido.",
          "Eleve os ombros do chão (como um crunch parcial) e estenda os braços acima da cabeça.",
          "Eleve as pernas a 30–45 cm. Quanto mais baixo, mais difícil. Se a lombar levantar, eleve mais as pernas.",
          "Mantenha respirando normalmente. O corpo forma uma 'banana côncava' — barriga pressionada para dentro.",
        ],
        feel: "Deve sentir: queimação intensa no centro do abdômen, tensão nos quadríceps e ombros. É normal tremer.",
        errors: "Lombar saindo do chão (reduza a dificuldade), prender a respiração, dobrar os joelhos.",
        muscles: "Transverso abdominal, reto abdominal, iliopsoas, quadríceps, serrátil anterior",
        mtb: "Posição idêntica à postura no MTB — core comprimido sustentando a bicicleta em descidas.",
        progression: { "1–2": "30s, pernas mais altas (~60cm)", "3–4": "40s, pernas a 45cm", "5–6": "45s, pernas a 30cm", "7–8": "60s ou dead bug hollow" },
      },
      {
        name: "Good Morning com Faixa Elástica", sets: "3 × 15 reps", rest: "45s", equipment: "Faixa elástica",
        steps: [
          "Passe a faixa atrás do pescoço/ombros e pise nas duas pontas. Pés na largura dos quadris.",
          "Mãos nas extremidades da faixa perto dos ombros para proteger o pescoço. Coluna neutra.",
          "Inspire, ative o core, e faça a dobradiça no quadril: empurre o quadril para trás enquanto inclina o tronco à frente.",
          "Desça até o tronco ficar quase paralelo ao chão — ou até onde a flexibilidade permitir com coluna neutra.",
          "Expire e ative os glúteos para retornar. O glúteo puxa o quadril, as costas não 'levantam'.",
        ],
        feel: "Deve sentir: forte tensão nos isquiotibiais na descida. Glúteos e lombar na subida.",
        errors: "Arredondar a lombar ou dobrar os joelhos demais. Reduza a amplitude se acontecer.",
        muscles: "Isquiotibiais, glúteo máximo, eretores, lombar",
        mtb: "Simula a posição inclinada do ciclista — treina a resistência postural da lombar em pedaladas longas.",
        progression: { "1–2": "Faixa leve, 12 reps, amplitude reduzida", "3–4": "Faixa média, 15 reps, completo", "5–6": "Faixa média-forte, 3s excêntrico", "7–8": "Faixa forte, 15 reps + 5 reps com pausa 3s" },
      },
      {
        name: "Pallof Press — Anti-Rotação", sets: "3 × 12 reps/lado", rest: "30s", equipment: "Faixa elástica ancorada",
        steps: [
          "Ancore a faixa na altura do peito. Fique de lado à âncora, mãos juntas com a faixa na altura do peito.",
          "Afaste-se até sentir tensão moderada. Pés na largura dos ombros, joelhos levemente flexionados.",
          "Sinta a faixa tentando te girar para o lado — RESISTA. Isso é a essência do exercício.",
          "Estenda os braços lentamente à frente — não rotacione o tronco. Segure 2 segundos.",
          "Retorne com controle. Cada repetição é lenta e controlada.",
        ],
        feel: "Deve sentir: trabalho intenso nos oblíquos e na lateral do core. Também o glúteo médio estabilizando.",
        errors: "Compensar com o ombro ou deixar o quadril girar. Peito sempre apontado para frente.",
        muscles: "Oblíquos internos e externos, transverso abdominal, glúteo médio",
        mtb: "Anti-rotação mantém o tronco estável enquanto os braços trabalham no guidão em terreno técnico.",
        progression: { "1–2": "Faixa leve, perto da âncora, 10 reps", "3–4": "Faixa média, 12 reps", "5–6": "12 reps + passo lateral segurando", "7–8": "Faixa forte + agachamento em cada extensão" },
      },
      {
        name: "Superman Alternado com Pausa", sets: "3 × 12 reps/lado", rest: "30s", equipment: "Peso corporal",
        steps: [
          "Deite de barriga para baixo, braços esticados acima da cabeça, pernas estendidas. Testa apoiada no chão.",
          "Ative os glúteos e o core — encolha o umbigo em direção à coluna.",
          "Levante o braço direito e a perna esquerda simultaneamente — máximo 15–20cm do chão.",
          "Segure 2 segundos com respiração normal. Volte e troque o lado.",
          "Pescoço em posição neutra — olhar para o chão, não levante a cabeça.",
        ],
        feel: "Deve sentir: contração na lombar, glúteo (perna levantada) e trapézio/ombro (braço levantado).",
        errors: "Levantar muito (compressão lombar), rotacionar o quadril, levantar a cabeça.",
        muscles: "Eretores da espinha, glúteo máximo, romboide, trapézio médio e inferior, deltóide posterior",
        mtb: "Lombar resistente é essencial para absorver solavancos sem dores pós-prova.",
        progression: { "1–2": "Sem pausa, 10 reps/lado", "3–4": "2s pausa, 12 reps/lado", "5–6": "3s pausa + leve torção diagonal", "7–8": "Com halteres leves, 12 reps/lado" },
      },
    ],
    cooldown: [
      { name: "Pigeon Pose (Pombo)", duration: "60s por lado", steps: ["Do quadrupede, traga o joelho direito para frente em diagonal.", "Estenda a perna esquerda para trás completamente.", "Caminhe as mãos para frente e incline o tronco, aprofundando. Testa pode tocar o chão.", "Respire profundamente — a cada expiração, afunde mais."], feel: "Profundo no glúteo e piriforme. Se sentir no joelho, ajuste o ângulo da canela.", muscles: "Piriforme, rotadores externos do quadril, glúteo médio, TFL" },
      { name: "Alongamento de Isquiotibiais em Pé", duration: "45s por lado", steps: ["Apoie o calcanhar numa superfície elevada, joelho estendido.", "Mantendo coluna reta, incline o tronco à frente.", "Puxe levemente a ponta do pé em sua direção para intensificar."], feel: "Tensão forte na parte de trás da coxa.", muscles: "Isquiotibiais, panturrilha" },
      { name: "Child's Pose com Rotação Lateral", duration: "30s por lado", steps: ["Posição do bebê: joelhos afastados, bumbum nos calcanhares, braços esticados.", "Deslize o braço direito por baixo do corpo para a esquerda, rotacionando o tronco.", "O ombro direito toca o chão. Respire e relaxe."], feel: "Abertura lateral das costas, torácica e lombar relaxando.", muscles: "Latíssimo do dorso, eretores torácicos, lombar, serrátil" },
      { name: "Respiração Diafragmática — Recuperação", duration: "2–3 minutos", steps: ["Deite de costas, joelhos dobrados. Mão no peito, outra no abdômen.", "Inspire pelo nariz 4s: abdômen sobe primeiro, depois o peito.", "Expire pelo nariz 6s: abdômen desce, peito desce. A mão do peito se move pouco."], feel: "Ritmo cardíaco desacelerando, tensão muscular aliviando, mente acalmando.", muscles: "Diafragma, sistema nervoso parassimpático" },
    ],
  },
  {
    id: "B", icon: "🔥", color: "#f97316",
    name: "TREINO B",
    focus: "Glúteos · Quadríceps · Equilíbrio · Propriocepção",
    duration: "50–60 min",
    mtbLink: "Descidas técnicas, curvas, controle de joelho, terrenos acidentados",
    warmup: [
      {
        name: "World's Greatest Stretch", sets: "5 reps por lado", equipment: "Peso corporal",
        steps: ["Passo grande à frente com pé direito (afundo). Mão direita no chão ao lado do pé.", "Gire o tronco para a esquerda levantando o braço esquerdo ao teto. Siga a mão com o olhar.", "Retorne a mão ao chão. Estique o joelho traseiro empurrando o calcanhar no chão.", "Volte e repita no lado oposto."],
        feel: "Abertura de quadril (adutores), rotação nas costas, panturrilha.", errors: "Mão longe do pé dificulta a rotação. Mão bem perto.", muscles: "Adutores, flexores do quadril, torácica, panturrilha, ombros", mtb: "Prepara toda a cadeia cinemática de uma só vez.",
      },
      {
        name: "Lateral Band Walk (Caminhada Lateral com Faixa)", sets: "2 × 15 passos/lado", equipment: "Faixa elástica abaixo dos joelhos",
        steps: ["Faixa abaixo dos joelhos, pés paralelos levemente afastados.", "Entre em semi-agachamento (20–30°). MANTENHA esta posição durante todo o exercício.", "Passo lateral com pé direito, afaste o suficiente para manter tensão na faixa.", "Traga o pé esquerdo à posição inicial. Não deixe os pés se juntarem.", "Joelhos NÃO dobram para dentro — apontam na direção dos pés."],
        feel: "Queimação rápida no glúteo médio (lateral do quadril). Se não sentir, abra mais os passos.", errors: "Joelhos caindo para dentro, subir do agachamento entre passos.", muscles: "Glúteo médio (foco), glúteo mínimo, TFL, abdutores", mtb: "Glúteo médio fraco = joelho colapsa nas curvas e descidas.",
      },
      {
        name: "Leg Swing — Frontal e Lateral", sets: "10 reps/direção/perna", equipment: "Apoio na parede",
        steps: ["FRONTAL: mão na parede, balance a perna livre frente-trás como pêndulo. Amplitude crescente.", "LATERAL: frente para a parede, balance a perna para o lado e cruzando na frente.", "O tronco não rotaciona — movimento 100% do quadril.", "Pé em dorsiflexão (puxado para cima) durante os swings."],
        feel: "Liberação progressiva na virilha, glúteo e lateral do quadril.", errors: "Balançar o tronco junto com a perna. Mantenha o core levemente ativado.", muscles: "Flexores, extensores, abdutores e adutores do quadril", mtb: "Mobilidade dinâmica do quadril melhora eficiência do pedal e liberdade nas curvas.",
      },
      {
        name: "Agachamento de Ativação (Lento)", sets: "2 × 8 reps (3s desce / 2s pausa / sobe)", equipment: "Peso corporal",
        steps: ["Pés na largura dos ombros, dedos 15–30° para fora.", "Desça em 3 segundos, peito erguido, joelhos apontando na direção dos pés.", "Pause 2 segundos no fundo. Suba de forma firme.", "Cheque: o calcanhar fica no chão durante todo o movimento?"],
        feel: "Ativação simétrica nos dois quadríceps, glúteos ao subir.", errors: "Joelhos colabando, calcanhar saindo do chão, inclinação excessiva do tronco.", muscles: "Quadríceps, glúteo máximo, isquiotibiais, core", mtb: "Ativa os extensores do joelho que trabalham em cada pedalada.",
      },
    ],
    main: [
      {
        name: "Agachamento Búlgaro (Rear Foot Elevated Split Squat)", sets: "3 × 10 reps/lado", rest: "45s", equipment: "Halteres opcional + banco",
        steps: ["Peito do pé traseiro numa superfície elevada (~40–50cm). Pé da frente avança o suficiente para o joelho não passar além do dedão.", "Segure halteres ao lado do corpo ou mãos na cintura (sem peso na fase inicial).", "Incline levemente o tronco à frente — ~15°. Isso ativa mais o glúteo.", "Desça controlado: joelho traseiro desce em direção ao chão sem tocar. Joelho da frente acompanha o dedão.", "Suba empurrando o calcanhar da frente. O glúteo é o motor — não use impulso da perna de trás."],
        feel: "Glúteo e quadríceps da perna da frente. Estiramento no flexor do quadril da perna de trás. Se sentir mais na perna de trás, avance mais o pé da frente.", errors: "Pé da frente muito perto, torso excessivamente ereto, apoiar peso na perna de trás.", muscles: "Quadríceps (foco), glúteo máximo, isquiotibiais, core, flexores do quadril", mtb: "Força unilateral de perna é a base das subidas técnicas — cada pedalada é unilateral.",
        progression: { "1–2": "Sem peso, 8 reps, superfície baixa", "3–4": "Halteres leves, 10 reps", "5–6": "Halteres moderados, 10 reps, 3s excêntrico", "7–8": "3-4s excêntrico + 1s pausa no fundo, 12 reps" },
      },
      {
        name: "Step Up com Pausa de 2 Segundos", sets: "3 × 12 reps/lado", rest: "45s", equipment: "Caixa 40–50cm, halteres opcional",
        steps: ["Um pé completamente sobre a caixa. O pé de baixo fica relaxado — NÃO dá impulso.", "Empurre o calcanhar de cima no box para subir — glúteo e quadríceps trabalhando.", "No topo: PAUSE 2 segundos numa perna só, joelho levemente flexionado, quadril nivelado.", "Desça LENTAMENTE em 3 segundos — não se jogue para baixo.", "Toque o pé de baixo levemente e suba de novo sem transferir peso."],
        feel: "Glúteo e quadríceps da perna em cima. A pausa no topo desafia o equilíbrio — é isso que ativa os estabilizadores.", errors: "Usar o pé de baixo para impulsionar é o erro mais comum. Caixa muito alta ou carga muito pesada causam isso.", muscles: "Quadríceps (vastus medialis), glúteo máximo, estabilizadores de tornozelo, core", mtb: "Replica o padrão unilateral do pedal em subidas — o 'destravar o joelho' de cada pedalada.",
        progression: { "1–2": "Caixa baixa (30cm), sem peso, 10 reps", "3–4": "Caixa 40cm, sem peso, 12 reps, 2s pausa", "5–6": "Caixa 40cm, halteres leves, 12 reps", "7–8": "Caixa 50cm, halteres moderados, 3s excêntrico" },
      },
      {
        name: "Single Leg Deadlift (Levantamento Unipodal)", sets: "3 × 10 reps/lado", rest: "45s", equipment: "Halter ou kettlebell",
        steps: ["Em pé com peso na mão direita. Apoio na perna esquerda.", "Tronco e perna direita formam UMA linha reta. Ao inclinar o tronco, a perna sobe atrás na mesma proporção.", "O quadril da perna levantada NÃO pode abrir para o lado — permanece paralelo ao chão.", "Desça o peso rente à perna de apoio, toque levemente o chão ou até onde a técnica permitir.", "Suba ativando o glúteo e puxando o quadril para frente. Pé de apoio pressionado no chão em todas as direções."],
        feel: "Isquiotibiais e glúteo da perna de apoio. Dificuldade de equilíbrio é normal e desejada.", errors: "Rotacionar o quadril para abrir (perna vai para o lado ao invés de atrás). Foco nos quadris nivelados.", muscles: "Isquiotibiais, glúteo máximo, glúteo médio, eretores, tibial anterior, fibulares", mtb: "Equilíbrio sobre um ponto é o que acontece em cada pedalada — e ao 'pescar' a bicicleta em terrenos soltos.",
        progression: { "1–2": "Sem peso, mão na parede se necessário, 8 reps", "3–4": "Halter leve, sem apoio, 10 reps", "5–6": "Halter moderado, 10 reps, 2s pausa", "7–8": "Halter moderado, 12 reps, 3s excêntrico" },
      },
      {
        name: "Lateral Lunge com Toque no Chão", sets: "3 × 10 reps/lado", rest: "30s", equipment: "Peso corporal (halter opcional)",
        steps: ["Em pé. Afunde com o pé direito para o lado, pé esquerdo fixo e joelho esquerdo estendido.", "Dobre o joelho direito e empurre o quadril para trás — como um agachamento lateral.", "Toque as mãos no chão ao lado do pé direito. Peito erguido, não arredonde.", "Empurre o calcanhar direito no chão para voltar.", "A perna estendida deve sentir um forte alongamento na virilha."],
        feel: "Virilha e adutor da perna estendida. Glúteo e quadríceps da perna que afundou.", errors: "Joelho da perna que afunda indo para dentro, não empurrar o quadril para trás.", muscles: "Adutores (perna estendida), quadríceps (perna que afunda), glúteo máximo e médio, core", mtb: "Adutores são críticos para inclinar a bicicleta nas curvas — muito negligenciados por ciclistas.",
        progression: { "1–2": "Sem peso, amplitude reduzida, 8 reps", "3–4": "Amplitude completa, toque no chão, 10 reps", "5–6": "Halter Goblet à frente, 10 reps", "7–8": "Halter + 2s pausa no fundo, 12 reps" },
      },
      {
        name: "Equilíbrio Unipodal no Bosu", sets: "3 × 35–45s por perna", rest: "30s", equipment: "Bosu ball",
        steps: ["INICIAL: Bosu com lado plano para CIMA (mais estável). Um pé no centro.", "AVANÇADO (sem 3–4+): Bosu com lado abaulado para CIMA (mais instável).", "Suba e encontre o equilíbrio — dedos se agarram, tornozelo faz ajustes. Normal e desejado.", "Joelho de apoio levemente flexionado (nunca travado). Quadril nivelado.", "PROGRESSÕES dentro da série: olhos abertos → fechados → head turns → braços se movendo."],
        feel: "Trabalho intenso no tornozelo, panturrilha e musculatura lateral da perna. O tremido é o sistema nervoso aprendendo.", errors: "Travar o joelho, segurar a respiração, ficar rígido.", muscles: "Tibial anterior, fibulares, tríceps sural, glúteo médio, core — sistema proprioceptivo completo", mtb: "Propriocepção treinada = reação mais rápida quando a bicicleta 'escapa' em pedras ou areia.",
        progression: { "1–2": "Lado plano, olhos abertos, 25s", "3–4": "Lado abaulado, olhos abertos, 35s", "5–6": "Olhos fechados, 40s", "7–8": "Olhos fechados + head turns, 45s" },
      },
      {
        name: "Skater Squat (Agachamento Patinador)", sets: "3 × 8 reps/lado", rest: "45s", equipment: "Peso corporal (faixa para auxílio inicial)",
        steps: ["Em pé numa perna. Perna livre para trás, joelho dobrado.", "Incline o tronco levemente à frente — como na posição de descida no MTB: peito para baixo, quadril para trás.", "Desça: joelho traseiro desce em direção ao chão. Toque LEVEMENTE (ou passe perto sem tocar).", "Joelho da frente NÃO vai para dentro — aponta para o 2° dedo do pé.", "Empurre o calcanhar no chão para subir. Tronco permanece inclinado."],
        feel: "Quadríceps em chamas, glúteo forte, desafio de equilíbrio intenso.", errors: "Joelho colabando para dentro — o erro mais crítico. Pare e corrija imediatamente.", muscles: "Quadríceps (foco), glúteo máximo, isquiotibiais, core, estabilizadores do tornozelo", mtb: "O exercício que mais se assemelha à posição de descida técnica no MTB — quadril atrás, tronco inclinado, joelho controlado.",
        progression: { "1–2": "Com apoio faixa/parede, amplitude reduzida, 5 reps", "3–4": "Sem apoio, amplitude média, 8 reps", "5–6": "Amplitude completa, 2s pausa no fundo", "7–8": "Amplitude completa + halter leve, 10 reps" },
      },
    ],
    cooldown: [
      { name: "Couch Stretch (Flexor do Quadril)", duration: "60s por lado", steps: ["Joelho direito no chão próximo à parede. Peito do pé na parede.", "Avance pé esquerdo à frente — joelho esquerdo em 90°.", "Aperte o glúteo direito e empurre o quadril levemente para frente. Tronco ereto."], feel: "Estiramento profundo na frente do quadril e na coxa. Um dos mais importantes para ciclistas.", muscles: "Iliopsoas, reto femoral, flexores do quadril" },
      { name: "Adductor Rockback", duration: "2 × 10 reps lentas/lado", steps: ["Em quatro apoios, afaste o joelho direito bem para o lado (quase no chão).", "Balance o quadril para trás em direção ao pé de apoio — sentindo o estiramento aumentar na virilha.", "Retorne sem pressa."], feel: "Estiramento progressivo na virilha e adutor interno. A gravidade faz o trabalho.", muscles: "Adutores (magno, longo, curto), pectíneo, grácil" },
      { name: "Standing Calf Stretch — 2 Posições", duration: "45s cada posição/perna", steps: ["P1 (Gastrocnêmio): antepé na parede, calcanhar no chão, joelho ESTENDIDO.", "P2 (Sóleo): mesma posição, mas DOBRE o joelho. Muda completamente o músculo.", "Ambas as posições são necessárias para um alongamento completo."], feel: "P1: alto na panturrilha. P2: mais profundo, perto do tendão de Aquiles.", muscles: "Gastrocnêmio (P1), sóleo (P2), tendão de Aquiles" },
      { name: "Box Breathing — Controle Autonômico", duration: "2–3 minutos (8–10 ciclos)", steps: ["Inspire pelo nariz: 4s. Segure: 4s. Expire pelo nariz: 4s. Segure vazio: 4s.", "Cada lado do 'quadrado' dura 4 segundos.", "Ideal também antes de competições para controlar ansiedade e ritmo cardíaco."], feel: "Sistema nervoso desacelerando, mente mais quieta. Após 3–4 ciclos a frequência cardíaca já cai.", muscles: "Sistema nervoso autônomo, diafragma, parassimpático" },
    ],
  },
  {
    id: "C", icon: "🏔️", color: "#c084fc",
    name: "TREINO C",
    focus: "Ombros · Cintura Escapular · Panturrilhas · Integração Total",
    duration: "45–55 min",
    mtbLink: "Controle de guidão, absorção de impacto, estabilidade técnica, resistência de panturrilha",
    warmup: [
      {
        name: "Shoulder CARs (Rotações Articulares Controladas)", sets: "5 reps/sentido/ombro", equipment: "Peso corporal",
        steps: ["Em pé ou sentado. Um braço ao lado do corpo, o outro realiza o movimento.", "Levante o braço à frente, leve até acima da cabeça, para trás e abaixo — círculo completo.", "CRUCIAL: movimento ATIVO — use os músculos do ombro para guiar, resistindo à gravidade.", "No ponto mais difícil (geralmente atrás e abaixo), não compense com o tronco.", "Devagar: cada círculo leva 8–10 segundos."],
        feel: "O ombro trabalhando em toda a amplitude. Onde há esforço, há fraqueza — é informação útil.", errors: "Fazer rápido, compensar com o tronco, encolher o ombro.", muscles: "Deltóide (3 cabeças), manguito rotador, serrátil anterior", mtb: "Ombros com mobilidade ativa controlada absorvem os impactos do guidão sem lesões.",
      },
      {
        name: "Band Pull Apart (Faixa Elástica)", sets: "3 × 15 reps", equipment: "Faixa elástica leve",
        steps: ["Segure a faixa com as duas mãos na largura dos ombros, cotovelos levemente dobrados, palmas para baixo.", "Braços esticados à frente na altura dos ombros.", "Afaste as mãos horizontalmente abrindo completamente o peito — como se tentasse partir a faixa.", "No ponto máximo, aperte as escápulas uma contra a outra. Segure 1 segundo.", "Retorne lentamente."],
        feel: "Contração no meio das costas (entre as escápulas). Se sentir no pescoço, abaixe os ombros.", errors: "Elevar os ombros para as orelhas, abrir os cotovelos demais, fazer rápido.", muscles: "Trapézio médio e inferior, romboide, deltóide posterior, infraespinal", mtb: "Retrátores escapulares mantêm a postura correta no guidão por horas.",
      },
      {
        name: "Calf Raises Lentos na Borda do Degrau", sets: "2 × 12 reps (3s sobe / 1s pausa / 3s desce)", equipment: "Degrau ou borda",
        steps: ["Apoie a meia ponta dos pés na borda. Calcanhares no ar.", "Desça os calcanhares ABAIXO do nível do degrau — amplitude completa.", "Suba lentamente em 3 segundos até a ponta máxima. Segure 1 segundo.", "Desça em 3 segundos — não deixe cair. Comece com amplitude reduzida para aquecer o Aquiles."],
        feel: "Grande estiramento na panturrilha na descida, forte contração no topo.", errors: "Apoiar o peso nos dedos, não ir abaixo do nível.", muscles: "Gastrocnêmio, sóleo, tendão de Aquiles", mtb: "Panturrilha resistente previne cãibras em provas longas.",
      },
      {
        name: "Inchworm com Push-Up", sets: "5 reps", equipment: "Peso corporal",
        steps: ["Em pé, flexione o tronco e apoie as mãos no chão.", "Caminhe com as mãos até a posição de prancha (corpo reto).", "Faça 1 push-up controlado.", "Caminhe os pés em direção às mãos (joelhos podem dobrar levemente).", "Suba de volta à posição em pé."],
        feel: "Isquiotibiais ao caminhar os pés, ombros e peitoral no push-up, core na prancha.", errors: "Quadril caindo na prancha, push-up sem o corpo alinhado.", muscles: "Isquiotibiais, ombros, peitoral, serrátil, core", mtb: "Integração de cadeia cinética completa.",
      },
    ],
    main: [
      {
        name: "Face Pull com Faixa Elástica", sets: "3 × 15 reps", rest: "30s", equipment: "Faixa elástica ancorada na altura dos olhos",
        steps: ["Ancore a faixa na altura dos olhos. Segure com as duas mãos, polegares para trás, cotovelos ALTOS (acima dos ombros).", "Afaste-se até tensão moderada. Pés na largura dos ombros, core ativado.", "Puxe em direção ao rosto — cotovelos abrem para os lados e ficam na altura das orelhas.", "No ponto final: ROTAÇÃO EXTERNA — leve as mãos para trás das orelhas, como o número '21' com os braços.", "Segure 2 segundos e retorne LENTAMENTE."],
        feel: "Ombro posterior, trapézio médio, sensação de 'abrir' o peito. Se sentir no pescoço, abaixe os cotovelos.", errors: "Cotovelos abaixo dos ombros, não fazer a rotação externa final, voltar rápido.", muscles: "Deltóide posterior, trapézio médio e inferior, romboide, infraespinal, redondo menor", mtb: "Previne a síndrome do ombro arredondado e mantém postura no guidão.",
        progression: { "1–2": "Faixa leve, 12 reps, foco na técnica", "3–4": "Faixa média, 15 reps, 2s contração", "5–6": "Faixa média, 15 reps, 3s excêntrico", "7–8": "Faixa média-forte, 15 reps + 5 isotônicas" },
      },
      {
        name: "Plank com Thread the Needle (Rotação Torácica)", sets: "3 × 10 reps/lado", rest: "30s", equipment: "Peso corporal",
        steps: ["Prancha lateral: antebraço no chão, corpo alinhado, quadril levantado. Braço livre aponta para o teto.", "Ative o core — quadril não pode cair durante o movimento.", "Leve o braço livre por BAIXO do tronco, passando pelo espaço entre o chão e o corpo.", "Siga o braço com o olhar. O ombro de baixo quase toca o chão.", "Retorne abrindo o braço para o teto. Quadril nivelado o tempo todo."],
        feel: "Oblíquo (lateral do abdômen), abertura da torácica, ombro de baixo estabilizando intensamente.", errors: "Quadril que afunda ou sobe, rotação insuficiente, apoio no pé incorreto.", muscles: "Oblíquos, serrátil anterior, rotadores torácicos, deltóide, glúteo médio", mtb: "Rotacionar o tronco independente do quadril é a chave das curvas técnicas.",
        progression: { "1–2": "Plank lateral estático, 30s/lado (sem rotação)", "3–4": "Thread the needle, amplitude reduzida, 8 reps", "5–6": "Amplitude completa, 10 reps", "7–8": "Thread + abrir o braço acima da cabeça no final" },
      },
      {
        name: "Single Arm Row com Faixa Elástica", sets: "3 × 12 reps/lado", rest: "30s", equipment: "Faixa elástica ancorada na altura do quadril",
        steps: ["Faixa ancorada à frente na altura do quadril. De frente, segure com mão direita.", "Afaste-se até sentir tensão.", "PRIMEIRO: retrate a escápula (puxe o ombro para trás e para baixo) ANTES de dobrar o cotovelo.", "Puxe o cotovelo para trás em direção ao quadril — não para a axila.", "O tronco NÃO rotaciona. O ombro de suporte trabalha isometricamente."],
        feel: "Latíssimo (músculo lateral grande das costas), romboide, bíceps. Se o pescoço cansa, você está elevando o ombro.", errors: "Rotacionar o tronco para ajudar, usar o bíceps ao invés de iniciar pela escápula.", muscles: "Latíssimo do dorso, romboide, trapézio médio, bíceps, core anti-rotação", mtb: "Cada puxada no guidão em subidas usa exatamente este padrão.",
        progression: { "1–2": "Faixa leve, sentado, 10 reps", "3–4": "Em pé, faixa leve-média, 12 reps", "5–6": "Em pé, faixa média, 2s pausa", "7–8": "Levemente inclinado (mais funcional ao MTB)" },
      },
      {
        name: "Calf Raise Unipodal Excêntrico na Borda", sets: "3 × 15 reps/lado", rest: "30s", equipment: "Degrau ou borda",
        steps: ["Apoie a meia ponta do pé de apoio na borda. Pé livre no ar.", "SUBA com os dois pés para a posição alta.", "DESÇA em 3 segundos com UM pé só — a fase excêntrica lenta é o foco.", "Calcanhares abaixo do nível da borda na descida (amplitude máxima).", "Use apoio na parede para equilíbrio se necessário — não comprometa a técnica."],
        feel: "Estiramento profundo na panturrilha na descida. Queimação progressiva após 8–10 reps.", errors: "Descer rápido (perde o benefício excêntrico), não ir abaixo do nível, ficar na ponta dos dedos.", muscles: "Gastrocnêmio, sóleo, tendão de Aquiles, fibulares", mtb: "Panturrilha forte = estabilidade no pedal, prevenção de cãibra e apoio nas descidas técnicas.",
        progression: { "1–2": "Com dois pés, 15 reps, 3s excêntrico", "3–4": "Unipodal, 12 reps, 3s excêntrico", "5–6": "Unipodal, 15 reps, 3s excêntrico", "7–8": "Unipodal, 15 reps, 4s + 1s pausa no fundo" },
      },
      {
        name: "T Push-Up (Flexão com Rotação)", sets: "3 × 8 reps/lado", rest: "45s", equipment: "Peso corporal (halteres opcional avançado)",
        steps: ["Prancha alta (braços estendidos). Mãos levemente mais abertas que os ombros.", "Desça fazendo um push-up completo — peito quase toca o chão, cotovelos a 45° do corpo.", "Ao subir, transfira o peso para a mão esquerda e rotacione — braço direito vai para o teto.", "O corpo forma um 'T'. Quadril não cai — corpo alinhado.", "Retorne ao centro, repita. Na próxima subida, rotacione para o lado oposto."],
        feel: "Peitoral e tríceps no push-up. Serrátil e oblíquos durante a rotação. Ombro de apoio estabilizando intensamente.", errors: "Quadril caindo durante a rotação, cotovelos muito abertos, não completar a rotação.", muscles: "Peitoral, tríceps, serrátil anterior, deltóide, oblíquos, core anti-rotação", mtb: "Força de empurrar + estabilidade de ombro = absorção de impacto no guidão em terrenos técnicos.",
        progression: { "1–2": "Push-up nos joelhos, sem rotação", "3–4": "Push-up completo + rotação parcial, 6 reps/lado", "5–6": "Rotação completa, 8 reps/lado", "7–8": "Halteres nas mãos (instabilidade extra)" },
      },
      {
        name: "Turkish Get-Up — TGU", sets: "2 × 3 reps/lado", rest: "60s", equipment: "Kettlebell leve ou halter (ou sem peso para aprender)",
        steps: ["FASE 1 — ROLAR: Deite com KB acima do ombro direito (sempre olhando para o KB). Perna direita dobrada. Role para o antebraço esquerdo.", "FASE 2 — SENTAR: Empurre o antebraço esquerdo no chão e sente completamente. Braço direito sempre esticado.", "FASE 3 — QUADRIL: Eleve o quadril apoiando na mão esquerda. Linha do chão ao KB.", "FASE 4 — JOELHO: Deslize a perna esquerda e coloque o joelho no chão — posição de afundo.", "FASE 5 — LEVANTAR: Fique em pé. Pause. Reverta toda a sequência com controle."],
        feel: "Ombro trabalhando em TODA a amplitude, core em todas as fases, integração total do corpo.", errors: "Perder o contato visual com o KB, apressar qualquer fase, carga alta antes de dominar sem peso.", muscles: "Ombro (360°), core completo, quadríceps, glúteos, estabilizadores do tornozelo, manguito rotador", mtb: "Integração de toda a cadeia cinética — usada ao recuperar o equilíbrio da bicicleta numa situação limite.",
        progression: { "1–2": "Sem peso, foco total em cada fase", "3–4": "Peso leve, até fase 4", "5–6": "Peso leve, sequência completa, 3 reps/lado", "7–8": "Peso moderado, sequência completa fluida" },
      },
    ],
    cooldown: [
      { name: "Doorway Chest Stretch (Porta)", duration: "45s por lado", steps: ["Antebraço vertical no batente da porta (cotovelo a 90°).", "Avance um passo — o tronco rotaciona para o lado oposto.", "DOIS ÂNGULOS: braço a 90° (peitoral médio), braço acima da cabeça (peitoral inferior)."], feel: "Abertura do peito, estiramento no peitoral e deltóide anterior.", muscles: "Peitoral maior e menor, deltóide anterior, bíceps" },
      { name: "Thoracic Extension no Rolo de Espuma", duration: "2–3 minutos", steps: ["Rolo horizontalmente no meio das costas (torácica, não lombar).", "Mãos entrelaçadas atrás da nuca. Joelhos dobrados, pés no chão.", "Deixe as costas se dobrarem sobre o rolo — respire fundo e relaxe na expiração.", "Mova o rolo por diferentes segmentos da torácica."], feel: "Abertura e extensão das costas. Pode fazer 'estalar' — é normal.", muscles: "Coluna torácica, romboides, peitoral (alongamento), intercostais" },
      { name: "Neck Release — Lateral com Respiração", duration: "3 respirações/lado", steps: ["Incline a cabeça para o lado direito (orelha ao ombro).", "Coloque a mão direita levemente sobre a cabeça — só o peso da mão, sem forçar.", "Inspire expandindo o lado esquerdo do pescoço. Expire afundando mais.", "3 respirações completas, depois troque de lado."], feel: "Estiramento suave na lateral do pescoço. Cervicais rígidas são muito comuns em ciclistas.", muscles: "Escalenos, esternocleidomastoideo, trapézio superior, levantador da escápula" },
      { name: "4-7-8 Respiração — Recuperação Avançada", duration: "4 ciclos completos", steps: ["Inspire pelo nariz: 4 segundos.", "Segure o ar: 7 segundos.", "Expire pela boca (lábios em 'O'): 8 segundos.", "Ativa o parassimpático mais profundamente que o box breathing. Ideal pós-competição."], feel: "Leve tontura nos primeiros ciclos (normal). Após 4 ciclos, calma profunda.", muscles: "Diafragma, sistema nervoso parassimpático, recuperação do SNC" },
    ],
  },
];

const PROGRESSION_DATA = [
  { weeks: "1–2", phase: "ADAPTAÇÃO", color: "#4ade80", series: "2–3", repsTime: "10–12 / 30s", rest: "60–75s", load: "Leve", goal: "Aprender a técnica correta de cada exercício. Não importa a carga — importa a execução perfeita." },
  { weeks: "3–4", phase: "DESENVOLVIMENTO", color: "#facc15", series: "3", repsTime: "12–15 / 40s", rest: "45–60s", load: "Leve-Moderada", goal: "Aumentar o volume. Inserir superfícies instáveis. Manter qualidade técnica com um pouco mais de esforço." },
  { weeks: "5–6", phase: "INTENSIFICAÇÃO", color: "#f97316", series: "3–4", repsTime: "15–20 / 45–60s", rest: "30–45s", load: "Moderada", goal: "Reduzir descanso e aumentar volume. Inserir excêntrico (3s) nos principais exercícios." },
  { weeks: "7–8", phase: "CONSOLIDAÇÃO", color: "#c084fc", series: "3–4", repsTime: "15–20 / 60s", rest: "30s", load: "Moderada-Alta", goal: "Integração neuromuscular. Máxima qualidade de execução com o maior volume do programa." },
];

// ─── Exercise Card ─────────────────────────────────────────────────────────────
function ExerciseCard({ ex, color, index }) {
  const [open, setOpen] = useState(false);
  const hasVideo = !!VIDEOS[ex.name];

  return (
    <div style={{ background: open ? "#0d0d18" : "#0a0a14", border: `1px solid ${open ? color + "55" : "#ffffff0d"}`, borderRadius: 12, overflow: "hidden", transition: "all 0.2s" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "14px 18px", display: "flex", alignItems: "center", gap: 14, background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${color}22`, border: `1px solid ${color}55`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, color }}>{index + 1}</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff" }}>{ex.name}</div>
          <div style={{ fontSize: 11, color: "#555", marginTop: 2, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            {ex.sets && <span style={{ color }}>{ex.sets}</span>}
            {ex.rest && <span>↩ {ex.rest}</span>}
            {ex.duration && <span style={{ color }}>{ex.duration}</span>}
            {hasVideo && <span style={{ color: "#ff6666", fontSize: 10, fontWeight: 700 }}>▶ TUTORIAL</span>}
          </div>
        </div>
        <div style={{ color: open ? color : "#444", fontSize: 20, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>⌄</div>
      </button>

      {open && (
        <div style={{ padding: "0 18px 18px", borderTop: `1px solid ${color}22` }}>
          {/* VIDEO BUTTON */}
          <div style={{ marginTop: 14 }}>
            <VideoButton name={ex.name} color={color} />
          </div>

          {ex.equipment && (
            <div style={{ display: "inline-block", background: "#ffffff08", borderRadius: 20, padding: "4px 12px", fontSize: 11, color: "#888", marginBottom: 14 }}>
              🎯 {ex.equipment}
            </div>
          )}

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: "#555", fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 10 }}>EXECUÇÃO PASSO A PASSO</div>
            {ex.steps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 8, alignItems: "flex-start" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: `${color}20`, border: `1px solid ${color}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <span style={{ fontSize: 10, color, fontWeight: 700 }}>{i + 1}</span>
                </div>
                <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.6 }}>{step}</div>
              </div>
            ))}
          </div>

          {ex.feel && (
            <div style={{ background: `${color}12`, border: `1px solid ${color}33`, borderRadius: 8, padding: 12, marginBottom: 10 }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color, fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 6 }}>💪 ONDE DEVE SENTIR</div>
              <div style={{ fontSize: 13, color: "#e0e0e0", lineHeight: 1.6 }}>{ex.feel}</div>
            </div>
          )}

          {ex.errors && (
            <div style={{ background: "#ff444410", border: "1px solid #ff444433", borderRadius: 8, padding: 12, marginBottom: 10 }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#ff6666", fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 6 }}>⚠️ ERROS COMUNS</div>
              <div style={{ fontSize: 13, color: "#ffaaaa", lineHeight: 1.6 }}>{ex.errors}</div>
            </div>
          )}

          {ex.muscles && (
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#555", fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 6 }}>MÚSCULOS ENVOLVIDOS</div>
              <div style={{ fontSize: 12, color: "#888" }}>{ex.muscles}</div>
            </div>
          )}

          {ex.mtb && (
            <div style={{ background: "#ffffff06", borderRadius: 8, padding: 12, marginBottom: 10 }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#555", fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 6 }}>🚵 APLICAÇÃO NO MTB</div>
              <div style={{ fontSize: 12, color: "#aaa", lineHeight: 1.5 }}>{ex.mtb}</div>
            </div>
          )}

          {ex.progression && (
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#555", fontFamily: "'Barlow Condensed', sans-serif", marginBottom: 8 }}>PROGRESSÃO 8 SEMANAS</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 6 }}>
                {Object.entries(ex.progression).map(([wk, val], pi) => {
                  const pColors = ["#4ade8055", "#facc1555", "#f9731655", "#c084fc55"];
                  return (
                    <div key={pi} style={{ background: "#ffffff05", borderRadius: 6, padding: "8px 10px", borderLeft: `3px solid ${pColors[pi]}` }}>
                      <div style={{ fontSize: 9, color: "#555", letterSpacing: 1, marginBottom: 3 }}>SEM {wk}</div>
                      <div style={{ fontSize: 11, color: "#bbb" }}>{val}</div>
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
    { id: "main", label: "⚡ Parte Principal", count: t.main.length },
    { id: "cooldown", label: "🌙 Finalização", count: t.cooldown.length },
  ];
  const current = tab === "warmup" ? t.warmup : tab === "main" ? t.main : t.cooldown;
  return (
    <div>
      <div style={{ background: `linear-gradient(135deg, ${t.color}15 0%, #0a0a1480 60%)`, border: `1px solid ${t.color}33`, borderRadius: 16, padding: 24, marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10 }}>
          <span style={{ fontSize: 44 }}>{t.icon}</span>
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: t.color, letterSpacing: 4 }}>{t.name}</div>
            <div style={{ fontSize: 13, color: "#aaa", marginTop: 2 }}>{t.focus}</div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: "#666" }}>⏱ {t.duration} &nbsp;·&nbsp; 🚵 {t.mtbLink}</div>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
        {tabs.map(tb => (
          <button key={tb.id} onClick={() => setTab(tb.id)} style={{ padding: "10px 18px", borderRadius: 40, border: `1px solid ${tab === tb.id ? t.color + "88" : "#ffffff15"}`, background: tab === tb.id ? `${t.color}18` : "#ffffff06", color: tab === tb.id ? t.color : "#666", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
            {tb.label} <span style={{ opacity: 0.6 }}>({tb.count})</span>
          </button>
        ))}
      </div>
      <div style={{ background: "#ffffff05", borderRadius: 8, padding: "8px 14px", fontSize: 12, color: "#555", marginBottom: 14 }}>
        {tab === "warmup" && "Mobilidade Dinâmica + Ativação — 5 a 10 minutos"}
        {tab === "main" && "Circuito Funcional — Clique em cada exercício para ver execução completa e abrir o tutorial em vídeo"}
        {tab === "cooldown" && "Mobilidade + Alongamento + Respiração — 8 a 12 minutos"}
      </div>
      <div style={{ display: "grid", gap: 10 }}>
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
      <div style={{ background: "linear-gradient(180deg,#0d0d1e 0%,#080810 100%)", borderBottom: "1px solid #ffffff0a", padding: "36px 24px 28px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px,7vw,64px)", letterSpacing: 6, color: "#fff", lineHeight: 1 }}>PROGRAMA FUNCIONAL MTB</div>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(12px,3vw,18px)", letterSpacing: 4, color: "#4ade80", marginTop: 6 }}>PERFORMANCE & LONGEVIDADE ESPORTIVA</div>
        <div style={{ fontSize: 11, color: "#444", letterSpacing: 2, marginTop: 8 }}>8 SEMANAS · 3 TREINOS/SEMANA · 40–60 MIN · COM TUTORIAIS EM VÍDEO</div>
      </div>

      {/* Nav */}
      <div style={{ display: "flex", justifyContent: "center", background: "#0a0a14", borderBottom: "1px solid #ffffff0a", position: "sticky", top: 0, zIndex: 20, flexWrap: "wrap" }}>
        {nav.map(n => (
          <button key={n.id} onClick={() => setSection(n.id)} style={{ padding: "14px 20px", border: "none", background: "transparent", color: section === n.id ? "#4ade80" : "#555", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: 1, borderBottom: section === n.id ? "2px solid #4ade80" : "2px solid transparent", transition: "all 0.2s", cursor: "pointer" }}>{n.name}</button>
        ))}
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "28px 16px 80px" }}>

        {/* TRAININGS */}
        {section === "trainings" && (
          <div>
            <div style={{ display: "flex", gap: 10, marginBottom: 26 }}>
              {TRAININGS.map(t => (
                <button key={t.id} onClick={() => setActiveTraining(t.id)} style={{ flex: 1, padding: "14px 10px", borderRadius: 12, border: `1px solid ${activeTraining === t.id ? t.color + "88" : "#ffffff0d"}`, background: activeTraining === t.id ? `${t.color}15` : "#0a0a14", cursor: "pointer", transition: "all 0.2s" }}>
                  <div style={{ fontSize: 26 }}>{t.icon}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: activeTraining === t.id ? t.color : "#555", letterSpacing: 2, marginTop: 4 }}>{t.name}</div>
                </button>
              ))}
            </div>
            <TrainingView t={currentTraining} />
          </div>
        )}

        {/* PROGRESSION */}
        {section === "progression" && (
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 4, color: "#4ade80", marginBottom: 8 }}>PROGRESSÃO DE CARGA — 8 SEMANAS</div>
            <p style={{ color: "#666", fontSize: 13, marginBottom: 24, lineHeight: 1.7 }}>Qualidade técnica sempre acima da carga. Se a técnica falhar, não avance.</p>
            <div style={{ display: "grid", gap: 14, marginBottom: 32 }}>
              {PROGRESSION_DATA.map((p, i) => (
                <div key={i} style={{ background: `linear-gradient(135deg,${p.color}10 0%,transparent 70%)`, border: `1px solid ${p.color}33`, borderRadius: 14, padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
                    <div>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: p.color, letterSpacing: 3 }}>{p.phase}</div>
                      <div style={{ fontSize: 12, color: "#666" }}>Semanas {p.weeks}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {[["SÉRIES", p.series], ["REPS/TEMPO", p.repsTime], ["DESCANSO", p.rest], ["CARGA", p.load]].map(([label, val], li) => (
                        <div key={li} style={{ background: "#ffffff08", borderRadius: 8, padding: "6px 12px", textAlign: "center" }}>
                          <div style={{ fontSize: 9, color: "#555", letterSpacing: 1 }}>{label}</div>
                          <div style={{ fontSize: 14, color: li === 3 ? p.color : "#fff", fontWeight: 700 }}>{val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ background: "#ffffff06", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#bbb", lineHeight: 1.6 }}>
                    <span style={{ color: p.color, fontWeight: 600 }}>Objetivo: </span>{p.goal}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 3, color: "#fff", marginBottom: 14 }}>PRINCÍPIOS GERAIS</div>
            <div style={{ display: "grid", gap: 10 }}>
              {[
                { icon: "🎯", t: "Técnica antes de carga", d: "Nunca aumente o peso se a execução não estiver perfeita. Um exercício técnico com carga leve vale mais que carga alta com erro." },
                { icon: "⚖️", t: "Não prejudicar o pedal", d: "Se houver excesso de fadiga nos treinos de MTB, reduza 1 série dos exercícios funcionais. O MTB é a prioridade." },
                { icon: "🔄", t: "Excêntrico é a chave", d: "A fase de descida/retorno deve ser sempre controlada (2–4 segundos). É onde a maioria das adaptações acontecem." },
                { icon: "🧠", t: "Conexão mente-músculo", d: "Antes de cada série, toque o músculo que vai trabalhar. Concentre-se nele. Aumenta a ativação em até 20%." },
                { icon: "💤", t: "Recuperação é treino", d: "Intercale os funcionais com os dias de MTB. Priorize sono de 7–9h nas semanas de intensificação (5–6)." },
              ].map((p, i) => (
                <div key={i} style={{ background: "#ffffff05", border: "1px solid #ffffff0d", borderRadius: 10, padding: 14, display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{p.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, color: "#fff", fontWeight: 700, marginBottom: 3 }}>{p.t}</div>
                    <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>{p.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CALENDAR */}
        {section === "calendar" && (
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 4, color: "#4ade80", marginBottom: 8 }}>CALENDÁRIO SEMANAL</div>
            <p style={{ color: "#666", fontSize: 13, marginBottom: 18 }}>Funcionais nunca antes de um MTB intenso no mesmo dia.</p>
            <div style={{ background: "#0a0a14", border: "1px solid #ffffff0d", borderRadius: 14, overflow: "hidden", marginBottom: 30 }}>
              {[
                { day: "SEG", content: "🚵 MTB", sub: "Técnico ou base Z2", color: "#4ade80" },
                { day: "TER", content: "⚡ TREINO A", sub: "Core + Cadeia Posterior + Lombar", color: "#4ade80" },
                { day: "QUA", content: "🚵 MTB", sub: "Intervalo ou Z2", color: "#4ade80" },
                { day: "QUI", content: "🔥 TREINO B", sub: "Glúteos + Quadríceps + Propriocepção", color: "#f97316" },
                { day: "SEX", content: "🚵 MTB", sub: "Longo ou XC específico", color: "#4ade80" },
                { day: "SÁB", content: "🏔️ TREINO C", sub: "Ombros + Integração + Panturrilha", color: "#c084fc" },
                { day: "DOM", content: "😴 RECUPERAÇÃO", sub: "Ativo leve, mobilidade, banho frio", color: "#555" },
              ].map((d, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 20px", borderBottom: i < 6 ? "1px solid #ffffff08" : "none", background: i % 2 === 0 ? "#ffffff03" : "transparent" }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: 2, color: "#555", width: 38, flexShrink: 0 }}>{d.day}</div>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, color: d.color, fontWeight: 700 }}>{d.content}</div>
                    <div style={{ fontSize: 11, color: "#555", marginTop: 1 }}>{d.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: 4, color: "#4ade80", marginBottom: 14 }}>CONEXÃO COM O MTB</div>
            {[
              { title: "Descidas Técnicas", icon: "⛰️", color: "#f97316", items: [{ ex: "Skater Squat", why: "Treina o joelho travado em ângulo neutro — posição exata de uma descida com quadril atrás e tronco baixo." }, { ex: "Equilíbrio Unipodal no Bosu", why: "Sistema proprioceptivo ativado = reação mais rápida quando a roda 'escapa' numa pedra ou raiz." }, { ex: "T Push-Up", why: "Reflexo de ombro para absorver impactos abruptos do guidão em pedras." }] },
              { title: "Subidas Longas", icon: "🔼", color: "#4ade80", items: [{ ex: "Romanian Deadlift (RDL)", why: "Isquiotibiais e glúteos resistentes = menos cãibra e mais potência no final de subidas longas." }, { ex: "Hollow Body Hold", why: "Previne a perda de postura lombar na fadiga de subidas — o core aguenta mais." }, { ex: "Step Up com Pausa", why: "Replica o padrão motor unilateral do pedal em rampas." }] },
              { title: "Curvas e Técnica", icon: "↩️", color: "#facc15", items: [{ ex: "Lateral Lunge", why: "Adutores treinados = melhor inclinação lateral do corpo para acompanhar a bicicleta nas curvas." }, { ex: "Thread the Needle", why: "Dissociação tronco-quadril: a chave das curvas técnicas." }, { ex: "Face Pull + Band Pull Apart", why: "Ombros estáveis = guidão mais preciso e menor chance de lesão." }] },
              { title: "Provas acima de 3 horas", icon: "⏱️", color: "#38bdf8", items: [{ ex: "Calf Raise Excêntrico Unipodal", why: "Tendão de Aquiles e panturrilha resilientes = sem cãibra nos últimos 20km das maratonas XCM." }, { ex: "Good Morning + RDL altas reps", why: "Resistência muscular localizada evita fadiga precoce na cadeia posterior." }, { ex: "Respiração Diafragmática", why: "Menor custo energético respiratório e melhor oxigenação em esforços longos." }] },
            ].map((note, ni) => (
              <div key={ni} style={{ background: `linear-gradient(135deg,${note.color}10 0%,transparent 70%)`, border: `1px solid ${note.color}33`, borderRadius: 14, padding: 20, marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 24 }}>{note.icon}</span>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 3, color: note.color }}>{note.title}</div>
                </div>
                <div style={{ display: "grid", gap: 8 }}>
                  {note.items.map((item, ii) => (
                    <div key={ii} style={{ background: "#ffffff06", borderRadius: 8, padding: "10px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <div style={{ width: 3, borderRadius: 2, background: note.color, alignSelf: "stretch", flexShrink: 0 }} />
                      <div>
                        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, color: "#fff", fontWeight: 700, marginBottom: 2 }}>{item.ex}</div>
                        <div style={{ fontSize: 12, color: "#999", lineHeight: 1.5 }}>{item.why}</div>
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
