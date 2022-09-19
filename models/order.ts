import {
  Model,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../util/database";

class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {}

Order.init({}, { sequelize, tableName: "order" });

export default Order;
