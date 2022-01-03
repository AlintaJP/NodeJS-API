/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51KDB92EsxEBe1l8Xipc9F0DTBh9rA44L9S7YJxw5FI8sOXCh1YVltdWA7oiL84dNLe7T8iySRohdwsmJjssFdnJS00nDySB2P8'
  );

  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
