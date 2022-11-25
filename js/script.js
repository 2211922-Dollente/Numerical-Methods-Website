
var button = document.getElementById('calculate')

button.addEventListener('click', calculate);
var iterations = [];
generateAnswerTable(iterations);

function calculate(){
    let steps = $("#steps-wrapper");
    steps.empty();
    $("#results").empty();
    let iterations = [];
    document.getElementById("results").innerHTML = '';
    let fx = new Polynomial($("#function").val());
    let x1 = $("#initial-value").val();
    var ea = $("#error-percent").val() /100;
    let pe = 1;                                     //Percent Error
    let derivative = fx.derive(1);                  //get the 1st derivative
    index = 0;
    iterations.push([index, x1,pe]);
    index ++;
    steps.append(`<h3>Problem:</h3>`);
    steps.append(`<p>f(x) = ${fx}</p>`);
    steps.append(`<p>f'(x) = ${derivative}:</p>`);
    steps.append(`<p>Initial Value = ${x1}:</p>`);
    steps.append(`<p>Percent of error = ${ea}:</p><br>`);

    while(pe > ea){
        if(index > 100){
            break;
        }
        
        let fxValue = Math.round(((fx.eval(x1)) + Number.EPSILON) * 1000000) / 1000000;
        let dxValue = Math.round(((derivative.eval(x1)) + Number.EPSILON) * 1000000) / 1000000;
        let x2 = Math.round(((x1 - (fxValue/dxValue)) + Number.EPSILON) * 1000000) / 1000000; 
        pe= Math.round(((Math.abs((x2-x1)/x2)*100) + Number.EPSILON) * 1000000) / 1000000; 

        let fts = fx.toString().replace(/x/gi, `(${x1})`);      //convert function to string
        let fds = derivative.toString().replace(/x/gi, `(${x1})`); 
        x1 = x2;


        steps.append(`<h3>Iteration ${index}:</h3>`);
        steps.append(`<math-field read-only>f(x) = ${fts} = ${fxValue}</math-field>`);
        steps.append(`<math-field read-only>f'(x) = ${fds} = ${dxValue}</math-field>`);
        steps.append(`<math-field read-only>X<sub>${index+1}</sub> = ${x1} - \\frac{${fxValue}}{${dxValue}}  =  ${x2}</math-field>`);
        steps.append(`<math-field read-only>e<sub>a</sub> = \\frac{${x2}-${x1}}{${x2}} * 100 = ${pe}</math-field><br>`);
        
        iterations.push([index, x1,pe]);
        index ++;
    }

    generateAnswerTable(iterations);    
    let finalResult = $("#final-result");
    finalResult.empty();
    finalResult.append("x = " + x1.toFixed(4));
}

function generateAnswerTable(iterations){
    let tableHeaders = ['x<sub>i</sub>', 'f(x<sub>i-1</sub>)', 'ε<sub>a</sub>'];
    var results = $("#results");
    let hr = $('<tr></tr>');
    tableHeaders.forEach(e => {
        hr.append($(`<th>${e}</th>`));
    });
    results.append(hr);

    for (let i = 0; i < iterations.length; i++) {
        let tr = $('<tr class="table-data"></tr>');
        // console.log(iterations);
        iterations[i].forEach(e => {
            let th = $(`<td>${e}</td>`);
            tr.append(th);
        })
        results.append(tr);
    }
}

function showSteps(){

}