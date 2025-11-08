/**
 * @brief Sends plain text to the Java HTTP server!
 * @param path the path on which we want to post the text
 * @param message the message we want to post
 * @returns Returns the response received from the server.
 */
export async function sendPlainText(path: string, message: string): Promise<any> {
  try {
    const res = await fetch("http://localhost:8080/" + path, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: message
    });

    const data = await res.text();
    console.log("Sent plain text!");
    console.log("Frontend received: " + data);
    return data;
  } catch (err) {
    console.error("Error:", err);
    return undefined;
  }
}