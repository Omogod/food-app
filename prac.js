let a = Math.floor(Math.random() * 9000)
console.log(atob)

// 0 -> 1 -> 2 -> 3 -> 4 -> 5
// null <- 0 <- 1 -> 2 -> 3 -> 4 -> 5
// function reversedLinkedList(head) {
//     let previous = null
//     let current = head

//     while(current) {
//     let next = current.next
//     current.next = previous; 
//     previous = current
//     current = next
//     }

//   return previous
// }


function reversedLinkedList(head) {
    let previous = null
    let current = head;

    while(current) {
        let next = current.next
        current.next = previous
        previous = current
        current = next
    }
}


this.add = function(data) {
    const node = new Node(data)
    if(head === null) {
        head = node
    } else {
        let current = node;
        while(current.next) {
            current = current.next
        }
            current.next = node
    }

}


this.remove = function(data) {
    if(head.data = data) {
        head = head.next
    } else {
    } 
}


// 0 -> 1 -> 2 -> 3 -> 4 -> 5

function sunsetviews (buildings, direction) {
    const buildingsWithSunsetViews = []
    const startIdx = direction === 'EAST' ? 0 : buildings.length - 1    
    const step = direction === 'EAST' ? 1 : -1
    let idx = startIdx
    let runningMaxHeight = 0

    while(idx >= 0 && idx < buildings.length) {
        const buildingHeight = buildings[idx]


        if(buildingHeight > runningMaxHeight) {
            buildingsWithSunsetViews.push(idx)
        }

        runningMaxHeight = Math.max(runningMaxHeight, buildingHeight)
        idx += step
    }

    if(direction === 'WEST') {
        return buildingsWithSunsetViews.reverse()
    }   
    return buildingsWithSunsetViews
}

function reversedSunsetviews (buildings, direction) {
    const buildingsWithSunsetViews = []
    const startIdx = direction === 'EAST' ? 0 : buildings.length - 1}
    


function cakes(recipe, ingredients) {
    let result = 0;
    let recipeKeys = Object.keys(recipe)
    console.log(recipeKeys)
    let ingredientsKeys = Object.keys(ingredients)
    console.log(ingredientsKeys)
    console.log(recipeKeys === ingredientsKeys)
    let recipeValues = Object.values(recipe)
    let ingredientsValues = Object.values(ingredients)
    let recipeKeysLength = recipeKeys.length
    let ingredientsKeysLength = ingredientsKeys.length
    let recipeValuesLength = recipeValues.length
    let ingredientsValuesLength = ingredientsValues.length

    if(recipeKeysLength === ingredientsKeysLength && recipeValuesLength === ingredientsValuesLength) {
        for(let i = 0; i < recipeKeysLength; i++) {
            if(recipeKeys[i] === ingredientsKeys[i] && recipeValues[i] <= ingredientsValues[i]) {
                result = Math.floor(ingredientsValues[i] / recipeValues[i])
            } else {
                result = 0
            }
        }
    } else {
        result = 0
    }
    return result
}


cakes({flour: 500, sugar: 200, eggs: 1}, {flour: 1200, sugar: 1200, eggs: 5, milk: 200})



// DESCRIPTION:
// Write an algorithm that takes an array and moves all of the zeros to the end, preserving the order of the other elements.
// moveZeros([false,1,0,1,2,0,1,3,"a"]) // returns[false,1,1,2,1,3,"a",0,0]

// function moveZero(arr) {
//   let nArr = [...arr];

//   let res = [];
//   let zeros = []
//   for (let i of nArr) {
//     if(i!==0) {
//       res.push(i);
      
//     }
//     else{
//       zeros.push(i)
//     }
//   }

//   return res.concat(zeros)
// }

// console.log(moveZero([false,1,0,1,2,0,1,3,"a"]))

// DESCRIPTION:
// Pete likes to bake some cakes. He has some recipes and ingredients. Unfortunately he is not good in maths. Can you help him to find out, how many cakes he could bake considering his recipes?
// Write a function cakes(), which takes the recipe (object) and the available ingredients (also an object) and returns the maximum number of cakes Pete can bake (integer). For simplicity there are no units for the amounts (e.g. 1 lb of flour or 200 g of sugar are simply 1 or 200). Ingredients that are not present in the objects, can be considered as 0.
// must return 2
// cakes({flour: 500, sugar: 200, eggs: 1}, {flour: 1200, sugar: 1200, eggs: 5, milk: 200}); 
// // must return 0
// cakes({apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100}, {sugar: 500, flour: 2000, milk: 2000});

// // must return 2
// cakes({flour: 500, sugar: 200, eggs: 1}, {flour: 1200, sugar: 1200, eggs: 5, milk: 200}); 
// // must return 0
// cakes({apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100}, {sugar: 500, flour: 2000, milk: 2000}); 

// flour 1200/500 = 2, sugar = 1200/200 = 6 eggs= 5/1 = 5

// flour 1200 - 500 = 700 - 500 = 200
// sugar 1200 - 200 = 1000 - 200 = 800
// eggs 5 -1 = 4 - 1 = 3

// Numer of cakes = 1+1
// function cakes(recipe, ingredients) {
//   // get all the keys in receipe using Oject.keys
//   const recipeKeys = Object.keys(recipe);
//   divide the value in ingredient by value in recipe, round down to integer using Math.floor or Math.trunc
//    store divided of key in result
//    then check for smallest value and return the value

//   const values = recipeKeys.map((item) => {
//     return Math.floor(Math.floor((ingredients[item] || 0)/recipe[item]))
//   })

//  return Math.min(...values)
// }

// console.log(cakes({flour: 500, sugar: 200, eggs: 1}, {flour: 1200, sugar: 1200, eggs: 5, milk: 200}))
// console.log(cakes({apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100}, {sugar: 500, flour: 2000, milk: 2000}))


// DESCRIPTION:
// Your job is to write a function which increments a string, to create a new string.
// If the string already ends with a number, the number should be incremented by 1.
// If the string does not end with a number. the number 1 should be appended to the new string.
// Examples:
// foo -> foo1
// foobar23 -> foobar24
// foo0042 -> foo0043
// foo9 -> foo10
// foo099 -> foo100

// function incrementString (str) {
  
//   let alph = 'abcdefghijklmnopqrstuvwxyz'.split("")
//   let num = ''
//   let letters = ''
  
//   for(let i = 0; i < str.length; i++){
//     if(!alph.includes(str[i].toLowerCase())){
//       num += str[i]
      
//     }
//     else{
//       letters += str[i]
//     }
//   }
//   if(num === ''){
//     return letters + '1';
//   }
//   let newNum = Number(num) + 1
//   // console.log({num, newNum})
//   return letters + newNum.toString().padStart(num.length, '0')
// }
function incrementString (str) {
    let num = str.match(/\d+/g);
    if(num == null) {
      return str + "1";
    }
    let numStr = num[0];
    let numLen = numStr.length;
    let newNum = parseInt(numStr) + 1;
    let newNumStr = newNum.toString()
    let newNumLen = newNumStr.length;
    let diff = numLen - newNumLen;
    if(diff > 0){
      newNumStr = '0'.repeat(diff) + newNumStr;
    }
    return str.replace(numStr, newNumStr);
  }
  console.log(incrementString("foo"));
  console.log(incrementString("foobar23"));
  console.log(incrementString("foo0042"));
  console.log(incrementString("foo9"));
  console.log(incrementString("foo099"));
  console.log(incrementString("FOo099"));