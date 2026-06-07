// ─── Clean SVG exercise illustrations ─────────────────────────────────────────
// Correct technique diagrams showing START and END positions.
// Gender-neutral, consistent style, instant load, never break.
// Each function returns { start: <svg>, end: <svg> }

const STROKE = 7;

// Shared helpers for a clean athletic figure
const Floor = ({ y = 150 }) => (
  <line x1="10" y1={y} x2="290" y2={y} stroke="currentColor" strokeWidth="3" opacity="0.25" />
);

function Figure({ parts, c }) {
  return (
    <g fill="none" stroke={c} strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round">
      {parts}
    </g>
  );
}

// Generic frame wrapper
function Frame({ children, bg = "#0f0f17" }) {
  return (
    <svg viewBox="0 0 300 170" style={{ width: "100%", aspectRatio: "300/170", display: "block", background: bg }}>
      {children}
    </svg>
  );
}

const head = (cx, cy, c, r = 13) => <circle cx={cx} cy={cy} r={r} fill={c} stroke="none" />;

// ─── Illustration definitions per movement pattern ────────────────────────────
export const ART = {

  // Cat-Cow
  catcow: (c) => ({
    startLabel: "Posição VACA — lombar afunda, olhar sobe",
    endLabel: "Posição GATO — costas arredondam ao teto",
    start: (
      <Frame>
        <Floor />
        <Figure c={c} parts={<>
          <path d="M70 95 Q150 120 230 95" />{/* sagging spine */}
          <line x1="70" y1="95" x2="70" y2="150" />
          <line x1="230" y1="95" x2="230" y2="150" />
          {head(245, 80, c)}
          <line x1="232" y1="90" x2="245" y2="85" />
        </>} />
      </Frame>
    ),
    end: (
      <Frame>
        <Floor />
        <Figure c={c} parts={<>
          <path d="M70 95 Q150 55 230 95" />{/* arched spine */}
          <line x1="70" y1="95" x2="70" y2="150" />
          <line x1="230" y1="95" x2="230" y2="150" />
          {head(238, 105, c)}
          <line x1="232" y1="98" x2="238" y2="105" />
        </>} />
      </Frame>
    ),
  }),

  // Dead bug
  deadbug: (c) => ({
    startLabel: "Deitada — braços e joelhos a 90°, lombar no chão",
    endLabel: "Estende braço e perna opostos sem soltar a lombar",
    start: (
      <Frame>
        <Floor y={140} />
        <Figure c={c} parts={<>
          <line x1="70" y1="140" x2="200" y2="140" />{/* torso on floor */}
          {head(60, 135, c)}
          <line x1="150" y1="140" x2="150" y2="100" /><line x1="150" y1="100" x2="180" y2="100" />{/* leg 90 */}
          <line x1="160" y1="140" x2="160" y2="100" /><line x1="160" y1="100" x2="190" y2="100" />
          <line x1="120" y1="140" x2="120" y2="105" />{/* arms up */}
          <line x1="130" y1="140" x2="130" y2="105" />
        </>} />
      </Frame>
    ),
    end: (
      <Frame>
        <Floor y={140} />
        <Figure c={c} parts={<>
          <line x1="70" y1="140" x2="200" y2="140" />
          {head(60, 135, c)}
          <line x1="155" y1="140" x2="220" y2="135" />{/* one leg extended */}
          <line x1="160" y1="140" x2="160" y2="100" /><line x1="160" y1="100" x2="185" y2="100" />{/* one leg bent */}
          <line x1="120" y1="140" x2="120" y2="105" />{/* one arm up */}
          <line x1="125" y1="140" x2="55" y2="120" />{/* one arm back */}
        </>} />
      </Frame>
    ),
  }),

  // Glute bridge
  glutebridge: (c) => ({
    startLabel: "Deitada — joelhos dobrados, pés no chão",
    endLabel: "Quadril sobe — linha reta ombro-joelho, glúteo firme",
    start: (
      <Frame>
        <Floor />
        <Figure c={c} parts={<>
          <line x1="70" y1="150" x2="170" y2="150" />{/* back on floor */}
          {head(60, 145, c)}
          <line x1="170" y1="150" x2="210" y2="120" />{/* thigh */}
          <line x1="210" y1="120" x2="210" y2="150" />{/* shin */}
          <line x1="90" y1="150" x2="100" y2="135" />{/* arm */}
        </>} />
      </Frame>
    ),
    end: (
      <Frame>
        <Floor />
        <Figure c={c} parts={<>
          <line x1="70" y1="150" x2="100" y2="150" />{/* shoulders on floor */}
          {head(60, 145, c)}
          <line x1="100" y1="150" x2="180" y2="95" />{/* lifted torso to hip */}
          <line x1="180" y1="95" x2="210" y2="120" />{/* thigh down */}
          <line x1="210" y1="120" x2="210" y2="150" />{/* shin */}
        </>} />
      </Frame>
    ),
  }),

  // Hinge (RDL, Good Morning, Single-leg DL)
  hinge: (c) => ({
    startLabel: "Em pé — coluna neutra, peso à frente das coxas",
    endLabel: "Quadril recua — tronco inclina, costas retas",
    start: (
      <Frame>
        <Floor />
        {head(150, 35, c)}
        <Figure c={c} parts={<>
          <line x1="150" y1="48" x2="150" y2="100" />{/* torso */}
          <line x1="150" y1="100" x2="150" y2="150" />{/* legs */}
          <line x1="150" y1="60" x2="150" y2="95" stroke={c} />{/* arms front */}
          <line x1="138" y1="95" x2="162" y2="95" />{/* weight */}
        </>} />
      </Frame>
    ),
    end: (
      <Frame>
        <Floor />
        {head(95, 70, c)}
        <Figure c={c} parts={<>
          <line x1="107" y1="75" x2="175" y2="105" />{/* hinged torso */}
          <line x1="175" y1="105" x2="175" y2="150" />{/* legs */}
          <line x1="120" y1="82" x2="130" y2="120" />{/* arms hang */}
          <line x1="118" y1="120" x2="142" y2="120" />{/* weight */}
        </>} />
      </Frame>
    ),
  }),

  // Squat patterns (goblet, bodyweight)
  squat: (c) => ({
    startLabel: "Em pé — pés na largura dos ombros",
    endLabel: "Desce — quadril para trás, joelhos sobre os pés",
    start: (
      <Frame>
        <Floor />
        {head(150, 35, c)}
        <Figure c={c} parts={<>
          <line x1="150" y1="48" x2="150" y2="100" />
          <line x1="150" y1="100" x2="150" y2="150" />
          <line x1="150" y1="65" x2="125" y2="80" />{/* arms */}
          <line x1="150" y1="65" x2="175" y2="80" />
        </>} />
      </Frame>
    ),
    end: (
      <Frame>
        <Floor />
        {head(150, 55, c)}
        <Figure c={c} parts={<>
          <line x1="150" y1="68" x2="155" y2="110" />{/* torso slightly fwd */}
          <line x1="155" y1="110" x2="120" y2="115" />{/* thigh back */}
          <line x1="120" y1="115" x2="125" y2="150" />{/* shin */}
          <line x1="155" y1="110" x2="180" y2="115" />
          <line x1="180" y1="115" x2="178" y2="150" />
          <line x1="150" y1="78" x2="150" y2="100" />{/* arms front */}
        </>} />
      </Frame>
    ),
  }),

  // Split squat / lunge / Bulgarian
  lunge: (c) => ({
    startLabel: "Afundo — pé da frente firme, traseiro elevado",
    endLabel: "Desce — joelho da frente a 90°, tronco ereto",
    start: (
      <Frame>
        <Floor />
        {head(150, 40, c)}
        <Figure c={c} parts={<>
          <line x1="150" y1="53" x2="150" y2="105" />
          <line x1="150" y1="105" x2="185" y2="150" />{/* front leg */}
          <line x1="150" y1="105" x2="115" y2="130" />{/* back leg up */}
          <line x1="115" y1="130" x2="100" y2="150" />
        </>} />
      </Frame>
    ),
    end: (
      <Frame>
        <Floor />
        {head(155, 55, c)}
        <Figure c={c} parts={<>
          <line x1="155" y1="68" x2="158" y2="115" />
          <line x1="158" y1="115" x2="160" y2="150" />{/* front shin vertical */}
          <line x1="158" y1="115" x2="185" y2="118" />{/* front thigh */}
          <line x1="158" y1="115" x2="120" y2="140" />{/* back leg */}
          <line x1="120" y1="140" x2="110" y2="150" />
        </>} />
      </Frame>
    ),
  }),

  // Step up
  stepup: (c) => ({
    startLabel: "Um pé na caixa — pé de baixo relaxado",
    endLabel: "Sobe — pausa no topo, quadril nivelado",
    start: (
      <Frame>
        <Floor />
        <rect x="60" y="115" width="55" height="35" fill={c} opacity="0.18" />
        <line x1="60" y1="115" x2="115" y2="115" stroke={c} strokeWidth="3" opacity="0.5" />
        {head(150, 45, c)}
        <Figure c={c} parts={<>
          <line x1="150" y1="58" x2="150" y2="105" />
          <line x1="150" y1="105" x2="100" y2="115" />{/* foot on box */}
          <line x1="100" y1="115" x2="95" y2="115" />
          <line x1="150" y1="105" x2="155" y2="150" />{/* down leg */}
        </>} />
      </Frame>
    ),
    end: (
      <Frame>
        <Floor />
        <rect x="60" y="115" width="55" height="35" fill={c} opacity="0.18" />
        <line x1="60" y1="115" x2="115" y2="115" stroke={c} strokeWidth="3" opacity="0.5" />
        {head(90, 35, c)}
        <Figure c={c} parts={<>
          <line x1="90" y1="48" x2="90" y2="90" />
          <line x1="90" y1="90" x2="88" y2="115" />{/* standing leg on box */}
          <line x1="90" y1="90" x2="120" y2="105" />{/* raised knee */}
          <line x1="120" y1="105" x2="125" y2="130" />
        </>} />
      </Frame>
    ),
  }),

  // Bird dog
  birddog: (c) => ({
    startLabel: "Quatro apoios — coluna neutra, core ativo",
    endLabel: "Estende braço e perna opostos — quadril nivelado",
    start: (
      <Frame>
        <Floor />
        <Figure c={c} parts={<>
          <line x1="80" y1="90" x2="210" y2="90" />{/* spine flat */}
          <line x1="80" y1="90" x2="80" y2="150" />{/* arms */}
          <line x1="210" y1="90" x2="210" y2="150" />{/* legs */}
          {head(225, 88, c)}
        </>} />
      </Frame>
    ),
    end: (
      <Frame>
        <Floor />
        <Figure c={c} parts={<>
          <line x1="80" y1="90" x2="210" y2="90" />
          <line x1="210" y1="90" x2="210" y2="150" />{/* support leg */}
          <line x1="80" y1="90" x2="80" y2="150" />{/* support arm */}
          <line x1="210" y1="90" x2="270" y2="78" />{/* extended leg */}
          <line x1="80" y1="90" x2="25" y2="78" />{/* extended arm */}
          {head(222, 92, c)}
        </>} />
      </Frame>
    ),
  }),

  // Plank / Hollow / Superman (prone-supine holds)
  hollow: (c) => ({
    startLabel: "Deitada — lombar pressionada ao chão",
    endLabel: "Ombros e pernas sobem — corpo em concha",
    start: (
      <Frame>
        <Floor y={140} />
        {head(60, 135, c)}
        <Figure c={c} parts={<>
          <line x1="70" y1="140" x2="200" y2="140" />
          <line x1="200" y1="140" x2="240" y2="140" />{/* legs flat */}
          <line x1="80" y1="140" x2="55" y2="135" />{/* arms overhead */}
        </>} />
      </Frame>
    ),
    end: (
      <Frame>
        <Floor y={150} />
        <Figure c={c} parts={<>
          <path d="M55 120 Q150 150 245 110" />{/* banana hollow */}
          {head(50, 118, c)}
          <line x1="60" y1="119" x2="40" y2="105" />{/* arms */}
        </>} />
      </Frame>
    ),
  }),

  // Superman (prone)
  superman: (c) => ({
    startLabel: "De bruços — braços e pernas estendidos",
    endLabel: "Levanta braço e perna opostos — glúteo e lombar",
    start: (
      <Frame>
        <Floor y={140} />
        {head(240, 135, c)}
        <Figure c={c} parts={<>
          <line x1="60" y1="140" x2="230" y2="140" />{/* body prone */}
          <line x1="60" y1="140" x2="40" y2="140" />
        </>} />
      </Frame>
    ),
    end: (
      <Frame>
        <Floor y={140} />
        {head(240, 128, c)}
        <Figure c={c} parts={<>
          <line x1="70" y1="135" x2="230" y2="128" />{/* lifted torso */}
          <line x1="70" y1="135" x2="45" y2="118" />{/* arm up */}
          <line x1="200" y1="130" x2="235" y2="112" />{/* leg up */}
        </>} />
      </Frame>
    ),
  }),

  // Pallof / anti-rotation press
  pallof: (c) => ({
    startLabel: "De lado à âncora — mãos no peito, resista",
    endLabel: "Estende os braços — sem deixar o tronco girar",
    start: (
      <Frame>
        <Floor />
        {head(150, 38, c)}
        <Figure c={c} parts={<>
          <line x1="150" y1="51" x2="150" y2="105" />
          <line x1="150" y1="105" x2="135" y2="150" />
          <line x1="150" y1="105" x2="165" y2="150" />
          <line x1="150" y1="70" x2="170" y2="70" />{/* hands at chest */}
        </>} />
        <line x1="170" y1="70" x2="270" y2="70" stroke={c} strokeWidth="3" strokeDasharray="6 5" opacity="0.5" />
      </Frame>
    ),
    end: (
      <Frame>
        <Floor />
        {head(150, 38, c)}
        <Figure c={c} parts={<>
          <line x1="150" y1="51" x2="150" y2="105" />
          <line x1="150" y1="105" x2="135" y2="150" />
          <line x1="150" y1="105" x2="165" y2="150" />
          <line x1="150" y1="70" x2="205" y2="70" />{/* arms extended */}
        </>} />
        <line x1="205" y1="70" x2="270" y2="70" stroke={c} strokeWidth="3" strokeDasharray="6 5" opacity="0.5" />
      </Frame>
    ),
  }),

  // Band pull apart / Face pull (upper back)
  pullapart: (c) => ({
    startLabel: "Braços à frente — elástico em tensão",
    endLabel: "Abre os braços — escápulas se aproximam",
    start: (
      <Frame>
        {head(150, 38, c)}
        <Figure c={c} parts={<>
          <line x1="150" y1="51" x2="150" y2="120" />
          <line x1="150" y1="120" x2="135" y2="160" />
          <line x1="150" y1="120" x2="165" y2="160" />
          <line x1="150" y1="68" x2="120" y2="68" />{/* arms front */}
          <line x1="150" y1="68" x2="180" y2="68" />
        </>} />
        <line x1="120" y1="68" x2="180" y2="68" stroke={c} strokeWidth="3" strokeDasharray="5 4" opacity="0.5" />
      </Frame>
    ),
    end: (
      <Frame>
        {head(150, 38, c)}
        <Figure c={c} parts={<>
          <line x1="150" y1="51" x2="150" y2="120" />
          <line x1="150" y1="120" x2="135" y2="160" />
          <line x1="150" y1="120" x2="165" y2="160" />
          <line x1="150" y1="68" x2="95" y2="60" />{/* arms wide */}
          <line x1="150" y1="68" x2="205" y2="60" />
        </>} />
        <line x1="95" y1="60" x2="205" y2="60" stroke={c} strokeWidth="3" strokeDasharray="5 4" opacity="0.5" />
      </Frame>
    ),
  }),

  // Row (renegade, single arm)
  row: (c) => ({
    startLabel: "Apoio — braço estendido, escápula solta",
    endLabel: "Puxa o cotovelo ao quadril — escápula retrai",
    start: (
      <Frame>
        <Floor />
        {head(95, 70, c)}
        <Figure c={c} parts={<>
          <line x1="107" y1="75" x2="180" y2="100" />{/* hinged torso */}
          <line x1="180" y1="100" x2="180" y2="150" />
          <line x1="125" y1="82" x2="120" y2="135" />{/* arm hanging */}
          <line x1="108" y1="135" x2="132" y2="135" />{/* weight */}
        </>} />
      </Frame>
    ),
    end: (
      <Frame>
        <Floor />
        {head(95, 70, c)}
        <Figure c={c} parts={<>
          <line x1="107" y1="75" x2="180" y2="100" />
          <line x1="180" y1="100" x2="180" y2="150" />
          <line x1="125" y1="82" x2="150" y2="95" />{/* elbow up */}
          <line x1="150" y1="95" x2="135" y2="120" />{/* forearm to hip */}
          <line x1="123" y1="120" x2="147" y2="120" />
        </>} />
      </Frame>
    ),
  }),

  // Calf raise
  calf: (c) => ({
    startLabel: "Calcanhar abaixo do degrau — alongamento",
    endLabel: "Sobe na ponta dos pés — contração máxima",
    start: (
      <Frame>
        <rect x="120" y="120" width="120" height="40" fill={c} opacity="0.15" />
        <line x1="120" y1="120" x2="240" y2="120" stroke={c} strokeWidth="3" opacity="0.5" />
        {head(150, 38, c)}
        <Figure c={c} parts={<>
          <line x1="150" y1="51" x2="150" y2="105" />
          <line x1="150" y1="105" x2="150" y2="135" />{/* legs */}
          <line x1="150" y1="135" x2="150" y2="150" />{/* heel dropped below step */}
        </>} />
      </Frame>
    ),
    end: (
      <Frame>
        <rect x="120" y="120" width="120" height="40" fill={c} opacity="0.15" />
        <line x1="120" y1="120" x2="240" y2="120" stroke={c} strokeWidth="3" opacity="0.5" />
        {head(150, 28, c)}
        <Figure c={c} parts={<>
          <line x1="150" y1="41" x2="150" y2="95" />
          <line x1="150" y1="95" x2="150" y2="118" />{/* up on toes */}
          <line x1="150" y1="118" x2="158" y2="120" />{/* toe */}
        </>} />
      </Frame>
    ),
  }),

  // Push-up / T push-up
  pushup: (c) => ({
    startLabel: "Prancha alta — corpo alinhado",
    endLabel: "Desce o peito / rotaciona o braço ao teto",
    start: (
      <Frame>
        <Floor />
        {head(70, 100, c)}
        <Figure c={c} parts={<>
          <line x1="82" y1="103" x2="220" y2="120" />{/* body plank */}
          <line x1="100" y1="108" x2="100" y2="150" />{/* arms */}
          <line x1="220" y1="120" x2="240" y2="150" />{/* legs */}
        </>} />
      </Frame>
    ),
    end: (
      <Frame>
        <Floor />
        {head(70, 120, c)}
        <Figure c={c} parts={<>
          <line x1="82" y1="122" x2="220" y2="130" />{/* lowered */}
          <line x1="100" y1="125" x2="95" y2="150" />
          <line x1="130" y1="127" x2="130" y2="80" />{/* one arm to ceiling (T) */}
          <line x1="220" y1="130" x2="240" y2="150" />
        </>} />
      </Frame>
    ),
  }),

  // Turkish get-up
  tgu: (c) => ({
    startLabel: "Deitada — peso para o teto, olhar no peso",
    endLabel: "Sobe à posição de afundo, peso sempre acima",
    start: (
      <Frame>
        <Floor />
        {head(70, 135, c)}
        <Figure c={c} parts={<>
          <line x1="80" y1="140" x2="180" y2="140" />{/* lying */}
          <line x1="180" y1="140" x2="210" y2="120" />{/* bent knee */}
          <line x1="210" y1="120" x2="210" y2="140" />
          <line x1="110" y1="140" x2="110" y2="95" />{/* arm to ceiling */}
          <line x1="100" y1="95" x2="120" y2="95" />{/* weight */}
        </>} />
      </Frame>
    ),
    end: (
      <Frame>
        <Floor />
        {head(150, 45, c)}
        <Figure c={c} parts={<>
          <line x1="150" y1="58" x2="155" y2="110" />{/* torso up */}
          <line x1="155" y1="110" x2="185" y2="150" />{/* front leg */}
          <line x1="155" y1="110" x2="120" y2="135" />{/* back knee down */}
          <line x1="120" y1="135" x2="105" y2="150" />
          <line x1="150" y1="58" x2="150" y2="20" />{/* arm to ceiling */}
          <line x1="140" y1="20" x2="160" y2="20" />{/* weight */}
        </>} />
      </Frame>
    ),
  }),

  // Lateral band walk / hip abduction
  bandwalk: (c) => ({
    startLabel: "Semi-agachada — elástico nos joelhos, tensão",
    endLabel: "Passo lateral — joelhos abertos, sem juntar os pés",
    start: (
      <Frame>
        <Floor />
        {head(150, 50, c)}
        <Figure c={c} parts={<>
          <line x1="150" y1="63" x2="150" y2="105" />
          <line x1="150" y1="105" x2="135" y2="150" />
          <line x1="150" y1="105" x2="165" y2="150" />
          <line x1="150" y1="75" x2="135" y2="90" />
          <line x1="150" y1="75" x2="165" y2="90" />
        </>} />
        <line x1="135" y1="148" x2="165" y2="148" stroke={c} strokeWidth="3" strokeDasharray="5 4" opacity="0.5" />
      </Frame>
    ),
    end: (
      <Frame>
        <Floor />
        {head(150, 50, c)}
        <Figure c={c} parts={<>
          <line x1="150" y1="63" x2="150" y2="105" />
          <line x1="150" y1="105" x2="115" y2="150" />{/* wide stance */}
          <line x1="150" y1="105" x2="195" y2="150" />
          <line x1="150" y1="75" x2="135" y2="90" />
          <line x1="150" y1="75" x2="165" y2="90" />
        </>} />
        <line x1="115" y1="148" x2="195" y2="148" stroke={c} strokeWidth="3" strokeDasharray="5 4" opacity="0.5" />
      </Frame>
    ),
  }),

  // Balance (bosu, single leg)
  balance: (c) => ({
    startLabel: "Sobe na superfície instável — encontre o centro",
    endLabel: "Equilíbrio numa perna — joelho leve, core ativo",
    start: (
      <Frame>
        <path d="M105 150 Q150 125 195 150" fill={c} opacity="0.18" />
        <path d="M105 150 Q150 125 195 150" fill="none" stroke={c} strokeWidth="3" opacity="0.5" />
        {head(150, 45, c)}
        <Figure c={c} parts={<>
          <line x1="150" y1="58" x2="150" y2="105" />
          <line x1="150" y1="105" x2="145" y2="138" />{/* both legs down */}
          <line x1="150" y1="105" x2="155" y2="138" />
          <line x1="150" y1="72" x2="128" y2="82" />
          <line x1="150" y1="72" x2="172" y2="82" />
        </>} />
      </Frame>
    ),
    end: (
      <Frame>
        <path d="M105 150 Q150 125 195 150" fill={c} opacity="0.18" />
        <path d="M105 150 Q150 125 195 150" fill="none" stroke={c} strokeWidth="3" opacity="0.5" />
        {head(150, 42, c)}
        <Figure c={c} parts={<>
          <line x1="150" y1="55" x2="150" y2="105" />
          <line x1="150" y1="105" x2="150" y2="135" />{/* standing leg */}
          <line x1="150" y1="105" x2="180" y2="115" />{/* raised knee */}
          <line x1="180" y1="115" x2="178" y2="138" />
          <line x1="150" y1="72" x2="125" y2="68" />{/* arms out for balance */}
          <line x1="150" y1="72" x2="175" y2="68" />
        </>} />
      </Frame>
    ),
  }),

  // Skater squat (MTB descent position)
  skater: (c) => ({
    startLabel: "Numa perna — tronco inclinado à frente (postura MTB)",
    endLabel: "Desce — joelho traseiro ao chão, joelho alinhado",
    start: (
      <Frame>
        <Floor />
        {head(120, 55, c)}
        <Figure c={c} parts={<>
          <line x1="128" y1="62" x2="160" y2="105" />{/* inclined torso */}
          <line x1="160" y1="105" x2="160" y2="150" />{/* standing leg */}
          <line x1="160" y1="105" x2="190" y2="120" />{/* rear leg lifted */}
          <line x1="190" y1="120" x2="200" y2="100" />
        </>} />
      </Frame>
    ),
    end: (
      <Frame>
        <Floor />
        {head(115, 70, c)}
        <Figure c={c} parts={<>
          <line x1="123" y1="77" x2="155" y2="110" />
          <line x1="155" y1="110" x2="158" y2="150" />{/* front shin */}
          <line x1="155" y1="110" x2="185" y2="135" />{/* rear leg down */}
          <line x1="185" y1="135" x2="195" y2="148" />{/* knee to floor */}
        </>} />
      </Frame>
    ),
  }),

  // Stretch (generic — pigeon, couch, hamstring, hip)
  stretch: (c) => ({
    startLabel: "Posição de alongamento — entre devagar",
    endLabel: "Aprofunde na expiração — sem dor, mantenha",
    start: (
      <Frame>
        <Floor />
        {head(95, 75, c)}
        <Figure c={c} parts={<>
          <line x1="103" y1="82" x2="150" y2="110" />
          <line x1="150" y1="110" x2="210" y2="110" />{/* front leg */}
          <line x1="150" y1="110" x2="120" y2="150" />{/* rear leg */}
          <line x1="115" y1="90" x2="150" y2="108" />
        </>} />
      </Frame>
    ),
    end: (
      <Frame>
        <Floor />
        {head(80, 95, c)}
        <Figure c={c} parts={<>
          <line x1="88" y1="100" x2="150" y2="118" />{/* deeper fold */}
          <line x1="150" y1="118" x2="215" y2="118" />
          <line x1="150" y1="118" x2="118" y2="150" />
          <line x1="100" y1="105" x2="150" y2="116" />
        </>} />
      </Frame>
    ),
  }),

  // Shoulder mobility (CARs)
  shoulder: (c) => ({
    startLabel: "Braço ao lado — início do círculo controlado",
    endLabel: "Braço acima/atrás — amplitude total e ativa",
    start: (
      <Frame>
        {head(150, 38, c)}
        <Figure c={c} parts={<>
          <line x1="150" y1="51" x2="150" y2="120" />
          <line x1="150" y1="120" x2="135" y2="160" />
          <line x1="150" y1="120" x2="165" y2="160" />
          <line x1="150" y1="65" x2="150" y2="115" />{/* arm down */}
        </>} />
      </Frame>
    ),
    end: (
      <Frame>
        {head(150, 38, c)}
        <Figure c={c} parts={<>
          <line x1="150" y1="51" x2="150" y2="120" />
          <line x1="150" y1="120" x2="135" y2="160" />
          <line x1="150" y1="120" x2="165" y2="160" />
          <line x1="150" y1="62" x2="150" y2="20" />{/* arm overhead */}
        </>} />
        <path d="M150 62 Q120 40 150 20" fill="none" stroke={c} strokeWidth="2.5" strokeDasharray="4 4" opacity="0.5" />
      </Frame>
    ),
  }),

  // Thread the needle (thoracic rotation)
  thread: (c) => ({
    startLabel: "Prancha lateral — braço livre ao teto",
    endLabel: "Passa o braço por baixo — rotação torácica",
    start: (
      <Frame>
        <Floor />
        {head(80, 95, c)}
        <Figure c={c} parts={<>
          <line x1="90" y1="100" x2="200" y2="130" />{/* side body */}
          <line x1="110" y1="106" x2="110" y2="150" />{/* support arm */}
          <line x1="130" y1="110" x2="130" y2="65" />{/* top arm up */}
          <line x1="200" y1="130" x2="220" y2="150" />
        </>} />
      </Frame>
    ),
    end: (
      <Frame>
        <Floor />
        {head(85, 100, c)}
        <Figure c={c} parts={<>
          <line x1="95" y1="105" x2="200" y2="130" />
          <line x1="110" y1="110" x2="110" y2="150" />
          <line x1="125" y1="113" x2="160" y2="138" />{/* arm threaded under */}
          <line x1="200" y1="130" x2="220" y2="150" />
        </>} />
      </Frame>
    ),
  }),

  // Inchworm
  inchworm: (c) => ({
    startLabel: "Em pé — desce as mãos ao chão (isquios)",
    endLabel: "Caminha às mãos até a prancha + flexão",
    start: (
      <Frame>
        <Floor />
        {head(150, 60, c)}
        <Figure c={c} parts={<>
          <path d="M150 73 Q160 100 150 120" />{/* folded torso */}
          <line x1="150" y1="120" x2="150" y2="150" />{/* legs */}
          <line x1="150" y1="80" x2="155" y2="150" />{/* arms reaching down */}
        </>} />
      </Frame>
    ),
    end: (
      <Frame>
        <Floor />
        {head(75, 105, c)}
        <Figure c={c} parts={<>
          <line x1="85" y1="108" x2="220" y2="125" />{/* plank */}
          <line x1="100" y1="112" x2="100" y2="150" />
          <line x1="220" y1="125" x2="240" y2="150" />
        </>} />
      </Frame>
    ),
  }),

  // Breathing / recovery
  breathing: (c) => ({
    startLabel: "Deitada — mão no peito, mão no abdômen",
    endLabel: "Respiração profunda — abdômen sobe, relaxe",
    start: (
      <Frame>
        <Floor y={140} />
        {head(60, 130, c)}
        <Figure c={c} parts={<>
          <line x1="70" y1="135" x2="220" y2="135" />
          <line x1="120" y1="135" x2="120" y2="120" />{/* hand on chest */}
          <line x1="160" y1="135" x2="160" y2="122" />{/* hand on belly */}
        </>} />
      </Frame>
    ),
    end: (
      <Frame>
        <Floor y={140} />
        {head(60, 130, c)}
        <Figure c={c} parts={<>
          <path d="M70 135 Q150 122 220 135" />{/* belly rises */}
          <line x1="120" y1="130" x2="120" y2="118" />
          <line x1="160" y1="126" x2="160" y2="112" />
        </>} />
        <text x="195" y="105" fill={c} fontSize="22" opacity="0.4">≈</text>
      </Frame>
    ),
  }),
};

// Map each exercise name → art key
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
