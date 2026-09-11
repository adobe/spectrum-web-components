"use strict";
export const createLanguageContext = (lang) => {
  let language = lang;
  const updateLanguage = (lang2) => {
    language = lang2;
    resolveLanguage();
  };
  const langResolvers = [];
  const createLangResolver = (event) => {
    langResolvers.push([
      event.detail.callback,
      () => langResolvers.splice(langResolvers.length, 1)
    ]);
    resolveLanguage();
  };
  const resolveLanguage = () => {
    langResolvers.forEach(
      ([resolver, unsubscribe]) => resolver(language, unsubscribe)
    );
  };
  return [createLangResolver, updateLanguage];
};
//# sourceMappingURL=helpers.js.map
