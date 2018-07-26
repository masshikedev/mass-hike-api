const moment = require('moment');

const orderConfirmation = (order, id) => {
  const { trip } = order;
  const paymentSection =
    order.paymentType === 'card'
      ? `<p>${order.stripeToken.card.brand}<br/>${
          order.stripeToken.card.last4
        }</p>`
      : `<p>Cash<br/>${order.meetingLocation.name}<br/>${moment(
          trip.meetingDate
        ).format('dddd, MMMM Do [at] h:mm A')}</p>`;

  return `
    <html>
      <h1>You're going to Blue Hills!</h1>
      <p>We’re so excited that you want to take a hike with us! Until then, take a look at our suggested packing list and our FAQs. We’ll see you soon!</p>
      <h2>Order Summary</h2>
      <p>Order number ${id}</p>
      <h3>Trip Summary</h3>
      <p>
        ${trip.name}
        <br/>
        ${moment.utc(trip.time.hikeStart).format('MMMM Do, YYYY')}
        <br/>
        ${moment.utc(trip.time.hikeStart).format('h:mm A')} - ${moment
    .utc(trip.time.hikeEnd)
    .format('h:mm A')}
      </p>
      <h3>Contact Info</h3>
      <p>
        ${order.name}
        <br/>
        ${order.email}
        ${order.phone && `<br/>${order.phone}`}
      </p>
      <h3>Payment</h3>
      ${paymentSection}
      <h3>Pickup</h3>
      <p>
        Near ${order.pickupLocation}
        <br/>
        ${moment.utc(trip.time.pickupStart).format('h:mm A')} - ${moment
    .utc(trip.time.pickupEnd)
    .format('h:mm A')}
      <br/>
        (Final pickup details will be emailed before the hike)
      </p>
      <h3>Dropoff</h3>
      <p>${moment.utc(trip.time.dropoffStart).format('h:mm A')} - ${moment
    .utc(trip.time.dropoffEnd)
    .format('h:mm A')}
      </p>
    </html>
  `;
};

module.exports = orderConfirmation;
