//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./server');
let should = chai.should();

chai.use(chaiHttp);

/*
* Test the /GET route
*/
describe('/GET person', () => {
    it('it should GET all the Persons', (done) => {
        chai.request(server)
            .get('/person')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});

/*
  * Test the /POST route
  */
describe('/POST person', () => {
    it('it should create a new person', (done) => {
        let person = {
            name: "Some name",
            address: "Some very long long long address"
        }
        chai.request(server)
            .post('/person')
            .send(person)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name');
                res.body.should.have.property('address');
                done();
            });
    });
});

/*
  * Test the /GET/:id route
  */
describe('/GET/:id person', () => {
    it('it should GET a person by the given id', (done) => {
        var personId = 1;
        chai.request(server)
            .get('/person/' + personId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('address');
                res.body.should.have.property('id').eql(personId);
                done();
            });
    });
});

/*
 * Test the /PUT/:id route
 */
describe('/PATCH/:id person', () => {
    it('it should UPDATE a person given the id', (done) => {
        var personId = 2;
        var updatedPerson = { name: "Some updated name", address: "some updated address" };
        chai.request(server)
            .patch('/person/' + personId)
            .send(updatedPerson)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name').eql(updatedPerson.name);
                res.body.should.have.property('address').eql(updatedPerson.address);
                done();
            });
    });
});

/*
 * Test the /PUT/:id route
 */
describe('/DELETE/:id person', () => {
    it('it should DELETE a person given the id', (done) => {
        var personId = 3;
        chai.request(server)
            .delete('/person/' + personId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql("Person " + personId + " successfully deleted!");
                done();
            });
    });
});