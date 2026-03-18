// ============================================
// AGENDA PALMIERE - CC50 EDITION
// VERSÃO COMPLETA CORRIGIDA (SEM NOTAS)
// ============================================

// ============================================
// CONFIGURAÇÕES INICIAIS
// ============================================

const VERSAO = '3.0.0';
const HORAS_POR_DIA = 2.5; // 2h30

// Estado global
let estado = {
    usuario: 'Carla',
    timerAtivo: false,
    timerTempo: 0,
    timerInterval: null,
    mesCalendario: new Date().getMonth(),
    anoCalendario: new Date().getFullYear(),
    atividadeConcluindo: null,
    checklistItens: [],
    cc50Progresso: {},
    cc50Bonus: 0,
    cc50AulaAtual: null
};

// ============================================
// DADOS DOS PRAZOS (37 PRAZOS)
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
// DADOS DO CC50 (90 AULAS)
// ============================================

const cc50Modulos = [
    {
        nome: 'Introdução',
        aulas: [
            'Boas Vindas ao CC50',
            'Conheça a Fundação Estudar!',
            'Seus Professores',
            'Como Participar'
        ]
    },
    {
        nome: 'Nossos Canais',
        aulas: [
            'Apresentação da Plataforma',
            'Nosso Discord',
            'IDE CC50 com Inteligência Artificial'
        ]
    },
    {
        nome: 'Módulo 0: Scratch',
        aulas: [
            'Introdução ao Módulo 0',
            'Aula 0 - Conheça o Scratch',
            'Anotações da Aula de Scratch',
            'Exercícios'
        ]
    },
    {
        nome: 'Módulo 1: C',
        aulas: [
            'Introdução ao Módulo 1',
            'Aula 1 - Linguagem de Programação C',
            'Anotações da Aula de C',
            'Instruções para os Exercícios',
            'Exercício 1: Mario',
            'Exercício 2: Mario (desafio)',
            'Exercício 3: Dinheiro',
            'Exercício 4: Crédito (desafio)',
            'Laboratório 1: Crescimento Populacional'
        ]
    },
    {
        nome: 'Módulo 2: Arrays',
        aulas: [
            'Introdução ao Módulo 2',
            'Aula 2 - Arrays',
            'Anotações da Aula de Arrays',
            'Instruções para os Exercícios',
            'Exercício 1: Scrabble',
            'Exercício 2: Legibilidade',
            'Exercício 3: Caesar',
            'Exercício 4: Substituição (desafio)'
        ]
    },
    {
        nome: 'Módulo 3: Algoritmos',
        aulas: [
            'Introdução ao Módulo 3',
            'Aula 3 - Algoritmos',
            'Anotações da Aula de Algoritmos',
            'Instruções para os Exercícios',
            'Exercício 1: Ordenação',
            'Exercício 2: Plurality',
            'Exercício 3: Runoff',
            'Exercício 4: Tideman'
        ]
    },
    {
        nome: 'Módulo 4: Memória',
        aulas: [
            'Introdução ao Módulo 4',
            'Aula 4 - Memória',
            'Anotações da Aula de Memória',
            'Instruções para os Exercícios',
            'Exercício 1: Volume',
            'Exercício 2: Filtro',
            'Exercício 3: Filtro (Desafio)',
            'Exercício 4: Recover'
        ]
    },
    {
        nome: 'Módulo 5: Estruturas de Dados',
        aulas: [
            'Introdução ao Módulo 5',
            'Aula 5 - Estrutura de Dados',
            'Anotações da Aula de Estrutura de Dados',
            'Instruções para os Exercícios',
            'Exercício 1: Herança',
            'Exercício 2: Speller'
        ]
    },
    {
        nome: 'Módulo 6: Python',
        aulas: [
            'Introdução ao Módulo 6',
            'Aula 6 - Python',
            'Anotações da Aula de Python',
            'Hello World usando Python',
            'Instruções para os Exercícios',
            'Exercício 1: Mario',
            'Exercício 2: Mario (desafio)',
            'Exercício 3: Dinheiro',
            'Exercício 4: Crédito (desafio)',
            'Exercício 5: Legibilidade',
            'Exercício 6: DNA',
            'Lab 6: Copa do Mundo'
        ]
    },
    {
        nome: 'Módulo 6.5: Inteligência Artificial',
        aulas: [
            'Aula 6.5 - Inteligência Artificial',
            'Anotações da Aula de IA'
        ]
    },
    {
        nome: 'Módulo 7: SQL',
        aulas: [
            'Introdução ao Módulo 7',
            'Aula 7 - SQL',
            'Anotações da Aula de SQL',
            'Instruções para os Exercícios',
            'Exercício 1: Songs',
            'Exercício 2: Movies',
            'Exercício 3: Fiftyville'
        ]
    },
    {
        nome: 'Módulo 8: HTML, CSS, JavaScript',
        aulas: [
            'Introdução ao Módulo 8',
            'Aula 8 - HTML, CSS e JavaScript',
            'Anotações da Aula',
            'Instruções para os Exercícios',
            'Exercício 1: Trivia',
            'Exercício 2: Homepage'
        ]
    },
    {
        nome: 'Módulo 9: Flask',
        aulas: [
            'Introdução ao Módulo 9',
            'Aula 9 - Flask',
            'Anotações da Aula',
            'Instruções para os Exercícios',
            'Exercício 1: Birthdays (Aniversários)',
            'Exercício 2: C$50 Finanças'
        ]
    },
    {
        nome: 'Módulo 10: Ética',
        aulas: [
            'Introdução ao Módulo 10',
            'Aula 10 - Ética',
            'Anotações da Aula',
            'Lab: Fake News e Facebook'
        ]
    },
    {
        nome: 'Encerramento do Curso',
        aulas: [
            'Projeto Final',
            'Avaliação Final',
            'Agradecimentos'
        ]
    }
];

// ============================================
// PLANOS DE AULA (70 AULAS)
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
// FUNÇÕES DE INICIALIZAÇÃO
// ============================================

function inicializarSistema() {
    try {
        console.log('🔥 Inicializando sistema...');
        carregarDados();
        inicializarData();
        inicializarNavegacao();
        inicializarEventListeners();
        inicializarCC50();
        atualizarInterface();
        verificarVersao();
        
        mostrarToast('Bem-vinda, Carla! 🎓 CC50 carregado!', 'success');
    } catch (erro) {
        console.error('Erro na inicialização:', erro);
        mostrarToast('Erro ao iniciar o sistema', 'error');
    }
}

function carregarDados() {
    try {
        console.log('📦 Carregando dados...');
        
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
        
        const cc50Salvo = localStorage.getItem('agenda_cc50');
        if (cc50Salvo) {
            estado.cc50Progresso = JSON.parse(cc50Salvo);
        } else {
            // Inicializa CC50
            cc50Modulos.forEach((modulo, i) => {
                modulo.aulas.forEach((aula, j) => {
                    const aulaId = `cc50-${i}-${j}`;
                    estado.cc50Progresso[aulaId] = {
                        status: 'nao_iniciada',
                        anotacoes: ''
                    };
                });
            });
        }
        
        const bonusSalvo = localStorage.getItem('agenda_cc50_bonus');
        if (bonusSalvo) {
            estado.cc50Bonus = parseInt(bonusSalvo);
        }
        
        console.log('✅ Dados carregados!');
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
        console.log('🧭 Inicializando navegação...');
        
        const botoesNav = {
            'nav-hoje': 'hoje',
            'nav-prazos': 'prazos',
            'nav-calendario': 'calendario',
            'nav-planos': 'planos',
            'nav-progresso': 'progresso',
            'nav-cc50': 'cc50'
        };

        Object.entries(botoesNav).forEach(([id, tab]) => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    document.querySelectorAll('.tab-pane').forEach(t => t.classList.remove('active'));
                    const tabElement = document.getElementById(`tab-${tab}`);
                    if (tabElement) tabElement.classList.add('active');
                    
                    console.log(`📌 Aba alterada para: ${tab}`);
                });
            }
        });
        
        console.log('✅ Navegação inicializada!');
    } catch (erro) {
        console.error('Erro na navegação:', erro);
    }
}

function inicializarEventListeners() {
    try {
        console.log('🎯 Inicializando eventos...');
        
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
        
        const btnFecharEvento = document.getElementById('btn-fechar-evento');
        if (btnFecharEvento) btnFecharEvento.addEventListener('click', fecharModalEvento);
        
        console.log('✅ Eventos inicializados!');
    } catch (erro) {
        console.error('Erro ao inicializar eventos:', erro);
    }
}

// ============================================
// FUNÇÕES DE LOGIN/LOGOUT
// ============================================

function fazerLogin() {
    try {
        console.log('🔐 Tentando fazer login...');
        
        const usuario = document.getElementById('login-usuario').value;
        const senha = document.getElementById('login-senha').value;
        
        if (usuario === 'Carla' && senha === 'Cacau') {
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('app-container').style.display = 'block';
            inicializarSistema();
        } else {
            document.getElementById('login-erro').style.display = 'block';
            console.log('❌ Login falhou');
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
        
        document.getElementById('login-usuario').value = 'Carla';
        document.getElementById('login-senha').value = 'Cacau';
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
        console.log('🔄 Atualizando interface...');
        
        renderizarPrazosUrgentes();
        renderizarGradeDia();
        renderizarSugestoes();
        renderizarChecklist();
        renderizarPrazos('todos');
        renderizarCalendario();
        renderizarProgresso();
        renderizarCronogramaDia();
        renderizarDestaqueCC50();
        
        console.log('✅ Interface atualizada!');
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
            
            card.addEventListener('click', () => abrirModalConclusao(prazo.id));
            
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
        const periodoCC50 = document.getElementById('periodo-cc50');
        
        if (!periodoManha || !periodoTarde || !periodoCC50) return;
        
        periodoManha.innerHTML = '';
        periodoTarde.innerHTML = '';
        periodoCC50.innerHTML = '';
        
        if (diaSemana === 0 || diaSemana === 6) {
            periodoManha.innerHTML = '<div class="off-day">🚫 Dia de descanso</div>';
            periodoTarde.innerHTML = '<div class="off-day">🚫 Dia de descanso</div>';
            periodoCC50.innerHTML = '<div class="off-day">🚫 Dia de descanso</div>';
            return;
        }
        
        // Manhã - Pré-aula
        const materiaManha = getMateriaManha(diaSemana);
        if (materiaManha) {
            periodoManha.appendChild(criarAtividadeElemento(materiaManha, 'Pré-aula', '9:30 - 10:30'));
        }
        
        // Tarde - Aula
        const materiaTarde = getMateriaTarde(diaSemana);
        if (materiaTarde) {
            periodoTarde.appendChild(criarAtividadeElemento(materiaTarde, 'Aula Presencial', '14:00 - 18:00'));
        }
        
        // CC50
        const cc50Div = document.createElement('div');
        cc50Div.className = 'atividade-item cc50';
        cc50Div.innerHTML = `
            <div class="atividade-info">
                <h4>CC50 - Introdução à Ciência da Computação</h4>
                <p><strong>Estudo Diário</strong> - 11:30 - 12:00</p>
            </div>
            <button class="btn-concluir" id="btn-abrir-cc50-hoje"><i class="fas fa-play"></i></button>
        `;
        
        periodoCC50.appendChild(cc50Div);
        
    } catch (erro) {
        console.error('Erro ao renderizar grade:', erro);
    }
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

function criarAtividadeElemento(materia, titulo, descricao) {
    const div = document.createElement('div');
    div.className = `atividade-item ${materia}`;
    
    const nomes = {
        es: 'Eng. Software',
        ic: 'Intro. Computação',
        lp: 'Lógica Prog.',
        bd: 'Banco Dados',
        bootcamp: 'Bootcamp',
        fundamentos: 'Fundamentos',
        cc50: 'CC50'
    };
    
    div.innerHTML = `
        <div class="atividade-info">
            <h4>${nomes[materia] || materia}</h4>
            <p><strong>${titulo}</strong> - ${descricao}</p>
        </div>
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
                <button class="btn-concluir" data-id="${prazo.id}">✓</button>
            `;

            const btnConcluir = div.querySelector('.btn-concluir');
            btnConcluir.addEventListener('click', (e) => {
                e.stopPropagation();
                abrirModalConclusao(prazo.id);
            });
            
            container.appendChild(div);
        });
    } catch (erro) {
        console.error('Erro ao renderizar sugestões:', erro);
    }
}

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
            { id: `check-preaula-${dataStr}`, materia: getMateriaManha(diaSemana), titulo: 'Pré-aula (9:30-10:30)' },
            { id: `check-trabalho-${dataStr}`, materia: 'trabalhos', titulo: 'Trabalhos (10:30-11:30)' },
            { id: `check-cc50-${dataStr}`, materia: 'cc50', titulo: 'CC50 (11:30-12:00)' }
        ].filter(item => item.materia);
        
        if (diaSemana === 1) { // Segunda
            itens.push({ id: `check-cc50-tarde-${dataStr}`, materia: 'cc50', titulo: 'CC50 Intensivo (14:00-18:00)' });
        }
        
        const concluidos = itens.filter(item => estado.checklistItens.includes(item.id)).length;
        document.getElementById('checklist-progress').textContent = `${concluidos}/${itens.length}`;
        
        itens.forEach(item => {
            const div = document.createElement('div');
            div.className = `checklist-item ${estado.checklistItens.includes(item.id) ? 'concluido' : ''}`;
            
            const checkboxDiv = document.createElement('div');
            checkboxDiv.className = `checklist-checkbox ${estado.checklistItens.includes(item.id) ? 'checked' : ''}`;
            if (estado.checklistItens.includes(item.id)) {
                checkboxDiv.innerHTML = '<i class="fas fa-check"></i>';
            }

            checkboxDiv.addEventListener('click', () => toggleChecklistItem(item.id));
            
            div.appendChild(checkboxDiv);
            
            const infoDiv = document.createElement('div');
            infoDiv.className = 'checklist-info';
            infoDiv.innerHTML = `
                <h4>${item.titulo}</h4>
                <p>${item.materia === 'cc50' ? 'Curso CC50' : getNomeMateria(item.materia)}</p>
            `;
            div.appendChild(infoDiv);
            
            const spanMateria = document.createElement('span');
            spanMateria.className = `checklist-materia ${item.materia}`;
            spanMateria.textContent = item.materia === 'cc50' ? 'CC50' : item.materia;
            div.appendChild(spanMateria);
            
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
                ${!prazo.concluido ? `<button class="btn-concluir-pequeno" data-id="${prazo.id}"><i class="fas fa-check"></i></button>` : ''}
            `;

            const btnConcluir = div.querySelector('.btn-concluir-pequeno');
            if (btnConcluir) {
                btnConcluir.addEventListener('click', (e) => {
                    e.stopPropagation();
                    abrirModalConclusao(prazo.id);
                });
            }
            
            container.appendChild(div);
        });
        
    } catch (erro) {
        console.error('Erro ao renderizar prazos:', erro);
    }
}

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

            div.addEventListener('click', () => verEventosDoDia(dia));
            
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
// FUNÇÕES DE CRONOGRAMA E CC50
// ============================================

function renderizarCronogramaDia() {
    try {
        const container = document.getElementById('cronograma-dia');
        if (!container) return;
        
        container.innerHTML = '<h3><i class="fas fa-clock"></i> Seu cronograma de hoje</h3>';
        
        const hoje = new Date();
        const diaSemana = hoje.getDay();
        const isSegunda = diaSemana === 1;
        
        const cronograma = [
            { horario: '09:30 - 10:30', atividade: '📖 Pré-aula', descricao: getNomeMateria(getMateriaManha(diaSemana)) || 'Descanso', tipo: 'preaula', duracao: '1h' },
            { horario: '10:30 - 11:30', atividade: '📝 Trabalhos', descricao: 'Adiantar prazos da faculdade', tipo: 'trabalho', duracao: '1h' },
            { horario: '11:30 - 12:00', atividade: '🎓 CC50', descricao: 'Estudo diário', tipo: 'cc50', duracao: '30min' }
        ];
        
        if (isSegunda) {
            cronograma.push(
                { horario: '14:00 - 18:00', atividade: '🔥 CC50 INTENSIVO', descricao: 'Aproveitar tarde livre', tipo: 'cc50', duracao: '4h' }
            );
        }
        
        cronograma.forEach(item => {
            if (item.descricao === 'null' || item.descricao === 'undefined') return;
            
            const div = document.createElement('div');
            div.className = `cronograma-item ${item.tipo}`;
            div.innerHTML = `
                <div class="cronograma-horario">${item.horario}</div>
                <div class="cronograma-atividade">
                    <h4>${item.atividade}</h4>
                    <p>${item.descricao}</p>
                </div>
                <div class="cronograma-duracao">${item.duracao}</div>
            `;
            container.appendChild(div);
        });
    } catch (erro) {
        console.error('Erro ao renderizar cronograma:', erro);
    }
}

function renderizarDestaqueCC50() {
    try {
        const container = document.getElementById('cc50-destaque-hoje');
        if (!container) return;
        
        const hoje = new Date();
        const diaSemana = hoje.getDay();
        const isSegunda = diaSemana === 1;
        
        let horasHoje = isSegunda ? 4.5 : 0.5;
        
        // Calcula progresso do CC50
        let totalAulas = 0;
        let concluidas = 0;
        cc50Modulos.forEach((modulo, i) => {
            modulo.aulas.forEach((aula, j) => {
                totalAulas++;
                const aulaId = `cc50-${i}-${j}`;
                if (estado.cc50Progresso[aulaId]?.status === 'completa') concluidas++;
            });
        });
        const percentual = Math.round((concluidas / totalAulas) * 100);
        
        container.innerHTML = `
            <div class="cc50-destaque">
                <h3><i class="fas fa-laptop-code"></i> CC50 - Introdução à Ciência da Computação</h3>
                <div class="cc50-progresso-hoje">
                    <div class="progresso-mini" style="background: conic-gradient(#ec4899 ${(percentual/100)*360}deg, #333 ${(percentual/100)*360}deg)">
                        ${percentual}%
                    </div>
                    <div>
                        <p><strong>Hoje:</strong> ${horasHoje}h de CC50</p>
                        <p><strong>Progresso:</strong> ${concluidas}/${totalAulas} aulas</p>
                        <p><strong>Bônus acumulado:</strong> +${estado.cc50Bonus}h</p>
                    </div>
                </div>
            </div>
        `;
    } catch (erro) {
        console.error('Erro ao renderizar destaque CC50:', erro);
    }
}

function inicializarCC50() {
    renderizarCC50();
    atualizarProgressoCC50();
}

function renderizarCC50() {
    try {
        const container = document.getElementById('cc50-modulos');
        if (!container) return;
        
        container.innerHTML = '';
        
        cc50Modulos.forEach((modulo, indexModulo) => {
            const moduloDiv = document.createElement('div');
            moduloDiv.className = 'cc50-modulo';
            
            // Calcula progresso do módulo
            let totalAulas = modulo.aulas.length;
            let concluidas = 0;
            modulo.aulas.forEach((aula, indexAula) => {
                const aulaId = `cc50-${indexModulo}-${indexAula}`;
                if (estado.cc50Progresso[aulaId]?.status === 'completa') concluidas++;
            });
            const progressoModulo = Math.round((concluidas / totalAulas) * 100);
            
            moduloDiv.innerHTML = `
                <div class="modulo-header" data-modulo="${indexModulo}">
                    <h3>${modulo.nome}</h3>
                    <span class="modulo-progresso">${concluidas}/${totalAulas} (${progressoModulo}%)</span>
                </div>
                <div class="modulo-aulas" id="modulo-${indexModulo}-aulas"></div>
            `;
            
            container.appendChild(moduloDiv);
            
            const aulasContainer = document.getElementById(`modulo-${indexModulo}-aulas`);
            
            modulo.aulas.forEach((aula, indexAula) => {
                const aulaId = `cc50-${indexModulo}-${indexAula}`;
                const status = estado.cc50Progresso[aulaId]?.status || 'nao_iniciada';
                
                const aulaDiv = document.createElement('div');
                aulaDiv.className = 'aula-item';
                aulaDiv.dataset.modulo = indexModulo;
                aulaDiv.dataset.aula = indexAula;
                
                let statusIcon = '';
                if (status === 'nao_iniciada') statusIcon = '';
                else if (status === 'assistida') statusIcon = '<i class="fas fa-play"></i>';
                else if (status === 'exercicios') statusIcon = '<i class="fas fa-code"></i>';
                else if (status === 'completa') statusIcon = '<i class="fas fa-check"></i>';
                
                aulaDiv.innerHTML = `
                    <div class="aula-status ${status}">
                        ${statusIcon}
                    </div>
                    <div class="aula-info">
                        <h4>${aula}</h4>
                        <p>${getStatusTexto(status)}</p>
                    </div>
                `;
                
                aulaDiv.addEventListener('click', () => abrirAulaCC50(indexModulo, indexAula));
                
                aulasContainer.appendChild(aulaDiv);
            });
            
            // Evento para expandir/colapsar módulo
            const header = moduloDiv.querySelector('.modulo-header');
            header.addEventListener('click', () => {
                aulasContainer.classList.toggle('expandido');
            });
        });
    } catch (erro) {
        console.error('Erro ao renderizar CC50:', erro);
    }
}

function getStatusTexto(status) {
    const textos = {
        'nao_iniciada': 'Não iniciada',
        'assistida': 'Aula assistida',
        'exercicios': 'Exercícios em andamento',
        'completa': 'Concluída'
    };
    return textos[status] || status;
}

function abrirAulaCC50(moduloIndex, aulaIndex) {
    try {
        const aulaId = `cc50-${moduloIndex}-${aulaIndex}`;
        const aula = cc50Modulos[moduloIndex].aulas[aulaIndex];
        const progresso = estado.cc50Progresso[aulaId] || { status: 'nao_iniciada', anotacoes: '' };
        
        estado.cc50AulaAtual = { moduloIndex, aulaIndex, aulaId };
        
        document.getElementById('modal-aula-titulo').querySelector('span').textContent = aula;
        document.getElementById('modal-aula-descricao').textContent = `Módulo: ${cc50Modulos[moduloIndex].nome}`;
        document.getElementById('aula-status').value = progresso.status;
        document.getElementById('aula-anotacoes').value = progresso.anotacoes || '';
        
        document.getElementById('modal-aula-cc50').classList.add('active');
    } catch (erro) {
        console.error('Erro ao abrir aula CC50:', erro);
    }
}

function salvarAulaCC50() {
    try {
        if (!estado.cc50AulaAtual) return;
        
        const { moduloIndex, aulaIndex, aulaId } = estado.cc50AulaAtual;
        const status = document.getElementById('aula-status').value;
        const anotacoes = document.getElementById('aula-anotacoes').value;
        
        estado.cc50Progresso[aulaId] = {
            status,
            anotacoes
        };
        
        localStorage.setItem('agenda_cc50', JSON.stringify(estado.cc50Progresso));
        
        fecharModalAulaCC50();
        renderizarCC50();
        atualizarProgressoCC50();
        
        mostrarToast('Progresso do CC50 salvo!', 'success');
    } catch (erro) {
        console.error('Erro ao salvar aula CC50:', erro);
    }
}

function fecharModalAulaCC50() {
    document.getElementById('modal-aula-cc50').classList.remove('active');
    estado.cc50AulaAtual = null;
}

function atualizarProgressoCC50() {
    try {
        let totalAulas = 0;
        let concluidas = 0;
        
        cc50Modulos.forEach((modulo, i) => {
            modulo.aulas.forEach((aula, j) => {
                totalAulas++;
                const aulaId = `cc50-${i}-${j}`;
                if (estado.cc50Progresso[aulaId]?.status === 'completa') concluidas++;
            });
        });
        
        const percentual = Math.round((concluidas / totalAulas) * 100);
        
        // Atualiza elementos na interface
        const percentualEl = document.getElementById('cc50-percentual');
        if (percentualEl) percentualEl.textContent = percentual + '%';
        
        const aulasConcluidasEl = document.getElementById('cc50-aulas-concluidas');
        if (aulasConcluidasEl) aulasConcluidasEl.textContent = concluidas;
        
        const headerEl = document.getElementById('cc50-progresso-header');
        if (headerEl) headerEl.textContent = percentual + '%';
        
        // Atualiza gráfico circular
        const grau = (percentual / 100) * 360;
        const circularEl = document.querySelector('.progresso-circular');
        if (circularEl) {
            circularEl.style.background = `conic-gradient(#ec4899 ${grau}deg, #333 ${grau}deg)`;
        }
        
        // Calcula horas estudadas (estimativa)
        const horasEstudadas = Math.round(concluidas * 0.75); // média de 45min por aula
        const horasEl = document.getElementById('cc50-horas-estudadas');
        if (horasEl) horasEl.textContent = horasEstudadas;
        
        // Atualiza bônus
        const bonusEl = document.getElementById('cc50-horas-bonus');
        if (bonusEl) bonusEl.textContent = estado.cc50Bonus;
        
        // Calcula previsão de conclusão
        const semanasRestantes = Math.ceil((totalAulas - concluidas) / 7); // 7 aulas por semana
        const dataPrevista = new Date();
        dataPrevista.setDate(dataPrevista.getDate() + (semanasRestantes * 7));
        
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        const previsaoEl = document.getElementById('cc50-previsao');
        if (previsaoEl) previsaoEl.textContent = meses[dataPrevista.getMonth()] + '/' + dataPrevista.getFullYear();
    } catch (erro) {
        console.error('Erro ao atualizar progresso CC50:', erro);
    }
}

// ============================================
// FUNÇÕES DE BÔNUS
// ============================================

function adicionarBonusCC50(diasGanhos) {
    estado.cc50Bonus += diasGanhos;
    localStorage.setItem('agenda_cc50_bonus', estado.cc50Bonus.toString());
    
    mostrarToast(`🎉 Ganhou ${diasGanhos}h extras para o CC50!`, 'success');
    atualizarProgressoCC50();
    renderizarDestaqueCC50();
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
            adicionarBonusCC50(diasGanhos);
        } else {
            mostrarToast('Atividade concluída!', 'success');
        }
        
        atualizarInterface();
        
    } catch (erro) {
        console.error('Erro ao confirmar conclusão:', erro);
        mostrarToast('Erro ao concluir', 'error');
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
        cc50: 'CC50',
        trabalhos: 'Trabalhos da Faculdade'
    };
    return nomes[materia] || materia;
}

function formatarData(dataStr) {
    const data = new Date(dataStr + 'T12:00:00');
    return data.toLocaleDateString('pt-BR');
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
// DELEGAÇÃO DE EVENTOS PARA MODAIS DINÂMICOS
// ============================================

document.addEventListener('click', function(e) {
    // Botão Salvar Aula CC50
    if (e.target.id === 'btn-salvar-aula' || e.target.closest('#btn-salvar-aula')) {
        e.preventDefault();
        console.log('💾 Salvando aula CC50...');
        salvarAulaCC50();
    }
    
    // Botão Fechar Aula CC50
    if (e.target.id === 'btn-fechar-aula' || e.target.closest('#btn-fechar-aula')) {
        e.preventDefault();
        console.log('❌ Fechando modal CC50...');
        fecharModalAulaCC50();
    }
    
    // Botão Abrir CC50 na tela Hoje
    if (e.target.id === 'btn-abrir-cc50-hoje' || e.target.closest('#btn-abrir-cc50-hoje')) {
        e.preventDefault();
        console.log('🎯 Abrindo aba CC50...');
        document.getElementById('nav-cc50').click();
    }
});

// ============================================
// CONFIGURAÇÃO DO ENTER NO LOGIN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM carregado!');
    
    // Formulário de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('🔑 Formulário submetido');
            fazerLogin();
        });
    }
    
    // Enter nos campos
    const campos = ['login-usuario', 'login-senha'];
    campos.forEach(id => {
        const campo = document.getElementById(id);
        if (campo) {
            campo.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    console.log('⏎ Enter pressionado');
                    fazerLogin();
                }
            });
        }
    });
    
    console.log('✅ Enter configurado!');
});

// ============================================
// FALLBACK SEGURO PARA O LOGIN (NUNCA QUEBRA)
// ============================================
(function() {
    // Função de login simplificada e robusta
    function loginSeguro() {
        var usuario = document.getElementById('login-usuario')?.value;
        var senha = document.getElementById('login-senha')?.value;
        if (usuario === 'Carla' && senha === 'Cacau') {
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('app-container').style.display = 'block';
            // Se a função de inicialização existir, chama
            if (typeof inicializarSistema === 'function') {
                inicializarSistema();
            }
        } else {
            document.getElementById('login-erro').style.display = 'block';
        }
    }

    // Tenta anexar os eventos assim que o DOM estiver pronto
    function anexarEventosLogin() {
        var btn = document.getElementById('btn-login');
        if (btn) btn.addEventListener('click', loginSeguro);

        var form = document.getElementById('login-form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                loginSeguro();
            });
        }

        // Enter nos campos
        ['login-usuario', 'login-senha'].forEach(function(id) {
            var campo = document.getElementById(id);
            if (campo) {
                campo.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        loginSeguro();
                    }
                });
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', anexarEventosLogin);
    } else {
        anexarEventosLogin();
    }

    // Expõe globalmente (sobrescreve se já existir, mas é seguro)
    window.fazerLogin = loginSeguro;
})();

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
window.iniciarTimer = iniciarTimer;
window.pausarTimer = pausarTimer;
window.zerarTimer = zerarTimer;
window.mesAnterior = mesAnterior;
window.proximoMes = proximoMes;
window.mostrarPlanoAula = mostrarPlanoAula;
window.verEventosDoDia = verEventosDoDia;
window.fecharModalEvento = fecharModalEvento;
window.salvarAulaCC50 = salvarAulaCC50;
window.fecharModalAulaCC50 = fecharModalAulaCC50;

console.log('🚀 Script carregado com sucesso!');
