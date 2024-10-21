# Preparando o ambiente: versão 17

Mostrando a versão do Angular CLI: 
```bash
ng version
```

1. Voltando para a versão 16 através do downgrade de versão:
```bash
npm uninstall -g @angular/cli
npm install -g @angular/cli@16.0.0
```

2. Continuando o curso com a versão 17 do Angular:
Observe que seguir com a versão 17 pode acabar gerando mais quebras no código que você precisará corrigir posteriormente, mas caso queira seguir com essa opção, é possível estabelecer a mesma estrutura de arquivos utilizando o seguinte comando no momento de criação do projeto:

```bash
ng new jornada-milhas --no-standalone --routing --ssr=false
```

Link para o projeto no Figma: 
https://www.figma.com/community/file/1416571124509342695/angular-desenvolva-aplicacoes-escalaveis-jornada-milhas
