# Iniciando a Jornada de Componentização
## Preparando o ambiente: versão 17

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

## Abordagem de componentes no Angular

Criando a aplicação Angular:
```bash
ng new jornada-milhas

? Would you like to add Angular routing? (y/N) y
? Which stylesheet format would you like to use? SCSS
```

Rodando a aplicação (e abrindo no navegador):

```bash
cd jornada-milhas
ng serve --open
```

Criando um componente `header` na pasta `shared`:

```bash
ng generate component shared/header
# ou
ng g c shared/header
```

O mesmo processo de criação do componente `header` você pode repetir para estes components:
- footer
- card
- banner

## Conhecendo o Angular Material
Instalando a biblioteca Angular Material ao `package.json`:
```bash
ng add @angular/material
Would you like to proceed? (Y/n) y
? Choose a prebuilt theme name, or "custom" for a custom theme: (Use arrow keys) Deep Purple/Amber
? Set up global Angular Material typography styles? (y/N) y
? Include the Angular animations module? 
    > Include and enable animations
```

Note que o `package.json` passou a conter mais duas dependências: 
- @angular/cdk
- @angular/material

Os arquivos `angular.json`, `index.html`, `styles.scss` e `app/app.module.ts` também foram atualizados após a instalação do Angular Material.
- `angular.json` agora contém as referências aos estilos do Angular Material;
- `index.html` atualizou as referências às folhas de estilo do Angular Material;
-  `styles.scss` passou por poucas mudanças no seu estilo, aumentando a altura do body e do HTML para 100% e mudando a fonte para Roboto;
- `app.module.ts` passou a incluir uma biblioteca de animação, a `BrowserAnimationsModule`.
