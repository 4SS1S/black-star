export const Legends = {
  starting: "STARTING",
  error: "ERROR",
  file_not_found: "",
  COMMAND_LINE: "COMMAND_LINE"
};

function getEnvLocale(): String {
  const env = process.env;

  return env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE;
}

export default async function Lang(legend: String): Promise<String> {
  console.log(getEnvLocale());

  const lang = await import("./en");

  console.log(lang.default.STARTING);

  return lang.default.ERROR.FILE_NOT_FOUND;
}
