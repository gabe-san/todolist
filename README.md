# INSERT PROJECT TITLE

Link: _Available later_  
Include project description and use case. List tech stack and other technologies used.

> **Use as future project template for ESLint/Prettier and Webpack.**

## Additional Configuration

1. `npm init` in root project repo to create a package.json file.
2. `npm install webpack webpack-cli --save-dev` to install webpack in project repo.
3. Install other dependencies if needed.  
   ([Assets](https://webpack.js.org/guides/asset-management/))  
   ([Output](https://webpack.js.org/guides/output-management/))  
   ([Development](https://webpack.js.org/guides/development/))  
   ([Code-splitting, Lazy-loading, and Tree-shaking](https://webpack.js.org/guides//))

## Setting up prettier

1. `npm install --save-dev --save-exact prettier` in the repo you’re working on so on a per project basis.

2. Check .prettierignore file is properly set up according below.

**.prettierignore file set up:**

```
node_modules
package-lock.json
build
.DS_Store
CVS
Thumbs.db
```

3. Install Prettier extension in VSCode to be able to format using a shortcut or set it up to run on save etc.

_Click [here](https://www.freecodecamp.org/news/gitignore-file-how-to-ignore-files-and-folders-in-git/) for more info on setting up a gitignore file_

## Setting up ESLint

4. `npm init --yes` in the repo/project you’ll be working on. This is to get a package.json file in there if it's not there yet.

5. `npm init @eslint/config` to hit two birds with one stone (intitialize and creating the config file).

6. Configure the resulting eslintrc.json file first by the prompts and review [link](https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code) for prompt decisions and later adjustment of config. Copy from [template](https://github.com/gabe-san/project-template) if needed.

7. Ensure ESLint VSCode extension is installed and configured correctly according to above link.

## Setting up eslint-config-prettier

8. `npm install --save-dev eslint-config-prettier` in the root project repository to make ESLint and Prettier work together without conflict.

9. Check that "prettier" is added to "extends" array in your .eslintrc.json file.

```
    example:

"extends": [
"airbnb-base",
"prettier"
],
```

10. `npx eslint-config-prettier path/to/main.js` (pwd on root directory) to see if there are conflicts

To manually use Prettier for formatting, you can use the shortcut SHIFT+ALT+F or use the command `npx prettier --write
<filename>` .  
To view all the errors and warnings for ESLint you can use the command `npx eslint <filename>` but they're also shown in the VSCode Problems section.

11. Set up ESLint to automatically fix syntax and formatting issues upon save by following Step 4 and 5 of this [article](https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code)

12. Finally, check [GitHub](https://github.com/gabe-san/project-template) repository if any commits have not been updated.
