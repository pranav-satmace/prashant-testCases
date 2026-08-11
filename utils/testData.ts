// utils/testData.ts
// सर्व static test data इथे ठेवला आहे, जेणेकरून बदल करायचा असल्यास फक्त इथेच बदलावा लागेल.

export const TestData = {
  baseUrl: 'https://test-vartul.satmace.com/login/',

  credentials: {
    username: 'Prashant@satmace.com',
    password: 'Satma@201',
  },

  workOrder: {
    warehouse: 'Panvel Collection Warehouse',
    outputSku: 'Bale Final',
    outputSkuOption: 'Bale Final | Bale',
    bom: 'Automation BOM',
    quantity: '500',
    machine: 'Process Machine',
  },

  batch: {
    userName: 'Prashant Mane',
    lotNumber: 'LOT_PM_001',
    bin: 'QR BIN',

    inputSku1: {
      searchTerm: 'Bale B',
      optionLabel: 'Bale B | Test01 | Bale',
    },
    inputSku2: {
      searchTerm: 'Bale L',
      optionLabel: 'Bale L | Test01 | Loose',
    },
    outputSku: {
      searchTerm: 'Bale Final',
      optionLabel: 'Bale Final | Test01 | Bale',
    },

    lot1: {
      grossQuantity: '220',
      packagedQuantity: '20',
    },
    lot2: {
      grossQuantity: '330',
      packagedQuantity: '30',
    },
  },
};