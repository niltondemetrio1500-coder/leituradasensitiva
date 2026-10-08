import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { LegalPage, SiteFooter } from './legal'

type AnswerKey = 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'q6'
type Answers = Partial<Record<AnswerKey | 'name', string>>

const firstQuestion = [
  '😮‍💨 Sinto que a minha vida está travada, mesmo fazendo tudo certo.',
  '😔 Tenho tudo pra ser feliz, mas ainda sinto um vazio por dentro.',
  '😯 Estou numa decisão importante e não sei qual caminho escolher.',
  '🤔 Sinto que algo grande está prestes a mudar, mas não sei o que.',
]

const relationshipQuestion = [
  '💔 Me doo completamente pelas pessoas, mas quando preciso... Estou sozinha.',
  '😟 Sinto que carrego tudo nas costas enquanto os outros seguem em frente.',
  '😤 Já doei tanto de mim que nem sei mais o que sobrou pra mim mesma.',
  '🥺 Sinto que meu amor, meu esforço e minha energia nunca são suficientes para ninguém.',
]

const stuckQuestion = [
  '🙋‍♀️ Sim, me identifico completamente!',
  '🤔 Às vezes... mas acho que é só uma fase.',
  '❓ Tenho esse sentimento, mas não sei explicar de onde vem.',
]

const changeQuestion = [
  '💰 Melhorar minha situação financeira.',
  '🫶 Encontrar o meu grande amor.',
  '🍀 Encontrar a minha paz interior.',
  '🙏 Encontrar a minha direção e propósito de vida.',
]

const zodiacQuestion = [
  '♈ Áries', '♉ Touro', '♊ Gêmeos', '♋ Câncer', '♌ Leão', '♍ Virgem',
  '♎ Libra', '♏ Escorpião', '♐ Sagitário', '♑ Capricórnio', '♒ Aquário', '♓ Peixes',
]

const finalQuestion = [
  '🙋‍♀️ Sim, estou pronta para receber.',
  '😔 Sim, mas tenho medo de me decepcionar de novo.',
  '🤔 Não sei, depende do que as cartas disserem.',
]

const cards = Array.from({ length: 8 }, (_, index) => index + 1)
const progressSteps = 7
const vslId = 'vid-6abff25d965fbdd3549077a9'
const vslScript = 'https://scripts.converteai.net/dc8ab8c0-f9ac-47c3-af12-a4174ba40c45/players/6abff25d965fbdd3549077a9/v4/player.js'
const checkoutUrl = 'https://pay.kirvano.com/77049f8d-81bb-432c-a76d-1e70182eb31f'

function ChoiceList({ choices, onChoose, compact = false }: { choices: string[]; onChoose: (answer: string) => void; compact?: boolean }) {
  return (
    <div className={compact ? 'choice-grid' : 'choice-list'}>
      {choices.map((choice) => (
        <button className="choice-button" key={choice} onClick={() => onChoose(choice)} type="button">
          <span>{choice}</span>
          {!compact && <span aria-hidden="true" className="choice-orbit">✦</span>}
        </button>
      ))}
    </div>
  )
}

function LoadingCard() {
  return (
    <div aria-label="Analisando as energias" className="mystical-card">
      <div className="mystical-card__inner"><span>✦</span></div>
      <i className="corner corner--one" /><i className="corner corner--two" />
      <i className="corner corner--three" /><i className="corner corner--four" />
    </div>
  )
}

function VslPlayer() {
  useEffect(() => {
    if (!document.getElementById('vturb-script')) {
      const script = document.createElement('script')
      script.id = 'vturb-script'
      script.src = vslScript
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  return (
    <div className="vsl-frame">
      <vturb-smartplayer id={vslId} style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px' } as CSSProperties}>
        <div className="vturb-player-placeholder" />
      </vturb-smartplayer>
    </div>
  )
}

function App() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [nameInput, setNameInput] = useState('')
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [narrativeLines, setNarrativeLines] = useState(0)
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [pendingCards, setPendingCards] = useState<number[]>([])
  const [flippedCard, setFlippedCard] = useState<number | null>(null)
  const [showCheckout, setShowCheckout] = useState(false)

  useEffect(() => {
    if (step !== 8) return
    setAnalysisProgress(0)
    const start = Date.now()
    const interval = window.setInterval(() => {
      const completed = Math.min(100, ((Date.now() - start) / 6000) * 100)
      setAnalysisProgress(completed)
      if (completed >= 100) {
        window.clearInterval(interval)
        window.setTimeout(() => setStep(9), 120)
      }
    }, 50)
    return () => window.clearInterval(interval)
  }, [step])

  useEffect(() => {
    if (step !== 9) return
    setNarrativeLines(1)
    const timers = [2000, 4000, 6000].map((delay, index) => window.setTimeout(() => setNarrativeLines(index + 2), delay))
    return () => timers.forEach(window.clearTimeout)
  }, [step])

  useEffect(() => {
    if (step !== 11) return
    setShowCheckout(false)
    const checkoutTimer = window.setTimeout(() => setShowCheckout(true), 1023000)
    return () => window.clearTimeout(checkoutTimer)
  }, [step])

  const checkoutDestination = useMemo(() => `${checkoutUrl}${window.location.search}`, [])

  function advance(key?: AnswerKey | 'name', value?: string) {
    if (key && value !== undefined) setAnswers((current) => ({ ...current, [key]: value }))
    setStep((current) => current + 1)
  }

  function chooseCard(id: number) {
    if (selectedCards.includes(id) || pendingCards.includes(id) || selectedCards.length + pendingCards.length >= 3) return
    setPendingCards((current) => [...current, id])
    setFlippedCard(id)
    window.setTimeout(() => {
      setSelectedCards((current) => current.includes(id) || current.length >= 3 ? current : [...current, id])
      setPendingCards((current) => current.filter((cardId) => cardId !== id))
      setFlippedCard(null)
    }, 480)
  }

  const firstName = answers.name || 'Você'
  const progress = step > 0 && step <= progressSteps ? (step / progressSteps) * 100 : 0

  if (window.location.pathname === '/termos-de-uso') return <LegalPage type="terms" />
  if (window.location.pathname === '/politica-de-privacidade') return <LegalPage type="privacy" />

  return (
    <div className="app-shell">
      <div className="star-field" aria-hidden="true" />
      {step > 0 && step <= progressSteps && (
        <div className="progress-track" aria-label={`Progresso: ${Math.round(progress)}%`}>
          <div className="progress-value" style={{ width: `${progress}%` }} />
        </div>
      )}

      <main className="stage">
        <div className="content-card" key={step}>
          {step === 0 && (
            <section className="screen hero-screen screen-enter">
              <div className="brand-mark" aria-label="Leitura da Sensitiva"><span>✦</span></div>
              <h1 className="headline neon">Em minutos, veja o que as cartas podem revelar sobre os próximos meses</h1>
              <div className="gold-rule" />
              <div className="hero-visual"><img src="/tarot_reader4.webp" alt="Sensitiva com cartas de tarot" /></div>
              <p className="hero-copy">Essa leitura pode trazer novas perspectivas e mostrar caminhos para o seu momento atual.</p>
              <button className="gold-button" onClick={() => advance()} type="button">Começar minha leitura gratuita <span>✦</span></button>
            </section>
          )}

          {step === 1 && <QuestionScreen title="Qual dessas frases mais descreve o que você está sentindo esse ano?" choices={firstQuestion} onChoose={(value) => advance('q1', value)} />}
          {step === 2 && <QuestionScreen title="Quando você pensa nas suas relações... Qual frase combina mais com o que você sente?" choices={relationshipQuestion} onChoose={(value) => advance('q2', value)} />}
          {step === 3 && <QuestionScreen title="Você já teve a sensação de olhar ao redor e ver todo mundo avançando... Mas sentir que você ainda está travada no mesmo lugar?" choices={stuckQuestion} onChoose={(value) => advance('q4', value)} />}
          {step === 4 && <QuestionScreen title="O que você espera de mudança este ano para sua vida?" choices={changeQuestion} onChoose={(value) => advance('q3', value)} />}
          {step === 5 && <QuestionScreen title="Qual é o seu signo?" choices={zodiacQuestion} compact onChoose={(value) => advance('q5', value)} />}

          {step === 6 && (
            <section className="screen name-screen screen-enter">
              <div className="ritual-label">PERSONALIZE A SUA LEITURA</div>
              <h2 className="headline neon">Como podemos te chamar?</h2>
              <p>Sua leitura será personalizada para você</p>
              <label className="sr-only" htmlFor="firstName">Seu primeiro nome</label>
              <input id="firstName" autoFocus value={nameInput} onChange={(event) => setNameInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && nameInput.trim().length > 1) advance('name', nameInput.trim()) }} placeholder="Seu primeiro nome" />
              <button className="gold-button" disabled={nameInput.trim().length < 2} onClick={() => advance('name', nameInput.trim())} type="button">Continuar <span>→</span></button>
            </section>
          )}

          {step === 7 && (
            <section className="screen final-question-screen screen-enter">
              <p className="ritual-label">(Última pergunta antes da sua leitura)</p>
              <p className="intro-copy">Se as cartas revelassem <strong>HOJE</strong> o que está bloqueando sua vida e te mostrassem o caminho exato para desbloquear...</p>
              <h2 className="headline">Você estaria pronta para seguir essa orientação?</h2>
              <ChoiceList choices={finalQuestion} onChoose={(value) => advance('q6', value)} />
            </section>
          )}

          {step === 8 && (
            <section className="screen loading-screen">
              <LoadingCard />
              <div><h2 className="headline neon">Analisando as energias...</h2><p>Sua leitura está sendo preparada</p></div>
              <div className="analysis-bar"><i style={{ width: `${analysisProgress}%` }} /></div>
              <span className="analysis-count">{Math.round(analysisProgress)}%</span>
            </section>
          )}

          {step === 9 && (
            <section className="screen narrative-screen">
              <div className="narrative-lines">
                {narrativeLines >= 1 && <p><strong>{firstName}</strong>, a partir do que você me revelou... O universo irá filtrar, entre milhares de combinações possíveis...</p>}
                {narrativeLines >= 2 && <p>As únicas <strong>8 cartas</strong> capazes de falar diretamente com a sua energia neste momento.</p>}
                {narrativeLines >= 3 && <p>Escolha apenas 3 para descobrir o caminho exato para destravar tudo em 2026.</p>}
                {narrativeLines >= 4 && <p className="prepare neon">Prepare-se.</p>}
              </div>
              {narrativeLines >= 4 && <button className="gold-button narrative-cta" onClick={() => advance()} type="button">Escolher Minhas Cartas Agora <span>›</span></button>}
            </section>
          )}

          {step === 10 && (
            <section className="screen cards-screen screen-enter">
              <header><p className="eyebrow">O ORÁCULO ESTÁ ABERTO</p><h2>O baralho está aberto para você:</h2><strong>Não pense muito, apenas sinta.</strong><p>Escolha 3 cartas, uma de cada vez, <b>na ordem que o seu instinto mandar:</b></p></header>
              <div className="tarot-grid">
                {cards.map((cardId) => {
                  const selectionIndex = selectedCards.indexOf(cardId)
                  const chosen = selectionIndex !== -1
                  const pending = pendingCards.includes(cardId)
                  const locked = (selectedCards.length + pendingCards.length >= 3 && !chosen) || pending
                  return <button key={cardId} type="button" aria-label={`Carta ${cardId}${chosen ? ', revelada' : ''}`} disabled={locked} onClick={() => chooseCard(cardId)} className={`tarot-card ${chosen ? 'is-revealed' : ''} ${flippedCard === cardId ? 'is-flipping' : ''} ${locked ? 'is-locked' : ''}`}>
                    <img src={chosen ? `/revealed${selectionIndex + 1}.png` : `/card${cardId}.png`} alt={chosen ? 'Carta revelada' : `Carta ${cardId}`} />
                    {chosen && <span className="card-number">{selectionIndex + 1}</span>}
                  </button>
                })}
              </div>
              {selectedCards.length === 3 && <button className="gold-button" onClick={() => advance()} type="button">Ver minha leitura <span>›</span></button>}
              <p className="selection-count"><strong>{selectedCards.length}</strong>/3 cartas escolhidas</p>
            </section>
          )}

          {step === 11 && (
            <section className="screen vsl-screen screen-enter">
              <div className="revelation-heading"><p>Sua Revelação Final:</p><h2 className="neon">A verdade está prestes a ser revelada!</h2></div>
              <VslPlayer />
              {showCheckout && <a className="green-button" href={checkoutDestination} target="_blank" rel="noopener noreferrer">🔓 DESBLOQUEAR MINHA LEITURA AGORA</a>}
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

function QuestionScreen({ title, choices, onChoose, compact = false }: { title: string; choices: string[]; onChoose: (answer: string) => void; compact?: boolean }) {
  return <section className="screen question-screen screen-enter"><p className="ritual-label">LEITURA INTUITIVA</p><h2 className="headline">{title}</h2><ChoiceList choices={choices} onChoose={onChoose} compact={compact} /></section>
}

export default App
