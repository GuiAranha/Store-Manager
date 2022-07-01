const { expect } = require("chai");
const sinon = require("sinon");
const productsModel = require("../../models/productsModel");
const productsService = require("../../services/productsServices");

describe('Testes de productsService', () => {
  describe('Verifica funcao getProducts', () => {
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

    beforeEach(async () => sinon.stub(productsModel, 'getProducts').resolves(products));

    afterEach(async () => productsModel.getProducts.restore());

    it('Deve retornar um array', async () => {
      const response = await productsService.getProducts();
      expect(response).to.be.a('array');
    });
  });

  describe('Verifica funcao getProductById', () => {
    describe('Verifica um produto existente', () => {
      const product = [
        {
          id: 1,
          name: "Martelo de Thor",
        },
      ];

      beforeEach(
        async () =>
          await sinon.stub(productsModel, 'getProductById').resolves(product)
      );

      afterEach(async () => await productsModel.getProductById.restore());

      it('Deve retornar um array', async () => {
        const response = await productsService.getProductById(1);
        expect(response).to.be.a('array');
      });

      it('Deve retornar um array de objeto, com chave id e name', async () => {
        const response = await productsService.getProductById(1);
        expect(response).to.deep.equal([{
          id: 1,
          name: "Martelo de Thor",
        }]);
      });
    });

    describe('Verifica um produto inexistente', () => {
      const product = [{}];

      beforeEach(
        async () =>
          await sinon.stub(productsModel, "getProductById").resolves(product)
      );

      afterEach(async () => await productsModel.getProductById.restore());

      it('Deve retornar um objeto', async () => {
        const response = await productsService.getProductById(1);
        expect(response).to.be.a('array');
      });
    });
  });


  describe("Verifica funcao newProduct", () => {
    describe("Insere produto com nome irregular", () => {
      it("Nao pode estar vazio", async () => {
        const { code, message } = await productsService.newProduct('');
        expect(code).to.be.equal(400);
        expect(message).to.be.equal('"name" is required');
      });

      it('Deve ter no minimo 5 caracteres', async () => {
        const { code, message } = await productsService.newProduct('test');
        expect(code).to.be.equal(422);
        expect(message).to.be.equal('"name" length must be at least 5 characters long');
      });
    });

    describe('Verifica um produto cadastrado com sucesso', () => {
      const product = {
        id: 1,
        name: 'newProduct',
      };

      beforeEach(
        async () =>
          await sinon.stub(productsModel, 'newProduct').resolves(product)
      );

      afterEach(async () => await productsModel.newProduct.restore());

      it('Deve retornar corretamente o produto', async () => {
        const response = await productsService.newProduct(1);
        expect(response).to.be.a('object');
      });
    });
  });
});
