const { expect } = require("chai");
const { date } = require("joi");
const sinon = require("sinon");
const conn = require("../../models/connection");
const salesModel = require("../../models/salesModel");

describe('Testes de salesModel', () => {
  describe('Verifica funcao createSale', () => {
    const sale = [
      {
        insertId: 1,
      },
    ];

    beforeEach(async () => await sinon.stub(conn, 'execute').resolves(sale));

    afterEach(async () => await conn.execute.restore());

    it('Deve retornar um objeto', async () => {
      const response = await salesModel.createSales();
      expect(response).to.be.a('object');
    });
    it('Deve retornar um objeto com id', async () => {
      const response = await salesModel.createSales();
      expect(response).to.deep.equal({ id: 1 });
    });
  });

  describe('Verifica funcao newSale', () => {
    const sale = [
      {
        insertId: 1,
      },
    ];

    beforeEach(async () => await sinon.stub(conn, 'execute').resolves(sale));

    afterEach(async () => await conn.execute.restore());

    it('Deve retornar um objeto', async () => {
      const response = await salesModel.newSale(1, 2, 3);
      expect(response).to.be.a('object');
    });

    it('Deve retornar um objeto com id', async () => {
      const response = await salesModel.newSale(1, 2, 3);
      expect(response).to.deep.equal({ id: 1 });
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

    beforeEach(async () => await sinon.stub(conn, 'execute').resolves(sale));

    afterEach(async () => await conn.execute.restore());

    it("Deve retornar um objeto", async () => {
      const response = await salesModel.getSales();
      expect(response).to.be.a('object');
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

    beforeEach(async () => await sinon.stub(conn, 'execute').resolves(sale));

    afterEach(async () => await conn.execute.restore());

    it("Deve retornar um objeto", async () => {
      const response = await salesModel.getSaleById(1);
      expect(response).to.be.a('object');
    });
  });
});
