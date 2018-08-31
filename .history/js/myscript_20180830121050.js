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
  var Expense, Income, data;

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

  data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  }
  
  return {
    
    // We will use function constructor to create new object
    addItem: function(type, des, val) {
      var newItem;
      if(type === 'exp') {
        newItem = Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = Income(ID, des, val);
      }

      data.allItems[type].push(newItem);

      return newItem;
    },

    testing: function() {
      console.log(data);
    }


  }

})();

//////////////////////////////////////////
// UI CONTROLLER

var UIController = (function(){

  var DOMstrings = {
    inputType: '.input__type',
    inputDescription: '.input__description',
    inputValue: '.input__value',
    inputBtn: '.add__btn'
  }

  return {

    getInput: function(){

      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
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
 
  var setupEventListeners = function() {
    var DOM;
    // access to our class strings object
    DOM = UICtrl.getDOMstrings();
    
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', function(e) {
      // we are checking if enter was pressed and then execute function
      if(e.keyCode === 13 || e.which === 13) {

        ctrlAddItem();
        // add input function go here 
        console.log('enter was pressed');
      }
    });

  }

  var ctrlAddItem = function() {

    console.log('ctrlAddItem is working');
    var input, item;
    // 1. Get field input data

    input = UICtrl.getInput();
    
    // 2. Add the item to the budget controller
    item = budgetCtrl.addItem(input.type, input.description, input.value);
    // 3. Add the item to the UI

    // 4. Clear the fields 

    // 5. Calculate budget

    // 6. Display the budget on the UI
  }

  return {
    init: function() {
      console.log('Application has started');
      setupEventListeners()
    }
  }

})(budgetController, UIController);

controller.init();