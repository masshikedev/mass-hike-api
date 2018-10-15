const notificationMessage = (order, id) => {
  const { trip } = order;
  return `
    <html>
    <p>${order.name} has purchased ${
    order.tickets
  } tickets for the upcoming trip to ${trip.name}</p>
    <a href="https://masshike.org/admin/orders/${id}">View this order on the admin platform</a>
    </html>
  `;
};

module.exports = notificationMessage;
