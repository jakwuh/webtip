const $ = GLOBAL_JQUERY_NAME;
const gitTag = 'v' + VERSION;

if (FEATURES.PRERENDER) {
  console.log('Prerender is enabled');
}

if (FEATURES.ANIMATIONS) {
  console.log('Animations is enabled');
}

if (FEATURES.ADMIN.ENABLED) {
  console.log('Admin is enabled');
}
