import Item from "./models/itemModel";
import { elements } from "./views/base";
import * as itemViews from "./views/itemView";

const state = {
  expenses: [],
  incomes: [],
  totalExpenses: 0,
  totalIncomes: 0,
  total: 0,
};

const controlItem = () => {
  const itemValues = itemViews.getItem();

  let item;
  if (itemValues.type === "exp") {
    item = new Item(itemValues.type, itemValues.description, itemValues.value);
    state.expenses.unshift(item);
    state.totalExpenses += +item.value;
    state.total -= +item.value;
  } else {
    item = new Item(itemValues.type, itemValues.description, itemValues.value);
    state.incomes.unshift(item);
    state.totalIncomes += +item.value;
    state.total += +item.value;
  }

  itemViews.renderItem(item);
  itemViews.updateTotal(state.total);
  itemViews.updateTotalExpenses(state.totalExpenses);
  itemViews.updateTotalIncomes(state.totalIncomes);

  let percentage = state.totalExpenses / state.totalIncomes;
  if (state.totalIncomes === 0) {
    percentage = -1;
  }
  itemViews.updateExpensePercentage(percentage);
  itemViews.updateExpenseItemsPercentage(state.totalIncomes, state.expenses);
};

const removeIncomeItem = (el) => {
  const incomeId = el.getAttribute("id");
  const id = incomeId.split("-")[1];

  const itemToRemove = state.incomes.find((el) => el.id === id);
  const updatedIncomes = state.incomes.filter((item) => item.id !== id);

  state.incomes = updatedIncomes;
  state.totalIncomes -= +itemToRemove.value;
  state.total -= +itemToRemove.value;

  const incomeEl = document.getElementById(incomeId);
  itemViews.removeItem(incomeEl);

  itemViews.updateTotal(state.total);
  itemViews.updateTotalIncomes(state.totalIncomes);

  let percentage = state.totalExpenses / state.totalIncomes;
  if (state.totalIncomes === 0) {
    percentage = -1;
  }

  itemViews.updateExpensePercentage(percentage);
  itemViews.updateExpenseItemsPercentage(state.totalIncomes, state.expenses);
};

const removeExpenseItem = (el) => {
  const expenseId = el.getAttribute("id");
  const id = expenseId.split("-")[1];

  const itemToRemove = state.expenses.find((el) => el.id === id);
  const updatedExpenses = state.expenses.filter((item) => item.id !== id);

  state.expenses = updatedExpenses;
  state.totalExpenses -= +itemToRemove.value;
  state.total += +itemToRemove.value;

  const expenseEl = document.getElementById(expenseId);
  itemViews.removeItem(expenseEl);

  itemViews.updateTotal(state.total);
  itemViews.updateTotalExpenses(state.totalExpenses);

  let percentage = state.totalExpenses / state.totalIncomes;
  if (state.totalIncomes === 0) {
    percentage = -1;
  }

  itemViews.updateExpensePercentage(percentage);
  itemViews.updateExpenseItemsPercentage(state.totalIncomes, state.expenses);
};

elements.addBtn.addEventListener("click", () => {
  controlItem();
});

elements.incomeList.addEventListener("click", (e) => {
  if (e.target.closest(".item__delete--btn")) {
    removeIncomeItem(
      e.target.parentElement.parentElement.parentElement.parentElement
    );
  }
});

elements.expenseList.addEventListener("click", (e) => {
  if (e.target.closest(".item__delete--btn")) {
    removeExpenseItem(
      e.target.parentElement.parentElement.parentElement.parentElement
    );
  }
});
