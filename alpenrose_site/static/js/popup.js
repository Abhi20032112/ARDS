document.addEventListener('DOMContentLoaded', function () {
  const openBtn = document.getElementById('openPopup');
  const closeBtn = document.getElementById('closePopup');
  const popupForm = document.getElementById('popupForm');

  openBtn.addEventListener('click', () => {
    popupForm.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => {
    popupForm.style.display = 'none';
  });
});
