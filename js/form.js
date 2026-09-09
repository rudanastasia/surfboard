//////
////// Сообщение отправки формы
//////
const modal = document.getElementById('myModal');

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

$('.modal__action').click((e) => {
  e.preventDefault();
  modal.style.display = 'none';
});

//////
/////// Валидация и отправка формы
//////
const form = document.querySelector('.form');

IMask(form.elements.phone, {
  mask: '+{7} (000) 000-00-00',
});

IMask(form.elements.name, {
  mask: /^[a-zA-Zа-яА-ЯёЁ\s-]*$/,
});

const validateField = (field) => {
  if (!field.value.trim().length) {
    field.classList.add('form__input--error');
    return false;
  } else {
    field.classList.remove('form__input--error');
    return true;
  }
};

const validateForm = (data) => {
  let isValid = true;
  for (const key in data) {
    const element = data[key];
    const valid = validateField(element);

    if (!valid) {
      isValid = false;
    }
  }
  return isValid;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = {
    name: form.elements.name,
    phone: form.elements.phone,
    comment: form.elements.comment,
  };

  if (!validateForm(data)) {
    console.log('not send');
    return;
  }

  $.ajax({
    url: 'https://formspree.io/f/xojgoeee',
    method: 'post',
    dataType: 'json',
    headers: {
      Accept: 'application/json',
    },
    data: {
      name: data.name.value,
      phone: data.phone.value,
      comment: data.comment.value,
    },
  })
    .done(() => {
      modal.style.display = 'block';
      form.reset();
    })
    .fail(() => {
      console.log('send error');
    });
});
