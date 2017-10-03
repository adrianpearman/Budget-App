// 'use strict'
// BUDGET CONTROLLER
var budgetController =(function(){
  var Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1
  }

  Expense.prototype.calculatePercentages = function(totalIncome){
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value /totalIncome)*100)
    }else {
      this.percentage = -1
    }
  }

  Expense.prototype.getPercentage = function(){
    return this.percentage
  }

  var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value
  }

  var calculateTotal = function(type){
    var sum = 0;
    data.allItems[type].forEach(function(current){
      sum += current.value
    })
    data.totals[type] = sum
  }

  var data = {
    allItems:{
      exp: [],
      inc: []
    },
    totals:{
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  }

  return{
    addItem: function(type, des, val){
      var newItem, ID;
      // Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length-1].id+1
      }else{
        ID = 0
      }
      // Create new item based of inc or exp
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      }else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }
      // Place new value into Array
      data.allItems[type].push(newItem)
      // Return the new element
      return newItem
    },

    deleteItem: function(type, id){
      var index, ids
      ids = data.allItems[type].map(function(current){
        return current.id
      })
      index = ids.indexOf(id)
      // Deletes the matching array value beginning at index and ending at it's own id
      if (index !== 1) {
        data.allItems[type].splice(index, 1)
      }
    },

    calculateBudget: function(){
      // Calculate the total budget
      calculateTotal('exp')
      calculateTotal('inc')
      // Calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp
      // Calaculate the percentage
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100)
      }else {
        data.percentage = -1
      }
    },

    calculatePercentages: function(){
      data.allItems.exp.forEach(function(cur){
        cur.calculatePercentages(data.totals.inc)
      })
    },

    getPercentage: function(){
      var allPercent = data.allItems.exp.map(function(cur){
        return cur.getPercentage()
      })
      return allPercent
    },

    getBudget: function(){
        return{
          budget: data.budget,
          totalIncome: data.totals.inc,
          totalExpenses: data.totals.exp,
          percentage: data.percentage
        }
    },
      testing: function(){
        console.log(data)
    }
  }
})();

// UI CONTROLLER
var UIController = (function(){
  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expenseLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expPercentLabel: '.item__percentage',
    dateLabel: '.budget__title--month'
  }

  var formatNumber = function(num, type){
    // This function formats the number to always have 2 fixed decimal points
    var numSplit, int, dec, type

    num = Math.abs(num)
    num = num.toFixed(2)
    numSplit = num.split('.')
    int = numSplit[0]
    if (int.length > 3) {
    // 2000 would be outputted as 2,000.00
      int = int.substr(0,int.length-3)+','+int.substr(int.length-3,int.length)
    }
    dec=numSplit[1]
    return (type === 'exp' ?  '-' : '+') + ' ' + int + '.' + dec
  }

  // this function will loop through the list and each iteration will be executed
  var nodeListForEach = function(list, callback){
      for (var i = 0; i < list.length; i++) {
        callback(list[i], i)
      }
  }

  return{
    getInput: function(){
      return{
        type:  document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
      }
    },

    addListItem: function(obj, type){
      var HTML, newHTML, element
      // create html string with placeholders
      if (type === 'inc') {
        element = DOMStrings.incomeContainer;
        HTML = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }else if (type === 'exp') {
        element = DOMStrings.expenseContainer;
        HTML = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
      }
      // replace the placeholder text with actual data
      newHTML = HTML.replace('%id%', obj.id)
      newHTML = newHTML.replace('%description%', obj.description)
      newHTML = newHTML.replace('%value%', formatNumber(obj.value, type))
      // insert the data into the dom
      document.querySelector(element).insertAdjacentHTML('beforeend', newHTML)
    },

    deleteListItem: function(selectorID){
      var element = document.getElementById(selectorID)
      element.parentNode.removeChild(element)
    },

    getDOMStrings: function(){
      return DOMStrings
    },

    clearFields: function(){
      var fields, fieldsArr
      fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue)
      // due to the way the data is stored, converting all the values into array with this method will clear out the input fields
      fieldsArr = Array.prototype.slice.call(fields)
      fieldsArr.forEach(function(current, index, array){
        current.value = ""
      })
      fieldsArr[0].focus()
    },

    displayBudget: function(obj){
      var type
      obj.budget > 0 ? type = 'inc' : type = 'exp'
      document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type)
      document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalIncome, 'inc')
      document.querySelector(DOMStrings.expenseLabel).textContent = formatNumber(obj.totalExpenses, 'exp')
      if (obj.percentage > 0) {
        document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%'
      }else {
        document.querySelector(DOMStrings.percentageLabel).textContent = '---'
      }
    },

    displayPercentages: function(percentages){
      var fields = document.querySelectorAll(DOMStrings.expPercentLabel)


      nodeListForEach(fields, function(current, index){
        if (percentages[index] > 0) {
          current.textContent = percentages[index] + '%'
        }else {
          current.textContent = '---'
        }
      })
    },

    displayDate: function(){
        var now, year, month, calendar
        now = new Date()
        calendar = ['January','February', 'March','April','May','June','July','August','September','October','November','December']
        month = now.getMonth()
        year = now.getFullYear()
        document.querySelector(DOMStrings.dateLabel).textContent = calendar[month] + ' ' + year
    },

    changeType: function(){
      var fields = document.querySelectorAll(
        DOMStrings.inputType+ ',' +
        DOMStrings.inputDescription+ ',' +
        DOMStrings.inputValue
      )
      nodeListForEach(fields, function(current){
        current.classList.toggle('red-focus')
      })

      document.querySelector(DOMStrings.inputButton).classList.toggle('red')
    }

  }
})();


// GLOBAL CONTROLLER
var controller = (function(budgetCtrl, UICtrl){

  var setEventListeners = function(){
    var DOM = UIController.getDOMStrings();
    // Submits the inputted value on either a 'click' or 'enter'
    document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem)
    document.addEventListener('keypress', function(e){
      if (e.keycode === 13 || e.which === 13) {
          ctrlAddItem()
      }
    })
    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem)
    document.querySelector(DOM.inputType).addEventListener('change', UIController.changeType)
  }

  var updateBudget = function(){
    // 1 - Calculate the Budget
    budgetController.calculateBudget()
    // 2 - Return the Budget
    var budget = budgetController.getBudget()
    // 3 - Display the Budget to the UI
    UIController.displayBudget(budget)
  }

  var updatePercentages = function(){
    // 1 - Calculate percentages
    budgetController.calculatePercentages()
    // 2 - Read percentages from the budget controller
    var percentages = budgetController.getPercentage()
    // 3 - Update the UI with the new percentages
    UIController.displayPercentages(percentages)
    // console.log(percentages);
  }

  var ctrlAddItem = function(){
    var input, newItem
    // 1 - Get the filed input data
    input = UICtrl.getInput();
    // console.log(input);
    // Validations to prevent unwanted values added to the database
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
        // 2 - Add the item to the budget controller
        newItem = budgetController.addItem(input.type, input.description, input.value)
        // 3 - Add the Item to the UI
        UICtrl.addListItem(newItem, input.type)
        // 4 - Clear the fields
        UICtrl.clearFields()
        // 5 - Update the Budget
        updateBudget()
        // 6 - Calculate and update percentages
        updatePercentages()
      }
  }

  var ctrlDeleteItem = function(e){
    var itemID

    itemID = e.target.parentNode.parentNode.parentNode.parentNode.id

    if (itemID) {
      var splitID, type, ID

      splitID = itemID.split('-')
      type = splitID[0]
      ID = parseInt(splitID[1])

      // 1 - Delete Item from the Data structure
      budgetController.deleteItem(type, ID)
      // 2 - Delete the Item from the UI
      UIController.deleteListItem(itemID)
      // 3 - Update and Show the new budget
      updateBudget()
    }
  }

  return{
    init: function(){
      setEventListeners()
      console.log('Application Started')
      UIController.displayDate()
      UIController.displayBudget({
        budget: 0,
        totalIncome: 0,
        totalExpenses: 0,
        percentage: -1
      })
    }
  }

})(budgetController, UIController);

controller.init()
