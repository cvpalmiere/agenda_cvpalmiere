// ============================================
// AGENDA PALMIERE - SISTEMA INTELIGENTE DE ESTUDOS
// VERSÃO FINAL CORRIGIDA
// ============================================

// ============================================
// CONFIGURAÇÕES INICIAIS
// ============================================

const VERSAO = '2.0.0';
const HORAS_POR_DIA = 2.5; // 2h30

// Estado global
let estado = {
    usuario: 'Carla',
    materiaAtual: 'es',
    timerAtivo: false,
    timerTempo: 0,
    timerInterval: null,
    mesCalendario: new Date().getMonth(),
    anoCalendario: new Date().getFullYear(),
    atividadeConcluindo: null,
    checklistItens: []
};

// ============================================
// DADOS COMPLETOS (PRAZOS, PLANOS)
// ============================================

const prazos = [
    // Engenharia de Software
    { 
        id: 'es-seminario1', 
        materia: 'es', 
        tipo: 'trabalho', 
        nome: 'Seminário 01 - Métodos Ágeis', 
        data: '2026-04-14', 
        diasPrevistos: 5, 
        concluido: false,
        dataInicio: '2026-03-17'
    },
    { 
        id: 'es-prova1', 
        materia: 'es', 
        tipo: 'prova', 
        nome: '1ª Avaliação ES', 
        data: '2026-04-21', 
        diasPrevistos: 7, 
        concluido: false,
        dataInicio: '2026-03-17'
    },
    { 
        id: 'es-seminario2', 
        materia: 'es', 
        tipo: 'trabalho', 
        nome: 'Seminário 02 - Plano de Projeto', 
        data: '2026-06-09', 
        diasPrevistos: 7, 
        concluido: false,
        dataInicio: '2026-05-01'
    },
    { 
        id: 'es-prova2', 
        materia: 'es', 
        tipo: 'prova', 
        nome: '2ª Avaliação ES', 
        data: '2026-06-16', 
        diasPrevistos: 7, 
        concluido: false,
        dataInicio: '2026-05-15'
    },
    
    // Introdução à Computação
    { 
        id: 'ic-prova1', 
        materia: 'ic', 
        tipo: 'prova', 
        nome: '1ª Avaliação IC', 
        data: '2026-04-15', 
        diasPrevistos: 5, 
        concluido: false,
        dataInicio: '2026-03-17'
    },
    { 
        id: 'ic-seminario', 
        materia: 'ic', 
        tipo: 'trabalho', 
        nome: 'Seminário Tendências', 
        data: '2026-06-03', 
        diasPrevistos: 4, 
        concluido: false,
        dataInicio: '2026-05-15'
    },
    { 
        id: 'ic-prova2', 
        materia: 'ic', 
        tipo: 'prova', 
        nome: '2ª Avaliação IC', 
        data: '2026-06-10', 
        diasPrevistos: 5, 
        concluido: false,
        dataInicio: '2026-05-20'
    },
    { 
        id: 'ic-ace', 
        materia: 'ic', 
        tipo: 'entrega', 
        nome: 'Relatório ACE', 
        data: '2026-06-17', 
        diasPrevistos: 10, 
        concluido: false,
        dataInicio: '2026-04-01'
    },
    
    // Lógica de Programação
    { 
        id: 'lp-prova1', 
        materia: 'lp', 
        tipo: 'prova', 
        nome: '1ª Avaliação LP', 
        data: '2026-04-09', 
        diasPrevistos: 5, 
        concluido: false,
        dataInicio: '2026-03-17'
    },
    { 
        id: 'lp-prova2', 
        materia: 'lp', 
        tipo: 'prova', 
        nome: '2ª Avaliação LP', 
        data: '2026-05-21', 
        diasPrevistos: 5, 
        concluido: false,
        dataInicio: '2026-04-20'
    },
    { 
        id: 'lp-prova3', 
        materia: 'lp', 
        tipo: 'prova', 
        nome: '3ª Avaliação Online LP', 
        data: '2026-06-25', 
        diasPrevistos: 3, 
        concluido: false,
        dataInicio: '2026-06-01'
    },
    { 
        id: 'lp-lista', 
        materia: 'lp', 
        tipo: 'entrega', 
        nome: 'Lista de Exercícios LP', 
        data: '2026-06-25', 
        diasPrevistos: 7, 
        concluido: false,
        dataInicio: '2026-05-15'
    },
    
    // Banco de Dados
    { 
        id: 'bd-prova1', 
        materia: 'bd', 
        tipo: 'prova', 
        nome: '1ª Avaliação BD', 
        data: '2026-04-24', 
        diasPrevistos: 5, 
        concluido: false,
        dataInicio: '2026-03-17'
    },
    { 
        id: 'bd-prova2', 
        materia: 'bd', 
        tipo: 'prova', 
        nome: '2ª Avaliação BD', 
        data: '2026-06-26', 
        diasPrevistos: 5, 
        concluido: false,
        dataInicio: '2026-05-20'
    },
    
    // Bootcamp
    { 
        id: 'bootcamp-desafio1', 
        materia: 'bootcamp', 
        tipo: 'entrega', 
        nome: 'Desafio - Entrega Inicial', 
        data: '2026-04-12', 
        diasPrevistos: 10, 
        concluido: true,
        dataConclusao: '2026-03-17',
        diasGastos: 3
    },
    { 
        id: 'bootcamp-desafio2', 
        materia: 'bootcamp', 
        tipo: 'entrega', 
        nome: 'Desafio - Entrega Intermediária', 
        data: '2026-05-17', 
        diasPrevistos: 10, 
        concluido: false,
        dataInicio: '2026-04-13'
    },
    { 
        id: 'bootcamp-desafio3', 
        materia: 'bootcamp', 
        tipo: 'entrega', 
        nome: 'Desafio - Entrega Final', 
        data: '2026-06-14', 
        diasPrevistos: 10, 
        concluido: false,
        dataInicio: '2026-05-25'
    },
    { 
        id: 'bootcamp-webaula1', 
        materia: 'bootcamp', 
        tipo: 'estudo', 
        nome: 'Webaula Síncrona 01', 
        data: '2026-03-19', 
        diasPrevistos: 1, 
        concluido: false
    },
    { 
        id: 'bootcamp-webaula2', 
        materia: 'bootcamp', 
        tipo: 'estudo', 
        nome: 'Webaula Síncrona 02', 
        data: '2026-04-02', 
        diasPrevistos: 1, 
        concluido: false
    },
    { 
        id: 'bootcamp-webaula3', 
        materia: 'bootcamp', 
        tipo: 'estudo', 
        nome: 'Webaula Síncrona 03', 
        data: '2026-04-16', 
        diasPrevistos: 1, 
        concluido: false
    },
    { 
        id: 'bootcamp-webaula4', 
        materia: 'bootcamp', 
        tipo: 'estudo', 
        nome: 'Webaula Síncrona 04', 
        data: '2026-04-30', 
        diasPrevistos: 1, 
        concluido: false
    },
    { 
        id: 'bootcamp-webaula5', 
        materia: 'bootcamp', 
        tipo: 'estudo', 
        nome: 'Webaula Síncrona 05', 
        data: '2026-05-21', 
        diasPrevistos: 1, 
        concluido: false
    },
    { 
        id: 'bootcamp-webaula6', 
        materia: 'bootcamp', 
        tipo: 'estudo', 
        nome: 'Webaula Síncrona 06', 
        data: '2026-06-06', 
        diasPrevistos: 1, 
        concluido: false
    },
    
    // Fundamentos
    { 
        id: 'fund-exercicios1', 
        materia: 'fundamentos', 
        tipo: 'entrega', 
        nome: 'Exercícios Avaliativos 1 e 2', 
        data: '2026-03-29', 
        diasPrevistos: 3, 
        concluido: true,
        dataConclusao: '2026-03-17',
        diasGastos: 2
    },
    { 
        id: 'fund-sist1', 
        materia: 'fundamentos', 
        tipo: 'entrega', 
        nome: 'Sistematização 01', 
        data: '2026-04-12', 
        diasPrevistos: 7, 
        concluido: false,
        dataInicio: '2026-03-17'
    },
    { 
        id: 'fund-exercicios2', 
        materia: 'fundamentos', 
        tipo: 'entrega', 
        nome: 'Exercícios Avaliativos 3 e 4', 
        data: '2026-05-03', 
        diasPrevistos: 4, 
        concluido: false,
        dataInicio: '2026-04-13'
    },
    { 
        id: 'fund-sist2', 
        materia: 'fundamentos', 
        tipo: 'entrega', 
        nome: 'Sistematização 02', 
        data: '2026-05-31', 
        diasPrevistos: 7, 
        concluido: false,
        dataInicio: '2026-04-27'
    },
    { 
        id: 'fund-avaliacao-online', 
        materia: 'fundamentos', 
        tipo: 'prova', 
        nome: 'Avaliação Online', 
        data: '2026-06-06', 
        diasPrevistos: 3, 
        concluido: false,
        dataInicio: '2026-06-01'
    }
];

// ============================================
// PLANOS DE AULA
// ============================================

const planosAula = {
    es: [
        { data: '2026-03-17', tema: 'Identificação de Requisitos', conteudo: 'Definição de requisito; Documentos', paraCasa: 'Ler capítulo' },
        { data: '2026-03-24', tema: 'Engenharia de Requisitos', conteudo: 'Estudos de caso', paraCasa: 'Exercícios' },
        { data: '2026-03-31', tema: 'Projeto de Sistema', conteudo: 'Projeto conceitual e técnico', paraCasa: 'Ler arquitetura' },
        { data: '2026-04-07', tema: 'Projeto de Sistema', conteudo: 'Abstração, refinamento', paraCasa: 'Preparar seminário' },
        { data: '2026-04-14', tema: 'Seminário 01', conteudo: 'Apresentação', paraCasa: '' },
        { data: '2026-04-28', tema: 'Gerenciamento de Projetos', conteudo: 'Escopo, cronograma', paraCasa: 'Ler PMBOK' },
        { data: '2026-05-05', tema: 'Implementação', conteudo: 'Padrões de programação', paraCasa: 'Exercícios' },
        { data: '2026-05-12', tema: 'Testes', conteudo: 'Erro, falha, depuração', paraCasa: 'Estudar técnicas' },
        { data: '2026-05-19', tema: 'Testes', conteudo: 'Critérios de teste', paraCasa: 'Preparar PPS' },
        { data: '2026-05-26', tema: 'Implantação', conteudo: 'Ambientes', paraCasa: 'Estudar casos' },
        { data: '2026-06-02', tema: 'Manutenção', conteudo: 'Natureza da manutenção', paraCasa: 'Finalizar PPS' },
        { data: '2026-06-09', tema: 'Seminário 02', conteudo: 'Apresentação PPS', paraCasa: '' },
        { data: '2026-06-16', tema: 'Prova', conteudo: '2ª Avaliação', paraCasa: '' },
        { data: '2026-06-23', tema: 'Encerramento', conteudo: 'Feedback', paraCasa: '' }
    ],
    
    ic: [
        { data: '2026-03-18', tema: 'Arquitetura de Hardware', conteudo: 'CPU, memória, registradores', paraCasa: 'Revisar' },
        { data: '2026-03-25', tema: 'Hardware', conteudo: 'Periféricos, SO', paraCasa: 'Exercícios' },
        { data: '2026-04-01', tema: 'Informação', conteudo: 'Dado, informação, conhecimento', paraCasa: 'Ler artigos' },
        { data: '2026-04-08', tema: 'Sistemas', conteudo: 'Tipos de SI', paraCasa: 'Estudar' },
        { data: '2026-04-15', tema: 'Prova', conteudo: '1ª Avaliação', paraCasa: '' },
        { data: '2026-04-22', tema: 'Redes', conteudo: 'Histórico, topologia', paraCasa: 'Pesquisar' },
        { data: '2026-04-29', tema: 'Redes', conteudo: 'Dispositivos, arquitetura', paraCasa: 'Exercícios' },
        { data: '2026-05-06', tema: 'Segurança', conteudo: 'Conceitos, ameaças', paraCasa: 'Ler notícias' },
        { data: '2026-05-13', tema: 'Segurança', conteudo: 'Mecanismos', paraCasa: 'Estudo de caso' },
        { data: '2026-05-20', tema: 'Governança', conteudo: 'Histórico, evolução', paraCasa: 'Pesquisar' },
        { data: '2026-05-27', tema: 'Governança', conteudo: 'COBIT, ITIL', paraCasa: 'Preparar' },
        { data: '2026-06-03', tema: 'Seminário', conteudo: 'Tendências', paraCasa: 'Apresentação' },
        { data: '2026-06-10', tema: 'Prova', conteudo: '2ª Avaliação', paraCasa: '' },
        { data: '2026-06-17', tema: 'ACE', conteudo: 'Entrega', paraCasa: '' },
        { data: '2026-06-24', tema: 'Encerramento', conteudo: 'Resultados', paraCasa: '' }
    ],
    
    lp: [
        { data: '2026-03-19', tema: 'Elementos básicos', conteudo: 'Tipos, variáveis', paraCasa: 'Exercícios' },
        { data: '2026-03-26', tema: 'Condicionais', conteudo: 'if, else, switch', paraCasa: 'Praticar' },
        { data: '2026-04-02', tema: 'Repetição', conteudo: 'for, while', paraCasa: 'Exercícios' },
        { data: '2026-04-09', tema: 'Prova', conteudo: '1ª Avaliação', paraCasa: '' },
        { data: '2026-04-16', tema: 'Vetores', conteudo: 'Representação', paraCasa: 'Praticar' },
        { data: '2026-04-23', tema: 'Vetores', conteudo: 'Exercícios', paraCasa: 'Lista' },
        { data: '2026-04-30', tema: 'Matrizes', conteudo: 'Representação', paraCasa: 'Exercícios' },
        { data: '2026-05-07', tema: 'Matrizes', conteudo: 'Exercícios', paraCasa: 'Desafios' },
        { data: '2026-05-14', tema: 'Funções', conteudo: 'Escopo', paraCasa: 'Praticar' },
        { data: '2026-05-21', tema: 'Prova', conteudo: '2ª Avaliação', paraCasa: '' },
        { data: '2026-05-28', tema: 'Funções', conteudo: 'Parâmetros', paraCasa: 'Exercícios' },
        { data: '2026-06-11', tema: 'Funções', conteudo: 'Avançado', paraCasa: 'Preparar' },
        { data: '2026-06-18', tema: 'Revisão', conteudo: 'Geral', paraCasa: 'Estudar' },
        { data: '2026-06-25', tema: 'Prova', conteudo: '3ª Avaliação', paraCasa: '' },
        { data: '2026-07-02', tema: 'Revisão', conteudo: 'Final', paraCasa: '' }
    ],
    
    bd: [
        { data: '2026-03-20', tema: 'Modelagem ER', conteudo: 'Entidades, atributos', paraCasa: 'Exercícios' },
        { data: '2026-03-27', tema: 'Modelagem ER', conteudo: 'Cardinalidades', paraCasa: 'Diagramas' },
        { data: '2026-04-03', tema: 'Modelagem ER', conteudo: 'Generalização', paraCasa: 'Projetar' },
        { data: '2026-04-10', tema: 'Revisão', conteudo: 'Para prova', paraCasa: 'Estudar' },
        { data: '2026-04-24', tema: 'Prova', conteudo: '1ª Avaliação', paraCasa: '' },
        { data: '2026-05-08', tema: 'SQL', conteudo: 'DDL', paraCasa: 'Praticar' },
        { data: '2026-05-15', tema: 'SQL', conteudo: 'DML', paraCasa: 'Consultas' },
        { data: '2026-05-22', tema: 'SQL', conteudo: 'UPDATE, DELETE', paraCasa: 'Exercícios' },
        { data: '2026-05-29', tema: 'SQL', conteudo: 'ORDER BY', paraCasa: 'Consultas' },
        { data: '2026-06-05', tema: 'Multidimensional', conteudo: 'Star Schema', paraCasa: 'Estudar' },
        { data: '2026-06-12', tema: 'Revisão', conteudo: 'Para prova', paraCasa: 'Exercícios' },
        { data: '2026-06-19', tema: 'Revisão', conteudo: 'SQL', paraCasa: 'Preparar' },
        { data: '2026-06-26', tema: 'Prova', conteudo: '2ª Avaliação', paraCasa: '' },
        { data: '2026-07-03', tema: 'Encerramento', conteudo: 'Resultados', paraCasa: '' }
    ],
    
    bootcamp: [
        { data: '2026-03-19', tema: 'Webaula 01', conteudo: 'Oficina', paraCasa: 'Desafio Inicial' },
        { data: '2026-04-02', tema: 'Webaula 02', conteudo: 'Oficina', paraCasa: 'Desafio' },
        { data: '2026-04-16', tema: 'Webaula 03', conteudo: 'Oficina', paraCasa: 'Entrega' },
        { data: '2026-04-30', tema: 'Webaula 04', conteudo: 'Oficina', paraCasa: 'Desafio' },
        { data: '2026-05-21', tema: 'Webaula 05', conteudo: 'Oficina', paraCasa: 'Preparar' },
        { data: '2026-06-06', tema: 'Webaula 06', conteudo: 'Oficina', paraCasa: 'Entrega' }
    ],
    
    fundamentos: [
        { data: '2026-03-19', tema: 'Webconferência 01', conteudo: 'Unidades 1 e 2', paraCasa: 'Exercícios' },
        { data: '2026-03-26', tema: 'EncONtro 01', conteudo: 'Discussão', paraCasa: 'Sistematização' },
        { data: '2026-04-09', tema: 'Webrevisão 01', conteudo: 'Revisão', paraCasa: 'Estudar' },
        { data: '2026-04-13', tema: 'Prova', conteudo: 'Avaliação', paraCasa: '' },
        { data: '2026-04-23', tema: 'EncONtro 02', conteudo: 'Discussão', paraCasa: 'Exercícios' },
        { data: '2026-05-07', tema: 'Webconferência 02', conteudo: 'Unidades 3 e 4', paraCasa: 'Sistematização' },
        { data: '2026-05-28', tema: 'Webrevisão 02', conteudo: 'Revisão', paraCasa: 'Avaliação' },
        { data: '2026-06-01', tema: 'Avaliação Online', conteudo: 'Unidades 3 e 4', paraCasa: '' }
    ]
};

// ============================================
// CURSOS EXTRAS
// ============================================

const cursosExtras = [
    { id: 'python', nome: 'Python Santander', horas: 30, concluido: false },
    { id: 'html', nome: 'HTML Coddy', horas: 15, concluido: false }
];

// ============================================
// NOTAS
// ============================================

let notas = [];

// ============================================
// FUNÇÕES DE INICIALIZAÇÃO
// ============================================

function inicializarSistema() {
    try {
        carregarDados();
        inicializarData();
        inicializarNavegacao();
        inicializarEventListeners();
        atualizarInterface();
        verificarVersao();
        
        mostrarToast('Bem-vinda, Carla! 🎉', 'success');
    } catch (erro) {
        console.error('Erro na inicialização:', erro);
        mostrarToast('Erro ao iniciar o sistema', 'error');
    }
}

function carregarDados() {
    try {
        const notasSalvas = localStorage.getItem('agenda_notas');
        if (notasSalvas) {
            notas = JSON.parse(notasSalvas);
        }
        
        const prazosSalvos = localStorage.getItem('agenda_prazos');
        if (prazosSalvos) {
            const prazosAtualizados = JSON.parse(prazosSalvos);
            for (let i = 0; i < prazos.length; i++) {
                const atualizado = prazosAtualizados.find(p => p.id === prazos[i].id);
                if (atualizado) {
                    prazos[i] = { ...prazos[i], ...atualizado };
                }
            }
        }
        
        const checklistSalvo = localStorage.getItem('agenda_checklist');
        if (checklistSalvo) {
            estado.checklistItens = JSON.parse(checklistSalvo);
        }
    } catch (erro) {
        console.error('Erro ao carregar dados:', erro);
        mostrarToast('Erro ao carregar dados salvos', 'error');
    }
}

function inicializarData() {
    atualizarDataHora();
    setInterval(atualizarDataHora, 60000);
}

function atualizarDataHora() {
    try {
        const agora = new Date();
        
        const elementoData = document.getElementById('data-hoje');
        if (elementoData) {
            const opcoes = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            elementoData.querySelector('span').textContent = agora.toLocaleDateString('pt-BR', opcoes);
        }
    } catch (erro) {
        console.error('Erro ao atualizar data:', erro);
    }
}

function inicializarNavegacao() {
    try {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                document.querySelectorAll('.tab-pane').forEach(tab => tab.classList.remove('active'));
                const tabElement = document.getElementById(`tab-${tabId}`);
                if (tabElement) {
                    tabElement.classList.add('active');
                }
            });
        });
    } catch (erro) {
        console.error('Erro na navegação:', erro);
    }
}

function inicializarEventListeners() {
    try {
        // Login
        const btnLogin = document.getElementById('btn-login');
        if (btnLogin) btnLogin.addEventListener('click', fazerLogin);
        
        // Sair
        const btnSair = document.getElementById('btn-sair');
        if (btnSair) btnSair.addEventListener('click', fazerLogout);
        
        // Timer
        const btnIniciar = document.getElementById('btn-timer-iniciar');
        if (btnIniciar) btnIniciar.addEventListener('click', iniciarTimer);
        
        const btnPausar = document.getElementById('btn-timer-pausar');
        if (btnPausar) btnPausar.addEventListener('click', pausarTimer);
        
        const btnZerar = document.getElementById('btn-timer-zerar');
        if (btnZerar) btnZerar.addEventListener('click', zerarTimer);
        
        // Checklist
        const btnResetar = document.getElementById('btn-checklist-resetar');
        if (btnResetar) btnResetar.addEventListener('click', resetarChecklistDiario);
        
        // Notas
        const btnNovaNota = document.getElementById('btn-nova-nota');
        if (btnNovaNota) btnNovaNota.addEventListener('click', criarNovaNota);
        
        const buscaNotas = document.getElementById('notas-busca');
        if (buscaNotas) buscaNotas.addEventListener('input', buscarNotas);
        
        document.querySelectorAll('.materia-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.materia-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                estado.materiaAtual = tab.dataset.materia;
                renderizarNotas();
            });
        });
        
        // Prazos
        document.querySelectorAll('.filtro-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderizarPrazos(btn.dataset.filtro);
            });
        });
        
        // Calendário
        const btnMesAnt = document.getElementById('mes-anterior');
        if (btnMesAnt) btnMesAnt.addEventListener('click', mesAnterior);
        
        const btnProxMes = document.getElementById('proximo-mes');
        if (btnProxMes) btnProxMes.addEventListener('click', proximoMes);
        
        // Planos
        document.querySelectorAll('.plano-card').forEach(card => {
            card.addEventListener('click', () => {
                const materia = card.dataset.materia;
                mostrarPlanoAula(materia);
            });
        });
        
        // Modais
        const btnCancelarModal = document.getElementById('btn-cancelar-modal');
        if (btnCancelarModal) btnCancelarModal.addEventListener('click', fecharModal);
        
        const btnConfirmar = document.getElementById('btn-confirmar-conclusao');
        if (btnConfirmar) btnConfirmar.addEventListener('click', confirmarConclusao);
        
        const btnCancelarNota = document.getElementById('btn-cancelar-nota');
        if (btnCancelarNota) btnCancelarNota.addEventListener('click', fecharModalNota);
        
        const btnSalvarNota = document.getElementById('btn-salvar-nota');
        if (btnSalvarNota) btnSalvarNota.addEventListener('click', salvarNota);
        
        const btnFecharEvento = document.getElementById('btn-fechar-evento');
        if (btnFecharEvento) btnFecharEvento.addEventListener('click', fecharModalEvento);
        
        // Enter no login
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const loginContainer = document.getElementById('login-container');
                if (loginContainer && loginContainer.style.display !== 'none') {
                    fazerLogin();
                }
            }
        });
        
    } catch (erro) {
        console.error('Erro ao inicializar eventos:', erro);
    }
}

function verificarVersao() {
    try {
        const versaoSalva = localStorage.getItem('agenda_versao');
        if (versaoSalva !== VERSAO) {
            localStorage.setItem('agenda_versao', VERSAO);
        }
    } catch (erro) {
        console.error('Erro ao verificar versão:', erro);
    }
}

// ============================================
// FUNÇÕES DE LOGIN/LOGOUT
// ============================================

function fazerLogin() {
    try {
        const usuario = document.getElementById('login-usuario').value;
        const senha = document.getElementById('login-senha').value;
        
        if (usuario === 'Carla' && senha === 'Cacau') {
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('app-container').style.display = 'block';
            inicializarSistema();
        } else {
            document.getElementById('login-erro').style.display = 'block';
        }
    } catch (erro) {
        console.error('Erro no login:', erro);
    }
}

function fazerLogout() {
    try {
        document.getElementById('login-container').style.display = 'flex';
        document.getElementById('app-container').style.display = 'none';
        
        if (estado.timerAtivo) {
            pausarTimer();
        }
        
        zerarTimer();
        
        document.getElementById('login-usuario').value = '';
        document.getElementById('login-senha').value = '';
        document.getElementById('login-erro').style.display = 'none';
    } catch (erro) {
        console.error('Erro no logout:', erro);
    }
}

// ============================================
// FUNÇÕES DE INTERFACE
// ============================================

function atualizarInterface() {
    try {
        renderizarPrazosUrgentes();
        renderizarGradeDia();
        renderizarSugestoes();
        renderizarChecklist();
        renderizarPrazos('todos');
        renderizarCalendario();
        renderizarProgresso();
        renderizarNotas();
        atualizarEstatisticasNotas();
    } catch (erro) {
        console.error('Erro ao atualizar interface:', erro);
    }
}

function renderizarPrazosUrgentes() {
    try {
        const container = document.getElementById('urgentes-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        const hoje = new Date();
        const prazosProximos = prazos
            .filter(p => !p.concluido)
            .map(p => {
                const dataPrazo = new Date(p.data + 'T12:00:00');
                const diasRestantes = Math.ceil((dataPrazo - hoje) / (1000 * 60 * 60 * 24));
                return { ...p, diasRestantes };
            })
            .filter(p => p.diasRestantes <= 14 && p.diasRestantes > 0)
            .sort((a, b) => a.diasRestantes - b.diasRestantes)
            .slice(0, 3);
        
        if (prazosProximos.length === 0) {
            container.innerHTML = '<p class="text-muted">Nenhum prazo urgente</p>';
            return;
        }
        
        prazosProximos.forEach(prazo => {
            const card = document.createElement('div');
            card.className = `urgent-card ${prazo.tipo}`;
            card.onclick = () => abrirModalConclusao(prazo.id);
            
            let icone = 'fa-calendar';
            if (prazo.tipo === 'prova') icone = 'fa-file-alt';
            else if (prazo.tipo === 'trabalho') icone = 'fa-users';
            else if (prazo.tipo === 'entrega') icone = 'fa-upload';
            
            card.innerHTML = `
                <div class="urgent-icon"><i class="fas ${icone}"></i></div>
                <div class="urgent-info">
                    <h4>${prazo.nome}</h4>
                    <p>${getNomeMateria(prazo.materia)}</p>
                    <div class="dias">${prazo.diasRestantes} dias</div>
                </div>
            `;
            
            container.appendChild(card);
        });
    } catch (erro) {
        console.error('Erro ao renderizar prazos urgentes:', erro);
    }
}

function renderizarGradeDia() {
    try {
        const hoje = new Date();
        const diaSemana = hoje.getDay();
        
        const periodoManha = document.getElementById('periodo-manha');
        const periodoTarde = document.getElementById('periodo-tarde');
        const periodoNoite = document.getElementById('periodo-noite');
        
        if (!periodoManha || !periodoTarde || !periodoNoite) return;
        
        if (diaSemana === 0 || diaSemana === 6) {
            periodoManha.innerHTML = '<div class="off-day">🚫 Dia de descanso</div>';
            periodoTarde.innerHTML = '<div class="off-day">🚫 Dia de descanso</div>';
            periodoNoite.innerHTML = '<div class="off-day">🚫 Dia de descanso</div>';
            return;
        }
        
        periodoManha.innerHTML = '';
        periodoTarde.innerHTML = '';
        periodoNoite.innerHTML = '';
        
        const materiaManha = getMateriaManha(diaSemana);
        if (materiaManha) {
            periodoManha.appendChild(criarAtividadeElemento(materiaManha, 'Pré-aula', 'Estudar conteúdo da tarde'));
        }
        
        const materiaTarde = getMateriaTarde(diaSemana);
        if (materiaTarde) {
            periodoTarde.appendChild(criarAtividadeElemento(materiaTarde, 'Aula', 'Aula presencial', true));
        }
        
        periodoNoite.appendChild(criarAtividadeElemento('extras', 'Curso Extra', 'Python ou HTML', false));
        
    } catch (erro) {
        console.error('Erro ao renderizar grade:', erro);
    }
}

function criarAtividadeElemento(materia, titulo, descricao, isAula = false) {
    const div = document.createElement('div');
    div.className = `atividade-item ${materia}`;
    
    const nomes = {
        es: 'Eng. Software',
        ic: 'Intro. Computação',
        lp: 'Lógica Prog.',
        bd: 'Banco Dados',
        bootcamp: 'Bootcamp',
        fundamentos: 'Fundamentos',
        extras: 'Cursos Extras'
    };
    
    div.innerHTML = `
        <div class="atividade-info">
            <h4>${nomes[materia] || materia}</h4>
            <p><strong>${titulo}</strong> - ${descricao}</p>
        </div>
        ${!isAula && materia !== 'extras' ? '<button class="btn-concluir" onclick="abrirModalConclusao(\'' + materia + '\')"><i class="fas fa-check"></i></button>' : ''}
    `;
    
    return div;
}

function renderizarSugestoes() {
    try {
        const container = document.getElementById('sugestoes-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        const hoje = new Date();
        const prazosPendentes = prazos
            .filter(p => !p.concluido)
            .sort((a, b) => new Date(a.data) - new Date(b.data))
            .slice(0, 3);
        
        prazosPendentes.forEach(prazo => {
            const div = document.createElement('div');
            div.className = `suggestion-item ${prazo.materia}`;
            
            const diasAte = Math.ceil((new Date(prazo.data + 'T12:00:00') - hoje) / (1000 * 60 * 60 * 24));
            
            div.innerHTML = `
                <div>
                    <h4>${prazo.nome}</h4>
                    <p>${getNomeMateria(prazo.materia)} • ${diasAte} dias</p>
                </div>
                <button class="btn-concluir" onclick="abrirModalConclusao('${prazo.id}')">✓</button>
            `;
            
            container.appendChild(div);
        });
    } catch (erro) {
        console.error('Erro ao renderizar sugestões:', erro);
    }
}

// ============================================
// FUNÇÕES DE CHECKLIST
// ============================================

function renderizarChecklist() {
    try {
        const container = document.getElementById('checklist-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        const hoje = new Date();
        const diaSemana = hoje.getDay();
        const dataStr = hoje.toISOString().split('T')[0];
        
        if (diaSemana === 0 || diaSemana === 6) {
            container.innerHTML = '<p class="text-muted">Dia de descanso</p>';
            document.getElementById('checklist-progress').textContent = '0/0';
            return;
        }
        
        const itens = [
            { id: `check-manha-${dataStr}`, materia: getMateriaManha(diaSemana), titulo: 'Estudo matinal (pré-aula)' },
            { id: `check-tarde-${dataStr}`, materia: getMateriaTarde(diaSemana), titulo: 'Aula presencial' },
            { id: `check-noite-${dataStr}`, materia: 'extras', titulo: 'Curso extra' }
        ].filter(item => item.materia);
        
        const concluidos = itens.filter(item => estado.checklistItens.includes(item.id)).length;
        document.getElementById('checklist-progress').textContent = `${concluidos}/${itens.length}`;
        
        itens.forEach(item => {
            const div = document.createElement('div');
            div.className = `checklist-item ${estado.checklistItens.includes(item.id) ? 'concluido' : ''}`;
            
            div.innerHTML = `
                <div class="checklist-checkbox ${estado.checklistItens.includes(item.id) ? 'checked' : ''}" onclick="toggleChecklistItem('${item.id}')">
                    ${estado.checklistItens.includes(item.id) ? '<i class="fas fa-check"></i>' : ''}
                </div>
                <div class="checklist-info">
                    <h4>${item.titulo}</h4>
                    <p>${getNomeMateria(item.materia)}</p>
                </div>
                <span class="checklist-materia ${item.materia}">${item.materia}</span>
            `;
            
            container.appendChild(div);
        });
        
    } catch (erro) {
        console.error('Erro ao renderizar checklist:', erro);
    }
}

function toggleChecklistItem(itemId) {
    try {
        if (!estado.checklistItens) {
            estado.checklistItens = [];
        }
        
        const index = estado.checklistItens.indexOf(itemId);
        if (index === -1) {
            estado.checklistItens.push(itemId);
            mostrarToast('✅ Tarefa concluída', 'success');
        } else {
            estado.checklistItens.splice(index, 1);
            mostrarToast('Tarefa desmarcada', 'info');
        }
        
        localStorage.setItem('agenda_checklist', JSON.stringify(estado.checklistItens));
        renderizarChecklist();
    } catch (erro) {
        console.error('Erro ao alternar checklist:', erro);
    }
}

function resetarChecklistDiario() {
    try {
        if (confirm('Resetar checklist de hoje?')) {
            estado.checklistItens = [];
            localStorage.setItem('agenda_checklist', JSON.stringify(estado.checklistItens));
            renderizarChecklist();
            mostrarToast('Checklist resetado', 'info');
        }
    } catch (erro) {
        console.error('Erro ao resetar checklist:', erro);
    }
}

// ============================================
// FUNÇÕES DE PRAZOS
// ============================================

function renderizarPrazos(filtro = 'todos') {
    try {
        const container = document.getElementById('prazos-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        const hoje = new Date();
        const prazosFiltrados = prazos
            .filter(p => filtro === 'todos' || p.tipo === filtro)
            .sort((a, b) => new Date(a.data) - new Date(b.data));
        
        document.getElementById('total-prazos').textContent = prazos.length;
        document.getElementById('prazos-concluidos').textContent = prazos.filter(p => p.concluido).length;
        document.getElementById('prazos-pendentes').textContent = prazos.filter(p => !p.concluido).length;
        
        prazosFiltrados.forEach(prazo => {
            const div = document.createElement('div');
            div.className = `prazo-item ${prazo.tipo} ${prazo.concluido ? 'concluido' : ''}`;
            
            const dataPrazo = new Date(prazo.data + 'T12:00:00');
            const diasRestantes = Math.ceil((dataPrazo - hoje) / (1000 * 60 * 60 * 24));
            
            let classeDias = 'tranquilo';
            if (diasRestantes <= 7) classeDias = 'urgente';
            else if (diasRestantes <= 14) classeDias = 'atencao';
            
            let icone = 'fa-calendar';
            if (prazo.tipo === 'prova') icone = 'fa-file-alt';
            else if (prazo.tipo === 'trabalho') icone = 'fa-users';
            else if (prazo.tipo === 'entrega') icone = 'fa-upload';
            
            div.innerHTML = `
                <div class="prazo-icon ${prazo.tipo}"><i class="fas ${icone}"></i></div>
                <div class="prazo-info">
                    <h4>${prazo.nome} ${prazo.concluido ? '✅' : ''}</h4>
                    <p>${getNomeMateria(prazo.materia)}</p>
                </div>
                <div class="prazo-data"><i class="far fa-calendar"></i> ${formatarData(prazo.data)}</div>
                ${!prazo.concluido ? `<div class="prazo-dias ${classeDias}">${diasRestantes}d</div>` : ''}
                ${!prazo.concluido ? `<button class="btn-concluir-pequeno" onclick="abrirModalConclusao('${prazo.id}')"><i class="fas fa-check"></i></button>` : ''}
            `;
            
            container.appendChild(div);
        });
        
    } catch (erro) {
        console.error('Erro ao renderizar prazos:', erro);
    }
}

// ============================================
// FUNÇÕES DE CALENDÁRIO
// ============================================

function renderizarCalendario() {
    try {
        const grid = document.getElementById('calendario-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        const primeiroDia = new Date(estado.anoCalendario, estado.mesCalendario, 1);
        const ultimoDia = new Date(estado.anoCalendario, estado.mesCalendario + 1, 0);
        const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        
        diasSemana.forEach(dia => {
            const div = document.createElement('div');
            div.className = 'calendario-dia-semana';
            div.textContent = dia;
            grid.appendChild(div);
        });
        
        for (let i = 0; i < primeiroDia.getDay(); i++) {
            const div = document.createElement('div');
            div.className = 'calendario-dia outro-mes';
            grid.appendChild(div);
        }
        
        const hoje = new Date();
        
        for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
            const div = document.createElement('div');
            div.className = 'calendario-dia';
            div.onclick = () => verEventosDoDia(dia);
            
            const dataAtual = new Date(estado.anoCalendario, estado.mesCalendario, dia);
            if (dataAtual.toDateString() === hoje.toDateString()) {
                div.classList.add('hoje');
            }
            
            div.innerHTML = `<span class="dia-numero">${dia}</span>`;
            
            const dataStr = `${estado.anoCalendario}-${String(estado.mesCalendario + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
            const eventos = prazos.filter(p => p.data === dataStr && !p.concluido);
            
            if (eventos.length > 0) {
                const eventosDiv = document.createElement('div');
                eventosDiv.className = 'dia-eventos';
                eventos.forEach(e => {
                    const indicador = document.createElement('span');
                    indicador.className = `evento-indicador ${e.tipo}`;
                    eventosDiv.appendChild(indicador);
                });
                div.appendChild(eventosDiv);
            }
            
            grid.appendChild(div);
        }
        
        const mesAnoEl = document.getElementById('mes-ano');
        if (mesAnoEl) {
            mesAnoEl.textContent = new Date(estado.anoCalendario, estado.mesCalendario).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
        }
        
    } catch (erro) {
        console.error('Erro ao renderizar calendário:', erro);
    }
}

function verEventosDoDia(dia) {
    try {
        const dataStr = `${estado.anoCalendario}-${String(estado.mesCalendario + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        const eventos = prazos.filter(p => p.data === dataStr && !p.concluido);
        
        if (eventos.length === 0) {
            mostrarToast('Nenhum evento neste dia', 'info');
            return;
        }
        
        const titulo = document.querySelector('#modal-evento-titulo span');
        if (titulo) titulo.textContent = formatarData(dataStr);
        
        const lista = document.getElementById('modal-evento-lista');
        lista.innerHTML = '';
        
        eventos.forEach(e => {
            const div = document.createElement('div');
            div.className = 'evento-item';
            div.innerHTML = `
                <span class="evento-cor ${e.tipo}"></span>
                <span class="evento-nome">${e.nome}</span>
                <span class="evento-materia">${getNomeMateria(e.materia)}</span>
            `;
            lista.appendChild(div);
        });
        
        document.getElementById('modal-evento').classList.add('active');
        
    } catch (erro) {
        console.error('Erro ao ver eventos:', erro);
    }
}

function fecharModalEvento() {
    document.getElementById('modal-evento').classList.remove('active');
}

function mesAnterior() {
    if (estado.mesCalendario === 0) {
        estado.mesCalendario = 11;
        estado.anoCalendario--;
    } else {
        estado.mesCalendario--;
    }
    renderizarCalendario();
}

function proximoMes() {
    if (estado.mesCalendario === 11) {
        estado.mesCalendario = 0;
        estado.anoCalendario++;
    } else {
        estado.mesCalendario++;
    }
    renderizarCalendario();
}

// ============================================
// FUNÇÕES DE NOTAS
// ============================================

function renderizarNotas() {
    try {
        const container = document.getElementById('notas-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        const busca = document.getElementById('notas-busca')?.value.toLowerCase() || '';
        let notasFiltradas = notas.filter(n => n.materia === estado.materiaAtual);
        
        if (busca) {
            notasFiltradas = notasFiltradas.filter(n => 
                n.titulo?.toLowerCase().includes(busca) || 
                n.conteudo?.toLowerCase().includes(busca)
            );
        }
        
        const fixadas = notasFiltradas.filter(n => n.fixada);
        const normais = notasFiltradas.filter(n => !n.fixada);
        
        const fixadasGrid = document.getElementById('fixadas-grid');
        if (fixadasGrid) {
            fixadasGrid.innerHTML = '';
            fixadas.forEach(nota => criarElementoNota(nota, fixadasGrid));
        }
        
        normais.sort((a, b) => new Date(b.data) - new Date(a.data));
        normais.forEach(nota => criarElementoNota(nota, container));
        
        if (notasFiltradas.length === 0) {
            container.innerHTML = '<p class="text-muted">Nenhuma nota</p>';
        }
        
    } catch (erro) {
        console.error('Erro ao renderizar notas:', erro);
    }
}

function criarElementoNota(nota, container) {
    const div = document.createElement('div');
    div.className = `nota-item ${nota.fixada ? 'fixada' : ''}`;
    div.dataset.materia = nota.materia;
    
    div.innerHTML = `
        <div class="nota-header">
            <span class="nota-data">${formatarData(nota.data)}</span>
            <div class="nota-acoes">
                <button onclick="fixarNota('${nota.id}')"><i class="fas fa-thumbtack" style="color: ${nota.fixada ? 'var(--dourado)' : 'inherit'}"></i></button>
                <button onclick="editarNota('${nota.id}')"><i class="fas fa-edit"></i></button>
                <button onclick="excluirNota('${nota.id}')"><i class="fas fa-trash"></i></button>
            </div>
        </div>
        <div class="nota-titulo">${nota.titulo || 'Sem título'}</div>
        <div class="nota-conteudo">${(nota.conteudo || '').replace(/\n/g, '<br>')}</div>
        <div class="nota-tags">
            ${nota.tags ? nota.tags.map(t => `<span class="nota-tag">#${t}</span>`).join('') : ''}
        </div>
    `;
    
    container.appendChild(div);
}

function atualizarEstatisticasNotas() {
    try {
        document.getElementById('total-notas').textContent = notas.length;
    } catch (erro) {
        console.error('Erro ao atualizar estatísticas:', erro);
    }
}

function buscarNotas() {
    renderizarNotas();
}

function fixarNota(id) {
    try {
        const nota = notas.find(n => n.id === id);
        if (nota) {
            nota.fixada = !nota.fixada;
            localStorage.setItem('agenda_notas', JSON.stringify(notas));
            renderizarNotas();
            mostrarToast(nota.fixada ? 'Nota fixada' : 'Nota desafixada', 'success');
        }
    } catch (erro) {
        console.error('Erro ao fixar nota:', erro);
    }
}

function criarNovaNota() {
    try {
        document.getElementById('nota-materia').value = estado.materiaAtual;
        document.getElementById('nota-titulo').value = '';
        document.getElementById('nota-conteudo').value = '';
        document.getElementById('nota-tags').value = '';
        document.getElementById('nota-fixada').checked = false;
        document.getElementById('modal-nota').classList.add('active');
    } catch (erro) {
        console.error('Erro ao criar nota:', erro);
    }
}

function salvarNota() {
    try {
        const materia = document.getElementById('nota-materia').value;
        const titulo = document.getElementById('nota-titulo').value;
        const conteudo = document.getElementById('nota-conteudo').value;
        const tagsInput = document.getElementById('nota-tags').value;
        const fixada = document.getElementById('nota-fixada').checked;
        
        if (!titulo || !conteudo) {
            mostrarToast('Preencha título e conteúdo', 'error');
            return;
        }
        
        const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t);
        
        const novaNota = {
            id: Date.now().toString(),
            materia,
            titulo,
            conteudo,
            tags,
            fixada,
            data: new Date().toISOString().split('T')[0]
        };
        
        notas.push(novaNota);
        localStorage.setItem('agenda_notas', JSON.stringify(notas));
        
        fecharModalNota();
        renderizarNotas();
        atualizarEstatisticasNotas();
        mostrarToast('Nota salva', 'success');
        
    } catch (erro) {
        console.error('Erro ao salvar nota:', erro);
        mostrarToast('Erro ao salvar', 'error');
    }
}

function editarNota(id) {
    try {
        const nota = notas.find(n => n.id === id);
        if (!nota) return;
        
        document.getElementById('nota-materia').value = nota.materia;
        document.getElementById('nota-titulo').value = nota.titulo;
        document.getElementById('nota-conteudo').value = nota.conteudo;
        document.getElementById('nota-tags').value = nota.tags ? nota.tags.join(', ') : '';
        document.getElementById('nota-fixada').checked = nota.fixada || false;
        
        const index = notas.findIndex(n => n.id === id);
        if (index !== -1) notas.splice(index, 1);
        
        document.getElementById('modal-nota').classList.add('active');
        
    } catch (erro) {
        console.error('Erro ao editar nota:', erro);
    }
}

function excluirNota(id) {
    try {
        if (!confirm('Excluir nota?')) return;
        
        const index = notas.findIndex(n => n.id === id);
        if (index !== -1) {
            notas.splice(index, 1);
            localStorage.setItem('agenda_notas', JSON.stringify(notas));
            renderizarNotas();
            atualizarEstatisticasNotas();
            mostrarToast('Nota excluída', 'success');
        }
    } catch (erro) {
        console.error('Erro ao excluir nota:', erro);
    }
}

function fecharModalNota() {
    document.getElementById('modal-nota').classList.remove('active');
}

// ============================================
// FUNÇÕES DE CONCLUSÃO
// ============================================

function abrirModalConclusao(atividadeId) {
    try {
        let atividade = prazos.find(p => p.id === atividadeId);
        
        if (!atividade) {
            atividade = {
                id: atividadeId,
                nome: `Estudo de ${getNomeMateria(atividadeId)}`,
                diasPrevistos: 1
            };
        }
        
        estado.atividadeConcluindo = atividade;
        document.getElementById('modal-atividade-nome').textContent = atividade.nome;
        document.getElementById('modal-concluir').classList.add('active');
        
    } catch (erro) {
        console.error('Erro ao abrir modal:', erro);
    }
}

function fecharModal() {
    document.getElementById('modal-concluir').classList.remove('active');
}

function confirmarConclusao() {
    try {
        const radios = document.querySelectorAll('input[name="dias-gastos"]');
        let diasGastos = 1;
        
        for (const radio of radios) {
            if (radio.checked) {
                diasGastos = parseInt(radio.value);
                break;
            }
        }
        
        const anotacoes = document.getElementById('anotacoes-conclusao').value;
        const diasPrevistos = estado.atividadeConcluindo.diasPrevistos || 1;
        const diasGanhos = Math.max(0, diasPrevistos - diasGastos);
        
        const index = prazos.findIndex(p => p.id === estado.atividadeConcluindo.id);
        if (index !== -1) {
            prazos[index].concluido = true;
            prazos[index].dataConclusao = new Date().toISOString().split('T')[0];
            prazos[index].diasGastos = diasGastos;
            prazos[index].anotacoes = anotacoes;
            localStorage.setItem('agenda_prazos', JSON.stringify(prazos));
        }
        
        fecharModal();
        
        if (diasGanhos > 0) {
            reorganizarEstudos(estado.atividadeConcluindo, diasGanhos);
            mostrarToast(`🎉 Ganhou ${diasGanhos} dias extras!`, 'success');
        } else {
            mostrarToast('Atividade concluída!', 'success');
        }
        
        atualizarInterface();
        
    } catch (erro) {
        console.error('Erro ao confirmar conclusão:', erro);
        mostrarToast('Erro ao concluir', 'error');
    }
}

function reorganizarEstudos(atividade, diasGanhos) {
    try {
        const hoje = new Date();
        let diasRestantes = diasGanhos;
        
        const provasProximas = prazos
            .filter(p => p.tipo === 'prova' && !p.concluido)
            .map(p => {
                const diasAte = Math.ceil((new Date(p.data + 'T12:00:00') - hoje) / (1000 * 60 * 60 * 24));
                return { ...p, diasAte };
            })
            .filter(p => p.diasAte <= 14 && p.diasAte > 0)
            .sort((a, b) => a.diasAte - b.diasAte);
        
        const cursos = ['Python Santander', 'HTML Coddy'];
        
        for (let i = 0; i < diasGanhos; i++) {
            const data = new Date(hoje);
            data.setDate(data.getDate() + i + 1);
            
            if (data.getDay() !== 0 && data.getDay() !== 6) {
                const evento = {
                    id: `extra-${Date.now()}-${i}`,
                    materia: 'extras',
                    tipo: 'estudo',
                    nome: i % 2 === 0 ? cursos[0] : cursos[1],
                    data: data.toISOString().split('T')[0],
                    diasPrevistos: 1,
                    concluido: false
                };
                prazos.push(evento);
            }
        }
        
        localStorage.setItem('agenda_prazos', JSON.stringify(prazos));
        
    } catch (erro) {
        console.error('Erro ao reorganizar:', erro);
    }
}

// ============================================
// FUNÇÕES DE TIMER
// ============================================

function iniciarTimer() {
    try {
        if (estado.timerAtivo) return;
        
        estado.timerAtivo = true;
        estado.timerInterval = setInterval(() => {
            estado.timerTempo++;
            
            const horas = estado.timerTempo / 3600;
            const progresso = (horas / HORAS_POR_DIA) * 100;
            
            const progressoEl = document.getElementById('timer-progresso');
            if (progressoEl) progressoEl.style.width = `${Math.min(progresso, 100)}%`;
            
            const displayEl = document.getElementById('timer-display');
            if (displayEl) {
                const h = Math.floor(estado.timerTempo / 3600);
                const m = Math.floor((estado.timerTempo % 3600) / 60);
                displayEl.textContent = `${h}h${m < 10 ? '0' : ''}${m}`;
            }
            
            if (horas >= HORAS_POR_DIA) {
                pausarTimer();
                mostrarToast('🎉 Meta diária atingida!', 'success');
            }
        }, 1000);
        
    } catch (erro) {
        console.error('Erro no timer:', erro);
    }
}

function pausarTimer() {
    estado.timerAtivo = false;
    if (estado.timerInterval) {
        clearInterval(estado.timerInterval);
    }
}

function zerarTimer() {
    pausarTimer();
    estado.timerTempo = 0;
    const progressoEl = document.getElementById('timer-progresso');
    if (progressoEl) progressoEl.style.width = '0%';
    const displayEl = document.getElementById('timer-display');
    if (displayEl) displayEl.textContent = '0h00';
}

// ============================================
// FUNÇÕES DE PLANOS
// ============================================

function mostrarPlanoAula(materia) {
    try {
        const titulo = document.getElementById('plano-titulo');
        const tabela = document.getElementById('plano-tabela');
        
        if (titulo) titulo.textContent = `Plano - ${getNomeMateria(materia)}`;
        
        if (tabela && planosAula[materia]) {
            tabela.innerHTML = '';
            
            const table = document.createElement('table');
            table.className = 'tabela-planos';
            table.innerHTML = `
                <thead><tr><th>Data</th><th>Tema</th><th>Conteúdo</th><th>Preparação</th></tr></thead>
                <tbody id="tabela-corpo"></tbody>
            `;
            
            const tbody = table.querySelector('#tabela-corpo');
            
            planosAula[materia].forEach(aula => {
                const tr = document.createElement('tr');
                const dataObj = new Date(aula.data + 'T12:00:00');
                const dataStr = dataObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
                
                tr.innerHTML = `
                    <td>${dataStr}</td>
                    <td><strong>${aula.tema}</strong></td>
                    <td>${aula.conteudo}</td>
                    <td>${aula.paraCasa || '-'}</td>
                `;
                tbody.appendChild(tr);
            });
            
            tabela.appendChild(table);
        }
    } catch (erro) {
        console.error('Erro ao mostrar plano:', erro);
    }
}

// ============================================
// FUNÇÕES DE PROGRESSO
// ============================================

function renderizarProgresso() {
    try {
        const materias = ['es', 'ic', 'lp', 'bd', 'bootcamp', 'fundamentos'];
        const container = document.getElementById('cards-progresso');
        if (!container) return;
        
        container.innerHTML = '';
        
        materias.forEach(materia => {
            const prazosMateria = prazos.filter(p => p.materia === materia);
            const concluidos = prazosMateria.filter(p => p.concluido).length;
            const total = prazosMateria.length;
            const progresso = total > 0 ? Math.round((concluidos / total) * 100) : 0;
            
            const div = document.createElement('div');
            div.className = 'card-resumo';
            div.innerHTML = `
                <div class="resumo-icon ${materia}-icon">${getIconeMateria(materia)}</div>
                <div>
                    <h4>${getSiglaMateria(materia)}</h4>
                    <span class="resumo-valor">${progresso}%</span>
                </div>
            `;
            container.appendChild(div);
        });
        
        desenharGraficoBarras();
        
    } catch (erro) {
        console.error('Erro ao renderizar progresso:', erro);
    }
}

function getIconeMateria(materia) {
    const icones = {
        es: '🔧',
        ic: '💻',
        lp: '🐍',
        bd: '🗄️',
        bootcamp: '🚀',
        fundamentos: '📐'
    };
    return icones[materia] || '📚';
}

function getSiglaMateria(materia) {
    const siglas = {
        es: 'ES',
        ic: 'IC',
        lp: 'LP',
        bd: 'BD',
        bootcamp: 'BC',
        fundamentos: 'FD'
    };
    return siglas[materia] || materia;
}

function desenharGraficoBarras() {
    try {
        const canvas = document.getElementById('grafico-barras');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const dados = [
            { cor: '#f97316', horas: 25 },
            { cor: '#3b82f6', horas: 20 },
            { cor: '#10b981', horas: 30 },
            { cor: '#8b5cf6', horas: 15 },
            { cor: '#ec4899', horas: 5 },
            { cor: '#64748b', horas: 5 }
        ];
        
        const siglas = ['ES', 'IC', 'LP', 'BD', 'BC', 'FD'];
        const largura = 40;
        const espaco = 20;
        const alturaMax = 200;
        
        dados.forEach((d, i) => {
            const x = 50 + i * (largura + espaco);
            const altura = (d.horas / 30) * alturaMax;
            const y = 250 - altura;
            
            ctx.fillStyle = d.cor;
            ctx.fillRect(x, y, largura, altura);
            
            ctx.fillStyle = '#cbd5e1';
            ctx.font = '12px Inter';
            ctx.fillText(siglas[i], x + 10, 280);
            
            ctx.fillStyle = '#f1f5f9';
            ctx.font = 'bold 12px Inter';
            ctx.fillText(d.horas + 'h', x + 5, y - 5);
        });
        
    } catch (erro) {
        console.error('Erro ao desenhar gráfico:', erro);
    }
}

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

function getNomeMateria(materia) {
    const nomes = {
        es: 'Engenharia de Software',
        ic: 'Introdução à Computação',
        lp: 'Lógica de Programação',
        bd: 'Banco de Dados I',
        bootcamp: 'Bootcamp I',
        fundamentos: 'Fundamentos',
        extras: 'Cursos Extras'
    };
    return nomes[materia] || materia;
}

function getMateriaManha(diaSemana) {
    const mapa = {
        1: 'fundamentos',
        2: 'es',
        3: 'ic',
        4: 'lp',
        5: 'bd'
    };
    return mapa[diaSemana] || null;
}

function getMateriaTarde(diaSemana) {
    const mapa = {
        2: 'es',
        3: 'ic',
        4: 'lp',
        5: 'bd'
    };
    return mapa[diaSemana] || null;
}

function formatarData(dataStr) {
    const data = new Date(dataStr + 'T12:00:00');
    return data.toLocaleDateString('pt-BR');
}

function mostrarToast(mensagem, tipo = 'info') {
    try {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${tipo}`;
        
        let icone = 'fa-info-circle';
        if (tipo === 'success') icone = 'fa-check-circle';
        if (tipo === 'error') icone = 'fa-exclamation-circle';
        if (tipo === 'warning') icone = 'fa-exclamation-triangle';
        
        toast.innerHTML = `<i class="fas ${icone}"></i><span>${mensagem}</span>`;
        container.appendChild(toast);
        
        setTimeout(() => toast.remove(), 3000);
        
    } catch (erro) {
        console.error('Erro ao mostrar toast:', erro);
    }
}

// ============================================
// EXPOR FUNÇÕES GLOBAIS
// ============================================

window.fazerLogin = fazerLogin;
window.fazerLogout = fazerLogout;
window.abrirModalConclusao = abrirModalConclusao;
window.fecharModal = fecharModal;
window.confirmarConclusao = confirmarConclusao;
window.toggleChecklistItem = toggleChecklistItem;
window.resetarChecklistDiario = resetarChecklistDiario;
window.criarNovaNota = criarNovaNota;
window.salvarNota = salvarNota;
window.editarNota = editarNota;
window.excluirNota = excluirNota;
window.fixarNota = fixarNota;
window.fecharModalNota = fecharModalNota;
window.iniciarTimer = iniciarTimer;
window.pausarTimer = pausarTimer;
window.zerarTimer = zerarTimer;
window.mesAnterior = mesAnterior;
window.proximoMes = proximoMes;
window.mostrarPlanoAula = mostrarPlanoAula;
window.verEventosDoDia = verEventosDoDia;
window.fecharModalEvento = fecharModalEvento;
window.buscarNotas = buscarNotas;
