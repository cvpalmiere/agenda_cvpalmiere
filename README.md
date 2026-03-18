# 📅 Agenda Palmiere - Sistema Inteligente de Estudos

![Agenda Palmiere](https://img.shields.io/badge/version-2.0.0-gold)
![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-finalizado-success)

> Sistema personalizado de planejamento de estudos para Carla Vicktoria - Engenharia de Software (UniCEUB)

---

## ✨ Sobre o Projeto

A **Agenda Palmiere** é um sistema web desenvolvido exclusivamente para organizar sua rotina de estudos de forma **inteligente e adaptativa**. O sistema conhece todos os seus prazos, planos de aula e se reorganiza automaticamente quando você termina atividades antes do prazo.

### 🎯 Funcionalidades Principais

| Funcionalidade | Descrição |
|----------------|-----------|
| 📅 **Visão do Dia** | Ao entrar, já vê o que precisa estudar hoje |
| ⏰ **Timer de 2h30** | Controle seu tempo de estudo diário |
| ✅ **Checklist Diário** | Marcação rápida das atividades concluídas |
| 🔄 **Reorganização Inteligente** | Terminou antes? Sistema redistribui os dias extras |
| 📝 **Caderno Digital** | Notas organizadas por matéria |
| 📊 **Prazos e Provas** | Todos os prazos com indicadores de urgência |
| 📖 **Planos de Aula** | Cronograma completo de cada disciplina |
| 📈 **Progresso** | Acompanhamento do seu desempenho |

---

## 🎨 Identidade Visual

### Cores Principais

| Cor | Uso | Hexadecimal |
|-----|-----|-------------|
| 🟦 **Azul** | Cor principal (70%) | `#3b82f6` |
| 🏆 **Dourado** | Cor de destaque (30%) | `#D4AF37` |
| ⚫ **Preto suave** | Fundo principal | `#0a0a0f` |
| 🔘 **Cinza escuro** | Cards e elementos | `#12121a` |

### Cores por Matéria

| Matéria | Cor |
|---------|-----|
| 🔧 Engenharia de Software | `#f97316` (Laranja) |
| 💻 Introdução à Computação | `#3b82f6` (Azul) |
| 🐍 Lógica de Programação | `#10b981` (Verde) |
| 🗄️ Banco de Dados I | `#8b5cf6` (Roxo) |
| 🚀 Bootcamp I | `#ec4899` (Rosa) |
| 📐 Fundamentos | `#64748b` (Cinza) |

### Indicadores de Urgência

| Status | Cor | Significado |
|--------|-----|-------------|
| 🔴 **Urgente** | `#ef4444` | Menos de 7 dias |
| 🟡 **Atenção** | `#f59e0b` | Entre 7 e 14 dias |
| 🟢 **Tranquilo** | `#10b981` | Mais de 14 dias |
| ✅ **Concluído** | `#10b981` | Atividade finalizada |

---

## 📚 Disciplinas e Prazos

### Engenharia de Software (Turma C)
- 📝 Seminário 01: 14/04/2026
- 📝 Prova 01: 21/04/2026
- 📝 Seminário 02: 09/06/2026
- 📝 Prova 02: 16/06/2026

### Introdução à Computação
- 📝 Prova 01: 15/04/2026
- 📝 Seminário: 03/06/2026
- 📝 Prova 02: 10/06/2026
- 📝 Relatório ACE: 17/06/2026

### Lógica de Programação
- 📝 Prova 01: 09/04/2026
- 📝 Prova 02: 21/05/2026
- 📝 Prova 03: 25/06/2026
- 📝 Lista de Exercícios: 25/06/2026

### Banco de Dados I
- 📝 Prova 01: 24/04/2026
- 📝 Prova 02: 26/06/2026

### Bootcamp I
- 🚀 Desafio Inicial: 12/04/2026 (✅ Concluído)
- 🚀 Desafio Intermediário: 17/05/2026
- 🚀 Desafio Final: 14/06/2026
- 🚀 Webaulas: 19/03, 02/04, 16/04, 30/04, 21/05, 06/06

### Fundamentos de Engenharia
- 📐 Exercícios 1 e 2: 29/03/2026 (✅ Concluído)
- 📐 Sistematização 01: 12/04/2026
- 📐 Exercícios 3 e 4: 03/05/2026
- 📐 Sistematização 02: 31/05/2026
- 📐 Avaliação Online: 06/06/2026

### Cursos Extras
- 🐍 Python Santander (30h)
- 🌐 HTML Coddy (15h)

---

## 🚀 Como Usar

### Navegação
- **Botões no topo** alternam entre as abas
- **Hoje** é a tela inicial com tudo que precisa estudar
- **Notas** para fazer anotações por matéria
- **Prazos** para ver todos os compromissos
- **Calendário** para visão mensal
- **Planos** para consultar cronograma das aulas
- **Progresso** para acompanhar seu desempenho

### Marcação de Atividades

#### ✅ Checklist Diário (rápido)
1. Na aba **Hoje**, veja a lista de atividades do dia
2. Marque os checkboxes conforme for concluindo
3. O progresso é salvo automaticamente

#### 📌 Conclusão com Reorganização (quando termina antes)
1. Na aba **Prazos**, clique em "Concluir" na atividade
2. Informe **quantos dias você gastou** no total
3. O sistema calcula os **dias ganhos**
4. Redistribui automaticamente para:
   - Adiantar provas próximas
   - Incluir cursos extras
   - Adicionar revisões

### Timer de Estudo
- **2h30** é a meta diária
- Clique em **Iniciar** para começar
- A barra de progresso mostra quanto já estudou
- **Pausar** e **Zerar** para controle total

### Caderno de Notas
1. Vá na aba **Notas**
2. Escolha a matéria
3. Clique em **Nova Nota**
4. Escreva e salve

---

## 🧠 Lógica de Reorganização

Quando você conclui uma atividade **antes do prazo**, o sistema:

1. **Pergunta:** "Quantos dias você gastou?"
2. **Calcula:** Dias ganhos = Dias previstos - Dias gastos
3. **Prioriza:**
   - 🥇 **Provas próximas** (menos de 14 dias)
   - 🥈 **Cursos extras** (Python, HTML)
   - 🥉 **Revisões espaçadas**
4. **Atualiza** o calendário automaticamente

### Exemplo
