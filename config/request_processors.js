var persons = require('./persons');
const SUCCESS_CODE = 200;

module.exports = {
    "getAllPersons": (reqProcessorParams) => {
        // TODO: perform required actions

        // mock code: Please remove while actual implementation
        reqProcessorParams.code = SUCCESS_CODE;
        reqProcessorParams.data = persons;
        return reqProcessorParams;
    },
    "addPerson": (reqProcessorParams) => {
        // TODO: perform required actions

        // mock code: Please remove while actual implementation
        reqProcessorParams.code = SUCCESS_CODE;
        reqProcessorParams.requestBody.id = 7;
        reqProcessorParams.data = reqProcessorParams.requestBody;
        return reqProcessorParams;
    },
    "deletePerson": (reqProcessorParams) => {
        // TODO: perform required actions

        // mock code, Please remove while actual implementation
        reqProcessorParams.code = SUCCESS_CODE;
        reqProcessorParams.data = { message: "Person " + reqProcessorParams.queryParams.id + " successfully deleted!" };
        return reqProcessorParams;
    },
    "getPerson": (reqProcessorParams) => {
        // TODO: perform required actions

        // mock code, Please remove while actual implementation
        var _persons = persons.filter(person => person.id == reqProcessorParams.queryParams.id);
        reqProcessorParams.code = SUCCESS_CODE;
        reqProcessorParams.data = _persons[0];
        return reqProcessorParams;
    },
    "updatePerson": (reqProcessorParams) => {
        // TODO: perform required actions

        // mock code, Please remove while actual implementation
        var _persons = persons.filter(person => person.id == reqProcessorParams.queryParams.id);
        for (key in reqProcessorParams.requestBody) {
            _persons[0][key] = reqProcessorParams.requestBody[key];
        }
        reqProcessorParams.code = SUCCESS_CODE;
        reqProcessorParams.data = _persons[0];
        return reqProcessorParams;
    }
}

