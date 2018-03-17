const readline = require('readline');


class Clock {
  constructor() {
    const date = new Date(Date.now());
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();
    this._tick();


    // setInterval(this._tick.bind(this), 1000)
  }

  printTime() {
    // debugger;
    // console.log(this.hours);
    if (this.seconds > 60) {
      this.minutes += 1;
      this.seconds = 0;
    }
    if(this.minutes > 60) {
      this.hours += 1;
      this.minutes = 0;
    }
    if(this.hours > 24) {
      this.hours = 0;
    }

    console.log(`${this.hours}:${this.minutes}:${this.seconds}`);
  }

  _tick() {
    let that = this;
    setInterval(() => {
      that.printTime();
      that.seconds += 1;
    }, 1000);

  }
}

// const clock = new Clock();


const reader = readline.createInterface({
  // it's okay if this part is magic; it just says that we want to
  // 1. output the prompt to the standard output (console)
  // 2. read input from the standard input (again, console)

  input: process.stdin,
  output: process.stdout
});




function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft === 0) {
    completionCallback(sum);
    // console.log("undefined", completionCallback(sum));
  }

  if (numsLeft > 0) {
    let number;
    reader.question("enter a number: ", function(guess) {
      number = parseInt(guess);
      sum += number;
      console.log(sum);
      addNumbers(sum, numsLeft - 1, completionCallback);
      // console.log("wat is this?", addNumbers(sum, numsLeft - 1, completionCallback));

    });
  }
}

// addNumbers(0, 6, sum => console.log(`Total Sum from cb: ${sum}`));

function askIfGreaterThan(el1, el2, callback) {
  reader.question(` ${el1} > ${el2}?`, function(choice) {
    if (choice === "yes") {
      callback(true);
    } else {
      callback(false);
    }
  });
}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  // Do an "async loop":
  // 1. If (i == arr.length - 1), call outerBubbleSortLoop, letting it
  //    know whether any swap was made.
  if (i === arr.length - 1) {
    outerBubbleSortLoop(madeAnySwaps);
  } else {
    askIfGreaterThan(arr[i], arr[i + 1], function(isGreaterThan) {
      if (isGreaterThan) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        madeAnySwaps = true;
      }
      innerBubbleSortLoop(arr, i + 1 , madeAnySwaps, outerBubbleSortLoop);
    });

  }
  // 2. Else, use `askIfGreaterThan` to compare `arr[i]` and `arr[i +
  //    1]`. Swap if necessary. Call `innerBubbleSortLoop` again to
  //    continue the inner loop. You'll want to increment i for the
  //    next call, and possibly switch madeAnySwaps if you did swap.
}

function absurdBubbleSort(arr, sortCompletionCallback) {

  function outerBubbleSortLoop(madeAnySwaps) {

    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop(madeAnySwaps));
    } else {
      sortCompletionCallback;
    }
  }
  outerBubbleSortLoop(true);
}
let array = [3, 2, 1];

absurdBubbleSort(array, function (arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  reader.close();
});

console.log(array);
