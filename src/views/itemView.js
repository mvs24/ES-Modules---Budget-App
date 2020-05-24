import { elements } from "./base";

export const getItem = () => {
  const type = elements.addType.value;
  const description = elements.addDescription.value;
  const value = elements.addValue.value;

  return {
    type,
    description,
    value,
  };
};

export const renderItem = (item) => {
  const markup = `
        <div class="item clearfix" id="${
          item.type === "inc" ? "income" : "expense"
        }-${item.id}">
            <div class="item__description">${item.description}</div>
            <div class="right clearfix">
                <div class="item__value">${
                  item.type === "inc" ? "+" : "-"
                } ${+item.value}</div>
                ${
                  item.type === "inc"
                    ? ""
                    : '<div class="item__percentage"></div>'
                }
                <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>
    `;

  if (item.type === "inc") {
    elements.incomeList.insertAdjacentHTML("afterbegin", markup);
  } else {
    elements.expenseList.insertAdjacentHTML("afterbegin", markup);
  }
};

export const updateTotal = (total) => {
  elements.budgetValue.innerText = total;
};

export const updateTotalExpenses = (exp) => {
  elements.budgetExpense.innerText = exp;
};

export const updateTotalIncomes = (inc) => {
  elements.budgetIncome.innerText = inc;
};

export const updateExpensePercentage = (percentage) => {
  if (percentage === -1) {
    elements.budgetExpensePercentage.innerText = "---";
  } else {
    elements.budgetExpensePercentage.innerText =
      (percentage * 100).toFixed(2) + "%";
  }
};

export const updateExpenseItemsPercentage = (totalIncomes, expenses) => {
  expenses.forEach((el) => {
    document.querySelector(
      `#expense-${el.id} `
    ).children[1].children[1].innerText = ` ${(
      ((el.value * 1) / totalIncomes) *
      100
    ).toFixed(2)}%`;
  });
};

export const removeItem = (el) => {
  el.parentElement.removeChild(el);
};
