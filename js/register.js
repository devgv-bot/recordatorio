const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbx3lC3udxBMr4ae_2l_eatjK3NocfvCzDdAY2Q-Bmn_fb6snYdV5DtDL5sF5FSCtIuV/exec";

async function crearUsuario() {
  const u = newUser.value.trim();
  const p = newPass.value.trim();
  const n = newName.value.trim();

  if (!u || !p || !n) {
    msg.textContent = "Complete todos los campos";
    return;
  }

  const r = await fetch(`${WEB_APP_URL}?func=addUser&username=${u}&password=${p}&name=${n}`)
    .then(r => r.json());

  msg.textContent = r.success ? "Usuario creado correctamente" : r.message;
}
