document.getElementById('donate').addEventListener('click', pay);

function pay() {
  var supportedInstruments = [{
    supportedMethods: 'basic-card',
    data: {
      supportedNetworks: ['visa', 'mastercard', 'amex', 'jcb',
        'diners', 'discover', 'mir', 'unionpay'],
      supportedTypes: ['credit', 'debit']
    }
  }];

  var details = {
    total: {
      label: 'Donation',
      amount: {
        currency: 'USD',
        value: '0.01'
      }
    },
    displayItems: [
      {
        label: 'Original donation amount',
        amount: {
          currency: 'USD',
          value: '0.01'
        }
      }
    ]
  };

  var options = {
  };

  try {
    var request = new PaymentRequest(supportedInstruments, details, options);
    // Add event listeners here.
    // Call show() to trigger the browser's payment flow.
    request.show().then(function(instrumentResponse) {
      console.dir(instrumentResponse)
    })
      .catch(function(err) {
        console.error(err);
      });
  } catch (e) {
    console.error(err);
  }

}

function sendPaymentToServer(instrumentResponse) {
  instrumentResponse.complete('success')
    .then(function() {
      document.getElementById('result').innerHTML = instrumentToJsonString(instrumentResponse);
    })
    .catch(function(err) {
      console.error(err);
    });
}

function instrumentToJsonString(instrument) {
  let details = instrument.details;
  details.cardNumber = 'XXXX-XXXX-XXXX-' + details.cardNumber.substr(12);
  details.cardSecurityCode = '***';

  return JSON.stringify({
    methodName: instrument.methodName,
    details: details,
  }, undefined, 2);
}
