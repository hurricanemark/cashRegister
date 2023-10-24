# NodeJS with `jest` Testing module

***"Jest is a delightful JavaScript Testing Framework with a focus on simplicity."*** [https://jestjs.io]

Let's build the logic of a cash register and test it against the jestjs module!

## Cash Register
Given a price and a list of cash denominations, return the number of ways to make change.

**Input**: price, cash, cash in drawer

**Output**: { status: message, change: [[denomination, number of denominations]]}


### Pseudo code

1. Create a function called makeChange that takes in a price, cash, and a list of cash denominations.
   
2. Calculate initial values:
    - The total amount of cash in the drawer.
    - The required change amount; (price - cash).
    + From the required change amount, extract the whole and the decimal values.
      
3. Create a hashmap to store the denominations and their values from the cid (cash in drawer).
   
4. Check base cases:
    - If the total amount of cash in the drawer is less than the required change amount, return {status: "INSUFFICIENT_FUNDS", change: []}
    - If the total amount of cash in the drawer is equal to the required change amount, return {status: "CLOSED", change: cid}
      
5. Loop through the hashmap and check each denomination if it is greater than or equal to the required change amount.
   
6. If the denomination is greater than or equal to the required change amount, then add it to the change array. 
Then subtract the denomination from the required change amount.

7. If the denomination contains less than the required change amount, then continue to the next denomination.
   
8. If the required change amount is 0, then we have reached the end.


### Coding

```
git init cashRegister

cd cashRegister

touch README.md

touch index.js

mkdir __tests__

touch __tests__/tests.js

npm install node-fetch

npm install jest

```

### Testing with jest
[jest test framework](https://jestjs.io/)

```
npm install

npm run test
```


**Output:**

```
> cashregister@1.0.0 test
> jest ./__tests__/tests.js --verbose

  console.log
    ==== Spot Tests: =====

      at log (index.js:171:13)

  console.log
    Test #1

      at log (index.js:175:13)

  console.log
    {
      status: 'CLOSED',
      change: [
        [ 'PENNY', 0.5 ],
        [ 'NICKEL', 0 ],
        [ 'DIME', 0 ],
        [ 'QUARTER', 0 ],
        [ 'ONE', 0 ],
        [ 'FIVE', 0 ],
        [ 'TEN', 0 ],
        [ 'TWENTY', 0 ],
        [ 'ONE HUNDRED', 0 ]
      ]
    }

      at log (index.js:176:13)

  console.log
    Test #2

      at log (index.js:180:13)

  console.log
    { status: 'INSUFFICIENT_FUNDS', change: [] }

      at log (index.js:181:13)

  console.log
    Test #3

      at log (index.js:186:13)

  console.log
    { status: 'OPEN', change: [ [ 'QUARTER', 0.5 ] ] }

      at log (index.js:187:13)

  console.log


    ==== Grainula Tests: =====

      at log (index.js:193:13)

  console.log

    Test# 1:

      at log (index.js:207:13)

  console.log
    {
      status: 'OPEN',
      change: [
        [ 'TWENTY', 60 ],
        [ 'TEN', 20 ],
        [ 'QUARTER', 0.25 ],
        [ 'DIME', 0.2 ],
        [ 'PENNY', 0.01 ]
      ]
    }

      at log (index.js:208:13)

  console.log

    Test# 2:

      at log (index.js:210:13)

  console.log
    { status: 'OPEN', change: [] }

      at log (index.js:211:13)

  console.log

    Test# 3:

      at log (index.js:213:13)

  console.log
    { status: 'OPEN', change: [ [ 'QUARTER', 0.5 ] ] }

      at log (index.js:214:13)

  console.log

    Test# 4:

      at log (index.js:216:13)

  console.log
    { status: 'OPEN', change: [] }

      at log (index.js:217:13)

  console.log

    Test# 5:

      at log (index.js:219:13)

  console.log
    {
      status: 'OPEN',
      change: [ [ 'FIVE', 10 ], [ 'QUARTER', 0.75 ], [ 'PENNY', 0.03 ] ]
    }

      at log (index.js:220:13)

  console.log

    Test# 6:

      at log (index.js:222:13)

  console.log
    { status: 'OPEN', change: [ [ 'PENNY', 0.01 ] ] }

      at log (index.js:223:13)

 PASS  __tests__/tests.js
  autoTests
    √ Test# 1
        Price: 119.542345
        Paying with: 200 (2 ms)
    √
Test# 2
        Price: 3.26
        Paying with: 0.5012
    √
Test# 3
        Price: 19.5
        Paying with: 20
    √
Test# 4
        Price: 1029.34
        Paying with: 1029 (1 ms)
    √
Test# 5
        Price: 59.22
        Paying with: 70 (1 ms)
    √
Test# 6
        Price: 0.99
        Paying with: 1 (1 ms)

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        2.02 s
Ran all test suites matching /.\\__tests__\\tests.js/i.
```

### Conclusion

I am pleasantly surprised with the ease of integrating the jest package.  We barely touched on all but a few of jest mothods.  [Read more about jest here](https://jestjs.io/docs/api).  The verbose output is very nice.