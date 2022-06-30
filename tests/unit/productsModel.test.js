const { expect } = require('chai');
const sinon = require('sinon');
const conn = require('../../models/connection');
const productsModel = require('../../models/productsModel');

describe('Testes de productsModel', () => {

  describe('Verifica se acha todos produtos', () => {


    const products = [
      {
        id: 1,
        name: "Martelo de Thor",
      },
      {
        id: 2,
        name: "Traje de encolhimento",
      },
    ];

    beforeEach(async () => await sinon.stub(conn, 'execute').resolves(products));

    afterEach(async () => await conn.execute.restore());

    it('Deve retornar um objeto', async () => {
      const response = await productsModel.getProducts();
      expect(response).to.be.a('object');
    });
  })

  describe('Verifica se acha produtos por id', () => {
    describe('Verifica um produto existente', () => {
      const product = [
        {
          id: 1,
          name: "Martelo de Thor",
        }];
  
      beforeEach(async () => await sinon.stub(conn, 'execute').resolves(product));
  
      afterEach(async () => await conn.execute.restore());
  
      it("Deve retornar um objeto", async () => {
        const response = await productsModel.getProductById(1);
        expect(response).to.be.a('object');
      });

      it("Deve retornar um objeto, com chave id e name", async () => {
        const response = await productsModel.getProductById(1);
        expect(response).to.deep.equal({
          id: 1,
          name: "Martelo de Thor",
        });
      });
    });

    describe('Verifica um produto inexistente', () => {
      const product = [{}];

      beforeEach(async () => await sinon.stub(conn, 'execute').resolves(product));

      afterEach(async () => await conn.execute.restore());

      it('Deve retornar um objeto', async () => {
        const response = await productsModel.getProductById(1);
        expect(response).to.be.a('object');
      });
    });
  });
})