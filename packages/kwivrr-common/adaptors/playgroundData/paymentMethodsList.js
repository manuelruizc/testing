const paymentMethodsList = {
  creditCards: [
    {
      id: 1,
      nameOnCard: 'Meghan Hendricks',
      lastFour: '3456',
      cardNumber: '1234 5678 9012 3456',
      expiration: '11/24',
      ccv: '937',
      type: {
        image: 'https://cdn.freebiesupply.com/logos/large/2x/visa-logo-png-transparent.png',
        label: 'Visa'
      },
      address: {
        name: 'Meghan Hendricks',
        line1: '123 W Main St.',
        line2: '',
        city: 'Centerville',
        state: 'Kanses',
        zipcode: '79301',
        aptNumber: ''
      }
    }
  ],
  bankAccounts: [
  ]

}

export default paymentMethodsList
