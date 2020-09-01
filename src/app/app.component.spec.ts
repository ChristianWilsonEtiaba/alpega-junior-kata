import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { Todo } from './../model/todo';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => tearUp()));

  describe('should create', () => {

    it('h1 title', () => {

      const h1 = fixture.debugElement.query(By.css('h1'));

      expect(h1.nativeElement.innerHTML.trim()).toBe('My TODOs');
    });

    it('input text', () => {

      const inputs = fixture.debugElement.queryAll(By.css('input'));

      expect(inputs.length).toBe(1);
    });

    it('submit button', () => {

      const submitButtons = fixture.debugElement.queryAll(By.css('button[type="submit"]'));

      expect(submitButtons.length).toBe(1);
    });

    it('delete button for each todo', () => {

      const buttons = fixture.debugElement.queryAll(By.css('button[type="button"]'));

      expect(buttons.length).toBe(component.todos.length);
    });
  });

  describe('should define', () => {

    it('a todo list', () => {
      expect(component.todos).toBeDefined();
    });
  });

  describe('on init should', () => {

    beforeEach(() => component.ngOnInit());

    it('create a todoDescription formControl', () => {
      expect(component.todosDescriptionCtrl).toBeDefined();
    });

    it('create a form group', () => {
      expect(component.form).toBeDefined();
    });

    it('add the todoDescription formControl into the form group', () => {
      expect(component.form.get('todoDescription')).toBeDefined();
    });
  });

  it('should define the trackById method that returns the todoId', () => {

    const index = 0;
    const todo: Todo = {
      id: '1',
      description: 'todo 1'
    };
    const idForTracking = component.trackById(index, todo);

    expect(idForTracking).toBe(todo.id);
  });

  describe('should allow users to', () => {

    it('add a new todo item', () => {

      const todoDescription = 'a description';

      component.ngOnInit();

      component.todosDescriptionCtrl.setValue(todoDescription);

      fixture.detectChanges();

      const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

      submitButton.click();

      const newTodo = component.todos.find(todo => todo.description === todoDescription);

      expect(newTodo).toBeDefined();
    });
  });

  function tearUp() {

    configureTestingModule();
    initPropertiesForTest();
    fixture.detectChanges();
  }

  function configureTestingModule() {

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }

  function initPropertiesForTest() {

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }
});
