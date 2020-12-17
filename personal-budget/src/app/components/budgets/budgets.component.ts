import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { BudgetService } from 'src/app/services/budget.service';
import { AuthService } from 'src/app/services/auth.service';

import { UserBudget } from 'src/app/models/User_budget';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss'],
})
export class BudgetsComponent implements OnInit {
  budgets$: Observable<UserBudget[]>;
  userId: Pick<User, 'id'>;

  constructor(
    private budgetService: BudgetService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.budgets$ = this.fetchAll();
    this.userId = this.authService.userId;
  }

  fetchAll(): Observable<UserBudget[]> {
    return this.budgetService.fetchAll();
  }

  addBudgets(): void {
    this.budgets$ = this.fetchAll();
  }

  delete(budgetId: Pick<UserBudget, 'id'>): void {
    this.budgetService
      .deleteBudget(budgetId)
      .subscribe(() => (this.budgets$ = this.fetchAll()));
  }
}
