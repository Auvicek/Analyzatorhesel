"use strict";
const vstup = document.getElementById("password-input");
const btnToggle = document.getElementById("toggle-pwd");
const bar = document.getElementById("strength-bar");
const stat = document.getElementById("status-text");
const entropy = document.getElementById("entropy-val");
const caskprolomeni = document.getElementById("crack-time");
const generovatheslo = document.getElementById("generate-btn");
function getEntropy(pwd) {
    if (!pwd)
        return 0;
    let pool = 0;
    if (/[a-z]/.test(pwd))
        pool += 26;
    if (/[A-Z]/.test(pwd))
        pool += 26;
    if (/[0-9]/.test(pwd))
        pool += 10;
    if (/[^a-zA-Z0-9]/.test(pwd))
        pool += 32;
    return Math.floor(pwd.length * Math.log2(pool));
}
function setTimeToCrack(entropy) {
    if (!entropy)
        return "";
    if (entropy < 20)
        return "Okamžitě";
    if (entropy < 40)
        return "Minuty až hodiny";
    if (entropy < 60)
        return "Dny až měsíce";
    if (entropy < 80)
        return "desítky let";
    return "Stovky let";
}
vstup.addEventListener("input", () => {
    const inputpwd = vstup.value;
    // Přejmenováno z 'entropy' na 'entropyVysledek'
    const entropyVysledek = getEntropy(inputpwd);
    let color = "#ef4444"; // danger
    let label = "Velmi slabé";
    let width = Math.min((entropyVysledek / 100) * 100, 100);
    if (entropyVysledek >= 75) {
        color = "#10b981";
        label = "neprolomitelné";
    }
    else if (entropyVysledek >= 50) {
        color = "#3b82f6";
        label = "Silné"; // Smazáno 'let', aby se měnila ta hlavní proměnná
    }
    else if (entropyVysledek >= 30) {
        color = "#f59e0b";
        label = "Průměrné";
    }
    // Teď už TypeScript ví, co je co:
    bar.style.width = `${width}%`;
    bar.style.backgroundColor = color;
    stat.innerText = label;
    stat.style.color = color;
    // Tady 'entropy' je ten HTML prvek z řádku 5
    entropy.innerText = `${entropyVysledek} bits`;
    caskprolomeni.innerText = setTimeToCrack(entropyVysledek);
});
btnToggle.addEventListener("click", () => {
    vstup.type = vstup.type === 'password' ? 'text' : 'password';
    if (vstup.type === 'password') {
        btnToggle.innerText = "👁️";
    }
    else if (vstup.type !== 'password') {
        btnToggle.innerText = "😒";
    }
});
generovatheslo.addEventListener("click", () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()><";
    let pwd = "";
    for (let i = 0; i < 30; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    vstup.value = pwd;
    vstup.dispatchEvent(new Event('input'));
});
