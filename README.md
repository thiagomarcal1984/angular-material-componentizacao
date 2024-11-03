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

## Entendendo o SCSS
O SCSS permite o aninhamento das declarações das classes CSS. Isso individualiza melhos os estilos dos componentes.

Arquivo `shared\header\header.component.scss`:
```css
.app-header {
  button {
    margin: 0 16px;
  }

  .spacer {
    flex: 1 1 auto;
  }

  .mat-toolbar {
    background-color: black;
    color: white;
    padding: 0 256px;
  }

  .mat-mdc-outlined-button:not(:disabled) {
    border-color: white;
  }
}
```

Arquivo `shared\header\header.component.html`:
```html
<header class="app-header">
  <mat-toolbar color="primary">
    <img src="assets/imagens/logo.png" alt="Logo da aplicação Jornada.">
    <span class="spacer"></span>
    <button mat-button>Vender milhas</button>
    <button mat-button>Sobre</button>
    <button mat-raised-button color="primary">CADASTRE-SE</button>
    <button mat-stroked-button>LOGIN</button>
  </mat-toolbar>
</header>
```
# Criando componentes reutilizáveis
## Banner

Passo 1: Arquivo HTML (`banner.component.html`)
```HTML
<figure class="banner">
  <img src="{{ src }}" alt="{{ alt }}">
</figure>
```
> Note que vamos interpolar as variáveis `src` e `alt`. Elas serão declaradas como `Input` no arquivo `banner.component.ts`.

Passo 2: Arquivo SCSS (`banner.component.scss`)
```CSS
figure {
  margin: 0;
  img{
    max-width: 100%;
  }
}
```

Passo 3: Arquivo Type Script (`banner.component.ts`)
```TypeScript
import { Component, Input } from '@angular/core';
// Resto do código

export class BannerComponent {
  @Input() src : string = ''
  @Input() alt : string = ''
}
```
> Se não preposicionarmos o comando `@Input()`, o componente HTML não vai conseguir fazer a interpolação das variáveis.

Passo 4: Chamar o componente  (`app.component.html`)
```HTML
<app-header></app-header>
<app-banner src="assets/imagens/banner-homepage.png" alt="Banner da Aplicação Jornada"></app-banner>
```

## Criando um container
A criação de um container genérico é feito da seguinte forma: 

Passo 1: Geração automática via CLI.
```bash
ng generate component shared/container
# ou...
ng g c shared/container
```
> Lembrando que o arquivo `app.module.ts` é atualizado sempre que um novo componente é criado usando a CLI.


Passo 2: Inclusão da lacuna (placeholder) com o elemento `ng-content` no HTML do container.
```HTML
<!-- Arquivo app\shared\container\container.component.html -->
<ng-content></ng-content>
```

Passo 3: Definição do estilo SCSS no elemento 
```CSS
:host {
  display: block;
  margin: 0 auto; // Centraliza o elemento selecionado.
  max-width: 1048px;
  width: 90%;
}
```

> Os componentes de página vão reaproveitar o componente container, como veremos a seguir.


A criação da componente/página `home` se dará da seguinte forma: 

Passo 1: Geração automática via CLI.

```bash
ng generate component pages/home
# ou...
ng g c pages/home
```
> Lembrando que o arquivo `app.module.ts` é atualizado sempre que um novo componente é criado usando a CLI.


Passo 2: Edição do HTML com reúso do componente `<app-container>`.
```HTML
<app-banner src="assets/imagens/banner-homepage.png" alt="Banner da Aplicação Jornada"></app-banner>
<app-container>
  <h1>HOME</h1>
</app-container>
```

Agora vamos configurar o roteamento dos componentes.

Passo 1: edite o arquivo `app-routing.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '', // Rota raiz.
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

Passo 2: edite o componente `app.component.html` para inserir o ponto de inserção do componente que vai variar em função da rota.
```html
<app-header></app-header>
<!-- <router-outlet> é o ponto onde o componente será inserido em função da rota informada. -->
<router-outlet></router-outlet>
```

## Criando um card reaproveitável

```TypeScript
// src\app\shared\card\card.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() variant: 'primary' | 'secondary' = 'primary'
}
```
> Note o campo de entrada na variávei `variant`: ela contém um tipo união cujo valor padrão é `primary`.

```HTML
<!-- src\app\shared\card\card.component.html  -->
<div class="card" [ngClass]="variant">
  <ng-content></ng-content>
</div>
```
> Como a diretiva `[ngClass]` é util aqui?

```CSS
.card {
  padding: 24px;
  &.primary {
    background: #FEF7FF;
    border: 1px solid #CAC4D0;
    border-radius: 12px;
  }
  &.secondary {
    background: #F5F5F5;
    border-radius: 16px;
  }
}
```

## Card de busca
```bash
ng generate component shared/card-busca
# ou...
ng g c shared/card-busca
```

> Lembrando que o arquivo `app.module.ts` é atualizado sempre que um novo componente é criado usando a CLI.

```HTML
<!-- src\app\shared\card-busca\card-busca.component.html -->
<mat-card class="card-busca">
  <img mat-card-image
    src="assets/imagens/Veneza.png" alt="Imagem de Veneza">
  <mat-card-content>
    <ul>
      <li>Veneza</li>
      <li>R$ 500</li>
    </ul>
  </mat-card-content>
  <mat-card-actions>
    <button mat-flat-button color="primary">VER DETALHES</button>
  </mat-card-actions>
</mat-card>
```

```CSS
/* src\app\shared\card-busca\card-busca.component.scss */
.card-busca {
  max-width: 320px;
  background-color: #FEF7FF;
  border-radius: 12px;
  button {
    width: 100%;
    margin: 0 16px 48px;
  }
  ul {
    list-style: none;
    padding: 0;
    li {
      margin: 12px;
      font-weight: 400;
      font-size: 24px;
      line-height: 32px;
      color: #1D1B20;
      text-align: center;
    }
  }
}
```

```TypeScript
// src\app\app.module.ts

import { NgModule } from '@angular/core';
// Resto do código
// Import do módulo MatCardModule, pra uso do componente MatCardComponent no HTML
import { CardBuscaComponent } from './shared/card-busca/card-busca.component';
import { MatCardModule } from '@angular/material/card'

@NgModule({
  declarations: [
    // Resto do código
    HomeComponent,
    CardBuscaComponent
  ],
  imports: [
    // Resto do código
    MatCardModule,
  ],
  // Resto do código
})
export class AppModule { }
```

Uso do componente `<app-card-busca>` no arquivo `home.component.html`
```HTML
<!-- src\app\pages\home\home.component.html -->
<app-banner src="assets/imagens/banner-homepage.png" alt="Banner da Aplicação Jornada"></app-banner>
<app-container>
  <h1>HOME</h1>
  <app-card-busca></app-card-busca>
  <app-card-busca></app-card-busca>
  <app-card-busca></app-card-busca>
  <app-card-busca></app-card-busca>
</app-container>
```
