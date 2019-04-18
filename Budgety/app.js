// USE IIFE so put () 
// Try not to expose data
// This is how to make a module
// The secret of the module pattern is that it returns an object containing
// all of the functions that we want to make public


// =======================  Calculation Budget Controller  ==========================================
var budgetContoroller = (function() {
    
    // we choose to create an object through the expense function constructor
    // because there will be a lot of expenses
    
    // Expense object constructor
  var Expense = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
      this.percentage = -1;
  };
    
  Expense.prototype.calcPercentage = function(totalIncome) {
      if (totalIncome > 0) {
        this.percentage = Math.round((this.value / totalIncome) * 100)
      } else {
          this.percentage = -1;
      }
  };
    
  Expense.prototype.getPercentage = function() {
      return this.percentage;
  };
    
    // Income object constructor
  var Income = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
  };

    // Data Structure for sotring expense and income instances -> array
    // Data is an object which has property allItems and totals
    // attribute with {} is an object which has more than one different type data
  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0, 
      inc: 0
    }, 
    budget:0,
    percentage: -1
  };
    
    
  var calculateTotal = function (type) {
      var sum = 0;
      data.allItems[type].forEach(function(cur) {
          sum += cur.value;
      });
      
      data.totals[type] = sum;
      
  };
    
    // Public 
  return {
    addItem: function(type, des, val) {
      var newItem, ID;
            
        // ID = lastID + 1
        // Create new ID
        if (data.allItems[type].length > 0) {
          ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        } else {
          ID = 0;
        }
            
            
        // Create new item based on 'inc' or 'exp' type
        if (type === 'exp') {
            newItem = new Expense(ID, des, val);
        } else if (type === 'inc') {
            newItem = new Income(ID, des, val);
        } 
            
        // Push it into our data structure
        data.allItems[type].push(newItem);
            
        // Return the new element
        return newItem;
    },
      
    deleteItem: function(type, id) {
        var ids, index;
        
        // map also receives a function as arg 
        // the difference between map and forEach is that map returns brand new array
        // current is each element of original array 
        ids = data.allItems[type].map(function(current) {
           return current.id; 
        });
        
        index = ids.indexOf(id);
        
        if (index !== -1) {
            // splice is the method for deleting element
            // 1st arg is start position and 2nd arg is number of elements you want to delete
            data.allItems[type].splice(index,1);
        }       
    },
      
    calculateBudget: function() {
        
        // calculate total income and expenses
        calculateTotal('exp');
        calculateTotal('inc');
        
        // calculate the budget income - expenses
        data.budget = data.totals.inc - data.totals.exp;
        // calculate the percentage of income that we spent
        if (data.totals.inc > 0) {
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
        } else {
            data.percentage = -1;
        }
        
    },
      
      
    calculatePercentages: function() {
        data.allItems.exp.forEach(function(cur) {
            cur.calcPercentage(data.totals.inc);
        });
        
    },
      
    getPercentages: function() {
        var allPercentages = data.allItems.exp.map(function(cur) {
            return cur.getPercentage();
        });
        
        return allPercentages;
    },
      
      // getter object 
    getBudget: function () {
        // we are returning an object
        return {
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.percentage
        };
    }
      
  };
    
})();


// ==========================  UI Controller  ==============================================

var UIController = (function() {
    // Basically interacting with HTML file
    // we really don't want to deal with string when passing a name of a class from HTML
    // SO we can make an object that can hold all class names here
    // then whenever we make some change, we don't need to change it every place
    // because we use variable 
    // Be aware of using css style DOM here such as . for class in HTML
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };
    
    var formatNumber = function(num, type) {
            var numSplit, int, dec;
            /*
            1. + or - before number
            2. exactly 2 decimal points
            
            ex) 2310.4567 -> + 2,310.46
                2000 -> 2,000.00
            */
            
            num = Math.abs(num);
            num = num.toFixed(2); // toFixed() is number prototype method returns string type
            
            // numSplit has integer part and decimal part as an array
            numSplit = num.split('.');
            int = numSplit[0];
            if (int.length > 3) {
                int = int.substr(0,int.length - 3) + ',' + int.substr(int.length - 3, 3); 
                // input 2310, output 2,310
            }
            
            
            dec = numSplit[1];
            
            return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
        };
    
      var nodeListForEach = function(list, callback) {
                for (var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            };
            
    
    
    // inside of return is the object (public access) 
    // controller calls this method 
    return {
        // getterInput
        getInput: function() {
            return { // returning object 
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc(+) or exp(-)
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        }, 
        
        addListItem: function(obj, type) {
            var html, newHtml,element;
            // 1.Create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp'){
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // 2.Replace the placeholder text with some actual data
            // Creating new HTML element here
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%',formatNumber(obj.value, type));
            
            // 3.Insert the HTML into the DOM by using insertAdjacentHTML() method
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        }, 
        
        deleteListItem: function (selectorID) {
            // we can only remove child element from its parent
            var el = document.getElementById(selectorID); // child element we want to delete
            el.parentNode.removeChild(el) // removing child element from parent
        },
        
        clearFields: function() {
            var fields, fieldsArr;
            
            // querySelectorAll returns a node list object not an array
            // although we can iterate through a node list by for loop, we cannot use 
            // useful built-in method of array because it's not array
            // so we change it to an array
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            
            // Array.prototype.slice is the slice function for arrays, and call runs the function with this set to arguments.
            fieldsArr = Array.prototype.slice.call(fields);
            
            // loop through and assign "" to delete the previous input
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });
            
            // cursor goes back to description space on UI
            fieldsArr[0].focus();
        },
        
        displayBudeget: function(obj) {
            obj.budget >= 0 ? type = 'inc' : type = 'exp';
            
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget,type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc,'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage;
            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                // we don't wanna show any number when percentage cannot be worked 
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },
        
        displayPercentages: function(percentages) {
            
            // again, querySelectorAll() returns list of nodes
            // in a DOM tree, where all of the html elements of our html file
            // each element is called a node
            var fields = document.querySelectorAll(DOMstrings.expensesPercentageLabel);
            
            // power of first class function
            
            nodeListForEach(fields, function(current, index) {
                
                // DO STAFF
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = percentages[index] + '---';
                }
            });
        },
        
        displayMonth: function () {
            var now, year, months;
            now = new Date();
            
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            year = now.getFullYear();
            
            document.querySelector(DOMstrings.dateLabel).textContent = months[month - 1] + ' ' + year;
        },
        
        changeType: function() {
            
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue);
            
            nodeListForEach(fields, function(current) {
                current.classList.toggle('red-focus');
            })
            
            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },
        
        getDOMstrings: function() {
            return DOMstrings; // exposing DOMstrings object
        }
    };
})();


// Of course, module can receive arguments and can be passed 
// so each module independtly exists, if we pass modules into modules, then 
// we can link one with another.

// ==========================  Global App Controller  ==============================================
var controller = (function(budgetCtrl, UICtrl) {
    
    // PRIVATE: 
    
    var setupEventListener = function() {
        var DOM = UICtrl.getDOMstrings();// now we can access DOMstrings by using DOM variable 
        
        // Case1: when clicking the button, AddItem works
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        // this is for the user to press "Enter" key,so we don't select anything 
        // We just add this event listener to the global document
        // because key press event doesn't happen on any specific element, but it happens
        // on the global web page
        
        // Case2: when press enter key (keycode is 13), AddItem works
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
    };
    
    var updateBudget = function() {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        
        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        
        // 3. Display the budget to the UI
        UICtrl.displayBudeget(budget);
    };
    
    var updatePercentage = function() {
        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();
        // 2. Read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();
        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    };
    
    var ctrlAddItem = function() {
        
        var input, newItem;
        // 1. Get the field input data
        input = UICtrl.getInput();
        
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            // 3. Add the item to the UI 
            UICtrl.addListItem(newItem,input.type);
            // 4. Clear the fields
            UICtrl.clearFields();
            // 5. Calculate and update budgets
            updateBudget();
            // 6. Calculate and update percentages
            updatePercentage();
        }
        
    };
        
        
    var ctrlDeleteItem = function(event) {
        
        var ItemID, splitID, type, ID;
        
        // target gives us the element info 
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if (itemID) {
            // inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            // 1. delete the item from the data structure
            budgetCtrl.deleteItem(type,ID);
            // 2. delete the item from the UI 
            UICtrl.deleteListItem(itemID);
            // 3. Update and show 
            updateBudget();
            // 4. Calculate and update percentages
            updatePercentage();
        }
    };
    
    return {
        // Initialization list for having a place where we can put all the code 
        // that we want to be executed right at the beginning when our application starts
        init: function() {
            console.log('application has started.');
            UICtrl.displayMonth();
            UICtrl.displayBudeget({budget: 0, totalInc: 0, totalExp: 0, percentage: -1});
            setupEventListener();
        }
    };

    
})(budgetContoroller, UIController);

controller.init();
