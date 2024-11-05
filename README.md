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
## Alinhando os cards
A aplicação do CSS é que vai fazer o alinhamento dos cards:

```HTML
<!-- src\app\pages\home\home.component.html -->
<app-banner src="assets/imagens/banner-homepage.png" alt="Banner da Aplicação Jornada"></app-banner>
<app-container>
  <h2>Promoções</h2>
  <div class="card-wrapper">
    <app-card-busca></app-card-busca>
    <app-card-busca></app-card-busca>
    <app-card-busca></app-card-busca>
    <app-card-busca></app-card-busca>
  </div>
  <h2>Depoimentos</h2>
</app-container>
```

```CSS
/* src\app\pages\home\home.component.scss */
.card-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 16px;
  margin-bottom: 40px;
}
```

Inserção do footer:
```HTML
<!-- src\app\app.component.html -->
<app-header></app-header>
<router-outlet></router-outlet>
<app-footer></app-footer>
```

## Desafio: crie o card de depoimento
```bash
ng generate component shared/card-depoimento
# ou...
ng g c shared/card-depoimento
```
> Lembrando que o arquivo `app.module.ts` é atualizado sempre que um novo componente é criado usando a CLI.

Editando o arquivo `card-depoimento.component.ts`:
```TypeScript
// src\app\shared\card-depoimento\card-depoimento.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-card-depoimento',
  templateUrl: './card-depoimento.component.html',
  styleUrls: ['./card-depoimento.component.scss']
})
export class CardDepoimentoComponent {
  // Note as atribuições às variáveis 'depoimento' e 'autoria'.
  depoimento: string = `
    Recomendo fortemente a agência de viagens Jornada.
    Eles oferecem um serviço personalizado e de alta qualidade
    que excedeu minhas expectativas em minha última viagem.
  `
  autoria: string = 'Mariana Faustino'
}
```

```HTML
<!-- src\app\shared\card-depoimento\card-depoimento.component.html -->
<mat-card class="depoimento">
    <mat-card-content>
      <img src="assets/imagens/avatar3.png" alt="Avatar da pessoa autora do depoimento">
      <ul>
        <li>{{ depoimento }}</li>
        <li><strong>{{ autoria }}</strong></li>
      </ul>
    </mat-card-content>
</mat-card>
```

```CSS
/* src\app\shared\card-depoimento\card-depoimento.component.scss */
.depoimento {
  max-width: 320px;
  background-color: #FEF7FF;
  border: none;
  img {
    max-width: 56px;
    max-height: 56px;
    margin-top: 16px;
  }
  ul {
    padding: 0;
    list-style: none;
    li {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
    }
  }
  mat-card-content {
    display: flex;
    align-items: start;
    gap: 16px;
  }
}
```

Invocando o componente `<app-card-depoimento>` em `home.component.html`:
```HTML
<!-- src\app\pages\home\home.component.html -->
<app-banner src="assets/imagens/banner-homepage.png" alt="Banner da Aplicação Jornada"></app-banner>
<app-container>
  <!-- Resto do código -->
  <h2>Depoimentos</h2>
  <div class="card-wrapper">
    <app-card-depoimento></app-card-depoimento>
    <app-card-depoimento></app-card-depoimento>
    <app-card-depoimento></app-card-depoimento>
  </div>
</app-container>
```

# Criando o formulário de busca
## Botões e chips do Material
Vamos criar o componente `<app-form-busca>`:
```bash
ng generate component shared/form-busca
# ou...
ng g c shared/form-busca
```
> Lembrando que o arquivo `app.module.ts` é atualizado sempre que um novo componente é criado usando a CLI.

HTML do componente:
```HTML
<!-- src\app\shared\form-busca\form-busca.component.html -->
<app-card variant="secondary" class="form-busca">
  <form>
    <h2>Passagens</h2>
    <div class="flex-container">
      <mat-button-toggle-group aria-label="Tipo de passsagens">
        <mat-button-toggle>
          <mat-icon>check</mat-icon>
          IDA E VOLTA
        </mat-button-toggle>
        <mat-button-toggle>
          SOMENTE IDA
        </mat-button-toggle>
      </mat-button-toggle-group>
      <mat-chip-listbox aria-label="Seleção de passagem">
        <mat-chip-option selected>1 adulto</mat-chip-option>
        <mat-chip-option>Econômica</mat-chip-option>
      </mat-chip-listbox>
    </div>
  </form>
</app-card>
```
> Perceba que por enquanto os campos do formulário não possuem nomes ou valores-padrão.

Certifique-se que para cada componente do Angular Material haja um módulo correspondente:
```TypeScript
import { NgModule } from '@angular/core';
// Resto do código
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    // Resto do código
    CardDepoimentoComponent,
    FormBuscaComponent
  ],
  imports: [
    // Resto do código
    MatButtonToggleModule,
    MatIconModule,
    MatChipsModule,
  ],
  // Resto do código
})
export class AppModule { }
```

Aplicação do CSS no componente: 
```CSS
/* src\app\shared\form-busca\form-busca.component.scss */
.form-busca {
  margin: 40px 0;
  display: block;
  .flex-container {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 16px 0;
  }
  .input-container {
    margin-bottom: -1.25em;
  }
  .mat-button-toggle-checked {
    background-color: #F7F2FA;
  }
  h2 {
    font-size: 32px;
    margin-bottom: 20px;
  }
}
```

Exiba o componente recém-criado em `home.component.html`:
```HTML
<!-- src\app\pages\home\home.component.html -->
<app-banner src="assets/imagens/banner-homepage.png" alt="Banner da Aplicação Jornada"></app-banner>
<app-container>
  <h2>Promoções</h2>
  <app-form-busca></app-form-busca>
  <!-- Resto do código -->
</app-container>
```

## Campos do formulário
Usaremos os módulos `MatFormFieldModule` e `MatInputFieldModule`. O componente `<mat-form-field>` depende do componente `MatInputField`, embora o último componente não apareça no HTML.

```HTML
<!-- src\app\shared\form-busca\form-busca.component.html -->
<app-card variant="secondary" class="form-busca">
  <form>
    <h2>Passagens</h2>
    <!-- Resto do código -->
    <div class="flex-container">
      <mat-form-field class="input-container" appearance="outline">
        <mat-icon matPrefix>
          flight_takeoff
        </mat-icon>
        <mat-label>Origem</mat-label>
        <input matInput placeholder="Origem">
        <!-- Note o atributo matInput aqui -->
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>
      <button mat-button>
        <mat-icon>sync_alt</mat-icon>
      </button>
      <mat-form-field class="input-container" appearance="outline">
        <mat-icon matPrefix>
          flight_land
        </mat-icon>
        <mat-label>Destino</mat-label>
        <input matInput placeholder="Destino">
        <!-- Note o atributo matInput aqui -->
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>
    </div>
  </form>
</app-card>
```

Inclusões dos módulos em `app.module.ts`:
```TypeScript
// src\app\app.module.ts
import { NgModule } from '@angular/core';

// Resto do código
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  // Resto do código
  imports: [
    // Resto do código
    MatFormFieldModule,
    MatInputModule,
  ],
  // Resto do código
})
export class AppModule { }
```

## Campos para data
Usaremos os módulos `MatDatepickerModule` e `MatNativeDateModule`. O componente `<mat-datepicker>` depende de `MatNativeDateModule`, embora o último módulo não apareça no HTML.

```HTML
<!-- src\app\shared\form-busca\form-busca.component.html -->
<app-card variant="secondary" class="form-busca">
  <form>
    <!-- Resto do código -->
    <div class="flex-container">
      <!-- Resto do código -->
      <mat-form-field class="input-container" appearance="outline">
        <mat-label>Data de ida</mat-label>
        <input matInput [matDatepicker]="ida">
        <mat-datepicker-toggle matIconSuffix [for]="ida"></mat-datepicker-toggle>
        <mat-datepicker #ida></mat-datepicker>
      </mat-form-field>
      <mat-form-field class="input-container" appearance="outline">
        <mat-label>Data da volta</mat-label>
        <input matInput [matDatepicker]="volta">
        <mat-datepicker-toggle matIconSuffix [for]="volta"></mat-datepicker-toggle>
        <mat-datepicker #volta></mat-datepicker>
      </mat-form-field>
      <button mat-flat-button color="primary">BUSCAR</button>
    </div>
  </form>
</app-card>
```

Inclusões dos módulos em `app.module.ts`:
```TypeScript
// src\app\app.module.ts
import { NgModule } from '@angular/core';

// Resto do código
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  // Resto do código
  imports: [
    // Resto do código
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  // Resto do código
})
export class AppModule { }
```
# Criando o modal
## Acessando o modal
Criando um componente `modal` na pasta `shared`:

```bash
ng generate component shared/modal
# ou
ng g c shared/modal
```
> Lembrando que o arquivo `app.module.ts` é atualizado sempre que um novo componente é criado usando a CLI.

Edição do formulário de busca para conter o comando para abrir o modal: 
```HTML
<!-- src\app\shared\form-busca\form-busca.component.html -->
<app-card variant="secondary" class="form-busca">
  <form>
    <h2>Passagens</h2>
    <div class="flex-container">
      <!-- Resto do código -->
      <mat-chip-listbox  (click)="openDialog()" aria-label="Seleção de passagem">
        <mat-chip-option selected>1 adulto</mat-chip-option>
        <mat-chip-option>Econômica</mat-chip-option>
      </mat-chip-listbox>
      <!-- Resto do código -->
    </div>
  </form>
</app-card>
```

Lógica de exibição do modal
```TypeScript
// src\app\shared\form-busca\form-busca.component.ts
import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component'; // Componente recém-criado.
import { MatDialog } from '@angular/material/dialog'; // Reúso do componente do Angular Material.

@Component({
  selector: 'app-form-busca',
  templateUrl: './form-busca.component.html',
  styleUrls: ['./form-busca.component.scss']
})
export class FormBuscaComponent {
  constructor(public dialog: MatDialog) {} // O componente é inserido no construtor para uso em openDialog.

  openDialog() {
    this.dialog.open(ModalComponent); // Abre o diálogo cujo conteúdo será o recém criado ModalComponent.
  }
}
```

Conteúdo de `app.module.ts` após as modificações:
```TypeScript
import { NgModule } from '@angular/core';
// Resto do código
import { ModalComponent } from './shared/modal/modal.component'; // Componente recém-criado.
import { MatDialogModule } from '@angular/material/dialog'; // Reúso do componente do Angular Material.


@NgModule({
  declarations: [
    // Resto do código
    FormBuscaComponent,
    ModalComponent
  ],
  imports: [
    // Resto do código
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Adicionando elementos
Modificando o HTML do componente modal:
```HTML
<!-- src\app\shared\modal\modal.component.html -->
<section class="modal">
  <h1 mat-dialog-title>Viajante</h1>
  <div mat-dialog-content>
    <div class="selecao-idade">
      <ul>
        <li><b>Adultos</b></li>
        <li>(Acima de 12 anos)</li>
        <li>
          <button class="decremento" mat-mini-fab>
            <img
              src="assets/icones/do_not_disturb_on.png"
              alt="Operador de subtração"
            >
          </button>
          <span>1</span>
          <button class="incremento" mat-mini-fab>
            <img
              src="assets/icones/add_circle.png"
              alt="Operador de adição"
            >
          </button>
        </li>
      </ul>
      <ul>
        <li><b>Crianças</b></li>
        <li>(Entre 2 e 11 anos)</li>
        <li>
          <button class="decremento" mat-mini-fab>
            <img
              src="assets/icones/do_not_disturb_on.png"
              alt="Operador de subtração"
            >
          </button>
          <span>1</span>
          <button class="incremento" mat-mini-fab>
            <img
              src="assets/icones/add_circle.png"
              alt="Operador de adição"
            >
          </button>
        </li>
      </ul>
      <ul>
        <li><b>Bebês</b></li>
        <li>(Até 2 anos)</li>
        <li>
          <button class="decremento" mat-mini-fab>
            <img
              src="assets/icones/do_not_disturb_on.png"
              alt="Operador de subtração"
            >
          </button>
          <span>1</span>
          <button class="incremento" mat-mini-fab>
            <img
              src="assets/icones/add_circle.png"
              alt="Operador de adição"
            >
          </button>
        </li>
      </ul>
    </div>
    <div class="categoria">
      <h2>Categoria</h2>
      <mat-chip-listbox aria-label="Categoria">
        <mat-chip-option>Executiva</mat-chip-option>
        <mat-chip-option selected>Econômica</mat-chip-option>
      </mat-chip-listbox>
    </div>
  </div>
  <div mat-dialog-actions>
    <button mat-button mat-dialog-close>Close</button>
  </div>
</section>
```

Formatando o modal:
```CSS
/* src\app\shared\modal\modal.component.scss */
.modal {
  border: 1px solid #1D1B20;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 32px;
    padding: 12px;
  }
  .selecao-idade {
    display: flex;
    justify-content: space-between;
    ul {
      list-style-type: none;
      margin: 0 0 0 -1em;
      padding: 0;
      li {
        margin-bottom: 10px;
        margin: 12px;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        color: #1D1B20;
        text-align: start;
        padding: 0;
        span {
          vertical-align: middle;
          padding: 0 12px;
        }
      }
    }
  }
  .selecao-categoria {
    margin-top: 32px;
    color: #1D1B20;
  }
  .modal-actions {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    button {
      margin: 0 8px;
      width: 100%;
    }
  }
}
```
Invocando o modal a partir do componente `form-busca`:
```TypeScript
import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  // Resto do código.
})
export class FormBuscaComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(ModalComponent, {
      width: '50%',
    });
  }
}
```
## Desafio: componentizando os botões de incremento e decremento
Primeiro: criar o componente na CLI:

```bash
ng generate component shared/botao-controle
# ou
ng g c shared/botao-controle
```
> Lembrando que o arquivo `app.module.ts` é atualizado sempre que um novo componente é criado usando a CLI.

Editando o TS do componente para conter a variável contadora e as funções de incremento e decremento:
```TypeScript
// src\app\shared\botao-controle\botao-controle.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botao-controle',
  templateUrl: './botao-controle.component.html',
  styleUrls: ['./botao-controle.component.scss']
})
export class BotaoControleComponent {
  // operacao é do tipo união cujas opções são apenas 'incremento' e 'decremento':
  @Input() operacao : 'incremento' | 'decremento' = 'incremento'
  @Input() src = ''
  @Input() alt = ''
}
```

Estrutura HTML do componente:
```HTML
<!-- src\app\shared\botao-controle\botao-controle.component.html -->
<button [ngClass]="operacao" mat-mini-fab>
  <!-- Compare as 3 variáveis do ts do componente com este HTML. -->
  <img
    [src]="operacao === 'incremento' ? 'assets/icones/do_not_disturb_on.png' : 'assets/icones/add_circle.png' "
    [alt]="operacao === 'incremento' ? 'Operador de adição' : 'Operador de subtração' "
  />
</button>
```

Modificação do HTML do componente modal (remover as duplicidades quando não havia o componente reutilizável):
```HTML
<section class="modal">
  <h1 mat-dialog-title>Viajante</h1>
  <div mat-dialog-content>
    <div class="selecao-idade">
      <ul>
        <li><b>Adultos</b></li>
        <li>(Acima de 12 anos)</li>
        <li>
          <!-- Uso do controle para incremento -->
          <app-botao-controle operacao="incremento"/>
          <span style="margin: 15px">1</span>
          <!-- Uso do controle para decremento -->
          <app-botao-controle operacao="decremento"/>
        </li>
      </ul>
      <ul>
        <li><b>Crianças</b></li>
        <li>(Entre 2 e 11 anos)</li>
        <li>
          <!-- Uso do controle para incremento -->
          <app-botao-controle operacao="incremento"/>
          <span style="margin: 15px">1</span>
          <!-- Uso do controle para decremento -->
          <app-botao-controle operacao="decremento"/>
        </li>
      </ul>
      <ul>
        <li><b>Bebês</b></li>
        <li>(Até 2 anos)</li>
        <li>
          <!-- Uso do controle para incremento -->
          <app-botao-controle operacao="incremento"/>
          <span style="margin: 15px">1</span>
          <!-- Uso do controle para decremento -->
          <app-botao-controle operacao="decremento"/>
        </li>
      </ul>
    </div>
    <!-- Resto do código -->
  </div>
  <!-- Resto do código -->
</section>
```
