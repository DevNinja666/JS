
function add(symbol) {
  document.getElementById('result').value += symbol;
}

function clearResult() {
  document.getElementById('result').value = '';
}

function calculate() {
  let res = document.getElementById('result');
  try {
    res.value = eval(res.value);
  } catch {
    res.value = 'Ошибка';
  }
}
