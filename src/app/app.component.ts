import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

import { Todo } from './../model/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  todos: Todo[] = [
    {
      id: uuidv4(),
      description: 'My task number 1'
    },
    {
      id: uuidv4(),
      description: 'My task number 2'
    },
    {
      id: uuidv4(),
      description: 'My task number 3'
    },
    {
      id: uuidv4(),
      description: 'My task number 4'
    }
  ];

  form: FormGroup;

  todosDescriptionCtrl: FormControl;

  trackById(index: number, todo: Todo): string {
    return todo.id;
  }

  ngOnInit(): void {

    this.todosDescriptionCtrl = new FormControl('', Validators.required);

    this.form = new FormGroup({
      todoDescription: this.todosDescriptionCtrl
    });
  }

  onAddTodo(): void {

    const newTodo = {
      id: uuidv4(),
      description: this.todosDescriptionCtrl.value
    };

    this.todos = [newTodo, ...this.todos];
    this.todosDescriptionCtrl.setValue('');
  }
}
