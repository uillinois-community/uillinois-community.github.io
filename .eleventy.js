module.exports = eleventyConfig => {


  /* Folders to deploy unchanged. */
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("examples"); 

  eleventyConfig.setTemplateFormats([
    "md",
    "njk"
  ]);

  eleventyConfig.setQuietMode(true);
  eleventyConfig.setWatchThrottleWaitTime(500); // local testing refresh time
  eleventyConfig.setUseGitIgnore(false); // using .eleventyignore

  return {
    dir: {
      input: ".",
      output: "_site"
    }
  }
};