# OmniTradeJS

Omni Layer DEX trading using a Node.JS Omni RPC client

## Setup

1. Install latest stable `node` and `npm`
1. Install npm packages: `$ npm install`

## Configure your Omni Core server

There are a few `bitcoin.conf` settings that are necessary to run these tests.

1. Run on the Bitcoin TestNet:

     testnet=1


1. Tell Bitcoin/OmniCore to accept JSON-RPC commands.:

    server=1

1. Set a username and password for RPC:

    rpcuser=test-username-goes-here
    rpcpassword=test-password-goes-here

## Configure your client

1. Copy the sample configuration: `$ cp sample-configuration.json configuration.json`
1. Edit `configuration.json` and set the correct RPC username and password

## Run OmniTradeJS API ##
```sh
$ npm run start
```

## OmniTradeJS API

Node.js API for communicating with OmniCore platform

### Get new address

**Type:** [GET]

**URL:** /omniclient/getnewaddress

**Result:**
           
    { 
       "address": "1Dyj7vHqZB2uiU6f1oqFxmAzBd28Kfkqxf"
    }

### Get balance for address

**Type:** [GET]

**URL:** /omniclient/getbalance

**Query:**

    address: 17YT9xSTz2eCni6sVrCjcfMiDMvErWF5mB | type: String | required
    propertyId: 31 | type: String | required

**Result:**

    {
       "balance": "658.71177506",
       "reserved": "0.00000000",
       "frozen": "0.00000000"
    }
  
### Get all balances for address

**Type:** [GET]

**URL:** /omniclient/getallbalancesforaddress

**Query:**

    address: 17YT9xSTz2eCni6sVrCjcfMiDMvErWF5mB | type: String | required

**Result:**

    [
        {
            "propertyid": 31,
            "name": "TetherUS",
            "balance": "1538.71177506",
            "reserved": "0.00000000",
            "frozen": "0.00000000"
        }
    ]
  
### Send tether from address to address

**Type:** [POST]

**URL:** /omniclient/sendtether

**Body:**

    address1: 1LVV6WWENrAwk4coEh2kv5yGRvZFGNGJu6 | type: String | required
    address2: 1PUWNB7kPQwBHKu7fghiyzuCVqc1Xv51N6 | type: String | required
    id: 31 | type: Integer | required
    amount: 1 | type: String | required

**Result:**

    "4391549079de6f2bb7eecb24641ba7ad5c6ad29e50addddc72dbd2cb0c76d0e3"

## Run QuickReadTests

These tests will make read-only calls via RPC to make sure that the Node Omni RPC client can
connect to the Omni Core server.

```sh
$ node QuickReadTests.js
```

## Run OmniTests

These tests will spend Bitcoin to make Omni DEX trades. They are still a work in progress. Proceed
with caution.

```sh
$ node OmniTests.js
```