# Plano — Leitura da Sensitiva

## Escopo aprovado
Recriar do zero a experiência da referência: landing inicial, questionário com sete etapas, carregamento temporizado, narrativa de preparação, seleção de três cartas, revelação/VSL e CTA final. O fluxo é responsivo e utiliza textos em português do Brasil informados na referência.

## Implementação
Aplicação estática em React + TypeScript + Vite, sem servidor ou banco de dados. O estado local controla cada uma das 12 telas, respostas, progresso, seleção de cartas e temporizadores. A VSL será incorporada em um player responsivo; a integração preserva parâmetros UTM no destino final quando existirem.

## Design
- **Movimento:** misticismo editorial contemporâneo, inspirado em oráculos noturnos e leituras de tarot.
- **Princípios:** foco em uma decisão por tela; contraste alto; sensação de ritual progressivo; feedback imediato.
- **Cores:** violeta profundo e gradiente radial como campo contemplativo; ouro luminoso para orientação e ação; verde para a conversão final.
- **Layout:** coluna imersiva de largura estreita no centro, com barra de progresso no topo e cartões em sequência vertical.
- **Elementos característicos:** brilho dourado, linhas ornamentais, moldura de carta e constelação de pontos no fundo.
- **Interação e animação:** entradas suaves laterais, botões pulsantes, virada de carta em 3D, carregamento contínuo e revelação textual ritmada.
- **Tipografia:** Playfair Display para títulos e mensagens rituais; DM Sans para opções e instruções.
- **Essência da marca:** uma leitura guiada e imersiva para quem busca clareza sobre os próximos passos. Personalidade: acolhedora, misteriosa, direta.
- **Voz:** íntima e orientadora. Exemplos: “Não pense muito, apenas sinta.” e “A verdade está prestes a ser revelada.”
- **Wordmark:** ícone orbital dourado com uma estrela central e o nome “Leitura da Sensitiva”.
- **Cor de assinatura:** Ouro Oráculo `#f5c800`.

## Estrutura
- `src/main.tsx`: entrada React.
- `src/App.tsx`: dados do questionário, máquina de estados e componentes de tela.
- `src/styles.css`: tokens, responsividade, animações e acabamento visual.
- `public/manus-routes.json`: manifesto da rota única.
- `public/tarot_reader4.webp`: visual hero usado na referência.
- `public/card1.png` a `public/card8.png`: versos das cartas.
- `public/revealed1.png` a `public/revealed3.png`: faces reveladas na ordem da seleção.
- `plan.md` e `TODO.md`: registro de decisões e entregas.
