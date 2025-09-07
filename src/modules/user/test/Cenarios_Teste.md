# 🧪 CENÁRIOS DE TESTE - MÓDULO USUÁRIOS

## 📋 **CENÁRIOS ORGANIZADOS POR FUNCIONALIDADE**

Este arquivo contém cenários de teste específicos para validar cada funcionalidade do módulo de usuários.

---

## 🆕 **CENÁRIO 1: CRIAÇÃO DE USUÁRIOS**

### **Teste 1.1: Criação com Dados Válidos**

```json
POST /users
{
  "name": "João Silva",
  "email": "joao@gmail.com",
  "password": "123456",
  "role": "user"
}
```

**Resultado esperado:** Status 201, usuário criado com ID

### **Teste 1.2: Criação sem Role (deve usar padrão)**

```json
POST /users
{
  "name": "Maria Santos",
  "email": "maria@gmail.com",
  "password": "123456"
}
```

**Resultado esperado:** Status 201, role = "user" (padrão)

### **Teste 1.3: Criação com Nome Muito Curto**

```json
POST /users
{
  "name": "A",
  "email": "teste@gmail.com",
  "password": "123456"
}
```

**Resultado esperado:** Status 400, erro de validação

### **Teste 1.4: Criação com Email Inválido**

```json
POST /users
{
  "name": "Teste",
  "email": "email-invalido",
  "password": "123456"
}
```

**Resultado esperado:** Status 400, erro de formato de email

### **Teste 1.5: Criação com Senha Muito Curta**

```json
POST /users
{
  "name": "Teste",
  "email": "teste@gmail.com",
  "password": "123"
}
```

**Resultado esperado:** Status 400, erro de senha

### **Teste 1.6: Criação com Email Duplicado**

```json
POST /users
{
  "name": "Outro Usuário",
  "email": "joao@gmail.com",
  "password": "123456"
}
```

**Resultado esperado:** Status 400, email já cadastrado

---

## 📋 **CENÁRIO 2: LISTAGEM DE USUÁRIOS**

### **Teste 2.1: Lista Vazia**

```http
GET /users
```

**Resultado esperado:** Status 200, array vazio com metadados de paginação

### **Teste 2.2: Lista com Usuários**

```http
GET /users
```

**Resultado esperado:** Status 200, array com usuários e metadados

### **Teste 2.3: Paginação - Primeira Página**

```http
GET /users?page=1&limit=2
```

**Resultado esperado:** Status 200, máximo 2 usuários, hasPrev=false

### **Teste 2.4: Paginação - Página Intermediária**

```http
GET /users?page=2&limit=2
```

**Resultado esperado:** Status 200, hasPrev=true, hasNext depende do total

### **Teste 2.5: Paginação - Limite Inválido**

```http
GET /users?limit=150
```

**Resultado esperado:** Status 400, limite muito alto

### **Teste 2.6: Paginação - Página Inválida**

```http
GET /users?page=0
```

**Resultado esperado:** Status 400, página inválida

---

## 🔍 **CENÁRIO 3: BUSCA E FILTROS**

### **Teste 3.1: Busca por Nome**

```http
GET /users?search=joão
```

**Resultado esperado:** Status 200, apenas usuários com "joão" no nome

### **Teste 3.2: Busca por Email**

```http
GET /users?search=gmail
```

**Resultado esperado:** Status 200, apenas usuários com "gmail" no email

### **Teste 3.3: Busca Case-Insensitive**

```http
GET /users?search=JOÃO
```

**Resultado esperado:** Status 200, deve encontrar "João" (case-insensitive)

### **Teste 3.4: Filtro por Role Admin**

```http
GET /users?role=admin
```

**Resultado esperado:** Status 200, apenas usuários admin

### **Teste 3.5: Filtro por Role User**

```http
GET /users?role=user
```

**Resultado esperado:** Status 200, apenas usuários user

### **Teste 3.6: Filtro por Role Inválido**

```http
GET /users?role=invalid
```

**Resultado esperado:** Status 400, role inválido

### **Teste 3.7: Combinação de Filtros**

```http
GET /users?page=1&limit=5&search=admin&role=admin
```

**Resultado esperado:** Status 200, admins com "admin" no nome/email

---

## 🔍 **CENÁRIO 4: BUSCA POR ID**

### **Teste 4.1: Busca com ID Válido**

```http
GET /users/1
```

**Resultado esperado:** Status 200, dados do usuário

### **Teste 4.2: Busca com ID Inexistente**

```http
GET /users/999
```

**Resultado esperado:** Status 404, usuário não encontrado

### **Teste 4.3: Busca com ID Inválido (String)**

```http
GET /users/abc
```

**Resultado esperado:** Status 400, ID deve ser número

### **Teste 4.4: Busca com ID Negativo**

```http
GET /users/-1
```

**Resultado esperado:** Status 400, ID deve ser positivo

### **Teste 4.5: Busca com ID Zero**

```http
GET /users/0
```

**Resultado esperado:** Status 400, ID deve ser positivo

---

## ✏️ **CENÁRIO 5: ATUALIZAÇÃO DE USUÁRIOS**

### **Teste 5.1: Atualização Completa**

```json
PUT /users/1
{
  "name": "João Atualizado",
  "email": "joao.novo@gmail.com",
  "password": "novaSenha123",
  "role": "admin"
}
```

**Resultado esperado:** Status 200, todos os campos atualizados

### **Teste 5.2: Atualização Apenas Nome**

```json
PUT /users/1
{
  "name": "Novo Nome"
}
```

**Resultado esperado:** Status 200, apenas nome alterado

### **Teste 5.3: Atualização Apenas Email**

```json
PUT /users/1
{
  "email": "novo.email@gmail.com"
}
```

**Resultado esperado:** Status 200, apenas email alterado

### **Teste 5.4: Atualização Apenas Senha**

```json
PUT /users/1
{
  "password": "novaSenha123"
}
```

**Resultado esperado:** Status 200, apenas senha alterada

### **Teste 5.5: Atualização Apenas Role**

```json
PUT /users/1
{
  "role": "admin"
}
```

**Resultado esperado:** Status 200, apenas role alterado

### **Teste 5.6: Atualização sem Campos**

```json
PUT /users/1
{}
```

**Resultado esperado:** Status 400, pelo menos um campo deve ser fornecido

### **Teste 5.7: Atualização com Email Duplicado**

```json
PUT /users/1
{
  "email": "email.de.outro.usuario@gmail.com"
}
```

**Resultado esperado:** Status 400, email já cadastrado

### **Teste 5.8: Atualização de Usuário Inexistente**

```json
PUT /users/999
{
  "name": "Teste"
}
```

**Resultado esperado:** Status 404, usuário não encontrado

---

## 🗑️ **CENÁRIO 6: EXCLUSÃO DE USUÁRIOS**

### **Teste 6.1: Exclusão com ID Válido**

```http
DELETE /users/1
```

**Resultado esperado:** Status 200, mensagem de sucesso

### **Teste 6.2: Exclusão de Usuário Inexistente**

```http
DELETE /users/999
```

**Resultado esperado:** Status 404, usuário não encontrado

### **Teste 6.3: Exclusão com ID Inválido**

```http
DELETE /users/abc
```

**Resultado esperado:** Status 400, ID deve ser número

---

## 🔄 **CENÁRIO 7: FLUXOS COMPLETOS**

### **Fluxo 7.1: CRUD Completo**

1. **Criar** usuário → Anotar ID
2. **Listar** usuários → Verificar se aparece
3. **Buscar** por ID → Verificar dados
4. **Atualizar** usuário → Modificar campos
5. **Buscar** novamente → Verificar alterações
6. **Deletar** usuário → Remover
7. **Buscar** novamente → Verificar 404

### **Fluxo 7.2: Teste de Paginação**

1. **Criar** 5 usuários diferentes
2. **Listar** com limit=2 → Verificar paginação
3. **Navegar** pelas páginas → Verificar hasNext/hasPrev
4. **Testar** diferentes limites → 1, 3, 5, 10
5. **Limpar** usuários de teste

### **Fluxo 7.3: Teste de Busca e Filtros**

1. **Criar** usuários com nomes e roles diferentes
2. **Buscar** por nome → Verificar resultados
3. **Filtrar** por role → Verificar filtros
4. **Combinar** busca + filtro → Verificar combinação
5. **Testar** case-insensitive → Maiúsculas/minúsculas

---

## ⚠️ **CENÁRIO 8: TRATAMENTO DE ERROS**

### **Teste 8.1: Dados Inválidos na Criação**

```json
POST /users
{
  "name": "",
  "email": "invalido",
  "password": "123"
}
```

**Resultado esperado:** Status 400, múltiplos erros de validação

### **Teste 8.2: Campos Obrigatórios Ausentes**

```json
POST /users
{
  "name": "Teste"
}
```

**Resultado esperado:** Status 400, email e senha obrigatórios

### **Teste 8.3: Tipos de Dados Incorretos**

```json
POST /users
{
  "name": 123,
  "email": "teste@gmail.com",
  "password": "123456"
}
```

**Resultado esperado:** Status 400, nome deve ser string

### **Teste 8.4: Valores de Role Inválidos**

```json
POST /users
{
  "name": "Teste",
  "email": "teste@gmail.com",
  "password": "123456",
  "role": "invalid_role"
}
```

**Resultado esperado:** Status 400, role inválido

---

## 📊 **CENÁRIO 9: PERFORMANCE E LIMITES**

### **Teste 9.1: Limite Máximo de Paginação**

```http
GET /users?limit=100
```

**Resultado esperado:** Status 200, máximo permitido

### **Teste 9.2: Limite Excedido**

```http
GET /users?limit=101
```

**Resultado esperado:** Status 400, limite muito alto

### **Teste 9.3: Busca com Termo Muito Longo**

```http
GET /users?search=termo_muito_longo_com_muitos_caracteres...
```

**Resultado esperado:** Status 400, termo muito longo

---

## 🎯 **CHECKLIST DE EXECUÇÃO**

### **Antes de Começar:**

- [ ] Servidor rodando (`npm run dev`)
- [ ] Collection importada no Postman
- [ ] Variável `baseUrl` configurada
- [ ] Banco de dados limpo (opcional)

### **Após Cada Cenário:**

- [ ] Verificar status code
- [ ] Verificar estrutura da resposta
- [ ] Verificar dados retornados
- [ ] Anotar IDs para próximos testes
- [ ] Limpar dados de teste se necessário

### **Ao Final:**

- [ ] Todos os cenários executados
- [ ] Erros documentados
- [ ] Dados de teste removidos
- [ ] Relatório de testes gerado

---

## 📝 **TEMPLATE DE RELATÓRIO**

```
=== RELATÓRIO DE TESTES - MÓDULO USUÁRIOS ===

Data: [DATA]
Executado por: [NOME]
Ambiente: [AMBIENTE]

RESULTADOS:
✅ Cenário 1: Criação - [X/X] testes passaram
✅ Cenário 2: Listagem - [X/X] testes passaram
✅ Cenário 3: Busca/Filtros - [X/X] testes passaram
✅ Cenário 4: Busca por ID - [X/X] testes passaram
✅ Cenário 5: Atualização - [X/X] testes passaram
✅ Cenário 6: Exclusão - [X/X] testes passaram
✅ Cenário 7: Fluxos Completos - [X/X] testes passaram
✅ Cenário 8: Tratamento de Erros - [X/X] testes passaram
✅ Cenário 9: Performance - [X/X] testes passaram

TOTAL: [X/Y] testes passaram

PROBLEMAS ENCONTRADOS:
- [Listar problemas encontrados]

OBSERVAÇÕES:
- [Observações importantes]
```

---

**🎉 Com estes cenários, você pode testar completamente todas as funcionalidades do módulo de usuários!**
