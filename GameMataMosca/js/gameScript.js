let altura;
let largura;
let vidas = 1;
let tempo = 10;

let criaMoscaTempo;

//RECUPERA A URL DA PÁGINA
let nivel = window.location.search;

//REMOVE O '?' DO PARÂMETRO
nivel = nivel.replace('?', '');

//APLICA OS NÍVEIS DE DIFICULDADE
if (nivel === 'larva') {
    criaMoscaTempo = 1500;
} else if (nivel === 'mosca') {
    criaMoscaTempo = 1000;
} else if (nivel === 'varejeira') {
    criaMoscaTempo = 800;
}

//DEFINE A ÁREA EM QUE AS MOSCAS APARECERÃO
function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight;
    largura = window.innerWidth;
}    
    
ajustaTamanhoPalcoJogo();

let cronometro = setInterval(function() {
    tempo--;

    if (tempo < 0) {
        clearInterval(cronometro);
        clearInterval(criaMosca);
        window.location.href = "vitoria.html";
    } else {
        document.getElementById('cronometro').innerHTML = tempo;
    }
}, 1000);

function posicaoRandomica() {
    //REMOVER MOSCA ANTERIOR
    if (document.getElementById('mosca')) {
        document.getElementById('mosca').remove();

        //VERIFICA SE AINDA EXISTEM CORAÇÕES, CASO 'FALSE' É DISPARADO O GAME OVER
        if (vidas < 3) {
            document.getElementById('coracao' + vidas).src = "images/coracao_vazio.png";
            vidas++;
        } else {
            clearInterval(cronometro);
            clearInterval(criaMosca);
            window.location.href = 'gameOver.html';
        }
        
    }

    let posicaoX = Math.floor(Math.random() * largura) - 100;
    let posicaoY = Math.floor(Math.random() * altura) - 100;
    
    //CASO POSIÇÃO SEJA NEGATIVA ELA RECEBE ZERO
    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    //CRIA ELEMENTO HTML
    let mosca = document.createElement('img');
    mosca.src = 'images/mosca.png';
    mosca.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
    mosca.style.left = posicaoX + 'px';
    mosca.style.top = posicaoY + 'px';
    mosca.style.position = 'absolute';
    mosca.id = 'mosca';
    mosca.onclick = function() {
        this.remove();
    }

    document.body.appendChild(mosca);

    tamanhoAleatorio();  
}

//GERA TAMANHOS ALEATÓRIOS DE MOSCAS
function tamanhoAleatorio() {
    let classe = Math.floor(Math.random() * 3);

    if (classe === 0) {
        return 'mosca1';
    } else if (classe === 1) {
        return 'mosca2';
    } else {
        return 'mosca3';
    }
}

//GERA A MOSCA VIRADA PRA POSIÇÕES ALEATORIAS
function ladoAleatorio() {
    let classe = Math.floor(Math.random() * 2);

    if (classe === 0) {
        return 'ladoA';
    } else {
        return 'ladoB';
    }
}