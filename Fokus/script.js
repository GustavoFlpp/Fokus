const html = document.querySelector('html'); // armazena o elemento html que no caso é a página inteira na variável html
const focoBt = document.querySelector('.app__card-button--foco'); // armazena a classe de foco na variável focoBt
const curtoBt = document.querySelector('.app__card-button--curto'); // armazena a classe do botão descanso curto
const longoBt = document.querySelector('.app__card-button--longo'); // armazena a classe do botão descanso longo
const banner = document.querySelector('.app__image'); // armazena a classe da imagem de fundo a variável banner
const titulo = document.querySelector('.app__title'); // armazena a classe do texto na variável título
const botoes = document.querySelectorAll('.app__card-button'); // armazena a classe do botão de música na variável
const startPauseBt = document.querySelector('#start-pause');

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');

let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

//  adiciona um evento, no caso esse é o click e a sintaxe sempre vai ser (elemento.addEventListener(evento, callback)
focoBt.addEventListener('click', () => {
  alterarContexto('foco'); // chamando a função alterarContexto e passando como parâmetro a classe que desejo usar
  focoBt.classList.add('active'); // chamando a variavel focoBt e utilizando o método classList para adicionar a classe 'active' do botão
});

curtoBt.addEventListener('click', () => {
  alterarContexto('descanso-curto');
  curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
  alterarContexto('descanso-longo');
  longoBt.classList.add('active');
});

function alterarContexto(contexto) {
  botoes.forEach(function (contexto) {
    contexto.classList.remove('active');
  });
  html.setAttribute('data-contexto', contexto); // faz com que a cor de fundo seja trocada
  banner.setAttribute('src', `/imagens/${contexto}.png`); // faz com que a imagem de fundo seja trocada
  switch (contexto) {
    case 'foco':
      titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case 'descanso-curto':
      titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;
    case 'descanso-longo':
      titulo.innerHTML = `Hora de voltar a superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa!</strong>`;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    zerar();
    alert('Tempo finalizado!');
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  console.log('Temporizador: ' + tempoDecorridoEmSegundos);
};

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    zerar();
    return;
  }
  intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
  clearInterval(intervaloId);
  intervaloId = null;
}
