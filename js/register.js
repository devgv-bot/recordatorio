const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyeB_5DptUvyfTcHZ_ruGWgN5nPz7GfsweA2x-dgIths8iIDuv2s3_0Vya0Tdy07T_j/exec";

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
