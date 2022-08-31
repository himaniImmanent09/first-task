exports.username = "^[a-z_A-Z]+$";
exports.password = /^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).*$/;
exports.repeat_password = /^.*(?=.{6,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).*$/;
exports.min = 2;
exports.minPassword = 8;
exports.max = 30;
