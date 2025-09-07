# 🧪 EXEMPLOS COMPLETOS - MÓDULO USUÁRIOS

## 📋 **COMO USAR ESTA PASTA**

Esta pasta contém todos os recursos necessários para testar o módulo de usuários:

- 📁 **Collection_Postman.json** - Collection completa para importar no Postman
- 📁 **Exemplos_Completos.md** - Este arquivo com exemplos detalhados
- 📁 **Cenarios_Teste.md** - Cenários de teste específicos

---

## 🚀 **CONFIGURAÇÃO INICIAL**

### **1. Importar Collection no Postman**

1. Abra o Postman
2. Clique em "Import"
3. Selecione o arquivo `Collection_Postman.json`
4. A collection será importada com todas as requisições

### **2. Configurar Variável de Ambiente**

1. Na collection, vá em "Variables"
2. Verifique se `baseUrl` está configurado como: `http://localhost:3001/users`
3. Se necessário, ajuste a URL conforme seu ambiente

### **3. Verificar Servidor**

```bash
# Certifique-se que o servidor está rodando
npm run dev

# Deve aparecer: "Servidor rodando em http://localhost:3001"
```

---

## 📝 **EXEMPLOS DE REQUISIÇÕES**

### **1. CRIAR USUÁRIO**

#### **Requisição:**

```http
POST http://localhost:3001/users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@gmail.com",
  "password": "123456",
  "role": "user"
}
```

#### **Resposta de Sucesso (201):**

```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@gmail.com",
  "role": "user",
  "createdAt": "2025-01-07T10:30:00.000Z",
  "updatedAt": "2025-01-07T10:30:00.000Z"
}
```

#### **Resposta de Erro (400):**

```json
{
  "message": "Dados inválidos: Nome deve ter pelo menos 2 caracteres, Email deve ter um formato válido (exemplo: usuario@dominio.com), Senha deve ter pelo menos 6 caracteres"
}
```

---

### **2. LISTAR USUÁRIOS**

#### **Requisição Básica:**

```http
GET http://localhost:3001/users
```

#### **Com Paginação:**

```http
GET http://localhost:3001/users?page=1&limit=5
```

#### **Com Busca:**

```http
GET http://localhost:3001/users?search=joão
```

#### **Com Filtro:**

```http
GET http://localhost:3001/users?role=admin
```

#### **Combinado:**

```http
GET http://localhost:3001/users?page=1&limit=10&search=admin&role=admin
```

#### **Resposta de Sucesso (200):**

```json
{
  "data": [
    {
      "id": 1,
      "name": "João Silva",
      "email": "joao@gmail.com",
      "role": "user",
      "createdAt": "2025-01-07T10:30:00.000Z",
      "updatedAt": "2025-01-07T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1,
    "hasNext": false,
    "hasPrev": false
  }
}
```

---

### **3. BUSCAR USUÁRIO POR ID**

#### **Requisição:**

```http
GET http://localhost:3001/users/1
```

#### **Resposta de Sucesso (200):**

```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@gmail.com",
  "role": "user",
  "createdAt": "2025-01-07T10:30:00.000Z",
  "updatedAt": "2025-01-07T10:30:00.000Z"
}
```

#### **Resposta de Erro (404):**

```json
{
  "message": "Usuário não encontrado"
}
```

---

### **4. ATUALIZAR USUÁRIO**

#### **Atualização Completa:**

```http
PUT http://localhost:3001/users/1
Content-Type: application/json

{
  "name": "João Atualizado",
  "email": "joao.novo@gmail.com",
  "password": "novaSenha123",
  "role": "admin"
}
```

#### **Atualização Parcial - Apenas Nome:**

```http
PUT http://localhost:3001/users/1
Content-Type: application/json

{
  "name": "João Silva Santos"
}
```

#### **Atualização Parcial - Apenas Email:**

```http
PUT http://localhost:3001/users/1
Content-Type: application/json

{
  "email": "joao.santos@gmail.com"
}
```

#### **Atualização Parcial - Apenas Senha:**

```http
PUT http://localhost:3001/users/1
Content-Type: application/json

{
  "password": "minhaNovaSenha123"
}
```

#### **Atualização Parcial - Apenas Role:**

```http
PUT http://localhost:3001/users/1
Content-Type: application/json

{
  "role": "admin"
}
```

#### **Resposta de Sucesso (200):**

```json
{
  "id": 1,
  "name": "João Atualizado",
  "email": "joao.novo@gmail.com",
  "role": "admin",
  "createdAt": "2025-01-07T10:30:00.000Z",
  "updatedAt": "2025-01-07T12:00:00.000Z"
}
```

---

### **5. DELETAR USUÁRIO**

#### **Requisição:**

```http
DELETE http://localhost:3001/users/1
```

#### **Resposta de Sucesso (200):**

```json
{
  "message": "Usuário deletado com sucesso"
}
```

#### **Resposta de Erro (404):**

```json
{
  "message": "Usuário não encontrado"
}
```

---

## 🧪 **CENÁRIOS DE TESTE**

### **Cenário 1: Fluxo Completo**

1. **Criar usuário** → Anotar o ID retornado
2. **Listar usuários** → Verificar se aparece na lista
3. **Buscar por ID** → Usar o ID anotado
4. **Atualizar usuário** → Modificar alguns campos
5. **Buscar novamente** → Verificar se as alterações foram salvas
6. **Deletar usuário** → Remover o usuário
7. **Buscar novamente** → Verificar se retorna 404

### **Cenário 2: Validações**

1. **Criar com dados inválidos** → Verificar mensagens de erro
2. **Criar com email duplicado** → Verificar erro de duplicação
3. **Atualizar com dados inválidos** → Verificar validações
4. **Buscar ID inexistente** → Verificar erro 404

### **Cenário 3: Paginação e Busca**

1. **Criar vários usuários** → Para testar paginação
2. **Listar com diferentes limites** → page=1&limit=2, page=2&limit=2
3. **Buscar por nome** → search=joão
4. **Filtrar por role** → role=admin
5. **Combinar filtros** → page=1&limit=5&search=admin&role=admin

---

## ⚠️ **CÓDIGOS DE ERRO COMUNS**

| Código | Descrição       | Exemplo                        |
| ------ | --------------- | ------------------------------ |
| `200`  | Sucesso         | Operação realizada com sucesso |
| `201`  | Criado          | Usuário criado com sucesso     |
| `400`  | Dados inválidos | Validação falhou               |
| `404`  | Não encontrado  | Usuário não existe             |
| `500`  | Erro interno    | Problema no servidor           |

---

## 🔍 **DICAS DE TESTE**

### **1. Ordem de Execução**

- Sempre **criar** usuários antes de testar outras operações
- **Anotar os IDs** retornados para usar nas outras requisições
- **Deletar** usuários de teste ao final

### **2. Dados de Teste**

```json
// Usuário Admin
{
  "name": "Admin Sistema",
  "email": "admin@sistema.com",
  "password": "admin123",
  "role": "admin"
}

// Usuário Comum
{
  "name": "Usuário Teste",
  "email": "teste@email.com",
  "password": "teste123",
  "role": "user"
}
```

### **3. Verificações Importantes**

- ✅ **Timestamps** são gerados automaticamente
- ✅ **Senhas** são hasheadas (não aparecem em texto claro)
- ✅ **IDs** são incrementais
- ✅ **Validações** funcionam corretamente
- ✅ **Paginação** retorna metadados corretos

---

## 📊 **EXEMPLOS DE RESPOSTAS DE ERRO**

### **Validação de Nome:**

```json
{
  "message": "Dados inválidos: Nome deve ter pelo menos 2 caracteres"
}
```

### **Validação de Email:**

```json
{
  "message": "Dados inválidos: Email deve ter um formato válido (exemplo: usuario@dominio.com)"
}
```

### **Validação de Senha:**

```json
{
  "message": "Dados inválidos: Senha deve ter pelo menos 6 caracteres"
}
```

### **Email Duplicado:**

```json
{
  "message": "E-mail já cadastrado"
}
```

### **ID Inválido:**

```json
{
  "message": "Parâmetros inválidos: ID deve ser um número positivo"
}
```

---

## 🎯 **CHECKLIST DE TESTES**

### **Funcionalidades Básicas:**

- [ ] Criar usuário com dados válidos
- [ ] Criar usuário com dados inválidos
- [ ] Listar usuários
- [ ] Buscar usuário por ID
- [ ] Atualizar usuário (completo)
- [ ] Atualizar usuário (parcial)
- [ ] Deletar usuário

### **Funcionalidades Avançadas:**

- [ ] Paginação (diferentes páginas e limites)
- [ ] Busca por nome/email
- [ ] Filtro por role
- [ ] Combinação de filtros
- [ ] Validação de email robusta
- [ ] Hash de senhas
- [ ] Timestamps automáticos

### **Tratamento de Erros:**

- [ ] Dados inválidos
- [ ] Email duplicado
- [ ] Usuário não encontrado
- [ ] ID inválido
- [ ] Campos obrigatórios

---

**🎉 Com estes exemplos, você pode testar completamente o módulo de usuários!**
