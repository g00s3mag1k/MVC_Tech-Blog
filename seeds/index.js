const seedUsers = require('./users');
const seedPosts = require('./postSeeds');
const seedComments = require('./commentSeeds');
const sequelize = require('../config/connection');

const seedAll = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('\nDATABASE SYNCED\n');

        await seedUsers();
        console.log('\nUSERS SEEDED\n');

        await seedPosts();
        console.log('\nPOSTS SEEDED\n');

        await seedComments();
        console.log('\nCOMMENTS SEEDED\n');

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAll();


// const seedUsers = require('./users');
// const seedPosts = require('./postSeeds');
// const seedComments = require('./commentSeeds');

// const sequelize = require('../config/connection');

// const seedAll = async () => {
//     await sequelize.sync({ force: true });
//     console.log('\nDATABASE SYNCED\n');
//     await seedUsers();
//     console.log('\nUSERS SEEDED\n');
//     await seedPosts();
//     console.log('\nPOSTS SEEDED\n');
//     await seedComments();
//     console.log('\nCOMMENTS SEEDED\n');
  
//     process.exit(0);
// };
  
// seedAll();