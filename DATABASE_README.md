# 🗄️ DOCUMENTAÇÃO DO BANCO DE DADOS - SISTEMA JOGOS UNIFUNEC

## 📋 **VISÃO GERAL**

Este documento descreve a estrutura completa do banco de dados do Sistema de Jogos da UNIFUNEC, incluindo todos os modelos, relacionamentos, validações e padrões utilizados.

---

## 🏗️ **ARQUITETURA DO BANCO**

### **Tecnologias Utilizadas:**

- **ORM:** Prisma
- **Banco:** PostgreSQL
- **Migrações:** Prisma Migrate
- **Validações:** Constraints de banco + validações de aplicação

### **Padrões Implementados:**

- ✅ **Timestamps** em todos os modelos (`createdAt`, `updatedAt`)
- ✅ **Soft Delete** com campo `deletedAt`
- ✅ **Auditoria** com campos `createdBy`, `updatedBy`
- ✅ **Índices** para performance
- ✅ **Enums** para validação de dados
- ✅ **Relacionamentos** bem definidos

---

## 📊 **MODELOS PRINCIPAIS**

### **1. 👤 USER (Usuários do Sistema)**

**Descrição:** Gerencia usuários administrativos do sistema

```prisma
model User {
    id        Int      @id @default(autoincrement())
    email     String   @unique
    name      String
    password  String
    role      Role     @default(user)
    isActive  Boolean  @default(true)
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    deletedAt DateTime?
}
```

**Campos:**

- `id`: Identificador único
- `email`: Email único do usuário
- `name`: Nome completo
- `password`: Senha hasheada
- `role`: Papel no sistema (admin/user)
- `isActive`: Status ativo/inativo
- `createdAt/updatedAt`: Timestamps automáticos
- `deletedAt`: Soft delete

**Relacionamentos:**

- Relações de auditoria com outros modelos

---

### **2. 🎓 COURSE (Cursos)**

**Descrição:** Representa os cursos da instituição (ADS, Enfermagem, etc.)

```prisma
model Course {
    id          Int      @id @default(autoincrement())
    name        String   @unique
    code        String   @unique
    description String?
    isActive    Boolean  @default(true)
    createdAt   DateTime @default(now())
    updatedAt   DateTime @updatedAt
    deletedAt   DateTime?
}
```

**Campos:**

- `id`: Identificador único
- `name`: Nome completo do curso
- `code`: Código único (ex: "ADS", "ENF")
- `description`: Descrição opcional
- `isActive`: Status ativo/inativo
- Timestamps e auditoria

**Relacionamentos:**

- `teams`: Times do curso
- `players`: Jogadores do curso

---

### **3. 👨‍🎓 PLAYER (Jogadores)**

**Descrição:** Representa os alunos/jogadores do sistema

```prisma
model Player {
    id        Int      @id @default(autoincrement())
    name      String
    rm        String   @unique
    email     String?  @unique
    phone     String?
    gender    Gender?
    isActive  Boolean  @default(true)
    courseId  Int
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    deletedAt DateTime?
}
```

**Campos:**

- `id`: Identificador único
- `name`: Nome completo
- `rm`: Registro do aluno (único)
- `email`: Email opcional
- `phone`: Telefone opcional
- `gender`: Gênero (M/F/OTHER)
- `isActive`: Status ativo/inativo
- `courseId`: Referência ao curso
- Timestamps e auditoria

**Relacionamentos:**

- `course`: Curso do jogador
- `playerTeams`: Times do jogador (N:N)

---

### **4. ⚽ TEAM (Times)**

**Descrição:** Representa os times de jogadores

```prisma
model Team {
    id          Int        @id @default(autoincrement())
    name        String
    description String?
    status      TeamStatus @default(active)
    courseId    Int
    createdAt   DateTime   @default(now())
    updatedAt   DateTime   @updatedAt
    deletedAt   DateTime?
}
```

**Campos:**

- `id`: Identificador único
- `name`: Nome do time
- `description`: Descrição opcional
- `status`: Status do time (active/inactive/suspended)
- `courseId`: Referência ao curso
- Timestamps e auditoria

**Relacionamentos:**

- `course`: Curso do time
- `playerTeams`: Jogadores do time (N:N)
- `entries`: Inscrições em torneios
- `matchesA/matchesB`: Partidas como time A/B
- `wins`: Partidas vencidas

---

### **5. 🏆 TOURNAMENT (Torneios)**

**Descrição:** Representa os torneios do sistema

```prisma
model Tournament {
    id          Int               @id @default(autoincrement())
    name        String
    description String?
    year        Int
    status      TournamentStatus  @default(draft)
    bestOfSets  Int               @default(5)
    maxTeams    Int?
    startDate   DateTime?
    endDate     DateTime?
    createdAt   DateTime          @default(now())
    updatedAt   DateTime          @updatedAt
    deletedAt   DateTime?
}
```

**Campos:**

- `id`: Identificador único
- `name`: Nome do torneio
- `description`: Descrição opcional
- `year`: Ano do torneio
- `status`: Status do torneio (draft/open_registration/etc)
- `bestOfSets`: Melhor de X sets (3 ou 5)
- `maxTeams`: Limite de times
- `startDate/endDate`: Datas do torneio
- Timestamps e auditoria

**Relacionamentos:**

- `entries`: Inscrições de times
- `matches`: Partidas do torneio
- `stages`: Chaves do torneio

---

### **6. 🎮 MATCH (Partidas)**

**Descrição:** Representa as partidas dos torneios

```prisma
model Match {
    id           Int        @id @default(autoincrement())
    tournamentId Int
    teamAId      Int?
    teamBId      Int?
    status       MatchStatus @default(scheduled)
    setsWonA     Int         @default(0)
    setsWonB     Int         @default(0)
    setsToWin    Int
    winnerTeamId Int?
    scheduledAt  DateTime?
    startedAt    DateTime?
    finishedAt   DateTime?
    location     String?
    referee      String?
    notes        String?
    createdAt    DateTime   @default(now())
    updatedAt    DateTime   @updatedAt
}
```

**Campos:**

- `id`: Identificador único
- `tournamentId`: Referência ao torneio
- `teamAId/teamBId`: Times participantes
- `status`: Status da partida
- `setsWonA/setsWonB`: Sets vencidos por cada time
- `setsToWin`: Sets necessários para vencer
- `winnerTeamId`: Time vencedor
- `scheduledAt/startedAt/finishedAt`: Timestamps da partida
- `location`: Local da partida
- `referee`: Árbitro
- `notes`: Observações
- Timestamps e auditoria

**Relacionamentos:**

- `tournament`: Torneio da partida
- `teamA/teamB`: Times participantes
- `winnerTeam`: Time vencedor
- `sets`: Sets da partida

---

## 🔗 **RELACIONAMENTOS N:N**

### **1. PLAYER_TEAM (Jogador x Time)**

```prisma
model PlayerTeam {
    id        Int      @id @default(autoincrement())
    playerId  Int
    teamId    Int
    isActive  Boolean  @default(true)
    joinedAt  DateTime @default(now())
    leftAt    DateTime?
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
}
```

**Funcionalidades:**

- Controle de membros ativos/inativos
- Histórico de entrada/saída
- Timestamps de relacionamento

### **2. TOURNAMENT_ENTRY (Torneio x Time)**

```prisma
model TournamentEntry {
    id           Int      @id @default(autoincrement())
    tournamentId Int
    teamId       Int
    registeredAt DateTime @default(now())
    createdAt    DateTime @default(now())
    updatedAt    DateTime @updatedAt
}
```

**Funcionalidades:**

- Controle de inscrições
- Timestamp de registro
- Histórico de participações

---

## 🏗️ **SISTEMA DE BRACKETS (CHAVEAMENTO)**

### **Estrutura Hierárquica:**

```
Tournament
  └── BracketStage (Chave)
      └── BracketGroup (Grupo)
          └── BracketRound (Rodada)
              └── BracketMatch (Partida)
                  └── BracketMatchGame (Set)
```

### **1. BRACKET_STAGE (Chave do Torneio)**

```prisma
model BracketStage {
    id            Int         @id @default(autoincrement())
    tournamentId  Int
    name          String
    type          BracketType @default(single_elimination)
    seedingMethod String?
    settingsJson  Json?
    createdAt     DateTime    @default(now())
    updatedAt     DateTime    @updatedAt
}
```

**Tipos de Chave:**

- `single_elimination`: Eliminação simples
- `double_elimination`: Eliminação dupla
- `round_robin`: Todos contra todos

### **2. BRACKET_MATCH (Partida do Chaveamento)**

```prisma
model BracketMatch {
    id      Int                @id @default(autoincrement())
    stageId Int
    groupId Int
    roundId Int
    number  Int
    status  BracketMatchStatus @default(pending)

    participantAId Int?
    participantBId Int?
    scoreA         Int?
    scoreB         Int?

    childMatchId  Int?
    childPosition Int?
    winnerParticipantId Int?

    scheduledAt DateTime?
    startedAt   DateTime?
    finishedAt  DateTime?
    location    String?
    referee     String?
    metaJson    Json?
    createdAt   DateTime  @default(now())
    updatedAt   DateTime  @updatedAt
}
```

**Funcionalidades:**

- Encadeamento de partidas
- Controle de participantes
- Timestamps detalhados
- Metadados flexíveis

---

## 📊 **ENUMS E VALIDAÇÕES**

### **Enums Principais:**

```prisma
enum Role {
    admin
    user
}

enum Gender {
    M
    F
    OTHER
}

enum TeamStatus {
    active
    inactive
    suspended
}

enum TournamentStatus {
    draft
    open_registration
    registration_closed
    in_progress
    finished
    cancelled
}

enum MatchStatus {
    scheduled
    in_progress
    finished
    walkover
}

enum BracketType {
    single_elimination
    double_elimination
    round_robin
}

enum BracketMatchStatus {
    pending
    scheduled
    in_progress
    finished
    walkover
}
```

---

## 🔍 **ÍNDICES E PERFORMANCE**

### **Índices Implementados:**

```prisma
// User
@@index([email])
@@index([role])
@@index([isActive])
@@index([createdAt])

// Course
@@index([code])
@@index([isActive])
@@index([createdAt])

// Player
@@index([rm])
@@index([email])
@@index([courseId])
@@index([isActive])
@@index([createdAt])

// Team
@@index([courseId])
@@index([status])
@@index([createdAt])

// Tournament
@@index([year])
@@index([status])
@@index([startDate])
@@index([createdAt])

// Match
@@index([tournamentId])
@@index([status])
@@index([scheduledAt])
@@index([createdAt])

// BracketMatch
@@index([stageId, groupId, roundId])
@@index([childMatchId])
@@index([status])
@@index([scheduledAt])
@@index([createdAt])
```

---

## 🔐 **SEGURANÇA E AUDITORIA**

### **Campos de Auditoria:**

- `createdBy`: Usuário que criou o registro
- `updatedBy`: Usuário que atualizou o registro
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização
- `deletedAt`: Data de exclusão (soft delete)

### **Soft Delete:**

- Todos os modelos principais têm `deletedAt`
- Permite recuperação de dados
- Mantém integridade referencial

### **Validações:**

- Campos únicos onde necessário
- Constraints de integridade
- Validações de aplicação

---

## 📈 **MIGRAÇÕES E VERSIONAMENTO**

### **Comandos Prisma:**

```bash
# Gerar migration
npx prisma migrate dev --name nome_da_migration

# Aplicar migrations
npx prisma migrate deploy

# Reset do banco
npx prisma migrate reset

# Gerar cliente
npx prisma generate

# Visualizar banco
npx prisma studio
```

### **Estrutura de Migrations:**

```
prisma/
├── migrations/
│   ├── 20250107000000_initial/
│   │   └── migration.sql
│   ├── 20250107000001_add_timestamps/
│   │   └── migration.sql
│   └── migration_lock.toml
└── schema.prisma
```

---

## 🧪 **TESTES E DADOS DE EXEMPLO**

### **Dados de Teste Recomendados:**

```sql
-- Usuário Admin
INSERT INTO "User" (email, name, password, role)
VALUES ('admin@unifunec.edu.br', 'Administrador', '$2b$10$...', 'admin');

-- Curso
INSERT INTO "Course" (name, code)
VALUES ('Análise e Desenvolvimento de Sistemas', 'ADS');

-- Jogador
INSERT INTO "Player" (name, rm, courseId)
VALUES ('João Silva', 'ADS2024001', 1);

-- Time
INSERT INTO "Team" (name, courseId)
VALUES ('Time ADS 2024', 1);

-- Torneio
INSERT INTO "Tournament" (name, year, status)
VALUES ('Torneio de Vôlei 2024', 2024, 'open_registration');
```

---

## 📋 **CHECKLIST DE IMPLEMENTAÇÃO**

### **Para cada novo modelo:**

- [ ] Timestamps (`createdAt`, `updatedAt`)
- [ ] Soft delete (`deletedAt`)
- [ ] Auditoria (`createdBy`, `updatedBy`)
- [ ] Índices apropriados
- [ ] Validações de banco
- [ ] Relacionamentos bem definidos
- [ ] Enums para campos de status
- [ ] Campos opcionais marcados corretamente

### **Para cada relacionamento:**

- [ ] Foreign keys definidas
- [ ] Índices nas FKs
- [ ] Constraints de integridade
- [ ] Cascade rules definidas
- [ ] Relacionamentos bidirecionais

---

## 🚀 **PRÓXIMOS PASSOS**

### **Melhorias Futuras:**

1. **Logs de Auditoria** detalhados
2. **Backup automático** do banco
3. **Monitoramento** de performance
4. **Relatórios** de uso
5. **API de consultas** complexas

### **Manutenção:**

1. **Revisão periódica** dos índices
2. **Limpeza** de dados antigos
3. **Otimização** de queries
4. **Atualização** do Prisma
5. **Backup** regular

---

## 📞 **SUPORTE**

### **Em caso de problemas:**

1. Verificar logs do Prisma
2. Consultar documentação oficial
3. Revisar migrations
4. Validar schema
5. Testar em ambiente de desenvolvimento

### **Comandos de Diagnóstico:**

```bash
# Verificar status do banco
npx prisma db pull

# Validar schema
npx prisma validate

# Verificar migrations
npx prisma migrate status

# Reset e recriar
npx prisma migrate reset
```

---

**🎯 Este banco de dados foi projetado seguindo as melhores práticas de desenvolvimento, garantindo escalabilidade, performance e manutenibilidade para o Sistema de Jogos UNIFUNEC!**

**📋 Mantenha esta documentação sempre atualizada com as mudanças no schema!**
