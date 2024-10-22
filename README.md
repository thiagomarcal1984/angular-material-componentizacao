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

## Primeiro componente
Vamos usar uma toolbar e um button.
https://v16.material.angular.io/components/toolbar/overview
https://v16.material.angular.io/components/button/overview

Inicialmente vamos importar a toolbar e os botões para dentro `app.module.ts`:
```js
// Resto do código
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    // Resto do código
  ],
  imports: [
    // Resto do código
    MatToolbarModule,
    MatButtonModule,
  ],
  // Resto do código
})
export class AppModule { }
```
> Repare que importamos o `MatToolbarModule`, e não `MatToolbar`.
> Idem para `MatButtonModule`: não importamos o `MatButton`.

Vamos mudar o HTML de `header.component.html`:
```HTML
<mat-toolbar color="primary">
  <img src="assets/imagens/logo.png" alt="Logo da aplicação Jornada.">
  <span class="example-spacer"></span>
  <button mat-button>Vender milhas</button>
  <button mat-button>Sobre</button>
  <button mat-raised-button color="primary">CADASTRE-SE</button>
  <button mat-stroked-button>LOGIN</button>
</mat-toolbar>
```
> Note o elemento da classe `example-spacer`: ele será definido na folha de estilos e vai servir para mover os demais elementos para a extrema direita do cabeçalho.

Mudando o estilo CSS para deixar o fundo preto em `shared\header\header.component.scss`: 
```CSS
.example-spacer {
  flex: 1 1 auto;
}

.mat-toolbar {
  background-color: black;
  color: white;
}
```

Fizemos 3 coisas: 
1. Importamos os módulos dos componentes do Angular Material;
2. Modificamos a estrutura do componente `header`; e
3. Formatamos o componente `header` com SCSS.

Agora, vamos invocar o componente `header` no componente `app.component.html`:
```HTML
<app-header></app-header>
```

Sirva a aplicação:
```bash
ng serve
```
