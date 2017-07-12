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
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return{
    addItem: function(type, des, val){
      var newItem

      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length-1].id+1;
      }else{
        ID = 0;
      }

      // Create new item based on value
      if (type === 'exp'){
        newItem = new Expense(ID, des, val);
      }else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      // Push value into our data structure.
      data.allItems[type].push(newItem);

      // Return new Object
      return newItem;
    },
    testing: function(){
      console.log(data);
    }
  }

})();


// UI CONTROLLER
var UIController = (function(){
    var DOMstrings = {
      inputType: '.add__type',
      inputDescription: '.add__description',
      inputValue: '.add__value',
      inputButton: '.add__btn',
      incomeContainer: '.income__list',
      expensesContainer: '.expenses__list'
    }
  return{
    getinput: function(){
      return{
      type: document.querySelector(DOMstrings.inputType).value, //  will be either inc or exp
      description: document.querySelector(DOMstrings.inputDescription).value,
      value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    addListItem: function(obj, type){
      var html, newHTML, element
      // Create HTML string with placeholder text
      if (type === 'inc') {
        element = DOMstrings.incomeContainer
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }

      // Replace the placeholder text with some actual data

      newHTML = html.replace('%id%', obj.id);
      newHTML = newHTML.replace('%description%', obj.description);
      newHTML = newHTML.replace('%value%', obj.value);

      // insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHTML)
    },
    clearFields: function(){
      var fields, fieldsArr;

      fields = document.querySelectorAll(DOMstrings.inputDescription+ ', '+ DOMstrings.inputValue)

      // Returns an array of the fields values
      fieldsArr = Array.prototype.slice.call(fields)

      fieldsArr.forEach(function(current, index, array) {
        current.value = "";
      })

      fieldsArr[0].focus()
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
      var input, newItem;
      // Get the filled input data
      input = UICtrl.getinput();
      // add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      // add the item to the ui
      UICtrl.addListItem(newItem, input.type)
      //  clear the fields
      UICtrl.clearFields()
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
