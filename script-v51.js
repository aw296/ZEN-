const theme = document.getElementById('theme');
function applyTheme(dark) {
  document.body.classList.toggle('dark', dark);
  theme.textContent = dark ? 'ライトモード' : 'ダークモード';
  theme.setAttribute('aria-pressed', String(dark));
}
try { applyTheme(localStorage.getItem('roberts-theme') !== 'light'); } catch { applyTheme(true); }
theme.addEventListener('click', () => {
  const dark = !document.body.classList.contains('dark');
  applyTheme(dark);
  try { localStorage.setItem('roberts-theme', dark ? 'dark' : 'light'); } catch {}
});
const publicUrl = 'https://aw296.github.io/ZEN-/';
document.getElementById('copy').addEventListener('click', async () => {
  const status = document.getElementById('copy-status');
  try {
    await navigator.clipboard.writeText(publicUrl);
    status.textContent = 'URLをコピーしました。';
  } catch {
    status.textContent = 'コピーできない場合はこちらのURLを選択してください：' + publicUrl;
  }
});

const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('.slide-dot')];
const watch = document.getElementById('watch');
const pause = document.getElementById('pause');
let current = 0, timer;
let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function showSlide(index) {
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    slide.hidden = i !== current;
    slide.classList.toggle('active', i === current);
    slide.setAttribute('aria-hidden', String(i !== current));
    slide.tabIndex = i === current ? 0 : -1;
    dots[i].setAttribute('aria-pressed', String(i === current));
  });
  document.body.classList.toggle('twitch-active', current === 1);
  watch.href = slides[current].href;
  watch.textContent = (current === 0 ? 'Kick' : 'Twitch') + 'で配信を見る ↗';
}
function restart() {
  clearInterval(timer);
  if (!paused && !document.hidden) timer = setInterval(() => showSlide(current + 1), 5000);
  pause.textContent = paused ? '自動再生' : '一時停止';
  pause.setAttribute('aria-pressed', String(paused));
}
function selectSlide(index) { showSlide(index); restart(); }
document.getElementById('prev').addEventListener('click', () => selectSlide(current - 1));
document.getElementById('next').addEventListener('click', () => selectSlide(current + 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => selectSlide(i)));
pause.addEventListener('click', () => { paused = !paused; restart(); });
document.addEventListener('visibilitychange', restart);
showSlide(0); restart();
