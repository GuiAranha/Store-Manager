const { expect } = require("chai");
const sinon = require("sinon");
const salesController = require("../../controllers/salesController");
const salesServices = require("../../services/salesService");

describe("Testes de salesController", () => {
  const req = {};
  const res = {};
  const next = () => {};

  describe("Verifica funcao getProducts", () => {
    const sale = [
      {
        id: 1,
        itemsSold: [{
          productId: 1,
          quantity: 1,
        }],
      },
    ];

    beforeEach(async () => {
      await sinon.stub(salesServices, 'newSale').resolves(sale);
      res.status = sinon.stub().returns(res);
      req.json = sinon.stub().returns();
      req.body = [{ productId: 1, quantity: 1 }];
    });

    afterEach(async () => salesServices.newSale.restore());

    it("Verifica status quando sucesso", async () => {
      await salesController.newSale(req, res, next);
      expect(res.status.calledWith(201)).to.be.equal(true);
    });
  });
});
