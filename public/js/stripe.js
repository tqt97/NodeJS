/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';


const stripe = Stripe('pk_test_51KJnCbH9d27mISBNiSBAO89Xo54s81U8dysuoS1lePZh4kIcn8HQib3fCBbRkdGIN1n9QPgRPunbB5YEY4bzfhP300ZBzA05bR');
export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
