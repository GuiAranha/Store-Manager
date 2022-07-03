const { expect } = require("chai");
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
});
