function Cipher(message: string): string {
  const shift = 3;
  let result = "";

  for (let i = 0; i < message.length; i++) {
    const char = message[i];

    if (char >= 'A' && char <= 'Z') {
      // Uppercase letters
      result += String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
    } else if (char >= 'a' && char <= 'z') {
      // Lowercase letters
      result += String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
    } else {
      // Non-alphabetic characters remain unchanged
      result += char;
    }
  }

  return result;
}

function Decipher(message: string): string {
  const shift = 3;
  let result = "";

  for (let i = 0; i < message.length; i++) {
    const char = message[i];

    if (char >= 'A' && char <= 'Z') {
      result += String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
    } else if (char >= 'a' && char <= 'z') {
      result += String.fromCharCode(((char.charCodeAt(0) - 97 - shift + 26) % 26) + 97);
    } else {
      result += char;
    }
  }

  return result;
}

/**
 * @brief Sends plain text to the Java HTTP server!
 * @param path the path on which we want to post the text
 * @param message the message we want to post
 * @returns Returns the response received from the server.
 */
export async function sendPlainText(path: string, message: string, DoCipher: boolean, Decipher_: boolean): Promise<any> {
  try {
    const res = await fetch("http://localhost:8080/" + path, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: DoCipher ? Cipher(message) : message
    });

    const data = await res.text();
    return Decipher_ ? Decipher(data) : data;
  } catch (err) {
    console.error("Error:", err);
    return undefined;
  }
}