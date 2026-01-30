<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Палитра цветов</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f4f4;
      padding: 20px;
    }

    h1 {
      text-align: center;
    }

    .form {
      max-width: 500px;
      margin: 0 auto 30px;
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    input {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      font-size: 16px;
    }

    button {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      cursor: pointer;
    }

    .palette {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 15px;
    }

    .color-card {
      background: #fff;
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    }

    .color-preview {
      height: 80px;
    }

    .color-info {
      padding: 10px;
      font-size: 14px;
    }

    .type {
      color: #666;
      font-size: 12px;
    }

    .error {
      color: red;
      text-align: center;
      margin-top: 10px;
    }
  </style>
</head>
<body>

<h1>🎨 Палитра цветов</h1>

<div class="form">
  <input type="text" id="name" placeholder="Название цвета">
  <input type="text" id="value" placeholder="HEX / RGB / RGBA">
  <button id="add">Добавить цвет</button>
  <div class="error" id="error"></div>
</div>

<div class="palette" id="palette"></div>

<script>
  const nameInput = document.getElementById('name');
  const valueInput = document.getElementById('value');
  const palette = document.getElementById('palette');
  const error = document.getElementById('error');

  const nameRegex = /^[a-zA-Zа-яА-ЯёЁ]+$/;

  const hexRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
  const rgbRegex = /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/;
  const rgbaRegex = /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|0?\.\d+|1)\s*\)$/;

  function getColorType(value) {
    if (hexRegex.test(value)) return 'HEX';
    if (rgbaRegex.test(value)) return 'RGBA';
    if (rgbRegex.test(value)) return 'RGB';
    return null;
  }

  document.getElementById('add').addEventListener('click', () => {
    error.textContent = '';

    const name = nameInput.value.trim();
    const value = valueInput.value.trim();

    if (!nameRegex.test(name)) {
      error.textContent = 'Название должно содержать только буквы';
      return;
    }

    const type = getColorType(value);
    if (!type) {
      error.textContent = 'Некорректный формат цвета';
      return;
    }

    const card = document.createElement('div');
    card.className = 'color-card';

    const preview = document.createElement('div');
    preview.className = 'color-preview';
    preview.style.background = value;

    const info = document.createElement('div');
    info.className = 'color-info';
    info.innerHTML = `
      <strong>${name.toLowerCase()}</strong><br>
      ${value}<br>
      <span class="type">${type}</span>
    `;

    card.appendChild(preview);
    card.appendChild(info);
    palette.appendChild(card);

    nameInput.value = '';
    valueInput.value = '';
  });
</script>

</body>
</html>
