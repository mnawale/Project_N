import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

import { first } from 'rxjs/operators';

import { UserBudget } from 'src/app/models/User_budget';

import { AuthService } from 'src/app/services/auth.service';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.scss'],
})
export class CreateBudgetComponent implements OnInit {
  @ViewChild('formDirective') formDirective: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();

  form: FormGroup;

  isOpen = false;

  constructor(
    private authService: AuthService,
    private budgetService: BudgetService
  ) {}

  ngOnInit(): void {
    this.form = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      value: new FormControl('', [
        Validators.required,

      ]),
      month: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      tags: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onSubmit(formData: Pick<UserBudget, 'title' | 'value' | 'month' | 'tags'>): void {
    this.budgetService
      .addBudgets(formData, this.authService.userId)
      .pipe(first())
      .subscribe(() => {
        this.create.emit(null);
      });
    this.form.reset();
    this.formDirective.resetForm();
  }
}
