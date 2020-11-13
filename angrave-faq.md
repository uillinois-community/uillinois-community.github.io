On November 12, 2020 Professor Angrave sent in these questions. Replies are in-line as bullet points below:

Hi githubsupport,

I’m CS faculty that uses git /GitHub extensively for both projects and classes.
Please can you answer the questions regarding the new U of I GitHub service? I’m excited to learn more about this!

Perhaps you can CC your responses to Rob Kooper, and Eric Shaffer and Dave Mussulman who I imgine will also be interested in these questions.
kooper@illinois.edu (NCSA), shaffer1@illinois.edu (CS) and mussulma@illinois.edu (EngrIT)  - who are BCC’d on this email.
I also suggest your responses might also be useful to include on
https://web.uillinois.edu/github as these questions relate to many potential faculty uses of this service. Thanks!

On the above URL, "The shared service is currently available to all IT Professionals and will be rolled out for Student and Faculty usage in winter 2020."
Is this date still accurate? Will you be supporting small medium large enrollment classes immediately, or just single small projects and single users?

* Yes the dates are accurate. Some courses have started using GitHub in Fall 2020, and we expect more in the spring.
* One thing that is still getting finalized (and has pushed the dates from Fall to Winter) is that student-facing GitHub organizations will have an extra one-time confirmation injected via Shibboleth on first login to acknowledge they are making an account in a third-party service. Courses that are testing prior to that need to get student consent/acknowledgement in some other method (like a Webtools or Google form).

Can we/should we use this for large CS courses e.g. my course, CS241 (e.g. 400 student repos inside a 'cs241-sp21') in SP20 or wait for the dust to settle? Github use is a critical piece of technology for the course, if there are potential outages and support delays in SP21, we’d prefer to until FA21

* That's entirely the course decision. I don't anticipate that outages or support delays would be a problem (this is github.com, not a new service propped up at Illinois) but you may have to adapt what you were doing with the on-premise GitHub Enterprise (provisioning, grading tools, etc.) Dave Mussulman is working with the CS instructional designers and a few faculty to early pilot what migrating from our local GHE to the cloud might best look like.
* The existing github-dev.cs.illinois.edu will stay as-is for Spring 2021 and it's fine to continue to use it there. How well our "pilot" goes over winter and spring 2021 will define the timeline for when we will encourage courses to transition (with support, guides, etc.)

What are the limits on repo sizes? Are they configurable by repo or by git org?
e.g. For CS241 we currently use a GitHub enterprise instance supported by EngrIT, that I will be deprecated once your service is available. We have one org per semester ‘cs241-fa20’ and use a script to create about ~400 repos (one per student in the class plus staff). We use the GitHub API script access rights pull student work for grading, and also push autograder  information and starting files for assignments & labs.
e.g. what will happen if a student accidently adds and pushes a 400MB log file?

* **Pete/Chris: Can you speak to any limits we have on the repos or orgs?**
* One change with the UIllinois GitHub service (vs our local git servers) is that making new organizations is not a self-service, instant process. There's emails and manual intervention needed on the AITS side, shibboleth integration configured, etc.
    * For that reason, we're encouraging courses to think about "bigger" organizations: like 'illinois-cs241' and labeling repos 'fa20-netid', or maybe having a small number of organizations (illinois-cs241-1) and cycling through them over semesters?
    * GitHub Teams can be used to show different collections (views/permissions) of repositories in an organization to help logically split a large organization, but we'll need to retool our thinking and tools to work with GitHub Teams.

I have another org for ClassTranscribe project, on GitHub.com, GitHub.com/ClassTranscribe
It may make sense to move it from github.com to UofI GitHub.

* AITS has a procedure for moving pre-existing GitHub organizations under the Illinois license. This is largely a behind the scenes/billing change and doesn't change the address or existing data in the organization, beyond adding in the SSO functionality and other license features.

Will UofI GitHub be supported for at least 5 years. Are there any plans/service agreements for end-of-life? E.g. will there be at least 1 year notice?

* **Pete?**

For scripting purposes which API version are you  providing?
What is the upgrade schedule?
What is the target availability?
Is the status monitored and displayed on a public status page?
Will planned service unavailability due to updates/upgrades be minimized during critical periods of the semester? E.g.weeks 0,1 of the semester and (especially), end of semester through to grade entry deadline?

Are automatic build actions (GitHub actions) supported?  Are the VM limits similar to builds on GitHub.com?
Can automatic build scripts (GitHub actions) interact with the Internet e.g. Pull and Push images to docker hub?

* The service is running on github.com, and as an organization owner you have access to pretty much everything there including APIs, Actions, etc. Status and availability is based on GitHub itself and Shibboleth. It's not really something AITS or the project groups control, but I don't anticipate this being a problem.

What are are lifetimes of github repos that are class related? Student owned? Faculty owned?

* That's up to the organization owner, I'd think. AITS doesn't have any plans to maintain repository life-cycles.

Is public github pages service enabled? Are they public? Will you serve both http and https page versions?

* Yes, based on the settings github.com has configured. It looks like it auto-redirects to https.

Will browsing of a repo require web users to login first?

* That depends on the access permissions of the repository and the organization.

I assume only U of I accounts are supported for authentication? i.e. this service should not be used if there are outside non-UofI collaborators?

* Everyone needs a GitHub account and that is the primary way that people interact with the service. The U of I accounts are more of a two-factor component: you login with your GitHub credentials, and when visiting a U of I protected repository you are prompted for the Illinois SSO signin.
* **Pete/Chris: I believe there is a way to enable external collaborators to have access without Illinois SSO, right?**

Are non-2FA machine accounts (e.g.for grading & automated processes) supported?

* SSH keys or [deploy keys](https://docs.github.com/en/free-pro-team@latest/developers/overview/managing-deploy-keys) might be a more effective way for automata versus independent machine accounts, since they would also need a github user.
    * **We should test that non-person AD accounts can access repositories, if configured to use them.**

Are GitHub authentication mechanisms also supported?

* Yes, layered in with the Illinois SSO. You can signin to GitHub, get GitHub 2FA (if configured), visit a U of I organization, get Shibboleth signed in, get Illinois Duo 2FA, and then access your stuff. In practice, because the GitHub login sessions are long (weeks?) and Shibboleth SSO sessions are sticky and don't reprompt if you've logged in recently elsewhere, using GitHub.com via the web doesn't seem too different than GitHub outside Illinois.
* [ssh keys must be blessed to work with SAML SSO](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/authorizing-an-ssh-key-for-use-with-saml-single-sign-on) first, but then those work like a normal SSH key without any of the 2FA prompting.

Can GitHub groups be tied to UofI AD groups?

* Not directly, but we're working on a process for synchronizing authorization groups in Illinois with GitHub Teams. We're hoping that middleware service is something we can write once and share across all of the projects. We're still exploring this solution.
* In the meantime, bulk permission management via the APIs is a way to implement that and is available to organization owners.

I assume it is “blessed” for FEPRA (course) data e.g. a list of repos in an org represents student roster. What about other kinds of sensitive data?

* **Pete?**

Thanks,

Lawrence Angrave<br>
Teaching Professor, Department of Computer Science<br>
CITL Teaching Fellow<br>
University of Illinois at Urbana-Champaign (UIUC)<br>
T: 217 333 1424  E: angrave@illinois.edu<br>
