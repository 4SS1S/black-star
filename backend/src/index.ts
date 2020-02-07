import App from "./App";
import CommandLine from "./cln";

if (!process.argv.includes("-cl")) {
  new App();
  console.log(`start proccess running into: ${process.platform} kernel`);
} else {
  new CommandLine();
}
