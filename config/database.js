import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('blog_app', 'root', 'mysql1234', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
