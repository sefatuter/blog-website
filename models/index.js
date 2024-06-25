import sequelize from '../config/database.js';
import Post from './post.js';
import User from './user.js';

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Unable to synchronize database:', error);
  }
};

syncDatabase();

export { Post, User };
