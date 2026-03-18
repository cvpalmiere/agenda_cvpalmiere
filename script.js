// ============================================
// AGENDA PALMIERE - SISTEMA INTELIGENTE DE ESTUDOS
// VERSÃO CORRIGIDA - AZUL MARINHO + DOURADO
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
    timerTempo: 0, // em segundos
    timerInterval: null,
    mesCalendario: new Date().getMonth(),
    anoCalendario: new Date().getFullYear(),
    atividadeConcluindo: null,
    checklistItens: []
};

// ============================================
// DADOS COMPLETOS (PRAZOS, PLANOS, ETC)
// ============================================

const prazos = [
    // ===== ENGENHARIA DE SOFTWARE (Turma C) =====
    { 
        id: 'es-seminario1', 
        materia: 'es', 
        tipo: 'trabalho', 
        nome: 'Seminário 01 - Métodos Ágeis', 
        data: '2026-04-14', 
        diasPrevistos: 5, 
        concluido: false,
        dataInicio: '2026-03-17',
        anotacoes: ''
    },
    { 
        id: 'es-prova1', 
        materia: 'es', 
        tipo: 'prova', 
        nome: '1ª Avaliação ES', 
        data: '2026-04-21', 
        diasPrevistos: 7, 
        concluido: false,
        dataInicio: '2026-03-17',
        anotacoes: ''
    },
    { 
        id: 'es-seminario2', 
        materia: 'es', 
        tipo: 'trabalho', 
        nome: 'Seminário 02 - Plano de Projeto', 
        data: '2026-06-09', 
        diasPrevistos: 7, 
        concluido: false,
        dataInicio: '2026-05-01',
        anotacoes: ''
    },
    { 
        id: 'es-prova2', 
        materia: 'es', 
        tipo: 'prova', 
        nome: '2ª Avaliação ES', 
        data: '2026-06-16', 
        diasPrevistos: 7, 
        concluido: false,
        dataInicio: '2026-05-15',
        anotacoes: ''
    },
    
    // ===== INTRODUÇÃO À COMPUTAÇÃO =====
    { 
        id: 'ic-prova1', 
        materia: 'ic', 
        tipo: 'prova', 
        nome: '1ª Avaliação IC', 
        data: '2026-04-15', 
        diasPrevistos: 5, 
        concluido: false,
        dataInicio: '2026-03-17',
        anotacoes: ''
    },
    { 
        id: 'ic-seminario', 
        materia: 'ic', 
        tipo: 'trabalho', 
        nome: 'Seminário Tendências', 
        data: '2026-06-03', 
        diasPrevistos: 4, 
        concluido: false,
        dataInicio: '2026-05-15',
        anotacoes: ''
    },
    { 
        id: 'ic-prova2', 
        materia: 'ic', 
        tipo: 'prova', 
        nome: '2ª Avaliação IC', 
        data: '2026-06-10', 
        diasPrevistos: 5, 
        concluido: false,
        dataInicio: '2026-05-20',
        anotacoes: ''
    },
    { 
        id: 'ic-ace', 
        materia: 'ic', 
        tipo: 'entrega', 
        nome: 'Relatório ACE', 
        data: '2026-06-17', 
        diasPrevistos: 10, 
        concluido: false,
        dataInicio: '2026-04-01',
        anotacoes: ''
    },
    
    // ===== LÓGICA DE PROGRAMAÇÃO =====
    { 
        id: 'lp-prova1', 
        materia: 'lp', 
        tipo: 'prova', 
        nome: '1ª Avaliação LP', 
        data: '2026-04-09', 
        diasPrevistos: 5, 
        concluido: false,
        dataInicio: '2026-03-17',
        anotacoes: ''
    },
    { 
        id: 'lp-prova2', 
        materia: 'lp', 
        tipo: 'prova', 
        nome: '2ª Avaliação LP', 
        data: '2026-05-21', 
        diasPrevistos: 5, 
        concluido: false,
        dataInicio: '2026-04-20',
        anotacoes: ''
    },
    { 
        id: 'lp-prova3', 
        materia: 'lp', 
        tipo: 'prova', 
        nome: '3ª Avaliação Online LP', 
        data: '2026-06-25', 
        diasPrevistos: 3, 
        concluido: false,
        dataInicio: '2026-06-01',
        anotacoes: ''
    },
    { 
        id: 'lp-lista', 
        materia: 'lp', 
        tipo: 'entrega', 
        nome: 'Lista de Exercícios LP', 
        data: '2026-06-25', 
        diasPrevistos: 7, 
        concluido: false,
        dataInicio: '2026-05-15',
        anotacoes: ''
    },
    
    // ===== BANCO DE DADOS I =====
    { 
        id: 'bd-prova1', 
        materia: 'bd', 
        tipo: 'prova', 
        nome: '1ª Avaliação BD', 
        data: '2026-04-24', 
        diasPrevistos: 5, 
        concluido: false,
        dataInicio: '2026-03-17',
        anotacoes: ''
    },
    { 
        id: 'bd-prova2', 
        materia: 'bd', 
        tipo: 'prova', 
        nome: '2ª Avaliação BD', 
        data: '2026-06-26', 
        diasPrevistos: 5, 
        concluido: false,
        dataInicio: '2026-05-20',
        anotacoes: ''
    },
    
    // ===== BOOTCAMP I =====
    { 
        id: 'bootcamp-desafio1', 
        materia: 'bootcamp', 
        tipo: 'entrega', 
        nome: 'Desafio - Entrega Inicial', 
        data: '2026-04-12', 
        diasPrevistos: 10, 
        concluido: true,
        dataConclusao: '2026-03-17',
        diasGastos: 3,
        anotacoes: 'Desafio inicial concluído antes do prazo'
    },
    { 
        id: 'bootcamp-desafio2', 
        materia: 'bootcamp', 
        tipo: 'entrega', 
        nome: 'Desafio - Entrega Intermediária', 
        data: '2026-05-17', 
        diasPrevistos: 10, 
        concluido: false,
        dataInicio: '2026-04-13',
        anotacoes: ''
    },
    { 
        id: 'bootcamp-desafio3', 
        materia: 'bootcamp', 
        tipo: 'entrega', 
        nome: 'Desafio - Entrega Final', 
        data: '2026-06-14', 
        diasPrevistos: 10, 
        concluido: false,
        dataInicio: '2026-05-25',
        anotacoes: ''
    },
    { 
        id: 'bootcamp-webaula1', 
        materia: 'bootcamp', 
        tipo: 'estudo', 
        nome: 'Webaula Síncrona 01', 
        data: '2026-03-19', 
        diasPrevistos: 1, 
        concluido: false,
        dataInicio: '2026-03-19',
        anotacoes: '8h da manhã'
    },
    { 
        id: 'bootcamp-webaula2', 
        materia: 'bootcamp', 
        tipo: 'estudo', 
        nome: 'Webaula Síncrona 02', 
        data: '2026-04-02', 
        diasPrevistos: 1, 
        concluido: false,
        dataInicio: '2026-04-02',
        anotacoes: '8h da manhã'
    },
    { 
        id: 'bootcamp-webaula3', 
        materia: 'bootcamp', 
        tipo: 'estudo', 
        nome: 'Webaula Síncrona 03', 
        data: '2026-04-16', 
        diasPrevistos: 1, 
        concluido: false,
        dataInicio: '2026-04-16',
        anotacoes: '8h da manhã'
    },
    { 
        id: 'bootcamp-webaula4', 
        materia: 'bootcamp', 
        tipo: 'estudo', 
        nome: 'Webaula Síncrona 04', 
        data: '2026-04-30', 
        diasPrevistos: 1, 
        concluido: false,
        dataInicio: '2026-04-30',
        anotacoes: '8h da manhã'
    },
    { 
        id: 'bootcamp-webaula5', 
        materia: 'bootcamp', 
        tipo: 'estudo', 
        nome: 'Webaula Síncrona 05', 
        data: '2026-05-21', 
        diasPrevistos: 1, 
        concluido: false,
        dataInicio: '2026-05-21',
        anotacoes: '8h da manhã'
    },
    { 
        id: 'bootcamp-webaula6', 
        materia: 'bootcamp', 
        tipo: 'estudo', 
        nome: 'Webaula Síncrona 06', 
        data: '2026-06-06', 
        diasPrevistos: 1, 
        concluido: false,
        dataInicio: '2026-06-06',
        anotacoes: '8h da manhã (sábado excepcional)'
    },
    
    // ===== FUNDAMENTOS DE ENGENHARIA =====
    { 
        id: 'fund-exercicios1', 
        materia: 'fundamentos', 
        tipo: 'entrega', 
        nome: 'Exercícios Avaliativos 1 e 2', 
        data: '2026-03-29', 
        diasPrevistos: 3, 
        concluido: true,
        dataConclusao: '2026-03-17',
        diasGastos: 2,
        anotacoes: 'Exercícios concluídos com antecedência'
    },
    { 
        id: 'fund-sist1', 
        materia: 'fundamentos', 
        tipo: 'entrega', 
        nome: 'Sistematização 01', 
        data: '2026-04-12', 
        diasPrevistos: 7, 
        concluido: false,
        dataInicio: '2026-03-17',
        anotacoes: ''
    },
    { 
        id: 'fund-exercicios2', 
        materia: 'fundamentos', 
        tipo: 'entrega', 
        nome: 'Exercícios Avaliativos 3 e 4', 
        data: '2026-05-03', 
        diasPrevistos: 4, 
        concluido: false,
        dataInicio: '2026-04-13',
        anotacoes: ''
    },
    { 
        id: 'fund-sist2', 
        materia: 'fundamentos', 
        tipo: 'entrega', 
        nome: 'Sistematização 02', 
        data: '2026-05-31', 
        diasPrevistos: 7, 
        concluido: false,
        dataInicio: '2026-04-27',
        anotacoes: ''
    },
    { 
        id: 'fund-avaliacao-online', 
        materia: 'fundamentos', 
        tipo: 'prova', 
        nome: 'Avaliação Online', 
        data: '2026-06-06', 
        diasPrevistos: 3, 
        concluido: false,
        dataInicio: '2026-06-01',
        anotacoes: ''
    }
];

// ============================================
// PLANOS DE AULA DETALHADOS
// ============================================

const planosAula = {
    es: [
        { data: '2026-03-17', semana: '17-21/03', tema: 'Identificação de Requisitos', conteudo: 'Definição de requisito; Identificação de requisitos; Documentos de requisitos', paraCasa: 'Ler capítulo sobre requisitos' },
        { data: '2026-03-24', semana: '24-28/03', tema: 'Identificação de Requisitos', conteudo: 'Engenharia de requisitos; Estudos de caso', paraCasa: 'Exercícios de requisitos' },
        { data: '2026-03-31', semana: '30/03-03/04', tema: 'Projeto de Sistema', conteudo: 'Definição de projeto de software; Projeto conceitual e técnico', paraCasa: 'Ler sobre arquitetura' },
        { data: '2026-04-07', semana: '06-11/04', tema: 'Projeto de Sistema', conteudo: 'Conceitos de abstração, refinamento, modularização', paraCasa: 'Preparar seminário' },
        { data: '2026-04-14', semana: '13-18/04', tema: 'Seminário 01', conteudo: 'Apresentação sobre Métodos Ágeis e Tradicional', paraCasa: 'Avaliação' },
        { data: '2026-04-28', semana: '27-30/04', tema: 'Gerenciamento de Projetos', conteudo: 'Definição de projeto; Escopo, cronograma e riscos', paraCasa: 'Ler sobre PMBOK' },
        { data: '2026-05-05', semana: '04-08/05', tema: 'Implementação de Sistemas', conteudo: 'Padrões de programação; Gerenciamento de configuração', paraCasa: 'Exercícios práticos' },
        { data: '2026-05-12', semana: '11-16/05', tema: 'Testes de Software', conteudo: 'Erro, falha e depuração; Fases de teste', paraCasa: 'Estudar técnicas de teste' },
        { data: '2026-05-19', semana: '18-23/05', tema: 'Testes de Software', conteudo: 'Técnicas e critérios de teste', paraCasa: 'Preparar PPS' },
        { data: '2026-05-26', semana: '25-30/05', tema: 'Implantação e Manutenção', conteudo: 'Ambientes de desenvolvimento e produção; Evolução de sistemas', paraCasa: 'Estudar casos' },
        { data: '2026-06-02', semana: '01-06/06', tema: 'Implantação e Manutenção', conteudo: 'Natureza da manutenção; Problemas na manutenção', paraCasa: 'Finalizar PPS' },
        { data: '2026-06-09', semana: '08-13/06', tema: 'Seminário 02', conteudo: 'Apresentação do Plano de Projeto de Software', paraCasa: 'Avaliação' },
        { data: '2026-06-16', semana: '15-20/06', tema: 'Prova', conteudo: '2ª Avaliação Presencial', paraCasa: 'Estudar' },
        { data: '2026-06-23', semana: '22-27/06', tema: 'Encerramento', conteudo: 'Estudos de casos e feedback', paraCasa: '' }
    ],
    
    ic: [
        { data: '2026-03-18', semana: '17-21/03', tema: 'Arquitetura de Hardware', conteudo: 'CPU, memória, registradores, unidade de controle, E/S', paraCasa: 'Revisar Von Neumann' },
        { data: '2026-03-25', semana: '24-28/03', tema: 'Arquitetura de Hardware', conteudo: 'Periféricos, software, sistemas operacionais', paraCasa: 'Exercícios' },
        { data: '2026-04-01', semana: '30/03-03/04', tema: 'Informação e Sistemas', conteudo: 'Sistemas, dado, informação, conhecimento', paraCasa: 'Ler artigos' },
        { data: '2026-04-08', semana: '06-11/04', tema: 'Informação e Sistemas', conteudo: 'Tipos de sistemas de informação', paraCasa: 'Estudar para prova' },
        { data: '2026-04-15', semana: '13-18/04', tema: 'Prova', conteudo: '1ª Avaliação Presencial', paraCasa: '' },
        { data: '2026-04-22', semana: '22/04', tema: 'Redes de Computadores', conteudo: 'Histórico, elementos, classificação, topologia', paraCasa: 'Pesquisar' },
        { data: '2026-04-29', semana: '27-30/04', tema: 'Redes de Computadores', conteudo: 'Dispositivos, meios de transmissão, arquitetura', paraCasa: 'Exercícios' },
        { data: '2026-05-06', semana: '04-08/05', tema: 'Segurança da Informação', conteudo: 'Conceitos, atributos, ameaças e ataques', paraCasa: 'Ler notícias' },
        { data: '2026-05-13', semana: '11-16/05', tema: 'Segurança da Informação', conteudo: 'Mecanismos de segurança, cibernética', paraCasa: 'Estudo de caso' },
        { data: '2026-05-20', semana: '18-23/05', tema: 'Governança e Gestão de TI', conteudo: 'Histórico, evolução, papel estratégico', paraCasa: 'Pesquisar frameworks' },
        { data: '2026-05-27', semana: '25-30/05', tema: 'Governança e Gestão de TI', conteudo: 'COBIT, ITIL, PMBOK', paraCasa: 'Preparar seminário' },
        { data: '2026-06-03', semana: '01-06/06', tema: 'Seminário', conteudo: 'Tendências e novas tecnologias', paraCasa: 'Apresentação' },
        { data: '2026-06-10', semana: '08-13/06', tema: 'Prova', conteudo: '2ª Avaliação Presencial', paraCasa: '' },
        { data: '2026-06-17', semana: '15-20/06', tema: 'ACE', conteudo: 'Entrega do Relatório Final', paraCasa: '' },
        { data: '2026-06-24', semana: '22-27/06', tema: 'Encerramento', conteudo: 'Apresentação de resultados', paraCasa: '' }
    ],
    
    lp: [
        { data: '2026-03-19', semana: '17-21/03', tema: 'Elementos básicos', conteudo: 'Tipos primitivos, constantes, variáveis, expressões', paraCasa: 'Exercícios' },
        { data: '2026-03-26', semana: '24-28/03', tema: 'Estruturas condicionais', conteudo: 'if, else, switch', paraCasa: 'Praticar' },
        { data: '2026-04-02', semana: '30/03-03/04', tema: 'Estruturas de repetição', conteudo: 'for, while, do-while', paraCasa: 'Exercícios' },
        { data: '2026-04-09', semana: '06-11/04', tema: 'Prova', conteudo: '1ª Avaliação Presencial', paraCasa: '' },
        { data: '2026-04-16', semana: '13-18/04', tema: 'Vetores', conteudo: 'Vetores: representação e operação', paraCasa: 'Praticar' },
        { data: '2026-04-23', semana: '20-24/04', tema: 'Vetores', conteudo: 'Exercícios com vetores', paraCasa: 'Lista' },
        { data: '2026-04-30', semana: '27-30/04', tema: 'Matrizes', conteudo: 'Matrizes: representação e operação', paraCasa: 'Exercícios' },
        { data: '2026-05-07', semana: '04-08/05', tema: 'Matrizes', conteudo: 'Exercícios com matrizes', paraCasa: 'Desafios' },
        { data: '2026-05-14', semana: '11-16/05', tema: 'Funções', conteudo: 'Funções, variáveis globais e locais', paraCasa: 'Praticar' },
        { data: '2026-05-21', semana: '18-23/05', tema: 'Prova', conteudo: '2ª Avaliação Presencial', paraCasa: '' },
        { data: '2026-05-28', semana: '25-30/05', tema: 'Funções', conteudo: 'Passagem de parâmetros', paraCasa: 'Exercícios' },
        { data: '2026-06-11', semana: '08-13/06', tema: 'Funções', conteudo: 'Exercícios avançados', paraCasa: 'Preparar lista' },
        { data: '2026-06-18', semana: '15-20/06', tema: 'Revisão', conteudo: 'Revisão geral', paraCasa: 'Estudar' },
        { data: '2026-06-25', semana: '22-27/06', tema: 'Prova', conteudo: '3ª Avaliação Online + Entrega Lista', paraCasa: '' },
        { data: '2026-07-02', semana: '29/06-03/07', tema: 'Revisão', conteudo: 'Revisão final', paraCasa: '' }
    ],
    
    bd: [
        { data: '2026-03-20', semana: '17-21/03', tema: 'Modelagem ER', conteudo: 'Entidades, atributos e relacionamentos', paraCasa: 'Exercícios' },
        { data: '2026-03-27', semana: '24-28/03', tema: 'Modelagem ER', conteudo: 'Cardinalidades e entidades associativas', paraCasa: 'Diagramas' },
        { data: '2026-04-03', semana: '30/03-03/04', tema: 'Modelagem ER', conteudo: 'Generalização e especialização', paraCasa: 'Projetar BD' },
        { data: '2026-04-10', semana: '06-11/04', tema: 'Revisão', conteudo: 'Revisão para prova', paraCasa: 'Estudar' },
        { data: '2026-04-24', semana: '20-24/04', tema: 'Prova', conteudo: '1ª Avaliação Presencial', paraCasa: '' },
        { data: '2026-05-08', semana: '04-08/05', tema: 'SQL', conteudo: 'DDL - CREATE, ALTER, DROP', paraCasa: 'Praticar' },
        { data: '2026-05-15', semana: '11-16/05', tema: 'SQL', conteudo: 'DML - SELECT, INSERT', paraCasa: 'Consultas' },
        { data: '2026-05-22', semana: '18-23/05', tema: 'SQL', conteudo: 'UPDATE, DELETE, WHERE', paraCasa: 'Exercícios' },
        { data: '2026-05-29', semana: '25-30/05', tema: 'SQL', conteudo: 'ORDER BY, filtros', paraCasa: 'Consultas complexas' },
        { data: '2026-06-05', semana: '01-06/06', tema: 'Modelagem Multidimensional', conteudo: 'Star Schema', paraCasa: 'Estudar' },
        { data: '2026-06-12', semana: '08-13/06', tema: 'Revisão', conteudo: 'Revisão para prova', paraCasa: 'Exercícios' },
        { data: '2026-06-19', semana: '15-20/06', tema: 'Revisão', conteudo: 'SQL avançado', paraCasa: 'Preparar' },
        { data: '2026-06-26', semana: '22-27/06', tema: 'Prova', conteudo: '2ª Avaliação Presencial', paraCasa: '' },
        { data: '2026-07-03', semana: '29/06-03/07', tema: 'Encerramento', conteudo: 'Resultados finais', paraCasa: '' }
    ],
    
    bootcamp: [
        { data: '2026-03-19', semana: '17-21/03', tema: 'Webaula 01', conteudo: 'Oficina Prática', paraCasa: 'Desafio Inicial' },
        { data: '2026-04-02', semana: '30/03-03/04', tema: 'Webaula 02', conteudo: 'Oficina Prática', paraCasa: 'Desafio' },
        { data: '2026-04-16', semana: '13-18/04', tema: 'Webaula 03', conteudo: 'Oficina Prática', paraCasa: 'Entrega Intermediária' },
        { data: '2026-04-30', semana: '27-30/04', tema: 'Webaula 04', conteudo: 'Oficina Prática', paraCasa: 'Desafio' },
        { data: '2026-05-21', semana: '18-23/05', tema: 'Webaula 05', conteudo: 'Oficina Prática', paraCasa: 'Preparar Final' },
        { data: '2026-06-06', semana: '01-06/06', tema: 'Webaula 06', conteudo: 'Oficina Prática (sábado)', paraCasa: 'Entrega Final' }
    ],
    
    fundamentos: [
        { data: '2026-03-19', semana: '17-21/03', tema: 'Webconferência 01', conteudo: 'Conteúdo Unidades 1 e 2', paraCasa: 'Exercícios' },
        { data: '2026-03-26', semana: '24-28/03', tema: 'EncONtro 01', conteudo: 'Discussão e dúvidas', paraCasa: 'Sistematização' },
        { data: '2026-04-09', semana: '06-11/04', tema: 'Webrevisão 01', conteudo: 'Revisão para prova', paraCasa: 'Estudar' },
        { data: '2026-04-13', semana: '13-18/04', tema: 'Prova Presencial', conteudo: 'Avaliação Presencial 01', paraCasa: '' },
        { data: '2026-04-23', semana: '20-24/04', tema: 'EncONtro 02', conteudo: 'Discussão', paraCasa: 'Exercícios 3 e 4' },
        { data: '2026-05-07', semana: '04-08/05', tema: 'Webconferência 02', conteudo: 'Unidades 3 e 4', paraCasa: 'Sistematização 02' },
        { data: '2026-05-28', semana: '25-30/05', tema: 'Webrevisão 02', conteudo: 'Revisão', paraCasa: 'Avaliação Online' },
        { data: '2026-06-01', semana: '01-06/06', tema: 'Avaliação Online', conteudo: 'Unidades 3 e 4', paraCasa: '' }
    ]
};

// ============================================
// CURSOS EXTRAS
// ============================================

const cursosExtras = [
    { id: 'python', nome: 'Python Santander', horas: 30, concluido: false, progresso: 0 },
    { id: 'html', nome: 'HTML Coddy', horas: 15, concluido: false, progresso: 0 }
];

// ============================================
// NOTAS
// ============================================

let notas = [];

// ============================================
// FUNÇÕES DE INICIALIZAÇÃO
// ============================================

function inicializarSistema() {
    console.log('Agenda Palmiere inicializada para Carla');
    
    carregarDados();
    inicializarData();
    inicializarNavegacao();
    inicializarEventListeners();
    atualizarInterface();
    verificarVersao();
    
    mostrarToast('Bem-vinda, Carla! 🎉', 'success');
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
            prazos.forEach((prazo, index) => {
                const atualizado = prazosAtualizados.find(p => p.id === prazo.id);
                if (atualizado) {
                    prazos[index] = { ...prazo, ...atualizado };
                }
            });
        }
        
        const checklistSalvo = localStorage.getItem('agenda_checklist');
        if (checklistSalvo) {
            estado.checklistItens = JSON.parse(checklistSalvo);
        }
    } catch (e) {
        console.error('Erro ao carregar dados:', e);
    }
}

function inicializarData() {
    atualizarDataHora();
    setInterval(atualizarDataHora, 60000); // atualizar a cada minuto
}

function atualizarDataHora() {
    const agora = new Date();
    
    // Data extensa
    const opcoes = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dataExtensa = document.getElementById('data-extensa');
    if (dataExtensa) {
        dataExtensa.querySelector('span').textContent = agora.toLocaleDateString('pt-BR', opcoes);
    }
    
    // Dia da semana (para a grade)
    const diaSemana = document.getElementById('dia-semana');
    if (diaSemana) {
        const dias = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
        diaSemana.textContent = dias[agora.getDay()];
    }
}

function inicializarNavegacao() {
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
}

function inicializarEventListeners() {
    // Login
    document.getElementById('btn-entrar').addEventListener('click', fazerLogin);
    
    // Sair
    document.getElementById('btn-sair').addEventListener('click', fazerLogout);
    
    // Timer
    document.getElementById('btn-iniciar-timer').addEventListener('click', iniciarTimer);
    document.getElementById('btn-pausar-timer').addEventListener('click', pausarTimer);
    document.getElementById('btn-zerar-timer').addEventListener('click', zerarTimer);
    
    // Checklist
    document.getElementById('btn-resetar-checklist').addEventListener('click', resetarChecklistDiario);
    
    // Notas
    document.getElementById('btn-nova-nota').addEventListener('click', criarNovaNota);
    document.getElementById('busca-notas').addEventListener('input', buscarNotas);
    
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
    document.getElementById('mes-anterior').addEventListener('click', mesAnterior);
    document.getElementById('proximo-mes').addEventListener('click', proximoMes);
    
    // Planos de aula
    document.querySelectorAll('.plano-card').forEach(card => {
        card.addEventListener('click', () => {
            const materia = card.dataset.materia;
            mostrarPlanoAula(materia);
        });
    });
    
    // Modais
    document.getElementById('btn-cancelar-modal').addEventListener('click', fecharModal);
    document.getElementById('btn-confirmar-conclusao').addEventListener('click', confirmarConclusao);
    document.getElementById('btn-cancelar-nota').addEventListener('click', fecharModalNota);
    document.getElementById('btn-salvar-nota').addEventListener('click', salvarNota);
    document.getElementById('btn-fechar-evento').addEventListener('click', fecharModalEvento);
    
    // Enter no login
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && document.getElementById('login-container').style.display !== 'none') {
            fazerLogin();
        }
    });
}

function verificarVersao() {
    const versaoSalva = localStorage.getItem('agenda_versao');
    if (versaoSalva !== VERSAO) {
        localStorage.setItem('agenda_versao', VERSAO);
    }
}

// ============================================
// FUNÇÕES DE LOGIN/LOGOUT
// ============================================

function fazerLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'Carla' && password === 'Cacau') {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('app-container').style.display = 'block';
        inicializarSistema();
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}

function fazerLogout() {
    document.getElementById('login-container').style.display = 'flex';
    document.getElementById('app-container').style.display = 'none';
    
    // Parar timer se estiver ativo
    if (estado.timerAtivo) {
        pausarTimer();
    }
    
    zerarTimer();
}

// ============================================
// FUNÇÕES DE INTERFACE PRINCIPAL
// ============================================

function atualizarInterface() {
    renderizarPrazosUrgentes();
    renderizarGradeDia();
    renderizarSugestoes();
    renderizarChecklist();
    renderizarPrazos('todos');
    renderizarCalendario();
    renderizarProgresso();
    renderizarNotas();
    atualizarEstatisticasNotas();
}

function renderizarPrazosUrgentes() {
    const container = document.getElementById('urgentes-lista');
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
        container.innerHTML = '<p class="text-muted">Nenhum prazo urgente. Aproveite para adiantar estudos!</p>';
        return;
    }
    
    prazosProximos.forEach(prazo => {
        const card = document.createElement('div');
        card.className = `urgent-card ${prazo.tipo}`;
        card.onclick = () => abrirModalConclusao(prazo.id);
        
        let icone = '';
        if (prazo.tipo === 'prova') icone = 'fa-file-alt';
        else if (prazo.tipo === 'trabalho') icone = 'fa-users';
        else icone = 'fa-upload';
        
        card.innerHTML = `
            <div class="urgent-icon">
                <i class="fas ${icone}"></i>
            </div>
            <div class="urgent-info">
                <h4>${prazo.nome}</h4>
                <p>${getNomeMateria(prazo.materia)}</p>
                <div class="dias ${prazo.diasRestantes <= 7 ? 'urgente' : 'atencao'}">${prazo.diasRestantes} dias</div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

function renderizarGradeDia() {
    const hoje = new Date();
    const diaSemana = hoje.getDay();
    
    // Verificar fim de semana
    if (diaSemana === 0 || diaSemana === 6) {
        document.getElementById('periodo-manha').innerHTML = '<div class="off-day"><i class="fas fa-umbrella-beach"></i> Dia de descanso! 🎉</div>';
        document.getElementById('periodo-tarde').innerHTML = '<div class="off-day"><i class="fas fa-umbrella-beach"></i> Dia de descanso! 🎉</div>';
        document.getElementById('periodo-noite').innerHTML = '<div class="off-day"><i class="fas fa-umbrella-beach"></i> Dia de descanso! 🎉</div>';
        return;
    }
    
    // Manhã
    const manhaContainer = document.getElementById('periodo-manha');
    manhaContainer.innerHTML = '';
    
    const materiaManha = getMateriaManha(diaSemana);
    if (materiaManha) {
        const planoHoje = getPlanoAulaDoDia(materiaManha, hoje);
        if (planoHoje) {
            manhaContainer.appendChild(criarAtividadeElemento(
                materiaManha,
                `Estudar: ${planoHoje.tema}`,
                planoHoje.conteudo
            ));
        } else {
            manhaContainer.appendChild(criarAtividadeElemento(
                materiaManha,
                'Pré-aula',
                'Revisar conteúdo da matéria'
            ));
        }
    }
    
    // Tarde
    const tardeContainer = document.getElementById('periodo-tarde');
    tardeContainer.innerHTML = '';
    
    const materiaTarde = getMateriaTarde(diaSemana);
    if (materiaTarde) {
        const planoHoje = getPlanoAulaDoDia(materiaTarde, hoje);
        if (planoHoje) {
            tardeContainer.appendChild(criarAtividadeElemento(
                materiaTarde,
                `Aula: ${planoHoje.tema}`,
                planoHoje.conteudo,
                true
            ));
        } else {
            tardeContainer.appendChild(criarAtividadeElemento(
                materiaTarde,
                'Aula',
                'Aula presencial',
                true
            ));
        }
    }
    
    // Noite
    const noiteContainer = document.getElementById('periodo-noite');
    noiteContainer.innerHTML = '';
    
    const sugestaoExtra = sugeriCursoExtra();
    if (sugestaoExtra) {
        noiteContainer.appendChild(criarAtividadeElemento(
            'extras',
            'Curso Extra',
            sugestaoExtra
        ));
    }
}

function getPlanoAulaDoDia(materia, data) {
    if (!planosAula[materia]) return null;
    
    const dataStr = data.toISOString().split('T')[0];
    return planosAula[materia].find(aula => aula.data === dataStr);
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
        ${!isAula && materia !== 'extras' ? '<button class="btn-concluir" onclick="abrirModalConclusao(\'' + materia + '\')"><i class="fas fa-check"></i> Concluir</button>' : ''}
    `;
    
    return div;
}

function renderizarSugestoes() {
    const container = document.getElementById('lista-sugestoes');
    if (!container) return;
    
    container.innerHTML = '';
    
    const hoje = new Date();
    const diaSemana = hoje.getDay();
    
    if (diaSemana === 0 || diaSemana === 6) {
        container.innerHTML = '<p class="text-muted">Dia de descanso! Aproveite para recarregar as energias.</p>';
        return;
    }
    
    const prazosPendentes = prazos
        .filter(p => !p.concluido)
        .sort((a, b) => new Date(a.data) - new Date(b.data))
        .slice(0, 3);
    
    prazosPendentes.forEach(prazo => {
        const div = document.createElement('div');
        div.className = `suggestion-item ${prazo.materia}`;
        
        const diasAte = Math.ceil((new Date(prazo.data + 'T12:00:00') - hoje) / (1000 * 60 * 60 * 24));
        
        div.innerHTML = `
            <div class="sugestao-info">
                <h4>${prazo.nome}</h4>
                <p>${getNomeMateria(prazo.materia)} • ${diasAte} dias restantes</p>
            </div>
            <button class="btn-concluir" onclick="abrirModalConclusao('${prazo.id}')">
                <i class="fas fa-check"></i> Concluir
            </button>
        `;
        
        container.appendChild(div);
    });
}

// ============================================
// FUNÇÕES DE CHECKLIST
// ============================================

function renderizarChecklist() {
    const container = document.getElementById('checklist-diario');
    if (!container) return;
    
    container.innerHTML = '';
    
    const hoje = new Date();
    const diaSemana = hoje.getDay();
    
    if (diaSemana === 0 || diaSemana === 6) {
        container.innerHTML = '<p class="text-muted">Dia de descanso! Nenhuma tarefa.</p>';
        document.getElementById('checklist-progress').textContent = '0/0 concluídas';
        return;
    }
    
    // Criar itens do checklist baseado nas atividades do dia
    const itensChecklist = [];
    
    // Manhã
    const materiaManha = getMateriaManha(diaSemana);
    if (materiaManha) {
        itensChecklist.push({
            id: `check-manha-${hoje.toISOString().split('T')[0]}`,
            materia: materiaManha,
            titulo: `Estudar ${getNomeMateria(materiaManha)} (pré-aula)`,
            concluido: estado.checklistItens?.includes(`check-manha-${hoje.toISOString().split('T')[0]}`) || false
        });
    }
    
    // Tarde
    const materiaTarde = getMateriaTarde(diaSemana);
    if (materiaTarde) {
        itensChecklist.push({
            id: `check-tarde-${hoje.toISOString().split('T')[0]}`,
            materia: materiaTarde,
            titulo: `Assistir aula de ${getNomeMateria(materiaTarde)}`,
            concluido: estado.checklistItens?.includes(`check-tarde-${hoje.toISOString().split('T')[0]}`) || false
        });
    }
    
    // Cursos extras
    itensChecklist.push({
        id: `check-noite-${hoje.toISOString().split('T')[0]}`,
        materia: 'extras',
        titulo: 'Fazer curso extra (Python/HTML)',
        concluido: estado.checklistItens?.includes(`check-noite-${hoje.toISOString().split('T')[0]}`) || false
    });
    
    // Contar concluídos
    const concluidos = itensChecklist.filter(item => item.concluido).length;
    document.getElementById('checklist-progress').textContent = `${concluidos}/${itensChecklist.length} concluídas`;
    
    itensChecklist.forEach(item => {
        const div = document.createElement('div');
        div.className = `checklist-item ${item.concluido ? 'concluido' : ''}`;
        
        div.innerHTML = `
            <div class="checklist-checkbox ${item.concluido ? 'checked' : ''}" onclick="toggleChecklistItem('${item.id}')">
                ${item.concluido ? '<i class="fas fa-check"></i>' : ''}
            </div>
            <div class="checklist-info">
                <h4>${item.titulo}</h4>
                <p>${getNomeMateria(item.materia)}</p>
            </div>
            <span class="checklist-materia ${item.materia}">${item.materia.toUpperCase()}</span>
        `;
        
        container.appendChild(div);
    });
}

function toggleChecklistItem(itemId) {
    if (!estado.checklistItens) {
        estado.checklistItens = [];
    }
    
    const index = estado.checklistItens.indexOf(itemId);
    if (index === -1) {
        estado.checklistItens.push(itemId);
        mostrarToast('✅ Tarefa concluída!', 'success');
    } else {
        estado.checklistItens.splice(index, 1);
        mostrarToast('Tarefa desmarcada', 'info');
    }
    
    localStorage.setItem('agenda_checklist', JSON.stringify(estado.checklistItens));
    renderizarChecklist();
}

function resetarChecklistDiario() {
    if (confirm('Tem certeza que deseja resetar o checklist de hoje?')) {
        estado.checklistItens = [];
        localStorage.setItem('agenda_checklist', JSON.stringify(estado.checklistItens));
        renderizarChecklist();
        mostrarToast('Checklist resetado!', 'info');
    }
}

// ============================================
// FUNÇÕES DE PRAZOS
// ============================================

function renderizarPrazos(filtro = 'todos') {
    const container = document.getElementById('prazos-lista');
    if (!container) return;
    
    container.innerHTML = '';
    
    const hoje = new Date();
    const prazosFiltrados = prazos
        .filter(p => filtro === 'todos' || p.tipo === filtro)
        .sort((a, b) => new Date(a.data) - new Date(b.data));
    
    if (prazosFiltrados.length === 0) {
        container.innerHTML = '<p class="text-muted">Nenhum prazo encontrado</p>';
        return;
    }
    
    // Atualizar estatísticas
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
        
        let icone = '';
        if (prazo.tipo === 'prova') icone = 'fa-file-alt';
        else if (prazo.tipo === 'trabalho') icone = 'fa-users';
        else icone = 'fa-upload';
        
        const statusBadge = prazo.concluido ? '<span class="badge-concluido">✅ Concluído</span>' : '';
        
        div.innerHTML = `
            <div class="prazo-icon ${prazo.tipo}">
                <i class="fas ${icone}"></i>
            </div>
            <div class="prazo-info">
                <h4>${prazo.nome} ${statusBadge}</h4>
                <p>${getNomeMateria(prazo.materia)}</p>
                ${prazo.diasPrevistos ? `<small>Previsto: ${prazo.diasPrevistos} dias de estudo</small>` : ''}
            </div>
            <div class="prazo-data">
                <i class="far fa-calendar"></i>
                ${formatarData(prazo.data)}
            </div>
            ${!prazo.concluido ? `<div class="prazo-dias ${classeDias}">${diasRestantes} dias</div>` : ''}
            ${!prazo.concluido ? `<button class="btn-concluir-pequeno" onclick="abrirModalConclusao('${prazo.id}')"><i class="fas fa-check"></i></button>` : ''}
        `;
        
        container.appendChild(div);
    });
}

// ============================================
// FUNÇÕES DE CALENDÁRIO
// ============================================

function renderizarCalendario() {
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
    
    const primeiroDiaSemana = primeiroDia.getDay();
    for (let i = 0; i < primeiroDiaSemana; i++) {
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
        
        if (dataAtual.getDay() === 0 || dataAtual.getDay() === 6) {
            div.classList.add('fim-semana');
        }
        
        div.innerHTML = `<span class="dia-numero">${dia}</span>`;
        
        const dataStr = `${estado.anoCalendario}-${String(estado.mesCalendario + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        const eventos = prazos.filter(p => p.data === dataStr && !p.concluido);
        
        if (eventos.length > 0) {
            const eventosDiv = document.createElement('div');
            eventosDiv.className = 'dia-eventos';
            eventos.forEach(evento => {
                const indicador = document.createElement('span');
                indicador.className = `evento-indicador ${evento.tipo}`;
                indicador.title = `${evento.nome} (${evento.tipo})`;
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
}

function verEventosDoDia(dia) {
    const dataStr = `${estado.anoCalendario}-${String(estado.mesCalendario + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    const eventos = prazos.filter(p => p.data === dataStr && !p.concluido);
    
    if (eventos.length === 0) {
        mostrarToast('Nenhum evento neste dia', 'info');
        return;
    }
    
    const modalTitulo = document.querySelector('#modal-dia-titulo span');
    modalTitulo.textContent = formatarData(dataStr);
    
    const listaEventos = document.getElementById('modal-eventos-lista');
    listaEventos.innerHTML = '';
    
    eventos.forEach(evento => {
        const div = document.createElement('div');
        div.className = 'evento-item';
        
        let icone = '';
        if (evento.tipo === 'prova') icone = '📝';
        else if (evento.tipo === 'trabalho') icone = '👥';
        else icone = '📦';
        
        div.innerHTML = `
            <span class="evento-cor ${evento.tipo}"></span>
            <span class="evento-nome">${icone} ${evento.nome}</span>
            <span class="evento-materia">${getNomeMateria(evento.materia)}</span>
        `;
        
        listaEventos.appendChild(div);
    });
    
    document.getElementById('modal-evento-dia').classList.add('active');
}

function fecharModalEvento() {
    document.getElementById('modal-evento-dia').classList.remove('active');
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
// FUNÇÕES DE NOTAS (REFORMULADO)
// ============================================

function renderizarNotas() {
    const container = document.getElementById('notas-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    const buscaTermo = document.getElementById('busca-notas').value.toLowerCase();
    let notasFiltradas = notas.filter(n => n.materia === estado.materiaAtual);
    
    if (buscaTermo) {
        notasFiltradas = notasFiltradas.filter(n => 
            n.titulo.toLowerCase().includes(buscaTermo) || 
            n.conteudo.toLowerCase().includes(buscaTermo) ||
            (n.tags && n.tags.some(tag => tag.toLowerCase().includes(buscaTermo)))
        );
    }
    
    // Separar fixadas
    const fixadas = notasFiltradas.filter(n => n.fixada);
    const normais = notasFiltradas.filter(n => !n.fixada);
    
    // Renderizar fixadas
    const fixadasContainer = document.querySelector('.fixadas-grid');
    if (fixadasContainer) {
        fixadasContainer.innerHTML = '';
        if (fixadas.length > 0) {
            fixadas.forEach(nota => criarElementoNota(nota, fixadasContainer));
        } else {
            fixadasContainer.innerHTML = '<p class="text-muted">Nenhuma nota fixada</p>';
        }
    }
    
    // Renderizar normais
    normais.sort((a, b) => new Date(b.data) - new Date(a.data));
    normais.forEach(nota => criarElementoNota(nota, container));
    
    if (notasFiltradas.length === 0) {
        container.innerHTML = '<p class="text-muted">Nenhuma nota encontrada. Crie uma nova nota!</p>';
    }
}

function criarElementoNota(nota, container) {
    const div = document.createElement('div');
    div.className = `nota-item ${nota.fixada ? 'fixada' : ''}`;
    div.dataset.materia = nota.materia;
    div.dataset.id = nota.id;
    
    div.innerHTML = `
        <div class="nota-header">
            <span class="nota-data">${formatarData(nota.data)}</span>
            <div class="nota-acoes">
                <button onclick="fixarNota('${nota.id}')" title="${nota.fixada ? 'Desfixar' : 'Fixar'}">
                    <i class="fas fa-thumbtack" style="color: ${nota.fixada ? 'var(--dourado)' : 'inherit'}"></i>
                </button>
                <button onclick="editarNota('${nota.id}')"><i class="fas fa-edit"></i></button>
                <button onclick="excluirNota('${nota.id}')"><i class="fas fa-trash"></i></button>
            </div>
        </div>
        <div class="nota-titulo">${nota.titulo}</div>
        <div class="nota-conteudo">${nota.conteudo.replace(/\n/g, '<br>')}</div>
        <div class="nota-tags">
            ${nota.tags ? nota.tags.map(tag => `<span class="nota-tag">#${tag}</span>`).join('') : ''}
        </div>
    `;
    
    container.appendChild(div);
}

function atualizarEstatisticasNotas() {
    document.getElementById('total-notas').textContent = notas.length;
    document.getElementById('total-es').textContent = notas.filter(n => n.materia === 'es').length;
    document.getElementById('total-ic').textContent = notas.filter(n => n.materia === 'ic').length;
    document.getElementById('total-lp').textContent = notas.filter(n => n.materia === 'lp').length;
    document.getElementById('total-bd').textContent = notas.filter(n => n.materia === 'bd').length;
}

function buscarNotas() {
    renderizarNotas();
}

function fixarNota(id) {
    const nota = notas.find(n => n.id === id);
    if (nota) {
        nota.fixada = !nota.fixada;
        localStorage.setItem('agenda_notas', JSON.stringify(notas));
        renderizarNotas();
        mostrarToast(nota.fixada ? 'Nota fixada! 📌' : 'Nota desafixada', 'success');
    }
}

function criarNovaNota() {
    document.getElementById('nota-materia').value = estado.materiaAtual;
    document.getElementById('nota-titulo').value = '';
    document.getElementById('nota-conteudo').value = '';
    document.getElementById('nota-tags').value = '';
    document.getElementById('nota-fixada').checked = false;
    
    document.getElementById('modal-nota').classList.add('active');
}

function salvarNota() {
    const materia = document.getElementById('nota-materia').value;
    const titulo = document.getElementById('nota-titulo').value;
    const conteudo = document.getElementById('nota-conteudo').value;
    const tagsInput = document.getElementById('nota-tags').value;
    const fixada = document.getElementById('nota-fixada').checked;
    
    if (!titulo || !conteudo) {
        mostrarToast('Preencha título e conteúdo!', 'error');
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
    mostrarToast('Nota salva com sucesso!', 'success');
}

function editarNota(id) {
    const nota = notas.find(n => n.id === id);
    if (!nota) return;
    
    document.getElementById('nota-materia').value = nota.materia;
    document.getElementById('nota-titulo').value = nota.titulo;
    document.getElementById('nota-conteudo').value = nota.conteudo;
    document.getElementById('nota-tags').value = nota.tags ? nota.tags.join(', ') : '';
    document.getElementById('nota-fixada').checked = nota.fixada || false;
    
    // Remover a nota antiga
    const index = notas.findIndex(n => n.id === id);
    if (index !== -1) notas.splice(index, 1);
    
    document.getElementById('modal-nota').classList.add('active');
}

function excluirNota(id) {
    if (!confirm('Tem certeza que deseja excluir esta nota?')) return;
    
    const index = notas.findIndex(n => n.id === id);
    if (index !== -1) {
        notas.splice(index, 1);
        localStorage.setItem('agenda_notas', JSON.stringify(notas));
        renderizarNotas();
        atualizarEstatisticasNotas();
        mostrarToast('Nota excluída!', 'success');
    }
}

function fecharModalNota() {
    document.getElementById('modal-nota').classList.remove('active');
}

// ============================================
// FUNÇÕES DE CONCLUSÃO DE ATIVIDADES
// ============================================

function abrirModalConclusao(atividadeId) {
    let atividade = prazos.find(p => p.id === atividadeId);
    
    if (!atividade) {
        atividade = {
            id: atividadeId,
            nome: `Estudo de ${getNomeMateria(atividadeId)}`,
            diasPrevistos: 1,
            materia: atividadeId
        };
    }
    
    estado.atividadeConcluindo = atividade;
    
    document.getElementById('modal-atividade-nome').textContent = atividade.nome;
    
    document.querySelectorAll('input[name="dias-gastos"]').forEach(r => r.checked = false);
    document.querySelector('input[name="dias-gastos"][value="1"]').checked = true;
    
    document.getElementById('anotacoes-conclusao').value = '';
    
    document.getElementById('modal-concluir').classList.add('active');
}

function fecharModal() {
    document.getElementById('modal-concluir').classList.remove('active');
}

function confirmarConclusao() {
    const radios = document.querySelectorAll('input[name="dias-gastos"]');
    let diasGastos = null;
    
    for (const radio of radios) {
        if (radio.checked) {
            diasGastos = parseInt(radio.value);
            break;
        }
    }
    
    if (!diasGastos || isNaN(diasGastos)) {
        mostrarToast('Selecione os dias gastos', 'error');
        return;
    }
    
    const anotacoes = document.getElementById('anotacoes-conclusao').value;
    const diasPrevistos = estado.atividadeConcluindo.diasPrevistos || 1;
    const diasGanhos = Math.max(0, diasPrevistos - diasGastos);
    
    const atividadeIndex = prazos.findIndex(p => p.id === estado.atividadeConcluindo.id);
    if (atividadeIndex !== -1) {
        prazos[atividadeIndex].concluido = true;
        prazos[atividadeIndex].dataConclusao = new Date().toISOString().split('T')[0];
        prazos[atividadeIndex].diasGastos = diasGastos;
        prazos[atividadeIndex].anotacoes = anotacoes;
        
        localStorage.setItem('agenda_prazos', JSON.stringify(prazos));
    }
    
    fecharModal();
    
    if (diasGanhos > 0) {
        reorganizarEstudos(estado.atividadeConcluindo, diasGanhos);
        mostrarToast(`🎉 Parabéns! Você ganhou ${diasGanhos} dias extras!`, 'success');
    } else {
        mostrarToast('Atividade concluída com sucesso!', 'success');
    }
    
    atualizarInterface();
}

function reorganizarEstudos(atividade, diasGanhos) {
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
    
    while (diasRestantes > 0 && provasProximas.length > 0) {
        const prova = provasProximas[0];
        
        const dataEstudo = new Date(hoje);
        dataEstudo.setDate(dataEstudo.getDate() + (diasGanhos - diasRestantes + 1));
        
        if (dataEstudo.getDay() !== 0 && dataEstudo.getDay() !== 6) {
            const estudoEvento = {
                id: `estudo-${Date.now()}-${diasRestantes}`,
                materia: prova.materia,
                tipo: 'estudo',
                nome: `Estudo para ${prova.nome}`,
                data: dataEstudo.toISOString().split('T')[0],
                diasPrevistos: 1,
                concluido: false
            };
            
            prazos.push(estudoEvento);
        }
        
        diasRestantes--;
    }
    
    if (diasRestantes > 0) {
        const cursos = ['Python Santander', 'HTML Coddy'];
        
        for (let i = 0; i < diasRestantes; i++) {
            const dataCurso = new Date(hoje);
            dataCurso.setDate(dataCurso.getDate() + i + 1);
            
            if (dataCurso.getDay() !== 0 && dataCurso.getDay() !== 6) {
                const cursoEvento = {
                    id: `curso-${Date.now()}-${i}`,
                    materia: 'extras',
                    tipo: 'estudo',
                    nome: cursos[i % 2],
                    data: dataCurso.toISOString().split('T')[0],
                    diasPrevistos: 1,
                    concluido: false
                };
                
                prazos.push(cursoEvento);
            }
        }
    }
    
    localStorage.setItem('agenda_prazos', JSON.stringify(prazos));
}

// ============================================
// FUNÇÕES DE TIMER
// ============================================

function iniciarTimer() {
    if (estado.timerAtivo) return;
    
    estado.timerAtivo = true;
    estado.timerInterval = setInterval(() => {
        estado.timerTempo++;
        
        const horas = (estado.timerTempo / 3600).toFixed(2);
        const progresso = (horas / HORAS_POR_DIA) * 100;
        
        document.getElementById('timer-progresso').style.width = `${Math.min(progresso, 100)}%`;
        document.getElementById('timer-display').textContent = `${Math.floor(estado.timerTempo / 3600)}h${Math.floor((estado.timerTempo % 3600) / 60)}m`;
        
        if (horas >= HORAS_POR_DIA) {
            pausarTimer();
            mostrarToast('🎉 Parabéns! Você completou suas 2h30 de estudo hoje!', 'success');
        }
    }, 1000);
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
    document.getElementById('timer-progresso').style.width = '0%';
    document.getElementById('timer-display').textContent = '0h00';
}

// ============================================
// FUNÇÕES DE PLANOS DE AULA
// ============================================

function mostrarPlanoAula(materia) {
    const titulo = document.getElementById('plano-titulo');
    const tabela = document.getElementById('plano-tabela');
    
    if (titulo) {
        titulo.textContent = `Plano de Aula - ${getNomeMateria(materia)}`;
    }
    
    if (tabela && planosAula[materia]) {
        tabela.innerHTML = '';
        
        const table = document.createElement('table');
        table.className = 'tabela-planos';
        
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Tema</th>
                    <th>Conteúdo</th>
                    <th>Preparação</th>
                </tr>
            </thead>
            <tbody id="tabela-corpo">
            </tbody>
        `;
        
        const tbody = table.querySelector('#tabela-corpo');
        
        planosAula[materia].forEach(aula => {
            const tr = document.createElement('tr');
            
            const dataObj = new Date(aula.data + 'T12:00:00');
            const dataFormatada = dataObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
            
            tr.innerHTML = `
                <td>${dataFormatada}</td>
                <td><strong>${aula.tema}</strong></td>
                <td>${aula.conteudo}</td>
                <td>${aula.paraCasa || '-'}</td>
            `;
            
            tbody.appendChild(tr);
        });
        
        tabela.appendChild(table);
    }
}

// ============================================
// FUNÇÕES DE PROGRESSO
// ============================================

function renderizarProgresso() {
    const materias = ['es', 'ic', 'lp', 'bd', 'bootcamp', 'fundamentos'];
    
    materias.forEach(materia => {
        const prazosMateria = prazos.filter(p => p.materia === materia);
        const concluidos = prazosMateria.filter(p => p.concluido).length;
        const total = prazosMateria.length;
        const progresso = total > 0 ? Math.round((concluidos / total) * 100) : 0;
        
        const el = document.getElementById(`progresso-${materia}`);
        if (el) {
            el.textContent = `${progresso}%`;
        }
    });
    
    desenharGraficoBarras();
}

function desenharGraficoBarras() {
    const canvas = document.getElementById('grafico-barras');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const materias = [
        { nome: 'ES', cor: '#f97316', horas: 25 },
        { nome: 'IC', cor: '#3b82f6', horas: 20 },
        { nome: 'LP', cor: '#10b981', horas: 30 },
        { nome: 'BD', cor: '#8b5cf6', horas: 15 },
        { nome: 'BC', cor: '#ec4899', horas: 5 },
        { nome: 'FD', cor: '#64748b', horas: 5 }
    ];
    
    const larguraBarra = 40;
    const espaco = 20;
    const alturaMaxima = 200;
    
    materias.forEach((materia, index) => {
        const x = 50 + index * (larguraBarra + espaco);
        const altura = (materia.horas / 30) * alturaMaxima;
        const y = 250 - altura;
        
        ctx.fillStyle = materia.cor;
        ctx.fillRect(x, y, larguraBarra, altura);
        
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '12px Inter';
        ctx.fillText(materia.nome, x + 10, 280);
        
        ctx.fillStyle = '#f1f5f9';
        ctx.font = 'bold 12px Inter';
        ctx.fillText(materia.horas + 'h', x + 5, y - 5);
    });
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
        fundamentos: 'Fundamentos de Engenharia',
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

function sugeriCursoExtra() {
    const hoje = new Date();
    const diaSemana = hoje.getDay();
    
    if (diaSemana === 1) return 'Python Santander - Módulo 1';
    if (diaSemana === 3) return 'HTML Coddy - Estrutura Básica';
    if (diaSemana === 5) return 'Python Santander - Exercícios';
    
    return 'Curso extra - 1 hora';
}

function formatarData(dataStr) {
    const data = new Date(dataStr + 'T12:00:00');
    return data.toLocaleDateString('pt-BR');
}

function mostrarToast(mensagem, tipo = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    
    let icone = 'fa-info-circle';
    if (tipo === 'success') icone = 'fa-check-circle';
    if (tipo === 'error') icone = 'fa-exclamation-circle';
    if (tipo === 'warning') icone = 'fa-exclamation-triangle';
    
    toast.innerHTML = `
        <i class="fas ${icone}"></i>
        <span>${mensagem}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ============================================
// EXPOR FUNÇÕES GLOBAIS (PARA O HTML)
// ============================================

window.fazerLogin = fazerLogin;
window.fazerLogout = fazerLogout;
window.inicializarSistema = inicializarSistema;
window.abrirModalConclusao = abrirModalConclusao;
window.fecharModal = fecharModal;
window.confirmarConclusao = confirmarConclusao;
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
window.toggleChecklistItem = toggleChecklistItem;
window.resetarChecklistDiario = resetarChecklistDiario;
window.buscarNotas = buscarNotas;
