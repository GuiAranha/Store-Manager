const { expect } = require("chai");
const sinon = require("sinon");
const productsController = require("../../controllers/productsController");
const productsService = require("../../services/productsServices");

describe("Testes de productsController", () => {

  const req = {};
  const res = {};
  const next = () => { };

  describe("Verifica funcao getProducts", () => {
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

    beforeEach(async () => {
      await sinon.stub(productsService, "getProducts").resolves(products);
      res.status = sinon.stub().returns(res);
      req.json = sinon.stub().returns();
    });

    afterEach(async () => productsService.getProducts.restore());

    it('Verifica status quando sucesso', async () => {
      await productsController.getProducts(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Verifica funcao getProductById', () => {
    const product = [
      {
        id: 1,
        name: "Martelo de Thor",
      },
    ];

    beforeEach(
      async () => {
        await sinon.stub(productsService, 'getProductById').resolves(product);
        req.params = '1';
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      }
    );

    afterEach(async () => await productsService.getProductById.restore());

    it('Verifica status quando sucesso', async () => {
      await productsController.getProductById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Verifica funcao newProduct', () => {
    const product = [
      {
        id: 1,
        name: 'newProduct',
      },
    ];

    beforeEach(async () => {
      await sinon.stub(productsService, 'newProduct').resolves(product);
      req.body = { name: 'newProduct' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(async () => await productsService.newProduct.restore());

    it('Verifica status quando sucesso', async () => {
      await productsController.newProduct(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
    });
  });

  describe("Verifica funcao updateProduct", () => {
    const product = [
      {
        id: 1,
        name: "updatedProduct",
      },
    ];

    beforeEach(async () => {
      await sinon.stub(productsService, "updateProduct").resolves(product);
      req.body = { name: "updatedProduct" };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(async () => await productsService.updateProduct.restore());

    it("Verifica status quando sucesso", async () => {
      await productsController.updateProduct(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});
