// ─── Polished filled-silhouette exercise illustrations ────────────────────────
// Apple/Nike Fitness pictogram style: solid silhouette figures, real proportions,
// clean backgrounds, consistent. Shows START and END position per exercise.

// Reusable silhouette body built from filled shapes.
// Joints in a 300×190 viewBox. Helper draws a limb as a rounded capsule.
function limb(x1, y1, x2, y2, w, c) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len * (w / 2), ny = dx / len * (w / 2);
  return (
    <polygon
      points={`${x1+nx},${y1+ny} ${x2+nx},${y2+ny} ${x2-nx},${y2-ny} ${x1-nx},${y1-ny}`}
      fill={c}
    />
  );
}
function joint(x, y, r, c) { return <circle cx={x} cy={y} r={r} fill={c} />; }

// A full silhouette figure given joint coordinates.
// Anatomically-proportioned: small head, defined neck, tapered torso, smooth limbs.
function Body({ j, c }) {
  const W = { upperArm: 9, foreArm: 7.5, thigh: 13, shin: 9.5, hand: 4, foot: 5 };
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      {/* torso: shoulders (narrower) tapering to hips */}
      <polygon
        points={`${j.neck[0]-11},${j.neck[1]+2} ${j.neck[0]+11},${j.neck[1]+2} ${j.hip[0]+12},${j.hip[1]} ${j.hip[0]-12},${j.hip[1]}`}
        fill={c}
      />
      {/* far-side limbs */}
      <g opacity="0.5">
        {limb(j.shoulder[0], j.shoulder[1], j.elbowB[0], j.elbowB[1], W.upperArm, c)}
        {limb(j.elbowB[0], j.elbowB[1], j.handB[0], j.handB[1], W.foreArm, c)}
        {joint(j.elbowB[0], j.elbowB[1], W.foreArm/2, c)}
        {limb(j.hip[0], j.hip[1], j.kneeB[0], j.kneeB[1], W.thigh, c)}
        {limb(j.kneeB[0], j.kneeB[1], j.footB[0], j.footB[1], W.shin, c)}
        {joint(j.kneeB[0], j.kneeB[1], W.shin/2, c)}
      </g>
      {/* near-side leg */}
      {limb(j.hip[0], j.hip[1], j.knee[0], j.knee[1], W.thigh, c)}
      {limb(j.knee[0], j.knee[1], j.foot[0], j.foot[1], W.shin, c)}
      {joint(j.knee[0], j.knee[1], W.shin/2, c)}
      {/* hips block */}
      {joint(j.hip[0], j.hip[1], 12, c)}
      {/* near-side arm */}
      {limb(j.shoulder[0], j.shoulder[1], j.elbow[0], j.elbow[1], W.upperArm, c)}
      {limb(j.elbow[0], j.elbow[1], j.hand[0], j.hand[1], W.foreArm, c)}
      {joint(j.shoulder[0], j.shoulder[1], W.upperArm/2 + 1, c)}
      {joint(j.elbow[0], j.elbow[1], W.foreArm/2, c)}
      {/* neck + head (head smaller, ~10r) */}
      {limb(j.neck[0], j.neck[1], j.head[0], j.head[1], 7, c)}
      {joint(j.head[0], j.head[1], j.head[2], c)}
    </g>
  );
}

function Frame({ children, c }) {
  return (
    <svg viewBox="0 0 300 190" style={{ width: "100%", aspectRatio: "300/190", display: "block", background: "#0f0f17" }}>
      {/* subtle floor */}
      <line x1="15" y1="172" x2="285" y2="172" stroke={c} strokeWidth="3" opacity="0.18" strokeLinecap="round" />
      {children}
    </svg>
  );
}

// equipment helpers
const dumbbell = (x, y, c) => (
  <g fill={c}><rect x={x-9} y={y-3} width="18" height="6" rx="2"/><rect x={x-12} y={y-7} width="5" height="14" rx="2"/><rect x={x+7} y={y-7} width="5" height="14" rx="2"/></g>
);
const kettlebell = (x, y, c) => (
  <g fill={c}><path d={`M${x-5},${y-7} a5,5 0 0,1 10,0`} fill="none" stroke={c} strokeWidth="3"/><circle cx={x} cy={y+3} r="8"/></g>
);
const ball = (x, y, r, c) => <circle cx={x} cy={y} r={r} fill={c} opacity="0.22" stroke={c} strokeWidth="2"/>;
const band = (x1, y1, x2, y2, c) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="3" strokeDasharray="6 5" opacity="0.6"/>;
const step = (x, y, w, h, c) => <g><rect x={x} y={y} width={w} height={h} fill={c} opacity="0.16"/><line x1={x} y1={y} x2={x+w} y2={y} stroke={c} strokeWidth="2.5" opacity="0.5"/></g>;

export const ART = {

  catcow: (c) => ({
    startLabel: "Posição VACA — lombar afunda, peito e olhar sobem",
    endLabel: "Posição GATO — costas arredondam para o teto",
    start: (<Frame c={c}><g>
      {/* on all fours, back sagging */}
      <Body c={c} j={{ head:[238,78,10], neck:[222,86], shoulder:[210,92], elbow:[206,130], hand:[204,165], elbowB:[210,130], handB:[208,165], hip:[95,98], knee:[92,135], foot:[80,165], kneeB:[98,135], footB:[86,165] }}/>
      <path d={`M95,98 Q160,118 210,92`} fill="none" stroke={c} strokeWidth="22" strokeLinecap="round"/>
    </g></Frame>),
    end: (<Frame c={c}><g>
      <Body c={c} j={{ head:[236,96,10], neck:[222,90], shoulder:[210,92], elbow:[206,130], hand:[204,165], elbowB:[210,130], handB:[208,165], hip:[95,98], knee:[92,135], foot:[80,165], kneeB:[98,135], footB:[86,165] }}/>
      <path d={`M95,98 Q160,60 210,92`} fill="none" stroke={c} strokeWidth="22" strokeLinecap="round"/>
    </g></Frame>),
  }),

  deadbug: (c) => ({
    startLabel: "Deitada — braços ao teto, joelhos a 90°, lombar no chão",
    endLabel: "Estende braço e perna opostos, lombar firme no chão",
    start: (<Frame c={c}><g>
      <rect x="60" y="150" width="170" height="14" rx="7" fill={c}/>{/* torso lying */}
      {joint(54,157,13,c)}
      {limb(150,157,150,120,12,c)}{limb(150,120,178,120,11,c)}{/* near leg 90 */}
      <g opacity="0.55">{limb(160,157,160,118,12,c)}{limb(160,118,188,118,11,c)}</g>
      {limb(120,150,120,116,10,c)}{/* near arm up */}
      <g opacity="0.55">{limb(128,150,128,116,10,c)}</g>
    </g></Frame>),
    end: (<Frame c={c}><g>
      <rect x="60" y="150" width="170" height="14" rx="7" fill={c}/>
      {joint(54,157,13,c)}
      {limb(158,157,225,150,12,c)}{/* one leg extended */}
      <g opacity="0.55">{limb(162,157,162,118,12,c)}{limb(162,118,188,118,11,c)}</g>{/* one leg bent */}
      {limb(120,150,120,116,10,c)}{/* one arm up */}
      <g opacity="0.55">{limb(126,150,60,134,10,c)}</g>{/* one arm back */}
    </g></Frame>),
  }),

  glutebridge: (c) => ({
    startLabel: "Deitada — joelhos dobrados, pés no chão, braços ao lado",
    endLabel: "Quadril sobe — linha reta ombros-joelhos, glúteo firme",
    start: (<Frame c={c}><g>
      <rect x="68" y="150" width="105" height="13" rx="6" fill={c}/>{joint(62,156,13,c)}
      {limb(173,156,205,128,15,c)}{limb(205,128,205,164,11,c)}
      <g opacity="0.55">{limb(173,158,198,132,15,c)}{limb(198,132,198,164,11,c)}</g>
    </g></Frame>),
    end: (<Frame c={c}><g>
      <rect x="68" y="150" width="34" height="13" rx="6" fill={c}/>{joint(62,156,13,c)}
      {limb(100,153,180,104,16,c)}{/* lifted torso to hip */}
      {joint(180,104,15,c)}
      {limb(180,104,208,130,15,c)}{limb(208,130,208,164,11,c)}
      <g opacity="0.55">{limb(180,107,200,134,15,c)}{limb(200,134,200,164,11,c)}</g>
    </g></Frame>),
  }),

  hinge: (c) => ({
    startLabel: "Em pé — coluna neutra, peso à frente das coxas",
    endLabel: "Quadril recua, tronco inclina, costas retas",
    start: (<Frame c={c}><g>
      <Body c={c} j={{ head:[150,32,10], neck:[150,46], shoulder:[150,52], elbow:[150,90], hand:[150,118], elbowB:[150,90], handB:[150,118], hip:[150,98], knee:[150,135], foot:[150,168], kneeB:[150,135], footB:[150,168] }}/>
      {dumbbell(138,118,c)}{dumbbell(162,118,c)}
    </g></Frame>),
    end: (<Frame c={c}><g>
      <Body c={c} j={{ head:[92,72,10], neck:[104,78], shoulder:[114,82], elbow:[122,118], hand:[128,148], elbowB:[122,118], handB:[128,148], hip:[178,100], knee:[180,135], foot:[178,168], kneeB:[180,135], footB:[178,168] }}/>
      {dumbbell(128,148,c)}
    </g></Frame>),
  }),

  squat: (c) => ({
    startLabel: "Em pé — peso ao peito, pés na largura dos ombros",
    endLabel: "Desce — quadril para trás, joelhos sobre os pés",
    start: (<Frame c={c}><g>
      <Body c={c} j={{ head:[150,32,10], neck:[150,46], shoulder:[150,52], elbow:[132,72], hand:[148,80], elbowB:[168,72], handB:[152,80], hip:[150,100], knee:[150,135], foot:[150,168], kneeB:[150,135], footB:[150,168] }}/>
      {kettlebell(150,76,c)}
    </g></Frame>),
    end: (<Frame c={c}><g>
      <Body c={c} j={{ head:[150,58,10], neck:[150,72], shoulder:[150,78], elbow:[134,96], hand:[150,104], elbowB:[166,96], handB:[152,104], hip:[150,118], knee:[120,128], foot:[124,168], kneeB:[180,128], footB:[176,168] }}/>
      {kettlebell(150,100,c)}
    </g></Frame>),
  }),

  lunge: (c) => ({
    startLabel: "Posição dividida — pé traseiro apoiado atrás",
    endLabel: "Desce — joelho da frente a 90°, tronco ereto",
    start: (<Frame c={c}><g>
      <Body c={c} j={{ head:[150,36,10], neck:[150,50], shoulder:[150,56], elbow:[140,92], hand:[140,120], elbowB:[160,92], handB:[160,120], hip:[150,102], knee:[182,140], foot:[192,168], kneeB:[120,128], footB:[104,166] }}/>
      {dumbbell(140,120,c)}{dumbbell(160,120,c)}
    </g></Frame>),
    end: (<Frame c={c}><g>
      <Body c={c} j={{ head:[152,52,10], neck:[152,66], shoulder:[152,72], elbow:[142,106], hand:[142,134], elbowB:[162,106], handB:[162,134], hip:[152,112], knee:[160,150], foot:[162,168], kneeB:[118,144], footB:[106,166] }}/>
      {dumbbell(142,134,c)}{dumbbell(162,134,c)}
    </g></Frame>),
  }),

  stepup: (c) => ({
    startLabel: "Um pé na caixa — pé de baixo relaxado no chão",
    endLabel: "Sobe — pausa no topo, quadril nivelado",
    start: (<Frame c={c}><g>
      {step(58,118,58,46,c)}
      <Body c={c} j={{ head:[150,42,10], neck:[150,56], shoulder:[150,62], elbow:[138,96], hand:[138,122], elbowB:[162,96], handB:[162,122], hip:[150,104], knee:[112,116], foot:[96,118], kneeB:[156,140], footB:[156,168] }}/>
      {dumbbell(138,122,c)}{dumbbell(162,122,c)}
    </g></Frame>),
    end: (<Frame c={c}><g>
      {step(58,118,58,46,c)}
      <Body c={c} j={{ head:[92,34,10], neck:[92,48], shoulder:[92,54], elbow:[80,88], hand:[80,114], elbowB:[104,88], handB:[104,114], hip:[92,96], knee:[90,116], foot:[88,118], kneeB:[122,110], footB:[128,140] }}/>
      {dumbbell(80,114,c)}{dumbbell(104,114,c)}
    </g></Frame>),
  }),

  birddog: (c) => ({
    startLabel: "Quatro apoios — coluna neutra, core ativado",
    endLabel: "Estende braço e perna opostos — quadril nivelado",
    start: (<Frame c={c}><g>
      <path d={`M92,96 L212,96`} stroke={c} strokeWidth="22" strokeLinecap="round"/>
      {joint(226,92,13,c)}{limb(220,98,224,96,9,c)}
      {limb(92,96,90,164,11,c)}{limb(212,96,212,164,11,c)}
      <g opacity="0.55">{limb(98,96,96,164,11,c)}{limb(206,96,206,164,11,c)}</g>
    </g></Frame>),
    end: (<Frame c={c}><g>
      <path d={`M92,96 L212,96`} stroke={c} strokeWidth="22" strokeLinecap="round"/>
      {joint(226,90,13,c)}
      {limb(212,96,272,80,11,c)}{/* extended leg */}
      {limb(92,96,32,80,10,c)}{/* extended arm */}
      <g opacity="0.55">{limb(98,96,96,164,11,c)}{limb(206,96,206,164,11,c)}</g>
    </g></Frame>),
  }),

  hollow: (c) => ({
    startLabel: "Deitada — lombar pressionada ao chão, braços ao teto",
    endLabel: "Ombros e pernas sobem — corpo em concha (banana)",
    start: (<Frame c={c}><g>
      <rect x="70" y="150" width="150" height="13" rx="6" fill={c}/>{joint(64,156,13,c)}
      {limb(80,153,54,148,10,c)}{limb(200,156,242,156,12,c)}
    </g></Frame>),
    end: (<Frame c={c}><g>
      <path d={`M56,128 Q150,168 244,118`} fill="none" stroke={c} strokeWidth="20" strokeLinecap="round"/>
      {joint(50,126,13,c)}{limb(60,127,40,112,10,c)}
    </g></Frame>),
  }),

  superman: (c) => ({
    startLabel: "De bruços — braços e pernas estendidos no chão",
    endLabel: "Levanta braço e perna opostos — glúteo e lombar",
    start: (<Frame c={c}><g>
      <rect x="60" y="150" width="165" height="13" rx="6" fill={c}/>{joint(238,156,13,c)}
      {limb(60,153,40,153,10,c)}
    </g></Frame>),
    end: (<Frame c={c}><g>
      <path d={`M70,150 Q150,138 228,128`} fill="none" stroke={c} strokeWidth="16" strokeLinecap="round"/>
      {joint(240,124,13,c)}
      {limb(74,148,48,120,10,c)}{/* arm up */}
      {limb(200,140,236,112,11,c)}{/* opp leg up */}
      <g opacity="0.55">{limb(205,146,228,160,11,c)}</g>
    </g></Frame>),
  }),

  pallof: (c) => ({
    startLabel: "De lado à âncora — mãos no peito, resista à rotação",
    endLabel: "Estende os braços à frente sem girar o tronco",
    start: (<Frame c={c}><g>
      <Body c={c} j={{ head:[150,34,10], neck:[150,48], shoulder:[150,54], elbow:[166,70], hand:[170,72], elbowB:[150,54], handB:[170,72], hip:[150,102], knee:[136,140], foot:[136,168], kneeB:[164,140], footB:[164,168] }}/>
      {band(172,72,270,72,c)}
    </g></Frame>),
    end: (<Frame c={c}><g>
      <Body c={c} j={{ head:[150,34,10], neck:[150,48], shoulder:[150,54], elbow:[178,60], hand:[206,66], elbowB:[150,54], handB:[206,66], hip:[150,102], knee:[136,140], foot:[136,168], kneeB:[164,140], footB:[164,168] }}/>
      {band(206,66,270,70,c)}
    </g></Frame>),
  }),

  pullapart: (c) => ({
    startLabel: "Braços à frente na altura dos ombros — elástico tenso",
    endLabel: "Abre os braços — escápulas se aproximam, peito abre",
    start: (<Frame c={c}><g>
      <Body c={c} j={{ head:[150,34,10], neck:[150,48], shoulder:[150,54], elbow:[124,62], hand:[118,68], elbowB:[176,62], handB:[182,68], hip:[150,108], knee:[138,144], foot:[138,170], kneeB:[162,144], footB:[162,170] }}/>
      {band(118,68,182,68,c)}
    </g></Frame>),
    end: (<Frame c={c}><g>
      <Body c={c} j={{ head:[150,34,10], neck:[150,48], shoulder:[150,54], elbow:[112,56], hand:[92,60], elbowB:[188,56], handB:[208,60], hip:[150,108], knee:[138,144], foot:[138,170], kneeB:[162,144], footB:[162,170] }}/>
      {band(92,60,208,60,c)}
    </g></Frame>),
  }),

  row: (c) => ({
    startLabel: "Tronco inclinado — braço estendido, escápula solta",
    endLabel: "Puxa o cotovelo ao quadril — escápula retrai",
    start: (<Frame c={c}><g>
      <Body c={c} j={{ head:[88,70,10], neck:[100,76], shoulder:[112,80], elbow:[120,116], hand:[124,146], elbowB:[112,80], handB:[124,146], hip:[182,100], knee:[182,135], foot:[182,168], kneeB:[182,135], footB:[182,168] }}/>
      {dumbbell(124,148,c)}
    </g></Frame>),
    end: (<Frame c={c}><g>
      <Body c={c} j={{ head:[88,70,10], neck:[100,76], shoulder:[112,80], elbow:[150,92], hand:[140,118], elbowB:[112,80], handB:[140,118], hip:[182,100], knee:[182,135], foot:[182,168], kneeB:[182,135], footB:[182,168] }}/>
      {dumbbell(140,120,c)}
    </g></Frame>),
  }),

  calf: (c) => ({
    startLabel: "Calcanhar abaixo do degrau — alongamento da panturrilha",
    endLabel: "Sobe na ponta dos pés — contração máxima",
    start: (<Frame c={c}><g>
      {step(118,118,124,46,c)}
      <Body c={c} j={{ head:[150,34,10], neck:[150,48], shoulder:[150,54], elbow:[150,90], hand:[150,116], elbowB:[150,90], handB:[150,116], hip:[150,100], knee:[150,135], foot:[150,168], kneeB:[150,135], footB:[150,168] }}/>
    </g></Frame>),
    end: (<Frame c={c}><g>
      {step(118,118,124,46,c)}
      <Body c={c} j={{ head:[150,24,10], neck:[150,38], shoulder:[150,44], elbow:[150,80], hand:[150,106], elbowB:[150,80], handB:[150,106], hip:[150,90], knee:[150,124], foot:[152,150], kneeB:[150,124], footB:[152,150] }}/>
    </g></Frame>),
  }),

  pushup: (c) => ({
    startLabel: "Prancha alta — corpo alinhado, mãos sob os ombros",
    endLabel: "Sobe e rotaciona — braço estendido ao teto (T)",
    start: (<Frame c={c}><g>
      {joint(66,98,13,c)}
      <path d={`M78,102 L210,120`} stroke={c} strokeWidth="20" strokeLinecap="round"/>
      {limb(98,108,98,164,11,c)}{/* arms */}
      {limb(210,120,238,166,12,c)}{/* legs */}
      <g opacity="0.55">{limb(104,110,104,164,11,c)}{limb(210,123,232,166,12,c)}</g>
    </g></Frame>),
    end: (<Frame c={c}><g>
      {joint(66,116,13,c)}
      <path d={`M78,120 L210,130`} stroke={c} strokeWidth="20" strokeLinecap="round"/>
      {limb(96,124,92,164,11,c)}
      {limb(130,126,130,72,11,c)}{/* arm to ceiling */}
      {joint(130,68,8,c)}
      {limb(210,130,238,166,12,c)}
    </g></Frame>),
  }),

  tgu: (c) => ({
    startLabel: "Deitada — peso para o teto, olhar fixo no peso",
    endLabel: "Sobe à posição de afundo, peso sempre acima",
    start: (<Frame c={c}><g>
      {joint(70,150,13,c)}
      <rect x="78" y="150" width="100" height="13" rx="6" fill={c}/>
      {limb(178,156,206,130,15,c)}{limb(206,130,206,164,11,c)}{/* bent knee */}
      {limb(108,150,108,96,11,c)}{/* arm to ceiling */}
      {kettlebell(108,88,c)}
    </g></Frame>),
    end: (<Frame c={c}><g>
      <Body c={c} j={{ head:[150,52,10], neck:[150,66], shoulder:[150,72], elbow:[150,46], hand:[150,24], elbowB:[150,72], handB:[150,24], hip:[150,112], knee:[182,150], foot:[190,168], kneeB:[120,144], footB:[106,166] }}/>
      {kettlebell(150,16,c)}
    </g></Frame>),
  }),

  bandwalk: (c) => ({
    startLabel: "Semi-agachada — elástico nos joelhos, tensão ativa",
    endLabel: "Passo lateral — joelhos abertos, sem juntar os pés",
    start: (<Frame c={c}><g>
      <Body c={c} j={{ head:[150,46,10], neck:[150,60], shoulder:[150,66], elbow:[134,84], hand:[136,104], elbowB:[166,84], handB:[164,104], hip:[150,108], knee:[136,140], foot:[136,168], kneeB:[164,140], footB:[164,168] }}/>
      {band(136,150,164,150,c)}
    </g></Frame>),
    end: (<Frame c={c}><g>
      <Body c={c} j={{ head:[150,46,10], neck:[150,60], shoulder:[150,66], elbow:[134,84], hand:[136,104], elbowB:[166,84], handB:[164,104], hip:[150,108], knee:[118,142], foot:[112,168], kneeB:[182,142], footB:[188,168] }}/>
      {band(112,152,188,152,c)}
    </g></Frame>),
  }),

  balance: (c) => ({
    startLabel: "Sobe na superfície instável — encontre o centro",
    endLabel: "Equilíbrio numa perna — joelho leve, core ativo",
    start: (<Frame c={c}><g>
      <path d={`M108,168 Q150,140 192,168`} fill={c} opacity="0.2"/>
      <path d={`M108,168 Q150,140 192,168`} fill="none" stroke={c} strokeWidth="2.5" opacity="0.5"/>
      <Body c={c} j={{ head:[150,40,10], neck:[150,54], shoulder:[150,60], elbow:[130,76], hand:[126,92], elbowB:[170,76], handB:[174,92], hip:[150,104], knee:[144,135], foot:[144,150], kneeB:[156,135], footB:[156,150] }}/>
    </g></Frame>),
    end: (<Frame c={c}><g>
      <path d={`M108,168 Q150,140 192,168`} fill={c} opacity="0.2"/>
      <path d={`M108,168 Q150,140 192,168`} fill="none" stroke={c} strokeWidth="2.5" opacity="0.5"/>
      <Body c={c} j={{ head:[150,38,10], neck:[150,52], shoulder:[150,58], elbow:[124,54], hand:[110,52], elbowB:[176,54], handB:[190,52], hip:[150,104], knee:[150,134], foot:[150,150], kneeB:[180,116], footB:[180,140] }}/>
    </g></Frame>),
  }),

  skater: (c) => ({
    startLabel: "Numa perna — tronco inclinado à frente (postura MTB)",
    endLabel: "Desce — joelho traseiro ao chão, joelho alinhado",
    start: (<Frame c={c}><g>
      <Body c={c} j={{ head:[112,54,10], neck:[124,60], shoulder:[134,64], elbow:[150,82], hand:[160,98], elbowB:[134,64], handB:[160,98], hip:[166,104], knee:[164,138], foot:[164,168], kneeB:[196,122], footB:[206,100] }}/>
    </g></Frame>),
    end: (<Frame c={c}><g>
      <Body c={c} j={{ head:[108,72,10], neck:[120,78], shoulder:[130,82], elbow:[148,98], hand:[158,112], elbowB:[130,82], handB:[158,112], hip:[160,112], knee:[160,150], foot:[160,168], kneeB:[190,138], footB:[200,160] }}/>
    </g></Frame>),
  }),

  stretch: (c) => ({
    startLabel: "Entre na posição de alongamento devagar",
    endLabel: "Aprofunde na expiração — mantenha sem dor",
    start: (<Frame c={c}><g>
      <Body c={c} j={{ head:[96,76,10], neck:[108,82], shoulder:[118,86], elbow:[128,108], hand:[140,120], elbowB:[118,86], handB:[140,120], hip:[170,108], knee:[210,116], foot:[230,118], kneeB:[150,140], footB:[120,166] }}/>
    </g></Frame>),
    end: (<Frame c={c}><g>
      <Body c={c} j={{ head:[86,98,10], neck:[100,102], shoulder:[112,106], elbow:[124,120], hand:[140,128], elbowB:[112,106], handB:[140,128], hip:[172,118], knee:[214,124], foot:[234,126], kneeB:[150,150], footB:[118,168] }}/>
    </g></Frame>),
  }),

  shoulder: (c) => ({
    startLabel: "Braço ao lado — início do círculo controlado",
    endLabel: "Braço acima da cabeça — amplitude total e ativa",
    start: (<Frame c={c}><g>
      <Body c={c} j={{ head:[150,34,10], neck:[150,48], shoulder:[150,54], elbow:[150,90], hand:[150,120], elbowB:[150,54], handB:[150,120], hip:[150,108], knee:[138,144], foot:[138,170], kneeB:[162,144], footB:[162,170] }}/>
    </g></Frame>),
    end: (<Frame c={c}><g>
      <Body c={c} j={{ head:[150,34,10], neck:[150,48], shoulder:[150,54], elbow:[150,30], hand:[150,8], elbowB:[150,54], handB:[150,8], hip:[150,108], knee:[138,144], foot:[138,170], kneeB:[162,144], footB:[162,170] }}/>
      <path d={`M150,54 Q120,30 150,8`} fill="none" stroke={c} strokeWidth="2.5" strokeDasharray="4 4" opacity="0.5"/>
    </g></Frame>),
  }),

  thread: (c) => ({
    startLabel: "Quatro apoios — braço livre aberto para o teto",
    endLabel: "Passa o braço por baixo do tronco — rotação torácica",
    start: (<Frame c={c}><g>
      <path d={`M92,104 L206,104`} stroke={c} strokeWidth="20" strokeLinecap="round"/>
      {limb(92,104,90,164,11,c)}{limb(206,104,206,164,11,c)}
      <g opacity="0.55">{limb(206,107,200,164,11,c)}</g>
      {limb(150,104,150,56,10,c)}{joint(150,52,8,c)}{/* arm to ceiling */}
      {joint(80,100,13,c)}
    </g></Frame>),
    end: (<Frame c={c}><g>
      <path d={`M92,108 L206,108`} stroke={c} strokeWidth="20" strokeLinecap="round"/>
      {limb(92,108,90,164,11,c)}{limb(206,108,206,164,11,c)}
      <g opacity="0.55">{limb(206,111,200,164,11,c)}</g>
      {limb(150,108,118,140,10,c)}{joint(114,142,7,c)}{/* arm threaded under */}
      {joint(82,108,13,c)}
    </g></Frame>),
  }),

  inchworm: (c) => ({
    startLabel: "Em pé — desce as mãos ao chão (alonga isquios)",
    endLabel: "Caminha às mãos até a prancha e faz a flexão",
    start: (<Frame c={c}><g>
      {joint(150,58,13,c)}
      <path d={`M150,70 Q160,100 150,120`} fill="none" stroke={c} strokeWidth="20" strokeLinecap="round"/>
      {limb(150,120,150,168,12,c)}{/* legs */}
      {limb(150,76,156,150,9,c)}{/* arms reaching down */}
    </g></Frame>),
    end: (<Frame c={c}><g>
      {joint(72,104,13,c)}
      <path d={`M84,108 L210,124`} stroke={c} strokeWidth="20" strokeLinecap="round"/>
      {limb(102,112,102,164,11,c)}
      {limb(210,124,238,166,12,c)}
      <g opacity="0.55">{limb(108,114,108,164,11,c)}{limb(210,127,232,166,12,c)}</g>
    </g></Frame>),
  }),

  breathing: (c) => ({
    startLabel: "Deitada — mão no peito, mão no abdômen",
    endLabel: "Respiração profunda — o abdômen sobe, corpo relaxa",
    start: (<Frame c={c}><g>
      <rect x="70" y="150" width="155" height="13" rx="6" fill={c}/>{joint(64,156,13,c)}
      {limb(118,150,118,134,8,c)}{limb(160,150,160,136,8,c)}
    </g></Frame>),
    end: (<Frame c={c}><g>
      <path d={`M70,150 Q150,134 225,150`} fill="none" stroke={c} strokeWidth="16" strokeLinecap="round"/>
      {joint(64,150,13,c)}
      {limb(118,144,118,128,8,c)}{limb(160,138,160,122,8,c)}
      <text x="196" y="116" fill={c} fontSize="22" opacity="0.45">≈</text>
    </g></Frame>),
  }),
};

export const ART_MAP = {
  "Cat-Cow (Gato-Vaca)": "catcow",
  "Hip 90/90 com Rotação de Tronco": "stretch",
  "Dead Bug — Core Profundo": "deadbug",
  "Glute Bridge com Bola de Pilates": "glutebridge",
  "Romanian Deadlift com Halteres (RDL)": "hinge",
  "Bird Dog com Elástico": "birddog",
  "Hollow Body Hold": "hollow",
  "Good Morning com Elástico": "hinge",
  "Pallof Press com Elástico": "pallof",
  "Superman Alternado com Pausa": "superman",
  "Pigeon Pose (Pombo)": "stretch",
  "Alongamento de Isquiotibiais em Pé": "stretch",
  "Respiração Diafragmática": "breathing",

  "World's Greatest Stretch": "lunge",
  "Lateral Band Walk — Glúteo Médio": "bandwalk",
  "Leg Swing — Frontal e Lateral": "balance",
  "Goblet Squat de Ativação": "squat",
  "Split Squat com Halteres (Búlgaro)": "lunge",
  "Step Up com Halteres e Pausa": "stepup",
  "Single Leg Deadlift com Kettlebell": "hinge",
  "Lateral Lunge com Kettlebell": "lunge",
  "Equilíbrio Unipodal no Bosu": "balance",
  "Skater Squat — Posição de Descida MTB": "skater",
  "Couch Stretch — Flexor do Quadril": "stretch",
  "Adductor Rockback na Bola": "stretch",
  "Calf Stretch com Elástico": "calf",

  "Shoulder CARs — Mobilidade Ativa": "shoulder",
  "Band Pull Apart — Ativação Escapular": "pullapart",
  "Calf Raise com Elástico na Borda": "calf",
  "Inchworm com Push-Up": "inchworm",
  "Face Pull com Elástico — Saúde do Ombro": "pullapart",
  "Thread the Needle — Rotação Torácica": "thread",
  "Renegade Row com Kettlebell": "row",
  "Calf Raise Unipodal Excêntrico na Borda": "calf",
  "Push-Up na Bola com Rotação (T Push-Up)": "pushup",
  "Turkish Get-Up com Kettlebell": "tgu",
  "Chest Stretch na Bola de Pilates": "stretch",
  "Thoracic Extension na Bola de Pilates": "stretch",
  "4-7-8 Respiração — Recuperação Avançada": "breathing",
};
