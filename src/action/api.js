export const BASE_URL =
  "http://5c167fa4e6694800138963d4.mockapi.io/api/v1/cart";

export const errorMessage = error => {
  let message = "Error in request!";
  if (error.response) {
    const data = error.response.data;
    message = Object.keys(data).length ? data : message;
  } else if (error.message) {
    message = error.message;
  }

  return message;
};
