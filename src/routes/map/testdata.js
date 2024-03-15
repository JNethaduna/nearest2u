export const testStores = [
  {
      _id:'1',
      name: 'Store 1',
      geometry: {
          type: 'Point',
          coordinates: [80.03944677117178, 6.821314369940506]
      },
      items: [
          { item: '1', quantity: 10 },
          { item:'2', quantity: 5 }
      ],
      owner: {
          nic: '123456789V',
          verified: true
      }
  },
  {

      _id: "2",
  
      name: "Store 2",
  
      geometry: {
  
        type: "Point",
  
        coordinates: [80.04204677117178, 6.821014369940506],
  
      },
  
      items: [{ item: "3", quantity: 8 }, { item: "4", quantity: 12 }],
  
      owner: {
  
        nic: "234567890W",
  
        verified: false,
  
      },
  
    },
  
    {
  
      _id: "3",
  
      name: "Store 3",
  
      geometry: {
  
        type: "Point",
  
        coordinates: [80.0408467711717, 6.821614369940506],
  
      },
  
      items: [{ item: "5", quantity: 7 }, { item: "6", quantity: 9 }],
  
      owner: {
  
        nic: "345678901X",
  
        verified: true,
  
      },
  
    },
  
  ];


export const test = [

  {

    geometry: {

      type: 'Point',

      coordinates: [80.04144677117178, 6.821314369940506]

    }

  },

  {

    geometry: {

      type: 'Point',

      coordinates: [80.04164677117178, 6.821514369940506]

    }

  },

  {

    geometry: {

      type: 'Point',

      coordinates: [80.0412467711717, 6.821114369940506]

    }

  }

];
