<!-- [![Build Status](https://travis-ci.org/Atlas7/atlas7.github.io.svg?branch=master)](https://travis-ci.org/Atlas7/atlas7.github.io) -->

Welcome to my blog: [https://ameyxd.github.io/](https://ameyxd.github.io/)

It is is built with Jekyll, GitHub Pages, and the [Jalpc Theme](https://github.com/jarrekk/Jalpc)
(Check out Jalpc for more instructions).

### How I publish post

git clone this repository locally to my mac.

Make sure git repository has the appropriate remote:

```
(master) $ git remote -v
origin  https://github.com/Atlas7/atlas7.github.io.git (fetch)
origin  https://github.com/Atlas7/atlas7.github.io.git (push)
```

Use an IDE (I use Atom, though Sublime text will also do) and a terminal (I use Terminator because it's awesome).

Create a new blog post:

- Got to `/_posts`
- Create a markdown file with a name like this: `yyyy-mm-dd-hello-this-is-my-title.md`
- Create a meta block at the top (so called "front matters"). I usually just copy and paste from older posts and tweak.
- Write the post in markdown syntax
- Save post

To preview post:

```
jekyll serve
```

This will serve the blog post locally at [http://127.0.0.1:4000/](http://127.0.0.1:4000/)

Ready to push to [https://atlas7.github.io/](https://atlas7.github.io/)?

Easy, just do push master to origin:

```
git push origin master
```

(or just `git push`). The actual GitHub pages [https://atlas7.github.io/] may take a few seconds to build / update.

### How you may create a blog like this:

Again, please check out the [Jalpc Theme](https://github.com/jarrekk/Jalpc)) - it has all the instructions
on how to download the base repository and tweak. This is how I got started.

I also took help from [Atlas7](https://atlas7.github.io) when I ran into issues.

Cheers,
Amey.
