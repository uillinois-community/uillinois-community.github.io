---
layout: layout.njk
title: Illinois Community GitHub Authentication Help
---
[Back to Resources](..)

In this guide:
* [GitHub usernames and Illinois NetIDs](#github-usernames-and-illinois-netids)
* [Authenticating to GitHub](#authenticating-to-github)

## GitHub usernames and Illinois NetIDs

The Illinois GitHub service is not a separate server: it uses the same [github.com](https://github.com) as the rest of the Internet. You must create a GitHub username to use the service. The free account creation options are linked off the https://github.com homepage.
* You could create a new GitHub account specific to Illinois work, or use a pre-existing GitHub personal account.
    * If you can manage different projects in the same username, fewer GitHub accounts is likely easier.
    * The email you associate with the GitHub account **does not** need to be connected to Illinois.

GitHub secures Illinois-based organization access with the Illinois Single Sign On (SSO) where you are prompted for your NetID and NetID password. You'll see this second prompt if you're visiting an Illinois GitHub organization via the github.com website. In this way, Illinois authentication is more of a [two-factor authentication](https://authy.com/what-is-2fa/) where the GitHub authentication happens first, and then the Illinois authentication happens on top.
* Single Sign On may not prompt you every time if the previous authentication is still valid. There will be an authentication prompt for each different Illinois protected organization.
* Single Sign On may, on the first attempt, prompt the user to acknowledge they are using the GitHub terms of service. This was required by the CIO's Privacy Office.
* Access methods to GitHub that aren't the website (like git clients) will require going to the GitHub website (and Illinois authenticating) to 'bless' the SSH key or Personal Access Token to be usable with Illinois protected organizations. See below for more info.

All GitHub activity is tracked with the Github username. There are ways in the GitHub website (and programatically via API) where organization owners can see the mapping of GitHub username to Illinois NetID.




## Authenticating to GitHub

As of August 2021, GitHub no longer allows direct password authentication via git clients. See their
[2020 blog post](https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/)
for more background. This is a GitHub decision and is site-wide; it's not specific to Illinois or our
implementation.

There are at least three approaches for authenticating against GitHub, ordered here from easiest to hardest to implement:

- [Use an application that manages the Personal Access Token for you (GitHub Desktop)](#apps)
- [Authenticate with an ssh key instead of a password](#ssh)
- [Authenticate with a Personal Access Token instead of a password](#token)

<h3 id="apps">Use an application that manages the Personal Access Token for you (GitHub Desktop)</h3>

Coming from using a password to authenticate with git to the current GitHub environment, the easiest method is to use a git client that automatically requests, stores, and uses the tokens for you. This is transparent to the user because everything is managed by the git client and its tools.

[GitHub Desktop](https://desktop.github.com) is an example of a graphical and command line git client that handles the authentication for you. That is, it prompts you for the GitHub password (or routes to web authentication) where needed and stores the tokens for future use. [GitHub Desktop docs](https://docs.github.com/en/desktop)

GitHub includes other tools, like the GitHub CLI and Git Credential Manager that can be used to also store and use GitHub credentials. See [Caching your GitHub credentials in Git](https://docs.github.com/en/get-started/getting-started-with-git/caching-your-github-credentials-in-git) for more info.

<h3 id="ssh">Authenticate with an ssh key instead of a password</h3>

GitHub can be configured to use secure shell (SSH) for connecting to repositories and access. This typically involves creating a SSH public and private key pair and configuring your ssh environment to use that key with github.com, associating the SSH public key in your GitHub account, and configuring git to use ssh links as your GitHub `git remote` configurations.

Note that creating the ssh key and associating it with your ssh environment is not necessarily a GitHub activity. It's SSH configuration in your applications or computer and GitHub can be configured to use it. This is a traditional model of caching login credentials to use with GitHub before the Personal Access Tokens and GitHub specific credential managers were made.

See the [GitHub documentation for connecting with ssh](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh)

SSH keys created to authenticate against Illinois associated GitHub organzations need to be authorized to use with SSO. See the [GitHub documentation for authorizing an SSH key for use with SAML Single Sign On](
https://docs.github.com/en/enterprise-cloud@latest/authentication/authenticating-with-saml-single-sign-on/authorizing-an-ssh-key-for-use-with-saml-single-sign-on)

<h3 id="token">Authenticate with a Personal Access Token</h3>

Authenticating with a GitHub Personal Access Token (PAT) means logging into the https://github.com website, going into your profile, and creating a token.

See [Creating a Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) on the GitHub Docs site for more instructions.

When you create the token, be mindful of these points:
- The default expiry of tokens is 30 days. If you don't want to do this process again in a month, set the expiration at creation to be longer or select "No expiration"
- A scope of **repo** should be sufficient for most git client activities.
- Copy the token and store it somewhere secure since you will on be able to view it immediately after creation.
- Since you'll be using this with an Illinois secured organization, you will need to authorize the Personal Access Token to be used with each organization. You can do this from the **Configure SSO** dropdown in the [Personal Access Tokens page](https://github.com/settings/tokens).
    - If you do not see the organization listed, make sure you have joined the organization first. Then return to the page and you should see it in the list.
