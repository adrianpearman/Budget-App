// BUDGET CONTROLLER
var budgetController = (function(){

  var Expense = function(id,description,value){
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id,description,value){
    this.id = id;
    this.description = description;
    this.value = value;
  };


  var data = {
    allItems:{
      allExpenses = [],
      allIncomes = []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  }

})();


// UI CONTROLLER
var UIController = (function(){
    var DOMstrings = {
      inputType: '.add__type',
      inputDescription: '.add__description',
      inputValue: '.add__value',
      inputButton: '.add__btn'
    }
  return{
    getinput: function(){
      return{
      type: document.querySelector(DOMstrings.inputType).value, //  will be either inc or exp
      description: document.querySelector(DOMstrings.inputDescription).value,
      value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMstrings: function(){
      return DOMstrings;
    }
  }

})();

//GLOBAL APP CONTROLLER
 var controller = (function(budgetCtrl, UICtrl){

   var setupEventListeners = function(){
     var DOM = UICtrl.getDOMstrings();

     document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

     document.addEventListener('keypress', function(e){
       if (e.keyCode === 13 || event.which === 13) {
         ctrlAddItem();
       }
     })
   }


    var ctrlAddItem = function(){
      // Get the filled input data
      var input = UICtrl.getinput();
      // add the item to the budget controller
      // add the item to the ui
      // calculate the budget
      // display the budget on the ui

    }

    return{
      init: function(){
        console.log('apppp started');
        setupEventListeners();
      }
    }

 })(budgetController, UIController);

controller.init();


























// var budgetController = (function(){
//   var x = 23
//
//   var add = function(a){
//     return x + a
//   }
//   return {
//     publicTest: function(b){
//       // console.log(add(b));
//       return add(b);
//   }
// }
// })();
//
// var UIController = (function(){
//
//
//
// })();
//
//  var controller = (function(budgetCtrl, UICtrl){
//
//    var z = budgetCtrl.publicTest(5);
//
//    return{
//      anotherPublic: function(){
//        console.log(z);
//      }
//    }
//
//  })(budgetController, UIController);
