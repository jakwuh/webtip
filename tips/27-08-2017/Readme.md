A software digest made by developers in 2 parts.  

**Part 2/2**: shells, guis and git.

Special credits to:

- [Ivan Akulov][1]
- [Ivan Pazhitnykh][3]
- [Sergei Samsonov][5]
- [Vadim Liakhovich][4]

[1]: https://iamakulov.com/
[2]: https://akwuh.me/
[3]: https://github.com/drapegnik/
[4]: https://github.com/vlyahovich/
[5]: https://github.com/dontuncleme/

for the participation in the interview.

#### [ZSH](http://ohmyz.sh/)

![ZSH](./zsh.gif)

This is how my shell currently looks like. `zsh`, that is highly configurable with a set of plugins and themes (see [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)), is available for Linux and MacOS users. I use only `git` and `zsh-autosuggestions` plugins however my productivity of working with shell has increased a lot since I started using zsh.

> `git` plugin adds many aliases like `gc`, `gcm` etc.   
`zsh-autosuggestions` enables shell autocompletion

[Sergei Samsonov][5] has reported that he uses `zsh` too.

#### PowerShell

[Ivan Akulov][1]:  
It’s a Windows’s built-in advanced terminal. I use it instead of Bash because I’m a Microsoft fan mostly, but it still has its advantages.

Pros:
* Its command language. Just like Bash, PowerShell has its own built-in language and a set of commands. However, there’re two major differences:
    * The commands operate objects instead of text. When you type ls, you get not just a set of strings, but an array of objects. This makes piping data really powerful: you don’t need to parse stuff, you just write  ls | ForEach-Object { $_.Extension.ToUpper() } and get a list of extensions in the current directory in upper case. This also brings great autocompletion.
    * PowerShell exposes the full .NET environment into the terminal. Thanks to this, you can do almost anything without installing additional packages.

Cons:
* It doesn’t have tabs, and this brings some inconvenience. Switching to a wrapper around PowerShell is an option, but not for me because I’ve got accustomed to the native behavior (how text selection works, how keyboard shortcuts work and so on).
* It’s not Bash. UNIX shell has existed since, I guess, the 1980s, so it became almost de-facto standard. Because of this, most StackOverflow answers or articles you’ll find will, most likely, only mention Bash. You’ll have to google how to do a corresponding thing in PowerShell.

#### git

If you'd like to use shortcuts for git commands you can set them up in one of following ways:

**By installing `zsh`'s `git` plugin**:

[How to install `zsh`](https://github.com/robbyrussell/oh-my-zsh/wiki/Installing-ZSH)

```bash
# use
gaa # git add --all
gcn! # git commit --amend --no-edit -v
```

**By setting up [git aliases](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases)**

```bash
# set up
git config --global alias.co checkout
git config --global alias.loe log --oneline -n

# use
git co master
git loe 10
```

**By creating `bash` aliases:**

```bash
# set up
echo 'alias ga="git add "' >> ~/.bash_profile
echo 'alias gc="git commit "' >> ~/.bash_profile

# use
ga -A
gc -m "Add blackjack to bash"
```

[Ivan Pazhitnykh][3]:  
I am accustomed to my git aliases a lot: `ga`, `gc`, `gb`, `go gp`, `gp`, `gu`, `gl`, `gll`, `gpf`. These are my configuration files for [`bash`](https://github.com/Drapegnik/env/blob/master/.bash_profile) and [`git`](https://github.com/Drapegnik/env/blob/master/.gitconfig).

Also I use GitHub Desktop to look through the files / changes with a pleasant UI.

#### Other notable software

By [Sergei Samsonov][5]:

[Pixel Winch](https://www.ricciadams.com/projects/pixel-winch) – indispensable program for screen measurement  
[ColorSnapper](https://colorsnapper.com) – macOS color picker   
[Tower](https://www.git-tower.com) – the most tough and convenient git GUI.  
[Kaleidoscope](https://www.kaleidoscopeapp.com) – simple and clear mergetool  
[Optimage](https://getoptimage.com) – image optimization tool  
[Bear](http://www.bear-writer.com) – great Evernote substitute  
[Things](https://culturedcode.com/things/) – task manager

By [Ivan Pazhitnykh][3]:

[Robomongo](https://robomongo.org/) - GUI for MongoDB - buggy a bit but I don't know any alternatives
[Postico](https://eggerapps.at/postico/) - PostgreSQL client for Mac. Much better than PgAdmin and has an attractive minimalistic UI.  
[Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en) - GUI platform for development and testing APIs  
[EME](https://github.com/egoist/eme) - Elegant Markdown Editor  
[bash-completion](https://github.com/scop/bash-completion) - bash autocompletion software  
[thefuck](https://github.com/nvbn/thefuck) - app thats corrects typos in commands  
[Codacy](https://www.codacy.com/) - automated code reviews
[Travis](https://travis-ci.org/) - CI / CD platform  
[Trello](https://trello.com/) - effective boards with a range of integrations
