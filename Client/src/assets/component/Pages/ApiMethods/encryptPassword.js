// Browser la password-ah RSA public key vechi encrypt pannum
// (Web Crypto: https illa na localhost la mattum work aagum)

function pemToArrayBuffer(pem) {
  const base64 = pem.replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

export async function encryptPassword(password, publicKeyPem, nonce) {
  const key = await crypto.subtle.importKey(
    "spki",
    pemToArrayBuffer(publicKeyPem),
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"],
  );

  // password + server tharra nonce rendayum encrypt pannurom
  const data = new TextEncoder().encode(JSON.stringify({ password, nonce }));
  const encrypted = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, key, data);

  // Bytes -> base64 text (JSON la anuppa)
  return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}
