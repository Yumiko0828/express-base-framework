import { Method, Instance, Module, Route, Res, Req } from "../src/index";

// Routes
@Route({
  prefix: "/api",
})
class Main {
  @Method("GET", "/:name")
  greet(req: Req, res: Res) {
    const name = req.params.name;
    return res.send(`Hello, ${name}`);
  }
}

// Module
@Module({
  routes: [Main],
  errorHandler: (err, _req, res, _next) => {
    if (err) {
      return res.json({
        error: err,
      });
    }
  },
})
class myModule {}

// main
function main() {
  const app = Instance(myModule),
    port = 3000;

  app.listen(port, () => {
    app.emit("ready", port);
  });
}
main();
