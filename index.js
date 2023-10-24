function checkCashRegister(price, cash, cid) {

    let remitant = parseFloat(cash - price).toFixed(2);
    let totalInCid = cid.reduce((acc, val) => { return acc + val[1]; }, 0);  // sum of all the values in the cash register (cid array)
    totalInCid = parseFloat(totalInCid).toFixed(2);
    /* construct a hashmapp for the cid array */
    const constructHashObject = arr => {
      return arr.reduce((acc, val) => {
        const [key, value] = val;
        acc[key] = value;
        return acc;
      }, {});
    };
    const cidHashObj = constructHashObject(cid); // construct a hashmap for the cid array
    let dollars = Math.floor(remitant);
    let cents = (remitant % 1).toFixed(2);
    let stat = "OPEN";
    let lessExchange = new Array();
  
    // console.log("Money in cash drawer: " + totalInCid + " and required change: " + remitant);
  
    if (parseFloat(remitant) > parseFloat(totalInCid)) {
      return { status: "INSUFFICIENT_FUNDS", change: [] }; // return change = []
    } else if (totalInCid == remitant) {
      return { status: "CLOSED", change: cid };  // return change = the cid array
    } else {
  
      let hundreds = 0;
      let twenties = 0;
      let tens = 0;
      let fives = 0;
      let ones = 0;
      // dollars:
      while (dollars > 0) {
        // hundreds
        if (dollars >= 100 && cidHashObj["ONE HUNDRED"] >= 100) {
          cidHashObj["ONE HUNDRED"] -= 100;
          dollars -= 100;
          hundreds += 100;
        } else
          // twenties
          if (dollars >= 20 && cidHashObj["TWENTY"] >= 20) {
            cidHashObj["TWENTY"] -= 20;
            dollars -= 20;
            twenties += 20;
          } else
            // tens
            if (dollars >= 10 && cidHashObj["TEN"] >= 10) {
              cidHashObj["TEN"] -= 10;
              dollars -= 10;
              tens += 10;
            } else
              // fives 
              if (dollars >= 5 && cidHashObj["FIVE"] >= 5) {
                cidHashObj["FIVE"] -= 5;
                dollars -= 5;
                fives += 5;
              } else
                // ones
                if (dollars >= 1 && cidHashObj["ONE"] >= 1) {
                  cidHashObj["ONE"] -= 1;
                  dollars -= 1;
                  ones += 1;
                }
      }
      // console.log("--Hundreds: ", hundreds);
      // console.log("--Twenties: ", twenties);
      // console.log("--Tens: ", tens);
      // console.log("--Fives: ", fives);
      // console.log("--Ones: ", ones);
      if (hundreds > 0) lessExchange.push(["ONE HUNDRED", hundreds]);
      if (twenties > 0) lessExchange.push(["TWENTY", twenties]);
      if (tens > 0) lessExchange.push(["TEN", tens]);
      if (fives > 0) lessExchange.push(["FIVE", fives]);
      if (ones > 0) lessExchange.push(["ONE", ones]);
  
      // cents:
      let quaters = 0;
      let dimes = 0;
      let nickels = 0;
      let pennies = 0;
      while (cents > 0) {
        // quaters:
        if (cidHashObj["QUARTER"] >= 0.25 && cents >= 0.25) {
          cidHashObj["QUARTER"] -= 0.25;
          cents -= 0.25;
          quaters += 0.25;
        } else
          // dimes:
          if (cidHashObj["DIME"] >= 0.1 && cents >= 0.1) {
            cidHashObj["DIME"] -= 0.1;
            cents -= 0.1;
            dimes += 0.1;
          } else
            // nickels:
            if (cidHashObj["NICKEL"] >= 0.05 && cents >= 0.05) {
              cidHashObj["NICKEL"] -= 0.05;
              cents -= 0.05;
              nickels += 0.05;
            } else
              // pennies
              if (cidHashObj["PENNY"] >= 0.01 && cents >= 0.01) {
                cidHashObj["PENNY"] -= 0.01;
                cents -= 0.01;
                pennies += 0.01;
              } else {
                if (cents > 0) {
                  stat = "INSUFFICIENT_FUNDS";
                  lessExchange = [];
                }
                break;
              }
        cents = parseFloat(cents).toFixed(2);
        // console.log("--Cents: ", cents);
      }
      if (stat != "INSUFFICIENT_FUNDS") {
        if (quaters > 0) lessExchange.push(["QUARTER", quaters]);
        if (dimes > 0) lessExchange.push(["DIME", dimes]);
        if (nickels > 0) lessExchange.push(["NICKEL", nickels]);
        if (pennies > 0) lessExchange.push(["PENNY", pennies]);
      } else if (stat === "CLOSED") {
        lessExchange = cid;
      }
    }
  
    // console.log("Status: ", stat);
    // console.log("Change: ", lessExchange);
  
    // return { status: stat, remit: remitant, change: lessExchange };
    return { status: stat, change: lessExchange };
  }
  
  
  function createChangeremitantantTable(tableData) {
    let table = document.getElementById('cash-in-drawer-table');
    let tableBody = document.createElement('tbody');
  
    tableData.forEach(function(rowData) {
      let row = document.createElement('tr');
  
      rowData.forEach(function(cellData) {
        let cell = document.createElement('td');
        cell.appendChild(document.createTextNode(cellData));
        row.appendChild(cell);
      });
  
      tableBody.appendChild(row);
    });
  
    table.appendChild(tableBody);
    document.body.appendChild(table);
  }
  
  function loadCashInDrawer() {
    let cashInDrawer = [
      ["PENNY", 0.01],
      ["NICKEL", 0.05],
      ["DIME", 0.1],
      ["QUARTER", 0.25],
      ["ONE", 1],
      ["FIVE", 5],
      ["TEN", 10],
      ["TWENTY", 20],
      ["ONE HUNDRED", 100]
    ];
    createChangeremitantantTable(cashInDrawer);
  }
  
  
  function spot_tests() {
    console.log("==== Spot Tests: =====\n");
    let price = 19.5;
    let cash = 20;
    let cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];
    console.log("Test #1");
    console.log(checkCashRegister(price, cash, cid));
    price = 18.5;
    cash = 22;
    cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0.50], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];
    console.log("Test #2");
    console.log(checkCashRegister(price, cash, cid));
  
    price = 19.5;
    cash = 20;
    cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0.50], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];
    console.log("Test #3");
    console.log(checkCashRegister(price, cash, cid));
  }
  
  
  function grainula_tests() {
  
    console.log("\n\n==== Grainula Tests: =====\n");
  
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
  
  
    console.log("\nTest# 1:");
    console.log(checkCashRegister(prices[0], cashes[0], cids["c1"]));
  
    console.log("\nTest# 2:");
    console.log(checkCashRegister(prices[1], cashes[1], cids["c2"]));
  
    console.log("\nTest# 3:");
    console.log(checkCashRegister(prices[2], cashes[2], cids["c3"]));
  
    console.log("\nTest# 4:");
    console.log(checkCashRegister(prices[3], cashes[3], cids["c4"]));
  
    console.log("\nTest# 5:");
    console.log(checkCashRegister(prices[4], cashes[4], cids["c5"]));
  
    console.log("\nTest# 6:");
    console.log(checkCashRegister(prices[5], cashes[5], cids["c6"]));
  }
  
  /* perform manual tests */
  spot_tests();
  grainula_tests();
  
  /* export to test scripts */
  module.exports = checkCashRegister;