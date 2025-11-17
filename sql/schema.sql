CREATE DATABASE IF NOT EXISTS pinelabs_proxy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pinelabs_proxy;

-- store every frontend request (incoming to our server)
CREATE TABLE IF NOT EXISTS frontend_requests (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  endpoint VARCHAR(100) NOT NULL,
  payload JSON NOT NULL,
  received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- store our server response to frontend 
CREATE TABLE IF NOT EXISTS server_responses (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  frontend_request_id BIGINT,
  response_status INT,
  response_body JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (frontend_request_id) REFERENCES frontend_requests(id) ON DELETE SET NULL
);

-- store PineLabs requests we send 
CREATE TABLE IF NOT EXISTS pinelabs_requests (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  request_type VARCHAR(100) NOT NULL, -- e.g., UploadBilledTransaction, GetCloudBasedTxnStatus
  payload JSON NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- store PineLabs responses
CREATE TABLE IF NOT EXISTS pinelabs_responses (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  pinelabs_request_id BIGINT,
  status INT,
  response_body JSON,
  received_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pinelabs_request_id) REFERENCES pinelabs_requests(id) ON DELETE SET NULL
);

-- Map PTRID and merchant txn number
CREATE TABLE IF NOT EXISTS txn_index (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  merchant_txn_number VARCHAR(255),
  plutus_txn_ref_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);