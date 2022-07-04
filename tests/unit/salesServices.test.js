const { expect } = require("chai");
const sinon = require("sinon");
const salesServices = require("../../services/salesService");
const salesModels = require("../../models/salesModel");

describe('Testes de productsService', () => {
  describe('Verifica funcao newSale', () => {
    describe('Verifica erro ao nao passar "quantity"', () => {
      const saleProductId = [{ productId: 1 }];

      it('Deve retornar um objeto', async () => {
        const response = await salesServices.newSale(saleProductId);
        expect(response).to.be.a('object');
      });

      it('Deve retornar erro', async () => {
        const response = await salesServices.newSale(saleProductId);
        const error = { code: 400, message: '"quantity" is required' };
        expect(response).to.deep.equal(error);
      });
    });

    describe('Verifica erro ao passar "quantity" negativo', () => {
      const saleNegative = [{ productId: 1, quantity: -1 }];

      it('Deve retornar um objeto', async () => {
        const response = await salesServices.newSale(saleNegative);
        expect(response).to.be.a('object');
      });

      it('Deve retornar erro', async () => {
        const response = await salesServices.newSale(saleNegative);
        const error = { code: 422, message: '"quantity" must be greater than or equal to 1' };
        expect(response).to.deep.equal(error);
      });
    });

    describe('Verifica erro ao nao passar "productId"', () => {
      const saleQuantity = [{ quantity: 1 }];

      it('Deve retornar um objeto', async () => {
        const response = await salesServices.newSale(saleQuantity);
        expect(response).to.be.a('object');
      });

      it('Deve retornar erro', async () => {
        const response = await salesServices.newSale(saleQuantity);
        const error = { code: 400, message: '"productId" is required'}
        expect(response).to.deep.equal(error);
      });
    });
  });

  describe('Verifica funcao getSales', () => {
    const sale = [
      {
        saleId: 1,
        date: '2022-07-04T15:56:30.000Z',
        productId: 1,
        quantity: 1,
      },
    ];

    beforeEach(async () => await sinon.stub(salesModels, 'getSales').resolves(sale));

    afterEach(async () => await salesModels.getSales.restore());

    it('Deve retornar um array', async () => {
      const response = await salesServices.getSales();
      expect(response).to.be.an('array');
    });
    it('Deve retornar um array com os itens informados', async () => {
      const response = await salesServices.getSales();
      expect(response).to.deep.equal([
        {
          saleId: 1,
          date: '2022-07-04T15:56:30.000Z',
          productId: 1,
          quantity: 1,
        },
      ]);
    });
  });

  describe('Verifica funcao getSaleById', () => {
    const sale = [
      {
        saleId: 1,
        date: '2022-07-04T15:56:30.000Z',
        productId: 1,
        quantity: 1,
      },
    ];

    beforeEach(
      async () => await sinon.stub(salesModels, 'getSaleById').resolves(sale)
    );

    afterEach(async () => await salesModels.getSaleById.restore());

    it("Deve retornar um array", async () => {
      const response = await salesServices.getSaleById(1);
      expect(response).to.be.an('array');
    });
    it("Deve retornar um array com os itens informados", async () => {
      const response = await salesServices.getSaleById(1);
      expect(response).to.deep.equal([
        {
          saleId: 1,
          date: '2022-07-04T15:56:30.000Z',
          productId: 1,
          quantity: 1,
        },
      ]);
    });
  });
});
