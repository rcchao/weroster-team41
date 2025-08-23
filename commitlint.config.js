module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', [
      'auth',
      'api',
      'db',
      'dashboard',
      'my-roster',
      'team-roster',
      'leave-requests',
      'view-team',
      'profile',
      'notifications',
      'open-shifts',
    ]],
  },
};