
import { DataTypes } from 'sequelize'

export default(sequelize) => {
	return sequelize.define('role', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true,
			validate: {
				// We require usernames to have length of at least 3, and
				// only use letters, numbers and underscores.
				is: {
                    args: /^\w{3,}$/,
                    msg: "角色名要求至少3个字符"
                },

                // 自定义验证器
                // isEven(value) {
                //     if (value.length < 3)
                //         throw new Error(`角色名要求至少3个字符: ${value}`);
                // }
			},
            comment: "role name, 角色名"
		},
        privileges: {
			allowNull: false,
			type: DataTypes.STRING,
            comment: "所拥有的权限"
		}
	}, {
        // open timestamps
        timestamps: true,
        // dont use updatedAt
        // updatedAt: false,
    })
};