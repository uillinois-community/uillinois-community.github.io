---
layout: layout.njk
title: Illinois Community GitHub Course Use
---
[Back to Resources](..)

The Illinois GitHub service is vetted for course use. You can put course data into GitHub.com as long as it's protected and secured as you would expect student private data must be.

The https://github.com/uillinois-community/gitForCourses repository has information about various methods courses could use to leverage git for assignment distribution, collection, and grading.

**Using git and GitHub in your courses is not trivial.** We highly suggest that if you choose to use git in your course, you accept that "learning how to use git and github.com" must be a learning objective of the course. That includes teaching and supporting your students to use that environment.
* If you are only looking for a platform to allow homework upload and grading, GitHub might not be the best framework for you. [Canvas](https://canvas.illinois.edu/), [Gradescope](https://gradescope.com), or [PrairieLearn](https://www.prairielearn.org/) may be better platform choices if you don't want the complexity of teaching students git concepts like commits, merging, and push/pulls.

## Illinois Repo Creator Tool

Many Illinois courses are using an in-house developed web app to allow students to create their own repositories in a course organization. We call this the "repo creator tool" and it's been ported from github-dev.cs.illinois.edu to also work with github.com

See https://wiki.illinois.edu/wiki/display/CSID/GitHub+repo+creator+tool for more info about this app.
* The wiki may require an active VPN session to access (as of 6/10/22) and requires an Illinois login (but is available to all)

## Things that are different about GitHub versus the previous github-dev.cs.illinois.edu server

* GitHub uses `main` as the primary branch name for new repositories, versus the older `master` branch
* **Organizations should be re-used across semesters** as much as possible. This is different than github-dev.cs where each semester courses created a new organization. Because organization creation takes more effort with the Illinois github.com, our recommendation is to use a single organization per course (or shared between courses, like with the `illinois-cs-coursework` org)
* Especially when using multiple semesters worth of repositories in the same organization, we recommend using [GitHub Teams](https://docs.github.com/en/organizations/organizing-members-into-teams/about-teams) to organize access across different people and collections of repositories.
