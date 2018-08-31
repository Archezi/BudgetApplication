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
    inputType: 'input__type',
    inputDescription: 'input__description',
    inputValue: 'input__value',
    inputBtn: 'add__btn'
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
    
    // access to our class strings object
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', function() {
      console.log('press');
    });
  }

  return {
    init: function() {
      console.log('Application has started');
      setupEventListeners()
    }
  }

})(budgetController, UIController);

controller.init();