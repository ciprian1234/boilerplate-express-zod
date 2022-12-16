# (Runtime validation + typescript + api documentation) made easier

<br />
<br />

# Un scurt story a problemei

## API validation with Joi:

```javascript
const Joi = require('joi');

module.exports = {
  getById: {
    params: Joi.object({
      skillId: Joi.number().integer().required(),
    }),
    query: Joi.object({
      language: Joi.string().length(2).default('fr'),
      withlss: Joi.bool().default(false),
    }),
  },
  getWithPagination: {
    query: Joi.object({
      language: Joi.string().length(2).required(),
      businessUnit: Joi.string().min(1).max(30),
      deptartament: Joi.string().min(0).max(100),
      page: Joi.number().integer().min(1),
      limit: Joi.number().integer().min(2).max(100),
    }),
  },
  create: {
    body: Joi.object({
      label: Joi.string().min(5).max(100).required(),
      description: Joi.string().min(1).max(1000).required(),
      businessUnit: Joi.string().min(1).max(30).required(),
      deptartament: Joi.string().min(0).max(100),
    }),
  },
};

// routes:
router.get('/skills/:id', validate(v.getById), controller.getSkillById);
router.get('/skills', validate(v.getWithPagination), controller.getSkillsWithPagination);
router.post('/skills', validate(v.create), controller.createSkill);
```

<br />
<br />

## First documentation attempt: Swagger-jsdoc

Swagger jsdoc example:

```javascript
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users.
 *     description: Retrieve a list of users from. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 */
```

<br />
<br />

### Second attempt: express-jsdoc-swagger (https://brikev.github.io/express-jsdoc-swagger-docs/)

```javascript
/**
 * A skill entity
 * @typedef {object} Skill
 * @property {integer} id.required - skill id
 * @property {string} label.required - skill value
 * @property {string} description.required - skill description
 * @property {string} businessUnit.required - skill business unit
 * @property {string} departament.required - skill departament
 *
 */

/**
 * Response from get skills path with pagination
 * @typedef {object} GET_Skills_Response
 * @property {array<Skill>} data.required - skills array
 * @property {Pager} pager.required - pager object
 *
 */

/**
 * GET /skills
 * @summary Get all skills
 * @description Get all available skills with pagination
 * @tags skills
 * @param {integer} language.query.required - skill translation language
 * @param {integer} businessUnit.query - skill business unit
 * @param {integer} departament.query - skill departament
 * @param {integer} page.query - page
 * @param {integer} limit.query - page limit, default is 10
 * @return {GET_Skills_Response} 200 - Success response
 *
 */
router.get('/skills', validate(skillsValidation.getSkills), skillsController.getSkills);
```

<br />
<br />

## Problema 1

- Aproximativ aceleasi informatii se repeta in documentatie si in validare
- Un change in api specs trebuie de aseamea propagat in mai multe locuri: validare/documentatie/interfete typescript...

## Problema 2 (interfetele typescript si validare la runtime)

- typescript util doar in development, dupa ce codul este "build-uit", typescript nu mai exista

<br />
<br />

## Solutie:

- show example1 (focused on validation + typescript interfaces)
- show example2 (focused more on documentation)

<br />
<br />

# Refs:

- https://github.com/colinhacks/zod
- https://github.com/asteasolutions/zod-to-openapi
