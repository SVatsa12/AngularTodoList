import { Component } from '@angular/core';
import { TodoComponent } from './components/todo/todo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoComponent],
  template: `
    <h1>Todo App</h1>
    <app-todo></app-todo>
  `,
})
export class App {}