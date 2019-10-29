import Express, { Router, Request, Response } from "express";
import { getConnection } from "typeorm";
import { User } from "./models/entities/User.entity";
import formidable from "formidable";
import { UserBio } from "./models/entities/UserBio.entity";
import { Roles } from "./models/entities/Roles.entity";
export const server = Express();

const router = Router();

router.get("/users", (req: Request, res: Response) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.json({ success: false, msg: "Bad Request" });
    const result = await getConnection()
      .getRepository(User)
      .findAndCount({ relations: ["userBio", "userBio.userRoles"] });

    if (!result) {
      return res.json({ success: false, msg: "no user found" });
    }
    res.json({ success: true, data: result[0], count: result[1] });
  });
});

router.get("/user", (req: Request, res: Response) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.json({ success: false, msg: "Bad Request" });
    console.log(req.query);
    const queries = req.query;
    const result = await getConnection()
      .getRepository(User)
      .findAndCount(queries);
    if (!result) {
      return res.json({ success: false, msg: "no user found" });
    }
    res.json({ success: true, data: result[0], count: result[1] });
  });
});

router.post("/user", (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    console.log(fields);
    if (err) return res.json({ success: false, msg: "Bad request" });
    const user = new User();
    user.email = fields.email as string;
    user.name = fields.name as string;
    const userBio = new UserBio();
    userBio.mobile = fields.phone as string;
    userBio.address = fields.address as string;
    userBio.dob = fields.dob as string;
    const conn = getConnection();
    if (fields.roles) {
      userBio.userRoles = await conn
        .getRepository(Roles)
        .find({ where: [{ role: fields.roles[0] },{role:fields.roles[1]}] });
    }
    user.userBio = userBio;
    console.log(user);
    // return res.json({ wait: "a minute" });
    const whatever = await conn.getRepository(User).save(user);
    res.json({ success: true, data: whatever, user: user });
  });
});

router.patch("/user", (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.json({ success: false, msg: "Bad request" });

    const conn = getConnection();
    const userRepo = conn.getRepository(User);
    const user = await userRepo.findOne({
      where: { id: fields.id as string },
      relations: ["userBio"]
    });
    user.email = fields.email as string;
    user.name = fields.name as string;
    // const userBio = new UserBio();NO!NO!!
    const userBio = user.userBio;
    fields.phone && (userBio.mobile = fields.phone as string);
    fields.address && (userBio.address = fields.address as string);
    fields.dob && (userBio.dob = fields.dob as string);

    // user.userBio = userBio;
    const whatever = userRepo.save(user);
    res.json({ success: true, data: whatever, user: user });
  });
});

server.use("/api", router);
