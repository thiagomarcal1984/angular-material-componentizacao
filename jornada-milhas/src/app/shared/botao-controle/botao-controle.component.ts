import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botao-controle',
  templateUrl: './botao-controle.component.html',
  styleUrls: ['./botao-controle.component.scss']
})
export class BotaoControleComponent {
  @Input() operacao : 'incremento' | 'decremento' = 'incremento'
  @Input() src = ''
  @Input() alt = ''
}
