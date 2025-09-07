# 📋 Módulo de Usuários - API REST

Este módulo gerencia usuários do sistema com funcionalidades completas de CRUD, paginação, busca e validações robustas.

## 🚀 Funcionalidades

- ✅ **CRUD Completo** - Criar, listar, buscar, atualizar e deletar usuários
- ✅ **Paginação** - Listagem paginada com metadados
- ✅ **Busca e Filtros** - Por nome, email e role
- ✅ **Validações Robustas** - Email, senha, campos obrigatórios
- ✅ **Timestamps** - Criação e atualização automáticas
- ✅ **Hash de Senha** - Segurança com bcrypt
- ✅ **Soft Delete** - Exclusão lógica com possibilidade de restauração
- ✅ **Controle de Status** - Ativar/desativar usuários
- ✅ **Gestão de Usuários Deletados** - Listar e restaurar usuários deletados

## 📡 Endpoints

### Base URL

```
http://localhost:3001/users
```

---

## 🔧 **1. CRIAR USUÁRIO**

### `POST /users`

Cria um novo usuário no sistema.

#### **Headers**

```
Content-Type: application/json
```

#### **Body (JSON)**

```json
{
  "name": "Robert Lindomar",
  "email": "robert@gmail.com",
  "password": "123456",
  "role": "admin",
  "isActive": true
}
```

#### **Resposta de Sucesso (201)**

```json
{
  "id": 1,
  "name": "Robert Lindomar",
  "email": "robert@gmail.com",
  "role": "admin",
  "isActive": true,
  "createdAt": "2025-01-07T10:30:00.000Z",
  "updatedAt": "2025-01-07T10:30:00.000Z"
}
```

#### **Resposta de Erro (400)**

```json
{
  "message": "Dados inválidos: Nome deve ter pelo menos 2 caracteres, Email deve ter um formato válido (exemplo: usuario@dominio.com), Senha deve ter pelo menos 6 caracteres"
}
```

---

## 📋 **2. LISTAR USUÁRIOS (COM PAGINAÇÃO)**

### `GET /users`

Lista usuários com paginação, busca e filtros.

#### **Query Parameters**

| Parâmetro | Tipo   | Obrigatório | Padrão | Descrição                     |
| --------- | ------ | ----------- | ------ | ----------------------------- |
| `page`    | number | Não         | 1      | Número da página              |
| `limit`   | number | Não         | 10     | Itens por página (máx: 100)   |
| `search`  | string | Não         | -      | Busca por nome ou email       |
| `role`    | string | Não         | -      | Filtrar por role (admin/user) |

#### **Exemplos de Requisições**

**Listar todos (padrão):**

```
GET /users
```

**Paginação específica:**

```
GET /users?page=2&limit=5
```

**Buscar por nome:**

```
GET /users?search=robert
```

**Filtrar por role:**

```
GET /users?role=admin
```

**Combinado:**

```
GET /users?page=1&limit=20&search=admin&role=admin
```

#### **Resposta de Sucesso (200)**

```json
{
  "data": [
    {
      "id": 1,
      "name": "Robert Lindomar",
      "email": "robert@gmail.com",
      "role": "admin",
      "createdAt": "2025-01-07T10:30:00.000Z",
      "updatedAt": "2025-01-07T10:30:00.000Z"
    },
    {
      "id": 2,
      "name": "João Silva",
      "email": "joao@gmail.com",
      "role": "user",
      "createdAt": "2025-01-07T11:00:00.000Z",
      "updatedAt": "2025-01-07T11:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

#### **Resposta Lista Vazia (200)**

```json
{
  "mensagem": "Nenhum usuário cadastrado",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "totalPages": 0,
    "hasNext": false,
    "hasPrev": false
  }
}
```

---

## 🔍 **3. BUSCAR USUÁRIO POR ID**

### `GET /users/:id`

Busca um usuário específico pelo ID.

#### **Parâmetros da URL**

| Parâmetro | Tipo   | Obrigatório | Descrição     |
| --------- | ------ | ----------- | ------------- |
| `id`      | number | Sim         | ID do usuário |

#### **Exemplo de Requisição**

```
GET /users/1
```

#### **Resposta de Sucesso (200)**

```json
{
  "id": 1,
  "name": "Robert Lindomar",
  "email": "robert@gmail.com",
  "role": "admin",
  "createdAt": "2025-01-07T10:30:00.000Z",
  "updatedAt": "2025-01-07T10:30:00.000Z"
}
```

#### **Resposta de Erro (404)**

```json
{
  "message": "Usuário não encontrado"
}
```

#### **Resposta de Erro (400)**

```json
{
  "message": "Parâmetros inválidos: ID deve ser um número positivo"
}
```

---

## ✏️ **4. ATUALIZAR USUÁRIO**

### `PUT /users/:id`

Atualiza um usuário existente. Todos os campos são opcionais.

#### **Parâmetros da URL**

| Parâmetro | Tipo   | Obrigatório | Descrição     |
| --------- | ------ | ----------- | ------------- |
| `id`      | number | Sim         | ID do usuário |

#### **Headers**

```
Content-Type: application/json
```

#### **Body (JSON) - Todos os campos opcionais**

```json
{
  "name": "Robert Atualizado",
  "email": "robert.novo@gmail.com",
  "password": "novaSenha123",
  "role": "user"
}
```

#### **Exemplos de Atualização**

**Atualizar apenas nome:**

```json
{
  "name": "Novo Nome"
}
```

**Atualizar email e role:**

```json
{
  "email": "novo@email.com",
  "role": "admin"
}
```

**Atualizar senha:**

```json
{
  "password": "novaSenha123"
}
```

#### **Resposta de Sucesso (200)**

```json
{
  "id": 1,
  "name": "Robert Atualizado",
  "email": "robert.novo@gmail.com",
  "role": "user",
  "createdAt": "2025-01-07T10:30:00.000Z",
  "updatedAt": "2025-01-07T12:00:00.000Z"
}
```

#### **Resposta de Erro (400)**

```json
{
  "message": "Dados inválidos: Email deve ter um formato válido (exemplo: usuario@dominio.com)"
}
```

#### **Resposta de Erro (404)**

```json
{
  "message": "Usuário não encontrado"
}
```

---

## 🗑️ **5. DELETAR USUÁRIO**

### `DELETE /users/:id`

Remove um usuário do sistema.

#### **Parâmetros da URL**

| Parâmetro | Tipo   | Obrigatório | Descrição     |
| --------- | ------ | ----------- | ------------- |
| `id`      | number | Sim         | ID do usuário |

#### **Exemplo de Requisição**

```
DELETE /users/1
```

#### **Resposta de Sucesso (200)**

```json
{
  "message": "Usuário deletado com sucesso"
}
```

#### **Resposta de Erro (404)**

```json
{
  "message": "Usuário não encontrado"
}
```

---

## 📝 **EXEMPLOS PARA POSTMAN**

### **Collection JSON para Importar**

```json
{
  "info": {
    "name": "Sistema Jogos - Usuários",
    "description": "API de gerenciamento de usuários",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3001/users"
    }
  ],
  "item": [
    {
      "name": "1. Criar Usuário",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Robert Lindomar\",\n  \"email\": \"robert@gmail.com\",\n  \"password\": \"123456\",\n  \"role\": \"admin\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}",
          "host": ["{{baseUrl}}"]
        }
      }
    },
    {
      "name": "2. Listar Usuários (Padrão)",
      "request": {
        "method": "GET",
        "url": {
          "raw": "{{baseUrl}}",
          "host": ["{{baseUrl}}"]
        }
      }
    },
    {
      "name": "3. Listar com Paginação",
      "request": {
        "method": "GET",
        "url": {
          "raw": "{{baseUrl}}?page=1&limit=5",
          "host": ["{{baseUrl}}"],
          "query": [
            {
              "key": "page",
              "value": "1"
            },
            {
              "key": "limit",
              "value": "5"
            }
          ]
        }
      }
    },
    {
      "name": "4. Buscar por Nome",
      "request": {
        "method": "GET",
        "url": {
          "raw": "{{baseUrl}}?search=robert",
          "host": ["{{baseUrl}}"],
          "query": [
            {
              "key": "search",
              "value": "robert"
            }
          ]
        }
      }
    },
    {
      "name": "5. Filtrar por Role",
      "request": {
        "method": "GET",
        "url": {
          "raw": "{{baseUrl}}?role=admin",
          "host": ["{{baseUrl}}"],
          "query": [
            {
              "key": "role",
              "value": "admin"
            }
          ]
        }
      }
    },
    {
      "name": "6. Buscar Usuário por ID",
      "request": {
        "method": "GET",
        "url": {
          "raw": "{{baseUrl}}/1",
          "host": ["{{baseUrl}}"],
          "path": ["1"]
        }
      }
    },
    {
      "name": "7. Atualizar Usuário (Completo)",
      "request": {
        "method": "PUT",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Robert Atualizado\",\n  \"email\": \"robert.novo@gmail.com\",\n  \"password\": \"novaSenha123\",\n  \"role\": \"user\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/1",
          "host": ["{{baseUrl}}"],
          "path": ["1"]
        }
      }
    },
    {
      "name": "8. Atualizar Apenas Nome",
      "request": {
        "method": "PUT",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Novo Nome\"\n}"
        },
        "url": {
          "raw": "{{baseUrl}}/1",
          "host": ["{{baseUrl}}"],
          "path": ["1"]
        }
      }
    },
    {
      "name": "9. Deletar Usuário",
      "request": {
        "method": "DELETE",
        "url": {
          "raw": "{{baseUrl}}/1",
          "host": ["{{baseUrl}}"],
          "path": ["1"]
        }
      }
    }
  ]
}
```

---

## ⚠️ **CÓDIGOS DE ERRO**

| Código | Descrição                           |
| ------ | ----------------------------------- |
| `200`  | Sucesso                             |
| `201`  | Criado com sucesso                  |
| `204`  | Deletado com sucesso (sem conteúdo) |
| `400`  | Dados inválidos                     |
| `404`  | Usuário não encontrado              |
| `500`  | Erro interno do servidor            |

---

## 🔒 **VALIDAÇÕES**

### **Nome**

- Obrigatório na criação
- Mínimo: 2 caracteres
- Máximo: 100 caracteres

### **Email**

- Obrigatório na criação
- Formato válido (exemplo: usuario@dominio.com)
- Máximo: 255 caracteres
- Único no sistema

### **Senha**

- Obrigatória na criação
- Mínimo: 6 caracteres
- Máximo: 50 caracteres
- Hash automático com bcrypt

### **Role**

- Valores aceitos: `admin` ou `user`
- Padrão: `user`

### **ID**

- Deve ser um número inteiro positivo
- Obrigatório em operações específicas

---

## 🚀 **COMO TESTAR**

1. **Importe a collection** no Postman usando o JSON acima
2. **Configure a variável** `baseUrl` para `http://localhost:3001/users`
3. **Execute as requisições** na ordem sugerida
4. **Teste diferentes cenários** com dados válidos e inválidos

---

## 📊 **ESTRUTURA DE DADOS**

### **UserRequestDTO (Criação)**

```typescript
{
  name: string; // Obrigatório
  email: string; // Obrigatório
  password: string; // Obrigatório
  role: "admin" | "user"; // Opcional (padrão: 'user')
  isActive?: boolean; // Opcional (padrão: true)
}
```

### **UserUpdateDTO (Atualização)**

```typescript
{
  name?: string;       // Opcional
  email?: string;      // Opcional
  password?: string;   // Opcional
  role?: 'admin' | 'user'; // Opcional
  isActive?: boolean;  // Opcional
}
```

### **UserResponseDTO (Resposta)**

```typescript
{
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🆕 **NOVAS FUNCIONALIDADES**

### **6. RESTAURAR USUÁRIO DELETADO**

### `POST /users/:id/restore`

Restaura um usuário que foi deletado (soft delete).

#### **Parâmetros da URL**

- `id` (number): ID do usuário a ser restaurado

#### **Resposta de Sucesso (200)**

```json
{
  "message": "Usuário restaurado com sucesso",
  "user": {
    "id": 1,
    "name": "Robert Lindomar",
    "email": "robert@gmail.com",
    "role": "admin",
    "isActive": true,
    "createdAt": "2025-01-07T10:30:00.000Z",
    "updatedAt": "2025-01-07T12:00:00.000Z"
  }
}
```

#### **Resposta de Erro (404)**

```json
{
  "message": "Usuário não encontrado ou não está deletado"
}
```

---

### **7. LISTAR USUÁRIOS DELETADOS**

### `GET /users/deleted`

Lista todos os usuários que foram deletados (soft delete).

#### **Resposta de Sucesso (200)**

```json
{
  "mensagem": "Usuários deletados encontrados",
  "data": [
    {
      "id": 2,
      "name": "Usuário Deletado",
      "email": "deletado@gmail.com",
      "role": "user",
      "isActive": true,
      "createdAt": "2025-01-07T10:30:00.000Z",
      "updatedAt": "2025-01-07T10:30:00.000Z"
    }
  ]
}
```

#### **Resposta Vazia (200)**

```json
{
  "mensagem": "Nenhum usuário deletado encontrado",
  "data": []
}
```

---

### **8. ATIVAR/DESATIVAR USUÁRIO**

### `PATCH /users/:id/toggle-status`

Alterna o status ativo/inativo de um usuário.

#### **Parâmetros da URL**

- `id` (number): ID do usuário

#### **Resposta de Sucesso (200)**

```json
{
  "message": "Usuário desativado com sucesso",
  "user": {
    "id": 1,
    "name": "Robert Lindomar",
    "email": "robert@gmail.com",
    "role": "admin",
    "isActive": false,
    "createdAt": "2025-01-07T10:30:00.000Z",
    "updatedAt": "2025-01-07T12:00:00.000Z"
  }
}
```

---

## 🔄 **SOFT DELETE**

O sistema implementa **soft delete**, o que significa que:

- ✅ **Usuários não são removidos** fisicamente do banco
- ✅ **Campo `deletedAt`** marca quando foi deletado
- ✅ **Usuários deletados não aparecem** nas listagens normais
- ✅ **Possibilidade de restaurar** usuários deletados
- ✅ **Integridade referencial** mantida

### **Comportamento:**

- `DELETE /users/:id` → Marca como deletado (`deletedAt = now()`)
- `GET /users` → Lista apenas usuários não deletados
- `GET /users/deleted` → Lista apenas usuários deletados
- `POST /users/:id/restore` → Restaura usuário deletado

---

## 📊 **CAMPOS ADICIONAIS**

### **isActive (boolean)**

- **Padrão:** `true`
- **Função:** Controla se o usuário está ativo no sistema
- **Uso:** Desativar temporariamente sem deletar

### **deletedAt (DateTime)**

- **Padrão:** `null`
- **Função:** Marca quando o usuário foi deletado (soft delete)
- **Uso:** Controle de exclusão lógica

---

**🎉 Pronto! Agora você tem uma API completa e bem documentada para gerenciar usuários com soft delete e controle de status!**
