// BUDGET CONTROLLER
var budgetController = (function(){



})();


// UI CONTROLLER
var UIController = (function(){



})();

//GLOBAL APP CONTROLLER
 var controller = (function(budgetCtrl, UICtrl){

    var ctrlAddItem = (function(){
      // Get the filled input data
      // add the item to the budget controller
      // add the item to the ui
      // calculate the budget
      // display the budget on the ui

      console.log('yoooooos');
    })

   document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

   document.addEventListener('keypress', function(e){
     if (e.keyCode === 13 || e.which === 13) {
       ctrlAddItem();
     }
   });

 })(budgetController, UIController);




























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
