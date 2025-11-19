const pineService = require('../services/pineService');
const model = require('../models/transactionModel');

const upload = async (req, res) => {
  try {
    const payload = req.body || {};

    const frontendRequestId = await model.insertFrontendRequest('upload', payload);

    const pineResp = await pineService.uploadBilledTransaction(payload);

    // Store txn reference if available
    if (
      pineResp.success && 
      pineResp.data && 
      pineResp.data.PlutusTransactionReferenceID
    ) {
      await model.insertTxnIndex(
        payload.TransactionNumber || null,
        String(pineResp.data.PlutusTransactionReferenceID)
      );
    }

    await model.insertServerResponse(
      frontendRequestId,
      pineResp.status || 500,
      pineResp.data || { error: pineResp.error }
    );

    const statusToReturn =
      pineResp.status >= 200 && pineResp.status < 300 ? 200 : 500;

    return res
      .status(statusToReturn)
      .json(pineResp.data || { error: pineResp.error });

  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({
      error: 'Internal Server Error',
      details: err.message
    });
  }
};

const getStatus = async (req, res) => {
  try {
    const payload = req.body || {};

    const frontendRequestId = await model.insertFrontendRequest('status', payload);

    const pineResp = await pineService.getCloudBasedTxnStatus(payload);

    await model.insertServerResponse(
      frontendRequestId,
      pineResp.status || 500,
      pineResp.data || { error: pineResp.error }
    );

    const statusToReturn =
      pineResp.status >= 200 && pineResp.status < 300 ? 200 : 500;

    return res
      .status(statusToReturn)
      .json(pineResp.data || { error: pineResp.error });

  } catch (err) {
    console.error('GetStatus error:', err);
    return res.status(500).json({
      error: 'Internal Server Error',
      details: err.message
    });
  }
};

const cancel = async (req, res) => {
  try {
    const payload = req.body || {};

    const frontendRequestId = await model.insertFrontendRequest('cancel', payload);

    const pineResp = await pineService.cancelTransaction(payload);

    await model.insertServerResponse(
      frontendRequestId,
      pineResp.status || 500,
      pineResp.data || { error: pineResp.error }
    );

    const statusToReturn =
      pineResp.status >= 200 && pineResp.status < 300 ? 200 : 500;

    return res
      .status(statusToReturn)
      .json(pineResp.data || { error: pineResp.error });

  } catch (err) {
    console.error('Cancel error:', err);
    return res.status(500).json({
      error: 'Internal Server Error',
      details: err.message
    });
  }
};

const voidTransaction = async (req, res) => {
  try {
    const payload = req.body || {};

    const frontendRequestId = await model.insertFrontendRequest('void', payload);

    const pineResp = await pineService.voidTransaction(payload);

    await model.insertServerResponse(
      frontendRequestId,
      pineResp.status || 500,
      pineResp.data || { error: pineResp.error }
    );

    const statusToReturn =
      pineResp.status >= 200 && pineResp.status < 300 ? 200 : 500;

    return res
      .status(statusToReturn)
      .json(pineResp.data || { error: pineResp.error });

  } catch (err) {
    console.error('Void error:', err);
    return res.status(500).json({
      error: 'Internal Server Error',
      details: err.message
    });
  }
};

const forceCancel = async (req, res) => {
  try {
    const payload = req.body || {};

    const frontendRequestId = await model.insertFrontendRequest('forceCancel', payload);

    const pineResp = await pineService.forceCancelTransaction(payload);

    await model.insertServerResponse(
      frontendRequestId,
      pineResp.status || 500,
      pineResp.data || { error: pineResp.error }
    );

    const statusToReturn =
      pineResp.status >= 200 && pineResp.status < 300 ? 200 : 500;

    return res
      .status(statusToReturn)
      .json(pineResp.data || { error: pineResp.error });

  } catch (err) {
    console.error('ForceCancel error:', err);
    return res.status(500).json({
      error: 'Internal Server Error',
      details: err.message
    });
  }
};

module.exports = {
  upload,
  getStatus,
  cancel,
  voidTransaction,
  forceCancel
};