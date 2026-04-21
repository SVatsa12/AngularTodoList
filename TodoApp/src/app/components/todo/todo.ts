import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface TodoItem {
  text: string;
  done: boolean;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./todo.component.css'],
  template: `
    <div class="todo-container">
      <h1 class="todo-title">Todo App</h1>
      
      <div class="input-group">
        <input 
          [(ngModel)]="task" 
          placeholder="What needs to be done?" 
          (keyup.enter)="addTask()"
          class="todo-input"
        />
        <button class="add-btn" (click)="addTask()">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
      </div>

      <ul class="task-list">
        @for (t of tasks; track i; let i = $index) {
          <li class="task-item" [class.completed]="t.done" style="animation-delay: {{i * 0.05}}s">
            <button 
              class="check-btn" 
              [class.checked]="t.done"
              (click)="toggleTask(i)" 
              aria-label="Mark as done">
              @if (t.done) {
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              }
            </button>
            <span class="task-text">{{ t.text || t }}</span>
            <button class="delete-btn" (click)="deleteTask(i)" aria-label="Delete">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
            </button>
          </li>
        }
        @if (tasks.length === 0) {
          <div class="empty-state">
            <p>No tasks left! You're all caught up 🎉</p>
          </div>
        }
      </ul>
    </div>
  `,
})
export class TodoComponent implements OnInit {
  task = '';
  tasks: TodoItem[] = [];

  ngOnInit() {
    const savedTasks = localStorage.getItem('todo-tasks');
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        // Handle migration from string[] to TodoItem[]
        this.tasks = parsed.map((item: any) => 
          typeof item === 'string' ? { text: item, done: false } : item
        );
      } catch (e) {
        console.error('Error parsing tasks from local storage', e);
      }
    }
  }

  saveTasks() {
    localStorage.setItem('todo-tasks', JSON.stringify(this.tasks));
  }

  addTask() {
    if (this.task.trim()) {
      this.tasks.push({ text: this.task, done: false });
      this.task = '';
      this.saveTasks();
    }
  }

  toggleTask(index: number) {
    this.tasks[index].done = !this.tasks[index].done;
    this.saveTasks();
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }
}