const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const UserModel = require('../../models/User');

module.exports = {
    register: async (req, res) => {
        const { user } = req.body;
        if (!Object.keys(user).length) {
            res.status(422).send({
                error: 'You must to pass any data',
            });
        }

        try {
            const alreadyExists = await UserModel.findOne({ email: user.email });
            if (alreadyExists) {
                res.status(400).send({
                    error: `The email ${user.email} is already in use, try to login`
                });
            };
            const BCRYPT_SALT_ROUNDS = 10;
            const encryptedPassowrd = await bcrypt.hashSync(user.password, BCRYPT_SALT_ROUNDS);
            const { _doc: registeredUser } = await UserModel.create({
                ...user,
                password: encryptedPassowrd
            });

            res.send({
                status: "success",
                message: "User created successfully!",
                data: {
                    ...registeredUser
                }
            });
        }
        catch (e) {
            res.status(500).send({
                error: `${e}`
            });
        }
    },
    login: async (req, res) => {
        const { user } = req.body;
        if (!Object.keys(user).length) {
            res.status(422).send({
                error: 'You must to pass any data',
            });
        };

        const { email, password } = user;
        const actualUser = await UserModel.findOne({ email }).exec();
        if (!actualUser) {
            res.status(400).send({
                error: `The email ${user.email} does not exists in database`
            });
        }
        bcrypt.compare(password, '')
            .then((response) => {
                if (!response) {
                    res.status(500).send({
                        user: null,
                        auth: false,
                        message: 'The password are incorrect'
                    });
                };

                const { _doc: userData } = actualUser;
                const { _id: id } = userData;
                const token = jwt.sign({ id },
                    process.env.SECRET, {
                    expiresIn: 3000
                });
                res.status(200).send({
                    user: { ...actualUser._doc },
                    auth: true,
                    token,
                });
            })
            .catch((error) => {
                res.status(500).send({
                    user: null,
                    auth: false,
                    error,
                    message: 'Internal server error'
                });
            });
    },
};