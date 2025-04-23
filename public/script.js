/* public/script.js
   ──────────────────────────────────────────────────────
   логика «Выбор входа → Форма → POST /api/signup →
   мгновенная запись + вывод в админ-панель»
*/
(() => {
  // DOM-элементы
  const authSection = document.getElementById('auth-methods');
  const formSection = document.getElementById('form-section');
  const methodTitle = document.getElementById('chosen-method-title');
  const backBtn     = document.getElementById('back-btn');
  const form        = document.getElementById('signup-form');

  /*────────────────────────────────────────────────────
    1. Переход от кнопок авторизации к анкете
  ────────────────────────────────────────────────────*/
  document.querySelectorAll('.auth-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const provider = btn.dataset.method;                   // google / facebook / …
      methodTitle.textContent = `Вы выбрали: ${btn.textContent}`;
      authSection.classList.add('hidden');
      formSection.classList.remove('hidden');
      console.log(`TODO: инициализировать OAuth для ${provider}`);
    });
  });

  /*────────────────────────────────────────────────────
    2. Кнопка «← Вернуться к выбору» — сброс формы
  ────────────────────────────────────────────────────*/
  backBtn.addEventListener('click', () => {
    form.reset();                                            // очищаем поля
    formSection.classList.add('hidden');
    authSection.classList.remove('hidden');
  });

  /*────────────────────────────────────────────────────
    3. Отправка анкеты на бекенд
  ────────────────────────────────────────────────────*/
  form.addEventListener('submit', async e => {
    e.preventDefault();                                      // отменяем перезагрузку страницы

    // ⚠️ Забираем ВСЕ поля строго по атрибутам «name»
    const data = Object.fromEntries(new FormData(form).entries());

    // DEBUG: в консоли браузера видно, что именно отправляем
    console.log('→ sending', data);

    try {
      const res = await fetch('/api/signup', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body   : JSON.stringify(data)
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      alert('Спасибо! Вы участвуете в розыгрыше 🎉');
      backBtn.click();                                       // вернулись к выбору
    } catch (err) {
      console.error(err);
      alert('Не удалось отправить данные, попробуйте позже');
    }
  });
})();