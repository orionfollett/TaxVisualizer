
const single_brackets = [0, 9950, 40525, 86375, 164925, 209425, 523600];
const single_rates = [.1, .12, .22, .24, .32, .35, .37];

function startup(){
  
}

function incomeInputField(incomeTag, deductionsTag, outputTag) {
//const incomeInputField = function(incomeTag, deductionsTag, outputTag) {
      let text = "Federal Tax Rate: ";
      
      let income = document.getElementById(incomeTag).value;
      let deductions = document.getElementById(deductionsTag).value;

      //i2 = income;
      //d2 = deductions;
      taxRateGraph("taxChart", income, deductions);

      let tax = incomeTaxCalculation(income, deductions);
      let rate = tax / income;
      text += (rate.toFixed(3) * 100) + "%";
      text += "<br>" + "Federal Income Tax: $" + tax.toFixed(2);
      document.getElementById(outputTag).innerHTML = text;  
}

function federalIncomeTax(x, brackets, rates){
//const federalIncomeTax = function(x, brackets, rates){
  let tax = 0;
  let i = 1;
  while(i < (brackets.length + 1)){
    
    if(x < brackets[i] || i == brackets.length){
      tax = tax + ((x - brackets[i-1])*rates[i-1]); 
      break;
    }
    else{
      tax = tax + rates[i-1]*(brackets[i] - brackets[i-1]);
    }
    i++;
  }
  
  return tax;
}

function incomeTaxCalculation(income, deductions){
//const incomeTaxCalculation = function(income, deductions){
  
  let agi = income - 12550 - deductions;
  
    if(agi > 0){
      return federalIncomeTax(agi, single_brackets, single_rates);
    }
    else{
      return 0;
    }
}

function taxRateGraph(chartTag, income, deduction){  
//const taxRateGraph = function(chartTag, income, deduction){
  let x = [];
  let y = [0];
  let i = 0;
  while(i < 250000){
    x.push(i);
    y.push(incomeTaxCalculation(i, deduction) / i);
    i += 1000;
  }

  let labels = x;
  let data = {
    labels: labels,
    datasets: [{
      label: "Single Filers Federal Tax Rate vs Income: Just Standard Deduction",
      data: y,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };
  let config = {
    type: 'line',
    data: data,
    options: {responsive: true}
  };

  let taxRateChart = new Chart(document.getElementById(chartTag),config);
}