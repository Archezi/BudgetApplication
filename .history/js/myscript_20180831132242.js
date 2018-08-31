///////////////////////////////////////
/**
  1. Add event handler 
  2. Get input values
  3. Add the new item to our data structure
  4. Add the new item to the UI
  5. Calculate budget
  6. Update the UI
*/

//////////////////////////////////////////
// BUDGET CONTROLLER

var budgetController = (function(){
  var Expense, Income, data, calculateTotal;

  Expense = function(id, description, value) {
    this.id = id;
    this.description= description;
    this.value = value;
  }
  Income = function(id, description, value) {
    this.id = id;
    this.description= description;
    this.value = value;
  }



  calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
      data.totals[type] = sum;
    })
  }

  data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  }
  
  return {
    
    // We will use function constructor to create new object
    addItem: function(type, des, val) {
      var newItem, ID;

      if(data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
            
      //Create new item based on 'inc' or 'exp' type
      if(type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      data.allItems[type].push(newItem);

      return newItem;
    },

    calculateBudget: function() {

      // calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');

      // calculate the budget: income - expenses

      data.budget = data.totals.inc - data.totals.exp;
      // calculate the percentage of income that we spend
      if(data.totals.inc > 0){
        data.percentage =Math.round( (data.totals.exp / data.totals.inc) * 100 );
      } else {
        data.percentage = -1;
      }
      
    },
    getBudget: function() {

      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }

    },
    testing: function() {
      console.log(data);
    }


  }

})();

//////////////////////////////////////////
// UI CONTROLLER

var UIController = (function(){

  // list of classes used to DOM manipulation and reading inputs
  var DOMstrings = {
    inputType: '.input__type',
    inputDescription: '.input__description',
    inputValue: '.input__value',
    inputBtn: '.add__btn',
    incomeContainer: '.history__income-container',
    expenseContainer: '.history__expense-container',
    totalFoundsLabel: '.total-funds',
    totalIncomeLabel: '.total__income-funds',
    totalExpenseLabel: '.total__expenses-funds',
    totalExpensePercentage: '.total__expenses-percentage',
    historyContainer: '.history-panel'
    
  }

  return {

    getInput: function(){ 

      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      }

    },

    addListItem: function(obj, type) {

      var html, newHtml, element;

      
      // 1. Create HTML string with placeholder text
      if( type === 'inc') {

        element = DOMstrings.incomeContainer; 
        html = '<div class="list-item" id="income-%id%"><div class="item__description">%description%</div><div class="right"><div class="item__value item__value-income">&euro; %value%</div><div class="item__delete"><button type="button" class="item__delete--btn  "><svg style="width:18px;height:18px" viewBox="0 0 24 24"><path fill="#000000" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" /></svg></button></div></div></div>'
      } else if (type === 'exp') {

        element = DOMstrings.expenseContainer;
        html = '<div class="list-item" id="%id%"><div class="item__description">%description%</div><div class="right"><div class="item__value item__value-expense">&euro; %value%</div><div class="item__delete"><button type="button" class="item__delete--btn  "><svg style="width:18px;height:18px" viewBox="0 0 24 24"><path fill="#000000" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" /></svg></button></div></div></div>'
      }

      // 2. Replace the placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      // because we already replace html with newHtml we will have to update now newHtml to further update our initial html
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // 3. Insert the HTML into the DOM before end of the div
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

    },
    clearFields: function() {
      var fields;

      fields = document.querySelectorAll(DOMstrings.inputDescription + ' , ' + DOMstrings.inputValue);

      fieldsArray = Array.prototype.slice.call(fields);
      // we are setting and empty array for each element of the array using forEach method
      fieldsArray.forEach(function(current, index, array){
        
        current.value = "";
      });

      //set focus to our first input cell in this situation thats description input
      fieldsArray[0].focus();
    },
    displayBudget: function(obj){

      // lest grab our data from displayBudget(budget);
      document.querySelector(DOMstrings.totalFoundsLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.totalIncomeLabel).textContent =  obj.totalInc;
      document.querySelector(DOMstrings.totalExpenseLabel).textContent =  obj.totalExp;

      // test if percentage is greater than 0 to eliminate result infinity when divide by 0
      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.totalExpensePercentage).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMstrings.totalExpensePercentage).textContent = '---';
      }

    },
    getDOMstrings: function() {
      return DOMstrings;
    }
  }


})();


//////////////////////////////////////////
// APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {
 
  // we are setting up our event listeners 
  var setupEventListeners = function() {
    var DOM;
    // access to our class strings object
    DOM = UICtrl.getDOMstrings();
    // click event
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    // key press event
    document.addEventListener('keypress', function(e) {
      // we are checking if enter was pressed and then execute function
      if(e.keyCode === 13 || e.which === 13) {
        ctrlAddItem(); 
      }
    });

    document.querySelector(DOM.historyContainer).addEventListener('click', ctrlDeleteItem)

  }

  var updateBudget = function() {
    var budget;
    // 1. Calculate budget
    budgetCtrl.calculateBudget();
    // 2. Return budget
    budget = budgetCtrl.getBudget();
    // 3. Display the budget on the UI
    console.log(budget);
    UICtrl.displayBudget(budget); 

  }

  var ctrlAddItem = function() {

    console.log('ctrlAddItem is working');
    var input, newItem;
    // 1. Get field input data

    input = UICtrl.getInput();
    if(input.description !== "" && !isNaN(input.value) && input.value > 0 ){
      
      // 2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      // 3. Add the item to the UI
      UICtrl.addListItem(newItem, input.type);  // addListItem: function(obj, type)
      // 4. Clear the fields 
      UICtrl.clearFields();
      
      // 5. Calculate and update budget
      updateBudget();
    } else {
      
    }  
  }
  var ctrlDeleteItem = function(event) {

    console.log(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.id);
  }

  return {
    init: function() {
      console.log('Application has started');
      setupEventListeners()
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
    }
  }

})(budgetController, UIController);

controller.init();