import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-entity-found',
  imports: [],
  templateUrl: './no-entity-found.component.html',
  styleUrl: './no-entity-found.component.scss'
})
export class NoEntityFoundComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
}
