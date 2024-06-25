import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('blog_app', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
