# 🧪 PASTA DE TESTES - MÓDULO USUÁRIOS

## 📋 **CONTEÚDO DESTA PASTA**

Esta pasta contém todos os recursos necessários para testar o módulo de usuários:

### **📁 Arquivos Disponíveis:**

- **`Collection_Postman.json`** - Collection completa para importar no Postman
- **`Exemplos_Completos.md`** - Exemplos detalhados de todas as requisições
- **`Cenarios_Teste.md`** - Cenários de teste organizados por funcionalidade
- **`README.md`** - Este arquivo com instruções gerais

---

## 🚀 **COMO COMEÇAR**

### **1. Configuração Inicial**

```bash
# 1. Certifique-se que o servidor está rodando
npm run dev

# 2. Verifique se aparece: "Servidor rodando em http://localhost:3001"
```

### **2. Importar Collection no Postman**

1. Abra o Postman
2. Clique em **"Import"**
3. Selecione o arquivo **`Collection_Postman.json`**
4. A collection será importada com 13 requisições prontas

### **3. Configurar Variável**

1. Na collection, vá em **"Variables"**
2. Verifique se `baseUrl` = `http://localhost:3001/users`
3. Ajuste se necessário

---

## 📚 **GUIA DE USO DOS ARQUIVOS**

### **📄 Collection_Postman.json**

- **O que é:** Collection completa com todas as requisições
- **Como usar:** Importar no Postman e executar
- **Contém:** 13 requisições com exemplos de resposta

### **📄 Exemplos_Completos.md**

- **O que é:** Exemplos detalhados de cada requisição
- **Como usar:** Consultar para entender o formato das requisições
- **Contém:** Códigos HTTP, JSONs de exemplo, respostas esperadas

### **📄 Cenarios_Teste.md**

- **O que é:** Cenários organizados por funcionalidade
- **Como usar:** Seguir os cenários para testar sistematicamente
- **Contém:** 9 cenários com múltiplos testes cada

---

## 🎯 **ORDEM RECOMENDADA DE TESTES**

### **1. Testes Básicos (Começar aqui)**

1. **Criar usuário** (requisição 1)
2. **Listar usuários** (requisição 2)
3. **Buscar por ID** (requisição 7)
4. **Atualizar usuário** (requisição 8)
5. **Deletar usuário** (requisição 13)

### **2. Testes de Paginação**

1. **Listar com paginação** (requisição 3)
2. **Buscar por nome** (requisição 4)
3. **Filtrar por role** (requisição 5)
4. **Busca combinada** (requisição 6)

### **3. Testes de Atualização Parcial**

1. **Atualizar apenas nome** (requisição 9)
2. **Atualizar apenas email** (requisição 10)
3. **Atualizar apenas senha** (requisição 11)
4. **Atualizar apenas role** (requisição 12)

### **4. Testes de Validação**

- Use os cenários do arquivo `Cenarios_Teste.md`
- Teste dados inválidos
- Teste casos de erro

---

## ⚠️ **DICAS IMPORTANTES**

### **✅ O que fazer:**

- **Anotar IDs** retornados nas criações
- **Usar IDs reais** nas requisições de busca/atualização/deleção
- **Testar validações** com dados inválidos
- **Verificar códigos de status** HTTP
- **Limpar dados de teste** ao final

### **❌ O que evitar:**

- Usar IDs fixos (como `/1`) sem verificar se existem
- Pular validações de erro
- Não verificar a estrutura das respostas
- Deixar dados de teste no banco

---

## 🔍 **VERIFICAÇÕES ESSENCIAIS**

### **Para cada requisição, verificar:**

- [ ] **Status code** correto (200, 201, 400, 404)
- [ ] **Estrutura da resposta** conforme documentado
- [ ] **Dados retornados** corretos
- [ ] **Timestamps** gerados automaticamente
- [ ] **Senhas** não aparecem em texto claro

### **Para validações, verificar:**

- [ ] **Mensagens de erro** em português
- [ ] **Códigos de status** apropriados
- [ ] **Campos obrigatórios** validados
- [ ] **Formatos** validados (email, etc.)

---

## 📊 **EXEMPLOS DE DADOS DE TESTE**

### **Usuário Admin:**

```json
{
  "name": "Admin Sistema",
  "email": "admin@sistema.com",
  "password": "admin123",
  "role": "admin"
}
```

### **Usuário Comum:**

```json
{
  "name": "Usuário Teste",
  "email": "teste@email.com",
  "password": "teste123",
  "role": "user"
}
```

### **Usuário para Testes de Validação:**

```json
{
  "name": "João Silva Santos",
  "email": "joao.silva@gmail.com",
  "password": "senhaSegura123",
  "role": "user"
}
```

---

## 🚨 **PROBLEMAS COMUNS E SOLUÇÕES**

### **Erro: "Servidor não encontrado"**

- **Causa:** Servidor não está rodando
- **Solução:** Execute `npm run dev`

### **Erro: "ID inválido"**

- **Causa:** Usando ID que não existe
- **Solução:** Crie um usuário primeiro e use o ID retornado

### **Erro: "Email já cadastrado"**

- **Causa:** Tentando criar usuário com email existente
- **Solução:** Use um email diferente ou delete o usuário existente

### **Erro: "Dados inválidos"**

- **Causa:** Validação falhou
- **Solução:** Verifique os dados enviados (nome, email, senha)

---

## 📝 **RELATÓRIO DE TESTES**

Após executar os testes, documente:

```
=== RELATÓRIO DE TESTES ===
Data: [DATA]
Módulo: Usuários
Ambiente: [AMBIENTE]

RESULTADOS:
✅ Criação: [X/X] testes passaram
✅ Listagem: [X/X] testes passaram
✅ Busca: [X/X] testes passaram
✅ Atualização: [X/X] testes passaram
✅ Exclusão: [X/X] testes passaram
✅ Validações: [X/X] testes passaram

TOTAL: [X/Y] testes passaram

PROBLEMAS:
- [Listar problemas encontrados]

OBSERVAÇÕES:
- [Observações importantes]
```

---

## 🎉 **PRÓXIMOS PASSOS**

Após testar o módulo de usuários:

1. **Documentar** problemas encontrados
2. **Reportar** bugs se houver
3. **Aplicar** o mesmo padrão em outros módulos
4. **Reutilizar** esta estrutura de testes

---

**📋 Esta pasta serve como modelo para testes de outros módulos do sistema!**
