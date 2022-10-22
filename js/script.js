
var button = document.getElementById('calculate')

button.addEventListener('click', calculate);
var iterations = [];
generateAnswerTable(iterations);

function calculate(){
    $("#results").empty();
    iterations = [];
    document.getElementById("results").innerHTML = '';
    let fx = new Polynomial($("#function").val());
    let x1 = $("#initial-value").val();
    var ea = $("#error-percent").val() /100;
    let pe = 1;
    let derivative = fx.derive(1);
    index = 0;
    while(pe > ea){
        let x2 = x1 - (fx.eval(x1)/derivative.eval(x1));
        iterations.push([index, x1,pe]);
        pe= Math.abs((x2-x1)/x2)*100;
        x1 = x2;
        index ++;
        // console.log("X:"+ x2 + " ---- " + pe + "%");
    }

    generateAnswerTable(iterations);

    let finalResult = $("#final-result");
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
        //console.log(iterations);
        iterations[i].forEach(e => {
            let th = $(`<td>${e}</td>`);
            tr.append(th);
        })
        results.append(tr);
    }
}
