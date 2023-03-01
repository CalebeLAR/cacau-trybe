const fs = require('fs');
const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const app = require('../../src/app');

const { expect } = chai;
chai.use(chaiHttp);

const output = [
  { id: 1, name: 'Mint Intense', brandId: 1 },
  { id: 2, name: 'White Coconut', brandId: 1 },
  { id: 3, name: 'Mon Chéri', brandId: 2 },
  { id: 4, name: 'Mounds', brandId: 3 },
];

const mockFile = JSON.stringify({
  brands: [
    {
      id: 1,
      name: 'Lindt & Sprungli',
    },
    {
      id: 2,
      name: 'Ferrero',
    },
    {
      id: 3,
      name: 'Ghirardelli',
    },
  ],

  chocolates: [
    {
      id: 1,
      name: 'Mint Intense',
      brandId: 1,
    },
    {
      id: 2,
      name: 'White Coconut',
      brandId: 1,
    },
    {
      id: 3,
      name: 'Mon Chéri',
      brandId: 2,
    },
    {
      id: 4,
      name: 'Mounds',
      brandId: 3,
    },
  ],
});



describe('Usando o método GET em /chocolates', async function () {
  sinon.stub(fs.promises, 'readFile').resolves(mockFile);
  it('Retorna a lista completa de chocolates!', async function () {
    const response = await chai.request(app).get('/chocolates');

    expect(response.status).to.be.equals(200);
    expect(response.body.chocolates).to.be.deep.equal(output);
  });
});