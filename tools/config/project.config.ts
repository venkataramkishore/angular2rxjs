import { join } from 'path';

import { SeedConfig } from './seed.config';
import { InjectableDependency } from './seed.config.interfaces';
/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
     this.APP_TITLE = 'Welcome to ABF!';

    // Add third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
       {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
       {src: 'lodash/lodash.min.js', inject: 'libs'},
       {src: 'bootstrap/dist/js/bootstrap.min.js', inject: 'libs' }
    ];

    let additionalDeps: InjectableDependency[] = [
      { src: 'bootstrap/dist/css/bootstrap.min.css', inject: true },
      { src: 'bootstrap/dist/css/bootstrap-theme.min.css', inject: true },
      { src: 'font-awesome/css/font-awesome.min.css', inject: true }
    ];

    const seedDependencies = this.NPM_DEPENDENCIES;

    this.NPM_DEPENDENCIES = seedDependencies.concat(additionalDeps);

    /* Add to or override NPM module configurations: */
    //this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
  }

}
