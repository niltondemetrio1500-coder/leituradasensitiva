const companyName = '50.326.547 RUDI MAURO VARGAS'
const companyCnpj = '50.326.547/0001-50'
const companyAddress = 'R Monte Fuji, 23, Conde Vila Verde, Camboriú – SC, CEP 88348-858, Brasil'
const cnpjLookupUrl = 'https://solucoes.receita.fazenda.gov.br/servicos/cnpjreva/cnpjreva_solicitacao.asp'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>© Copyright 2026</p>
      <p><strong>{companyName}</strong> · <a href={cnpjLookupUrl} target="_blank" rel="noopener noreferrer">CNPJ {companyCnpj}</a></p>
      <p>{companyAddress}</p>
      <nav aria-label="Informações legais" className="legal-links">
        <a href="/termos-de-uso">Termos de Uso</a>
        <span aria-hidden="true">|</span>
        <a href="/politica-de-privacidade">Política de Privacidade</a>
      </nav>
    </footer>
  )
}

export function LegalPage({ type }: { type: 'terms' | 'privacy' }) {
  const isTerms = type === 'terms'

  return (
    <div className="app-shell legal-shell">
      <div className="star-field" aria-hidden="true" />
      <main className="legal-stage">
        <article className="legal-card">
          <a className="legal-back" href="/">← Voltar para a leitura</a>
          <div className="brand-mark" aria-label="Leitura da Sensitiva"><span>✦</span></div>
          <p className="ritual-label">LEITURA DA SENSITIVA</p>
          <h1 className="legal-title">{isTerms ? 'Termos de Uso' : 'Política de Privacidade'}</h1>
          <p className="legal-updated">Última atualização: 2 de outubro de 2026</p>

          {isTerms ? (
            <div className="legal-copy">
              <p>Ao acessar este site, você concorda com estes Termos de Uso. Caso não concorde com algum item, recomendamos que não utilize a plataforma.</p>
              <h2>1. Sobre o serviço</h2>
              <p>A Leitura da Sensitiva oferece uma experiência digital de entretenimento e autoconhecimento baseada em perguntas, cartas e conteúdos audiovisuais. As interpretações apresentadas são subjetivas e não substituem orientação médica, psicológica, jurídica, financeira ou de qualquer outro profissional habilitado.</p>
              <h2>2. Uso permitido</h2>
              <p>Você deve utilizar o site de forma legal, respeitosa e exclusivamente para fins pessoais. É proibido tentar interferir no funcionamento da plataforma, copiar seus elementos de forma indevida, distribuir conteúdo protegido ou utilizar o serviço para cometer fraude ou violar direitos de terceiros.</p>
              <h2>3. Conteúdo e disponibilidade</h2>
              <p>Buscamos manter as informações e a experiência disponíveis, mas o site pode passar por atualizações, manutenções ou indisponibilidades temporárias. Textos, identidade visual, código, imagens e demais materiais pertencem à empresa ou são utilizados com autorização/licença aplicável.</p>
              <h2>4. Ofertas e pagamentos</h2>
              <p>Quando houver uma oferta, compra ou serviço complementar, o usuário poderá ser direcionado a uma página de pagamento de terceiro. As condições específicas, valores e políticas aplicáveis serão apresentadas no ambiente de checkout correspondente. Não armazenamos dados completos de cartão neste site.</p>
              <h2>5. Limitação de responsabilidade</h2>
              <p>As decisões tomadas pelo usuário a partir de uma leitura ou conteúdo são de sua exclusiva responsabilidade. Não garantimos resultados específicos e não nos responsabilizamos por decisões pessoais, profissionais ou financeiras baseadas exclusivamente na experiência.</p>
              <h2>6. Alterações</h2>
              <p>Estes termos podem ser atualizados para refletir mudanças no serviço ou na legislação. A versão vigente será sempre a publicada nesta página.</p>
              <h2>7. Identificação</h2>
              <p><strong>{companyName}</strong>, inscrita no CNPJ <a href={cnpjLookupUrl} target="_blank" rel="noopener noreferrer">{companyCnpj}</a>, com endereço em {companyAddress}.</p>
            </div>
          ) : (
            <div className="legal-copy">
              <p>Esta Política explica como a Leitura da Sensitiva trata informações quando você visita ou utiliza este site.</p>
              <h2>1. Dados que podem ser informados</h2>
              <p>Durante a experiência, você pode escolher informar respostas às perguntas e um primeiro nome para personalização da leitura. Esses dados são utilizados para exibir a experiência solicitada e não devem conter informações sensíveis ou de terceiros.</p>
              <h2>2. Dados coletados automaticamente</h2>
              <p>Servidores, ferramentas de hospedagem e serviços técnicos podem registrar dados básicos de acesso, como endereço IP, data e hora, tipo de navegador, dispositivo e páginas acessadas. Esses registros ajudam na segurança, manutenção e melhoria do funcionamento do site.</p>
              <h2>3. Cookies e tecnologias semelhantes</h2>
              <p>Podemos utilizar armazenamento local, cookies ou tecnologias semelhantes para manter preferências, medir o funcionamento da página e viabilizar recursos incorporados, como o player de vídeo. Você pode gerenciar cookies nas configurações do seu navegador; isso pode afetar algumas funcionalidades.</p>
              <h2>4. Compartilhamento</h2>
              <p>Podemos utilizar fornecedores de hospedagem, análise, vídeo e pagamento para operar o serviço. Esses terceiros recebem somente as informações necessárias para prestar suas funções e aplicam suas próprias políticas quando você acessa seus ambientes. Não vendemos dados pessoais.</p>
              <h2>5. Retenção e segurança</h2>
              <p>Adotamos medidas razoáveis para proteger as informações tratadas e mantemos dados pelo tempo necessário às finalidades descritas, ao cumprimento de obrigações legais ou à defesa de direitos. Nenhum sistema conectado à internet é completamente isento de riscos.</p>
              <h2>6. Seus direitos</h2>
              <p>Você pode solicitar informações sobre o tratamento de seus dados, correção ou eliminação quando aplicável, observadas as obrigações legais. Para exercer seus direitos ou tirar dúvidas, utilize os dados de identificação e endereço informados abaixo.</p>
              <h2>7. Controlador e alterações</h2>
              <p>O controlador é <strong>{companyName}</strong>, CNPJ <a href={cnpjLookupUrl} target="_blank" rel="noopener noreferrer">{companyCnpj}</a>, com endereço em {companyAddress}. Esta política pode ser atualizada; a data no topo indica a versão mais recente.</p>
            </div>
          )}
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
