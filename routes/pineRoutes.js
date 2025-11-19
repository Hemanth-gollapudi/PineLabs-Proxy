const express = require('express');
const router = express.Router();

const pineController = require('../controllers/pineController');
const auth = require('../middleware/auth');
const validateBody = require('../middleware/validateBody');

router.post(
  '/upload',
  auth,
  validateBody([
    'TransactionNumber',
    'SequenceNumber',
    'AllowedPaymentMode',
    'Amount',
    'MerchantID',
    'SecurityToken',
  ]),
  pineController.upload
);

router.post(
  '/status',
  auth,
  validateBody([
    'MerchantID',
    'SecurityToken',
    'PlutusTransactionReferenceID'
  ]),
  pineController.getStatus
);

router.post(
  '/cancel',
  auth,
  validateBody([
    'MerchantID',
    'SecurityToken',
    'PlutusTransactionReferenceID',
    'Amount'
  ]),
  pineController.cancel
);

router.post(
  '/void',
  auth,
  validateBody([
    'TransactionNumber',
    'AllowedPaymentMode',
    'Clientid',
    'StoreID',
    'MerchantID',
    'SecurityToken',
    'TxnType',
    'OriginalPlutusTransactionReferenceID'
  ]),
  pineController.voidTransaction
);

router.post(
  '/force-cancel',
  auth,
  validateBody([
    'StoreID',
    'Clientid',
    'MerchantID',
    'SecurityToken',
    'PlutusTransactionReferenceID',
    'Amount'
  ]),
  pineController.forceCancel
);

module.exports = router;
