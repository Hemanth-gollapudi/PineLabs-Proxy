const axios = require('axios');
require('dotenv').config();
const model = require('../models/transactionModel');

const callPine = async (path, method = 'post', payload = {}) => {
  console.log(`[pineService] Sending to PineLabs ${path}:`, JSON.stringify(payload, null, 2));
  const pineReqId = await model.insertPineRequest(path, payload);

  try {
    const res = await axios({
      url: path,
      method,
      data: payload,
      headers: { 'Content-Type': 'application/json' },
      timeout: 20000
    });
    await model.insertPineResponse(pineReqId, res.status, res.data);
    return { success: true, status: res.status, data: res.data };
  } catch (err) {
    const status = err.response ? err.response.status : null;
    const body = err.response ? err.response.data : { message: err.message };
    await model.insertPineResponse(pineReqId, status, body);
    return { success: false, status, data: body, error: err.message };
  }
};

const uploadBilledTransaction = (payload) => callPine(process.env.PINE_UPLOAD_PATH, 'post', payload);
const getCloudBasedTxnStatus = (payload) => callPine(process.env.PINE_GETSTATUS_PATH, 'post', payload);
const cancelTransaction = (payload) => callPine(process.env.PINE_CANCEL_PATH, 'post', payload);
const voidTransaction = (payload) => callPine(process.env.PINE_UPLOAD_PATH, 'post', payload);
const forceCancelTransaction = (payload) => callPine(process.env.PINE_FORCE_CANCEL_PATH, 'post', payload);

module.exports = {
  uploadBilledTransaction,
  getCloudBasedTxnStatus,
  cancelTransaction,
  voidTransaction,
  forceCancelTransaction,
  callPine
};
