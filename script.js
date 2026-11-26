const button = document.getElementById('theme');
button.addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark');
  button.textContent = dark ? 'ライトモード' : 'ダークモード';
  button.setAttribute('aria-pressed', String(dark));
});
