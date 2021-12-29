import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url = type === 'password' ? 'updatePassword' : 'updateMe';

    const res = await axios({
      method: 'PATCH',
      url: `http://localhost:3000/api/v1/users/${url}`,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Data updated successfully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
