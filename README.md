Data Visualisation Tool - OSH BAROMETER Migration
========

### Deploying a local version for development
In order to run a local copy of the project, after downloading the git repository run the following commands
```bash
npm install
npm run dev
```

### Organisation of repository
Breakdown for what each directory/file is used for
* src: Folder with all the React files
 * src/actions: Folder in which the redux actions will be stored. The actions will be defined in index.js
 * src/api: Folder with the calls to the Web Service. It will contain the calls and what to do with the returning JSON
 * src/components: Folder with the components that the React app will use. Each major section on the DVT has a folder inside the components folder
 * src/components/common: Folder with the common components that the React App will use in more than one page
 * src/model: Folder with the JSONs files that have hardcoded data for the React App (Literals, Menu Structure, Related Items, etc...)
 * src/reducers: Folder with the reducers that will be used by redux
 * src/style: Folder containing the SCSS files to provide the React App with styles
* package.json: File with the references to the npm libraries that will be used and the scripts to run the project locally or build a release

### Common React elements
Element | Definition
------------- | -------------
charts | A Folder containing a component for the different chart types (Column, Bar, Map, Spider) that will call to the Highcharts library
AdviceSection | The small header that will be shown below the main header in the sections with a brief description of the section
Footer | The footer for the React App
Header | The main Header of the React App. Contains the main menu and some features to resize the font-size or print the page
Methodology | A little accordion that will be used in the pages that display indicator data, providing a description of each of the indicators

### Model JSON files
Element | Definition
------------- | -------------
Literals.json | Contains the literals that will be used through the React App
related.json | Contains the related elements for each of the sections

EU-OSHA - 2021
