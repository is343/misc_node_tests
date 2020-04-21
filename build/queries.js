"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_promise_1 = __importDefault(require("pg-promise"));
var pgp = pg_promise_1.default();
var pool = {
    query: function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
        }
    }
};
var connection = {
    host: 'localhost',
    database: 'relay',
    port: 5432
};
var db = pgp(connection);
function handleQueryError(response, error) {
    var errorMessage = "ERROR: " + error.name + " - " + error.message;
    response.status(500).json(errorMessage);
}
function getUser(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var id, alreadyExistsError_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = request.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, db.none('SELECT * FROM "user" WHERE keycloak_id = $1', [id])];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    alreadyExistsError_1 = _a.sent();
                    return [2 /*return*/, handleQueryError(response, alreadyExistsError_1)];
                case 4:
                    response.status(200).json('users');
                    return [2 /*return*/];
            }
        });
    });
}
var getUsers = function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var users, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.none('SELECT * FROM "user" WHERE keycloak_id = $1', [
                        "b4cc306a-c702-407b-95f5-e93b9a2cb8a8"
                    ])];
            case 1:
                users = _a.sent();
                // success
                console.log(users);
                response.status(200).json(users);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                // error
                console.log(e_1);
                handleQueryError(response, e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getUserById = function (request, response) {
    return getUser(request, response);
    var id = parseInt(request.params.id);
    try {
        pool.query('SELECT * FROM "user" WHERE id = $1', [id], function (error, results) {
            if (error) {
                return handleQueryError(response, error);
            }
            response.status(200).json(results.rows);
        });
    }
    catch (err) {
        return handleQueryError(response, err);
    }
};
var createUser = function (request, response) {
    var _a = request.body, name = _a.name, email = _a.email;
    // COPY public."user" (id, created_at, updated_at, telegram_id, citizenship, native_language, email, keycloak_id, uuid, username, dialect, facebook_id) FROM stdin;
    // 23235	2018-06-05 05:25:43.461623	2018-06-05 05:25:43.461623	505695961	unknown	unknown	\N	\N	e1abaed9-e5ea-4512-a01a-1573186e3242	shenluo	\N	\N
    pool.query('INSERT INTO user (id, created_at, updated_at, telegram_id, citizenship, native_language, email, keycloak_id, uuid, username, dialect, facebook_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', [
        23235,
        "2018-06-05 05:25:43.461623",
        "2018-06-05 05:25:43.461623",
        505695961,
        "unknown",
        "unknown",
        null,
        null,
        "e1abaed9-e5ea-4512-a01a-1573186e3242",
        "shenluo",
        null,
        null
    ], function (error, results) {
        // pool.query('INSERT INTO user (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
        if (error) {
            throw error;
        }
        console.log(results);
        response.status(201).send("User added with ID: " + results.insertId);
    });
};
var updateUser = function (request, response) {
    var id = parseInt(request.params.id);
    var _a = request.body, name = _a.name, email = _a.email;
    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id], function (error, results) {
        if (error) {
            throw error;
        }
        response.status(200).send("User modified with ID: " + id);
    });
};
var deleteUser = function (request, response) {
    var id = parseInt(request.params.id);
    pool.query('DELETE FROM users WHERE id = $1', [id], function (error, results) {
        if (error) {
            throw error;
        }
        response.status(200).send("User deleted with ID: " + id);
    });
};
module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser
};
