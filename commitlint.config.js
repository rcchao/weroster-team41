module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [
      2,
      "always",
      [
        "general",
        "auth",
        "api",
        "db",
        "dashboard",
        "my-roster",
        "team-roster",
        "requests",
        "view-team",
        "profile",
        "notifications",
        "open-shifts",
      ],
    ],
  },
}
