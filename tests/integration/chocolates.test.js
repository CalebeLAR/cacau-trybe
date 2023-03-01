const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');
const output = require('../../src/files/cacauTrybeFileMock.js');
const { expect } = chai;
chai.use(chaiHttp);


describe('Usando o método GET em /chocolates', async function () {
  it('Retorna a lista completa de chocolates!', async function () {
    const response = await chai.request(app).get('/chocolates');
    
    expect(response.status).to.be.equals(200);
    expect(response.body.chocolates).to.be.deep.equal(output.chocolates);
  });
});