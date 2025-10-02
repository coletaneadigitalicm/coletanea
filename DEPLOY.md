# Deploy no GitHub Pages - Coletânea Digital

Este documento explica como fazer o deploy da aplicação Coletânea Digital no GitHub Pages.

## 📋 Pré-requisitos

1. Repositório Git configurado e conectado ao GitHub
2. Branch `gh-pages` será criada automaticamente pelo comando de deploy
3. GitHub Pages habilitado nas configurações do repositório

## 🚀 Comandos de Deploy

### Build de Produção
```bash
npm run build:prod
```

Este comando:
- Compila o projeto Angular em modo produção
- Define o `base-href` como `/coletanea/`
- Gera os arquivos otimizados em `dist/coletanea/browser`

### Deploy Completo
```bash
npm run deploy
```

Este comando:
1. Executa o build de produção
2. Faz deploy automático para a branch `gh-pages`
3. Publica no GitHub Pages

## 🔧 Configuração do GitHub Pages

1. Acesse as **Settings** do repositório no GitHub
2. Vá em **Pages** (menu lateral esquerdo)
3. Em **Source**, selecione:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Clique em **Save**

## 🌐 URL de Produção

Após o deploy, a aplicação estará disponível em:
```
https://coletaneadigitalicm.github.io/coletanea/
```

## 📝 Observações Importantes

### Base Href
O projeto está configurado com `--base-href /coletanea/` para funcionar corretamente no GitHub Pages. Não remova essa configuração.

### PDFs em Produção
- Os PDFs **não** estão no repositório (pasta `public/` está no `.gitignore`)
- Em produção, a aplicação deve apontar para os PDFs hospedados no projeto `pesquisador-louvores-simples`
- O `EnvironmentService` detecta automaticamente o ambiente e usa a URL correta

### Viewer de PDF
A aplicação usa o leitor de PDF hospedado em:
```
https://coletaneadigitalicm.github.io/leitor-pdf/
```

Certifique-se de que o projeto `leitor-pdf` também está publicado no GitHub Pages.

## 🔄 Fluxo de Deploy Completo

1. **Desenvolva localmente**
   ```bash
   npm start
   ```
   Acesse: http://localhost:4300

2. **Teste o build de produção**
   ```bash
   npm run build:prod
   ```

3. **Faça o deploy**
   ```bash
   npm run deploy
   ```

4. **Aguarde alguns minutos** para o GitHub Pages atualizar

5. **Acesse a URL de produção** para verificar

## 🐛 Troubleshooting

### Erro 404 ao acessar rotas
- Verifique se o `base-href` está correto
- GitHub Pages não suporta SPA routing nativamente
- Considere adicionar um arquivo `404.html` que redireciona para `index.html`

### Arquivos não encontrados
- Verifique se o build de produção foi executado com sucesso
- Confirme que a branch `gh-pages` foi criada e atualizada
- Verifique as configurações do GitHub Pages no repositório

### PDFs não carregam
- Verifique se o `EnvironmentService` está detectando produção corretamente
- Confirme que o leitor de PDF está publicado e acessível
- Verifique os URLs dos PDFs no console do navegador

## 📚 Referências

- [Angular Deployment Guide](https://angular.dev/tools/cli/deployment)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [angular-cli-ghpages](https://github.com/angular-schule/angular-cli-ghpages)
