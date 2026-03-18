// ============================================
// AGENDA PALMIERE - PLANEJAMENTO INTELIGENTE
// VERSÃO COMPLETA CORRIGIDA
// ============================================

// ============================================
// CONFIGURAÇÕES INICIAIS
// ============================================

const VERSAO = '4.0.0';
const HORAS_POR_DIA = 2.5;

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
    checklistItens: [],
    cc50Progresso: {},
    cc50Bonus: 0,
    cc50AulaAtual: null,
    conquistas: []
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
            'Exercício 1: Birthdays',
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
        nome: 'Encerramento',
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
// CONTEÚDO ESPECÍFICO PARA PRÉ-AULA
// ============================================

const conteudoPreAula = {
    // Fundamentos
    '2026-03-23': { materia: 'fundamentos', conteudo: 'Revisar Unidades 1 e 2 - Conceitos básicos', paginas: '15-30', exercicios: '1 a 5' },
    '2026-03-30': { materia: 'fundamentos', conteudo: 'Revisar exercícios e preparar dúvidas', paginas: '31-45', exercicios: '6 a 10' },
    '2026-04-06': { materia: 'fundamentos', conteudo: 'Revisão geral para prova - Todos os conceitos', paginas: '1-60', exercicios: 'Todos' },
    '2026-04-13': { materia: 'fundamentos', conteudo: '✅ PROVA - Dia de prova', paginas: '', exercicios: '' },
    '2026-04-20': { materia: 'fundamentos', conteudo: 'Descanso pós-prova', paginas: '', exercicios: '' },
    '2026-04-27': { materia: 'fundamentos', conteudo: 'Ler Unidade 3 - Material complementar', paginas: '61-75', exercicios: '11 a 15' },
    '2026-05-04': { materia: 'fundamentos', conteudo: 'Estudar Unidades 3 e 4 - Foco em exemplos', paginas: '76-95', exercicios: '16 a 20' },
    '2026-05-11': { materia: 'fundamentos', conteudo: 'Revisão semanal', paginas: '', exercicios: '' },
    '2026-05-18': { materia: 'fundamentos', conteudo: 'Revisão para Avaliação Online', paginas: '45-95', exercicios: '10-20' },
    '2026-05-25': { materia: 'fundamentos', conteudo: 'Preparação final', paginas: '', exercicios: '' },
    '2026-06-01': { materia: 'fundamentos', conteudo: '✅ AVALIAÇÃO ONLINE', paginas: '', exercicios: '' },
    
    // Engenharia de Software
    '2026-03-24': { materia: 'es', conteudo: 'Ler capítulo sobre Identificação de Requisitos', paginas: '20-35', topicos: 'Tipos de requisitos, Documentação' },
    '2026-03-31': { materia: 'es', conteudo: 'Estudar Engenharia de Requisitos - Casos de uso', paginas: '36-50', topicos: 'Casos de estudo' },
    '2026-04-07': { materia: 'es', conteudo: 'Projeto de Sistema - Arquitetura', paginas: '51-70', topicos: 'Conceitual x Técnico' },
    '2026-04-14': { materia: 'es', conteudo: '✅ SEMINÁRIO 01 - Revisar slides', paginas: '', topicos: 'Apresentação' },
    '2026-04-21': { materia: 'es', conteudo: '✅ PROVA 1 - Revisão geral', paginas: '1-70', topicos: 'Todos' },
    '2026-04-28': { materia: 'es', conteudo: 'Gerenciamento de Projetos - PMBOK', paginas: '71-85', topicos: 'Escopo, cronograma' },
    '2026-05-05': { materia: 'es', conteudo: 'Implementação - Padrões', paginas: '86-100', topicos: 'Boas práticas' },
    '2026-05-12': { materia: 'es', conteudo: 'Testes - Técnicas', paginas: '101-115', topicos: 'Erro x Falha' },
    '2026-05-19': { materia: 'es', conteudo: 'Testes - Critérios', paginas: '116-130', topicos: 'Caixa branca e preta' },
    '2026-05-26': { materia: 'es', conteudo: 'Implantação - Ambientes', paginas: '131-145', topicos: 'Homologação, produção' },
    '2026-06-02': { materia: 'es', conteudo: 'Manutenção - Tipos', paginas: '146-160', topicos: 'Corretiva, evolutiva' },
    '2026-06-09': { materia: 'es', conteudo: '✅ SEMINÁRIO 02 - Apresentação PPS', paginas: '', topicos: 'Finalizar' },
    '2026-06-16': { materia: 'es', conteudo: '✅ PROVA 2 - Revisão', paginas: '71-160', topicos: 'Todos' },
    
    // Introdução à Computação
    '2026-03-25': { materia: 'ic', conteudo: 'Arquitetura de Hardware - CPU', paginas: '10-25', topicos: 'Registradores, memória' },
    '2026-04-01': { materia: 'ic', conteudo: 'Hardware - Periféricos', paginas: '26-40', topicos: 'Entrada, saída' },
    '2026-04-08': { materia: 'ic', conteudo: 'Informação - Dado x Conhecimento', paginas: '41-55', topicos: 'Sistemas de informação' },
    '2026-04-15': { materia: 'ic', conteudo: '✅ PROVA 1 - Revisão', paginas: '1-55', topicos: 'Todos' },
    '2026-04-22': { materia: 'ic', conteudo: 'Redes - Topologias', paginas: '56-70', topicos: 'LAN, WAN' },
    '2026-04-29': { materia: 'ic', conteudo: 'Redes - Dispositivos', paginas: '71-85', topicos: 'Roteadores, switches' },
    '2026-05-06': { materia: 'ic', conteudo: 'Segurança - Ameaças', paginas: '86-100', topicos: 'Malware, phishing' },
    '2026-05-13': { materia: 'ic', conteudo: 'Segurança - Mecanismos', paginas: '101-115', topicos: 'Criptografia' },
    '2026-05-20': { materia: 'ic', conteudo: 'Governança - Conceitos', paginas: '116-130', topicos: 'Histórico' },
    '2026-05-27': { materia: 'ic', conteudo: 'Governança - Frameworks', paginas: '131-145', topicos: 'COBIT, ITIL' },
    '2026-06-03': { materia: 'ic', conteudo: '✅ SEMINÁRIO - Apresentação', paginas: '', topicos: 'Tendências' },
    '2026-06-10': { materia: 'ic', conteudo: '✅ PROVA 2 - Revisão', paginas: '56-145', topicos: 'Todos' },
    '2026-06-17': { materia: 'ic', conteudo: '✅ ACE - Entrega', paginas: '', topicos: '' },
    
    // Lógica de Programação
    '2026-03-26': { materia: 'lp', conteudo: 'Elementos básicos - Variáveis', paginas: '15-30', exercicios: '1-5' },
    '2026-04-02': { materia: 'lp', conteudo: 'Condicionais - if/else', paginas: '31-45', exercicios: '6-10' },
    '2026-04-09': { materia: 'lp', conteudo: '✅ PROVA 1 - Revisão', paginas: '1-45', exercicios: 'Todos' },
    '2026-04-16': { materia: 'lp', conteudo: 'Vetores - Arrays', paginas: '46-60', exercicios: '11-15' },
    '2026-04-23': { materia: 'lp', conteudo: 'Vetores - Exercícios', paginas: '', exercicios: '16-20' },
    '2026-04-30': { materia: 'lp', conteudo: 'Matrizes - Representação', paginas: '61-75', exercicios: '21-25' },
    '2026-05-07': { materia: 'lp', conteudo: 'Matrizes - Exercícios', paginas: '', exercicios: '26-30' },
    '2026-05-14': { materia: 'lp', conteudo: 'Funções - Escopo', paginas: '76-90', exercicios: '31-35' },
    '2026-05-21': { materia: 'lp', conteudo: '✅ PROVA 2 - Revisão', paginas: '46-90', exercicios: 'Todos' },
    '2026-05-28': { materia: 'lp', conteudo: 'Funções - Parâmetros', paginas: '91-105', exercicios: '36-40' },
    '2026-06-11': { materia: 'lp', conteudo: 'Funções - Avançado', paginas: '106-120', exercicios: '41-45' },
    '2026-06-18': { materia: 'lp', conteudo: 'Revisão geral', paginas: '1-120', exercicios: 'Selecionados' },
    '2026-06-25': { materia: 'lp', conteudo: '✅ PROVA 3 + LISTA', paginas: '', exercicios: 'Todos' },
    
    // Banco de Dados
    '2026-03-27': { materia: 'bd', conteudo: 'Modelagem ER - Entidades', paginas: '10-25', exercicios: '1-5' },
    '2026-04-03': { materia: 'bd', conteudo: 'Modelagem ER - Cardinalidades', paginas: '26-40', exercicios: '6-10' },
    '2026-04-10': { materia: 'bd', conteudo: 'Modelagem - Generalização', paginas: '41-55', exercicios: '11-15' },
    '2026-04-17': { materia: 'bd', conteudo: 'Revisão para prova', paginas: '1-55', exercicios: 'Todos' },
    '2026-04-24': { materia: 'bd', conteudo: '✅ PROVA 1', paginas: '', exercicios: '' },
    '2026-05-08': { materia: 'bd', conteudo: 'SQL - DDL', paginas: '56-70', exercicios: '16-20' },
    '2026-05-15': { materia: 'bd', conteudo: 'SQL - DML', paginas: '71-85', exercicios: '21-25' },
    '2026-05-22': { materia: 'bd', conteudo: 'SQL - UPDATE/DELETE', paginas: '86-100', exercicios: '26-30' },
    '2026-05-29': { materia: 'bd', conteudo: 'SQL - ORDER BY', paginas: '101-115', exercicios: '31-35' },
    '2026-06-05': { materia: 'bd', conteudo: 'Multidimensional', paginas: '116-130', exercicios: '36-40' },
    '2026-06-12': { materia: 'bd', conteudo: 'Revisão SQL', paginas: '56-130', exercicios: 'Selecionados' },
    '2026-06-19': { materia: 'bd', conteudo: 'Revisão final', paginas: '1-130', exercicios: 'Todos' },
    '2026-06-26': { materia: 'bd', conteudo: '✅ PROVA 2', paginas: '', exercicios: '' }
};

// ============================================
// TRABALHOS DIÁRIOS ESPECÍFICOS
// ============================================

const trabalhosDiarios = {
    '2026-03-18': { id: 'ic-ace', descricao: 'ACE IC - Pesquisar tema, criar esboço', paginas: 'Definir introdução' },
    '2026-03-19': { id: 'fund-sist1', descricao: 'Sistematização 01 - Ler material, fazer rascunho', paginas: 'Unidades 1-2' },
    '2026-03-20': { id: 'es-seminario1', descricao: 'Seminário 01 ES - Dividir tópicos', topicos: 'Métodos ágeis' },
    '2026-03-23': { id: 'fund-exercicios1', descricao: 'Exercícios Fundamentos - Revisar e finalizar', exercicios: '1-5' },
    '2026-03-24': { id: 'ic-ace', descricao: 'ACE IC - Desenvolver introdução', paginas: '2-3 páginas' },
    '2026-03-25': { id: 'fund-sist1', descricao: 'Sistematização 01 - Escrever seção 1', topicos: 'Conceitos básicos' },
    '2026-03-26': { id: 'es-seminario1', descricao: 'Seminário 01 ES - Pesquisar métodos ágeis', topicos: 'Scrum, Kanban' },
    '2026-03-27': { id: 'fund-exercicios1', descricao: 'Exercícios Fundamentos - Revisão final', status: 'entregar' },
    '2026-03-30': { id: 'fund-sist1', descricao: 'Sistematização 01 - Escrever seção 2', topicos: 'Aplicações' },
    '2026-03-31': { id: 'ic-ace', descricao: 'ACE IC - Desenvolver metodologia', paginas: 'Descrever métodos' },
    '2026-04-01': { id: 'es-seminario1', descricao: 'Seminário 01 ES - Criar slides', slides: '10-12' },
    '2026-04-02': { id: 'fund-sist1', descricao: 'Sistematização 01 - Revisar e formatar', normas: 'ABNT' },
    '2026-04-03': { id: 'es-seminario1', descricao: 'Seminário 01 ES - Ensaio da apresentação', tempo: '15min' },
    '2026-04-04': { id: 'bootcamp-desafio1', descricao: 'Desafio Bootcamp - Avançar no código', modulo: 'Funcionalidades' },
    '2026-04-07': { id: 'fund-sist1', descricao: 'Sistematização 01 - FINALIZAR', status: 'entregar' },
    '2026-04-08': { id: 'bootcamp-desafio1', descricao: 'Desafio Bootcamp - Testar e corrigir', testes: 'Unitários' },
    '2026-04-10': { id: 'es-seminario1', descricao: 'Seminário 01 ES - Últimos ajustes', detalhes: 'Revisar' },
    '2026-04-11': { id: 'bootcamp-desafio1', descricao: 'Desafio Bootcamp - ENTREGAR', status: 'final' },
    '2026-04-16': { id: 'ic-ace', descricao: 'ACE IC - Continuar desenvolvimento', secoes: 'Resultados' },
    '2026-04-22': { id: 'ic-ace', descricao: 'ACE IC - Escrever resultados', dados: 'Análise' },
    '2026-04-28': { id: 'ic-ace', descricao: 'ACE IC - Revisar', revisao: 'Ortografia' },
    '2026-04-29': { id: 'bootcamp-desafio2', descricao: 'Desafio Bootcamp - Começar entrega', modulo: 'Intermediário' },
    '2026-05-02': { id: 'fund-exercicios2', descricao: 'Exercícios Fundamentos - Começar', exercicios: '3 e 4' },
    '2026-05-04': { id: 'bootcamp-desafio2', descricao: 'Desafio Bootcamp - Desenvolvimento', codigo: 'Funcionalidades' },
    '2026-05-05': { id: 'ic-ace', descricao: 'ACE IC - Finalizar rascunho', paginas: '10-12' },
    '2026-05-06': { id: 'bootcamp-desafio2', descricao: 'Desafio Bootcamp - Testes', qualidade: 'Revisar' },
    '2026-05-07': { id: 'ic-seminario', descricao: 'Seminário IC - Pesquisar tendências', topicos: 'IA, Blockchain' },
    '2026-05-08': { id: 'bootcamp-desafio2', descricao: 'Desafio Bootcamp - ENTREGAR', status: 'final' },
    '2026-05-11': { id: 'ic-seminario', descricao: 'Seminário IC - Preparar slides', slides: '10-15' },
    '2026-05-12': { id: 'fund-sist2', descricao: 'Sistematização 02 - Começar', introducao: 'Esboço' },
    '2026-05-13': { id: 'ic-seminario', descricao: 'Seminário IC - Ensaio', apresentacao: 'Treinar' },
    '2026-05-14': { id: 'fund-sist2', descricao: 'Sistematização 02 - Desenvolvimento', secoes: '1 e 2' },
    '2026-05-15': { id: 'lp-lista', descricao: 'Lista LP - Começar', exercicios: '1-5' },
    '2026-05-18': { id: 'fund-sist2', descricao: 'Sistematização 02 - Continuar', secoes: '3 e 4' },
    '2026-05-19': { id: 'lp-lista', descricao: 'Lista LP - Exercícios', exercicios: '6-10' },
    '2026-05-20': { id: 'fund-sist2', descricao: 'Sistematização 02 - Revisão', correcao: 'Formatar' },
    '2026-05-22': { id: 'fund-sist2', descricao: 'Sistematização 02 - FINALIZAR', status: 'entregar' },
    '2026-05-25': { id: 'bootcamp-desafio3', descricao: 'Desafio Bootcamp - Começar final', modulo: 'Entrega Final' },
    '2026-05-26': { id: 'lp-lista', descricao: 'Lista LP - Avançar', exercicios: '11-15' },
    '2026-05-27': { id: 'bootcamp-desafio3', descricao: 'Desafio Bootcamp - Desenvolvimento', funcionalidades: 'Completar' },
    '2026-05-28': { id: 'ic-seminario', descricao: 'Seminário IC - APRESENTAR', status: 'final' },
    '2026-05-29': { id: 'bootcamp-desafio3', descricao: 'Desafio Bootcamp - Testes', qualidade: 'Revisar' },
    '2026-06-02': { id: 'bootcamp-desafio3', descricao: 'Desafio Bootcamp - Finalizar', ultimos: 'Ajustes' },
    '2026-06-04': { id: 'bootcamp-desafio3', descricao: 'Desafio Bootcamp - Últimos ajustes', revisao: 'Final' },
    '2026-06-05': { id: 'lp-lista', descricao: 'Lista LP - Finalizar', exercicios: '16-20' },
    '2026-06-08': { id: 'bootcamp-desafio3', descricao: 'Desafio Bootcamp - ENTREGAR', status: 'final' },
    '2026-06-11': { id: 'ic-ace', descricao: 'ACE IC - Revisão final', revisao: 'Completa' },
    '2026-06-12': { id: 'lp-lista', descricao: 'Lista LP - ENTREGAR', status: 'final' },
    '2026-06-15': { id: 'ic-ace', descricao: 'ACE IC - ENTREGAR', status: 'final' }
};

// ============================================
// NOTAS
// ============================================

let notas = [];

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
        verificarProvasProximas();
        atualizarNotificacoes();
        
        mostrarToast('Bem-vinda, Carla! Seu planejamento está pronto!', 'success');
    } catch (erro) {
        console.error('Erro na inicialização:', erro);
        mostrarToast('Erro ao iniciar o sistema', 'error');
    }
}

function carregarDados() {
    try {
        console.log('📦 Carregando dados...');
        
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
        
        const cc50Salvo = localStorage.getItem('agenda_cc50');
        if (cc50Salvo) {
            estado.cc50Progresso = JSON.parse(cc50Salvo);
        } else {
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
        
        const conquistasSalvas = localStorage.getItem('agenda_conquistas');
        if (conquistasSalvas) {
            estado.conquistas = JSON.parse(conquistasSalvas);
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
        
        // Rolagem suave para as seções
        document.querySelectorAll('.nav-btn[data-target]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = btn.dataset.target;
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Atualizar classe active
                    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    // Esconder todas as seções e mostrar a alvo
                    document.querySelectorAll('.tab-pane').forEach(section => {
                        section.classList.remove('active');
                    });
                    targetElement.classList.add('active');
                    
                    // Rolagem suave
                    const headerHeight = document.querySelector('.agenda-header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    console.log(`📌 Navegando para: ${targetId}`);
                }
            });
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
        
        // Sair (header)
        const btnSair = document.getElementById('btn-sair-header');
        if (btnSair) btnSair.addEventListener('click', fazerLogout);
        
        // Notificações
        const notificacaoIcon = document.getElementById('notification-icon');
        if (notificacaoIcon) {
            notificacaoIcon.addEventListener('click', mostrarNotificacoes);
        }
        
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
        
        // CC50
        const btnSalvarAula = document.getElementById('btn-salvar-aula');
        if (btnSalvarAula) btnSalvarAula.addEventListener('click', salvarAulaCC50);
        
        const btnFecharAula = document.getElementById('btn-fechar-aula');
        if (btnFecharAula) btnFecharAula.addEventListener('click', fecharModalAulaCC50);
        
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
        console.log('👋 Fazendo logout...');
        
        document.getElementById('login-container').style.display = 'flex';
        document.getElementById('app-container').style.display = 'none';
        
        if (estado.timerAtivo) {
            pausarTimer();
        }
        
        zerarTimer();
        
        document.getElementById('login-usuario').value = 'Carla';
        document.getElementById('login-senha').value = 'Cacau';
        document.getElementById('login-erro').style.display = 'none';
        
        window.scrollTo(0, 0);
        
        mostrarToast('Até logo, Carla!', 'info');
    } catch (erro) {
        console.error('Erro no logout:', erro);
    }
}

// ============================================
// FUNÇÕES DE INTERFACE PRINCIPAL
// ============================================

function atualizarInterface() {
    try {
        console.log('🔄 Atualizando interface...');
        
        renderizarCronogramaDetalhado();
        renderizarChecklistInteligente();
        renderizarSugestoes();
        renderizarPrazos('todos');
        renderizarCalendario();
        renderizarProgresso();
        renderizarNotas();
        renderizarPreviaCC50();
        verificarProvasProximas();
        atualizarNotificacoes();
        
        console.log('✅ Interface atualizada!');
    } catch (erro) {
        console.error('Erro ao atualizar interface:', erro);
    }
}

function renderizarCronogramaDetalhado() {
    try {
        const container = document.getElementById('cronograma-detalhado');
        if (!container) return;
        
        const hoje = new Date();
        const dataStr = hoje.toISOString().split('T')[0];
        const diaSemana = hoje.getDay();
        
        let html = '<h2><i class="fas fa-clock"></i> Seu plano de hoje</h2>';
        
        // Verificar se é fim de semana
        if (diaSemana === 0 || diaSemana === 6) {
            container.innerHTML = html + '<div class="atividade-detalhada"><p>🚫 Fim de semana - Descanse!</p></div>';
            return;
        }
        
        // PRÉ-AULA
        const preAula = conteudoPreAula[dataStr];
        if (preAula) {
            const nomeMateria = getNomeMateria(preAula.materia);
            html += `
                <div class="atividade-detalhada preaula">
                    <div class="atividade-header">
                        <span class="atividade-horario">09:30 - 10:30</span>
                        <span class="atividade-tipo">PRÉ-AULA</span>
                    </div>
                    <div class="atividade-titulo">${nomeMateria}</div>
                    <div class="atividade-descricao">${preAula.conteudo}</div>
                    ${preAula.paginas ? `<div class="atividade-detalhe"><i class="fas fa-book"></i> Páginas: ${preAula.paginas}</div>` : ''}
                    ${preAula.exercicios ? `<div class="atividade-detalhe"><i class="fas fa-pencil-alt"></i> Exercícios: ${preAula.exercicios}</div>` : ''}
                    ${preAula.topicos ? `<div class="atividade-detalhe"><i class="fas fa-tags"></i> Tópicos: ${preAula.topicos}</div>` : ''}
                </div>
            `;
        } else {
            const materiaManha = getMateriaManha(diaSemana);
            if (materiaManha) {
                html += `
                    <div class="atividade-detalhada preaula">
                        <div class="atividade-header">
                            <span class="atividade-horario">09:30 - 10:30</span>
                            <span class="atividade-tipo">PRÉ-AULA</span>
                        </div>
                        <div class="atividade-titulo">${getNomeMateria(materiaManha)}</div>
                        <div class="atividade-descricao">Revisar conteúdo da aula de hoje</div>
                    </div>
                `;
            }
        }
        
        // TRABALHO
        const trabalho = trabalhosDiarios[dataStr];
        if (trabalho) {
            const prazo = prazos.find(p => p.id === trabalho.id);
            html += `
                <div class="atividade-detalhada trabalho">
                    <div class="atividade-header">
                        <span class="atividade-horario">10:30 - 11:30</span>
                        <span class="atividade-tipo">TRABALHO</span>
                    </div>
                    <div class="atividade-titulo">${prazo ? prazo.nome : 'Trabalho'}</div>
                    <div class="atividade-descricao">${trabalho.descricao}</div>
                    ${trabalho.paginas ? `<div class="atividade-detalhe"><i class="fas fa-file-alt"></i> ${trabalho.paginas}</div>` : ''}
                    ${trabalho.exercicios ? `<div class="atividade-detalhe"><i class="fas fa-pencil-alt"></i> ${trabalho.exercicios}</div>` : ''}
                    ${trabalho.topicos ? `<div class="atividade-detalhe"><i class="fas fa-tags"></i> ${trabalho.topicos}</div>` : ''}
                </div>
            `;
        }
        
        // CC50
        html += `
            <div class="atividade-detalhada cc50">
                <div class="atividade-header">
                    <span class="atividade-horario">11:30 - 12:00</span>
                    <span class="atividade-tipo">CC50</span>
                </div>
                <div class="atividade-titulo">Introdução à Ciência da Computação</div>
                <div class="atividade-descricao">Continuar de onde parou no curso</div>
                <div class="atividade-detalhe"><i class="fas fa-play-circle"></i> <button class="btn-link" onclick="document.getElementById('nav-cc50').click()">Ir para o CC50</button></div>
            </div>
        `;
        
        // AULA DA TARDE
        const materiaTarde = getMateriaTarde(diaSemana);
        if (materiaTarde) {
            html += `
                <div class="atividade-detalhada">
                    <div class="atividade-header">
                        <span class="atividade-horario">14:00 - 18:00</span>
                        <span class="atividade-tipo">AULA</span>
                    </div>
                    <div class="atividade-titulo">${getNomeMateria(materiaTarde)}</div>
                    <div class="atividade-descricao">Aula presencial - Não esquecer material</div>
                </div>
            `;
        } else if (diaSemana === 1) { // Segunda
            html += `
                <div class="atividade-detalhada cc50">
                    <div class="atividade-header">
                        <span class="atividade-horario">14:00 - 18:00</span>
                        <span class="atividade-tipo">CC50 INTENSIVO</span>
                    </div>
                    <div class="atividade-titulo">Aproveitar tarde livre</div>
                    <div class="atividade-descricao">Avançar no CC50 - Meta de 4h de estudo</div>
                </div>
            `;
        }
        
        container.innerHTML = html;
        
    } catch (erro) {
        console.error('Erro ao renderizar cronograma:', erro);
    }
}

function renderizarChecklistInteligente() {
    try {
        const container = document.getElementById('checklist-container');
        if (!container) return;
        
        const hoje = new Date();
        const dataStr = hoje.toISOString().split('T')[0];
        const diaSemana = hoje.getDay();
        
        if (diaSemana === 0 || diaSemana === 6) {
            container.innerHTML = '<p class="text-muted">Fim de semana - descanse! 🎉</p>';
            document.getElementById('checklist-progress').textContent = '0/0';
            return;
        }
        
        const itens = [];
        
        // Item 1: Pré-aula
        const preAula = conteudoPreAula[dataStr];
        if (preAula) {
            itens.push({
                id: `check-preaula-${dataStr}`,
                texto: `Pré-aula: ${getNomeMateria(preAula.materia)}`,
                detalhe: preAula.conteudo.substring(0, 40) + '...'
            });
        } else {
            const materiaManha = getMateriaManha(diaSemana);
            if (materiaManha) {
                itens.push({
                    id: `check-preaula-${dataStr}`,
                    texto: `Pré-aula: ${getNomeMateria(materiaManha)}`,
                    detalhe: 'Revisar conteúdo da aula'
                });
            }
        }
        
        // Item 2: Trabalho
        const trabalho = trabalhosDiarios[dataStr];
        if (trabalho) {
            const prazo = prazos.find(p => p.id === trabalho.id);
            itens.push({
                id: `check-trabalho-${dataStr}`,
                texto: `Trabalho: ${prazo ? prazo.nome : 'Trabalho do dia'}`,
                detalhe: trabalho.descricao
            });
        }
        
        // Item 3: CC50
        itens.push({
            id: `check-cc50-${dataStr}`,
            texto: 'CC50: 30 minutos de estudo',
            detalhe: 'Avançar no curso'
        });
        
        // Item 4: Segunda intensiva
        if (diaSemana === 1) {
            itens.push({
                id: `check-cc50-tarde-${dataStr}`,
                texto: '🔥 CC50 Intensivo: 4 horas',
                detalhe: 'Aproveitar tarde livre'
            });
        }
        
        // Calcular progresso
        const concluidos = itens.filter(item => estado.checklistItens.includes(item.id)).length;
        document.getElementById('checklist-progress').textContent = `${concluidos}/${itens.length}`;
        
        container.innerHTML = '';
        
        itens.forEach(item => {
            const div = document.createElement('div');
            div.className = `checklist-item ${estado.checklistItens.includes(item.id) ? 'concluido' : ''}`;
            
            const checkbox = document.createElement('div');
            checkbox.className = `checklist-checkbox ${estado.checklistItens.includes(item.id) ? 'checked' : ''}`;
            if (estado.checklistItens.includes(item.id)) {
                checkbox.innerHTML = '<i class="fas fa-check"></i>';
            }
            checkbox.addEventListener('click', () => toggleChecklistItem(item.id));
            
            const info = document.createElement('div');
            info.className = 'checklist-info';
            info.innerHTML = `<h4>${item.texto}</h4><p>${item.detalhe}</p>`;
            
            div.appendChild(checkbox);
            div.appendChild(info);
            
            container.appendChild(div);
        });
        
    } catch (erro) {
        console.error('Erro ao renderizar checklist:', erro);
    }
}

function toggleChecklistItem(itemId) {
    try {
        const index = estado.checklistItens.indexOf(itemId);
        if (index === -1) {
            estado.checklistItens.push(itemId);
            mostrarToast('✅ Tarefa concluída!', 'success');
        } else {
            estado.checklistItens.splice(index, 1);
            mostrarToast('Tarefa desmarcada', 'info');
        }
        
        localStorage.setItem('agenda_checklist', JSON.stringify(estado.checklistItens));
        renderizarChecklistInteligente();
    } catch (erro) {
        console.error('Erro ao alternar checklist:', erro);
    }
}

function verificarProvasProximas() {
    try {
        const hoje = new Date();
        const container = document.getElementById('proximas-provas');
        if (!container) return;
        
        const provasProximas = prazos
            .filter(p => p.tipo === 'prova' && !p.concluido)
            .map(p => {
                const dataProva = new Date(p.data + 'T12:00:00');
                const diasRestantes = Math.ceil((dataProva - hoje) / (1000 * 60 * 60 * 24));
                return { ...p, diasRestantes };
            })
            .filter(p => p.diasRestantes <= 14 && p.diasRestantes > 0)
            .sort((a, b) => a.diasRestantes - b.diasRestantes);
        
        if (provasProximas.length === 0) {
            container.innerHTML = '';
            return;
        }
        
        const prova = provasProximas[0];
        
        // Sugestão de estudo baseado no dia
        let sugestao = '';
        if (prova.diasRestantes === 14) {
            sugestao = 'Hoje: Revisão geral do conteúdo';
        } else if (prova.diasRestantes === 13) {
            sugestao = 'Hoje: Exercícios básicos';
        } else if (prova.diasRestantes === 12) {
            sugestao = 'Hoje: Aprofundar tópicos difíceis';
        } else if (prova.diasRestantes === 11) {
            sugestao = 'Hoje: Resumos e mapas mentais';
        } else if (prova.diasRestantes === 10) {
            sugestao = 'Hoje: Primeiro simulado';
        } else if (prova.diasRestantes === 9) {
            sugestao = 'Hoje: Corrigir erros do simulado';
        } else if (prova.diasRestantes === 8) {
            sugestao = 'Hoje: Revisar pontos fracos';
        } else if (prova.diasRestantes === 7) {
            sugestao = 'Hoje: Exercícios avançados';
        } else if (prova.diasRestantes === 6) {
            sugestao = 'Hoje: Segundo simulado';
        } else if (prova.diasRestantes === 5) {
            sugestao = 'Hoje: Revisão de fórmulas/conceitos';
        } else if (prova.diasRestantes === 4) {
            sugestao = 'Hoje: Grupos de estudo';
        } else if (prova.diasRestantes === 3) {
            sugestao = 'Hoje: Revisão rápida';
        } else if (prova.diasRestantes === 2) {
            sugestao = 'Hoje: Descanso ativo (revisão leve)';
        } else if (prova.diasRestantes === 1) {
            sugestao = 'Hoje: Véspera - revisão rápida e dormir cedo';
        }
        
        container.innerHTML = `
            <div class="prova-alerta">
                <i class="fas fa-exclamation-triangle"></i>
                <div class="prova-info">
                    <h3>⚠️ Prova em ${prova.diasRestantes} dias: ${prova.nome}</h3>
                    <p>${getNomeMateria(prova.materia)}</p>
                    <p class="prova-contador">${sugestao}</p>
                </div>
            </div>
        `;
        
    } catch (erro) {
        console.error('Erro ao verificar provas:', erro);
    }
}

function atualizarNotificacoes() {
    try {
        const hoje = new Date();
        
        const prazosProximos = prazos
            .filter(p => !p.concluido)
            .map(p => {
                const dataPrazo = new Date(p.data + 'T12:00:00');
                const diasRestantes = Math.ceil((dataPrazo - hoje) / (1000 * 60 * 60 * 24));
                return { ...p, diasRestantes };
            })
            .filter(p => p.diasRestantes <= 7 && p.diasRestantes > 0);
        
        const badge = document.getElementById('notificacao-badge');
        if (badge) {
            badge.textContent = prazosProximos.length;
            badge.style.display = prazosProximos.length > 0 ? 'flex' : 'none';
        }
        
    } catch (erro) {
        console.error('Erro ao atualizar notificações:', erro);
    }
}

function mostrarNotificacoes() {
    try {
        const hoje = new Date();
        
        const prazosProximos = prazos
            .filter(p => !p.concluido)
            .map(p => {
                const dataPrazo = new Date(p.data + 'T12:00:00');
                const diasRestantes = Math.ceil((dataPrazo - hoje) / (1000 * 60 * 60 * 24));
                return { ...p, diasRestantes };
            })
            .filter(p => p.diasRestantes <= 7 && p.diasRestantes > 0)
            .sort((a, b) => a.diasRestantes - b.diasRestantes);
        
        if (prazosProximos.length === 0) {
            mostrarToast('Nenhuma notificação no momento', 'info');
            return;
        }
        
        let mensagem = '📢 Prazos próximos:\n';
        prazosProximos.forEach(p => {
            mensagem += `\n- ${p.nome}: ${p.diasRestantes} dias`;
        });
        
        alert(mensagem);
        
    } catch (erro) {
        console.error('Erro ao mostrar notificações:', erro);
    }
}

// ============================================
// FUNÇÕES DE CC50
// ============================================

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
                if (status === 'assistida') statusIcon = '<i class="fas fa-play"></i>';
                else if (status === 'exercicios') statusIcon = '<i class="fas fa-code"></i>';
                else if (status === 'completa') statusIcon = '<i class="fas fa-check"></i>';
                
                aulaDiv.innerHTML = `
                    <div class="aula-status ${status}">${statusIcon}</div>
                    <div class="aula-info">
                        <h4>${aula}</h4>
                        <p>${getStatusTexto(status)}</p>
                    </div>
                `;
                
                aulaDiv.addEventListener('click', () => abrirAulaCC50(indexModulo, indexAula));
                
                aulasContainer.appendChild(aulaDiv);
            });
            
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
        'assistida': 'Assistida',
        'exercicios': 'Exercícios',
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
        renderizarPreviaCC50();
        
        // Verificar conquistas
        verificarConquistasCC50();
        
        mostrarToast('Progresso salvo!', 'success');
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
        
        document.getElementById('cc50-percentual').textContent = percentual + '%';
        document.getElementById('cc50-aulas-concluidas').textContent = concluidas;
        document.getElementById('cc50-progresso-header').textContent = percentual + '%';
        
        const grau = (percentual / 100) * 360;
        document.querySelector('.progresso-circular').style.background = 
            `conic-gradient(#ec4899 ${grau}deg, #333 ${grau}deg)`;
        
        const horasEstudadas = Math.round(concluidas * 0.75);
        document.getElementById('cc50-horas-estudadas').textContent = horasEstudadas;
        
        document.getElementById('cc50-horas-bonus').textContent = estado.cc50Bonus;
        
        const semanasRestantes = Math.ceil((totalAulas - concluidas) / 7);
        const dataPrevista = new Date();
        dataPrevista.setDate(dataPrevista.getDate() + (semanasRestantes * 7));
        
        const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        document.getElementById('cc50-previsao').textContent = meses[dataPrevista.getMonth()] + '/' + dataPrevista.getFullYear();
        
    } catch (erro) {
        console.error('Erro ao atualizar progresso CC50:', erro);
    }
}

function renderizarPreviaCC50() {
    try {
        const container = document.getElementById('cc50-previa');
        if (!container) return;
        
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
            <h3><i class="fas fa-laptop-code"></i> CC50</h3>
            <div class="cc50-progresso-hoje">
                <div class="progresso-mini" style="background: conic-gradient(#ec4899 ${(percentual/100)*360}deg, #333 ${(percentual/100)*360}deg)">
                    ${percentual}%
                </div>
                <div>
                    <p><strong>Progresso:</strong> ${concluidas}/${totalAulas} aulas</p>
                    <p><strong>Hoje:</strong> ${new Date().getDay() === 1 ? '4.5h' : '30min'} disponíveis</p>
                    <button class="btn-primary" onclick="document.getElementById('nav-cc50').click()">Continuar</button>
                </div>
            </div>
        `;
    } catch (erro) {
        console.error('Erro ao renderizar prévia CC50:', erro);
    }
}

function verificarConquistasCC50() {
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
        
        if (percentual >= 25 && !estado.conquistas.includes('cc50-25')) {
            estado.conquistas.push('cc50-25');
            mostrarToast('🏆 Conquista: 25% do CC50!', 'success');
        }
        
        if (percentual >= 50 && !estado.conquistas.includes('cc50-50')) {
            estado.conquistas.push('cc50-50');
            mostrarToast('🏆 Conquista: Metade do CC50!', 'success');
        }
        
        if (percentual >= 75 && !estado.conquistas.includes('cc50-75')) {
            estado.conquistas.push('cc50-75');
            mostrarToast('🏆 Conquista: 75% do CC50!', 'success');
        }
        
        if (percentual >= 100 && !estado.conquistas.includes('cc50-100')) {
            estado.conquistas.push('cc50-100');
            mostrarToast('🏆🏆🏆 CONQUISTA MÁXIMA: CC50 CONCLUÍDO!', 'success');
        }
        
        localStorage.setItem('agenda_conquistas', JSON.stringify(estado.conquistas));
        
    } catch (erro) {
        console.error('Erro ao verificar conquistas:', erro);
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
            div.className = `prazo-item ${prazo.concluido ? 'concluido' : ''}`;
            
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

// ============================================
// FUNÇÕES DE BÔNUS
// ============================================

function adicionarBonusCC50(diasGanhos) {
    estado.cc50Bonus += diasGanhos;
    localStorage.setItem('agenda_cc50_bonus', estado.cc50Bonus.toString());
    
    mostrarToast(`🎉 Ganhou ${diasGanhos}h extras para o CC50!`, 'success');
    atualizarProgressoCC50();
    renderizarPreviaCC50();
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
            container.innerHTML = '<p class="text-muted">Nenhuma nota ainda. Clique em "Nova Nota".</p>';
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
                <button class="btn-fixar" data-id="${nota.id}"><i class="fas fa-thumbtack"></i></button>
                <button class="btn-editar" data-id="${nota.id}"><i class="fas fa-edit"></i></button>
                <button class="btn-excluir" data-id="${nota.id}"><i class="fas fa-trash"></i></button>
            </div>
        </div>
        <div class="nota-titulo">${nota.titulo || 'Sem título'}</div>
        <div class="nota-conteudo">${(nota.conteudo || '').replace(/\n/g, '<br>')}</div>
        <div class="nota-tags">
            ${nota.tags ? nota.tags.map(t => `<span class="nota-tag">#${t}</span>`).join('') : ''}
        </div>
    `;

    div.querySelector('.btn-fixar')?.addEventListener('click', () => fixarNota(nota.id));
    div.querySelector('.btn-editar')?.addEventListener('click', () => editarNota(nota.id));
    div.querySelector('.btn-excluir')?.addEventListener('click', () => excluirNota(nota.id));
    
    container.appendChild(div);
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
        mostrarToast('Nota salva!', 'success');
        
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
                <div class="resumo-icon">${getIconeMateria(materia)}</div>
                <div>
                    <h4>${getSiglaMateria(materia)}</h4>
                    <span class="resumo-valor">${progresso}%</span>
                </div>
            `;
            container.appendChild(div);
        });
        
        desenharGraficoBarras();
        renderizarConquistas();
        
    } catch (erro) {
        console.error('Erro ao renderizar progresso:', erro);
    }
}

function renderizarConquistas() {
    try {
        const container = document.getElementById('conquistas-grid');
        if (!container) return;
        
        const conquistasLista = [
            { id: 'cc50-25', nome: '25% do CC50', icone: '🎓', obtida: estado.conquistas.includes('cc50-25') },
            { id: 'cc50-50', nome: 'Metade do CC50', icone: '🏆', obtida: estado.conquistas.includes('cc50-50') },
            { id: 'cc50-75', nome: '75% do CC50', icone: '🚀', obtida: estado.conquistas.includes('cc50-75') },
            { id: 'cc50-100', nome: 'CC50 Concluído', icone: '🌟', obtida: estado.conquistas.includes('cc50-100') },
            { id: 'primeiro-prazo', nome: 'Primeiro Prazo', icone: '✅', obtida: true },
            { id: 'checklist-completo', nome: 'Checklist Completo', icone: '📋', obtida: false }
        ];
        
        container.innerHTML = '';
        
        conquistasLista.forEach(conq => {
            const div = document.createElement('div');
            div.className = `conquista-item ${conq.obtida ? 'obtida' : 'bloqueada'}`;
            div.innerHTML = `
                <div class="conquista-icone">${conq.icone}</div>
                <div class="conquista-nome">${conq.nome}</div>
            `;
            container.appendChild(div);
        });
        
    } catch (erro) {
        console.error('Erro ao renderizar conquistas:', erro);
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
            { cor: '#f97316', horas: 34 },
            { cor: '#3b82f6', horas: 35 },
            { cor: '#10b981', horas: 39 },
            { cor: '#8b5cf6', horas: 33 },
            { cor: '#ec4899', horas: 21 },
            { cor: '#64748b', horas: 23 }
        ];
        
        const siglas = ['ES', 'IC', 'LP', 'BD', 'BC', 'FD'];
        const largura = 40;
        const espaco = 20;
        const alturaMax = 200;
        const maxHoras = 40;
        
        dados.forEach((d, i) => {
            const x = 50 + i * (largura + espaco);
            const altura = (d.horas / maxHoras) * alturaMax;
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
        const atividade = prazos.find(p => p.id === atividadeId);
        if (!atividade) return;
        
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
// FUNÇÕES DE SUGESTÕES
// ============================================

function renderizarSugestoes() {
    try {
        const container = document.getElementById('sugestoes-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        const hoje = new Date();
        const dataStr = hoje.toISOString().split('T')[0];
        
        // Sugestão 1: Trabalho do dia (se houver)
        const trabalho = trabalhosDiarios[dataStr];
        if (trabalho) {
            const prazo = prazos.find(p => p.id === trabalho.id);
            if (prazo && !prazo.concluido) {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.innerHTML = `
                    <div>
                        <h4>📝 Trabalho de hoje</h4>
                        <p>${prazo.nome} - ${trabalho.descricao}</p>
                    </div>
                    <button class="btn-concluir" onclick="abrirModalConclusao('${prazo.id}')">✓</button>
                `;
                container.appendChild(div);
            }
        }
        
        // Sugestão 2: Prova próxima
        const provasProximas = prazos
            .filter(p => p.tipo === 'prova' && !p.concluido)
            .map(p => {
                const dataProva = new Date(p.data + 'T12:00:00');
                const diasRestantes = Math.ceil((dataProva - hoje) / (1000 * 60 * 60 * 24));
                return { ...p, diasRestantes };
            })
            .filter(p => p.diasRestantes <= 7 && p.diasRestantes > 0)
            .sort((a, b) => a.diasRestantes - b.diasRestantes);
        
        if (provasProximas.length > 0) {
            const prova = provasProximas[0];
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.innerHTML = `
                <div>
                    <h4>📚 Prova em ${prova.diasRestantes} dias</h4>
                    <p>${prova.nome} - Começar revisão hoje!</p>
                </div>
                <button class="btn-concluir" onclick="alert('Bons estudos!')">→</button>
            `;
            container.appendChild(div);
        }
        
        // Sugestão 3: CC50
        let totalAulas = 0;
        let concluidas = 0;
        cc50Modulos.forEach((modulo, i) => {
            modulo.aulas.forEach((aula, j) => {
                totalAulas++;
                const aulaId = `cc50-${i}-${j}`;
                if (estado.cc50Progresso[aulaId]?.status === 'completa') concluidas++;
            });
        });
        
        if (concluidas < totalAulas) {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.innerHTML = `
                <div>
                    <h4>🎓 CC50</h4>
                    <p>Você já fez ${concluidas} de ${totalAulas} aulas. Continue!</p>
                </div>
                <button class="btn-concluir" onclick="document.getElementById('nav-cc50').click()">Ir</button>
            `;
            container.appendChild(div);
        }
        
    } catch (erro) {
        console.error('Erro ao renderizar sugestões:', erro);
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
        
        let mensagem = `📅 Eventos em ${dia}/${estado.mesCalendario + 1}:\n\n`;
        eventos.forEach(e => {
            mensagem += `- ${e.nome} (${e.tipo})\n`;
        });
        
        alert(mensagem);
        
    } catch (erro) {
        console.error('Erro ao ver eventos:', erro);
    }
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
// FUNÇÕES AUXILIARES
// ============================================

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

function getNomeMateria(materia) {
    const nomes = {
        es: 'Engenharia de Software',
        ic: 'Introdução à Computação',
        lp: 'Lógica de Programação',
        bd: 'Banco de Dados I',
        bootcamp: 'Bootcamp I',
        fundamentos: 'Fundamentos',
        cc50: 'CC50'
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
        
        toast.innerHTML = `<i class="fas ${icone}"></i><span>${mensagem}</span>`;
        container.appendChild(toast);
        
        setTimeout(() => toast.remove(), 3000);
        
    } catch (erro) {
        console.error('Erro ao mostrar toast:', erro);
    }
}

// ============================================
// CONFIGURAÇÃO DO ENTER NO LOGIN
// ============================================

window.fazerLogin = fazerLogin;

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM carregado');
    
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            fazerLogin();
        });
    }
    
    const btnLogin = document.getElementById('btn-login');
    if (btnLogin) {
        btnLogin.addEventListener('click', fazerLogin);
    }
    
    const campos = ['login-usuario', 'login-senha'];
    campos.forEach(id => {
        const campo = document.getElementById(id);
        if (campo) {
            campo.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    fazerLogin();
                }
            });
        }
    });
});

// ============================================
// EXPOR FUNÇÕES GLOBAIS
// ============================================

window.fazerLogout = fazerLogout;
window.abrirModalConclusao = abrirModalConclusao;
window.fecharModal = fecharModal;
window.confirmarConclusao = confirmarConclusao;
window.toggleChecklistItem = toggleChecklistItem;
window.criarNovaNota = criarNovaNota;
window.salvarNota = salvarNota;
window.editarNota = editarNota;
window.excluirNota = excluirNota;
window.fixarNota = fixarNota;
window.fecharModalNota = fecharModalNota;
window.mesAnterior = mesAnterior;
window.proximoMes = proximoMes;
window.mostrarPlanoAula = mostrarPlanoAula;
window.verEventosDoDia = verEventosDoDia;
window.salvarAulaCC50 = salvarAulaCC50;
window.fecharModalAulaCC50 = fecharModalAulaCC50;

console.log('🚀 Sistema carregado com sucesso!');
