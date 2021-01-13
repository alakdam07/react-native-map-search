
const faker = require("faker");
export default [...Array(200)]
  .map(x => faker.name.findName())
