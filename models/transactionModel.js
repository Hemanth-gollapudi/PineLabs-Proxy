const pool = require('../config/db');

const insertFrontendRequest = async (endpoint, payload) => {
  const [res] = await pool.query(
    'INSERT INTO frontend_requests (endpoint, payload) VALUES (?, ?)',
    [endpoint, JSON.stringify(payload)]
  );
  return res.insertId;
};

const insertServerResponse = async (frontendRequestId, status, responseBody) => {
  const [res] = await pool.query(
    'INSERT INTO server_responses (frontend_request_id, response_status, response_body) VALUES (?, ?, ?)',
    [frontendRequestId || null, status, JSON.stringify(responseBody || {})]
  );
  return res.insertId;
};

const insertPineRequest = async (requestType, payload) => {
  const [res] = await pool.query(
    'INSERT INTO pinelabs_requests (request_type, payload) VALUES (?, ?)',
    [requestType, JSON.stringify(payload)]
  );
  return res.insertId;
};

const insertPineResponse = async (pineRequestId, status, responseBody) => {
  const [res] = await pool.query(
    'INSERT INTO pinelabs_responses (pinelabs_request_id, status, response_body) VALUES (?, ?, ?)',
    [pineRequestId || null, status || null, JSON.stringify(responseBody || {})]
  );
  return res.insertId;
};

const insertTxnIndex = async (merchantTxnNumber, plutusTxnRefId) => {
  const [res] = await pool.query(
    'INSERT INTO txn_index (merchant_txn_number, plutus_txn_ref_id) VALUES (?, ?)',
    [merchantTxnNumber || null, plutusTxnRefId || null]
  );
  return res.insertId;
};

module.exports = {
  insertFrontendRequest,
  insertServerResponse,
  insertPineRequest,
  insertPineResponse,
  insertTxnIndex
};
