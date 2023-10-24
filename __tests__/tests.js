const cashregister = require("../index");



/*
    ==== Tests: =====
*/
let prices = [119.542345, 3.26, 19.5, 1029.34, 59.22, 0.99];
let cashes = [200, 0.5012, 20, 1029.00, 70.0, 1.00];
let cids = {
  "c1": [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]],
  "c2": [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]],
  "c3": [["PENNY", 0.01], ["NICKEL", .35], ["DIME", 0.60], ["QUARTER", 5.75], ["ONE", 7], ["FIVE", 5], ["TEN", 20], ["TWENTY", 20], ["ONE HUNDRED", 0]],
  "c4": [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]],
  "c5": [["PENNY", 20.5], ["NICKEL", 0.05], ["DIME", 0.10], ["QUARTER", 1.25], ["ONE", 0], ["FIVE", 15], ["TEN", 0], ["TWENTY", 40], ["ONE HUNDRED", 0]],
  "c6": [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]
}
let expectValues = {
  "r1": { "change": [["TWENTY", 60], ["TEN", 20], ["QUARTER", 0.25], ["DIME", 0.2], ["PENNY", 0.01]], "status": "OPEN" },
  "r2": { "change": [], "status": "OPEN" },
  "r3": { "change": [["QUARTER", 0.5]], "status": "OPEN" },
  "r4": { "change": [], "status": "OPEN" },
  "r5": { "change": [["FIVE", 10], ["QUARTER", 0.75], ["PENNY", 0.03]], "status": "OPEN" },
  "r6": { "change": [["PENNY", 0.01]], "status": "OPEN" }
};


describe("autoTests", () => {
  test(`Test# 1 \n\tPrice: ${prices[0]}\n\tPaying with: ${cashes[0]}`, () => {
    expect(cashregister(prices[0], cashes[0], cids["c1"])).toEqual(expectValues["r1"]);
  });

  test(`\nTest# 2 \n\tPrice: ${prices[1]}\n\tPaying with: ${cashes[1]}`, () => {
    expect(cashregister(prices[1], cashes[1], cids["c2"])).toEqual(expectValues["r2"]);
  });

  test(`\nTest# 3 \n\tPrice: ${prices[2]}\n\tPaying with: ${cashes[2]}`, () => {
    expect(cashregister(prices[2], cashes[2], cids["c3"])).toEqual(expectValues["r3"]);
  });

  test(`\nTest# 4 \n\tPrice: ${prices[3]}\n\tPaying with: ${cashes[3]}`, () => {
    expect(cashregister(prices[3], cashes[3], cids["c4"])).toEqual(expectValues["r4"]);
  });

  test(`\nTest# 5 \n\tPrice: ${prices[4]}\n\tPaying with: ${cashes[4]}`, () => {
    expect(cashregister(prices[4], cashes[4], cids["c5"])).toEqual(expectValues["r5"]);
  });

  test(`\nTest# 6 \n\tPrice: ${prices[5]}\n\tPaying with: ${cashes[5]}`, () => {
    expect(cashregister(prices[5], cashes[5], cids["c6"])).toEqual(expectValues["r6"]);
  });
});
