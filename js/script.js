
var button = document.getElementById('calculate')

button.addEventListener('click', calculate);
// const ce = new ComputeEngine.ComputeEngine();
// ce.numericMode = 'machine';

// MathLive.renderMathInDocument()


function calculate(){
    let fx = new Polynomial($("#function").val());
    let x1 = $("#initial-value");
    let error = $("#error-percent");

    let pe = 1;
    let derivative = fx.derive(1);

    while(pe>error){
        let x2 = x1 - (fx.eval(x1)/derivative.eval(x1));

    }

}

