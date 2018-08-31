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

  return {
    testing: function() {
      
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
    // 1. Get field input data

    // 2. Add the item to the budget controller

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