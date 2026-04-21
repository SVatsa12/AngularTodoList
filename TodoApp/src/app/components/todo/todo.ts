import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule],
  styleUrl: './todo.css',
  template: `
    <div>
      <input [(ngModel)]="task" placeholder="Enter task" />
      <button (click)="addTask()">Add</button>

      <ul>
        @for (t of tasks; track t) {
          <li>{{ t }}</li>
        }
      </ul>
    </div>
  `,
})
export class TodoComponent {
  task = '';
  tasks: string[] = [];

  addTask() {
    if (this.task.trim()) {
      this.tasks.push(this.task);
      this.task = '';
    }
  }
}