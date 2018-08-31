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
    inputBtn: '.add__btn',
    incomeContainer: '.history__income-container',
    expenseContainer: '.history__expense-container'
  }

  return {

    getInput: function(){

      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      }

    },

    addListItem: function(obj, type) {

      var html, newHtml, element;

      

      if( type === 'inc') {

        element = DOMstrings.income
        html = '<div class="list-item" id="income-%id%"><div class="item__description">%description%</div><div class="right"><div class="item__value">%value%</div><div class="item__delete"><button type="button" class="item__delete--btn  "><svg style="width:12px;height:12px" viewBox="0 0 24 24"><path fill="#000000" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" /></svg></button></div></div></div>'
      } else if (type === 'exp') {
         html = '<div class="list-item" id="%id%"><div class="item__description">%description%</div><div class="right"><div class="item__value">%value%</div><div class="item__delete"><button type="button" class="item__delete--btn  "><svg style="width:12px;height:12px" viewBox="0 0 24 24"><path fill="#000000" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" /></svg></button></div></div></div>'
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
    var input, newItem;
    // 1. Get field input data

    input = UICtrl.getInput();
    
    // 2. Add the item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
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