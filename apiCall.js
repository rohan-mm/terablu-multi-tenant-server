const axios = require("axios");

const serverURL = "http://139.162.59.52:7512";
module.exports.fetchRules = async (deviceId) => {
  try {
    return await axios.post(
      `${serverURL}/terablu/rules/_search?size=10000`,
      {
        query: {
          bool: {
            must: [
              {
                match: {
                  "device.deviceId": deviceId,
                },
              },
            ],
          },
        },
      },
      {
        headers: {
          authorization:
            "Bearer kauth-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJrdWlkLWxhY2tpbmctcm9kZGVudC0xNzcxNSIsImlhdCI6MTYzODQyNDIzOX0.GJA6WpMc8-hC_9eVxXH6K6PLMa22HGLvbg21HqKExK4",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
