const contactMessage = message => {
  return `
    <html>
      <p>Name: ${message.name}</p>
      <p>Return email: ${message.email}</p>
      <h3>Message</h3>
      <p>${message.body}</p>
    </html>
  `;
};

module.exports = contactMessage;
