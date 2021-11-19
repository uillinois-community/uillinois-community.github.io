module.exports = eleventyConfig => {


  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("pdf");

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