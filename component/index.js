var generators = require('yeoman-generator');
var chalk = require('chalk');

var prompts = [{
      type    : 'confirm',
      name    : 'addLessFile',
      message : 'Would you like to add a LESS file to this component?',
      default : true
    }, {
      type    : 'input',
      name    : 'methodName',
      message : 'What would you like to call the main function in this component?',
      default : 'NewComponent'
    }];

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('componentName', { type: String, required: true });
  },
  createFiles: function() {
    var done = this.async();
    var name = this.componentName;

    this.prompt(prompts, function promptCallback(answers) {
      this.fs.copyTpl(
        this.templatePath('component.html'),
        this.destinationPath(name + '/' + name + '.html')
      );

      if(answers.addLessFile) {
        this.fs.copyTpl(
          this.templatePath('component.less'),
          this.destinationPath(name + '/' + name + '.less')
        );
      }

      this.fs.copyTpl(
        this.templatePath('component.js'),
        this.destinationPath(name + '/' + name + '.js'),
          {templateFileName: name, methodName: answers.methodName}
      );

      done();
    }.bind(this));
  },
  complete: function() {
    this.log(chalk.bold.red('Hey, buddy!  Add this folder to the project in Visual Studio!!! \n \n'));
    this.log(chalk.bold.red('Solution Explorer -> Show All Files -> right click on the new component directory and Include In Project\n \n'));
    this.log(chalk.bold.green('Successfully created new component...'));
  }
});